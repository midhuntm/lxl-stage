import { Box, Typography, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  colorBoxContainer: {
    display: 'flex',
    marginBottom: 10,
  },
  colorBox: {
    borderRadius: 3,
    width: 24,
    height: 24,
    [theme.breakpoints.down('sm', 'md')]: {
      fontSize: 15,
    },
  },
  colorBoxText: {
    fontSize: 13,
    color: theme.palette.KenColors.neutral400,
    marginLeft: 5,
    alignSelf: 'center',
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
  },
  ansBoxColor: {
    background: theme.palette.KenColors.secondaryBlue,
    '& > *': {
      color: theme.palette.KenColors.gradeSectionHeaderLabel,
    },
  },
  flgBoxColor: {
    background: theme.palette.KenColors.orange11,
    '& > *': {
      color: theme.palette.KenColors.orange10,
    },
  },
  skipBoxColor: {
    background: theme.palette.KenColors.neutral40,
    '& > *': {
      color: theme.palette.KenColors.neutral400,
    },
  },
  notVisitedBoxColor: {
    background: theme.palette.KenColors.sideNavColor,
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    '& > *': {
      color: theme.palette.KenColors.neutral400,
    },
  },
  ansFlgBoxColor: {
    position: 'relative',
    background: theme.palette.KenColors.secondaryBlue,
    '& > *': {
      color: theme.palette.KenColors.gradeSectionHeaderLabel,
    },
    '& > span': {
      position: 'absolute',
      right: 2,
      top: 2,
      borderRadius: 3,
      width: 6,
      height: 6,
      background: theme.palette.KenColors.orange10,
    },
  },
  typoTitle: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },
}));

const ANALYSIS_STATUS = {
  flagged: 'Flagged',
  skipped: 'Skipped',
  totalMarks: 'Total Marks',
  marksObtained: 'Obtained Marks',
  correctOnes: 'Correct Ones',
  incorrectOnes: 'Incorrect Ones'
}

export function ColorBox({ name, value }) {
  const classes = useStyles();
  return (
    <Box className={classes.colorBoxContainer}>
      <Box className={[classes.colorBox, getBoxStatusColor(name)].join(' ')}>
        <span className={classes.colorBoxDot} />
      </Box>
      <Typography className={classes.colorBoxText}>
        {name}: {value ? value : 0}
      </Typography>
    </Box>
  );
}

function getBoxStatusColor(status) {
  const classes = useStyles();

  switch (status) {
    case ANALYSIS_STATUS.flagged:
      return classes.flgBoxColor;

    case ANALYSIS_STATUS.skipped:
      return classes.skipBoxColor;

    case ANALYSIS_STATUS.marksObtained:
      return classes.ansBoxColor;

    case ANALYSIS_STATUS.totalMarks:
      return classes.notVisitedBoxColor;

    case ANALYSIS_STATUS.correctOnes:
      return classes.ansFlgBoxColor;

    default:
      return classes.notVisitedBoxColor;
  }
}

const AnalysisBoxData = [
  {
    name: ANALYSIS_STATUS.flagged,
    label: "flagged",
  },
  {
    name: ANALYSIS_STATUS.skipped,
    label: "not answered",
  },
  {
    name: ANALYSIS_STATUS.marksObtained,
    label: "marksobtain",
  },
  {
    name: ANALYSIS_STATUS.totalMarks,
    label: "totalmarks",
  },
  {
    name: ANALYSIS_STATUS.correctOnes,
    label: "correct",
  },
  {
    name: ANALYSIS_STATUS.incorrectOnes,
    label: "incorrect",
  },
];


export default function QuizAnalysis(props) {
  const classes = useStyles();
  const { quizAnalysisData } = props
  const [boxData, setBoxData] = useState([])

  useEffect(() => {
    console.log('quizAnalysisData', quizAnalysisData)
    let boxData = []

    AnalysisBoxData.map((item, i) => {
      quizAnalysisData && quizAnalysisData.map((item1, idx) => {
        if (String(item.label).toLowerCase() == String(item1.name).toLowerCase()) {
          item.value = item1.value
          boxData.push(item)
        }
      })
    })
    setBoxData(boxData)
  }, [quizAnalysisData])

  return (
    <Box p={2}>
      <Typography className={classes.typoTitle}>Quiz Analysis</Typography>
      <Grid container>
        {boxData.map(el => {
          return (
            <Grid item md={6} sm={6} xs={12}>
              <ColorBox name={el.name} value={el.value} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
