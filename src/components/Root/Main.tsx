import React, { FC, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PrivateRoute, PublicRoute } from 'components';
import { LoginPage, SignupPage, ProfilePage, UIDemo, NotFound, GettingStartedPage, ManageOrganizationPage } from 'pages';
import { authRefreshAction } from 'store/auth';
import { Routes } from 'core/routes';

export const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRefreshAction.request());
  }, [dispatch]);

  return (
    <>
        <Switch>
          <PrivateRoute exact path={Routes.root}>
            <GettingStartedPage />
          </PrivateRoute>
          <PublicRoute exact path={Routes.login}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path={Routes.signup}>
            <SignupPage />
          </PublicRoute>
          <PrivateRoute exact path={Routes.profile}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute exact path={Routes.organization}>
            <ManageOrganizationPage />
          </PrivateRoute>
          <PublicRoute path={Routes.ui}>
            <UIDemo />
          </PublicRoute>
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        </Switch>
    </>
  );
};
