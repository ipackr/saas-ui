import React from 'react';
import { toast } from 'react-toastify';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ENDPOINTS } from 'core/api';
import { TestContainer } from 'components/TestContainer';
import { OrganizationTab } from '.';

const mockPost = jest.fn().mockResolvedValue({ orgs: [{ id: 1337 }] });

const toastError = jest.spyOn(toast, 'error');
const toastSuccess = jest.spyOn(toast, 'success');

let mockError: string | null = null;

let mockData = {};

jest.mock('use-http', () => {
  const originalModule = jest.requireActual('@percona/platform-core');

  return {
    ...originalModule,
    __esModule: true,
    CachePolicies: {
      NO_CACHE: 'no-cache',
    },
    default: () => ({
      data: mockData,
      error: mockError,
      loading: false,
      post: mockPost,
      response: {
        ok: true,
      },
    }),
  };
});

describe('Organization Create', () => {
  test('shows an error if an API call fails', async () => {
    mockError = 'Error';

    render(
      <TestContainer>
        <OrganizationTab />
      </TestContainer>,
    );

    expect(toastError).toBeCalledTimes(1);
  });

  test('calls API to get the organizations the user is part of', async () => {
    render(
      <TestContainer>
        <OrganizationTab />
      </TestContainer>,
    );

    waitFor(() => { expect((mockPost)).toBeCalledTimes(1); });
    waitFor(() => { expect((mockPost)).toBeCalledWith(ENDPOINTS.Org.getUserOganizations); });
  });

  test('shows create form if no organizations are returned by the API for the user', async () => {
    render(
      <TestContainer>
        <OrganizationTab />
      </TestContainer>,
    );

    waitFor(() => { expect((mockPost)).toBeCalledTimes(1); });
    const createOrgContainer = await screen.findByTestId('create-organization');

    expect(createOrgContainer).toBeInTheDocument();
  });

  test('shows a success message after an organization is successfully created', async () => {
    const testName = 'Test';

    mockPost.mockResolvedValue({ org: { id: 123 } });

    render(
      <TestContainer>
        <OrganizationTab />
      </TestContainer>,
    );

    const saveButton = await screen.findByTestId('create-organization-submit-button');
    const input = await screen.findByTestId('organizationName-text-input');

    userEvent.type(input, testName);

    userEvent.click(saveButton);

    waitFor(() => { expect(toastSuccess).toBeCalledTimes(1); });
  });

  test('shows organization details about the first organization returned by the API for the user', async () => {
    mockData = { orgs: [{ id: 123}] };

    render(
      <TestContainer>
        <OrganizationTab />
      </TestContainer>,
    );

    waitFor(() => { expect((mockPost)).toBeCalledTimes(1); });
    const viewOrgContainer = await screen.findByTestId('view-organization');

    expect(viewOrgContainer).toBeInTheDocument();
  });
});
