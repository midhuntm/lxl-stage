import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import AddQuestions from '../index';
import { BrowserRouter as Router } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

afterEach(() => {
  cleanup();
});

const array = [
  {
    accordionIcon: <InfoOutlinedIcon />,
    accordionHeader: 'Add Manually',
    subArray: [
      {
        icon: <InfoOutlinedIcon />,
        label: 'Multiple choice',
        infoIcon: <InfoOutlinedIcon />,
      },
      {
        icon: <InfoOutlinedIcon />,
        label: 'True / False',
        infoIcon: <InfoOutlinedIcon />,
      },
    ],
  },
];

describe('add-questions', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot without props', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <AddQuestions />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <AddQuestions />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('add-questions')).toMatchSnapshot();
  });

  it('should render and match the snapshot with props', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <AddQuestionOptionCard data={array} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <AddQuestionOptionCard data={options} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('add-questions')).toMatchSnapshot();
  });
});
