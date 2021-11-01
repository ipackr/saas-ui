import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { toast } from 'react-toastify';
import { useStyles, Tab, TabsBar, TabContent } from '@grafana/ui';
import { PrivateLayout } from 'components/Layouts';
import { ReactComponent as OrganizationLogo } from 'assets/organization.svg';
import { useSelector } from 'react-redux';
import { getAuth } from 'store/auth';
import { Messages } from './ManageOrganization.messages';
import { getStyles } from './ManageOrganization.styles';
import { CreateOrganizationPayload, Member, MemberPayload, MemberRole } from './ManageOrganization.types';
import { DEFAULT_TAB_INDEX, GET_USER_ORGS_URL, ORGANIZATIONS_URL, GET_MEMBERS_URL_CHUNK } from './ManageOrganization.constants';
import { OrganizationView } from './OrganizationView';
import { OrganizationCreate } from './OrganizationCreate';
import { InviteMember } from './InviteMember';
import { MembersList } from './MembersList';

const formatMembers = (members: MemberPayload[]) => members.map(({
  first_name: firstName,
  last_name: lastName,
  username: email,
  ...rest
}: MemberPayload): Member => ({
    firstName,
    lastName,
    email,
    ...rest,
  }),
);

export const ManageOrganizationPage: FC = () => {
  const styles = useStyles(getStyles);
  const [orgId, setOrgId] = useState<string>();
  const [orgMembers, setOrgMembers] = useState<Member[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_INDEX);
  const { email: userEmail } = useSelector(getAuth);
  const { response, error, loading, post, data = {} } = useFetch({ cachePolicy: CachePolicies.NO_CACHE });

  const handleCreateOrgSubmit = useCallback(async ({ organizationName }: CreateOrganizationPayload) => {
    const { org } = await post(ORGANIZATIONS_URL, { name: organizationName });

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
          {userIsAdmin && <InviteMember orgId={orgId!} />}
          <MembersList members={orgMembers} loading={loading} />
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
  ], [handleCreateOrgSubmit, loading, orgId, orgMembers, userIsAdmin]);

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

  useEffect(() => {
    const getUserRole = async () => {
      const { members } = await post(`${ORGANIZATIONS_URL}/${orgId}/${GET_MEMBERS_URL_CHUNK}`);

      setOrgMembers(formatMembers(members));

      const loggedInMember = members?.find((member: MemberPayload) => member.username === userEmail);

      setUserIsAdmin(loggedInMember?.role === MemberRole.admin);
    };

    if (orgId) {
      getUserRole();
    }
  }, [userEmail, post, orgId]);

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
