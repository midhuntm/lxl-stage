import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import AttemptSummeryOfSubjectiveQuestions from './AttemptSummeryOfSubjectiveQuestions';
import KenChip from '../../../global_components/KenChip';

const useStyles = makeStyles(theme => ({
  table: {
    border: '1px solid #DFE1E6',
  },
  tableRow: {
    border: '1px solid #DFE1E6',
    padding: 16,
  },
  tableHeaderRow: {
    border: '1px solid #DFE1E6',
    padding: 16,
  },
  answer: {
    width: 32,
    height: 32,
    fontSize: 12,
    borderRadius: '50%',
  },
  typoText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  typoHeadText: {
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  questionTypoText: {
    display: 'flex',
    alignItems: 'baseline',
    // alignItems: 'flex-start',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
  correctAnswer: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    fontSize: 12,
    border: `1px solid ${theme.palette.KenColors.kenBlack}`,
  },
  tf: {
    width: '100%',
    borderRadius: 5,
    minWidth: 'max-content',
    fontSize: 11
  },

  typoCorrectAnswer: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 12
  },
  chips: {
    background: '#DFE8FF',
    borderRadius: 43,
    padding: 8,
    marginRight: 8,
  },
  typoChip: {
    color: theme.palette.KenColors.primary,
    fontSize: 12,
  },
  nodataText: {
    fontSize: 14,
    padding: '10px 0px',
  },
  mediaItem: {
    '& img': {
      height: 80,
      width: 130
    },
    '& video': {
      height: 100,
      width: 150
    },
  }
}));

