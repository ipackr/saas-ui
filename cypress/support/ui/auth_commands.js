/// <reference types="cypress" />
import { pageDetailsMap, Pages } from 'pages/common/constants';
import {
  emailField,
  emailValidation,
  firstNameField,
  lastNameField,
  passwordField,
  passwordValidation,
  submitButton,
  termsCheckbox,
} from 'pages/auth/selectors';
import { gettingStartedContainer, homeIcon, profileIcon } from 'pages/main/selectors';

Cypress.Commands.add('runLoginFlow',
  (user) => {
    const { email } = user.user;

    submitButton().isDisabled();
    fillEmailPassword(user.user);
    submitButton().isEnabled().click();
    cy.checkPopUpMessage(user.signedInMessage);
    cy.contains(email);
    gettingStartedContainer().isVisible();
    profileIcon().isVisible();
    homeIcon().isVisible();
  },
);

Cypress.Commands.add('runSignUpFlow',
  (user) => {
    const { email, firstName, lastName } = user.user;

    submitButton().isDisabled();
    fillEmail(email);
    firstNameField().type(firstName);
    lastNameField().type(lastName);
    termsCheckbox().click({ force: true });
    submitButton().isEnabled().click();
    cy.checkPopUpMessage(user.activationEmailSentMessage);
    cy.url().should('contain', pageDetailsMap[Pages.Login].url);
  },
);

const fillEmailPassword = ({ email, password }) => {
  fillEmail(email);
  passwordField().clear().type(password);
  passwordValidation().hasText('');
};

const fillEmail = (email) => {
  emailField().clear().type(email);
  emailValidation().hasText('');
};



