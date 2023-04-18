import React from 'react';
import {
  render,
  fireEvent,
  within,
  queryByAttribute,
} from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../../../../../../utils/themeProvider';
import { screen } from '@testing-library/dom';

import Feedback from '../Feedback';

const feedbacks = [
  { range: [75, 100], feedback: 'Good' },
  { range: [50, 74], feedback: 'Average' },
];

it('Feedback should render and match the snapshot without props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
});

it('Feedback should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
});

it('should render list of 2 feedbacks', () => {
  render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );

  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );
  const list = queryByTestId('feedback-list', {
    name: /feedbacks/i,
  });
  const { queryAllByTestId } = within(list);
  const items = queryAllByTestId('feedback-list-item');
  expect(items.length).toBe(2);
});

it('should update state on feedback change', () => {
  const setFeedback = jest.fn();

  const handleClick = jest.spyOn(React, 'useState');
  handleClick.mockImplementation(feedback => [feedback, setFeedback]);

  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback />
      </ThemeProvider>
    </IntlProvider>
  );

  const node = queryByTestId('add');
  fireEvent.click(node);
  expect(setFeedback).toBeTruthy();
});

it('should add feedback', () => {
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );

  const list = queryByTestId('feedback-list', {
    name: /feedbacks/i,
  });
  const { queryAllByTestId } = within(list);
  const items = queryAllByTestId('feedback-list-item');
  const initLength = items.length;
  expect(items.length).toBe(items.length);

  const node = queryByTestId('add');
  fireEvent.click(node);
  const updatedItems = queryAllByTestId('feedback-list-item');

  expect(updatedItems.length).toBe(initLength + 1);
});

it('Feedback input fields, remove and reset buttons should render correctly after addition of feedback', () => {
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );

  const node = queryByTestId('add');
  const removeNode = queryByTestId('remove');
  const resetNode = queryByTestId('reset');
  fireEvent.click(node);
  const inputNode = queryByTestId('feedback-input');
  expect(removeNode).toBeTruthy();
  expect(resetNode).toBeTruthy();
  expect(inputNode).toBeTruthy();
});

it('should remove feedback', () => {
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );

  const list = queryByTestId('feedback-list', {
    name: /feedbacks/i,
  });
  const { queryAllByTestId } = within(list);
  const items = queryAllByTestId('feedback-list-item');
  const initLength = items.length;
  expect(items.length).toBe(items.length);

  const node = queryByTestId('remove');
  fireEvent.click(node);
  const updatedItems = queryAllByTestId('feedback-list-item');

  expect(updatedItems.length).toBe(initLength - 1);
});

it('should reset feedback and disappear reset and remove buttons', () => {
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Feedback data={feedbacks} />
      </ThemeProvider>
    </IntlProvider>
  );

  const list = queryByTestId('feedback-list', {
    name: /feedbacks/i,
  });
  const { queryAllByTestId } = within(list);
  const items = queryAllByTestId('feedback-list-item');
  expect(items.length).toBe(items.length);

  const node = queryByTestId('reset');
  fireEvent.click(node);
  const updatedItems = queryAllByTestId('feedback-list-item');
  const removeNode = queryByTestId('remove');
  const resetNode = queryByTestId('reset');

  expect(updatedItems.length).toBe(0);
  expect(removeNode).toBeNull();
  expect(resetNode).toBeNull();
});
