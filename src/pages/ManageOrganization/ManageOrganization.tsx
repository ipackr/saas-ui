import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { toast } from 'react-toastify';
import { useStyles, Tab, TabsBar, TabContent } from '@grafana/ui';
import { PrivateLayout } from 'components/Layouts';
import { ReactComponent as OrganizationLogo } from 'assets/organization.svg';
import { Messages } from './ManageOrganization.messages';
import { getStyles } from './ManageOrganization.styles';
import { DEFAULT_TAB_INDEX, GET_USER_ORGS_URL, CREATE_ORGANIZATION_URL } from './ManageOrganization.constants';
import { CreateOrganizationPayload } from './OrganizationCreate/OrganizationCreate.types';
import { OrganizationView } from './OrganizationView';
import { OrganizationCreate } from './OrganizationCreate';
import { InviteMember } from './InviteMember';

export const ManageOrganizationPage: FC = () => {
  const styles = useStyles(getStyles);
  const [orgId, setOrgId] = useState<number>();
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_INDEX);
  const { response, error, loading, post, data = {} } = useFetch({ cachePolicy: CachePolicies.NO_CACHE });

  const handleCreateOrgSubmit = useCallback(async ({ organizationName }: CreateOrganizationPayload) => {
    const { org } = await post(CREATE_ORGANIZATION_URL, { name: organizationName });

    if (org?.id && response.ok) {
      toast.success(Messages.orgCreateSuccess);
      setOrgId(org?.id);
    }
  }, [post, response.ok]);

  const tabs = useMemo(() => [
    {
      label: Messages.members,
      disabled: !orgId,
      content: (
        <div data-testid="manage-organization-members-tab">
          <InviteMember orgId={orgId!} />
        </div>
      ),
    },
    {
      label: Messages.organization,
      disabled: false,
      content: (
        <div data-testid="manage-organization-organization-tab">
          {orgId
            ? (
                <div data-testid="view-organization">
                  <OrganizationView orgId={orgId} />
                </div>
            ) : (
              <div data-testid="create-organization">
                <OrganizationCreate onCreateOrgSubmit={handleCreateOrgSubmit} loading={loading} />
              </div>
            )}
        </div>
      ),
    },
  ], [handleCreateOrgSubmit, loading, orgId]);

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
      setActiveTab(tabs.findIndex((tab) => tab.label === Messages.members));
    }
  }, [error, data, tabs]);

  return (
    <PrivateLayout>
      <div data-testid="manage-organization-container" className={styles.container}>
        <header data-testid="manage-organization-header">
          <OrganizationLogo />
          {Messages.manageOrganization}
        </header>
        <div data-testid="manage-organization-tabs-wrapper" className={styles.tabsWrapper}>
          <TabsBar>
            {tabs.map((tab, index) => (
              <span key={tab.label} className={tab.disabled ? styles.disabledTab : undefined}>
                <Tab
                  // TODO: research why css prop is needed and how to remove it
                  active={index === activeTab}
                  css={undefined}
                  data-testid="manage-organization-tab"
                  label={tab.label}
                  onChangeTab={() => setActiveTab(index)}
                />
              </span>
            ))}
          </TabsBar>
          <TabContent data-testid="manage-organization-tab-content">
            {tabs[activeTab].content}
          </TabContent>
        </div>
      </div>
    </PrivateLayout>
  );
};
