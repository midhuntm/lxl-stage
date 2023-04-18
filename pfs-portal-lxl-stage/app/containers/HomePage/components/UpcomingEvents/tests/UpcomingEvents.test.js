import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import UpcomingEventsView from '../UpcomingEventsView';

const events = [
  {
    Description:
      'PTM for Middle School will be taking place Online. All parents are requested to be available at allocated time slots. Please ensure that your ward is present for the meeting in the video call.',
    EndDateTime: '2021-06-26T21:30:00.000Z',
    Id: '00U1y0000034bWIEAY',
    Location: 'Online via Board Room, First Floor',
    StartDateTime: '2021-06-26T17:00:00.000Z',
    Subject: 'PTM- Middle School',
    count: 7,
    type: 'Un-Registered',
  },
  {
    Description: 'Upcoming MUN details have been sent to all Parents.',
    EndDateTime: '2021-07-07T18:00:00.000Z',
    Id: '00U1y0000034cVMEAY',
    Location: 'Online, Zoom Call',
    StartDateTime: '2021-07-07T17:00:00.000Z',
    Subject: 'MUN - Model United Nations',
    count: 3,
    type: 'Un-Registered',
  },
  {
    Description: 'Workshop on VR by Google',
    EndDateTime: '2021-06-30T11:07:13.000Z',
    Id: '00U1y0000034cwSEAQ',
    Location: 'Auditorium 1',
    StartDateTime: '2021-06-30T11:07:13.000Z',
    Subject: 'Workshop in VR',
    count: 1,
    type: 'Registered',
  },
  {
    Description: 'Description helloo ada asdas',
    EndDateTime: '2021-07-07T07:39:43.000Z',
    Id: '00U1y0000034djvEAA',
    Location: 'Delhi',
    StartDateTime: '2021-07-02T07:39:43.000Z',
    Subject: 'Test Subject',
    count: 0,
    type: 'Registered',
  },
];
const handleSelected = jest.fn((e, type) => {});

afterEach(() => {
  cleanup();
});
describe('Upcoming events test', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={events} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { findByTestId } = render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={events} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>
    );

    expect(findByTestId('events-container')).toMatchSnapshot();
  });
  it('Component should render without any error if events value is null', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={null} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>,
      div
    );
  });
  it('filter handler should be called with proper args', async () => {
    const { getByLabelText, getByTestId } = render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={events} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>
    );
    const all = getByTestId('filter-all');
    expect(all).toBeTruthy();
    fireEvent.click(all);
    let firstArg = handleSelected.mock.calls[0][0];
    let secondArg = handleSelected.mock.calls[0][1];
    expect(Object.keys(firstArg).includes('target')).toBeTruthy();
    expect(secondArg).toBe('all');

    const registered = getByTestId('filter-registered');
    expect(registered).toBeTruthy();
    fireEvent.click(registered);
    firstArg = handleSelected.mock.calls[1][0];
    secondArg = handleSelected.mock.calls[1][1];
    expect(Object.keys(firstArg).includes('target')).toBeTruthy();
    expect(secondArg).toBe('registered');

    const unregistered = getByTestId('filter-unregistered');
    expect(unregistered).toBeTruthy();
    fireEvent.click(unregistered);
    firstArg = handleSelected.mock.calls[2][0];
    secondArg = handleSelected.mock.calls[2][1];
    expect(Object.keys(firstArg).includes('target')).toBeTruthy();
    expect(secondArg).toBe('unregistered');
  });

  it('events should be displayed with title, type and description', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={events} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>
    );
    const titles = getAllByTestId('event-title');
    expect(titles.length === 4).toBeTruthy();
    const tags = getAllByTestId('event-type-tag');
    expect(tags.length === 4).toBeTruthy();
    const descriptions = getAllByTestId('event-description');
    expect(descriptions.length === 4).toBeTruthy();

    expect(titles[0].textContent).toBe(events[0].Subject);
    expect(tags[0].textContent).toBe(events[0].type);
  });

  it('Description should have 70 characters max', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider>
        <Router>
          <UpcomingEventsView events={events} handleSelected={handleSelected} />
        </Router>
      </ThemeProvider>
    );
    for (let i = 0; i < 2; i++) {
      let description = getAllByTestId('event-description')[i].textContent;
      let lastThreeChars = description.slice(
        description.length - 3,
        description.length
      );
      if (events[0].Description.length > 70) {
        expect(lastThreeChars).toBe('...');
      } else {
        expect(description).toBe(events[i].Description);
        expect(lastThreeChars).not.toBe('...');
      }
    }
  });
});
