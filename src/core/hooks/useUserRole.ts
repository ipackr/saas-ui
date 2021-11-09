import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { searchOrgs, searchOrgMembers } from 'core/api/orgs';
import { useUserInfo } from './useUserInfo';

export const useUserRole = () => {
  const [role, setRole] = useState('');
  const [user] = useUserInfo();
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    const getInfo = async() => {
      if (user.email) {
        const { data: orgData } = await searchOrgs(); 
        // We are assuming one org per user, as for now
        const [ { id: orgId = '' } ] = orgData.orgs || [{}];
  
        if (orgId) {
          const { data: memberData } = await searchOrgMembers(orgId, user.email);
          const [ { role: orgRole } ] = memberData.members || [{}];

          setRole(orgRole);
      }
      }
    };

    getInfo();
  }, [oktaAuth, user.email]);

  return [role];
};
