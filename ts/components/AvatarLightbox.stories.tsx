// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React from 'react';

import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import enMessages from '../../_locales/en/messages.json';
import { AvatarColors } from '../types/Colors';
import type { PropsType } from './AvatarLightbox';
import { AvatarLightbox } from './AvatarLightbox';
import { setupI18n } from '../util/setupI18n';
import { getDefaultConversation } from '../test-both/helpers/getDefaultConversation';

const i18n = setupI18n('en', enMessages);

const createProps = (overrideProps: Partial<PropsType> = {}): PropsType => ({
  avatarColor: select(
    'Color',
    AvatarColors,
    overrideProps.avatarColor || AvatarColors[0]
  ),
  avatarPath: overrideProps.avatarPath,
  conversationTitle: overrideProps.conversationTitle,
  i18n,
  isGroup: Boolean(overrideProps.isGroup),
  onClose: action('onClose'),
});

export default {
  title: 'Components/AvatarLightbox',
};

export function Group(): JSX.Element {
  return (
    <AvatarLightbox
      {...createProps({
        isGroup: true,
      })}
    />
  );
}

export function Person(): JSX.Element {
  const conversation = getDefaultConversation();
  return (
    <AvatarLightbox
      {...createProps({
        avatarColor: conversation.color,
        conversationTitle: conversation.title,
      })}
    />
  );
}

export function Photo(): JSX.Element {
  return (
    <AvatarLightbox
      {...createProps({
        avatarPath: '/fixtures/kitten-1-64-64.jpg',
      })}
    />
  );
}
