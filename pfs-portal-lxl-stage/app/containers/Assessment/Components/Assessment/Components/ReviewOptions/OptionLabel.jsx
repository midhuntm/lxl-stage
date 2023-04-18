import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },
  circle: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  label: {
    fontSize: '13px',
    marginLeft: '4px',
    color: theme.palette.KenColors.neutral400,
  },
}));

export default function OptionsLabel(props) {
  const classes = useStyles();
  const { color, label } = props;

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.circle} style={{ background: color }} />
        <Typography className={classes.label} data-testid="option-label">
          {label}
        </Typography>
      </Box>
    </>
  );
}
