/// <reference types="cypress" />
// to specify data-testid attribute selector add prefix 'testid:' to the locator

export const loginForm = () => cy.get('testid:login-form');
export const signupForm = () => cy.get('testid:signup-form');
export const emailFieldLabel = () => cy.get('testid:email-field-label');
export const emailField = () => cy.get('testid:email-text-input');
export const emailValidation = () => cy.get('testid:email-field-error-message');
export const passwordFieldLabel = () => cy.get('testid:password-field-label');
export const passwordField = () => cy.get('testid:password-password-input');
export const passwordValidation = () => cy.get('testid:password-field-error-message');
export const submitButton = () => cy.get('testid:login-button');
export const signUpLink = () => cy.get('testid:signup-action-button');
export const termsCheckbox = () => cy.get('testid:consent-checkbox-input');
export const termsText = () => cy.get('testid:consent-field-label');
export const termsValidation = () => cy.get('testid:consent-field-error-message');
export const firstNameFieldLabel = () => cy.get('testid:firstName-field-label');
export const lastNameFieldLabel = () => cy.get('testid:lastName-field-label');
export const firstNameField = () => cy.get('testid:firstName-text-input');
export const firstNameValidation = () => cy.get('testid:firstName-field-error-message');
export const lastNameField = () => cy.get('testid:lastName-text-input');
export const lastNameValidation = () => cy.get('testid:lastName-field-error-message');
export const forgotPassword = () => cy.get('testid:login-reset-password-button');
