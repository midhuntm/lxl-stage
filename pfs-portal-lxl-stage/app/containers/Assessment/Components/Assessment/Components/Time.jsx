import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenSelect from '../../../../../components/KenSelect';
import KenDateTimePicker from '../../../../../global_components/KenDateTimePicker/index';
import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
import KenInputField from '../../../../../components/KenInputField/index';
import { useTranslation } from 'react-i18next';
import AssessmentData from '../../../AssessmentDetails.json';

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
  timeMinuteLabel: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
    marginBottom: 12,
    fontWeight: 'bold'
  },
  wrap: {
    marginBottom: 0,
  },
  boxMargin: {
    marginBottom: 10
  },
  endQuiz: {
    [theme.breakpoints.only('xs')]: {
      marginTop: 8,
    },
    marginLeft: 20
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
    borderRadius: 3
  },
  gradeContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  minutesPos: {
    position: 'absolute',
    top: -14,
    width: '100%',
    left: 0
  }
}));

export default function Time(props) {
  const { values, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;
  console.log('values ', values)
  const [sectionalTimeCutoff, setSectionalTimeCutoff] = useState(AssessmentData.sectionalTimeCutOffOptions)
  const [examDuration, setExamDuration] = useState(AssessmentData.examDuration)
  const [OnTimeExpirationsData, setOnTimeExpirations] = useState(AssessmentData.OnTimeExpirations)
  const [SubmissionGracePeriods, setSubmissionGracePeriods] = useState(AssessmentData.SubmissionGracePeriods)
  const [MinimumTimeAssignment, setMinimumTimeAssignment] = useState(AssessmentData.MinimumTimeAssignment)
  const [hideExamDuration, setHideExamDuration] = useState(true)
  const [showGracePeriod, setShowGracePeriod] = React.useState(false)
  const [minutesArr, setMinutesArr] = React.useState([])

  useEffect(() => {
    let minutes = Array.from(Array(60).keys()).map(item => {
      let min = String(item);
      return {
        "label": min.length == 1 ? '0' + item : String(item),
        "value": min.length == 1 ? '0' + item : String(item)
      }
    })
    setMinutesArr(minutes)
  }, [])

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeDuration = e => {
    setFieldValue('MinimumTimeAssignment', e)
    if (e.includes('exam time duration')) {
      setHideExamDuration(true)
    }
    else {
      setHideExamDuration(false)
    }
  };

  const handleOntimeExpiration = (e) => {
    console.log('ontime expiration', e.target.value)
    setFieldValue('onTimeExpiration', e.target.value);
    let val = e.target.value
    if (val == 'graceperiod') {
      setShowGracePeriod(true)
    }
    else setShowGracePeriod(false)
  }

  return (
    // <Grid className={classes.timeContainer} xs={12} md={12}>
    <Box className={classes.container} mt={2}>
      <Grid container item md={9} xs={12} className={classes.boxMargin}>
        <Typography className={classes.header}> {t('timeLabels:Time_settings')}</Typography>
        <Grid container className={classes.wrap}>
          <Grid md={4} xs={5} item>
            <KenDateTimePicker
              label="Start quiz on"
              inputBaseRootClass={classes.inputBaseClass}
              onChange={newValue => { setFieldValue('startQuizTime', newValue.target.value); }}
              value={values.startQuizTime}
              setFieldTouched={setFieldTouched}
              name="startQuizTime"
              variant="outline"
              errors={errors?.startQuizTime}
              touched={touched?.startQuizTime}
            />
          </Grid>
          <Grid md={4} xs={5} item className={classes.endQuiz}>
            <KenDateTimePicker
              label="End quiz on"
              inputBaseRootClass={classes.inputBaseClass}
              onChange={newValue => { setFieldValue('endQuizTime', newValue.target.value); }}
              value={values.endQuizTime}
              setFieldTouched={setFieldTouched}
              name="endQuizTime"
              variant="outline"
              errors={errors?.endQuizTime}
              touched={touched?.endQuizTime}
            />

          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} md={9} xs={9} className={classes.boxMargin}>
        {/* <Grid md={4} item>
          <KenTimePicker
            timerType="material"
            ampm={false}
            label={t("timeLabels:Time_Limit")}
            inputBaseRootClass={classes.timepickerBaseClass}
            onChange={newValue => { setFieldValue('timeLimit', newValue); }}
            value={values.timeLimit}
            setFieldTouched={setFieldTouched}
            name="timeLimit"
            variant="outline"
            errors={errors?.timeLimit}
            touched={touched?.timeLimit}
          /> 
        </Grid> */}
        <Grid md={6} sm={8} item className={classes.boxMargin}>
          <Typography className={classes.timeMinuteLabel}>{t("timeLabels:Time_Limit")}</Typography>
          <Grid container>
            <Grid sm={5} md={4}>
              <KenInputField
                // type="number"
                placeholder="In Hours"
                label="Hours"
                inputBaseRootClass={classes.inputClass}
                value={values.timeLimitHours}
                // value={values.timeLimit['hours']}
                setFieldTouched={setFieldTouched}
                name={`timeLimitHours`}
                onChange={newValue => { setFieldValue('timeLimitHours', newValue.target.value); }}
                errors={errors?.timeLimitHours}
                touched={touched?.timeLimitHours}
              />
            </Grid>
            <Grid sm={4} md={4} style={{ position: 'relative' }}>
              {minutesArr.length > 0 &&
                <KenSelect
                  label="Minutes"
                  inputBaseRootClass={classes.inputBaseClass}
                  setMinHeight={160}
                  options={minutesArr}
                  onChange={newValue => { setFieldValue(`timeLimitMinutes`, newValue.target.value); }}
                  value={values.timeLimitMinutes}
                  defaultValue={newValue => { setFieldValue(`timeLimitMinutes`, minutesArr[0].value) }}
                  setFieldTouched={setFieldTouched}
                  name={`timeLimitMinutes`}
                  variant="outline"
                // errors={errors?.timeLimit ? errors?.timeLimit['minutes'] : null}
                // touched={touched?.timeLimit ? touched?.timeLimit['minutes'] : null}
                />
              }
              {/* <span className={classes.minutesPos}>Minutes</span> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid md={5} className={classes.boxMargin}>
        <KenSelect
          label={t("timeLabels:On_Time_Expiration")}
          inputBaseRootClass={classes.inputBaseClass}
          options={OnTimeExpirationsData}
          onChange={handleOntimeExpiration}
          defaultValue={newValue => { setFieldValue('onTimeExpiration', OnTimeExpirationsData[0].value); }}
          setFieldTouched={setFieldTouched}
          name="onTimeExpiration"
          value={values.onTimeExpiration}
          variant="outline"
          errors={errors?.onTimeExpiration}
          touched={touched?.onTimeExpiration}
        />
      </Grid>
      {showGracePeriod &&
        <Grid md={6} item className={classes.boxMargin}>
          <Typography className={classes.gradeLabel}>{t('timeLabels:Submission_Grace_Period')}</Typography>
          <Grid container>
            <Grid sm={3} >
              <KenInputField
                placeholder="--"
                type="number"
                inputBaseRootClass={classes.inputClass}
                value={values.submissionGradeInputValue}
                setFieldTouched={setFieldTouched}
                name="submissionGradeInputValue"
                defaultValue={() => { setFieldValue('submissionGradeInputValue', 0) }}
                onChange={newValue => { setFieldValue('submissionGradeInputValue', newValue.target.value); }}
                errors={errors?.submissionGradeInputValue}
                touched={touched?.submissionGradeInputValue}
              />
            </Grid>
            <Grid sm={3} >
              <KenSelect
                inputBaseRootClass={classes.inputBaseClass}
                options={SubmissionGracePeriods}
                onChange={newValue => { setFieldValue('submissionGradeSelectValue', newValue.target.value); }}
                value={values.submissionGradeSelectValue}
                defaultValue={newValue => { setFieldValue('submissionGradeSelectValue', SubmissionGracePeriods[4].value) }}
                setFieldTouched={setFieldTouched}
                name="submissionGradeSelectValue"
                variant="outline"
                errors={errors?.submissionGradeSelectValue}
                touched={touched?.submissionGradeSelectValue}
              />
            </Grid>
          </Grid>
        </Grid>
      }
      {/* {Minimum Time Duration and Sectional Time Cutoff fields might be added in the future} */}
      {/* <Grid item xs={12} md={10} spacing={2}>
        <KenRadioGroup
          label={t('timeLabels:Minimum_Time_For_Assessment_Submission')}
          options={MinimumTimeAssignment}
          defaultValue={() => { setFieldValue('MinimumTimeAssignment', MinimumTimeAssignment[0]); }}
          onChange={handleChangeDuration}
          setFieldTouched={setFieldTouched}
          name="MinimumTimeAssignment"
          value={values.MinimumTimeAssignment}
          variant="outline"
          errors={errors?.MinimumTimeAssignment}
          touched={touched?.MinimumTimeAssignment}
        />
      </Grid> */}
      {/* {hideExamDuration &&
        <Grid md={2} sm={2} item spacing={2} style={{ marginBottom: 10 }}>
          <KenSelect
            inputBaseRootClass={classes.inputBaseClass}
            options={examDuration}
            label=""
            onChange={newValue => { setFieldValue('examDuration', newValue.target.value); }}
            defaultValue={() => { setFieldValue('examDuration', examDuration[0].value); }}
            setFieldTouched={setFieldTouched}
            name="examDuration"
            value={values.examDuration}
            variant="outline"
            errors={errors?.examDuration}
            touched={touched?.examDuration}
          />
        </Grid>
      }
      <Grid md={5} className={classes.boxMargin}>
        <KenSelect
          label={t("timeLabels:Sectional_Time_Cutoff")}
          inputBaseRootClass={classes.inputBaseClass}
          options={sectionalTimeCutoff}
          defaultValue={newValue => { setFieldValue('sectionalTimeCutoff', sectionalTimeCutoff[0].value); }}
          onChange={newValue => { setFieldValue('sectionalTimeCutoff', newValue.target.value); }}
          setFieldTouched={setFieldTouched}
          name="sectionalTimeCutoff"
          value={values.sectionalTimeCutoff}
          variant="outline"
          errors={errors?.sectionalTimeCutoff}
          touched={touched?.sectionalTimeCutoff}
        />
      </Grid> */}

      {/* TODO: For current feature we don't need these fields */}
    </Box >
    // </Grid >
  );
}
