import React, { FC, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { toast } from 'react-toastify';
import { Routes } from 'core/routes';
import { Messages } from './GettingStartedOrgSection.messages';
import { GettingStartedSection } from '../GettingStartedSection';
import { LIST_ORGANIZATION_URL } from './GettingStartedOrgSection.constants';

export const GettingStartedOrgSection: FC = () => {
  const [hasOrgIds, setHasOrgIds] = useState(false);

  const { error, data = {} } = useFetch(LIST_ORGANIZATION_URL, { cachePolicy: CachePolicies.NO_CACHE, method: 'POST' }, []);

  useEffect(() => {
    if (error) {
      toast.error(Messages.fetchError);
    }
  }, [error]);

  useEffect(() => {
    if (data?.orgs?.length) {
      setHasOrgIds(true);
    }
  }, [data]);

  return (
    <GettingStartedSection
      description={Messages.createOrganizationDescription}
      title={Messages.createOrganizationTitle}
      linkIcon={hasOrgIds ? undefined : 'plus-circle'}
      linkTo={Routes.organization}
      linkText={hasOrgIds ? Messages.viewOrganization : Messages.addOrganization}
      isTicked={hasOrgIds}
    />
  );
};
