import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '@grafana/ui';
import { LoaderButton } from '@percona/platform-core';
import { useOktaAuth } from '@okta/okta-react';
import { PublicLayout } from 'components';
import { Routes } from 'core/routes';
import { Messages } from './Login.messages';
import { getStyles } from './Login.styles';

export const LoginPage: FC = () => {
  const styles = useStyles(getStyles);
  const { oktaAuth } = useOktaAuth();
  const doLogin = () => oktaAuth.signInWithRedirect({ originalUri: Routes.root });

  return (
    <PublicLayout>
      <section className={styles.container}>
        <LoaderButton
          data-testid="login-button"
          className={styles.loginButton}
          type="button"
          size="md"
          onClick={doLogin}
        >
          {Messages.signIn}
        </LoaderButton>
        {/* The Link component wouldn't work here, especially when we return back from Okta */}
        <a
          href={Routes.signup}
          data-testid="signup-link"
          className={styles.gotoButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          {Messages.signUp}
        </a>
        <Link
          to={{ pathname: Routes.resetPassword }}
          data-testid="login-reset-password-link"
          className={styles.gotoButton}
          target="_blank"
          rel="noopener"
        >
          {Messages.forgotPassword}
        </Link>
        <Link
          to={{ pathname: Routes.help }}
          data-testid="login-help-link"
          className={styles.gotoButton}
          target="_blank"
          rel="noopener"
        >
          {Messages.help}
        </Link>
      </section>
    </PublicLayout>
  );
};
