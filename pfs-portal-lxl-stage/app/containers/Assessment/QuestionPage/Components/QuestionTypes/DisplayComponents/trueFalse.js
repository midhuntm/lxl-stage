import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../../../components/KenInputField';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup';
import KenSelect from '../../../../../../global_components/KenSelect';
import KenTextArea from '../../../../../../global_components/KenTextArea';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import QuestionPreview from '../../QuestionPreview';
import ContentHeader from './contentHeader';
import ContentFooter from './contentFooter';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import PurpleKenChip from './PurpleKenChip';
import KenEditor from '../../../../../../global_components/KenEditor';
import {
  addTrueFalseToQuiz,
  updateTrueFalseToQuiz,
  updateTrueFalseQuestionBank,
  addTrueFalseQuestionBank,
  getQuestionDetail,
} from '../../../../../../utils/ApiService';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import parse from 'html-react-parser';
// import KenLoader from '../../../../../../components/KenLoader';
const useStyles = makeStyles(theme => ({
  divider: {
    color: theme.palette.KenColors.assessmentBorder,
    margin: '0px 16px',
  },
  labelText: {
    color: theme.palette.KenColors.kenBlack,
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
}));

export default function TrueFalse(props) {
  return <TrueFalseHOC {...props} />;
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

const TrueFalseForm = props => {
  const {
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
    handleCancelEdit,
  } = props;
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    console.log('values', values);
    // setNewlyCreatedQuestion(values);
  };
  const [content, setContent] = useState(
    '<p>hello <strong>Asmita</strong></p>'
  );
  const [mcqTags, setMcqTags] = useState(values.tags);
  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

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
  const changeRightAnswer = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    setFieldValue(name, e.target.value);
  };
  useEffect(() => {
    setFieldValue('tags', mcqTags);
  }, [mcqTags]);
  //   console.log('selectedQuestion', selectedQuestion);

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
            marks={`${values.marks}`}
            options={
              values?.options || [
                { label: 'True', value: '1' },
                { label: 'False', value: '0' },
              ]
            }
            correctAnswerFeedback={values.correctAnswerFeedback}
            wrongAnswerFeedback={values.wrongAnswerFeedback}
            partiallyCorrectAnswerFeedback={
              values.partiallyCorrectAnswerFeedback
            }
            generalFeedback={values.generalFeedback}
            // question={values.questionText}
            question={parse(`${values.questionText || ''}`) || ''}
            tags={mcqTags}
            answers={[
              {
                label: values.rightanswer === '1' ? 'True' : 'False',
                value: values.rightanswer,
              },
            ]}
          />
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <KenInputField
                label={<span className={classes.labelText}>Question</span>}
                required={true}
                name="questionText"
                value={values.questionText || values.question}
                onChange={change.bind(null, 'question')}
                errors={errors?.questionText}
                touched={touched?.questionText}
              /> */}
              <KenEditor
                label={<span className={classes.labelText}>Question</span>}
                required={true}
                content={values.questionText || values.question}
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
            {/* <Grid item xs={12} md={4}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Marks for this question
                  </span>
                }
                required={true}
                name="marks"
                value={values.marks}
                onChange={change.bind(null, 'marks')}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Penalty for each incorrect answer (-ve marking)
                  </span>
                }
                name="penalty"
                value={values.penalty}
                onChange={change.bind(null, 'penalty')}
              />
            </Grid> */}
            <Grid md={12} container spacing={2}>
              <Grid md={4} item>
                <Grid item xs={12}>
                  <KenInputField
                    name="marks"
                    // placeholder="1-100"
                    placeholder=""
                    label={
                      <span className={classes.labelText}>
                        Marks for this question
                      </span>
                    }
                    required={true}
                    value={values.marks}
                    onChange={onHandleMarks}
                    type="number"
                    errors={errors?.marks}
                    touched={touched?.marks}
                  // disabled={true}
                  /* errors={errors?.marks}
              touched={touched?.marks} */
                  />
                </Grid>
              </Grid>
              <Grid md={8} item>
                {/* <Typography className={classes.labelText}>
                  Penalty for each incorrect answer (-ve marking)
                  <span>
                    <InfoOutlinedIcon
                      style={{ fontSize: 14, paddingLeft: '5px' }}
                    />
                  </span>
                </Typography> */}
                <Grid md={12} container spacing={2}>
                  <Grid sm={3} md={4} item className={classes.percentageField}>
                    {/* <KenInputField
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
                    <span className={classes.spanPercentage}>%</span> */}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/*  <KenInputField
                      name="decimalPenalty"
                      label=""
                      placeholder="eg: 0.5"
                      // required={true}
                      value={values.decimalPenalty}
                      onChange={change.bind(null, 'decimalPenalty')}
                      errors={errors?.decimalPenalty}
                      touched={touched?.decimalPenalty}
                    /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <KenRadioGroup
                required={true}
                label={
                  <span className={classes.labelText}>Correct answer</span>
                }
                options={[
                  { label: 'True', value: '1' },
                  { label: 'False', value: '0' },
                ]}
                name="rightanswer"
                value={values.rightanswer}
                onChange={(newVal, e) => change.bind(null, 'rightanswer')(e)}
                // onChange={(val, e) =>
                //   changeRightAnswer.bind(null, 'rightanswer')(e)
                // }
                errors={errors?.rightanswer}
                touched={touched?.rightanswer}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Feedback for correct answer
                  </span>
                }
                name="correctAnswerFeedback"
                value={values.correctAnswerFeedback}
                onChange={change.bind(null, 'correctAnswerFeedback')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Feedback for incorrect answer
                  </span>
                }
                name="wrongAnswerFeedback"
                value={values.wrongAnswerFeedback}
                onChange={change.bind(null, 'wrongAnswerFeedback')}
              />
            </Grid> */}
            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>General feedback </span>
                }
                minRows={3}
                multiline={true}
                placeholder="A fully worked answer or link for more information."
                name="generalFeedback"
                value={values.generalFeedback}
                onChange={change.bind(null, 'generalFeedback')}
              />
            </Grid>

            <Grid item xs={12}>
              <KenInputField
                name="tagInput"
                label={<span className={classes.labelText}>Add tags </span>}
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
          </Grid>
        </Box>
      )}

      <Box>
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
      </Box>
    </>
  );
};

