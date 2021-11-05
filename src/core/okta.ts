import { OktaAuth } from '@okta/okta-auth-js';
import { OAUTH_CLIENT_ID, OAUTH_ISSUER_URI, PORTAL_HOST } from './constants';


export const authConfig = {
  clientId: OAUTH_CLIENT_ID,
  issuer: OAUTH_ISSUER_URI,
  pkce: true,
  postLogoutRedirectUri: `${PORTAL_HOST}`,
  redirectUri: `${PORTAL_HOST}/login/callback`,
  scopes: ['openid', 'profile', 'email', 'percona'],
};

export const oktaAuth = new OktaAuth(authConfig);
