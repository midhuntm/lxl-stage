import React, { useEffect } from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import MyAssessments from '..';
import {
  AppContextProvider,
  useAppContext,
} from '../../../../../utils/contextProvider/AppContext';

afterEach(() => {
  cleanup();
});
const tempAssessments = [
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
  {
    name: 'Assessment 1',
    subject: 'Subject 1',
    duedate: '12/11/21',
    marks: 6,
    total: 10,
    type: 'Appeared',
    url: '',
  },
];

const TestComp = () => {
  const { state, dispatch } = useAppContext();
  useEffect(() => {
    dispatch({
      type: 'updateUserDetails',
      value: {
        ContactId: '0031y00000F1W3PAAV',
        Name: 'Sanchit Faculty',
        Type: 'Faculty',
        Phone: '9405609450',
        mail: 'sanchith.faculty@ken42.com',
        address: '',
        AccountId: '0011y000008iLmlAAE',
        AccountName: 'National Center For Excellence (CVR Branch)',
        Roles: [
          {
            Id: '0031y00000F1W3PAAV',
            ClassId: 'a0F1y000000fARUEA2',
            ClassName: '2020-NCECVR-PS-ClassIII',
            AccountId: '0011y000008iLnAAAU',
            AccountName: 'NCECVR-Class III',
            department: 'NCECVR-Primary School',
            departmentId: '0011y000008iLmmAAE',
            Section: 'B',
            Role: 'Class Teacher',
          },
        ],
      },
    });
  }, []);
  return (
    <ThemeProvider>
      <Router>
        <MyAssessments details={tempAssessments} />
      </Router>
    </ThemeProvider>
  );
};

describe('My Assessment', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <MyAssessments details={tempAssessments} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <MyAssessments details={tempAssessments} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('my-assessments')).toMatchSnapshot();
  });
  it('Assessment count sould be displyed correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <MyAssessments details={tempAssessments} />
        </Router>
      </ThemeProvider>
    );
    const label = getByTestId('my-assessments-label');
    const labeltext = label.textContent;
    const count = labeltext.split('(')[1].split(')')[0];
    expect(count).toBe('6');
  });
});
