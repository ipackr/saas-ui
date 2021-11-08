import { OKTA_HOST } from 'core/constants';

export const Routes = {
  editProfile: `https://${OKTA_HOST}/enduser/settings`,
  help: `https://${OKTA_HOST}/help/login`,
  login: '/login',
  loginCallback: '/login/callback',
  logout: '/logout',
  organization: '/organization',
  profile: '/profile',
  root: '/',
  resetPassword: `https://${OKTA_HOST}/signin/forgot-password`,
  signup: `https://${OKTA_HOST}/signin/register`,
  ui: '/ui',
  welcome: '/welcome',
};
