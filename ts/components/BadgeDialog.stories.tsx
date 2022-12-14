// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { ComponentProps } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import { setupI18n } from '../util/setupI18n';
import enMessages from '../../_locales/en/messages.json';
import { getFakeBadge, getFakeBadges } from '../test-both/helpers/getFakeBadge';
import { repeat, zipObject } from '../util/iterables';
import { BadgeImageTheme } from '../badges/BadgeImageTheme';
import { BadgeDialog } from './BadgeDialog';

const i18n = setupI18n('en', enMessages);

export default {
  title: 'Components/BadgeDialog',
};

const defaultProps: ComponentProps<typeof BadgeDialog> = {
  areWeASubscriber: false,
  badges: getFakeBadges(3),
  firstName: 'Alice',
  i18n,
  onClose: action('onClose'),
  title: 'Alice Levine',
};

export function NoBadgesClosedImmediately(): JSX.Element {
  return <BadgeDialog {...defaultProps} badges={[]} />;
}

NoBadgesClosedImmediately.story = {
  name: 'No badges (closed immediately)',
};

export function OneBadge(): JSX.Element {
  return <BadgeDialog {...defaultProps} badges={getFakeBadges(1)} />;
}

OneBadge.story = {
  name: 'One badge',
};

export function BadgeWithNoImageShouldBeImpossible(): JSX.Element {
  return (
    <BadgeDialog
      {...defaultProps}
      badges={[
        {
          ...getFakeBadge(),
          images: [],
        },
      ]}
    />
  );
}

BadgeWithNoImageShouldBeImpossible.story = {
  name: 'Badge with no image (should be impossible)',
};

export function BadgeWithPendingImage(): JSX.Element {
  return (
    <BadgeDialog
      {...defaultProps}
      badges={[
        {
          ...getFakeBadge(),
          images: Array(4).fill(
            zipObject(
              Object.values(BadgeImageTheme),
              repeat({ url: 'https://example.com/ignored.svg' })
            )
          ),
        },
      ]}
    />
  );
}

BadgeWithPendingImage.story = {
  name: 'Badge with pending image',
};

export function BadgeWithOnlyOneLowDetailImage(): JSX.Element {
  return (
    <BadgeDialog
      {...defaultProps}
      badges={[
        {
          ...getFakeBadge(),
          images: [
            zipObject(
              Object.values(BadgeImageTheme),
              repeat({
                localPath: '/fixtures/orange-heart.svg',
                url: 'https://example.com/ignored.svg',
              })
            ),
            ...Array(3).fill(
              zipObject(
                Object.values(BadgeImageTheme),
                repeat({ url: 'https://example.com/ignored.svg' })
              )
            ),
          ],
        },
      ]}
    />
  );
}

BadgeWithOnlyOneLowDetailImage.story = {
  name: 'Badge with only one, low-detail image',
};

export function FiveBadges(): JSX.Element {
  return <BadgeDialog {...defaultProps} badges={getFakeBadges(5)} />;
}

FiveBadges.story = {
  name: 'Five badges',
};

export function ManyBadges(): JSX.Element {
  return <BadgeDialog {...defaultProps} badges={getFakeBadges(50)} />;
}

ManyBadges.story = {
  name: 'Many badges',
};

export function ManyBadgesUserIsASubscriber(): JSX.Element {
  return (
    <BadgeDialog
      {...defaultProps}
      areWeASubscriber
      badges={getFakeBadges(50)}
    />
  );
}

ManyBadgesUserIsASubscriber.story = {
  name: 'Many badges, user is a subscriber',
};
