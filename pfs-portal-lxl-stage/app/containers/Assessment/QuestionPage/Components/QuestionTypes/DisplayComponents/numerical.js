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
  addNumericalQuestion,
  addMCQToQuestionBank,
  updateNumericalQuestion,
  updateMCQToQuestionBank,
  getQuestionDetail,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
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

export default function Numerical(props) {
  return <NumericalQuestionFormikHOC {...props} />;
}

const NumericalQuestionForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
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
    transaction,
    selectedQuestion,
    // handlePreview,
    setNewlyCreatedQuestion,
    label,
    icon,
    handleCancelEdit
  } = props;

  const [matchOptions, setMatchOptions] = useState(values.options);
  const [matchTags, setMatchTags] = useState(values.tags);

  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [allowAttachmentsOpt, setAllowAttachmentsOpt] = React.useState([
    'Yes',
    'No',
  ]);
  const [maxAttachmentsOpt, setMaxAttachmentsOpt] = React.useState([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]);
  const [unitHandlingOpt, setUnitHandlingOpt] = React.useState([
    {
      label: 'No Units, only numerical value is graded',
      value: '0',
    },
    {
      label:
        'Units are optional, but if entered, it will be used to convert the response to unit 1 before grading.',
      value: '1',
    },
    {
      label: 'Unit is required and will be graded.',
      value: '2',
    },
  ]);
  const [gradePenaltyOpt, setGradePenaltyOpt] = React.useState([
    {
      label: 'As a fraction of response grade',
      value: '0',
    },
    {
      label: 'As a fraction of question grade',
      value: '1',
    },
  ]);
  const [unitInputOpt, setUnitInputOpt] = React.useState([
    {
      label: 'Text element',
      value: '0',
    },
    {
      label: 'Multiple choice',
      value: '1',
    },
    {
      label: 'Drop down',
      value: '2',
    },
  ]);
  const [rightLeftSideOpt, setRightLeftSideOpt] = React.useState([
    {
      label: 'Right side of answer (eg: 1.00 cm)',
      value: '0',
    },
    {
      label: 'Left side of answer (eg: Rs1.00)',
      value: '1',
    },
  ]);
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
  }, [transaction])

  //   console.log('selectedQuestion', selectedQuestion);
  const handleAddQuestion = () => {
    setFieldValue('action', 'submit');
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
            question={values.questionText}
            tags={matchTags}
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
              />
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
              />
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
                    className={classes.labelText}
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
            <Divider xs={12} md={3} className={classes.divider} />

            {values?.answerOptions.length > 0 &&
              values?.answerOptions.map((optItem, i) => {
                return (
                  <>
                    <Grid item xs={12} md={3}>
                      <KenInputField
                        placeholder="Enter Answer"
                        label={
                          <span className={classes.labelText}>{`Answer ${optItem.id
                            }`}</span>
                        }
                        name={`answerOptions[${i}]['answer']`}
                        type="number"
                        value={values.answerOptions[i]['answer']}
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['answer']`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <KenInputField
                        name={`answerOptions[${i}]['error']`}
                        placeholder="Enter Answer"
                        type="number"
                        label={<span className={classes.labelText}>Error</span>}
                        value={values.answerOptions[i]['error']}
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['error']`
                        )}
                      />
                    </Grid>
                    <Grid sm={3} md={2} className={classes.percentageField}>
                      <KenInputField
                        name={`answerOptions[${i}]['tolerance']`}
                        placeholder="--"
                        type="number"
                        style={{ marginTop: 4 }}
                        label={<span className={classes.labelText}>Grade</span>}
                        value={values.answerOptions[i]['tolerance']}
                        onChange={change.bind(
                          null,
                          `answerOptions[${i}]['tolerance']`
                        )}
                      />
                      <span
                        className={classes.spanPercentage}
                        style={{ top: '27px', right: '1px' }}
                      >
                        %
                      </span>
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
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item xs={12}>
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
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item xs={12} md={3}>
              <KenInputField
                label={<span className={classes.labelText}>Penalty</span>}
                placeholder=""
                name="gradePenalty"
                value={values.gradePenalty}
                onChange={change.bind(null, 'gradePenalty')}
              />
            </Grid>
            <Grid item xs={12}>
              <KenRadioGroup
                item
                md={12}
                label={''}
                row={false}
                options={gradePenaltyOpt}
                name="fractionGrade"
                value={values.fractionGrade}
                defaultValue={() => {
                  setFieldValue('fractionGrade', gradePenaltyOpt[0].value);
                }}
                onChange={(val, e) => change.bind(null, 'fractionGrade')(e)}
              />
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid item xs={12}>
              <KenRadioGroup
                label={
                  <span className={classes.labelText}>
                    Units are input using
                  </span>
                }
                options={unitInputOpt}
                name="unitInput"
                value={values.unitInput}
                defaultValue={() => {
                  setFieldValue('unitInput', unitInputOpt[0].value);
                }}
                onChange={(val, e) => change.bind(null, 'unitInput')(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <KenRadioGroup
                label={<span className={classes.labelText}>Units are</span>}
                options={rightLeftSideOpt}
                name="unitLeftRightSide"
                value={values.unitLeftRightSide}
                defaultValue={() => {
                  setFieldValue('unitLeftRightSide', rightLeftSideOpt[0].value);
                }}
                onChange={(val, e) => change.bind(null, 'unitLeftRightSide')(e)}
              />
            </Grid>

            <Grid md={12} container spacing={2}>
              <Grid sm={3} md={4} item className={classes.percentageField}>
                <KenInputField
                  placeholder="Enter Answer"
                  label="Unit(s)"
                  inputBaseRootClass={classes.inputClass}
                  value={values.units}
                  setFieldTouched={setFieldTouched}
                  name="units"
                  onChange={change.bind(null, 'units')}
                />
                <span style={{ position: 'absolute', left: '45px' }}>
                  <InfoOutlinedIcon
                    style={{ fontSize: 14, paddingLeft: '5px' }}
                  />
                </span>
              </Grid>
              <Grid item xs={12} md={4}>
                <KenInputField
                  name="multiplier"
                  label="Multiplier"
                  placeholder="0"
                  // required={true}
                  value={values.multiplier}
                  onChange={change.bind(null, 'multiplier')}
                />
              </Grid>
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
            <Grid container spacing={1} alignItems="flex-end">
              {values?.hints.length > 0 &&
                values?.hints?.map((hintItem, index) => {
                  return (
                    <React.Fragment>
                      <Grid item xs={12} md={12}>
                        <KenInputField
                          placeholder="Type your hint here"
                          label={`Hint ${hintItem.id}`}
                          name={`hints[${index}]['value']`}
                          value={values.hints[index]['value']}
                          onChange={change.bind(
                            null,
                            `hints[${index}]['value']`
                          )}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })}
            </Grid>
            <Grid item xs={12}>
              <>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  onClick={handleAddMoreHints}
                >
                  <Grid item>
                    <AddCircleOutlineRoundedIcon className={classes.addIcon} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.typoAnother}>
                      Add more hints
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </Grid>
            <Divider xs={12} md={3} className={classes.divider} />
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

const NumericalQuestionFormikHOC = props => {
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
    { id: 1, answer: '', tolerance: '', error: '', feedback: '' },
  ]);

  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    if (selectedQuestion) {
      if (selectedQuestion?.questionid) {
        getQuestionDetail(selectedQuestion?.questionid)
          .then(res => {
            if (!res.hasOwnProperty('errorcode')) {
              setCurrentQuestion(res);
              //   const modifiedOptions = res?.options?.map(item => {
              //     return {
              //       ...item,
              //       option: item.label,
              //       feedback: item.feedback,
              //       correctAnswer: item?.rightanswer === true ? true : false,
              //     };
              //   });
              //   setOptions(modifiedOptions);

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
      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
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
      showPreview: transaction === TRANSACTIONS?.UPDATE || transaction === TRANSACTIONS?.EDIT,
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

    validationSchema: Yup.object().shape({}),

    handleSubmit: values => {
      const modifiedChoices = values?.answerOptions?.map(item => {
        return {
          answer: Number(item.answer),
          tolerance: Number(item.tolerance),
          error: Number(item.error),
          feedback: String(item.feedback),
        };
      });
      if (values.action === 'submit') {
        const payload = {
          quizid: Number(quizId),
          page: 1,
          questionname: '',
          questiontext: values?.questionText,
          defaultmark: Number(values?.marks),
          penalty: String(values?.decimalPenalty),
          generalfeedback: values?.generalFeedback,
          tags: values?.tags || [],
          choices: modifiedChoices,
        };
        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.questionId = selectedQuestion.questionid;
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
              console.log('fromquetion bank payload', payload);
          }
        } else {
          if (transaction === TRANSACTIONS.CREATE) {
            console.log('payload', payload);
            addNumericalQuestion(payload)
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
            updateNumericalQuestion(payload).then(res => {
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
    displayName: 'NumericalQuestionForm',
  })(NumericalQuestionForm);

  return <FormikForm {...props} />;
};
