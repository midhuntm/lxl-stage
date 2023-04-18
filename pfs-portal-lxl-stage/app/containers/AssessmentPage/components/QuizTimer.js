import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  LinearProgress,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    marginBottom: 9,
  },
  timerBox: {
    background: theme.palette.KenColors.tertiaryGreen49,
    padding: 5,
    borderRadius: 3,
    // width: 105,
    width: 'fit-content',
    maxWidth: '100%',
  },
  timerText: {
    fontWeight: 600,
    fontSize: 24,
    color: theme.palette.KenColors.tertiaryGreen,
  },
  progressBarBox: {
    width: '100%',
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 27,
  },
  colorPrimary: {
    backgroundColor: theme.palette.KenColors.neutral20,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.KenColors.tertiaryGreen49,
  },
}));

export default function QuizTimer({ totalTime, handleSubmit }) {
  const classes = useStyles();
  const TimerRef = useRef(null);
  const ProgressBarRef = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const [progress, setProgress] = React.useState(0);
  // timer
  const getTimeRemaining = endTime => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(total / 1000 / 60 / 60);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const setTimeFormat = (hours, minutes, seconds) => {
    return (
      (hours > 9 ? hours : '0' + hours) +
      ':' +
      (minutes > 9 ? minutes : '0' + minutes) +
      ':' +
      (seconds > 9 ? seconds : '0' + seconds)
    );
  };
  const startTimer = endTime => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(setTimeFormat(hours, minutes, seconds));
    } else {
      if (TimerRef.current) clearInterval(TimerRef.current);
    }
  };
  const clearTimer = endTime => {
    const { hours, minutes, seconds } = getTimeRemaining(endTime);
    setTimer(setTimeFormat(hours, minutes, seconds));

    if (TimerRef.current) clearInterval(TimerRef.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    TimerRef.current = id;
  };
  const getEndTime = () => {
    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + totalTime);
    return endTime;
  };
  useEffect(() => {
    clearTimer(getEndTime());
  }, []);

  //progtress bar
  useEffect(() => {
    const progressInterval = 100 / totalTime;
    const progressTimer = setInterval(() => {
      setProgress(oldProgress => oldProgress + progressInterval);
    }, 500);
    ProgressBarRef.current = progressTimer;
    return () => {
      if (ProgressBarRef.current) clearInterval(ProgressBarRef.current);
    };
  }, []);
  useEffect(() => {
    if (progress === 100 && ProgressBarRef.current) {
      handleSubmit();
      clearInterval(ProgressBarRef.current);
    }
  }, [progress]);

  return (
    <Paper square elevation={0} className={classes.root}>
      <Box className={classes.timerBox}>
        <Typography className={classes.timerText}>{timer}</Typography>
      </Box>
      <Box className={classes.progressBarBox}>
        <LinearProgress
          variant="determinate"
          value={progress}
          className={classes.progressBar}
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      </Box>
    </Paper>
  );
}
