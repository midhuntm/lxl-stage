import React, { useEffect, useState, useContext } from 'react';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  studentInfo: {
    color: '#00218D',
    fontSize: '14px',
  },
}));

export default function CartBoxHeader(props) {
  const { registrationID, studentClass } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="flex-start">
          <Typography className={classes.studentInfo}>
            {t('headings:Student_Reg_ID')}: {registrationID}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="flex-end">
          <Typography className={classes.studentInfo}>
            {t('headings:Student_Class')}: {studentClass}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
