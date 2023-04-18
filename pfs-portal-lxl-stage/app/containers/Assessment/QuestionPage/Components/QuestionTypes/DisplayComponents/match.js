import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import KenInputField from '../../../../../../components/KenInputField';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup';
import KenSelect from '../../../../../../global_components/KenSelect';
import KenTextArea from '../../../../../../global_components/KenTextArea';
import KenCheckBox from '../../../../../../global_components/KenCheckbox';
import KenChip from '../../../../../../global_components/KenChip';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import context from '../../../../../../utils/helpers/context';
import ContentHeader from './contentHeader';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import QuestionPreview from '../../QuestionPreview';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import ContentFooter from './contentFooter';
import {
  addMatchingQuestion,
  addMCQToQuestionBank,
  getQuestionDetail,
  updateMatchingQuestion,
  updateMCQToQuestionBank,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
const useStyles = makeStyles(theme => ({
  divider: {
    color: theme.palette.KenColors.assessmentBorder,
    width: '98%',
    margin: '0px auto',
    marginTop: 16,
    marginBottom: 20,
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

export default function Match(props) {
  return <MatchFormikHOC {...props} />;
}

const MatchQuestionForm = props => {
  const classes = useStyles();
  //   const { handleSnackbarOpen } = useContext(context);
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
    courseId,
    chapterId,
    fromQuestionBank,
    handlePreviewClick,
    handleCancelEdit
  } = props;

  const [matchOptions, setMatchOptions] = useState(values.options);
  const [matchTags, setMatchTags] = useState(values.tags);

  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

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
    let obj = { key: '', value: '' };
    if (values?.options?.length === 6) {
      handleSnackbarOpen('Warning', "Options can't be more than six");
      //   console.log('reached to limit');
    } else {
      //   setMcqOptions([...mcqOptions, obj]);
      const array = [...values.options, obj];
      setFieldValue('options', array);
    }
  };

  // const handleDelete = index => {
  //   let data = [];
  //   mcqOptions?.map((el, ind) => {
  //     if (ind !== index) {
  //       data?.push(el);
  //     }
  //   });
  //   if (data?.length < 2) {
  //     handleSnackbarOpen('Warning', "Options can't be less than two");
  //   } else {
  //     setMcqOptions([...data]);
  //   }
  // };

  const change = (name, e) => {
    console.log('name', name);
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
    }
    else if (transaction === TRANSACTIONS.EDIT) {
      values.setToggle(!values.toggle);
      handleCancelEdit();
    }
    else {
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
  }, [transaction])

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
            matchOptions={values?.options || []}
            // options={values?.options || [{}, {}, {}, {}]}
            // answers={getCorrectAnswer() || []}
            correctAnswerFeedback={values.correctAnswerFeedback}
            wrongAnswerFeedback={values.wrongAnswerFeedback}
            partiallyCorrectAnswerFeedback={
              values.partiallyCorrectAnswerFeedback
            }
            generalFeedback={values.generalFeedback}
            question={values.questionText}
            tags={matchTags}
          />
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <KenInputField
                name="questionText"
                label={<span className={classes.labelText}>Question</span>}
                required={true}
                placeholder="Type your question here"
                value={values.questionText}
                onChange={change.bind(null, 'questionText')}
              />
            </Grid>
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
                      placeholder="_ _"
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
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item container xs={12} md={12}>
              <>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item xs={6}>
                    <Typography className={classes.labelText}>
                      Column A
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.labelText}>
                      Column B
                    </Typography>
                  </Grid>
                  {values?.options?.map((optItem, index) => {
                    return (
                      <React.Fragment>
                        <Grid item xs={6}>
                          <KenInputField
                            name={`options[${index}]['key']`}
                            value={values.options[index]['key']}
                            onChange={change.bind(
                              null,
                              `options[${index}]['key']`
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <KenInputField
                            name={`options[${index}]['value']`}
                            value={values.options[index]['value']}
                            onChange={change.bind(
                              null,
                              `options[${index}]['value']`
                            )}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
                {/* <Divider className={classes.divider} /> */}
              </>
            </Grid>

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
                      Add more options
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </Grid>
            <Grid item xs={12} md={8}>
              <KenCheckBox
                label="Shuffle the options randomly"
                value={values.shuffleAnswers}
                name="shuffleAnswers"
                onChange={change.bind(null, 'shuffleAnswers')}
              />
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />

            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Feedback for correct answer
                  </span>
                }
                placeholder="Type you Feedback"
                name="correctAnswerFeedback"
                value={values.correctAnswerFeedback}
                onChange={change.bind(null, 'correctAnswerFeedback')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Feedback for partially correct answer
                  </span>
                }
                placeholder="Type you Feedback"
                name="partiallyCorrectAnswerFeedback"
                value={values.partiallyCorrectAnswerFeedback}
                onChange={change.bind(null, 'partiallyCorrectAnswerFeedback')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>
                    Feedback for incorrect answer
                  </span>
                }
                placeholder="Type you Feedback"
                name="wrongAnswerFeedback"
                value={values.wrongAnswerFeedback}
                onChange={change.bind(null, 'wrongAnswerFeedback')}
              />
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item xs={12}>
              <KenInputField
                label={<span className={classes.labelText}>Hint 1</span>}
                placeholder="Type your 1st hint here"
                name="hint1"
                value={values.hint1}
                onChange={change.bind(null, 'hint1')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label={<span className={classes.labelText}>Hint 2</span>}
                placeholder="Type your 2st hint here"
                name="hint2"
                value={values.hint2}
                onChange={change.bind(null, 'hint2')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label={<span className={classes.labelText}>Hint 3</span>}
                placeholder="Type your 3st hint here"
                name="hint3"
                value={values.hint3}
                onChange={change.bind(null, 'hint3')}
              />
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item xs={12}>
              <KenInputField
                label={
                  <span className={classes.labelText}>General feedback </span>
                }
                multiline={true}
                minRows={3}
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

const MatchFormikHOC = props => {
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
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' },
  ]);
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
              const modifiedOptions = res?.choices?.map(item => {
                return {
                  ...item,
                  key: item.questiontext,
                  value: item.answertext,
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

  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      questionText: currentQuestion?.questiontext,
      questionName: currentQuestion?.name,
      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
      negativePercentage: currentQuestion?.negativePercentage,
      penalty: currentQuestion?.penalty || 0,
      decimalPenalty: currentQuestion?.decimalPenalty || 0,
      // singleAnswer:
      //   !currentQuestion?.multianswer || currentQuestion.singleanswer
      //     ? '1'
      //     : '0',
      generalFeedback: currentQuestion?.generalfeedback,
      action: 'preview',
      showPreview: transaction === TRANSACTIONS?.UPDATE || transaction === TRANSACTIONS?.EDIT,
      // showPreview: transaction === TRANSACTIONS?.UPDATE,
      correctAnswerFeedback: currentQuestion?.matchoptions[0]?.correctfeedback,
      wrongAnswerFeedback: currentQuestion?.matchoptions[0]?.incorrectfeedback,
      partiallyCorrectAnswerFeedback:
        currentQuestion?.matchoptions[0]?.partiallycorrectfeedback,
      options: options,
      numberOfChoices: currentQuestion?.numberofchoices,
      tags: tags || [],
      tagInput: '',
      shuffleAnswers: currentQuestion?.shuffleanswers || false,
      toggle: toggle,
      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({}),

    handleSubmit: values => {
      if (values.action === 'submit') {
        const modifiedChoices = values?.options?.map(item => {
          return {
            subquestions: item.key,
            subanswers: item.value,
          };
        });
        const payload = {
          quizid: Number(quizId),
          page: 1,
          questionname: '',
          questiontext: values?.questionText,
          defaultmark: Number(values?.marks),
          penalty: String(values?.decimalPenalty),
          shuffleanswers: values?.shuffleAnswers === true ? 1 : 0,
          correctfeedback: values?.correctAnswerFeedback,
          incorrectfeedback: values?.wrongAnswerFeedback,
          generalfeedback: values?.generalFeedback,
          tags: values.tags || [],
          choices: modifiedChoices,
          partiallycorrectfeedback: values?.partiallyCorrectAnswerFeedback,
        };

        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.questionId = selectedQuestion.questionid;
          payload.courseId = courseId;
          payload.chapterId = chapterId;
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              console.log('fromquetion bank payload', payload);
              //TODO : add matching question to question bank
              //   addMCQToQuestionBank(payload)
              //     .then(res => {
              //       if (!res.hasOwnProperty('errorcode')) {
              //         // setQuizUpdated(!quizUpdated);
              //         handlePreviewClick(res.questionid, 0);
              //       } else {
              //         console.log('something went wrong');
              //       }
              //     })
              //     .catch(error => {
              //       console.log(
              //         'something went wrong while adding question to the question bank',
              //         error
              //       );
              //     });

              break;
            case TRANSACTIONS.UPDATE:
            case TRANSACTIONS.EDIT:
              //TODO : update matching question to question bank
              //   updateMCQToQuestionBank(payload)
              //     .then(res => {
              //       if (!res.hasOwnProperty('errorcode')) {
              //         // setQuizUpdated(!quizUpdated);
              //         handlePreviewClick(res.questionid, 0);
              //       } else {
              //         console.log('something went wrong');
              //       }
              //     })
              //     .catch(error => {
              //       console.log(
              //         'something went wrong while updating question to the question bank',
              //         error
              //       );
              //     });
              break;
            default:
              console.log('fromquetion bank payload', payload);
          }
        } else {
          if (transaction === TRANSACTIONS.CREATE) {
            console.log('payload', payload);
            addMatchingQuestion(payload)
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
            updateMatchingQuestion(payload).then(res => {
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
    displayName: 'MatchQuestionForm',
  })(MatchQuestionForm);

  return <FormikForm {...props} />;
};
