export interface CreateOrganizationPayload {
  organizationName: string;
}

export interface ManageOrganizationContext {
  handleCreateOrgSubmit: (org: CreateOrganizationPayload) => Promise<void>;
  loading: boolean;
  orgId: number | undefined;
};
