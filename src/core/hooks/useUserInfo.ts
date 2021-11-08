import { useCallback, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, UpdateProfilePayload } from 'store/types';
import { RequestError } from 'core/api/types';
import { searchOrgs, searchOrgMembers } from 'core/api/orgs';
import { authGetProfileAction, authUpdateProfileAction, getAuth } from 'store/auth';

export const useUserInfo = (): [AuthState, (payload: UpdateProfilePayload) => void] => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const user = useSelector(getAuth);
  const { email } = user;

  const setUser = useCallback((payload: UpdateProfilePayload) => {
    dispatch(authUpdateProfileAction.request(payload));
  }, [dispatch]);

  useEffect(() => {
    const getInfo = async() => {

      if (!email) {
        dispatch(authGetProfileAction.request());

        try {
          let role = '';
          const { email: userEmail, family_name, given_name } = await oktaAuth.getUser();
          const { data: orgData } = await searchOrgs();
          // We are assuming one org per user, as for now
          const [ { id: orgId = '', name: orgName } ] = orgData.orgs || [{}];

          if (orgId) {
            const { data: memberData } = await searchOrgMembers(orgId, userEmail);
            const [ { role: orgRole } ] = memberData.members || [{}];

            role = orgRole;
          }
          
 
          dispatch(authGetProfileAction.success({
            email: userEmail,
            firstName: given_name,
            lastName: family_name,
            org: {
              id: orgId,
              name: orgName,
              role: role || undefined,
            },
          }));
        } catch (e) {
          dispatch(authGetProfileAction.failure(e as RequestError));
        }
      }
    };

    getInfo();
  }, [oktaAuth, dispatch, email]);

  return [{ ...user }, setUser];
};
