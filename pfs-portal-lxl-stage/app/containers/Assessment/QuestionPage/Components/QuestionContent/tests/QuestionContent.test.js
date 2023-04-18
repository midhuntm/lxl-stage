import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../utils/themeProvider';
import QuestionContent from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Add question option card', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionContent />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionContent />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('add-content')).toMatchSnapshot();
  });
});
