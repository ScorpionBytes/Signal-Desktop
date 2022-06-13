// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { ipcRenderer as ipc } from 'electron';
import Backbone from 'backbone';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import 'moment/min/locales.min';
import PQueue from 'p-queue';

import { textsecure } from '../../textsecure';
import { imageToBlurHash } from '../../util/imageToBlurHash';
import { ActiveWindowService } from '../../services/ActiveWindowService';
import * as Attachments from '../attachments';
import { setup } from '../../signal';
import { addSensitivePath } from '../../util/privacy';
import * as log from '../../logging/log';
import { SignalContext } from '../context';

window.nodeSetImmediate = setImmediate;
window.Backbone = Backbone;
window.textsecure = textsecure;

const { config } = window.SignalContext;

window.WebAPI = window.textsecure.WebAPI.initialize({
  url: config.serverUrl,
  storageUrl: config.storageUrl,
  updatesUrl: config.updatesUrl,
  directoryVersion: config.directoryVersion,
  directoryUrl: config.directoryUrl,
  directoryEnclaveId: config.directoryEnclaveId,
  directoryTrustAnchor: config.directoryTrustAnchor,
  directoryV2Url: config.directoryV2Url,
  directoryV2PublicKey: config.directoryV2PublicKey,
  directoryV2CodeHashes: config.directoryV2CodeHashes,
  cdnUrlObject: {
    0: config.cdnUrl0,
    2: config.cdnUrl2,
  },
  certificateAuthority: config.certificateAuthority,
  contentProxyUrl: config.contentProxyUrl,
  proxyUrl: config.proxyUrl,
  version: config.version,
});

window.imageToBlurHash = imageToBlurHash;
window.libphonenumberInstance = PhoneNumberUtil.getInstance();
window.libphonenumberFormat = PhoneNumberFormat;

const activeWindowService = new ActiveWindowService();
activeWindowService.initialize(window.document, ipc);
window.isActive = activeWindowService.isActive.bind(activeWindowService);
window.registerForActive =
  activeWindowService.registerForActive.bind(activeWindowService);
window.unregisterForActive =
  activeWindowService.unregisterForActive.bind(activeWindowService);

window.React = React;
window.ReactDOM = ReactDOM;
window.PQueue = PQueue;

const { locale } = config;
moment.updateLocale(locale, {
  relativeTime: {
    s: window.i18n('timestamp_s'),
    m: window.i18n('timestamp_m'),
    h: window.i18n('timestamp_h'),
  },
});
moment.locale(locale);

const userDataPath = SignalContext.getPath('userData');
window.baseAttachmentsPath = Attachments.getPath(userDataPath);
window.baseStickersPath = Attachments.getStickersPath(userDataPath);
window.baseTempPath = Attachments.getTempPath(userDataPath);
window.baseDraftPath = Attachments.getDraftPath(userDataPath);

addSensitivePath(window.baseAttachmentsPath);
if (config.crashDumpsPath) {
  addSensitivePath(config.crashDumpsPath);
}

window.Signal = setup({
  Attachments,
  getRegionCode: () => window.storage.get('regionCode'),
  logger: log,
  userDataPath,
});
