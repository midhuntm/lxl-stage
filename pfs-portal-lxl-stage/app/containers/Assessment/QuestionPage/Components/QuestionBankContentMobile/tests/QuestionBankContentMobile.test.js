import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionBankContentMobile from '../index';
import filterData from '../../QuestionBankContent/data';
afterEach(() => {
  cleanup();
});

describe('Question bank content mobile', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionBankContentMobile filterData={filterData} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankContentMobile filterData={filterData} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-content-mobile')).toMatchSnapshot();
  });
});
