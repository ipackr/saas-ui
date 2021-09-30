import React, { FC } from 'react';
import { Messages } from './GettingStartedPmmSection.messages';
import { GettingStartedSection } from '../GettingStartedSection';

export const GettingStartedPmmSection: FC = () => (
  <GettingStartedSection
    description={Messages.connectPMMDescription}
    title={Messages.connectPMMTitle}
    linkIcon="link"
    linkTo="/"
    linkText={Messages.readMore}
    disabled
  />
);
