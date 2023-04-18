import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Assignments from '../../Assignments';
import ThemeProvider from '../../../../utils/themeProvider';

const assignments = [
  {
    name: 'test',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '1',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '2',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
];
const assignments1 = [
  {
    name: 'test',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '1',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '2',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '3',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '4',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '5',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
  {
    name: 'test2',
    duedate: '7-10-2021',
    subject: 'English',
    marks: 9,
    total: 10,
    type: 'Submitted',
    id: '6',
    url: '',
    allowsubmissionsfromdate: '7-10-2021',
  },
];

afterEach(() => {
  cleanup();
});

describe('Assignments Card test', () => {
  it('Assignments card should render correctly and match the snapshot', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider>
        <Assignments details={assignments} />
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Assignments details={assignments} />
      </ThemeProvider>
    );

    expect(getByTestId('assignments')).toMatchSnapshot();
  });
  it('No Assignments label', () => {
    const { queryByTestId, rerender } = render(
      <ThemeProvider>
        <Assignments details={assignments} />
      </ThemeProvider>
    );
    expect(queryByTestId('no-assignments')).toBeFalsy();
    rerender(
      <ThemeProvider>
        <Assignments details={[]} />
      </ThemeProvider>
    );
    expect(queryByTestId('no-assignments')).toBeTruthy();
  });

  it('Show more label', () => {
    const { queryByTestId, rerender } = render(
      <ThemeProvider>
        <Assignments details={assignments} />
      </ThemeProvider>
    );
    expect(queryByTestId('show-more')).toBeFalsy();
    rerender(
      <ThemeProvider>
        <Assignments details={assignments1} />
      </ThemeProvider>
    );
    expect(queryByTestId('show-more')).toBeTruthy();
  });
  it('should be able to handle null value', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider>
        <Assignments details={null} />
      </ThemeProvider>,
      div
    );
  });
});
