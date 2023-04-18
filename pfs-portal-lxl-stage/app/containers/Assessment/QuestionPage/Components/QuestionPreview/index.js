import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import OptionCardContent from '../../../../Assessment/Components/Assessment/Components/ReviewOptions/OptionCardContent';
import { getIcon } from '../QuestionTypes/Utils';
import PurpleKenChip from '../QuestionTypes/DisplayComponents/PurpleKenChip';
import KenInputField from '../../../../../components/KenInputField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  circle: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  text: {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.palette.KenColors.neutral900,
  },
  heading: {
    fontSize: '14px',
  },
  marks: {
    padding: '4px 12px',
    background: '#F9F9F9',
    borderRadius: '27px',
    minWidth: 'max-content'
  },
  ol: {
    fontWeight: 400,
  },
  li: {
    padding: '5px',
  },
  answer: {
    fontSize: '12px',
    fontWeight: 'normal',
  },
  feedback: {
    margin: '4px 0px',
    fontSize: '12px',
    color: theme.palette.KenColors.neutral900,
  },
  questionTypoText: {
    // display: 'flex',
    // alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    minWidth: 'max-content',
    paddingRight: 5,
    color: theme.palette.KenColors.neutral400,
    float: 'left',
  },
  questionTypoBox: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,

  },
  containerBox: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  subjectiveTypoBox: {
    display: 'unset',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  }
}));

export default function QuestionPreview({
  hideAnswerText = false,
  heading,
  question = '',
  marks,
  answers = [],
  answersWithGrade,
  options = [],
  correctAnswerFeedback,
  wrongAnswerFeedback,
  partiallyCorrectAnswerFeedback,
  generalFeedback,
  tags,
  matchOptions, //specific to match the following
  qtype
}) {
  const classes = useStyles();

  const correctAnswer = [
    {
      textColor: '#00B25D',
      text: correctAnswerFeedback,
      icon: getIcon('check'),
      bgColor: '#CCE9E4',
    },
  ];

  const wrongAnswer = [
    {
      textColor: '#EF4060',
      text: wrongAnswerFeedback,
      icon: getIcon('cross'),
      bgColor: '#FFEDED',
    },
  ];

  const partiallyCorrectAnswer = [
    {
      textColor: '#FF9D54',
      text: partiallyCorrectAnswerFeedback,
      icon: getIcon('exclamation'),
      bgColor: '#F7EEE3',
    },
  ];

  const generalFeedBackObj = [
    {
      textColor: '#0077FF',
      bgColor: '#fff',
      text: generalFeedback,
      icon: null,
    },
  ];

  return (
    <>
      <Box>
        <Box className={classes.container} m={1}>
          {/* <Typography className={classes.text} >
            {1}. {question || '____________________________'}
          </Typography> */}
          <Box className={classes.containerBox} m={1}>
            {/* <div className={qtype !== 'essay' ? classes.questionTypoBox : classes.subjectiveTypoBox}> */}
            <div className={classes.questionTypoBox}>
              <p className={classes.questionTypoText}>{1}.</p>
              <div>{question || '____________________________'}
              </div>
            </div>
          </Box>
          <Typography className={`${classes.text} ${classes.marks}`}>
            {marks || '--'} Marks
          </Typography>
        </Box>
        <ol type="A" className={`${classes.text} ${classes.ol}`}>
          {Array.isArray(options) &&
            options.length > 0 &&
            options.map(opt => {
              return (
                <li className={classes.li}>
                  {opt?.option || opt?.label || '____________'}
                </li>
              );
            })}
        </ol>
        {Array.isArray(matchOptions) && matchOptions.length > 0 && (
          <Grid container xs={12} md={12}>
            <>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={6}>
                  <Typography className={classes.labelText}>
                    Column A
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.labelText}>
                    Column B
                  </Typography>
                </Grid>
                {matchOptions?.map((optItem, index) => {
                  return (
                    <React.Fragment>
                      <Grid item xs={6}>
                        <KenInputField
                          name={`matchOptions[${index}]['key']`}
                          value={matchOptions[index]['key']}
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <KenInputField
                          name={`matchOptions[${index}]['value']`}
                          value={matchOptions[index]['value']}
                          disabled={true}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
              {/* <Divider className={classes.divider} /> */}
            </>
          </Grid>
        )}

        {!hideAnswerText && <Box m={1}>
          <Typography className={classes.text}>Answer:</Typography>
        </Box>
        }
        <>
          {/* specific to short answer */}
          {answersWithGrade ? (
            <Box m={1} mt={2}>
              {Array.isArray(answersWithGrade) &&
                answersWithGrade.length > 0 &&
                answersWithGrade.map(item => {
                  return (
                    <Box pb={2}>
                      <Typography className={classes.answer}>
                        Answer:{' '}
                        <span className={classes.text}>
                          {item.option || item.label || item.answer}
                        </span>
                      </Typography>
                      {item.fraction && (
                        <Typography className={classes.answer}>
                          Grade:{' '}
                          <span className={classes.text}>{item.fraction}</span>
                        </Typography>
                      )}

                      {item.feedback && (
                        <Typography className={classes.answer}>
                          Feedback:{' '}
                          <span className={classes.text}>{item.feedback}</span>
                        </Typography>
                      )}
                    </Box>
                  );
                })}
            </Box>
          ) : (
            <Box m={1} mt={2}>
              {Array.isArray(answers) &&
                answers.length > 0 &&
                answers.map(item => {
                  return (
                    <Typography className={classes.answer}>
                      Correct answer:{' '}
                      <span className={classes.text}>
                        {item.option || item.label}
                      </span>
                    </Typography>
                  );
                })}
            </Box>
          )}
        </>
        {correctAnswerFeedback && (
          <Box m={1} mt={2}>
            <Typography className={classes.feedback}>
              Feedback for correct answer
            </Typography>

            <OptionCardContent data={[...correctAnswer]} />
          </Box>
        )}
        {wrongAnswerFeedback && (
          <Box m={1} mt={2}>
            <Typography className={classes.feedback}>
              Feedback for incorrect answer
            </Typography>
            <OptionCardContent data={[...wrongAnswer]} />
          </Box>
        )}
        {partiallyCorrectAnswerFeedback && (
          <Box m={1} mt={2}>
            <Typography className={classes.feedback}>
              Feedback for partially correct answer
            </Typography>

            <OptionCardContent data={[...partiallyCorrectAnswer]} />
          </Box>
        )}
        {generalFeedback && (
          <Box m={1} mt={2}>
            <Typography className={classes.feedback}>
              General feedback
            </Typography>
            <OptionCardContent data={[...generalFeedBackObj]} />
          </Box>
        )}
        {tags && tags?.length > 0 && (
          <Box m={1} mt={2}>
            <Typography className={classes.feedback}>Tags</Typography>

            {tags?.map(tag => {
              return <PurpleKenChip label={tag?.text} />;
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
