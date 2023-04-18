import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Typography } from '@material-ui/core';

function FacebookCircularProgress(props) {
  const {
    bottomColor,
    topColor,
    size,
    thickness,
    value,
    topVariant,
    bottomVariant,
  } = props;

  // Inspired by the former Facebook spinners.
  const useStylesFacebook = makeStyles(theme => ({
    root: {
      position: 'relative',
      width: 'fit-content',
    },
    bottom: {
      color:
        bottomColor ||
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: topColor || '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      top: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));
  const classes = useStylesFacebook();
  return (
    <div className={classes.root}>
      <CircularProgress
        variant={bottomVariant || 'determinate'}
        className={classes.bottom}
        size={size || 40}
        thickness={thickness || 4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant={topVariant || 'determinate'}
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={size || 40}
        thickness={thickness || 4}
        value={value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

//This component return progress bar in dual color. Light background (bottom) and dark top
//You can pass top and bottom colors to override existing colors
export default function KenCircularProgressBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FacebookCircularProgress {...props} />
    </div>
  );
}
