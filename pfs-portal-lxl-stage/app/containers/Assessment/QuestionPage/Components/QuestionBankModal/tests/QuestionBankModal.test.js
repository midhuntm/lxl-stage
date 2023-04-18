import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ReactDOM from 'react-dom';
import ThemeProvider from '../../../../../../utils/themeProvider';
import QuestionBankModal from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});
let open = true;
const onClose = function() {
  open = false;
};
describe('Question bank modal', () => {
  const div = document.createElement('div');
  it('should render and match the snapshot', () => {
    ReactDOM.render(
      <ThemeProvider>
        <Router>
          <QuestionBankModal open={true} onClose={onClose} />
        </Router>
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankModal open={true} onClose={onClose} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-modal')).toMatchSnapshot();
  });

  it('Modal is closed when value of open is false', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Router>
          <QuestionBankModal open={false} onClose={onClose} />
        </Router>
      </ThemeProvider>
    );

    expect(getByTestId('questionbank-modal')).toMatchSnapshot();
  });
});
