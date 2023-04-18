import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../../../utils/themeProvider';

import CourseContentCreation from '../index';
import AssessmentsTab from '../Components/AssessmentsTab';
import LessonsTab from '../Components/LessonsTab';
import AssignmentsTab from '../Components/AssignmentsTab';
import AssignmentsCard from '../Components/AssignmentsCard';
import LessonsCard from '../Components/LessonsCard';

describe('<CourseContentCreation />', () => {
  it('CourseContentCreation should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <CourseContentCreation />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<AssessmentsTab />', () => {
  it('AssessmentsTab should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <AssessmentsTab />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<AssignmentsTab />', () => {
  it('AssignmentsTab should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <AssignmentsTab />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<LessonsTab />', () => {
  it('LessonsTab should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <LessonsTab />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<AssignmentsCard />', () => {
  it('AssignmentsCard should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <AssignmentsCard />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<LessonsCard />', () => {
  it('LessonsCard should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <LessonsCard />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});

const data = [
  {
    name: 'Math',
    duedate: '12/07/2021',
    allowsubmissionsfromdate: '12/05/2021',
  },
];

it('AssessmentsTab renders correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <AssessmentsTab data={data} />
      </ThemeProvider>
    </IntlProvider>
  );

  expect(firstChild).toMatchSnapshot();
});

it('AssignmentsTab renders correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <AssignmentsTab data={data} />
      </ThemeProvider>
    </IntlProvider>
  );

  expect(firstChild).toMatchSnapshot();
});

it('LessonsTab renders correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <LessonsTab data={data} />
      </ThemeProvider>
    </IntlProvider>
  );

  expect(firstChild).toMatchSnapshot();
});

it('AssignmentsCard renders correctly with props', () => {
  render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <AssignmentsCard
          name="Hello"
          startDate="12/07/2021"
          dueDate="12/08/2021"
        />
      </ThemeProvider>
    </IntlProvider>
  );
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <AssignmentsCard
          name="Hello"
          startDate="12/07/2021"
          dueDate="12/08/2021"
        />
      </ThemeProvider>
    </IntlProvider>
  );

  const assignmentTitle = queryByTestId('assignment-title');
  expect(assignmentTitle).toBeTruthy();
  expect(assignmentTitle.textContent).toBe('Hello');

  const assignmentStartDate = queryByTestId('assignment-start-sate');
  expect(assignmentStartDate).toBeTruthy();
  expect(assignmentStartDate.textContent).toBe('Starts_On: 12/07/2021 ');

  const assignmentDueDate = queryByTestId('assignment-due-date');
  expect(assignmentDueDate).toBeTruthy();
  expect(assignmentDueDate.textContent).toBe('Due_On: 12/08/2021 ');
});

it('LessonsCard renders correctly with props', () => {
  render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <LessonsCard name="Hello" startDate="12/07/2021" dueDate="12/08/2021" />
      </ThemeProvider>
    </IntlProvider>
  );
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <LessonsCard name="Hello" startDate="12/07/2021" dueDate="12/08/2021" />
      </ThemeProvider>
    </IntlProvider>
  );

  const lessonTitle = queryByTestId('lesson-title');
  expect(lessonTitle).toBeTruthy();
  expect(lessonTitle.textContent).toBe('Hello');

  const lessonStartDate = queryByTestId('lesson-start-date');
  expect(lessonStartDate).toBeTruthy();
  expect(lessonStartDate.textContent).toBe('Starts_On: 12/07/2021 ');

  const lessonDueDate = queryByTestId('lesson-due-date');
  expect(lessonDueDate).toBeTruthy();
  expect(lessonDueDate.textContent).toBe('Deadline: 12/08/2021 ');
});
