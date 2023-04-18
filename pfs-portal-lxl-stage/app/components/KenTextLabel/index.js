import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.KenColors.neutral400,
    marginBottom: 4,
  },
  optional: {
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.KenColors.neutral100,
  },
  labelWrap: {
    marginBottom: 2,
  },
  asterisk: {
    color: theme.palette.KenColors.tertiaryRed500,
  },
}));
export default function KenTextLabel(props) {
  const classes = useStyles();
  const { label, required, optionalLabel,className } = props;

  return (
    <div className={classes.labelWrap}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography className={className?className:classes.label}>
            {required ? <span className={classes.asterisk}>*</span> : ''}
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.optional}>
            {!required && optionalLabel ? '' : ' '}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
