import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import KenSelect from '../../../../components/KenSelect';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import KenButton from '../../../../global_components/KenButton';

const useStyles = makeStyles(theme => ({
  inputBaseClass: {
    background: '#FAFBFC',
    border: '1px dashed #DFE1E6',
    boxSizing: 'border-box',
    borderRadius: '3px',
    // color: "#061938"
  },
  lablelText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '100%',
    color: '#061938',
    marginBottom: '8px',
  },
  actionButton: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#092682',
    flex: 'none',
    order: '0',
    flexGrow: '0',
    margin: '0px 10px',
  },
}));

const QuestionFormikHOC = props => {
  // const { t } = useTranslation();
  // const { transaction, selectedQuestion } = props;
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      questionType: '',
      classSelected: '',
      subjectSelected: '',
      chapter: '',
    }),
    validationSchema: Yup.object().shape({}),

    handleSubmit: values => {
      if (values.action === 'submit') {
        console.log('submitting values', values);
      } else {
        console.log('previewing values', values);
      }
    },
    displayName: 'AddQuestionManually',
  })(AddQuestionManually);

  return <FormikForm {...props} />;
};

export default function Question(props) {
  return <QuestionFormikHOC {...props} />;
}
const AddQuestionManually = props => {
  const {
    optionsData,
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    loader,
    setFieldValue,
    handleSubmit,
    setValues,
    drawerChanges,
    label,
    icon,
    transaction,
    setTransaction,
    handelNext,
    handelCancel,
  } = props;
  const [actionButtons, setActionButtons] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState([]);
  const [subjectOptions, setSubjectOptions] = React.useState([]);

  let classOptions = [];
  let subOptions = [];
  let questionTypeOptions = [];
  const classes = useStyles();

  useEffect(() => {
    if (optionsData) {
      subjectFilter();
    }
  }, [optionsData]);

  optionsData.filter.forEach(f => {
    classOptions.push({ label: f.class.name, value: String(f.class.id) });
  });
  optionsData.questiontypes.forEach(f => {
    // ---------------------------  
    questionTypeOptions.push({ label: f.label, value: String(f.qvalue) });
  });

  console.log('questionTypeOptions[0].value', questionTypeOptions);

  const subjectFilter = classId => {
    if (classId) {
      optionsData.filter.forEach(s => {
        if (String(s.class.id) === classId) {
          s.subjects.map(subject => {
            subOptions.push({ label: subject.name, value: subject.id });
          });
        }
      });
    }
    setSubjectOptions(subOptions);
  };
  const dropDownListData = [
    {
      label: 'Multiple choice',
      value: 'multichoice',
    },
    {
      label: 'True/false',
      value: 'truefalse',
    },
    {
      label: 'Short Answer',
      value: 'shortanswer',
    },
    {
      label: 'Essay',
      value: 'essay',
    },
    // {
    //   label: "Match the following",
    //   value: "match"
    // },
    // {
    //   label: 'Subjective',
    //   value: 'subjective',
    // },
    // {
    //   label: "Fill in the blanks",
    //   value: "fillblanks"
    // },
    // {
    //   label: "Numericals",
    //   value: "numerical"
    // }
  ];
  return (
    <Box component={Paper} style={{ padding: '20px' }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item md={4}>
          {' '}
          <KenSelect
            inputBaseRootClass={classes.inputBaseClass}
            name="questionType"
            label={
              <Typography className={classes.lablelText}>
                Question Type
              </Typography>
            }
            // options={questionTypeOptions} //API
            options={dropDownListData} //static value
            value={values.questionType}
            onChange={e => {
              setFieldValue('questionType', e.target.value);
            }}
            // defaultValue={() => {
            //   setFieldValue('questionType', questionTypeOptions[0].value);
            //   return questionTypeOptions[0].value;
            // }}
            defaultValue={() => {
              setFieldValue('questionType', dropDownListData[0].value);
              return dropDownListData[0].value;
            }}
            required
          />
        </Grid>
        <Grid item md={4}>
          <KenSelect
            name="classSelected"
            label={
              <Typography className={classes.lablelText}>Class</Typography>
            }
            options={classOptions}
            value={values.classSelected}
            defaultValue={() => {
              setFieldValue('classSelected', classOptions[0].value);
              subjectFilter(classOptions[0].value);
              return classOptions[0].value;
            }}
            onChange={e => {
              setFieldValue('classSelected', e.target.value);
              subjectFilter(e.target.value);
              setSelectedClass(e.target.value);
            }}
            required
          />
        </Grid>

        <Grid item md={4}>
          <KenSelect
            name="subjectSelected"
            label={
              <Typography className={classes.lablelText}>Subject</Typography>
            }
            options={subjectOptions}
            value={values.subjectSelected}
            defaultValue={() => {
              if (subjectOptions.length > 0) {
                setFieldValue('subjectSelected', subjectOptions[0].value);
                return subjectOptions[0].value;
              }
            }}
            onChange={e => {
              setFieldValue('subjectSelected', e.target.value);
              setActionButtons(true);
            }}
            required
          />
        </Grid>
        {/* <Grid item md={4}>
          {''}
          <KenSelect
            name="chapter"
            label={
              <Typography className={classes.lablelText}>Chapter</Typography>
            }
            options={subjectOptions}
            value={values.subjectSelected}
            onChange={e => {
              setFieldValue('chapter', e.target.value);
            }}
            required
          />
        </Grid>
        <Grid item md={4}>
          {''}
        </Grid>
        <Grid item md={4}>
          {''}
        </Grid> */}
        <Grid item md={12}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Grid item>
              <KenButton
                label={'Cancel'}
                variant="outlined"
                size="small"
                onClick={() => handelCancel()}
                className={classes.actionButton}
              />
            </Grid>
            <Grid item>
              <KenButton
                label={'Next'}
                variant="primary"
                size="small"
                onClick={() => handelNext(values)}
                disabled={!actionButtons}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
