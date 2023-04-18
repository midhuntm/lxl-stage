import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { currentSchedule, data, schedules, user } from '../schedule-data';
import ScheduleView from '../ScheduleView';
import moment from 'moment';
afterEach(() => {
  cleanup();
});
let props = {
  user: user,
  snackbarData: {},
  handleSnackbarClose: jest.fn(),
  getCalendar: jest.fn(),
  updateCalendarDate: jest.fn(),
  title: 'TODAY',
  currentDate: moment().format('YYYY-MM-DD'),
  calRef: {},
  schedules: schedules,
  onClickSchedule: jest.fn(),
  config: {},
  popupStyles: {},
  popupRef: {},
  currentSchedule: undefined,
  setCurrentSchedule: jest.fn(),
  startClass: jest.fn(),
  joinClass: jest.fn(),
  bbbLink: undefined,
  activityUrl: undefined,
};
describe('Schedule', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <ScheduleView {...props} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <ScheduleView {...props} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('schedule-view')).toMatchSnapshot();
  });

  it('Verify curent date button', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <ScheduleView {...props} />
        </Router>
      </ThemeProvider>
    );
    expect(getByTestId('current-date-button')).toBeTruthy();
    expect(getByTestId('current-date-button').textContent.trim()).toBe('TODAY');
  });

  it('Verify schedule popup', () => {
    props = { ...props, currentSchedule: currentSchedule };
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <ScheduleView {...props} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('current-schedule')).toBeTruthy();
  });

  it('Component should render if schedules is null', () => {
    const div = document.createElement('div');
    props = { ...props, schedules: null };
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <ScheduleView {...props} />
        </Router>
      </ThemeProvider>,
      div
    );
  });
});
