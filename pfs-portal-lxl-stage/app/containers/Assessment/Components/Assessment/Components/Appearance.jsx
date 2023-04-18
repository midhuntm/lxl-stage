import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import { useTranslation } from 'react-i18next';
import KenLoader from '../../../../../components/KenLoader';
import KenSelect from '../../../../../components/KenSelect';
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

export default function Appearance(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;

  console.log(values, 'vl');

  const classes = useStyles();
  // const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const userPictureListArray = [
    {
      label: 'No image',
      value: '0',
    },
    {
      label: 'Smaller image',
      value: '1',
    },
    {
      label: 'Larger image',
      value: '2',
    },
  ];
  const gradesListArray = [
    {
      label: '0',
      value: '0',
    }, {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
  ];
  const quizAttemptsListArray = [
    {
      label: 'Yes',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    },
  ];

  return (
    <Grid xs={12} md={12}>
      {/* {loading && <KenLoader />} */}
      <Box className={classes.container} mt={2}>
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t('labels:Appearance_Settings')}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6} item className={classes.wrap}>
            <KenRadioGroup
              value={values.showUserPicture}
              label={t('appearance:Show_the_users_picture')}
              options={userPictureListArray}
              onChange={newValue => { setFieldValue('showUserPicture', newValue); }}
              defaultValue={() => {
                setFieldValue('showUserPicture', userPictureListArray[1].value);
                return userPictureListArray[1].value;
              }}
              setFieldTouched={setFieldTouched}
              name="showUserPicture"
              variant="outline"
              errors={errors?.showUserPicture}
              touched={touched?.showUserPicture}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6} item className={classes.wrap}>
            <KenRadioGroup
              value={values.decimalPlaceinGrades}
              label={t('appearance:Decimal_places_in_grades')}
              options={gradesListArray}
              onChange={newValue => { setFieldValue('decimalPlaceinGrades', newValue); }}
              defaultValue={() => {
                setFieldValue('decimalPlaceinGrades', gradesListArray[0].value);
                return gradesListArray[0].value;
              }}
              setFieldTouched={setFieldTouched}
              name="decimalPlaceinGrades"
              variant="outline"
              errors={errors?.decimalPlaceinGrades}
              touched={touched?.decimalPlaceinGrades}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6} item className={classes.wrap}>
            <KenSelect
              label={t('appearance:Decimal_places_in_question_grades')}
              inputBaseRootClass={classes.inputBaseClass}
              options={AssessmentData.QuestionGrades}
              onChange={newValue => { setFieldValue('questionGrades', newValue.target.value); }}
              defaultValue={() => {
                setFieldValue('questionGrades', AssessmentData.QuestionGrades[0].value);
              }}
              setFieldTouched={setFieldTouched}
              name="questionGrades"
              value={values.questionGrades}
              variant="outline"
              errors={errors?.questionGrades}
              touched={touched?.questionGrades}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6} item className={classes.wrap}>
            <KenRadioGroup
              value={values.showblocks}
              label={t('appearance:Show_blocks_during_quiz_attempts')}
              options={quizAttemptsListArray}
              onChange={newValue => { setFieldValue('showblocks', newValue); }}
              defaultValue={() => {
                setFieldValue('showblocks', quizAttemptsListArray[1].value);
                return quizAttemptsListArray[1].value;
              }}
              setFieldTouched={setFieldTouched}
              name="showblocks"
              variant="outline"
              errors={errors?.showblocks}
              touched={touched?.showblocks}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
