import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '16px',
  },
  border: {
    borderBottom: '1px solid #F4F5F7',
  },
  bottom: {
    paddingTop: '24px',
    width: '100%',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  title: {
    fontWeight: 600,
  },
}));

export default function DataCard(props) {
  const { children, title, action, childrenContainerStyle } = props;
  const classes = useStyles();
  //   const { t } = useTranslation();

  return (
    <Paper className={classes.paper} elevation={0} style={{height: '100%'}}>
      <Grid container spacing={1}>
        <Grid item xs={12} container className={classes.border}>
          <Grid item xs={12} sm={12} md={6} className={classes.left}>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.right}>
            {action}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.bottom} style={childrenContainerStyle}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
