import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup/index';
import { useTranslation } from 'react-i18next';
import KenLoader from '../../../../../../components/KenLoader';
import assignStudent from '../../../../../../../app/assets/Images/AssignStudent.svg';
import AssignstudentDetails from './AssignstudentDetails';

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
  wrap: {
    marginBottom: 24,
  },
  inputBaseClass: {
    background: theme.palette.KenColors.kenWhite,
  },
  tagLabel: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
    marginBottom: 4,
  },
  addLabel: {
    fontStyle: 'italic',
  },
  assignStudent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 122.58,
    height: 66,
    marginBottom: 24,
  },
  desText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#505F79',
    width: '54%',
    margin: '0 auto',
  },
  dflex:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}));

export default function AssignStudent(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;

  const classes = useStyles();
  // const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const [changeAssignment, setChangeAssignment] = useState(false);
  const quizAttemptsListArray = [
    {
      label: 'Allocate to all students of the class',
      value: '0',
    },
    {
      label: 'Choose students to assign assessment',
      value: '1',
    },
  ];

  const handleStudentAssignment = e => {
    if (e == 1) {
      setChangeAssignment(true);
    } else {
      setChangeAssignment(false);
    }
  };

  return (
    <Grid xs={12} md={12}>
      {/* {loading && <KenLoader />} */}
      <Box className={classes.container} mt={2}>
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t('labels:Assign_Students')}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={12} item className={classes.wrap}>
            <KenRadioGroup
              value={values.assignStudentAssignment}
              label={t(
                'assignStudents:Select_the_students_to_allow_them_to_see_the_assessment_and_its_contents'
              )}
              options={quizAttemptsListArray}
              onChange={handleStudentAssignment}
              defaultValue={() => {
                setFieldValue(
                  'assignStudentAssignment',
                  quizAttemptsListArray[0].value
                );
                return quizAttemptsListArray[0].value;
              }}
              setFieldTouched={setFieldTouched}
              name="assignStudentAssignment"
              variant="outline"
              errors={errors?.assignStudentAssignment}
              touched={touched?.assignStudentAssignment}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {!changeAssignment ? (
            <Grid item >
              <Grid md={12} item className={classes.dflex}>
                <img src={assignStudent} className={classes.wrap} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.desText}>
                  {t('labels:AssignStudents_Describtion')}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <AssignstudentDetails />
          )}
        </Grid>
      </Box>
    </Grid>
  );
}
