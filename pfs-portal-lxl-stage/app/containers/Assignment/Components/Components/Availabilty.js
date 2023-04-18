import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
// import KenRadioGroup from '../../../../global_components/KenRadioGroup/index';
// import KenSelect from '../../../../../components/KenSelect';
import KenDateTimePicker from '../../../../global_components/KenDateTimePicker/index';
// import KenTimePicker from '../../../../global_components/KenTimePicker/index';
// import KenInputField from '../../../../components/KenInputField/index';
import { useTranslation } from 'react-i18next';
import dropdownData from '../../AssignmentDetails.json';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.KenColors.neutral10,
    padding: 16,
  },
  header: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },
  periodContainer: {
    display: 'flex',
    marginLeft: 16,
  },
  gradeLabel: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
  },
  wrap: {
    marginBottom: 0,
  },
  boxMargin: {
    marginBottom: 10,
  },
  endQuiz: {
    [theme.breakpoints.only('xs')]: {
      marginTop: 8,
    },
    marginLeft: 20,
  },

  inputBaseClass: {
    background: theme.palette.KenColors.kenWhite,
  },
  inputClass: {
    background: theme.palette.KenColors.kenWhite,
  },
  timepickerBaseClass: {
    width: '100%',
    padding: '10px 12px',
    transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    backgroundColor: '#FAFBFC',
    // marginTop: 3,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius: 3,
  },
  gradeContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  minutesPos: {
    position: 'absolute',
    top: -14,
    width: '100%',
    left: 0,
  },
}));

export default function Availability(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
  } = props;
  console.log('values ', values);
  // useEffect(() => {
  //     let minutes = Array.from(Array(60).keys()).map(item => {
  //         let min = String(item);
  //         return {
  //             "label": min.length == 1 ? '0' + item : String(item),
  //             "value": min.length == 1 ? '0' + item : String(item)
  //         }
  //     })
  //     setMinutesArr(minutes)
  // }, [])

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    // <Grid className={classes.timeContainer} xs={12} md={12}>
    <Box className={classes.container} mt={2}>
      <Grid container item md={9} xs={12} className={classes.boxMargin}>
        <Typography className={classes.header}>
          {' '}
          {t('labels:Availability')}
        </Typography>
        <Grid container className={classes.wrap}>
          <Grid md={4} xs={5} item>
            <KenDateTimePicker
              label={t('labels:AvailabilityFrom')}
              inputBaseRootClass={classes.inputBaseClass}
              onChange={newValue => {
                setFieldValue('availabilityFrom', newValue.target.value);
              }}
              value={values.availabilityFrom}             
              setFieldTouched={setFieldTouched}
              name="availabilityFrom"
              variant="outline"
              errors={errors?.availabilityFrom}
              touched={touched?.availabilityFrom}
            />
          </Grid>
          <Grid md={4} xs={5} item className={classes.endQuiz}>
            <KenDateTimePicker
              label={t('labels:AvailabilityTill')}
              inputBaseRootClass={classes.inputBaseClass}
              onChange={newValue => {
                setFieldValue('availabilityTill', newValue.target.value);
              }}
              value={values.availabilityTill}
              setFieldTouched={setFieldTouched}
              name="availabilityTill"
              variant="outline"
              errors={errors?.availabilityTill}
              touched={touched?.availabilityTill}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
