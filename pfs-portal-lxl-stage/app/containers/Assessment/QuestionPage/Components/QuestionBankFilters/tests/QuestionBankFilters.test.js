import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import QuestionBankFilters from '../index';
import { BrowserRouter as Router } from 'react-router-dom';
import { data, data1 } from './data';
afterEach(() => {
  cleanup();
});

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
          <QuestionBankFilters
            filterData={data}
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
          <QuestionBankFilters
            filterData={data}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-filters')).toMatchSnapshot();
  });

  it('checkbox should be controlled', () => {
    const { container } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFilters
            filterData={data}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    let checkbox = container.querySelector("input[name='stars']");
    expect(checkbox).toBeTruthy();
    expect(checkbox).toBeChecked();
  });

  it('checkbox should be controlled 1', () => {
    const { container } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFilters
            filterData={data}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    let radio = container.querySelectorAll(
      "span[data-testid='radio-group'] input[type=radio]"
    );
    expect(radio[0]).toBeChecked();
  });

  it('Match count in chips based on actions', () => {
    const { getAllByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFilters
            filterData={data}
            getSelectedFiltersCount={jest.fn(() => 1)}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getAllByTestId('selectedfilter-count')[1].textContent).toBe('1');
  });

  it('clearall should work', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankFilters
            filterData={data}
            getSelectedFiltersCount={getSelectedFiltersCount}
            handleChange={handleChange}
            handleExpand={handleExpand}
            handleClearFilter={handleClearFilter}
          />
        </Router>
      </ThemeProvider>
    );

    const clearAll = getByTestId('clearall-button');
    fireEvent.click(clearAll);
    expect(handleClearFilter).toHaveBeenCalledTimes(1);
  });
});
