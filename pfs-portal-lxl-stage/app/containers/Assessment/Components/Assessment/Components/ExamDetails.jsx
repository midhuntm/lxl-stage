import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenSelect from '../../../../../components/KenSelect';
import { useTranslation } from 'react-i18next';
//Note : As of now values are hard coded
import KenLoader from '../../../../../components/KenLoader';
import AssessmentDetails from '../../../AssessmentDetails.json';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup';


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
  inputBaseClass: {
    background: theme.palette.KenColors.kenWhite,
  },
}));

export default function ExamDetails(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  // const [loading, setLoading] = React.useState(false);
  const [gradeDetails, setGradeDetails] = React.useState([]);
  const [examDetails, setExamDetails] = React.useState([]);
  // const [assessmentGradedArray, setAssessmentGradedArray] = React.useState(AssessmentDetails.AssessmentGradedArray)

  const data = AssessmentDetails.exam;
  const assessmentGradedArray = ['yes', 'no']
  // const assessmentGradedArray=[{
  //   "label": "Yes",
  //   "value": 1
  // },
  // {
  //   "label": "No",
  //   "value": 0
  // }
  // ]

  React.useEffect(() => {
    // const initialGradeArray = [];
    const initialExamArray = []

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

  const handleAssessmentGraded = (newValue) => {
    setFieldValue('assessmentGraded', newValue)
  }
  //Note : Values are hard coded now
  // React.useEffect(() => {
  //   setLoading(true);
  //   getGradeDetails()
  //     .then(res => {
  //       let initialArr = [];
  //       res?.map(item => {
  //         initialArr?.push(item?.type);
  //       });
  //       setGradeDetails(initialArr);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err, 'err');
  //       setLoading(false);
  //     });

  //   getExamDetails()
  //     .then(res => {
  //       let initialArr = [];

  //       res?.map(item => {
  //         initialArr?.push(item?.type);
  //       });
  //       setExamDetails(initialArr);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err, 'err');
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Grid xs={12} md={12}>
      {/* {loading && <KenLoader />} */}
      <Box className={classes.container} mt={2}>
        <Typography className={classes.header}>
          {t('labels:Grade_Component')}
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} item md={4}>
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
            // required
            />
          </Grid>
          <Grid xs={12} item md={4}>
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
          <Grid xs={12} item md={4}>
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
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
