// import React, { FC, useState } from 'react';
import React, { FC, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { toast } from 'react-toastify';
import { useStyles, Tab, TabsBar, TabContent } from '@grafana/ui';
import { PrivateLayout } from 'components/Layouts';
import { ReactComponent as OrganizationLogo } from 'assets/organization.svg';
import { Messages } from './ManageOrganization.messages';
import { getStyles } from './ManageOrganization.styles';
// import { TABS, DEFAULT_TAB_INDEX } from './ManageOrganization.constants';
import { DEFAULT_TAB_INDEX, GET_USER_ORGS_URL , CREATE_ORGANIZATION_URL  } from './ManageOrganization.constants';
import { ManageOrganizationProvider } from './ManageOrganization.provider';
import { CreateOrganizationPayload } from './OrganizationCreate/OrganizationCreate.types';
import { OrganizationView } from './OrganizationView';
import { OrganizationCreate } from './OrganizationCreate';
// import { MembersTab } from './MembersTab';

export const ManageOrganizationPage: FC = () => {
  const styles = useStyles(getStyles);
  const [orgId, setOrgId] = useState<number>();
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_INDEX);
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

  const tabs = [
    {
      label: 'Organization',
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
  ];

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
              <Tab
                // TODO: research why css prop is needed and how to remove it
                active={index === activeTab}
                css={undefined}
                data-testid="manage-organization-tab"
                key={tab.label}
                label={tab.label}
                onChangeTab={() => setActiveTab(index)}
              />
            ))}
          </TabsBar>
          <ManageOrganizationProvider.Provider value={{ handleCreateOrgSubmit, loading, orgId }}>
            <TabContent data-testid="manage-organization-tab-content">
              {tabs[activeTab].content}
            </TabContent>
          </ManageOrganizationProvider.Provider>
        </div>
      </div>
    </PrivateLayout>
  );
};
