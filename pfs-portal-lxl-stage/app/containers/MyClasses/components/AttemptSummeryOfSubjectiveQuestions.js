import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import KenChip from '../../../global_components/KenChip';

const useStyles = makeStyles(theme => ({
  marks: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  container: {
    border: '1px solid #DFE1E6',
  },
  text: {
    fontSize: '12px',
  },
  questionTypoText: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
}));

export default function AttemptSummeryOfSubjectiveQuestions(props) {
  const {
    questionNumber,
    questionText,
    questionType,
    marksObtained,
    answer,
    maxMarks,
    gradeStatus,
  } = props;
  const classes = useStyles();
  return (
    <Box p={2} className={classes.container}>
      <Box display="flex" alignItems="center" >
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.questionTypoText}>
            <p className={classes.questionTypoText}
              style={{ minWidth: 'max-content', paddingRight: 5 }}>{questionNumber}.</p>
            <div>{questionText}</div>
          </div>
        </Grid>
      </Box>
      <Box>
        <Typography className={classes.text}>Answer By Student:</Typography>
        <Typography variant="body1" className={classes.marks}>{answer}</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" pt={2}>
        <Typography variant="body1" className={classes.marks}>{`Alloted Marks: ${maxMarks}`}</Typography>
        <Typography variant="body1" className={classes.marks}>{`Obtained Marks: ${marksObtained}`}</Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" pt={2}>
        <Typography variant="body1">
          <KenChip label={questionType} style={{ backgroundColor: '#DFE8FF', }} />
        </Typography>

        <Typography variant="body1" align='right'>
          <KenChip
            label={gradeStatus == "mangrpartial" ? "Partially Graded" : (gradeStatus == "needsgrading" ? "Not Graded" : 'Graded')}
            style={{
              backgroundColor: gradeStatus == "mangrpartial" ? "#DFE8FF"
                : (gradeStatus == "needsgrading" ? "#FF0000" : '#008000'),
              color: gradeStatus == "mangrpartial" ? "#000"
                : (gradeStatus == "needsgrading" ? "#FFF" : '#FFF'),
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}
