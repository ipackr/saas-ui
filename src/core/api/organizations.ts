import { Api, ENDPOINTS } from 'core/api';
import { RequestBody } from './types';

const { Org } = ENDPOINTS;

export const getUserOrgs = () => Api
  .post<RequestBody>(Org.getUserOganizations, {});
