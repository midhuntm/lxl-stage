import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenSelect from '../../../../../components/KenSelect';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
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
}));

export default function QuestionBehaviour(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;
  const [showAttemptRedo, setShowAttemptRedo] = React.useState(false)

  console.log(values, 'vl');

  const classes = useStyles();

  const { t } = useTranslation();

  const attemptListArray = [
    {
      label: 'Yes',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    },
  ];

  const attemptRedoArray = [
    {
      label: 'Yes, provide option to try another question',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    },
  ];

  const onHandleQuestionBehave = (newValue) => {
    let val = newValue.target.value;
    setFieldValue('questionBehaviour', newValue.target.value);

    if (val == "immediatefeedback" || val == "immediatecbm" || val == "interactive") {
      setShowAttemptRedo(true)
    }
    else {
      setShowAttemptRedo(false)
    }
  }

  return (
    <Box className={classes.container} mt={2}>
      <Typography className={classes.header}>{t('labels:Question_behaviour')}</Typography>
      {/* <Grid container spacing={2}> */}
      <Grid md={4} item className={classes.wrap}>
        <KenRadioGroup
          value={values.shuffleWithInQuestion}
          label={t('assessments:Shuffle_within_questions')}
          options={attemptListArray}
          onChange={newValue => { setFieldValue('shuffleWithInQuestion', newValue); }}
          defaultValue={() => {
            setFieldValue('shuffleWithInQuestion', attemptListArray[1].value);
            return attemptListArray[1].value;
          }}
          setFieldTouched={setFieldTouched}
          name="shuffleWithInQuestion"
          variant="outline"
          errors={errors?.shuffleWithInQuestion}
          touched={touched?.shuffleWithInQuestion}
        />
      </Grid>
      <Grid item md={8} className={classes.wrap}>
        <KenRadioGroup
          label={
            <Typography className={classes.tagLabel}>{t('assessments:Shuffle_choices_within_answer')}
              <span className={classes.addLabel}>{`${t('assessments:Only_applicable_to_Multichoice')}`}</span>
            </Typography>
          }
          options={attemptListArray}
          onChange={newValue => { setFieldValue('shuffleWithInAnswers', newValue); }}
          defaultValue={() => {
            setFieldValue('shuffleWithInAnswers', attemptListArray[1].value);
            return attemptListArray[1].value;
          }}
          setFieldTouched={setFieldTouched}
          name="shuffleWithInAnswers"
          value={values.shuffleWithInAnswers}
          variant="outline"
          errors={errors?.shuffleWithInAnswers}
          touched={touched?.shuffleWithInAnswers}
        />
      </Grid>
      <Grid item md={6} className={classes.wrap}>
        <KenSelect
          label={t('assessments:How_questions_behave')}
          inputBaseRootClass={classes.inputBaseClass}
          options={AssessmentData.QuestionBehaviour}
          onChange={onHandleQuestionBehave}
          defaultValue={() => {
            setFieldValue('questionBehaviour', AssessmentData.QuestionBehaviour[0].value);
            // return AssessmentData.QuestionBehaviour[0].v/4;
          }}
          setFieldTouched={setFieldTouched}
          name="questionBehaviour"
          value={values.questionBehaviour}
          variant="outline"
          errors={errors?.questionBehaviour}
          touched={touched?.questionBehaviour}
        />
      </Grid>
      {showAttemptRedo &&
        <Grid md={6} item className={classes.wrap}>
          <KenRadioGroup
            label={t('assessments:Allow_redo_within_an_attempt')}
            options={attemptRedoArray}
            defaultValue={() => {
              setFieldValue('attemptRedo', attemptRedoArray[1].value);
              return attemptRedoArray[1].value;
            }}
            onChange={newValue => { setFieldValue('attemptRedo', newValue); }}
            setFieldTouched={setFieldTouched}
            name="attemptRedo"
            value={values.attemptRedo}
            variant="outline"
            errors={errors?.attemptRedo}
            touched={touched?.attemptRedo}
          />
        </Grid>}
      <Grid md={6} item className={classes.wrap}>
        <KenRadioGroup
          value={values.attemptLast}
          label={t('assessments:Each_attempt_builds_on_the_last')}
          options={attemptListArray}
          onChange={newValue => { setFieldValue('attemptLast', newValue); }}
          defaultValue={() => {
            setFieldValue('attemptLast', attemptListArray[1].value);
            return attemptListArray[1].value;
          }}
          setFieldTouched={setFieldTouched}
          name="attemptLast"
          variant="outline"
          errors={errors?.attemptLast}
          touched={touched?.attemptLast}
        />
      </Grid>

      {/* </Grid> */}
    </Box>
  );
}
