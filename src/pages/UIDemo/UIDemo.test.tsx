import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { dataTestId } from '@percona/platform-core';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { UIDemo, tabs } from './UIDemo';

jest.spyOn(authApi, 'signIn');

describe('UI Demo Page', () => {
  it('renders the demo page', () => {
    const { container } = render(<TestContainer><UIDemo /></TestContainer>);

    expect(container.querySelector(dataTestId('demo-page-wrapper'))).not.toBeNull();
  });

  it('changes tab', () => {
    const { container } = render(<TestContainer><UIDemo /></TestContainer>);

    expect(window.location.pathname).toBe(tabs.inputs.path);

    const overlaysTab = container.querySelector(dataTestId('demo-page-overlays-tab'));

    fireEvent.click(overlaysTab!);

    expect(window.location.pathname).toBe(tabs.overlays.path);
  });
});
