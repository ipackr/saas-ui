import React, { FC, useEffect } from 'react';
import { LinkButton, useStyles } from '@grafana/ui';
import { useDispatch, useSelector } from 'react-redux';
import { authGetProfileAction, getAuth } from 'store/auth';
import { PrivateLayout } from 'components/Layouts';
import { getStyles } from './Dashboard.styles';

export const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles(getStyles);

  const { firstName, lastName, org  } = useSelector(getAuth);

  useEffect(() => {
    dispatch(authGetProfileAction.request());
  }, [dispatch]);

  return (
    <PrivateLayout>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>Your account</p>
            <p>Name: {firstName} {lastName}</p>
            <p>Role: {org.role}</p>
            <p>Account type: Free Account</p>
            <p>
              Percona&apos;s experts can maximize your application
              performance with our open source database support, managed services or consulting.
            </p>
            <LinkButton variant="primary" href="https://www.percona.com/about-percona/contact#us">Contact Us</LinkButton>
          </div>
          <div className={styles.card}>
            <p>Percona contacts</p>
            <p>You can find us on our Community spaces:</p>
            <p><a href="https://forums.percona.com/" target="_blank" rel="noreferrer">Forums</a></p>
            <p><a href="http://per.co.na/discord" target="_blank" rel="noreferrer">Discord</a></p>
            <p>
              Or get in touch via <a href="https://www.percona.com/about-percona/contact" target="_blank" rel="noreferrer">https://www.percona.com/about-percona/contact</a>
            </p>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};
