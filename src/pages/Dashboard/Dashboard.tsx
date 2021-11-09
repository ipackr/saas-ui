import React, { FC, useEffect } from 'react';
import { useStyles } from '@grafana/ui';
import { useDispatch } from 'react-redux';
import { authGetProfileAction } from 'store/auth';
import { PrivateLayout } from 'components/Layouts';
import { getStyles } from './Dashboard.styles';
import { Contacts } from './Contacts';

export const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles(getStyles);

  useEffect(() => {
    dispatch(authGetProfileAction.request());
  }, [dispatch]);

  return (
    <PrivateLayout>
      <div className={styles.container}>
        <Contacts />
      </div>
    </PrivateLayout>
  );
};
