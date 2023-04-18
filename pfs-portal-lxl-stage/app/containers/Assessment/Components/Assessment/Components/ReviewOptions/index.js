import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KenTabs from '../../../../../../components/KenTabs';
import { Box, Typography } from '@material-ui/core';
import ReviewOptionsTabPanel from './ReviewOptionsTabPanel';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { FaTrophy } from 'react-icons/fa';
import KenIcon from '../../../../../../global_components/KenIcon';

const useStyles = makeStyles(theme => ({
  timeContainer: {
    background: theme.palette.KenColors.neutral10,
    padding: 16,
  },
  timeWrap: {
    width: '100%',
  },
  header: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },
  tabPanel: {
    backgroundColor: theme.palette.KenColors.neutral20,
  },
}));

export default function ReviewOptions(props) {
  const { t } = useTranslation();
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [reviewTabsData, setReviewTabsData] = useState();

  const getIcon = (type, textColor) => {
    switch (type) {
      case 'check':
        return (
          <KenIcon
            icon={CheckIcon}
            styles={{
              color: theme.palette.KenColors.tertiaryGreen300 || textColor,
            }}
          />
        );

      case 'cross':
        return (
          <KenIcon
            icon={ClearIcon}
            styles={{
              color: theme.palette.KenColors.tertiaryRed400 || textColor,
            }}
          />
        );

      case 'exclamation':
        return (
          <KenIcon
            icon={PriorityHighIcon}
            styles={{
              color: theme.palette.KenColors.tertiaryYellow300 || textColor,
            }}
          />
        );

      case 'trophy':
        return (
          <KenIcon
            icon={FaTrophy}
            styles={{
              color: theme.palette.KenColors.tertiaryBlue502 || textColor,
            }}
          />
        );

      default:
        return null;
    }
  };

  const [data, setData] = useState([
    {
      tabId: '1',
      tabLabel: 'During the attempt',
      reviewOptions: [
        {
          id: '1',
          label: 'The attempt',
          color: '#EB716C',
          labelFor: "attemptduring",
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Excellent work ! your answer is correct.',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
                concatWith: 'or',
              },
              {
                textColor: '#FF9D54',
                text: 'Not bad ! your answer is partially correct.',
                icon: getIcon('exclamation'),
                concatWith: 'or',
                bgColor: '#F7EEE3',
              },
              {
                textColor: '#EF4060',
                text: 'Your answer is incorrect.',
                icon: getIcon('cross'),
                bgColor: '#FFEDED',
              },
            ],
          },
        },
        {
          id: '2',
          label: 'Whether correct',
          labelFor: "correctnessduring",
          color: '#43B4B4',
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Your answer is correct!',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
              },
            ],
          },
        },
        {
          id: '3',
          label: 'Marks',
          labelFor: "marksduring",
          color: '#092682',
          checked: false,
          content: {
            data: [
              {
                textColor: '#092682',
                text: 'Your total score is 90.',
                bgColor: '#EEF7FF',
                borderColor: '#092682',
                icon: getIcon('trophy'),
              },
            ],
          },
        },
        {
          id: '4',
          label: 'Specific feedback',
          labelFor: "specificfeedbackduring",
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
          labelFor: "generalfeedbackduring",
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
          labelFor: "rightanswerduring",
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
          labelFor: "overallfeedbackduring",
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
      ],
    },
    {
      tabId: '2',
      tabLabel: 'Immediately after attempt',
      reviewOptions: [
        {
          id: '1',
          label: 'The attempt',
          labelFor: "attemptimmediately",
          color: '#EB716C',
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Excellent work ! your answer is correct.',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
                concatWith: 'or',
              },
              {
                textColor: '#FF9D54',
                text: 'Not bad ! your answer is partially correct.',
                icon: getIcon('exclamation'),
                concatWith: 'or',
                bgColor: '#F7EEE3',
              },
              {
                textColor: '#EF4060',
                text: 'Your answer is incorrect.',
                icon: getIcon('cross'),
                bgColor: '#FFEDED',
              },
            ],
          },
        },
        {
          id: '2',
          label: 'Whether correct',
          labelFor: "correctnessimmediately",
          color: '#43B4B4',
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Your answer is correct!',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
              },
            ],
          },
        },
        {
          id: '3',
          label: 'Marks',
          labelFor: "marksimmediately",
          color: '#092682',
          checked: false,
          content: {
            data: [
              {
                textColor: '#092682',
                text: 'Your total score is 90.',
                bgColor: '#EEF7FF',
                borderColor: '#092682',
                icon: getIcon('trophy'),
              },
            ],
          },
        },
        {
          id: '4',
          label: 'Specific feedback',
          labelFor: "specificfeedbackimmediately",
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
          labelFor: "generalfeedbackimmediately",
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
          labelFor: "rightanswerimmediately",
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
          labelFor: "overallfeedbackimmediately",
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
      ],
    },
    {
      tabId: '3',
      tabLabel: 'Later (quiz open)',
      reviewOptions: [
        {
          id: '1',
          label: 'The attempt',
          labelFor: "attemptopen",
          color: '#EB716C',
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Excellent work ! your answer is correct.',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
                concatWith: 'or',
              },
              {
                textColor: '#FF9D54',
                text: 'Not bad ! your answer is partially correct.',
                icon: getIcon('exclamation'),
                concatWith: 'or',
                bgColor: '#F7EEE3',
              },
              {
                textColor: '#EF4060',
                text: 'Your answer is incorrect.',
                icon: getIcon('cross'),
                bgColor: '#FFEDED',
              },
            ],
          },
        },
        {
          id: '2',
          label: 'Whether correct',
          labelFor: "correctnessopen",
          color: '#43B4B4',
          checked: false,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Your answer is correct!',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
              },
            ],
          },
        },
        {
          id: '3',
          label: 'Marks',
          labelFor: "marksopen",
          color: '#092682',
          checked: false,
          content: {
            data: [
              {
                textColor: '#092682',
                text: 'Your total score is 90.',
                bgColor: '#EEF7FF',
                borderColor: '#092682',
                icon: getIcon('trophy'),
              },
            ],
          },
        },
        {
          id: '4',
          label: 'Specific feedback',
          labelFor: "specificfeedbackopen",
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
          labelFor: "generalfeedbackopen",
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
          labelFor: "rightansweropen",
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
          labelFor: "overallfeedbackopen",
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
      ],
    },
    {
      tabId: '4',
      tabLabel: 'Quiz closed',
      reviewOptions: [
        {
          id: '1',
          label: 'The attempt',
          color: '#EB716C',
          labelFor: "attemptclosed",
          checked: true,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Excellent work ! your answer is correct.',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
                concatWith: 'or',
              },
              {
                textColor: '#FF9D54',
                text: 'Not bad ! your answer is partially correct.',
                icon: getIcon('exclamation'),
                concatWith: 'or',
                bgColor: '#F7EEE3',
              },
              {
                textColor: '#EF4060',
                text: 'Your answer is incorrect.',
                icon: getIcon('cross'),
                bgColor: '#FFEDED',
              },
            ],
          },
        },
        {
          id: '2',
          label: 'Whether correct',
          labelFor: "correctnessclosed",
          color: '#43B4B4',
          checked: true,
          content: {
            data: [
              {
                textColor: '#00B25D',
                text: 'Your answer is correct!',
                icon: getIcon('check'),
                bgColor: '#CCE9E4',
              },
            ],
          },
        },
        {
          id: '3',
          label: 'Marks',
          labelFor: "marksclosed",
          color: '#092682',
          checked: true,
          content: {
            data: [
              {
                textColor: '#092682',
                text: 'Your total score is 90.',
                bgColor: '#EEF7FF',
                borderColor: '#092682',
                icon: getIcon('trophy'),
              },
            ],
          },
        },
        {
          id: '4',
          label: 'Specific feedback',
          labelFor: "specificfeedbackclosed",
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
          labelFor: "generalfeedbackclosed",
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
          labelFor: "rightanswerclosed",
          color: '#505F79',
          checked: true,
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
          labelFor: "overallfeedbackclosed",
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
      ],
    },
  ]);

  const onChange = (e, newValue, tabID, optionID) => {
    let dataCopy = [...data];
    let matchingTab = dataCopy.find(review => review.tabId === tabID);
    let matchingOption = matchingTab?.reviewOptions?.find(
      option => option.id === optionID
    );
    matchingOption.checked = newValue;
    setFieldValue(String(matchingOption.labelFor), newValue)
    setData(dataCopy);
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      let formattedData = [];
      data?.map(tab => {
        let obj = {
          title: tab.tabLabel,
          titleCase: 'titleCase',
          content: (
            <ReviewOptionsTabPanel
              reviewOptions={tab?.reviewOptions}
              onChange={onChange}
              tabId={tab?.tabId}
            />
          ),
        };
        formattedData.push(obj);
      });
      setReviewTabsData(formattedData);
    }
  }, [data]);

  return (
    <>
      <Box className={classes.timeContainer} mt={2}>
        <Box className={classes.timeWrap}>
          <Typography className={classes.header}>
            {t('labels:Review_Options_Settings')}
          </Typography>
          {reviewTabsData && (
            <KenTabs
              data={reviewTabsData}
              tabPanelProps={{ className: classes.tabPanel }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
