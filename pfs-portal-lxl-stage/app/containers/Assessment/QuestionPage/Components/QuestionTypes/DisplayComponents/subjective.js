import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../../../components/KenInputField';
import KenSelect from '../../../../../../components/KenSelect';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup/index';
import KenMultiSelect from '../../../../../../global_components/KenMultiSelect';
import KenTextArea from '../../../../../../global_components/KenTextArea';
import KenEditor from '../../../../../../global_components/KenEditor';
import ContentHeader from './contentHeader';
import QuestionPreview from '../../QuestionPreview';
import ContentFooter from './contentFooter';
import {
  addEssayQuestion,
  addEssayQuestionBank,
  getQuestionDetail,
  updateEssayQuestion,
  updateEssayQuestionBank,
  // mediaFileUpload,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import parse from 'html-react-parser';
import KenLoader from '../../../../../../components/KenLoader';
const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
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

export default function SubjectiveQuestion(props) {
  return <SubjectiveQuestionFormikHOC {...props} />;
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

const SubjectiveQuestionForm = props => {
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
    handleCancelEdit,
    label,
    icon,
    courseId,
  } = props;

  const [matchOptions, setMatchOptions] = useState(values.options);
  const [matchTags, setMatchTags] = useState(values.tags);
  const [loading, setLoading] = React.useState(false);

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
  const handleAttemptsAllowed = (val, e) => {
    setFieldValue('attachmentsAllowed', val);
  };
  const handelFeedBack = e => {
    setFieldValue('generalFeedback', e.target.value);
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
            generalFeedback={values.generalFeedback}
            question={parse(`${values.questionText || ''}`) || ''}
            tags={matchTags}
            hideAnswerText={true}
            qtype="essay"
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
            <Grid item xs={12}>
              {/* <KenRadioGroup
                required={true}
                label=""
                options={allowAttachmentsOpt}
                name="attachmentsAllowed"
                value={values.attachmentsAllowed}
                onChange={(newValue, val) => { console.log("newValue", newValue, val); setFieldValue('attachmentsAllowed', newValue); }}
                defaultValue={() => {
                  setFieldValue('attachmentsAllowed', allowAttachmentsOpt[0].value)
                  return allowAttachmentsOpt[0].value
                }}
              /> */}

              <KenRadioGroup
                required={true}
                label={
                  <span className={classes.labelText}>
                    Are attachments allowed as part of student response
                  </span>
                }
                defaultValue={() => {
                  setFieldValue('attachmentsAllowed', allowAttachmentsOpt[0]);
                  return allowAttachmentsOpt[0];
                }}
                options={allowAttachmentsOpt}
                name="attachmentsAllowed"
                value={values.attachmentsAllowed}
                onChange={handleAttemptsAllowed}
              />
            </Grid>
            {values.attachmentsAllowed == 'Yes' && (
              <Grid item xs={12}>
                <KenSelect
                  name="maxAttachments"
                  required={true}
                  value={values.maxAttachments}
                  onChange={e => {
                    setFieldValue('maxAttachments', e.target.value);
                  }}
                  defaultValue={() => {
                    setFieldValue(
                      'maxAttachments',
                      maxAttachmentsOpt[0]?.value
                    );
                    return maxAttachmentsOpt[0]?.value;
                  }}
                  label="Maximum number of attachments allowed"
                  options={maxAttachmentsOpt}
                  errors={errors?.maxAttachments}
                  touched={touched?.maxAttachments}
                />
              </Grid>
            )}
            {/* <Grid item xs={12}>
              <KenInputField
                required={true}
                label="Maximum file size per attachment"
              />
            </Grid> */}
            <Grid item xs={12}>
              <KenMultiSelect
                selectAll={true}
                checkMarks={true}
                required={true}
                label="File formats supported"
                // options={['PDF', 'PNG', 'JPG', 'XLS', 'DOC']}
                options={['PDF']}
                value={[]}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <KenInputField label="Maximum character limit for text response" />
            </Grid> */}
            {/* <Grid item xs={12}>
              <KenTextArea
                label="Response template"
                minRows={3}
                placeholder="Anything you type here will reflect in the answer template of the student/candidate."
              />
            </Grid>
            <Grid item xs={12}>
              <KenInputField
                label="Information for graders"
                placeholder="Type something"
              />
            </Grid> */}
            <Grid item xs={12}>
              <KenTextArea
                label="General feedback"
                multiline={true}
                // required={true}
                minRows={3}
                placeholder="A fully worked answer or link for more information."
                name="generalFeedback"
                value={values.generalFeedback}
                onChange={handelFeedBack}
                errors={errors?.generalFeedback}
                touched={touched?.generalFeedback}
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
          // position="Bottom-Right"
          position="Top-Right"
        />
      </Box>
    </>
  );
};

const SubjectiveQuestionFormikHOC = props => {
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

      questionPurpose: currentQuestion?.metadata?.find(item=>item.field==="questionpurpose")?.data,
      difficultyLevel: currentQuestion?.metadata?.find(item=>item.field==="questiondifficultylevel")?.data,

      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
      negativePercentage: currentQuestion?.negativePercentage,
      penalty: currentQuestion?.penalty || 0,
      decimalPenalty: currentQuestion?.decimalPenalty || 0,
      attachmentsAllowed:
        currentQuestion?.essayoptions[0]?.attachmentsrequired || false,
      maxAttachments: currentQuestion?.essayoptions[0]?.attachments || '',
      maxFileSize: '',
      supportedFileTypes: '.pdf',
      answerCharLimit: '',
      responseTemplate: '',
      gradeInfo: '',
      generalFeedback: currentQuestion?.generalfeedback,
      tags: tags || [],
      tagInput: '',
      action: 'preview',
      showPreview:
        transaction === TRANSACTIONS?.UPDATE ||
        transaction === TRANSACTIONS?.EDIT,
      toggle: toggle,

      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({
      questionText: Yup.string().required('Question is a required '),
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

      maxAttachments: Yup.string().when('attachmentsAllowed', {
        is: 'Yes',
        then: Yup.string().required(
          // t('Validations:Required')
          'Maximum number of attachments is a required field'
        ),
      }),
      //   generalFeedback: Yup.string().required('General feedback is a required'),
    }),

    handleSubmit: values => {
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
          allowattachments: values?.maxAttachments,
          attachmentrequired: values?.attachmentsAllowed == 'No' ? 0 : 1,
          generalfeedback: values?.generalFeedback || '',
          tags: values?.tags || [],
          metadata: metadata,
        };
        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.questionId = selectedQuestion?.questionid;
          payload.courseId = courseId;
          payload.chapterId = chapterId;
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              addEssayQuestionBank(payload)
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
              updateEssayQuestionBank(payload)
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
            addEssayQuestion(payload)
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
            updateEssayQuestion(payload).then(res => {
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
    displayName: 'SubjectiveQuestionForm',
  })(SubjectiveQuestionForm);

  return <FormikForm {...props} />;
};
