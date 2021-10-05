import { SelectableValue } from '@grafana/data';

export enum MemberRole {
  admin = 'admin',
  technical = 'technical',
}

export interface InviteMemberFormFields {
  email: string;
  role: SelectableValue<MemberRole>;
}

export interface InviteMemberProps {
  orgId: number;
}
