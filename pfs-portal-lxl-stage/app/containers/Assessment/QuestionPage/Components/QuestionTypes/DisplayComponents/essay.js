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
import ContentHeader from './contentHeader';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import QuestionPreview from '../../QuestionPreview';
import { TRANSACTIONS } from '../../../../../../utils/constants';
import ContentFooter from './contentFooter';
import {
  addEssayQuestionBank,
  getQuestionDetail,
  updateEssayQuestionBank,
} from '../../../../../../utils/ApiService';
import PurpleKenChip from './PurpleKenChip';
const useStyles = makeStyles(theme => ({
  divider: {
    color: theme.palette.KenColors.assessmentBorder,
    margin: '0px 16px',
  },
  labelText: {
    color: theme.palette.KenColors.kenBlack,
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
}));

export default function Essay(props) {
  return <EssayFormikHOC {...props} />;
}

const EssayQuestionForm = props => {
  const classes = useStyles();
  const { handleSnackbarOpen } = useContext(context);
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
  const [essayTags, setEssayTags] = useState(values.tags);
  const change = (name, e) => {
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
    setEssayTags(tags);
  };
  const deleteTag = index => {
    let tags = [...values.tags];
    tags.splice(index, 1);
    // setFieldValue('tags', tags);
    setEssayTags(tags);
  };

  useEffect(() => {
    setFieldValue('tags', essayTags);
  }, [essayTags]);

  const attachmentRequiredArray = [
    {
      label: 'Yes',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    },
  ];
  const allowAttachmentsArray = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
  ];

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
            generalFeedback={values.generalFeedback}
            question={values.questionText}
            tags={essayTags}
            marks={values.marks}
          // options={values?.options || [{}, {}, {}, {}]}
          // answers={getCorrectAnswer() || []}
          // correctAnswerFeedback={values.correctAnswerFeedback}
          // wrongAnswerFeedback={values.wrongAnswerFeedback}
          // partiallyCorrectAnswerFeedback={
          //   values.partiallyCorrectAnswerFeedback
          // }
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
                value={values.questionText}
                onChange={change.bind(null, 'question')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KenInputField
                name="questionName"
                label={<span className={classes.labelText}>Question Name</span>}
                required={true}
                value={values.questionName}
                onChange={change.bind(null, 'questionName')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12}>
              <KenSelect
                name="allowAttachments"
                required={true}
                label={
                  <span className={classes.labelText}>
                    Maximum number of attachments allowed
                  </span>
                }
                options={allowAttachmentsArray}
                value={values.allowAttachments}
                onChange={e => {
                  // change.bind(null, 'allowAttachments')(e.target.value);
                  setFieldValue('allowAttachments', e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <KenRadioGroup
                name="attachmentRequired"
                required={true}
                label={
                  <span className={classes.labelText}>
                    Are attachments allowed as part of student response
                  </span>
                }
                options={attachmentRequiredArray}
                onChange={(val, e) =>
                  change.bind(null, 'attachmentRequired')(e)
                }
              />
            </Grid>
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
        <ContentFooter
          handleEdit={handleEdit}
          edit={values.showPreview}
          submit={!values.showPreview}
          handleSubmit={handleAddQuestion}
          handleCancel={handleCancel}
        />
      </Box>
    </>
  );
};

const EssayFormikHOC = props => {
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
    { option: '', feedback: '', correctAnswer: 0 },
    { option: '', feedback: '', correctAnswer: 0 },
    { option: '', feedback: '', correctAnswer: 0 },
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

  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      questionText: currentQuestion?.questiontext,
      questionName: currentQuestion?.name,
      marks:
        currentQuestion?.mark?.toFixed(2) ||
        Number(currentQuestion?.defaultmark || 0)?.toFixed(2) ||
        0,
      generalFeedback: currentQuestion?.generalfeedback,
      allowAttachments: currentQuestion?.allowAttachments,
      attachmentRequired: currentQuestion?.attachmentRequired,
      action: 'preview',
      // showPreview: transaction === TRANSACTIONS?.UPDATE,
      showPreview: transaction === TRANSACTIONS?.UPDATE || transaction === TRANSACTIONS?.EDIT,
      toggle: toggle,
      tags: tags || [],
      tagInput: '',
      toggle: toggle,
      setToggle: setToggle,
    }),

    validationSchema: Yup.object().shape({}),

    handleSubmit: values => {
      if (values.action === 'submit') {
        const payload = {
          quizId: quizId,
          page: 0,
          questionName: values.questionName,
          questionText: values.questionText,
          generalFeedback: values.generalFeedback,
          allowAttachments: values.allowAttachments,
          attachmentRequired: values.attachmentRequired,
          defaultMarks: values.marks,
          tags: values.tags,
        };
        console.log('fromQuestionBank', fromQuestionBank);

        if (fromQuestionBank === true) {
          /* Question Bank  */

          payload.courseId = courseId;
          payload.chapterId = chapterId;
          console.log('paylod', values);
          switch (transaction) {
            case TRANSACTIONS.CREATE:
              console.log('fromquetion bank payload', payload);
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
              payload.questionId = selectedQuestion.questionid;
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
        }
      } else {
        console.log('previewing values', values);
      }
    },
    displayName: 'EassyQuestionForm',
  })(EssayQuestionForm);

  return <FormikForm {...props} />;
};
