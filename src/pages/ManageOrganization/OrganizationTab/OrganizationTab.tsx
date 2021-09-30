import React, { FC, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { toast } from 'react-toastify';
import { OrganizationCreate } from './OrganizationCreate';
import { OrganizationView } from './OrganizationView';
import { GET_USER_ORGS_URL, CREATE_ORGANIZATION_URL } from './OrganizationTab.constants';
import { Messages } from './OrganizationTab.messages';
import { CreateOrganizationPayload } from './OrganizationCreate/OrganizationCreate.types';

export const OrganizationTab: FC = () => {
  const [orgId, setOrgId] = useState();
  const { response, error, loading, post, data = {} } = useFetch({ cachePolicy: CachePolicies.NO_CACHE });

  const handleCreateOrgSubmit = async ({ organizationName }: CreateOrganizationPayload) => {
    const { org } = await post(CREATE_ORGANIZATION_URL, { name: organizationName });

    if (org?.id && response.ok) {
      toast.success(Messages.orgCreateSuccess);
      setOrgId(org?.id);
    }
  };

  useEffect(() => {
    const getOrgs = async () => {
      await post(GET_USER_ORGS_URL);
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
    <div data-qa="manage-organization-organization-tab">
      {orgId
        ? (
            <div data-qa="view-organization">
              <OrganizationView orgId={orgId!} />
            </div>
        ) : (
          <div data-qa="create-organization">
            <OrganizationCreate onCreateOrgSubmit={handleCreateOrgSubmit} loading={loading} />
          </div>
        )}
    </div>
  );
};
