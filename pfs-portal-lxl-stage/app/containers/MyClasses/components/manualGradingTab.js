import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import ManualGradingOfSubjectiveQuestion from './ManualGradingOfSubjectiveQuestion';
import KenButton from '../../../global_components/KenButton';
// import KenChip from '../../../global_components/KenChip';

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
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
  correctAnswer: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.KenColors.kenBlack}`,
  },
  tf: {
    width: '100%',
    borderRadius: 5,
  },

  typoCorrectAnswer: {
    color: theme.palette.KenColors.kenBlack,
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
  backListText: {
    background: '#092682',
    borderRadius: 3,
    padding: '8px 12px',
    color: '#FFFFFF',
    fontSize: 14,
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
}));

export default function ManualGradingTab(props) {
  const { attemptId, data, userType, noData, quizInfo, setRefreshData } = props;

  const classes = useStyles();
  const [questionData, setQuestionData] = useState([]);
  const [subjectiveQuestionData, setSubjectiveQuestionData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    let questionArray = data?.questionstexts?.question || [];
    const subjectiveQuestionsArray = questionArray?.filter(
      item => item.type !== 'multichoice' && item.type !== 'truefalse'
    );
    const pendingQuestions = subjectiveQuestionsArray?.filter(item => item.status == "needsgrading" ||
      item.status == "mangrpartial");

    setSubjectiveQuestionData(pendingQuestions);
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
      {subjectiveQuestionData?.length > 0 &&
        subjectiveQuestionData.map((item, index) => {
          item['attemptId'] = attemptId;
          return (
            <ManualGradingOfSubjectiveQuestion
              questionText={parse(item?.questiontext || '') || ''}
              question={item?.questiontext || ''}
              marksObtained={parseInt(item?.markobtained) || 0}
              questionType={getQuestionType(item)}
              answer={item?.userresponse || ''}
              questionNumber={index + 1}
              maxMarks={item?.mark || 0}
              url={item?.url || ''}
              questionData={item}
              quizInfo={quizInfo}
              setRefreshData={setRefreshData}
            />
          );
        })}
      {/* <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} mt={2}>
                <KenButton
                    variant={'primary'}
                    className={classes.backListText}
                    onClick={DoManualGrading}
                    disabled={!isEdited}
                >
                    Grade
                </KenButton>
            </Box> */}

      {noData && (
        <Typography className={classes.nodataText}>No Data Found</Typography>
      )}
      {/* <table className={classes.table}>
                <tr>
                    <th className={classes.tableHeaderRow}>
                        <Typography className={classes.typoHeadText}>Questions</Typography>
                    </th>
                    <th className={classes.tableHeaderRow}>
                        {userType == 'Faculty' ? (
                            <Typography className={classes.typoHeadText}>
                                Student Answer
                            </Typography>
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
                {questionData.length > 0 &&
                    questionData.map((el, index) => {
                        return (
                            <tr>
                                <td className={classes.tableRow}>
                                    <Grid container>
                                        <Grid item>
                                            <div className={classes.questionTypoText}>
                                                <p className={classes.questionTypoText}>{index + 1}.</p>
                                                {parse(el?.questiontext)}
                                            </div>
                                        </Grid>
                                        <Grid item style={{ width: '100%' }}>
                                            <>
                                                <Grid container>
                                                    <Grid item>
                                                        <KenChip
                                                            label={getQuestionType(el)}
                                                            style={{
                                                                backgroundColor: '#DFE8FF',
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </>
                                        </Grid>
                                    </Grid>
                                </td>

                                <td className={classes.tableRow}>
                                    <Box p={2}>
                                        {el.userresponse == -1 ? (
                                            <Grid>
                                                <Typography style={{ wordBreak: 'keep-all' }}>
                                                    Skipped
                                                </Typography>
                                            </Grid>
                                        ) : (
                                            <>
                                                {el['multi-answer'] === true ? (
                                                    <Grid
                                                        container
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item>
                                                            <Typography>{el.userAnswer}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <Grid
                                                        container
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        className={`${classes.answer} ${el?.type ==
                                                            'truefalse' && classes.tf}`}
                                                        style={
                                                            el.answerStatus == 'correct'
                                                                ? correctStyle
                                                                : incorrectStyle
                                                        }
                                                    >
                                                        <Grid item>
                                                            <Typography>{el.userAnswer}</Typography>
                                                        </Grid>
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
                                            className={`${classes.correctAnswer} ${el?.type ==
                                                'truefalse' && classes.tf}`}
                                        >
                                            <Grid item>
                                                <Typography className={classes.typoCorrectAnswer}>
                                                    {el?.rightAnswer}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </td>
                                <td className={classes.tableRow}>
                                    <Box p={2}>
                                        <Grid container justifyContent="center">
                                            <Grid item>
                                                <Typography className={classes.typoText}>
                                                    {parseInt(el?.mark)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </td>
                                <td className={classes.tableRow}>
                                    <Box p={2}>
                                        <Grid container justifyContent="center">
                                            <Grid item>
                                                <Typography className={classes.typoText}>
                                                    {parseInt(el?.markobtained)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </td>
                            </tr>
                        );
                    })}
            </table> */}
    </Box>
  );
}
