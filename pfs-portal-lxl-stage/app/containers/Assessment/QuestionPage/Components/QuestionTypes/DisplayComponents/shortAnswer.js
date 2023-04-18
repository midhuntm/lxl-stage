import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../../../components/KenInputField';
import KenSelect from '../../../../../../global_components/KenSelect';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup/index';
import KenMultiSelect from '../../../../../../global_components/KenMultiSelect';
import KenTextArea from '../../../../../../global_components/KenTextArea';
import KenEditor from '../../../../../../global_components/KenEditor';
import ContentHeader from './contentHeader';
import QuestionPreview from '../../QuestionPreview';
import ContentFooter from './contentFooter';
import {
  addMCQToQuestionBank,
  updateShortAnswerQuestion,
  updateMCQToQuestionBank,
  getQuestionDetail,
  addShortAnswerQuestion,
  addShortAnswerQuestionBank,
  updateShortAnswerQuestionBank,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
  },
  labelText: {
    color: '#061938',
    fontSize: 12,
  },
  percentageField: {
    width: '100%',
    position: 'relative',
    marginRight: 10,
  },
  spanPercentage: {
    padding: 12,
    position: 'absolute',
    top: '15px',
    right: '10px',
    width: '38px',
    height: '36px',
    textAlign: 'center',
    border: 'none',
    borderLeft: `1px solid ${theme.palette.KenColors.flagIconBorderColor}`,
    borderRadius: '3px',
    background: theme.palette.KenColors.kenWhite,
  },
  divider: {
    color: theme.palette.KenColors.assessmentBorder,
    width: '98%',
    margin: '0px auto',
    marginTop: 16,
    marginBottom: 20,
  },
  typoAnother: {
    color: theme.palette.KenColors.primary,
    fontSize: 14,
    fontWeight: 600,
  },
}));

export default function ShortAnswer(props) {
  return <ShortAnswerQuestionFormikHOC {...props} />;
}

const groupingArray = [
  {
    label: 'Easy',
    value: 'Easy',
  },
  {
    label: 'Moderate',
    value: 'Moderate',
  },
  {
    label: 'Difficult',
    value: 'Difficult',
  },
];

const ShortAnswerQuestionForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    values,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    label,
    icon,
    transaction,
    setTransaction,
    fromQuestionBank,
    handleCancelEdit,
    errors,
    touched,
  } = props;

  const [matchOptions, setMatchOptions] = useState(values.options);
  const [matchTags, setMatchTags] = useState(values.tags);

  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    console.log('values', values);
    // setNewlyCreatedQuestion(values);
  };
  const [content, setContent] = useState('');

  const handlePreview = () => {
    setFieldValue('action', 'preview');
    setFieldValue('showPreview', !values.showPreview);
    handleSubmit();
  };

  const handleEdit = () => {
    setFieldValue('showPreview', !values.showPreview);
  };
  useEffect(() => {
    if (transaction === TRANSACTIONS?.EDIT) {
      setFieldValue('showPreview', !values.showPreview);
    }
  }, [transaction]);

  //   console.log('selectedQuestion', selectedQuestion);
  const handleAddQuestion = () => {
    setFieldValue('action', 'submit');
    handleSubmit();
  };

  const handleCancel = () => {
    if (transaction === TRANSACTIONS.UPDATE) {
      values.setToggle(!values.toggle);
      setFieldValue('showPreview', true);
    } else if (transaction === TRANSACTIONS.EDIT) {
      values.setToggle(!values.toggle);
      handleCancelEdit();
    } else {
      values.setToggle(!values.toggle);
      setFieldValue('showPreview', false);
      setTransaction();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  const keyPress = val => {
    const tags = [...values.tags];
    tags.push({ text: val });
    // setFieldValue('tags', tags);
    setMatchTags(tags);
  };
  const deleteTag = index => {
    let tags = [...values.tags];
    tags.splice(index, 1);
    // setFieldValue('tags', tags);
    setMatchTags(tags);
  };

  useEffect(() => {
    setFieldValue('tags', matchTags);
  }, [matchTags]);

  useEffect(() => {
    setFieldValue('options', matchOptions);
    console.log('matchOptions', matchOptions);
  }, [matchOptions]);

  const onHandleMarks = event => {
    let val = Number(event.target.value);
    let penalty = (Number(val) * Number(values?.penalty)) / 100;
    setFieldValue('marks', val);
    setFieldValue('penalty', penalty);
    setFieldValue('decimalPenalty', convert2Decimal(penalty));
  };
  const convert2Decimal = val => {
    if (val.length > 0 && val <= 100 && !isNaN(val)) {
      let penalty = (Number(values?.marks) * Number(val)) / 100;
      return penalty;
    } else {
      return 0;
    }
  };

  const handelFeedBack = e => {
    setFieldValue('generalFeedback', e.target.value);
  };
  const handleAddAnother = () => {
    // let obj = {
    //   optionValue: '',
    //   gradeValue: '',
    //   checkedValue: false,
    //   feedbackValue: '',
    // };
    let obj = {
      id: values?.answerOptions.length + 1,
      answer: '',
      error: '',
      tolerance: '',
      feedback: '',
      fraction: '',
    };

    if (values?.answerOptions?.length === 6) {
      handleSnackbarOpen('Warning', "Answer Options can't be more than six");
      //   console.log('reached to limit');
    } else {
      //   setMcqOptions([...mcqOptions, obj]);
      const array = [...values.answerOptions, obj];
      setFieldValue('answerOptions', array);
    }
  };
  const handleAddMoreHints = () => {
    let obj = { id: values?.hints.length + 1, value: '' };
    if (values?.hints?.length === 4) {
      handleSnackbarOpen('Warning', "Hints can't be more than four");
      //   console.log('reached to limit');
    } else {
      //   setMcqOptions([...mcqOptions, obj]);
      const array = [...values.hints, obj];
      setFieldValue('hints', array);
    }
  };

  const getCorrectAnswers = () => {
    return values.answerOptions.filter(
      item => item.rightanswer || item?.fraction > 0
    );
  };
  return (
    <>
      <ContentHeader
        handlePreview={() => {
          handlePreview();
        }}
        label={label}
        icon={icon}
        preview={!values.showPreview}
      />

      {values.showPreview ? (
        <Box p={2}>
          <QuestionPreview
            marks={values.marks}
            generalFeedback={values.generalFeedback}
            question={parse(`${values.questionText || ''}`) || ''}
            tags={matchTags}
            answersWithGrade={getCorrectAnswers() || []}
          />
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <KenEditor
                label={'Question'}
                required={true}
                content={values.questionText}
                setFieldTouched={setFieldTouched}
                handleChange={e => {
                  setFieldValue('questionText', e);
                  setFieldTouched('questionText', true);
                }}
                errors={errors?.questionText}
                touched={touched?.questionText}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                name="questionPurpose"
                label={
                  <span className={classes.labelText}>Question Outcome</span>
                }
                required={false}
                value={values.questionPurpose}
                onChange={change.bind(null, 'questionPurpose')}
                errors={errors?.questionPurpose}
                touched={touched?.questionPurpose}
              />
            </Grid>
            <Grid item xs={12}>
              <KenSelect
                name="difficultyLevel"
                required={false}
                label={
                  <span className={classes.labelText}>Difficulty Level</span>
                }
                options={groupingArray}
                value={values.difficultyLevel}
                // onChange={e => {
                //   setFieldValue('difficultyLevel', e.target.value);
                // }}
                onChange={change.bind(null, 'difficultyLevel')}
                errors={errors?.difficultyLevel}
                touched={touched?.difficultyLevel}
              />
              {/* {errors.difficultyLevel} */}
            </Grid>
            <Grid item xs={12} md={3}>
              <KenInputField
                name="marks"
                placeholder="1-100"
                label={
                  <span className={classes.labelText}>
                    Marks for this question
                  </span>
                }
                required={true}
                value={values.marks}
                onChange={onHandleMarks}
                errors={errors?.marks}
                touched={touched?.marks}
              />
            </Grid>
            <Grid item md={9} />
            <Divider />

            {values?.answerOptions.length > 0 &&
              values?.answerOptions.map((optItem, i) => {
                return (
                  <>
                    <Grid item xs={12} md={3}>
                      <KenInputField
                        placeholder="Enter Answer"
                        label={
                          <span className={classes.labelText}>{`Answer ${i +
                            1}`}</span>
                        }
                        name={`answerOptions[${i}]['answer']`}
                        value={values.answerOptions[i]['answer']}
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['answer']`
                        )}
                        required={true}
                        errors={
                          errors.answerOptions
                            ? errors.answerOptions[i]
                              ? errors.answerOptions[i].answer
                              : null
                            : null
                        }
                        touched={
                          touched.answerOptions
                            ? touched.answerOptions[i]
                              ? touched.answerOptions[i].answer
                              : null
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <KenInputField
                        name={`answerOptions[${i}]['fraction']`}
                        placeholder="Enter Grade 0 to 100"
                        label={<span className={classes.labelText}>Grade</span>}
                        value={values.answerOptions[i]['fraction']}
                        type="number"
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['fraction']`
                        )}
                        errors={
                          errors.answerOptions
                            ? errors.answerOptions[i]
                              ? errors.answerOptions[i].fraction
                              : null
                            : null
                        }
                        required={true}
                        touched={
                          touched.answerOptions
                            ? touched.answerOptions[i]
                              ? touched.answerOptions[i].fraction
                              : null
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <KenInputField
                        label={
                          <span className={classes.labelText}>Feedback</span>
                        }
                        placeholder="Type your Feedback"
                        value={values.answerOptions[i]['feedback']}
                        name={`answerOptions[${i}]['feedback']`}
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['feedback']`
                        )}
                        errors={
                          errors.answerOptions
                            ? errors.answerOptions[i]
                              ? errors.answerOptions[i].feedback
                              : null
                            : null
                        }
                        touched={
                          touched.answerOptions
                            ? touched.answerOptions[i]
                              ? touched.answerOptions[i].feedback
                              : null
                            : null
                        }
                        required={true}
                      />
                    </Grid>
                  </>
                );
              })}

            <Grid item xs={12}>
              <>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  onClick={handleAddAnother}
                >
                  <Grid item>
                    <AddCircleOutlineRoundedIcon className={classes.addIcon} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.typoAnother}>
                      Add another answer option
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </Grid>
            {/* <Grid item xs={12}>
              <KenRadioGroup
                label={<span className={classes.labelText}>Unit handling</span>}
                options={unitHandlingOpt}
                name="unitHandling"
                value={values.unitHandling}
                defaultValue={() => {
                  setFieldValue('unitHandling', unitHandlingOpt[0].value);
                }}
                onChange={(val, e) => change.bind(null, 'unitHandling')(e)}
              />
            </Grid> */}
            {/* <Grid item xs={12} md={3}>
              <KenInputField
                label={<span className={classes.labelText}>Penalty</span>}
                placeholder=""
                name="gradePenalty"
                value={values.gradePenalty}
                onChange={change.bind(null, 'gradePenalty')}
              />
            </Grid> */}

            <Grid item xs={12}>
              <KenTextArea
                label={
                  <span className={classes.labelText}>General feedback</span>
                }
                multiline={true}
                minRows={3}
                placeholder="A fully worked answer or link for more information."
                name="generalFeedback"
                value={values.generalFeedback}
                onChange={handelFeedBack}
              />
            </Grid>

            <Grid item xs={12}>
              <KenInputField
                name="tagInput"
                label={<span className={classes.labelText}>Add tags </span>}
                placeholder="Click comma to separate tags"
                onKeyPress={ev => {
                  if (ev.key === 'Enter' && ev.target.value?.length > 0) {
                    keyPress(ev.target.value);
                    setFieldValue('tagInput', '');
                    ev.preventDefault();
                  }
                }}
                value={values.tagInput}
                onChange={change.bind(null, 'tagInput')}
              />
            </Grid>
            <Box>
              {values?.tags?.map((tag, index) => {
                return (
                  <Box component="span">
                    <PurpleKenChip
                      label={tag.text}
                      onDelete={() => deleteTag(index)}
                    />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Box>
      )}

      <Box>
        <ContentFooter
          handleEdit={handleEdit}
          edit={values.showPreview}
          submit={!values.showPreview}
          handleSubmit={handleAddQuestion}
          handleCancel={handleCancel}
        />

        <KenSnackBar
          message={snackbarMessage}
          severity={snackbarSeverity}
          autoHideDuration={5000}
          open={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          position="Bottom-Right"
        />
      </Box>
    </>
  );
};

const ShortAnswerQuestionFormikHOC = props => {
  const { t } = useTranslation();
  const {
    transaction,
    selectedQuestion,
    setQuizUpdated,
    quizUpdated,
    quizId,
    courseId,
    chapterId,
    fromQuestionBank,
    handlePreviewClick,
  } = props;

  const [tags, setTags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();

  const [hints, setHints] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
  ]);
  const [answerOptions, setAnswerOptions] = useState([
    { id: 1, answer: '', tolerance: '', error: '', feedback: '', fraction: '' },
  ]);

  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    if (selectedQuestion) {
      if (selectedQuestion?.questionid) {
        getQuestionDetail(selectedQuestion?.questionid)
          .then(res => {
            if (!res.hasOwnProperty('errorcode')) {
              setCurrentQuestion(res);
              const modifiedOptions = res?.options?.map(item => {
                return {
                  ...item,
                  option: item.label,
                  answer: item.label,
                  feedback: item.feedback,
                  correctAnswer: item?.rightanswer === true ? true : false,
                };
              });
              setAnswerOptions(modifiedOptions);

              const modifiedTags = res?.tags?.map(item => {
                return {
                  // ...item,
                  text: item.label,
                };
              });
              setTags(modifiedTags);
            } else {
              console.log('something went wrong');
            }
          })
          .catch(error => {
            console.log('error in question by id');
          });
      }
    } else {
      setCurrentQuestion();
    }
  }, [selectedQuestion, toggle]);

  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      questionText: currentQuestion?.questiontext,
      questionPurpose: currentQuestion?.metadata?.find(item=>item.field==="questionpurpose")?.data,
      difficultyLevel: currentQuestion?.metadata?.find(item=>item.field==="questiondifficultylevel")?.data,
      marks: currentQuestion?.mark?.toFixed(2) || Number(currentQuestion?.defaultmark || 0)?.toFixed(2) || 0,
      negativePercentage: currentQuestion?.negativePercentage,
      penalty: currentQuestion?.penalty || 0,
      decimalPenalty: currentQuestion?.decimalPenalty || 0,
      attachmentsAllowed: false,
      maxAttachments: '',
      maxFileSize: '',
      supportedFileTypes: [],
      answerCharLimit: '',
      responseTemplate: '',
      gradeInfo: '',
      generalFeedback: currentQuestion?.generalfeedback,
      tags: tags || [],
      tagInput: '',
      action: 'preview',
      // showPreview: transaction === TRANSACTIONS?.UPDATE,
      showPreview:
        transaction === TRANSACTIONS?.UPDATE ||
        transaction === TRANSACTIONS?.EDIT,
      answerOptions: answerOptions,
      gradePenalty: '',
      fractionGrade: 0,
      unitHandling: 0,
      unitInput: 0,
      unitLeftRightSide: 0,
      units: '',
      multiplier: '',
      hints: hints,
      toggle: toggle,

      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({
      questionText: Yup.string().required('Required'),
      marks: Yup.number()
        .required()
        .positive(),
      // questionPurpose: Yup.string().required('Question Outcome is a required '),
      // difficultyLevel: Yup.string().required('Difficulty Level is a required'),
      // penalty: Yup.number()
      //   .max(100)
      //   .min(0, 'must be a positive number')
      //   .nullable(),
      // decimalPenalty: Yup.number()
      //   .max(Yup.ref('marks'))
      //   .min(0, 'must be a positive number')
      //   .nullable(),
      //   correctAnswerFeedback: Yup.string().required(
      //     'Feedback for correct answer  is a required'
      //   ),
      //   generalFeedback: Yup.string().required('General feedback is a required'),
      //   wrongAnswerFeedback: Yup.string().required(
      //     'Feedback for incorrect answer is a required'
      //   ),
      answerOptions: Yup.array().of(
        Yup.object().shape({
          answer: Yup.string().required('Required'),
          feedback: Yup.string().required('Required'),
          fraction: Yup.string().required('Required'),
        })
      ),
    }),

    handleSubmit: values => {
      const modifiedChoices = values?.answerOptions?.map(item => {
        return {
          option: String(item?.answer),
          fraction: Number(item.fraction),
          feedback: String(item.feedback),
        };
      });
      if (values.action === 'submit') {
        const metadata = [
          {
            field: 'questionpurpose',
            data: values.questionPurpose || '',
          },
          {
            field: 'questiondifficultylevel',
            data: values.difficultyLevel || ''
          },
        ];

        const payload = {
          quizid: Number(quizId),
          page: 1,
          questionname: '',
          questiontext: values?.questionText,
          defaultmark: Number(values?.marks),
          penalty: String(values?.decimalPenalty),
          generalfeedback: values?.generalFeedback,
          tags: values.tags,
          choices: modifiedChoices,
          metadata: metadata,
        };
        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.courseId = courseId;
          payload.chapterId = chapterId;
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              console.log('fromquetion bank payload', payload);
              addShortAnswerQuestionBank(payload)
                .then(res => {
                  if (!res.hasOwnProperty('errorcode')) {
                    // setQuizUpdated(!quizUpdated);
                    handlePreviewClick(res.questionid, 0);
                  } else {
                    console.log('something went wrong');
                  }
                })
                .catch(error => {
                  console.log(
                    'something went wrong while adding question to the question bank',
                    error
                  );
                });

              break;
            case TRANSACTIONS.UPDATE:
            case TRANSACTIONS.EDIT:
              payload.questionId = selectedQuestion?.questionid;
              updateShortAnswerQuestionBank(payload)
                .then(res => {
                  if (!res.hasOwnProperty('errorcode')) {
                    // setQuizUpdated(!quizUpdated);
                    handlePreviewClick(res.questionid, 0);
                  } else {
                    console.log('something went wrong');
                  }
                })
                .catch(error => {
                  console.log(
                    'something went wrong while updating question to the question bank',
                    error
                  );
                });
              break;
            default:
              console.log('fromquetion bank payload', payload);
          }
        } else {
          if (transaction === TRANSACTIONS.CREATE) {
            console.log('payload', payload);
            addShortAnswerQuestion(payload)
              .then(res => {
                if (!res.hasOwnProperty('errorcode')) {
                  setQuizUpdated(!quizUpdated);
                } else {
                  console.log('something went wrong');
                }
              })
              .catch(error => {
                console.log(
                  'something went wrong while adding question to the quiz',
                  error
                );
              });
          } else {
            payload.questionId = selectedQuestion?.questionid;
            updateShortAnswerQuestion(payload).then(res => {
              if (!res.hasOwnProperty('errorcode')) {
                setQuizUpdated(!quizUpdated);
                setCurrentQuestion();
              } else {
                console.log('something went wrong');
              }
            });
          }
        }
      } else {
        console.log('previewing values', values);
      }
    },
    displayName: 'ShortAnswerQuestionForm',
  })(ShortAnswerQuestionForm);

  return <FormikForm {...props} />;
};
