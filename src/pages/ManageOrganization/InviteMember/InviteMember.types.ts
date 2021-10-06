import { SelectableValue } from '@grafana/data';

export enum MemberRole {
  admin = 'Admin',
  technical = 'Technical',
}

export interface InviteMemberFormFields {
  email: string;
  role: SelectableValue<MemberRole>;
}

export interface InviteMemberProps {
  orgId: string;
}
