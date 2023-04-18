import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchableCheckList from '../index';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
const options = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3' },
];
const handleChange = jest.fn();
describe('Searchable check list', () => {
  it('should render and match the snapshot for checkbox', () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            type={'checkbox'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('checklist-container')).toMatchSnapshot();
    expect(queryByTestId('checkbox-group')).toBeTruthy();
    expect(queryByTestId('radio-group')).toBeFalsy();
  });
  it('should render and match the snapshot for radio button', () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            type={'radio'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('checklist-container')).toMatchSnapshot();
    expect(queryByTestId('checkbox-group')).toBeFalsy();
    expect(queryByTestId('radio-group')).toBeTruthy();
  });

  it('Search functionality should work', () => {
    const { container, queryByTestId } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            type={'checkbox'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    let checks = container.querySelectorAll("input[type='checkbox']");
    expect(checks).toHaveLength(3);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'item 1' } });
    expect(input).toHaveValue('item 1');
    checks = container.querySelectorAll("input[type='checkbox']");
    expect(checks).toHaveLength(1);
  });

  it('default Search text value functionality should work', () => {
    const { container } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            searchTextValue="item 1"
            type={'checkbox'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    let checks = container.querySelectorAll("input[type='checkbox']");
    expect(checks).toHaveLength(1);
    expect(container.querySelector("input[name='item1']")).toBeTruthy();
    expect(container.querySelector("input[name='item2']")).toBeFalsy();
    expect(container.querySelector("input[name='item3']")).toBeFalsy();
  });

  it('Verify handleChange is called', () => {
    const { container } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            searchTextValue=""
            type={'checkbox'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    fireEvent.click(container.querySelector('input[name="item1"]'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(['item1']);
    cleanup();
    const { container: container1 } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            searchTextValue=""
            type={'checkbox'}
            name={''}
            value={['item1']}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );
    fireEvent.click(container1.querySelector('input[name="item2"]'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0]).toEqual(['item1', 'item2']);
  });

  it('Verify handleChange is called after search', () => {
    const { container } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            searchTextValue=""
            type={'checkbox'}
            name={''}
            value={[]}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    fireEvent.click(container.querySelector('input[name="item1"]'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(['item1']);

    const { container: container1, queryByTestId } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            searchTextValue=""
            type={'checkbox'}
            name={''}
            value={['item1']}
            options={options}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'item 2' } });
    fireEvent.click(container1.querySelector('input[name="item2"]'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0]).toEqual(['item1', 'item2']);
  });
  it('Search functionality should work for partial match', () => {
    const { container, queryByTestId } = render(
      <ThemeProvider>
        <Router>
          <SearchableCheckList
            isSearchEnabled={true}
            type={'checkbox'}
            name={''}
            value={[]}
            options={[...options, { label: 'Test data', value: 'test' }]}
            handleChange={handleChange}
            isSearchCaseSensitive={false}
          />
        </Router>
      </ThemeProvider>
    );

    let checks = container.querySelectorAll("input[type='checkbox']");
    expect(checks).toHaveLength(4);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'item' } });
    expect(input).toHaveValue('item');
    checks = container.querySelectorAll("input[type='checkbox']");
    expect(checks).toHaveLength(3);
    checks.forEach((check, index) => {
      expect(check.getAttribute('name')).toBe(options[index].value);
    });
  });
});
