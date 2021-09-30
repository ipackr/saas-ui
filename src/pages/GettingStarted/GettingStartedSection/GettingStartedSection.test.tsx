import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import doneIcon from 'assets/tick-circle.svg';
import incompleteIcon from 'assets/circle-filled.svg';
import { GettingStartedSection } from '.';
import { Messages } from './GettingStartedSection.messages';

const testTitle = 'Test title';
const testDescription = 'Test description';
const testLinkText = 'Test link';

describe('Getting Started Section', () => {
  test('renders the passed attributes', async () => {
    render(
      <TestContainer>
        <GettingStartedSection description={testDescription} title={testTitle} isTicked linkIcon="plus-circle" linkTo="/" linkText={testLinkText} />
      </TestContainer>,
    );

    const link = await screen.findByTestId('getting-started-section-link');

    expect(await screen.findByTestId('getting-started-section-header')).toHaveTextContent(testTitle);
    expect(await screen.findByTestId('getting-started-section-description')).toHaveTextContent(testDescription);
    expect(link).toHaveTextContent(testLinkText);
    expect(link).toBeEnabled();
  });

  test('shows a tick if isTicked is passed', async () => {
    render(
      <TestContainer>
        <GettingStartedSection description={testDescription} title={testTitle} isTicked linkIcon="plus-circle" linkTo="/" linkText={testLinkText} />
      </TestContainer>,
    );

    const header = await screen.findByTestId('getting-started-section-header');

    expect(header.firstElementChild).toHaveAttribute('alt', Messages.done);
    expect(header.firstElementChild).toHaveAttribute('src', doneIcon);
  });

  test('does not show a tick if isTicked is not passed', async () => {
    render(
      <TestContainer>
        <GettingStartedSection description={testDescription} title={testTitle} linkIcon="plus-circle" linkTo="/" linkText={testLinkText} />
      </TestContainer>,
    );

    const header = await screen.findByTestId('getting-started-section-header');

    expect(header.firstElementChild).toHaveAttribute('alt', Messages.incomplete);
    expect(header.firstElementChild).toHaveAttribute('src', incompleteIcon);
  });

  test('shows a disabled link if disabled is passed', async () => {
    render(
      <TestContainer>
        <GettingStartedSection description={testDescription} title={testTitle} disabled linkIcon="plus-circle" linkTo="/" linkText={testLinkText} />
      </TestContainer>,
    );

    const link = await screen.findByTestId('getting-started-section-link');

    expect(link).toBeDisabled();
  });
});
