import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenHeader from '../../../../../../global_components/KenHeader';
import KenButton from '../../../../../../global_components/KenButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import KenIcon from '../../../../../../global_components/KenIcon';
import {
  QUESTION_TYPES,
  TRANSACTIONS,
} from '../../../../../../utils/constants';
import MultipleChoice from '../../QuestionTypes/DisplayComponents/subjective';
import { getQuestionContent } from '../../QuestionTypes/Utils';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
    // overflow: 'auto',
    // maxHeight: '470px',
    // '&::-webkit-scrollbar': {
    //   width: '4px',
    // },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral700}`,
    },
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },

  configureContents: {
    textAlign: 'center',
    background: theme.palette.KenColors.neutral11,
    margin: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 440,
    borderRadius: 3,
  },
  label: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    width: '70%',
    margin: '28px auto',
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
}));

export default function CreateUpdateQuestion(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { transaction, type, selectedQuestion } = props;
  const question =
    transaction === TRANSACTIONS.UPDATE || transaction === TRANSACTIONS.EDIT ? selectedQuestion : undefined;

  return (
    <Box data-testid="question-detail">
      <Box className={classes.content}>
        <Box>{getQuestionContent(type, question, transaction, props)}</Box>
      </Box>
      {/* <Box className={classes.content}>{questionContent}</Box> */}
    </Box>
  );
}
