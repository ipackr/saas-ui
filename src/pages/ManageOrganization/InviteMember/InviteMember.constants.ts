import { Messages } from './InviteMember.messages';
import { MemberRole } from './InviteMember.types';

export const GET_ORGANIZATION_URL = 'v1/orgs';

export const ORGANIZATION_MEMBER_URL_CHUNK = 'members';

export const ROLES = [
  {
    value: MemberRole.admin,
    label: Messages.admin,
  },
  {
    value: MemberRole.technical,
    label: Messages.technicalUser,
  },
];
