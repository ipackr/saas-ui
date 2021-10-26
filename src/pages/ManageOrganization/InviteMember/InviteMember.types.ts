import { SelectableValue } from '@grafana/data';
import { MemberRole } from '../ManageOrganization.types';

export interface InviteMemberFormFields {
  email: string;
  role: SelectableValue<MemberRole>;
}

export interface InviteMemberProps {
  orgId: string;
}
