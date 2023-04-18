import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import OptionCardContent from '../../../../../Assessment/Components/Assessment/Components/ReviewOptions/OptionCardContent';
import { getIcon } from '../../QuestionTypes/Utils';
import PurpleKenChip from '../../QuestionTypes/DisplayComponents/PurpleKenChip';
import parse from 'html-react-parser';
import KenSelect from '../../../../../../global_components/KenSelect';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
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
}));

export default function QuestionPreview({
  heading,
  question,
  marks,
  answers = [],
  options = [],
  correctAnswerFeedback,
  wrongAnswerFeedback,
  partiallyCorrectAnswerFeedback,
  generalFeedback,
  tags,
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

  const getNode = () => {
    return (
      <KenSelect
        label={''}
        options={['A', 'B', 'C', 'D']}
        name="questionGrades"
        variant="outline"
        optionalLabel={false}
      />
    );
  };
  const getQuestion = j => {
    const q = '[[1]][[2]]is a [[3]]';
    const dashSeparatedString = q?.replace(/\[\[[^\]]*\]\]/g, '---');
    const dashSeparatedString1 = j?.replace(/\[\[[^\]]*\]\]/g, '---');
    console.log('dashSeparatedString', dashSeparatedString);
    console.log('dashSeparatedString1', dashSeparatedString1);
    const arr = dashSeparatedString?.split('---');
    const arr1 = dashSeparatedString1?.split('---');
    const newArray = arr?.map(item => {
      return item?.trim();
    });
    const newArray1 = arr1?.map(item => {
      return item?.trim();
    });

    console.log('newArray', newArray);
    console.log('newArray1', newArray1);
    const finalArray = newArray?.map(item => {
      if (item === '') {
        return { type: 'blank', text: '' };
      } else {
        return { type: 'text', text: item };
      }
    });
    const result = [];
    const finalArray1 = newArray1?.map((item, index) => {
      if (item === '') {
        result.push({ type: 'blank', text: '' });
      } else if (index <= newArray1?.length && newArray1[index + 1] !== '') {
        result.push({ type: 'text', text: item }, { type: 'blank', text: '' });
      } else {
        result.push({ type: 'text', text: item });
      }
    });
    console.log('finalArray', finalArray);
    console.log('result', result);
    return result || [];

    // return parse(`${finalArray.join('')}`);
  };

  return (
    <>
      <Box>
        <Box className={classes.container} m={1}>
          {/* <Typography className={classes.text}> */}
          <Box display="flex" flexDirection="row">
            {1}.{' '}
            {getQuestion(question)?.map(item => {
              if (item.type === 'blank') {
                return (
                  <Box pl={1} pr={1} width="130px">
                    <KenSelect
                      label={''}
                      options={options}
                      name="questionGrades"
                      variant="outline"
                      optionalLabel={false}
                    />
                  </Box>
                );
              } else {
                return <Typography>{item.text}</Typography>;
              }
            }) || '____________________________'}
          </Box>
          {/* </Typography> */}
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
                  {opt?.label || opt?.option || '____________'}
                </li>
              );
            })}
        </ol>
        <Box m={1}>
          <Typography className={classes.text}>Answer</Typography>
        </Box>
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
