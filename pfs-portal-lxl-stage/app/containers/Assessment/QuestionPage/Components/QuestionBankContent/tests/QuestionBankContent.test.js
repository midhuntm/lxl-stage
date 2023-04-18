import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import QuestionBankContent from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Question bank content', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionBankContent />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankContent />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-content')).toMatchSnapshot();
  });
});
