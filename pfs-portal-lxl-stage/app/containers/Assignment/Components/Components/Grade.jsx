import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenInputField from '../../../../components/KenInputField';

import KenSelect from '../../../../components/KenSelect';
import { useTranslation } from 'react-i18next';
// import Feedback from '../Components/Feedback';
import AssessmentData from '../../AssignmentDetails.json';
import KenRadioGroup from '../../../../global_components/KenRadioGroup';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.KenColors.neutral10,
    padding: 16,
  },
  wrapLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },
  title: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 13,
    marginBottom: 16,
  },
  wrap: {
    marginBottom: 24,
    marginTop: 16,
  },
  selectBoxLabel: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 12,
    // marginBottom: 4,
  },
  // gradeLabelClass: {
  //   marginTop: 10
  // },
  inputBaseClass: {
    background: theme.palette.KenColors.kenWhite,
    // marginRight: 4
  },
  inputGradeBaseClass: {
    background: theme.palette.KenColors.kenWhite,
    // marginRight: 10,
    marginTop: 2,
  },
  offsetTop: {
    marginTop: -4,
  },
  offsetBottom: {
    marginBottom: 4,
  },
  offsetLeft: {
    marginLeft: 20,
  },
  KenInputsMargin: {
    marginBottom: 16,
  },
  KenInputsMarginTop: {
    marginTop: 16,
    marginBottom: 16,
  },
  boxMargin: {
    marginBottom: 10,
    marginLeft: 10,
  },
  gradeLabel: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
  },
}));