export default function QuestionReportTab(props) {
  const { attemptId, data, userType, noData } = props;

  const classes = useStyles();
  const [questionData, setQuestionData] = React.useState([]);
  const [subjectiveQuestionData, setSubjectiveQuestionData] = React.useState([]);
  const correctStyle = { color: '#00B25D', background: '#CCE9E4' };
  const incorrectStyle = { color: '#EF4060', background: '#FFE8EC' };

  useEffect(() => {
    let questionArray = data?.questionstexts?.question || [];

    let mcqOptions = [
      { label: 'A', value: 0 },
      { label: 'B', value: 1 },
      { label: 'C', value: 2 },
      { label: 'D', value: 3 },
    ];
    let trueFalseOptions = [
      { label: 'True', value: 1 },
      { label: 'False', value: 0 },
    ];
    let updatedQuesArr = questionArray.map(item => {
      if (item.type == 'multichoice' && item['multi-answer'] !== true) {
        item.qType = 'MCQ';
        let userAnswer = mcqOptions.find(
          val => val.value == Number(item?.userresponse)
        )?.label;
        let rightAnswer = '';
        item?.options.map(val => {
          if (val?.correctanswer) {
            let rightOpt = mcqOptions.find(
              opt => opt?.value == Number(val?.value)
            );
            rightAnswer = rightOpt.label;
          }
        });
        item['userAnswer'] = userAnswer;
        item['rightAnswer'] = rightAnswer;
        item.answerStatus =
          String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
        return item;
      } else if (item.type == 'multichoice' && item['multi-answer'] === true) {
        let userAnswer = mcqOptions.find(
          val => val.value == Number(item?.userresponse)
        )?.label;
        let rightAnswer = '';
        item?.options.map(val => {
          if (val?.correctanswer) {
            let rightOpt = mcqOptions.find(
              opt => opt?.value == Number(val?.value)
            );
            rightAnswer = rightOpt.label;
          }
        });
        item['userAnswer'] = userAnswer;
        item['rightAnswer'] = rightAnswer;
        item.answerStatus =
          String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
        return item;
      } else if (item.type == 'truefalse') {
        item.qType = 'True / False';
        let userAnswer = trueFalseOptions.find(
          val => val?.value == Number(item?.userresponse)
        )?.label;
        let rightAnswer = 'False';
        if (item?.correctoption) rightAnswer = 'True';
        item['userAnswer'] = userAnswer;
        item['rightAnswer'] = rightAnswer;
        item.answerStatus =
          String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
        return item;
      } else return item;
    });
    console.log('updated question array', updatedQuesArr);
    const mcqTrueFalseQuestionsArray = updatedQuesArr?.filter(
      item => item.type === 'multichoice' || item.type === 'truefalse'
    );
    const subjectiveQuestionsArray = questionArray?.filter(
      item => item.type !== 'multichoice' && item.type !== 'truefalse'
    );
    setQuestionData(mcqTrueFalseQuestionsArray);
    setSubjectiveQuestionData(subjectiveQuestionsArray);
  }, [data]);

  const getQuestionType = item => {
    let type;

    switch (item.type) {
      case 'essay':
        type = 'Essay';

        break;
      case 'multichoice':
        type = 'MCQ';
        break;
      case 'truefalse':
        type = 'True/False';
        break;
      case 'subjective':
        type = 'Subjective';
        break;
      case 'shortanswer':
        type = 'Short Answer';
        break;
      case 'numerical':
        type = 'Numerical';
        break;
      default:
        type = 'New';
        break;
    }

    if (item['multi-answer'] === true) {
      type = 'Multiple Answer MCQ';
    }

    return type;
  };

  return (
    <Box p={1}>
      {questionData?.length > 0 && (
        <table className={classes.table}>
          <tr>
            <th className={classes.tableHeaderRow}>
              <Typography className={classes.typoHeadText}>Questions</Typography>
            </th>
            <th className={classes.tableHeaderRow}>
              {userType == 'Faculty' ? (
                <Typography className={classes.typoHeadText}>Student Answer</Typography>
              ) : (
                <Typography className={classes.typoHeadText}>Your Answer</Typography>
              )}
            </th>
            <th className={classes.tableHeaderRow}>
              <Typography className={classes.typoHeadText}>Correct Answer</Typography>
            </th>
            <th className={classes.tableHeaderRow}>
              <Typography className={classes.typoHeadText}>Allotted Marks</Typography>
            </th>
            <th className={classes.tableHeaderRow}>
              <Typography className={classes.typoHeadText}>Obtained Marks</Typography>
            </th>
          </tr>
          {questionData.map((el, index) => {
            return (
              <tr>
                <td className={classes.tableRow}>
                  <Grid container>
                    <Grid item>
                      {/* {index + 1}. {el.ques} */}
                      <div className={classes.questionTypoText}>
                        <p style={{ minWidth: 'max-content', paddingRight: 5 }}>{index + 1}.</p>
                        {/* {parse(el?.questionText)} */}
                        <div className={classes.mediaItem}>
                          {parse(el?.questiontext || '') || ''}
                        </div>
                      </div>
                    </Grid>
                    <Grid item style={{ width: '100%' }}>
                      <>
                        <Grid container>
                          {/* {el.related.map(elem => {
                          return (
                            <Grid item className={classes.chips}>
                              <Typography className={classes.typoChip}>
                                {elem}
                              </Typography>
                            </Grid>
                          );
                        })} */}
                          <Grid item>
                            {/* <Typography className={classes.typoChip}>
                              {el.qType}
                            </Typography> */}
                            <KenChip label={getQuestionType(el)} style={{ backgroundColor: '#DFE8FF' }} />
                          </Grid>
                        </Grid>
                      </>
                    </Grid>
                  </Grid>
                </td>

                <td className={classes.tableRow}>
                  <Box p={2}>
                    {el.userresponse == -1 ? (
                      <Grid> <Typography style={{ wordBreak: 'keep-all' }}>Skipped</Typography> </Grid>
                    ) : (
                      <>
                        {el['multi-answer'] === true ? (
                          <Grid container justifyContent="center" alignItems="center">
                            <Grid item>{el.userAnswer}</Grid>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            className={`${classes.answer} ${el?.type == 'truefalse' && classes.tf}`}
                            style={el.answerStatus == 'correct' ? correctStyle : incorrectStyle}
                          >
                            <Grid item>{el.userAnswer}</Grid>
                          </Grid>
                        )}
                      </>
                    )}
                  </Box>
                </td>
                <td className={classes.tableRow}>
                  <Box p={2}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      className={`${classes.correctAnswer} ${el?.type == 'truefalse' && classes.tf}`}
                    >
                      <Grid item>
                        <Typography className={classes.typoCorrectAnswer}>{el?.rightAnswer}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </td>
                <td className={classes.tableRow}>
                  <Box p={2}>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography className={classes.typoText}>{parseInt(el?.mark)}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </td>
                <td className={classes.tableRow}>
                  <Box p={2}>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography className={classes.typoText}>{parseInt(el?.markobtained)}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </td>
              </tr>
            );
          })}
        </table>
      )}

      {subjectiveQuestionData?.length > 0 &&
        subjectiveQuestionData.map((item, index) => {
          return (
            <AttemptSummeryOfSubjectiveQuestions
              questionText={parse(item?.questiontext || '') || ''}
              marksObtained={parseInt(item?.markobtained) || 0}
              questionType={getQuestionType(item)}
              answer={item?.userresponse || ''}
              questionNumber={questionData.length + 1 + index}
              gradeStatus={item?.status}
              maxMarks={item?.mark}
            />
          );
        })}

      {noData && (
        <Typography className={classes.nodataText}>No Data Found</Typography>
      )}
    </Box>
  );
}
