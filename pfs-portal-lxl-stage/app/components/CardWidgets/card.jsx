import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minWidth: '34vw',
    height: 104,
    padding: 16,
    margin: '16px 0px 0px 0',
    boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
    borderRadius: 3,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
  details: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '48px',
    lineHeight: '48px',
  },
  percent: {
    fontSize: '25px',
  },
}));

export default function CardDetail(props) {
  const classes = useStyles();
  const { cardName, cardDetail, imgSrc, showPercentage, color } = props;
  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container justify="space-between" alignItems="center" xs={12}>
        <Grid item>
          <Typography className={classes.title}>{cardName}</Typography>
          <Typography
            className={classes.details}
            color="primary"
            style={{ color: color }}
          >
            {cardDetail ? cardDetail : '0.0'}
            {showPercentage ? (
              <span className={classes.percent}>%</span>
            ) : (
              ''
            )}{' '}
          </Typography>
        </Grid>
        <Grid item>
          <img className src={imgSrc} />
        </Grid>
      </Grid>
    </Paper>
  );
}
