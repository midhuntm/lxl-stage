import { makeStyles } from '@material-ui/core';
import React from 'react';
import KenDialogBox from '../../../../../components/KenDialogBox';
import QuestionBankContent from '../QuestionBankContent';

const useStyles = makeStyles(theme => ({
  mobileDialog: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height: '100%',
      width: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      // width: '987px',0
      width: 'calc(100% - 250px)'
    },
  },
}));

const QuestionBankModal = props => {
  const { open, onClose, handleAddQuestions, selectedQuestions } = props;
  const classes = useStyles();

  return (
    <div data-testid="questionbank-modal">
      <KenDialogBox
        open={open}
        handleClose={onClose}
        dialogActionFlag={false}
        maxWidth="987"
        styleOverrides={{ dialogPaper: classes.mobileDialog }}
      >
        <QuestionBankContent
          handleQuestionBankClose={onClose}
          handleAddQuestions={handleAddQuestions}
          selectedQuestions={selectedQuestions}
        />
      </KenDialogBox>
    </div>
  );
};

export default QuestionBankModal;
