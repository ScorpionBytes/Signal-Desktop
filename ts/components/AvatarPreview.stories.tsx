// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React from 'react';
import { chunk } from 'lodash';

import { action } from '@storybook/addon-actions';

import type { PropsType } from './AvatarPreview';
import { AvatarPreview } from './AvatarPreview';
import { AvatarColors } from '../types/Colors';
import { setupI18n } from '../util/setupI18n';
import enMessages from '../../_locales/en/messages.json';

const i18n = setupI18n('en', enMessages);

const TEST_IMAGE = new Uint8Array(
  chunk(
    '89504e470d0a1a0a0000000d4948445200000008000000080103000000fec12cc800000006504c5445ff00ff00ff000c82e9800000001849444154085b633061a8638863a867f8c720c760c12000001a4302f4d81dd9870000000049454e44ae426082',
    2
  ).map(bytePair => parseInt(bytePair.join(''), 16))
);

const createProps = (overrideProps: Partial<PropsType> = {}): PropsType => ({
  avatarColor: overrideProps.avatarColor,
  avatarPath: overrideProps.avatarPath,
  avatarValue: overrideProps.avatarValue,
  conversationTitle: overrideProps.conversationTitle,
  i18n,
  isEditable: Boolean(overrideProps.isEditable),
  isGroup: Boolean(overrideProps.isGroup),
  onAvatarLoaded: action('onAvatarLoaded'),
  onClear: action('onClear'),
  onClick: action('onClick'),
  style: overrideProps.style,
});

export default {
  title: 'Components/AvatarPreview',
};

export function NoStatePersonal(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({
        avatarColor: AvatarColors[0],
        conversationTitle: 'Just Testing',
      })}
    />
  );
}

NoStatePersonal.story = {
  name: 'No state (personal)',
};

export function NoStateGroup(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({
        avatarColor: AvatarColors[1],
        isGroup: true,
      })}
    />
  );
}

NoStateGroup.story = {
  name: 'No state (group)',
};

export function NoStateGroupUploadMe(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({
        avatarColor: AvatarColors[1],
        isEditable: true,
        isGroup: true,
      })}
    />
  );
}

NoStateGroupUploadMe.story = {
  name: 'No state (group) + upload me',
};

export function Value(): JSX.Element {
  return <AvatarPreview {...createProps({ avatarValue: TEST_IMAGE })} />;
}

Value.story = {
  name: 'value',
};

export function Path(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({ avatarPath: '/fixtures/kitten-3-64-64.jpg' })}
    />
  );
}

Path.story = {
  name: 'path',
};

export function ValuePath(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({
        avatarPath: '/fixtures/kitten-3-64-64.jpg',
        avatarValue: TEST_IMAGE,
      })}
    />
  );
}

ValuePath.story = {
  name: 'value & path',
};

export function Style(): JSX.Element {
  return (
    <AvatarPreview
      {...createProps({
        avatarValue: TEST_IMAGE,
        style: { height: 100, width: 100 },
      })}
    />
  );
}

Style.story = {
  name: 'style',
};
