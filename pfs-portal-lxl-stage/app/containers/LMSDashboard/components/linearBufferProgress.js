import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LinearBufferProgressBar(props) {
  const classes = useStyles();
  const {
    value,
    valueBuffer,
    barBackgroundColor,
    borderRadius,
    barBorderRadius,
    bottomBackgroundColor,
    height,
  } = props;

  const BorderLinearProgress = withStyles(theme => ({
    root: {
      height: height || 10,
      borderRadius: borderRadius || 5,
    },
    colorPrimary: {
      backgroundColor:
        bottomBackgroundColor ||
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: barBorderRadius || 5,
      backgroundColor: barBackgroundColor || '#1a90ff',
    },
  }))(LinearProgress);

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        variant="buffer"
        value={value}
        valueBuffer={valueBuffer}
      />
    </div>
  );
}
