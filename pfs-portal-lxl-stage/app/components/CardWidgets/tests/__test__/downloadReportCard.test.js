import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';
import DownloadReportCard from '../../downloadReportCard';
import ThemeProvider from '../../../../utils/themeProvider';

afterEach(() => {
  cleanup();
});

describe('DownloadReportCard renders correctly', () => {
  it('DownloadReportCard children render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider>
        <DownloadReportCard />
      </ThemeProvider>,
      div
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <DownloadReportCard />
      </ThemeProvider>
    );

    const assessmentIcon = getByTestId('assessment-image');
    expect(assessmentIcon).toBeTruthy();

    const btn = getByTestId('download-button');
    expect(btn).toBeTruthy();
    fireEvent.click(btn);

    const programName = getByTestId('program-name');
    expect(programName).toBeTruthy();

    expect(getByTestId('download-report-card')).toMatchSnapshot();
  });
});
