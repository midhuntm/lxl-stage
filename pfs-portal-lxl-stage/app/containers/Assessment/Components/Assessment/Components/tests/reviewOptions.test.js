import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../../../../../../utils/themeProvider';

import ReviewOptions from '../ReviewOptions';
import ReviewOptionsTabPanel from '../ReviewOptions/ReviewOptionsTabPanel';
import OptionsSelection from '../ReviewOptions/OptionsSelection';
import OptionLabel from '../ReviewOptions/OptionLabel';
import SelectedTabTemplate from '../ReviewOptions/SelectedTabTemplate';
import SampleQuestion from '../../../../../../components/Question';
import OptionCardContent from '../ReviewOptions/OptionCardContent';

const reviewOptions = [
  {
    id: '1',
    label: 'The attempt',
    color: '#EB716C',
    checked: false,
    content: {
      data: [
        {
          textColor: '#00B25D',
          text: 'Excellent work ! your answer is correct.',
          icon: 'check',
          bgColor: '#CCE9E4',
          concatWith: 'or',
        },
        {
          textColor: '#FF9D54',
          text: 'Not bad ! your answer is partially correct.',
          icon: 'exclamation',
          concatWith: 'or',
          bgColor: '#F7EEE3',
        },
        {
          textColor: '#EF4060',
          text: 'Your answer is incorrect.',
          icon: 'cross',
          bgColor: '#FFEDED',
        },
      ],
    },
  },
  {
    id: '2',
    label: 'Whether correct',
    color: '#43B4B4',
    checked: false,
    content: {
      data: [
        {
          textColor: '#00B25D',
          text: 'Your answer is correct!',
          icon: 'check',
          bgColor: '#CCE9E4',
        },
      ],
    },
  },
  {
    id: '3',
    label: 'Marks',
    color: '#092682',
    checked: false,
    content: {
      data: [
        {
          textColor: '#092682',
          text: 'Your total score is 90.',
          bgColor: '#EEF7FF',
          borderColor: '#092682',
          icon: 'trophy',
        },
      ],
    },
  },
  {
    id: '4',
    label: 'Specific feedback',
    color: '#FF9D54',
    checked: false,
    content: {
      data: [
        {
          textColor: '#FF9D54',
          bgColor: '#fff',
          text: 'Specific feedback example comes here...',
          icon: null,
        },
      ],
    },
  },
  {
    id: '5',
    label: 'General feedback',
    color: '#0077FF',
    checked: false,
    content: {
      data: [
        {
          textColor: '#0077FF',
          bgColor: '#fff',
          text: 'General feedback example comes here...',
          icon: null,
        },
      ],
    },
  },
  {
    id: '6',
    label: 'Right answer',
    color: '#505F79',
    checked: false,
    content: {
      data: [
        {
          textColor: '#505F79',
          borderColor: '#F7F8F9',
          bgColor: '#F7F8F9',
          text: 'Correct answer : Option 3',
          icon: null,
        },
      ],
    },
  },
  {
    id: '7',
    label: 'Overall feedback',
    color: '#997AFF',
    checked: false,
    content: {
      data: [
        {
          textColor: '#997AFF',
          bgColor: '#fff',
          text:
            'An overall feedback for assessment comes here.Commenting about the overall attempt of the assessment.',
          icon: null,
        },
      ],
    },
  },
];
const tabId = '1';

it('ReviewOptions should render correctly', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <ReviewOptions />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('ReviewOptionsTabPanel should render correctly', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <ReviewOptionsTabPanel />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionsSelection should render correctly without props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionsSelection />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionsSelection should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionsSelection reviewOptions={reviewOptions} tabId={tabId} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionLabel should render correctly without props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionLabel />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionLabel should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionLabel color="red" label="Hello" />
      </ThemeProvider>
    </IntlProvider>
  );

  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionLabel color="red" label="Hello" />
      </ThemeProvider>
    </IntlProvider>
  );

  const labelNode = queryByTestId('option-label');
  expect(labelNode).toBeTruthy();
  expect(labelNode.textContent).toBe('Hello');
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('SelectedTabTemplate should render correctly without props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <SelectedTabTemplate />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('SelectedTabTemplate should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <SelectedTabTemplate reviewOptions={reviewOptions} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('SampleQuestion should render correctly', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <SampleQuestion />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionCardContent should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionCardContent reviewOptions={reviewOptions} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('OptionCardContent should render correctly with props', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionCardContent data={reviewOptions} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
});

it('Sub content of OptionCardContent should render correctly', () => {
  const {
    container: { firstChild },
  } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionCardContent data={reviewOptions} />
      </ThemeProvider>
    </IntlProvider>
  );
  const data = [
    {
      id: '1',
      label: 'The attempt',
      color: '#EB716C',
      checked: true,
      content: {
        data: [
          {
            textColor: '#00B25D',
            text: 'Excellent work ! your answer is correct.',
            icon: 'check',
            bgColor: '#CCE9E4',
            concatWith: 'or',
          },
        ],
      },
    },
  ];
  const { queryByTestId } = render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <OptionCardContent data={data} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
  expect(firstChild).toBeTruthy();
  const content = queryByTestId('custom-content');
  expect(content).toBeTruthy();
});
