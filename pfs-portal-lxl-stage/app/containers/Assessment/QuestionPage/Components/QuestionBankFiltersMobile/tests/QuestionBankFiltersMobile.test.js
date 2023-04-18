import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { data, data1 } from '../../QuestionBankFilters/tests/data';
import QuestionBankFiltersMobile from '../index';
afterEach(() => {
  cleanup();
});

const handleCloseFilter = jest.fn();
const getSelectedFiltersCount = jest.fn();
const handleChange = jest.fn();
const handleExpand = jest.fn();
const handleClearFilter = jest.fn();

describe('Question bank content', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionBankFiltersMobile
            filterData={data}
            handleCloseFilter={handleCloseFilter}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFiltersMobile
            filterData={data}
            handleCloseFilter={handleCloseFilter}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-filters-mobile')).toMatchSnapshot();
  });

  it('Verify cancel button click', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFiltersMobile
            filterData={data}
            handleCloseFilter={handleCloseFilter}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    const cancelButton = getByTestId('footer-secondary-button');
    expect(cancelButton).toBeTruthy();
    fireEvent.click(cancelButton);
    expect(handleCloseFilter).toHaveBeenCalled();
  });

  it('Verify open filter item', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFiltersMobile
            filterData={data}
            handleCloseFilter={handleCloseFilter}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    const chapterFilter = getByText('Chapter');
    expect(chapterFilter).toBeTruthy();
    fireEvent.click(chapterFilter);
    expect(handleExpand).toHaveBeenCalled();
  });
});
