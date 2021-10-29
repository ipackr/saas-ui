import React, { FC, useEffect, useState } from 'react';
import useFetch from 'use-http';
import { toast } from 'react-toastify';
import { getUseHttpConfig } from 'core/api/api.service';
import { ENDPOINTS } from 'core/api';
import { OrganizationCreate } from './OrganizationCreate';
import { OrganizationView } from './OrganizationView';
import { Messages } from './OrganizationTab.messages';
import { CreateOrganizationPayload } from './OrganizationCreate/OrganizationCreate.types';

const { Org } = ENDPOINTS;

export const OrganizationTab: FC = () => {
  const [orgId, setOrgId] = useState();
  const fetchConfig = getUseHttpConfig();
  const { response, error, loading, post, data = {} } = useFetch(...fetchConfig);

  const handleCreateOrgSubmit = async ({ organizationName }: CreateOrganizationPayload) => {
    const { org } = await post(Org.createOrganization, { name: organizationName });

    if (org?.id && response.ok) {
      toast.success(Messages.orgCreateSuccess);
      setOrgId(org?.id);
    }
  };

  useEffect(() => {
    const getOrgs = async () => {
      await post(Org.getUserOganizations);
    };

    getOrgs();
  }, [post]);

  useEffect(() => {
    if (error) {
      toast.error(data?.message ? data.message : Messages.fetchError);
    }

    if (data?.orgs?.length) {
      setOrgId(data?.orgs[0].id);
    }
  }, [error, data]);

  return (
    <div data-testid="manage-organization-organization-tab">
      {orgId
        ? (
            <div data-testid="view-organization">
              <OrganizationView orgId={orgId!} />
            </div>
        ) : (
          <div data-testid="create-organization">
            <OrganizationCreate onCreateOrgSubmit={handleCreateOrgSubmit} loading={loading} />
          </div>
        )}
    </div>
  );
};
