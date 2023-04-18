import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    position: 'absolute',
    left: '0',
    bottom: '0',
  },
  button: {
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '0px 3px 0px 0px',
  },
  secondary: {
    backgroundColor: '#fff',
    borderTop: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: '3px 0px 0px 0px',
  },
}));

const KenFooterSplitButtons = props => {
  const {
    primaryButtonName,
    secondaryButtonName,
    primaryAction,
    secondaryAction,
  } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={6}
        className={`${classes.button} ${classes.secondary}`}
        onClick={secondaryAction}
        data-testid="footer-secondary-button"
      >
        {secondaryButtonName}
      </Grid>
      <Grid
        item
        xs={6}
        className={`${classes.button} ${classes.primary}`}
        onClick={primaryAction}
        data-testid="footer-primary-button"
      >
        {primaryButtonName}
      </Grid>
    </Grid>
  );
};

export default KenFooterSplitButtons;