const TrueFalseHOC = props => {
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
    { label: 'True', value: '1' },
    { label: 'False', value: '0' },
  ]);
  const [tags, setTags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [toggle, setToggle] = useState(true);

  const getCorrectAnswer = allOptions => {
    return allOptions.find(item => item.rightanswer === true);
  };

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
                  correctAnswer: item?.rightanswer === true ? true : false,
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
  const correctAnswerObject = getCorrectAnswer(options);
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      questionText: currentQuestion?.questiontext,
      questionName: currentQuestion?.name,

      questionPurpose: currentQuestion?.metadata?.find(item=>item.field==="questionpurpose")?.data,
      difficultyLevel: currentQuestion?.metadata?.find(item=>item.field==="questiondifficultylevel")?.data,


      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
      //   marks: 1,
      penalty: currentQuestion?.penalty || 0,
      decimalPenalty: currentQuestion?.decimalPenalty || 0,
      singleAnswer:
        !currentQuestion?.multianswer || currentQuestion.singleanswer
          ? '1'
          : '0',
      generalFeedback: currentQuestion?.generalfeedback,
      action: 'preview',
      showPreview:
        transaction === TRANSACTIONS?.UPDATE ||
        transaction === TRANSACTIONS?.EDIT,
      correctAnswerFeedback:
        currentQuestion?.correctanswerfeedback ||
        currentQuestion?.rightanswerfeedback,
      wrongAnswerFeedback:
        currentQuestion?.incorrectanswerfeedback ||
        currentQuestion?.wronganswerfeedback,
      partiallyCorrectAnswerFeedback:
        currentQuestion?.partiallycorrectanswerfeedback,
      options: options,
      numberOfChoices: currentQuestion?.numberofchoices,
      tags: tags || [],
      tagInput: '',
      shuffleAnswers: currentQuestion?.shuffleanswers || false,
      toggle: toggle,
      page: selectedQuestion?.page || 0,
      rightanswer: correctAnswerObject?.label === 'True' ? '1' : '0',

      toggle: toggle,
      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({
      questionText: Yup.string().required("Question Can't be Empty"),
      marks: Yup.number()
        .min(0, 'must be a positive number')
        .nullable()
        .required(),
      // questionPurpose: Yup.string().required('Question Outcome is a required '),
      // difficultyLevel: Yup.string().required('Difficulty Level is a required'),
      /* marks: Yup.number()
        .required()
        .positive(),
      penalty: Yup.number()
        .max(100)
        .positive()
        .nullable(),
      decimalPenalty: Yup.number()
        .max(Yup.ref('marks'))        
        .positive()
        .nullable(),
      rightanswer: Yup.string().required(), */
    }),

    handleSubmit: values => {
      if (values.action === 'submit') {
        const modifiedChoices = values?.options?.map(item => {
          return {
            ...item,
            correctAnswer: item.correctAnswer === true ? 1 : 0,
          };
        });
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
          quizId: Number(quizId),
          page: values.page,
          questionName: values.questionName,
          questionText: values.questionText,
          defaultMarks: values.marks,
          penalty: String(values?.decimalPenalty),
          singleAnswer: Number(values.singleAnswer),
          shuffleAnswers: values.shuffleAnswers === true ? 1 : 0,
          correctFeedback: values.correctAnswerFeedback,
          incorrectFeedback: values.wrongAnswerFeedback,
          generalFeedback: values.generalFeedback,
          //   tags: values.tags || [],
          choices: modifiedChoices,
          answerNumbering: '',
          rightAnswer: values.rightanswer,
          metadata: metadata,
        };
        // console.log('payload for true false', payload);

        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.questionId = selectedQuestion?.questionid;
          payload.courseId = courseId;
          payload.chapterId = chapterId;
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              console.log('fromquetion bank payload', payload);
              addTrueFalseQuestionBank(payload)
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
              updateTrueFalseQuestionBank(payload)
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
            payload['tags'] = values?.tags || [];
            console.log('payload for true false 2', payload);
            addTrueFalseToQuiz(payload)
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
            updateTrueFalseToQuiz(payload).then(res => {
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
  })(TrueFalseForm);

  return <FormikForm {...props} />;
};
