import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

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
}));

export default function Question({
  heading,
  question,
  marks,
  answer,
  options = [],
}) {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Typography className={`${classes.text} ${classes.heading}`}>
          {heading}
        </Typography>
        <Box className={classes.container}>
          <Typography className={classes.text}>{question}</Typography>
          <Typography className={`${classes.text} ${classes.marks}`}>
            {marks}
          </Typography>
        </Box>
        <ol type="A" className={`${classes.text} ${classes.ol}`}>
          {Array.isArray(options) &&
            options.length > 0 &&
            options.map(opt => {
              return <li className={classes.li}>{opt?.label}</li>;
            })}
        </ol>
        <Typography className={classes.text}>{answer}</Typography>
      </Box>
    </>
  );
}
