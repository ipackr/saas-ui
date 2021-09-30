import React, { FC, useState } from 'react';
import { useStyles, Tab, TabsBar, TabContent } from '@grafana/ui';
import { PrivateLayout } from 'components/Layouts';
import { ReactComponent as OrganizationLogo } from 'assets/organization.svg';
import { Messages } from './ManageOrganization.messages';
import { getStyles } from './ManageOrganization.styles';
import { TABS, DEFAULT_TAB_INDEX } from './ManageOrganization.constants';

export const ManageOrganizationPage: FC = () => {
  const styles = useStyles(getStyles);
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_INDEX);

  return (
    <PrivateLayout>
      <div data-qa="manage-organization-container" className={styles.container}>
        <header data-qa="manage-organization-header">
          <OrganizationLogo />
          {Messages.manageOrganization}
        </header>
        <div data-qa="manage-organization-tabs-wrapper" className={styles.tabsWrapper}>
          <TabsBar>
            {TABS.map((tab, index) => (
              <Tab
                // TODO: research why css prop is needed and how to remove it
                active={index === activeTab}
                css={undefined}
                data-qa="manage-organization-tab"
                key={tab.label}
                label={tab.label}
                onChangeTab={() => setActiveTab(index)}
              />
            ))}
          </TabsBar>
          <TabContent data-qa="manage-organization-tab-content">
            {TABS[activeTab].content}
          </TabContent>
        </div>
      </div>
    </PrivateLayout>
  );
};
