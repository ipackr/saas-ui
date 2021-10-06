import React from 'react';
import { toast } from 'react-toastify';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { InviteMember } from '.';

const mockPost = jest.fn().mockResolvedValue({ orgs: [{ id: 1337 }] });

const toastError = jest.spyOn(toast, 'error');

let mockError: string | null = null;

jest.mock('use-http', () => {
  const originalModule = jest.requireActual('@percona/platform-core');

  return {
    ...originalModule,
    __esModule: true,
    CachePolicies: {
      NO_CACHE: 'no-cache',
    },
    default: () => ({
      data: {},
      error: mockError,
      loading: false,
      post: mockPost,
      response: {
        ok: true,
      },
    }),
  };
});

const testOrgId = 123;

describe('Invite Members', () => {
  test('renders the invite button', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const button = await screen.findByTestId('invite-member-button');

    expect(button).toBeInTheDocument();
  });

  test('the modal is not visible by default', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const form = screen.queryByTestId('invite-member-form');

    expect(form).not.toBeInTheDocument();
  });

  test('shows the modal after clicking on the invite button', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const button = await screen.findByTestId('invite-member-button');

    fireEvent.click(button!);

    expect(await screen.findByTestId('invite-member-form')).toBeInTheDocument();
  });

  test('closes the modal', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const button = await screen.findByTestId('invite-member-button');

    fireEvent.click(button!);
    fireEvent.click(await screen.findByTestId('modal-close-button'));

    expect(screen.queryByTestId('invite-member-form')).not.toBeInTheDocument();
  });

  test('the save button is disabled if the form is not valid', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const openModal = await screen.findByTestId('invite-member-button');

    fireEvent.click(openModal);

    const submitButton = await screen.findByTestId('invite-member-submit-button');

    expect(submitButton).toBeDisabled();

    const emailInput = await screen.findByTestId('email-text-input');

    fireEvent.change(emailInput, { target: { value: 'invalid@email' } });

    expect(submitButton).toBeDisabled();
  });

  test('the save button is enabled if the form is valid', async () => {
    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    const openModal = await screen.findByTestId('invite-member-button');

    fireEvent.click(openModal);

    const submitButton = await screen.findByTestId('invite-member-submit-button');
    const emailInput = await screen.findByTestId('email-text-input');

    fireEvent.change(emailInput, { target: { value: 'invalid@email.com' } });

    expect(submitButton).toBeEnabled();
  });

  test('shows an error if an API call fails', async () => {
    mockError = 'Error';

    render(
      <TestContainer>
        <InviteMember orgId={testOrgId} />
      </TestContainer>,
    );

    expect(toastError).toBeCalledTimes(1);
  });
});
