import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { getStyles } from './SidebarItem.styles';
import { SidebarItemProps } from './SidebarItem.types';

export const SidebarItem: FC<SidebarItemProps> = ({ alt, children, icon }) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.item}>
      <img alt={alt} src={icon} className={styles.linkIcon} />
      {children}
    </div>
  );
};
