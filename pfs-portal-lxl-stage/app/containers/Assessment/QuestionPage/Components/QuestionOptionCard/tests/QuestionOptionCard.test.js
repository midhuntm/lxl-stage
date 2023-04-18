import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../utils/themeProvider';
import QuestionOptionCard from '../index';
import { BrowserRouter as Router } from 'react-router-dom';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

afterEach(() => {
  cleanup();
});

const options = [
  {
    icon: <SubdirectoryArrowRightIcon />,
    label: 'content',
  },
];

describe('Add question option card', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot without props', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionOptionCard />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionOptionCard />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('addQuestion - optionCard')).toMatchSnapshot();
  });

  it('should render and match the snapshot with props', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <AddQuestionOptionCard data={options} />
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

    expect(getByTestId('addQuestion - optionCard')).toMatchSnapshot();
  });
});
