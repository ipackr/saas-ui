import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { ManageOrganizationPage } from '.';

xdescribe('Manage Organization', () => {
  test('renders header and tabs', async () => {
    render(
      <TestContainer>
        <ManageOrganizationPage />
      </TestContainer>,
    );

    const header = await screen.findByTestId('manage-organization-header');
    const tabsWrapper = await screen.findByTestId('manage-organization-tabs-wrapper');

    expect(header).toBeInTheDocument();
    expect(tabsWrapper).toBeInTheDocument();
  });

  test('shows the default tab', async () => {
    render(
      <TestContainer>
        <ManageOrganizationPage />
      </TestContainer>,
    );
    const activeTabContent = await (screen.findByTestId('manage-organization-tab-content'));

    expect(activeTabContent).not.toBeEmptyDOMElement();
  });
});
