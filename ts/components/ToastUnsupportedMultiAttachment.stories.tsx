// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToastUnsupportedMultiAttachment } from './ToastUnsupportedMultiAttachment';

import { setupI18n } from '../util/setupI18n';
import enMessages from '../../_locales/en/messages.json';

const i18n = setupI18n('en', enMessages);

const defaultProps = {
  i18n,
  onClose: action('onClose'),
};

export default {
  title: 'Components/ToastUnsupportedMultiAttachment',
};

export const _ToastUnsupportedMultiAttachment = (): JSX.Element => (
  <ToastUnsupportedMultiAttachment {...defaultProps} />
);

_ToastUnsupportedMultiAttachment.story = {
  name: 'ToastUnsupportedMultiAttachment',
};
