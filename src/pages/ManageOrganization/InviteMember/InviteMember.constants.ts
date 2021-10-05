import { Messages } from './InviteMember.messages';

export const GET_ORGANIZATION_URL = 'v1/orgs';

export const ORGANIZATION_MEMBER_URL_CHUNK = 'member';

export const ROLES = [
  {
    value: 'admin',
    label: Messages.admin,
  },
  {
    value: 'technical',
    label: Messages.technicalUser,
  },
];
