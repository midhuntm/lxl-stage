import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import QuizItems from './QuizItems';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.KenColors.neutral20,
    maxHeight: '91vh',
    overflow: 'hidden',
    margin: '-70px -24px -80px -24px',
    [theme.breakpoints.only('xs')]: {
      overflow: 'auto',
    },
  },
  quizContainer: {
    marginTop: '8px',
  },
  titleHead: {
    textAlign: 'center',
  },
  success: {
    fontSize: '14px',
    color: theme.palette.KenColors.green,
    marginTop: theme.spacing(3),
  },
  heading: {
    fontSize: '18px',
    fontWeight: 600,
  },
  instruction: {
    fontSize: '16px',
    fontWeight: 600,
    marginLeft: '16px',
  },
  btn: {
    marginRight: '16px',
  },
  expand: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#A8AFBC',
  },
}));

export default function AssessmentPreviewQuestionList(props) {
  const { data = [] } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const getAnswer = options => {
    if (Array.isArray(options) && options.length > 0) {
      let obj = options.find(item => item.hasOwnProperty('rightanswer'));
      return obj?.label || '';
    } else {
      return '';
    }
  };

  return (
    <Box data-testid={'assessment-view'}>
      {data &&
        data?.map((item, index) => {
          return (
            <Box p={2}>
              <QuizItems
                quizItem={{
                  question: item?.questiontext,
                  options: item?.options,
                  type: item?.qtype,
                  id: item?.id,
                  serialNumber: `Q${index + 1}.`,
                  answer: getAnswer(item?.options),
                  mark: item?.mark || 0,
                  matchOptions: item?.options,
                }}
              />
            </Box>
          );
        })}
    </Box>
  );
}
