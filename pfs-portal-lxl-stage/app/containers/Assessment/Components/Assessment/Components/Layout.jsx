import React, { useState } from 'react';
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
}));

export default function Layout(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [QuestionPerPage, setQuestionPerPage] = useState(AssessmentData.QuestionPerPage)
  const [radioOption, setRadioOption] = useState(AssessmentData.layOutRadioOption);

  return (
    <Box className={classes.container} mt={2}>
      <Typography className={classes.header}>{t('labels:Layout_settings')}</Typography>
      {/* <Grid container spacing={2}> */}
      <Grid item md={6} className={classes.wrap}>
        <KenSelect
          label={t('assessments:questions_Per_Page')}
          inputBaseRootClass={classes.inputBaseClass}
          options={QuestionPerPage}
          onChange={newValue => { setFieldValue('questionsPerPage', newValue.target.value); }}
          defaultValue={() => { setFieldValue('questionsPerPage', QuestionPerPage[0].value); }}
          setFieldTouched={setFieldTouched}
          name="questionsPerPage"
          value={values.questionsPerPage}
          variant="outline"
          errors={errors?.questionsPerPage}
          touched={touched?.questionsPerPage}
        />
      </Grid>
      <Grid item md={6} className={classes.wrap}>
        <KenRadioGroup
          label={t("assessments:Navigation_method")}
          options={radioOption}
          setFieldTouched={setFieldTouched}
          name="navigationMethod"
          value={values.navigationMethod}
          onChange={newValue => { setFieldValue('navigationMethod', newValue); }}
          defaultValue={() => { setFieldValue('navigationMethod', radioOption[0].value); }}
          variant="outline"
          errors={errors?.navigationMethod}
          touched={touched?.navigationMethod}
        />
      </Grid>
      {/* </Grid> */}
    </Box>
  );
}
