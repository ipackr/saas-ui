import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { PrivateLayout } from 'components/Layouts';
import { getStyles } from './GettingStarted.styles';
import { GettingStartedPmmSection } from './GettingStartedPmmSection';
import { GettingStartedOrgSection } from './GettingStartedOrgSection';

export const GettingStartedPage: FC = () => {
  const styles = useStyles(getStyles);

  return (
    <PrivateLayout>
      <div data-qa="getting-started-container" className={styles.container}>
        <GettingStartedOrgSection />
        <GettingStartedPmmSection />
      </div>
    </PrivateLayout>
  );
};
