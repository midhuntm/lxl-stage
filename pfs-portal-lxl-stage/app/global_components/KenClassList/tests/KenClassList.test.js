 import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import KenClassList from '../index';

describe('<KenClassList />', () => {
  it('Class List should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <Router>
            <KenClassList />
          </Router>
        </ThemeProvider>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
