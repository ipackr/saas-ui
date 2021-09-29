import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { IconLink } from 'components';
import { Routes } from 'core/routes';
import dotCircle from 'assets/dot-circle.svg';
import { getStyles } from './SideMenu.styles';

export const SideMenu: FC = () => {
  const styles = useStyles(getStyles);

  return (
    <nav data-qa="side-menu" className={styles.sideMenu}>
      <section data-qa="side-menu-main-section">
        <header className={styles.navSectionLabel}>Main</header>
        <IconLink icon={dotCircle} to={Routes.root} alt="test">Getting Started</IconLink>
      </section>
    </nav>
  );
};