export default function Grade(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;
  const [CourseComponentOpt, setCourseComponent] = useState(
    AssessmentData.CourseComponent
  );
  const [TotalMarks, setTotalMarks] = useState(AssessmentData.TotalMarks);
  const [AttemptsAllowed, setAttemptsAllowed] = useState(
    AssessmentData.AttemptsAllowed
  );
  const [GradeMethods, setGradeMethods] = useState(AssessmentData.GradeMethods);
  const [SelectMarks, setSelectMarks] = useState(AssessmentData.selectMarks);
  const Grade = useState([]);

  const classes = useStyles();
  const { t } = useTranslation();
  console.log(values, 'vl');

  const [gradeDetails, setGradeDetails] = React.useState([]);
  const [examDetails, setExamDetails] = React.useState([]);

  const data = AssessmentData.exam;
  const assessmentGradedArray = ['yes', 'no'];

  const change = (name, e, index) => {
    e.persist();
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true, false);
  };

  React.useEffect(() => {
    const initialExamArray = [];
    data?.map(el => {
      initialExamArray.push(el.name);
      setExamDetails(initialExamArray);
    });
  }, []);

  const handleCourseChange = value => {
    const initialGradeArray = [];
    data?.map((data, i) => {
      if (data.name == value) {
        data?.value?.map(test => {
          initialGradeArray.push({ label: test, value: test });
        });
      } else {
        return null;
      }
    });

    setGradeDetails(initialGradeArray);
  };

  const handleAssessmentGraded = newValue => {
    setFieldValue('assessmentGraded', newValue);
  };
  return (
    <Box className={classes.container} mt={2}>
      <Typography className={classes.header}>
        {t('labels:Grade_settings')}
      </Typography>

      <Grid item container md={12}>
        {/* <Grid xs={12} md={3}>
          <KenRadioGroup
            value={values.assessmentGraded}
            label={t('assessments:Is_this_assessment_graded')}
            options={assessmentGradedArray}
            onChange={handleAssessmentGraded}
            defaultValue={() => setFieldValue('assessmentGraded', assessmentGradedArray[0])}
            setFieldTouched={setFieldTouched}
            name="assessmentGraded"
            variant="outline"
            errors={errors?.assessmentGraded}
            touched={touched?.assessmentGraded}
          />
        </Grid> */}
        {/* <Grid xs={12} md={4} style={{ paddingRight: 10 }}>
          <KenSelect
            label={t('headings:Exam_Type')}
            inputBaseRootClass={classes.inputBaseClass}
            options={examDetails}
            onChange={event => {
              handleCourseChange(event.target.value);
              setFieldValue('examType', event.target.value);
            }}
            setFieldTouched={setFieldTouched}
            name="examType"
            value={values.examType}
            variant="outline"
            errors={errors?.examType}
            touched={touched?.examType}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <KenSelect
            label={t('headings:Grade_Type')}
            placeholder="Select"
            inputBaseRootClass={classes.inputBaseClass}
            options={gradeDetails}
            onChange={newValue => setFieldValue('gradeType', newValue.target.value)}
            setFieldTouched={setFieldTouched}
            name="gradeType"
            value={values.gradeType}
            variant="outline"
            errors={errors?.gradeType}
            touched={touched?.gradeType}
            required
          />
        </Grid> */}
      </Grid>
      {/* <Grid item sm={6} className={classes.KenInputsMargin}>
        <KenSelect
          label={t('GradeLabels:Course_Component')}
          inputBaseRootClass={classes.inputBaseClass}
          options={CourseComponentOpt}
          value={values.courseComponent}
          onChange={newValue => { setFieldValue('courseComponent', newValue.target.value); }}
          defaultValue={() => { setFieldValue('courseComponent', CourseComponentOpt[0].value); }}
          setFieldTouched={setFieldTouched}
          name="courseComponent"
          variant="outline"
          errors={errors?.courseComponent}
          touched={touched?.courseComponent}
        />
      </Grid> */}

      <Grid container md={8} item sm={8} className={classes.KenInputsMargin}>
        <Grid item xs={12} sm={3} md={3}>
          <KenInputField
            label={t('GradeLabels:Total_Marks')}
            inputBaseRootClass={classes.inputBaseClass}
            value={values.totalMarks}
            setFieldTouched={setFieldTouched}
            name="totalMarks"
            type="number"
            defaultValue={() => {
              setFieldValue('totalMarks', 0);
            }}
            onChange={newValue => {
              setFieldValue('totalMarks', newValue.target.value);
            }}
            errors={errors?.totalMarks}
            touched={touched?.totalMarks}
          />
        </Grid>

        <Grid item xs={12} md={4} sm={4} className={classes.boxMargin}>
          <Typography className={classes.gradeLabel}>
            {t('GradeLabels:Grade_To_Pass_Assessment')}
          </Typography>
          {/* <Grid container> */}
          <Grid sm={12} md={12}>
            <KenInputField
              placeholder="Input Marks"
              label=""
              inputBaseRootClass={classes.inputBaseClass}
              value={values.gradetopass}
              setFieldTouched={setFieldTouched}
              name="gradetopass"
              type="number"
              defaultValue={() => {
                setFieldValue('gradetopass', 0);
              }}
              onChange={newValue => {
                setFieldValue('gradetopass', newValue.target.value);
              }}
              errors={errors?.gradetopass}
              touched={touched?.gradetopass}
            />
          </Grid>
          {/* <Grid sm={4} >
              <KenSelect
                inputBaseRootClass={classes.inputBaseClass}
                options={SelectMarks}
                onChange={newValue => { setFieldValue('selectMarks', newValue.target.value); }}
                value={values.selectMarks}
                defaultValue={() => { setFieldValue('selectMarks', SelectMarks[1].value) }}
                setFieldTouched={setFieldTouched}
                name="selectMarks"
                variant="outline"
                errors={errors?.selectMarks}
                touched={touched?.selectMarks}
              />
            </Grid> */}
          {/* </Grid> */}
        </Grid>
        {/* <Grid item xs={12} sm={6} className={classes.offsetLeft}>
          <Typography className={classes.selectBoxLabel}>{t('GradeLabels:Grade_To_Pass_Assessment')}</Typography>
          <Grid container sm={12}>
            <Grid item xs={12} sm={6} className={classes.offsetTop}>
              <KenInputField
                inputBaseRootClass={classes.inputGradeBaseClass}
                label=""
                placeholder="Input marks"
                value={values.inputMarks}
                setFieldTouched={setFieldTouched}
                name="inputMarks"
                onChange={change.bind(null, 'inputMarks')}
                errors={errors?.inputMarks}
                touched={touched?.inputMarks}
              />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.offsetLeft}>
              <KenSelect
                label=""
                inputBaseRootClass={classes.inputGradeBaseClass}
                options={SelectMarks}
                onChange={newValue => { setFieldValue('selectMarks', newValue.target.value); }}
                defaultValue={() => { setFieldValue('selectMarks', SelectMarks[0].value); }}
                setFieldTouched={setFieldTouched}
                name="selectMarks"
                value={values.selectMarks}
                variant="outline"
                errors={errors?.selectMarks}
                touched={touched?.selectMarks}
              />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
      {/* <Grid item sm={6} className={classes.KenInputsMargin}>
        <KenSelect
          label={t('GradeLabels:Attempts_Allowed')}
          inputBaseRootClass={classes.inputBaseClass}
          options={AttemptsAllowed}
          onChange={newValue => {
            setFieldValue('attemptsAllowed', newValue.target.value);
          }}
          setFieldTouched={setFieldTouched}
          name="attemptsAllowed"
          value={values.attemptsAllowed}
          variant="outline"
          errors={errors?.attemptsAllowed}
          //   defaultValue={() => { setFieldValue('attemptsAllowed', AttemptsAllowed[0].value); }}
          touched={touched?.attemptsAllowed}
        />
      </Grid> */}
      {/* <Grid item sm={6} className={classes.KenInputsMargin}>
        <KenSelect
          label={t('GradeLabels:Grade_Methods')}
          inputBaseRootClass={classes.inputBaseClass}
          options={GradeMethods}
          onChange={newValue => { setFieldValue('gradeMethod', newValue.target.value); }}
          defaultValue={() => { setFieldValue('gradeMethod', GradeMethods[0].value); }}
          setFieldTouched={setFieldTouched}
          name="gradeMethod"
          value={values.gradeMethod}
          variant="outline"
          errors={errors?.gradeMethod}
          touched={touched?.gradeMethod}
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <Feedback {...props} />
      </Grid> */}
    </Box>
  );
}
