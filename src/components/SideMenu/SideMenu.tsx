import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { IconLink } from 'components';
import { Routes } from 'core/routes';
import dotCircle from 'assets/dot-circle.svg';
import dashboard from 'assets/dashboard.svg';
import { getStyles } from './SideMenu.styles';
import { Messages } from './SideMenu.messages';

export const SideMenu: FC = () => {
  const styles = useStyles(getStyles);

  return (
    <nav data-testid="side-menu" className={styles.sideMenu}>
      <section data-testid="side-menu-main-section">
        <header className={styles.navSectionLabel}>{Messages.main}</header>
        <IconLink
          icon={dotCircle}
          to={Routes.root}
          alt={Messages.gettingStarted}
        >
          {Messages.gettingStarted}
        </IconLink>
        <IconLink
          icon={dashboard}
          to={Routes.dashboard}
          alt={Messages.dashboard}
        >
          {Messages.dashboard}
        </IconLink>
      </section>
    </nav>
  );
};
