import { AxiosResponse } from 'axios';
import { Api, ENDPOINTS } from 'core/api';
import { RequestBody, SearchOrganizationMembersResponse, SearchOrganizationsResponse } from './types';

const { Org } = ENDPOINTS;

export const searchOrgs = () => Api
  .post<RequestBody, AxiosResponse<SearchOrganizationsResponse>>(Org.getUserOganizations);

export const searchOrgMembers = (orgId: string, username?: string) => Api
  .post<RequestBody, AxiosResponse<SearchOrganizationMembersResponse>>(
    Org.searchOrgMember(orgId), username ? { user: { username } } : undefined,
  );
