export interface CreateOrganizationPayload {
  organizationName: string;
}

export enum MemberRole {
  admin = 'Admin',
  technical = 'Technical',
}

export interface Member {
  username: string;
  first_name: string;
  last_name: string;
  role: typeof MemberRole;
  status: string;
}
