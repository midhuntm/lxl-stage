import React from 'react';
import {
  render,
  fireEvent,
  within,
  queryByAttribute,
  getByTestId,
  cleanup,
  screen,
} from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../utils/themeProvider';
import QuestionBank from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Question bank', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionBank />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBank />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('question-bank')).toMatchSnapshot();
  });
});
