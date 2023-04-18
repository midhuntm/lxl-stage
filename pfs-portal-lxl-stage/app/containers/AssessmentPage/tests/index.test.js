import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import ThemeProvider from '../../../utils/themeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import AssessmentPage from '../index';

const drawerChanges = () => { };

describe('AssessmentPage', () => {
    const div = document.createElement('div');
    it('should render and match the snapshot', () => {
        ReactDOM.render(
            <ThemeProvider>
                <Router>
                    <AssessmentPage drawerChanges={drawerChanges} />
                </Router>
            </ThemeProvider>,
            div
        );

        const { getByTestId } = render(
            <ThemeProvider>
                <Router>
                    <AssessmentPage drawerChanges={drawerChanges} />
                </Router>
            </ThemeProvider>
        );

        expect(getByTestId('assessment-view')).toMatchSnapshot();
    });
});