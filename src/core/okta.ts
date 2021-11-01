import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CLIENT_ID, OKTA_ISSUER_URI } from './constants';

const ORIGIN = window.location.origin;

export const authConfig = {
  clientId: OKTA_CLIENT_ID,
  issuer: OKTA_ISSUER_URI,
  pkce: true,
  postLogoutRedirectUri: `${ORIGIN}`,
  redirectUri: `${ORIGIN}/login/callback`,
  scopes: ['openid', 'profile', 'email', 'percona'],
};

export const oktaAuth = new OktaAuth(authConfig);
