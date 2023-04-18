import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import KenButton from '../../../../global_components/KenButton';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  questionViewBox: {
    position: 'relative',
    height: '100%',
    padding: '15px',
    // backgroundColor: 'white',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    textTransform: 'uppercase',
    color: '#061938',
    marginTop: '8px',
    marginBottom: '12px',
    marginLeft: '7px',
  },
  questionText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    color: '#505F79',
    // color: theme.palette.KenColors.neutral400,
  },
  sectionHeading: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    // color: "#061938",
    color: theme.palette.KenColors.neutral900,
    marginBottom: '8px',
    marginTop: '8px',
  },

  sectionContent: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '100%',
    // color: "#505F79"
    color: theme.palette.KenColors.neutral400,
    marginBottom: '8px',
  },
  actionSection: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  errorDiv: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const QuestionPreview = props => {
  const { question, setDetailedViewQuestion, setShowAddManuallyBtn } = props;
  const [questionData, setQuestionData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const [answers, setAnswers] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (question?.questiontext) {
      setQuestionData(question);
    } else {
      setLoadingError(true);
    }

    if (question?.options) {
      const ans = getCorrectAnswer(question?.options);
      setAnswers(ans);
    }
  }, [question]);

  const getCorrectAnswer = opts => {
    return opts?.filter(item => item.correctAnswer === true || item.rightanswer === true);
  };
  const classes = useStyles();
  return (
    <Box className={classes.questionViewBox} component={Paper}>
      <Typography className={classes.sectionHeading}>
        {t('labels:Question')}
      </Typography>
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
        <Grid container justifyContent="space-around" spacing={1}>
          <Grid item xs={12} className={classes.questionText}>
            {/* <span style={{ width: '3%' }}>{`${question.number}.`}</span> */}
            <span style={{ width: '97%', marginBottom: '8px' }}>
              {parse(question.questiontext)}
            </span>
          </Grid>
          {!question?.type === 'shortanswer' && (
            <Grid item xs={12}>
              <div className={classes.sectionContent}>
                {question.options.map(option => (
                  <div style={{ marginLeft: '16px', marginTop: '9px' }}>
                    <RadioButtonUncheckedOutlinedIcon fontSize="small" />
                    {option.label}
                  </div>
                ))}
              </div>
            </Grid>
          )}
          <Grid item xs={12}>
            {question?.type !== 'essay' && <Typography className={classes.sectionHeading}>{t('labels:Answer')}</Typography>}

            <div className={classes.sectionContent}>
              <>
                {question?.type === 'shortanswer' ? (
                  <>
                    <Box m={1} mt={2}>
                      {Array.isArray(question?.options) &&
                        question?.options?.length > 0 &&
                        question?.options?.map(item => {
                          return (
                            <Box pb={2}>
                              <Typography className={classes.answer}>
                                Answer: <span className={classes.text}>{item.option || item.label || item.answer}</span>
                              </Typography>
                              {item.fraction && (
                                <Typography className={classes.answer}>
                                  Grade: <span className={classes.text}>{item.fraction}</span>
                                </Typography>
                              )}

                              {item.feedback && (
                                <Typography className={classes.answer}>
                                  Feedback: <span className={classes.text}>{item.feedback}</span>
                                </Typography>
                              )}
                            </Box>
                          );
                        })}
                    </Box>
                  </>
                ) : (
                  <Box m={1} mt={2}>
                    {Array.isArray(answers) &&
                      answers.length > 0 &&
                      answers.map(item => {
                        return (
                          <Typography className={classes.answer}>
                            <span className={classes.text}>{item.option || item.label} </span>
                          </Typography>
                        );
                      })}
                  </Box>
                )}
              </>
              {/* {question.options && question.options.length
                ? question.options.reduce(
                    (accum, curr, index, arr) =>
                      accum + curr.rightanswer
                        ? curr.label + (index !== arr.length - 1 ? ', ' : '')
                        : '',
                    ''
                  )
                : 'NA'} */}
            </div>
          </Grid>

          <Grid item xs={12} style={{ position: 'absolute', bottom: '0px', width: '100%' }} >
            <div className={classes.actionSection}>
              <KenButton
                variant={'primary'}
                label={'Back'}
                onClick={() => {
                  setDetailedViewQuestion(null);
                  setShowAddManuallyBtn(true)
                }
                }
                style={{ margin: '10px' }}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default QuestionPreview;