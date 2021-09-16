/// <reference types="cypress" />

export const setAliases = () => {
  cy.server();

  cy.intercept({
    method: 'POST',
    url: '/v1/auth/RefreshSession',
  }).as('refresh');

  cy.intercept({
    method: 'POST',
    url: '/v1/auth/SignIn',
  }).as('signin');

  cy.intercept({
    method: 'POST',
    url: '/v1/auth/SignUp',
  }).as('signup');

  cy.intercept({
    method: 'POST',
    url: '/v1/auth/SignOut',
  }).as('signout');

  cy.intercept({
    method: 'POST',
    url: '/v1/auth/UpdateProfile',
  }).as('updateProfile');
};
