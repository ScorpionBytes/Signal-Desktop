// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { PropsType } from './StoryCreator';
import enMessages from '../../_locales/en/messages.json';
import { StoryCreator } from './StoryCreator';
import { fakeAttachment } from '../test-both/helpers/fakeAttachment';
import {
  getDefaultConversation,
  getDefaultGroup,
} from '../test-both/helpers/getDefaultConversation';
import { getFakeDistributionListsWithMembers } from '../test-both/helpers/getFakeDistributionLists';
import { setupI18n } from '../util/setupI18n';

const i18n = setupI18n('en', enMessages);

export default {
  title: 'Components/StoryCreator',
  component: StoryCreator,
  argTypes: {
    candidateConversations: {
      defaultValue: Array.from(Array(100), getDefaultConversation),
    },
    debouncedMaybeGrabLinkPreview: { action: true },
    distributionLists: { defaultValue: getFakeDistributionListsWithMembers() },
    getPreferredBadge: { action: true },
    groupConversations: {
      defaultValue: Array.from(Array(7), getDefaultGroup),
    },
    groupStories: {
      defaultValue: Array.from(Array(4), getDefaultGroup),
    },
    hasFirstStoryPostExperience: {
      defaultValue: false,
    },
    i18n: { defaultValue: i18n },
    imageToBlurHash: async () => 'LDA,FDBnm+I=p{tkIUI;~UkpELV]',
    installedPacks: {
      defaultValue: [],
    },
    isSending: {
      defaultValue: false,
    },
    linkPreview: {
      defaultValue: undefined,
    },
    me: {
      defaultValue: getDefaultConversation(),
    },
    onClose: { action: true },
    onDeleteList: { action: true },
    onDistributionListCreated: { action: true },
    onHideMyStoriesFrom: { action: true },
    onSend: { action: true },
    onSetSkinTone: { action: true },
    onUseEmoji: { action: true },
    onViewersUpdated: { action: true },
    processAttachment: { action: true },
    recentEmojis: {
      defaultValue: [],
    },
    recentStickers: {
      defaultValue: [],
    },
    sendStoryModalOpenStateChanged: { action: true },
    setMyStoriesToAllSignalConnections: { action: true },
    signalConnections: {
      defaultValue: Array.from(Array(42), getDefaultConversation),
    },
    skinTone: {
      defaultValue: 0,
    },
    toggleSignalConnectionsModal: { action: true },
  },
} as Meta;

// eslint-disable-next-line react/function-component-definition
const Template: Story<PropsType> = args => <StoryCreator {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.story = {
  name: 'w/o Link Preview available',
};

export const LinkPreview = Template.bind({});
LinkPreview.args = {
  linkPreview: {
    domain: 'www.catsandkittens.lolcats',
    image: fakeAttachment({
      url: '/fixtures/kitten-4-112-112.jpg',
    }),
    title: 'Cats & Kittens LOL',
    url: 'https://www.catsandkittens.lolcats/kittens/page/1',
  },
};
LinkPreview.story = {
  name: 'with Link Preview ready to be applied',
};

export const FirstTime = Template.bind({});
FirstTime.args = {
  hasFirstStoryPostExperience: true,
};
FirstTime.story = {
  name: 'First time posting a story',
};

export const Sending = Template.bind({});
Sending.args = {
  isSending: true,
};
