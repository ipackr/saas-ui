export const TERMS_OF_SERVICE_URL = 'https://per.co.na/pmm/platform-terms';

export const PRIVACY_POLICY_URL = 'https://per.co.na/pmm/platform-privacy';

export const DOWNLOAD_PMM_LINK = 'https://www.percona.com/downloads/pmm2';

export const PASSWORD_MIN_LENGTH = 10;

export const IS_PRODUCTION = window.location.host === 'platform.percona.com';

export const OKTA_HOST =  process.env.REACT_APP_OKTA_HOST;

export const OKTA_CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;

export const OKTA_ISSUER_URI = IS_PRODUCTION
  ? process.env.REACT_APP_OKTA_PROD_ISSUER_URI
  : process.env.REACT_APP_OKTA_DEV_ISSUER_URI;

export const STATE_LOCALSTORAGE_KEY = 'state';

export const THEME_STORAGE_KEY = 'percona.saas.theme';

export const MAX_NAME_LENGTH = 50;
