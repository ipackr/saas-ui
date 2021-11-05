import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { authGetProfileAction, getAuth } from '../../store/auth';

export const useUserInfo = () => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const { pending, email, firstName, lastName } = useSelector(getAuth);

  useEffect(() => {
    const getInfo = async() => {

      if (!email) {
        const { email: oktaEmail, family_name, given_name } = await oktaAuth.getUser();

        dispatch(authGetProfileAction.success({
          email: oktaEmail,
          firstName: given_name,
          lastName: family_name,
        }));
      }
    };

    getInfo();
  }, [oktaAuth, dispatch, email]);

  return { pending, email, firstName, lastName };
};
