import { useCallback, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, UpdateProfilePayload } from 'store/types';
import { RequestError } from 'core/api/types';
import { authGetProfileAction, authUpdateProfileAction, getAuth } from '../../store/auth';

export const useUserInfo = (): [AuthState, (payload: UpdateProfilePayload) => void] => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const user = useSelector(getAuth);
  const { freshData } = user;

  const setUser = useCallback((payload: UpdateProfilePayload) => {
    dispatch(authUpdateProfileAction.request(payload));
  }, [dispatch]);

  useEffect(() => {
    const getInfo = async() => {

      if (freshData) {
        dispatch(authGetProfileAction.request());

        try {
          const { email: oktaEmail, family_name, given_name } = await oktaAuth.getUser();
 
          dispatch(authGetProfileAction.success({
            email: oktaEmail,
            firstName: given_name,
            lastName: family_name,
          }));
        } catch (e) {
          dispatch(authGetProfileAction.failure(e as RequestError));
        }
      }
    };

    getInfo();
  }, [oktaAuth, dispatch, freshData]);

  return [{ ...user }, setUser];
};
