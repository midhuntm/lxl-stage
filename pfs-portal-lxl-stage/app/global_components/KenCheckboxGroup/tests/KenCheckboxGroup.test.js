import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import ThemeProvider from '../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import KenCheckboxGroup from '..';

afterEach(() => {
  cleanup();
});

const options = [
  {
    label: 'item 1',
    value: 'item1',
  },
  {
    label: 'item 2',
    value: 'item2',
  },
  {
    label: 'item 3',
    value: 'item3',
  },
];

describe('Checkbox group test', () => {
  it('should render and match the snapshot and only check the one which is present in value array', () => {
    const onChange = jest.fn();

    const { container, getByTestId } = render(
      <ThemeProvider>
        <Router>
          <KenCheckboxGroup
            options={options}
            value={['item1']}
            onChange={onChange}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('checkbox-group')).toMatchSnapshot();
    expect(container.querySelector('input[name="item1"]')).toBeChecked();
    expect(container.querySelector('input[name="item2"]')).not.toBeChecked();
    expect(container.querySelector('input[name="item3"]')).not.toBeChecked();
  });

  it('onChange should be called with updated list of values', () => {
    const onChange = jest.fn();
    const { container, getByTestId } = render(
      <ThemeProvider>
        <Router>
          <KenCheckboxGroup
            options={options}
            value={['item1']}
            onChange={onChange}
          />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('checkbox-group')).toMatchSnapshot();
    fireEvent.click(container.querySelector('input[name="item2"]'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['item1', 'item2']);
  });
});
