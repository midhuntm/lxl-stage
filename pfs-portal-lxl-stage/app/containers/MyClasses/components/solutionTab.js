import {
  Box,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenButton from '../../../global_components/KenButton';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: 32,
    height: 32,
    borderRadius: 3,
    marginRight: 8,
    cursor: 'pointer',
  },
  title: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
    marginLeft: -8,
  },
  typoQues: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 14,
    fontWeight: 600,
  },
  options: {
    fontSize: 13,
  },
  typoExplanation: {
    color: '#2862FF',
    fontSize: 14,
    fontWeight: 600,
  },
  buttonStyle: {
    background: '#CCE9E4',
    marginTop: 5,
  },
  buttonTextStyle: {
    color: '#00B25D',
  },
  wrongButtonStyle: {
    background: '#FFE8EC',
    marginTop: 5,
  },
  wrongButtonTextStyle: {
    color: '#EF4060',
  },
  questionTypoText: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
  disabledRadiobtn: {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'red',
    boxShadow: 'none',
    cursor: 'inherit',
  },
  nodataText: {
    fontSize: 14,
    padding: '10px 0px',
  },
  activeBox: {
    border: '1px solid #000'
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

export default function SolutionTab(props) {
  const { attemptId, noData } = props;
  const classes = useStyles();
  const [currentData, setCurrentData] = useState();
  const [questionData, setQuestionData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedQIdx, setSelectedQIdx] = useState(0)
  useEffect(() => {
    let questionArray = props?.data?.questionstexts?.question || [];
    let mcqOptions = [
      { label: 'A', value: 0 },
      { label: 'B', value: 1 },
      { label: 'C', value: 2 },
      { label: 'D', value: 3 },
    ];
    let trueFalseOptions = [
      { label: 'False', value: 0 },
      { label: 'True', value: 1 },
    ];

    let updatedQuesArr = questionArray.map((item, qIndex) => {
      item['qIndex'] = qIndex + 1;
      if (item.type == 'multichoice'
        //  & item['multi-answer'] !== true
      ) {
        item.qType = 'MCQ';
        let userAnswer = mcqOptions.find(val => val.value == Number(item?.userresponse))?.label;
        let userOption = item.options.findIndex(val => val?.correctanswer);

        let rightAnswer = '';
        let correctoption = ''
        item?.options.map(val => {
          if (val?.correctanswer) {
            let rightOpt = mcqOptions.find(opt => opt?.value == Number(val?.value));
            rightAnswer = rightOpt.label;
            correctoption = rightOpt.value
          }
        });
        item['correctoption'] = correctoption;
        item['userAnswer'] = userAnswer;
        item['rightAnswer'] = rightAnswer;
        item['userOption'] = userOption;
        item.answerStatus = String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
        return item;
      }
      // else if (item.type == 'multichoice' && item['multi-answer'] === true) {
      //   let userAnswer = mcqOptions.find(
      //     val => val.value == Number(item?.userresponse)
      //   )?.label;
      //   let rightAnswer = '';
      //   item?.options.map(val => {
      //     if (val?.correctanswer) {
      //       let rightOpt = mcqOptions.find(
      //         opt => opt?.value == Number(val?.value)
      //       );
      //       rightAnswer = rightOpt.label;
      //     }
      //   });
      //   item['userAnswer'] = userAnswer;
      //   item['rightAnswer'] = rightAnswer;
      //   item.answerStatus =
      //     String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
      //   return item;
      // } 
      else if (item.type == 'truefalse') {
        item.qType = 'True / False';

        let userAnswer = trueFalseOptions.find(val => val?.value == Number(item?.userresponse))?.label;
        let userOption = trueFalseOptions.findIndex(val => val?.value == Number(item?.userresponse));

        let rightAnswer = 'False';
        if (item?.correctoption) rightAnswer = 'True';
        item['userAnswer'] = userAnswer;
        item['rightAnswer'] = rightAnswer;
        item['userOption'] = userOption;
        item.answerStatus = String(rightAnswer) == String(userAnswer) ? 'correct' : 'incorrect';
        return item;
      }
      else return item;
    });
    console.log('updated question array', updatedQuesArr);
    const mcqTrueFalseQuestionsArray = updatedQuesArr?.filter(
      item => item.type === 'multichoice' || item.type === 'truefalse'
    );
    setQuestionData(mcqTrueFalseQuestionsArray);
    // setQuestionData(updatedQuesArr)
    if (mcqTrueFalseQuestionsArray.length > 0) {
      setSelectedValue(mcqTrueFalseQuestionsArray[0]?.correctoption);
      setCurrentData(mcqTrueFalseQuestionsArray[0]);
    }
    // setSelectedQIdx(0)
  }, []);

  const selectQuestion = (question, idx) => {
    console.log(question);
    setCurrentData(question);
    setSelectedValue(question?.correctoption);
    setSelectedQIdx(idx)
  };

  return (
    <Box p={1}>
      <Box p={2} style={{ border: ' 1px solid #DFE1E6' }}>
        <Typography className={classes.title}>Quiz Navigation</Typography>
        <Grid container alignItems="center">
          {questionData.length > 0 &&
            questionData.map((el, index) => {
              return (
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  //  ${selectedQIdx == index + 1 ? classes.activeBox : ''} 
                  className={`${classes.buttonContainer}  ${selectedQIdx == index ? classes.activeBox : ''} 
                  ${el?.answerStatus == 'correct' ? classes.buttonStyle : classes.wrongButtonStyle}`}
                  onClick={e => selectQuestion(el, index)}
                >
                  <Typography
                    className={
                      el?.answerStatus == 'correct'
                        ? classes.buttonTextStyle
                        : classes.wrongButtonTextStyle
                    }
                  >
                    {index + 1}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {!noData ? (
        <Box mt={2}>
          <Grid container direction="column">
            <div className={classes.questionTypoText}>
              <p style={{ minWidth: 'max-content', paddingRight: 5 }}>{currentData?.qIndex}.{' '} </p>
              <div className={classes.mediaItem}>
                {currentData && parse(currentData?.questiontext || '') || ''}
              </div>
            </div>
            {/* <Grid item> Marks allotted: +1 Time Taken: {data.time}</Grid> */}
            <Grid item>
              <RadioGroup value={selectedValue} disabled classes={{ disabled: classes.disabledRadiobtn }}>
                {currentData?.options.map((el, i) => {
                  return (
                    <FormControlLabel
                      value={Number(el?.value)}
                      control={<Radio value={Number(el?.value)} />}
                      label={<Typography className={classes.options}>{el?.label}</Typography>}
                    />
                  );
                })}
              </RadioGroup>
            </Grid>
            {/* {currentData?.answerStatus == 'incorrect' && <p>Answer: {currentData?.rightAnswer}</p>} */}
            {/* <Grid item>
            <Typography className={classes.typoExplanation}>
              Explanation
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 13 }}>{data.explanation}</Typography>
          </Grid> */}
          </Grid>
        </Box>
      ) : (
        <Typography className={classes.nodataText}>No Data Found</Typography>
      )}
      {/* <Box mt={2}>
        <Grid item container spacing={2} justifyContent="flex-end">
          <Grid item>
            <KenButton
              variant="secondary"
              label="Previous Question"
              disabled={data.index === 1 && true}
              onClick={() => {
                setData(solution[0]);
                setValue('D. Identifying set');
              }}
            />
          </Grid>
          <Grid item>
            <KenButton
              variant="primary"
              label="Next Question"
              onClick={() => {
                setData(solution[1]);
                setValue('D. Data Definition Language');
              }}
            />
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}
