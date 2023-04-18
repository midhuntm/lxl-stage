import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';
import KenButton from '../../../../../global_components/KenButton';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  sectionHeading: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.KenColors.neutral900,
    marginBottom: '16px',
  },
  questionText: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  sectionContent: {
    fontWeight: 400,
    color: theme.palette.KenColors.neutral400,
    marginBottom: '24px',
  },
  actionSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '12px 0px',
  },
  errorDiv: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  customHTMLlabel: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 13,
    color: theme.palette.KenColors.neutral100
  },
}));

const QuestionBankQuestionDetail = props => {
  const { question, setDetailedViewQuestion } = props;
  const [questionData, setQuestionData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (question?.questiontext) {
      setQuestionData(question);
    } else {
      setLoadingError(true);
    }
  }, [question]);

  const classes = useStyles();
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {loadingError ? (
        <div className={classes.errorDiv}>
          <p>{t('labels:unable_to_load_question_detail')}</p>
          <KenButton
            variant={'primary'}
            label={'Back'}
            onClick={() => setDetailedViewQuestion(null)}
          />
        </div>
      ) : (
        <>
          {questionData && (
            <>
              <Typography className={classes.sectionHeading}>
                {t('labels:Question')}
              </Typography>
              <Typography className={classes.questionText}>
                {/* <div style={{ width: '3%' }}>{`${question.number}.`}</div> */}
                <div style={{ width: '97%' }}>
                  {/* <div style={{ marginBottom: '8px' }}>
                    {question.questiontext}
                  </div> */}
                  <div className={classes.customHTMLlabel}>
                    {/* <p style={{ minWidth: 'max-content', paddingRight: 5 }}>
                      {`${question.number}.`}</p> */}
                    {parse(question.questiontext)}
                  </div>
                  <div className={classes.sectionContent}>
                    {question.options.map(option => (
                      <div style={{ marginBottom: '8px' }}>
                        <RadioButtonUncheckedOutlinedIcon fontSize="small" />{' '}
                        {parse(`${option?.label || ''}`)}
                      </div>
                    ))}
                  </div>
                </div>
              </Typography>
              <Typography className={classes.sectionHeading}>Marks: {parseFloat(question.defaultmark)}</Typography>
              <br />
              <Typography className={classes.sectionHeading}>
                {t('labels:Answer')}
              </Typography>
              <div className={classes.sectionContent}>
                {question.options && question.options.length
                  ? question.options.reduce(
                    (accum, curr, index, arr) =>
                      accum + curr.rightanswer
                        ? curr.label + (index !== arr.length - 1 ? ', ' : '')
                        : '',
                    ''
                  )
                  : 'NA'}
              </div>
              <Typography className={classes.sectionHeading}>
                {t('labels:Detail_description')}
              </Typography>
              <div className={classes.sectionContent}>NA</div>
              <div className={classes.actionSection}>
                <KenButton
                  variant={'primary'}
                  label={'Back'}
                  onClick={() => setDetailedViewQuestion(null)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionBankQuestionDetail;
