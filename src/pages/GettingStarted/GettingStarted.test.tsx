import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { GettingStartedPage } from '.';

xdescribe('Getting Started', () => {
  test('is in the document', async () => {
    render(<TestContainer><GettingStartedPage /></TestContainer>);

    expect(await screen.findByTestId('getting-started-container')).toBeInTheDocument();
  });
});
