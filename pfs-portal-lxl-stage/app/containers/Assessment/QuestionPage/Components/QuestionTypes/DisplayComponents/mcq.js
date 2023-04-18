import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import KenInputField from '../../../../../../components/KenInputField';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup';
import KenSelect from '../../../../../../global_components/KenSelect';
import KenTextArea from '../../../../../../global_components/KenTextArea';
import KenCheckbox from '../../../../../../global_components/KenCheckbox';
import KenChip from '../../../../../../global_components/KenChip';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import context from '../../../../../../utils/helpers/context';
import KenEditor from '../../../../../../global_components/KenEditor';
import ContentHeader from './contentHeader';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import QuestionPreview from '../../QuestionPreview';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import ContentFooter from './contentFooter';
import {
  addMCQQuestionToQuiz,
  getQuestionDetail,
  updateMCQQuestionToQuiz,
  addMCQToQuestionBank,
  updateMCQToQuestionBank,
  // mediaFileUpload,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import parse from 'html-react-parser';
import KenLoader from '../../../../../../components/KenLoader';
const useStyles = makeStyles(theme => ({
  divider: {
    color: theme.palette.KenColors.assessmentBorder,
    margin: '0px 16px',
  },
  labelText: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 12,
  },
  typoAnother: {
    color: theme.palette.KenColors.primary,
    fontSize: 14,
    fontWeight: 600,
  },
  addIcon: {
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
  },
  deleteIcon: {
    color: theme.palette.KenColors.tertiaryRed503,
    marginBottom: 8,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  chip: {
    backgroundColor: theme.palette.KenColors.neutral41,
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    margin: '2px 5px',
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
}));

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
// const options = [
//   {
//     optionValue: '',
//     gradeValue: '',
//     checkedValue: false,
//     feedbackValue: '',
//   },
//   {
//     optionValue: '',
//     gradeValue: '',
//     checkedValue: false,
//     feedbackValue: '',
//   },
//   {
//     optionValue: '',
//     gradeValue: '',
//     checkedValue: false,
//     feedbackValue: '',
//   },
// ];

export default function MCQ(props) {
  return <MCQFormikHOC {...props} />;
}

const MCQQuestionForm = props => {
  const classes = useStyles();
  //   const { handleSnackbarOpen } = useContext(context);
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
    errors,
    touched,
    handleCancelEdit,
  } = props;

  const [mcqOptions, setMcqOptions] = useState(values.options);
  const [mcqTags, setMcqTags] = useState(values.tags);

  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  const handleAddAnother = () => {
    // let obj = {
    //   optionValue: '',
    //   gradeValue: '',
    //   checkedValue: false,
    //   feedbackValue: '',
    // };
    let obj = { option: '', feedback: '', rightanswer: 0 };
    if (values?.options?.length === 6) {
      handleSnackbarOpen('Warning', "Options can't be more than six");
      //   console.log('reached to limit');
    } else {
      //   setMcqOptions([...mcqOptions, obj]);
      const array = [...values.options, obj];
      setFieldValue('options', array);
    }
  };

  const handleDelete = index => {
    let data = [];
    mcqOptions?.map((el, ind) => {
      if (ind !== index) {
        data?.push(el);
      }
    });
    if (data?.length < 2) {
      handleSnackbarOpen('Warning', "Options can't be less than two");
    } else {
      setMcqOptions([...data]);
    }
  };

  const change = (name, e) => {
    console.log('name------------->', name, e);
    console.log('e', e);
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const handlePreview = () => {
    setFieldValue('action', 'preview');
    setFieldValue('showPreview', !values.showPreview);
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

  const handleAddQuestion = () => {
    setFieldValue('action', 'submit');
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

  const keyPress = val => {
    const tags = [...values.tags];
    tags.push({ text: val });
    // setFieldValue('tags', tags);
    setMcqTags(tags);
  };
  const deleteTag = index => {
    let tags = [...values.tags];
    tags.splice(index, 1);
    // setFieldValue('tags', tags);
    setMcqTags(tags);
  };

  const getCorrectAnswer = () => {
    return values.options.filter(item => item.rightanswer === true);
  };

  useEffect(() => {
    setFieldValue('tags', mcqTags);
  }, [mcqTags]);

  useEffect(() => {
    setFieldValue('options', mcqOptions);
    console.log('mcqOptions', mcqOptions);
  }, [mcqOptions]);

  useEffect(() => {
    if (values.singleAnswer === '1') {
      !values.options && handleAnswerCheck(null, -1);
    }
  }, [values.singleAnswer]);

  const handleAnswerCheck = (e, index) => {
    console.log('values?.singleAnswer', values?.singleAnswer);
    if (values?.singleAnswer === '1') {
      const array = values?.options?.map((item, idx) => {
        if (index !== idx) {
          return {
            ...item,
            rightanswer: false,
          };
        } else {
          return {
            ...item,
            rightanswer: true,
          };
        }
      });
      setMcqOptions(array);
    } else {
      change.bind(null, `options[${index}]['rightanswer']`)(e);
    }
  };

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

  return (
    <>
      {loading && <KenLoader />}
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
            options={values?.options || [{}, {}, {}, {}]}
            answers={getCorrectAnswer() || []}
            correctAnswerFeedback={values.correctAnswerFeedback}
            wrongAnswerFeedback={values.wrongAnswerFeedback}
            partiallyCorrectAnswerFeedback={
              values.partiallyCorrectAnswerFeedback
            }
            generalFeedback={values.generalFeedback}
            question={parse(`${values.questionText || ''}`) || ''}
            // question={values.questionText}
            tags={mcqTags}
          />
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <KenInputField
                name="questionText"
                label={<span className={classes.labelText}>Question</span>}
                required={true}
                value={values.questionText}
                onChange={change.bind(null, 'question')}
                errors={errors?.questionText}
                touched={touched?.questionText}
              /> */}
              <KenEditor
                label={<span className={classes.labelText}>Question</span>}
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
            {/* <Grid item xs={12} md={9}>
              <KenInputField
                name="questionName"
                label={<span className={classes.labelText}>Question Name</span>}
                required={true}
                value={values.questionName}
                onChange={change.bind(null, 'questionName')}
                errors={errors?.questionName}
                touched={touched?.questionName}
              />
            </Grid> */}
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
                // onChange={(val, e) => change.bind(null, 'difficultyLevel')(e)}
                onChange={change.bind(null, 'difficultyLevel')}
                errors={errors?.difficultyLevel}
                touched={touched?.difficultyLevel}
              />
              {/* {errors.difficultyLevel} */}
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <KenInputField
                name="marks"
                label={
                  <span className={classes.labelText}>
                    Marks for this question
                  </span>
                }
                required={true}
                value={values.marks}
                onChange={change.bind(null, 'marks')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <KenInputField
                name="penalty"
                label={
                  <span className={classes.labelText}>
                    Penalty for each incorrect answer (-ve marking)
                  </span>
                }
                value={values.penalty}
                onChange={change.bind(null, 'penalty')}
              />
            </Grid> */}
            <Grid md={12} container spacing={2}>
              <Grid md={4} item>
                <Grid item xs={12}>
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
              </Grid>
              <Grid md={8} item>
                <Typography className={classes.labelText}>
                  Penalty for each incorrect answer (-ve marking)
                  <span>
                    <InfoOutlinedIcon
                      style={{ fontSize: 14, paddingLeft: '5px' }}
                    />
                  </span>
                </Typography>
                <Grid md={12} container spacing={2}>
                  <Grid sm={3} md={4} item className={classes.percentageField}>
                    <KenInputField
                      placeholder="_ _ _"
                      label=""
                      inputBaseRootClass={classes.inputClass}
                      value={values.penalty}
                      setFieldTouched={setFieldTouched}
                      name="penalty"
                      onChange={newValue => {
                        setFieldValue('penalty', newValue.target.value);
                        setFieldValue(
                          'decimalPenalty',
                          convert2Decimal(newValue.target.value)
                        );
                      }}
                      errors={errors?.penalty}
                      touched={touched?.penalty}
                    />
                    <span className={classes.spanPercentage}>%</span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <KenInputField
                      name="decimalPenalty"
                      label=""
                      placeholder="eg: 0.5"
                      // required={true}
                      value={values.decimalPenalty}
                      onChange={change.bind(null, 'decimalPenalty')}
                      errors={errors?.decimalPenalty}
                      touched={touched?.decimalPenalty}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <KenRadioGroup
                name="singleAnswer"
                required={true}
                label={
                  <span className={classes.labelText}>
                    One or multiple answers
                  </span>
                }
                options={[
                  { label: 'One answer only', value: '1' },
                  { label: 'Multiple answers', value: '0' },
                ]}
                value={values.singleAnswer}
                onChange={(val, e) => change.bind(null, 'singleAnswer')(e)}
              />
            </Grid>
            {values?.options?.map((el, index) => {
              return (
                <Grid item container xs={12} md={12}>
                  <>
                    <Grid
                      container
                      spacing={1}
                      alignItems={
                        touched.options &&
                          touched.options[index] &&
                          touched.options[index].option
                          ? 'center'
                          : 'flex-end'
                      }
                    >
                      <Grid item xs={12} md={6}>
                        <KenInputField
                          required={true}
                          name={`options[${index}]['option']`}
                          label={
                            <span className={classes.labelText}>
                              Option {index + 1}
                            </span>
                          }
                          placeholder="Enter option"
                          value={values?.options[index]?.option}
                          onChange={change.bind(
                            null,
                            `options[${index}]['option']`
                          )}
                          errors={
                            errors.options
                              ? errors.options[index]
                                ? errors.options[index].option
                                : null
                              : null
                          }
                          touched={
                            touched.options
                              ? touched.options[index]
                                ? touched.options[index].option
                                : null
                              : null
                          }
                        />
                      </Grid>
                      {/* <Grid item xs={6} md={2}>
                        <KenInputField
                          label={
                            <span className={classes.labelText}>Grade</span>
                          }
                          placeholder="--"
                        />
                      </Grid> */}
                      <Grid item xs={3} md={3}>
                        <KenCheckbox
                          id={index}
                          label="Correct answer"
                          name={`options[${index}]['rightanswer']`}
                          value={values?.options[index]?.rightanswer}
                          onChange={e => handleAnswerCheck(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3} md={1}>
                        <DeleteOutlineIcon
                          className={classes.deleteIcon}
                          onClick={() => {
                            handleDelete(index);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <KenInputField
                          name={`options[${index}]['feedback']`}
                          label={
                            <span className={classes.labelText}>Feedback</span>
                          }
                          placeholder="Type your feedback here"
                          value={values?.options[index]?.feedback}
                          onChange={change.bind(
                            null,
                            `options[${index}]['feedback']`
                          )}
                        />
                      </Grid>
                    </Grid>
                    {/* <Divider className={classes.divider} /> */}
                  </>
                </Grid>
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
                      Add another choice
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </Grid>

            <Grid item xs={12}>
              <KenRadioGroup
                name="answerNumbering"
                required={true}
                label={
                  <span className={classes.labelText}>Number of choices</span>
                }
                options={[
                  { label: 'A., B., C., ...', value: 'ABCD' },
                  { label: 'a., b., c., ...', value: 'abc' },
                  { label: 'I., II., III., ...', value: 'IIII' },
                  { label: 'i., ii., iii.,...', value: 'iii' },
                  { label: '1., 2., 3., ...', value: '123' },
                  { label: 'No numbering', value: 'none' },
                ]}
                value={values.answerNumbering}
                onChange={(val, e) => change.bind(null, 'answerNumbering')(e)}
                errors={errors?.answerNumbering}
                touched={touched?.answerNumbering}
              />
            </Grid>

            <Grid item xs={12}>
              <KenInputField
                // required={true}
                label={
                  <span className={classes.labelText}>
                    Feedback for correct answer
                  </span>
                }
                placeholder="Feedback for correct answer"
                name="correctAnswerFeedback"
                value={values.correctAnswerFeedback}
                onChange={change.bind(null, 'correctAnswerFeedback')}
                errors={errors?.correctAnswerFeedback}
                touched={touched?.correctAnswerFeedback}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                // required={true}
                label={
                  <span className={classes.labelText}>
                    Feedback for incorrect answer
                  </span>
                }
                placeholder="Feedback for incorrect answer"
                name="wrongAnswerFeedback"
                value={values.wrongAnswerFeedback}
                onChange={change.bind(null, 'wrongAnswerFeedback')}
                errors={errors?.wrongAnswerFeedback}
                touched={touched?.wrongAnswerFeedback}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <KenInputField
                // required={true}
                label={
                  <span className={classes.labelText}>
                    Feedback for incorrect answer
                  </span>
                }
                placeholder="Feedback for incorrect answer"
                name="wrongAnswerFeedback"
                value={values.wrongAnswerFeedback}
                onChange={change.bind(null, 'wrongAnswerFeedback')}
                errors={errors?.wrongAnswerFeedback}
                touched={touched?.wrongAnswerFeedback}
              />
            </Grid> */}
            <Grid item xs={12}>
              <KenInputField
                // required={true}
                label={
                  <span className={classes.labelText}>General feedback </span>
                }
                multiline={true}
                minRows={3}
                placeholder="A fully worked answer or link for more information."
                name="generalFeedback"
                value={values.generalFeedback}
                onChange={change.bind(null, 'generalFeedback')}
                errors={errors?.generalFeedback}
                touched={touched?.generalFeedback}
              />
            </Grid>

            <>
              {' '}
              {!fromQuestionBank && (
                <>
                  {' '}
                  <Grid item xs={12}>
                    <KenInputField
                      name="tagInput"
                      label={
                        <span className={classes.labelText}>Add tags </span>
                      }
                      placeholder="Enter a value and press enter"
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
                </>
              )}
            </>
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
          // position="Bottom-Right"
          position="Top-Right"
        />
      </Box>
    </>
  );
};

const MCQFormikHOC = props => {
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
  const [options, setOptions] = useState([
    { option: '', feedback: '', rightanswer: true },
    { option: '', feedback: '', rightanswer: 0 },
    { option: '', feedback: '', rightanswer: 0 },
  ]);

  const [difficultyLevelData, setDifficultyLevelData] = useState();
  const [tags, setTags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
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
                  feedback: item.feedback,
                  rightanswer: item?.rightanswer === true ? true : false,
                };
              });
              setOptions(modifiedOptions);

              const modifiedTags = res?.tags?.map(item => {
                return {
                  ...item,
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
      questionid: selectedQuestion?.questionid || '',
      questionText: currentQuestion?.questiontext,
      questionName: currentQuestion?.name,
      questionPurpose: currentQuestion?.metadata?.find(item=>item.field==="questionpurpose")?.data,

      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
      penalty: currentQuestion?.penalty || 0,
      decimalPenalty: currentQuestion?.decimalPenalty || 0,
      singleAnswer:
        !currentQuestion?.multianswer || currentQuestion.singleanswer
          ? '1'
          : '0',
      generalFeedback: currentQuestion?.generalfeedback,
      action: 'preview',
      // showPreview: transaction === TRANSACTIONS?.UPDATE,
      showPreview:
        transaction === TRANSACTIONS?.UPDATE ||
        transaction === TRANSACTIONS?.EDIT,
      correctAnswerFeedback: currentQuestion?.correctanswerfeedback,
      wrongAnswerFeedback: currentQuestion?.incorrectanswerfeedback,
      partiallyCorrectAnswerFeedback:
        currentQuestion?.partiallycorrectanswerfeedback,
      options: options,
      numberOfChoices: currentQuestion?.numberofchoices,
      tags: tags || [],
      tagInput: '',
      shuffleAnswers: currentQuestion?.shuffleanswers || false,
      answerNumbering: currentQuestion?.numberofchoices,
      difficultyLevel: currentQuestion?.metadata?.find(item=>item.field==="questiondifficultylevel")?.data,
      toggle: toggle,

      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({
      questionText: Yup.string().required('Question is a required '),
      // questionName: Yup.string().required('Question Name is a required '),
      // difficultyLevel: Yup.object().shape({
      //   KenSelect: Yup.string().required('uiogsd'),
      // }),
      // questionPurpose: Yup.string().required('Question Outcome is a required '),
      // difficultyLevel: Yup.string().required('Difficulty Level is a required'),
      marks: Yup.number()
        .required()
        .positive(),
      penalty: Yup.number()
        .max(100)
        .min(0, 'must be a positive number')
        .nullable(),
      decimalPenalty: Yup.number()
        .max(Yup.ref('marks'))
        .min(0, 'must be a positive number')
        .nullable(),
      answerNumbering: Yup.string().required('Number of choices is a required'),
      //   correctAnswerFeedback: Yup.string().required(
      //     'Feedback for correct answer  is a required'
      //   ),
      //   generalFeedback: Yup.string().required('General feedback is a required'),
      //   wrongAnswerFeedback: Yup.string().required(
      //     'Feedback for incorrect answer is a required'
      //   ),

      options: Yup.array().of(
        Yup.object().shape({
          option: Yup.string().required('Options is required'),
        })
      ),
    }),

    handleSubmit: values => {
      if (values.action === 'submit') {
        const modifiedChoices = values?.options?.map(item => {
          return {
            ...item,
            rightanswer: item.rightanswer === true ? 1 : 0,
            correctAnswer: item.rightanswer === true ? 1 : 0,
          };
        });
        console.log('valuesvaluesvaluesvalues', values);

        let metadata = [
          {
            field: 'questionpurpose',
            data: values.questionPurpose || '',
          },
          {
            field: 'questiondifficultylevel',
            data: values.difficultyLevel || ''
          }
        ];
        const payload = {
          quizId: Number(quizId),
          page: 0,
          questionName: values.questionName || 'mcq',
          questionText: values.questionText,
          defaultMarks: values.marks,
          penalty: String(values?.decimalPenalty),
          singleAnswer: Number(values.singleAnswer),
          shuffleAnswers: values.shuffleAnswers === true ? 1 : 0,
          correctFeedback: values.correctAnswerFeedback,
          incorrectFeedback: values.wrongAnswerFeedback,
          generalFeedback: values.generalFeedback,
          choices: modifiedChoices,
          answerNumbering: values.answerNumbering,
          metadata: metadata,
        };

        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.questionId = selectedQuestion?.questionid;
          payload.courseId = courseId;
          payload.chapterId = chapterId;
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              console.log('fromquetion bank payload', payload);
              addMCQToQuestionBank(payload)
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
              updateMCQToQuestionBank(payload)
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
              console.log('from question bank payload', payload);
          }
        } else {
          if (transaction === TRANSACTIONS.CREATE) {
            payload['tags'] = values?.tags || [];
            addMCQQuestionToQuiz(payload)
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
            updateMCQQuestionToQuiz(payload).then(res => {
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
    displayName: 'MCQQuestionForm',
  })(MCQQuestionForm);

  return <FormikForm {...props} />;
};
