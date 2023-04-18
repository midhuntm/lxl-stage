import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popper,
  Typography,
  Card,
} from '@material-ui/core';
import AddedQuestion from '../../../../../assets/Images/Added-question.svg';
import { useTranslation } from 'react-i18next';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import KenPopover from '../../../../../components/KenPopover';
import KenInputField from '../../../../../components/KenInputField/index';
import { TRANSACTIONS } from '../../../../../utils/constants';
import {
  deleteQuestionFromQuiz,
  createSectionInQuiz,
  addQuestionsToQuiz,
} from '../../../../../utils/ApiService';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import KenButton from '../../../../../global_components/KenButton';
import KenCheckbox from '../../../../../global_components/KenCheckbox';
import KenDialogBox from '../../../../../components/KenDialogBox';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import QuestionSectionList from '../QuestionSectionId';
import { uniqueArrayObjects } from '../QuestionTypes/Utils';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    padding: 16,
  },
  subHeader: {
    padding: '4px 16px',
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
  },
  questionContents: {
    // textAlign: 'center',
    background: theme.palette.KenColors.neutral11,
    // margin: 16,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 400,
    // borderRadius: 3,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '93px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  label: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    width: '70%',
    margin: '28px auto',
  },
  sectionDialog: {
    height: 'auto',
  },
  deleteDialog: {
    height: 'auto',
  },
  deleteDialogContent: {
    padding: 0,
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  sectionBtn: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
  },
  sectionLabel: {
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 6,
  },
  outlineIcon: {
    width: 18,
  },
  addIcon: {
    border: `1px solid ${theme.palette.KenColors.primary}`,
    borderRadius: '50%',
    color: theme.palette.KenColors.primary,
    fontSize: 14,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputClass: {
    background: theme.palette.KenColors.secondaryBlue,
    border: `0.6px dashed ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: 3,
    fontSize: 12,
    height: 16,
    padding: 12,
    fontWeight: 400,
    color: theme.palette.KenColors.neutral900,
  },
  newSectionText: {
    background: theme.palette.KenColors.secondaryBlue,
    border: `0.6px dashed ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.KenColors.sectionBlue,
    padding: 12,
    height: 40,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionContents: {
    background: theme.palette.KenColors.kenWhite,
    height: 400,

    '&::-webkit-scrollbar': {
      width: '5px',
      height: '93px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  sectionIcons: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    background: theme.palette.KenColors.kenWhite,
    padding: 4,
    marginRight: 5,
    cursor: 'pointer',
  },
  deleteContainer: {
    width: 390,
    height: 'auto',
    // position: 'absolute',
    // boxShadow: ' 0px 1px 18px rgb(16 30 115 / 6%)',
    // borderRadius: 3,
    background: theme.palette.KenColors.kenWhite,
    padding: 10,
    // left: '85%'
  },
  deleteText: {
    fontSize: 12,
    color: '#061938',
    marginBottom: 15,
    fontWeight: 600,
  },
  deleteCard: {
    background: theme.palette.KenColors.kenWhite,
    border: ' 1px solid #E3E3E3',
    borderRadius: 3,
    padding: 10,
    marginBottom: 15,
    paddingTop: 0,
    paddingBottom: 0,
    cursor: 'pointer',
  },
  deleteHeadText: {
    '& span': {
      fontSize: 12,
      color: '#505F79',
    },
  },
  deleteContenttext: {
    fontSize: 12,
    color: '#505F79',
    paddingLeft: 30,
    marginTop: 0,
    width: '95%',
  },
  activeDelCard: {
    background: '#F4F6FF',
    opacity: 0.5,
    border: '0.5px solid #092682',
    borderRadius: 3,
  },
  deleteButton: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  cancelButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  checkBox: {
    width: '17%',
  },
  controlAndStats: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rootSummary: {
    padding: '0px',
    '&$expanded': {
      height: 30,
      padding: '10px 0px 0px 20px',
    },
  },
  summary: {
    // margin: 0,
    // height: 20,
    '&$expanded': {
      margin: 0,
      height: 30,
    },
  },
  controlSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '10%',
    marginRight: 30,

    '& label': {
      margin: 0,
    },
  },
  qListTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  uploadText: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '20px',
    textTransform: 'uppercase',
    color: '#061938',
    textAlign: 'center',
    marginBottom: 30,
  },
  listQuestionItem: {
    '& img': {
      height: 80,
      width: 130
    },
    '& video': {
      height: 100,
      width: 150
    },
  }
}));

const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    // boxShadow: 'none',
    // '&:not(:last-child)': {
    //   borderBottom: 0,
    // },
    padding: '0px',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      // margin: 'auto',
      // height: 30,
      padding: '10px 0px 0px 20px',
      paddingLeft: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // marginBottom: -1,
    // minHeight: 56,

    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 20,
    '&$expanded': {
      // height: 20,
      margin: 0,
      minHeight: 30,
      // padding: '10px 0px 0px 20px'
    },
  },
  content: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    '&$expanded': {
      margin: 0,
      // height: 30,
    },
  },
  expanded: {},
})(MuiAccordionSummary);
export default function QuestionList(props) {
  const {
    totalMarks,
    noOfQuestions,
    marks,
    selectedQuestions,
    getSelectedQuestionsId,
    getSelectedQuestion,
    selectedQuestionId,
    setTransaction,
    quizId,
    originalQuestionSet,
    setQuizUpdated,
    quizUpdated,
  } = props;

  console.log('props from QuestionsList', selectedQuestions);
  const classes = useStyles();
  const { t } = useTranslation();
  const [questions, setQuestions] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddSection, setOpenAddSection] = React.useState(false);
  const [sectionName, setSectionName] = React.useState('');
  const [deleteOption, setDeleteOption] = React.useState('1');
  const [isSectionAdded, setIsSectionAdded] = React.useState(false);
  const [sectionRes, setSectionRes] = React.useState([]);

  let countedMarks = 0;

  //   useEffect(() => {
  //     let arr = [];
  //     selectedQuestions.map((item, idx) => {
  //       setIsSectionAdded(false);
  //       if (item.sectionid) {
  //         let checkDuplicate = arr.some(
  //           dupItem => dupItem.sectionid == item.sectionid
  //         );
  //         setIsSectionAdded(true);
  //         if (!checkDuplicate) {
  //           let obj = {};
  //           obj['section'] = item.section;
  //           obj['sectionid'] = item.sectionid;
  //           obj['page'] = item.page;
  //           obj['questions'] = selectedQuestions
  //             .filter(fItem => item.section == fItem.section)
  //             .map((ele, i) => {
  //               return {
  //                 ...ele,
  //                 mark: ele.mark,
  //                 sectionId: ele.sectionid,
  //                 sectionName: ele.section,
  //                 page: ele.page,
  //                 questionid: ele.id,
  //                 questionname: ele.name,
  //                 questiontype: ele.qtype,
  //                 selected: true,
  //                 text: ele.questiontext,
  //               };
  //             });
  //           arr.push(obj);
  //         }
  //       }
  //       return item;
  //     });
  //     setSectionRes(arr);
  //     // setQuizUpdated(!quizUpdated); //to rerender question list
  //   }, [selectedQuestions]);

  //   UseEffect to add question to quiz as soon as it is added to a list

  const addAllQuestion2Quiz = async () => {
    let allQuestions = uniqueArrayObjects(selectedQuestions, 'questionid');
    allQuestions = allQuestions?.map(item => {
      return { questionid: item?.questionid };
    });

    const payload = { questions: allQuestions, quizId: quizId };

    return addQuestionsToQuiz(payload)
      .then(res => {
        console.log('questions added to quiz successfully');
        return !res.hasOwnProperty('errorcode');
      })
      .catch(error => {
        console.log('error questions to quiz', error);
        return false;
      });
  };

  useEffect(() => {
    console.log('selected questions updated', selectedQuestions);
    if (selectedQuestions?.length > 0) {
      addAllQuestion2Quiz()
        .then(res => {
          console.log('res of add que', res);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
    // setQuizUpdated(!quizUpdated);
  }, [selectedQuestions]);

  /* display the questions type */
  const handleType = type => {
    switch (type) {
      case 'truefalse':
        return 'True / False';
      case 'multichoice':
        return 'Multiple choice';
      case 'shortanswer':
        return 'Short answer';
      case 'essay':
        return 'Subjective';
      case 'match':
        return 'Match';
      case 'gapselect':
        return 'Fill In The Blanks';
      case 'numerical':
        return 'Numerical';
      default:
        return 'New';
    }
  };
  /* select the question */
  const handleClick = (event, value) => {
    console.log('handle click...', value);
    event.preventDefault();
    if (value.questionid) {
      getSelectedQuestionsId(value.questionid);
      getSelectedQuestion(value);
      setTransaction(TRANSACTIONS.UPDATE);
    }
  };

  selectedQuestions?.map(q => {
    countedMarks = countedMarks + Math.floor(q.mark);
    return countedMarks;
  });

  /* Ken Popover and delete the selected question */
  const handleDelete = (event, question) => {
    const questionExistsInQuiz = originalQuestionSet?.find(
      item =>
        item.id === question.questionid ||
        item.questionid === question.questionid
    );
    if (questionExistsInQuiz) {
      const payload = {
        quizId: quizId,
        questionId: question.questionid,
      };
      deleteQuestionFromQuiz(payload)
        .then(res => {
          if (!res.hasOwnProperty('errorcode')) {
            const findIndex = selectedQuestions?.findIndex(
              a => a.questionid === question.questionid
            );
            findIndex !== -1 && selectedQuestions?.splice(findIndex, 1);
            setAnchorEl(anchorEl ? null : event.currentTarget);
            setQuizUpdated(!quizUpdated); //to rerender question list
          } else {
            console.log('something went wrong');
          }
        })
        .catch(error => {
          console.log('something went wrong');
        });
    } else {
      const findIndex = selectedQuestions?.findIndex(
        a => a.questionid === question.questionid
      );
      findIndex !== -1 && selectedQuestions?.splice(findIndex, 1);
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setQuizUpdated(!quizUpdated); //to rerender question list
    }
  };
  const handleDeleteIcon = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const onCloseAddSectionPopup = () => {
    setOpenAddSection(false);
  };
  const addNewSection = () => {
    setOpenAddSection(true);
    setSectionName('');
  };
  const uniqByKeepLast = (data, key) => {
    return [...new Map(data.map(x => [key(x), x])).values()];
  };
  // console.log(JSON.stringify(uniqByKeepLast(p, it => it.section)));

  const addSectionToQuiz = () => {
    // if (event.charCode === 13 && event.target.value.length > 0) {}
    if (sectionName.length > 0) {
      // create_section_in_quiz
      const sections = uniqByKeepLast(selectedQuestions, it => it.sectionid);
      let sectionCount = sections.length == 0 ? 1 : sections.length + 1;
      //   console.log('sectionCount', sectionCount);

      let payload = {
        method: 'post',
        page: sectionCount,
        quizid: quizId,
        section: sectionName,
      };
      createSectionInQuiz(payload)
        .then(res => {
          if (!res.hasOwnProperty('errorcode')) {
            setOpenAddSection(false); //To hide the add section popup
            setSectionName('');
            setIsSectionAdded(true);
            setQuizUpdated(!quizUpdated); //to rerender question list
          } else {
            setIsSectionAdded(false);
            setQuizUpdated(!quizUpdated); //to rerender question list
            console.log('Something went wrong..');
          }
        })
        .catch(err => console.log(err));
      setQuizUpdated(!quizUpdated); //to rerender question list
      setIsSectionAdded(false);
      console.log('Something went wrong..');
    }
  };

  const onCloseSectionPopup = () => {
    setOpenAddSection(false);
  };

  const countedQuestions = selectedQuestions?.length;
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const onDropQuestions = (e, idx, item) => { };
  const onDragOver = e => { };

  const updateSectionData = data => {
    setSectionRes(data);
  };

  return (
    <Box data-testid="add-content">
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.addedQuestionHeader}
      >
        <Box item>
          <Typography className={classes.questionLabel}>
            {' '}
            {t('labels:Added_Question')}{' '}
          </Typography>
        </Box>
        {/* <Box item className={classes.sectionBtn} onClick={addNewSection}>
          <Typography className={classes.addIcon}>
            <AddOutlinedIcon className={classes.outlineIcon} />
          </Typography>
          <Typography className={classes.sectionLabel}>
            {' '}
            {t('labels:Section')}
          </Typography>
        </Box> */}
      </Grid>
      <Grid
        container
        className={classes.subHeader}
        justifyContent="space-evenly"
      >
        <Grid xs={6} item>
          <Chip
            label={
              <span style={{ fontSize: '12px', }} >
                {t('labels:Question')}:&nbsp;
                <span style={{ fontWeight: 700 }}>
                  {' '}
                  {countedQuestions?.toString()?.padStart(2, 0)}{' '}
                </span>
              </span>
            }
            style={{
              backgroundColor: '#E9E3FF',
              color: '#6940EE',
              fontWeight: 400,
              fontSize: '12px',
              width: '100%',
            }}
          />
        </Grid>
        <Grid xs={6} item>
          <Chip
            label={
              <span style={{ margin: 0, fontSize: '12px' }}>
                {t('labels:Total_marks')}:&nbsp;
                <span style={{ fontWeight: 700 }}>
                  {countedMarks.toString().padStart(2, 0)}{' '}
                </span>
              </span>
            }
            style={{
              backgroundColor: countedMarks > 0 ? '#CCE9E4' : '#FFE9E7',
              color: countedMarks > 0 ? '#00B25D' : '#F2564A',
              fontWeight: 400,
              fontSize: '12px',
              width: '100%',
            }}
          />
        </Grid>
      </Grid>

      {/* {selectedQuestions && selectedQuestions?.length !== 0 ? (
        !isSectionAdded ? (
          <Box
            className={classes.questionContents}
            container
            alignItems="center"
            justify="center"
          >
            <Accordion defaultExpanded>
              <AccordionDetails>
                <Grid container>
                  <Grid
                    xs={12}
                    item
                    onDrop={event => {
                      onDropQuestions(event, index, q);
                    }}
                    onDragOver={event => {
                      onDragOver(event);
                    }}
                    style={{ curson: 'pointer' }}
                  >
                    {selectedQuestions?.map((q, index) => {
                      return (
                        <>
                          <Paper
                            style={{
                              padding: '10px',
                              backgroundColor:
                                selectedQuestionId &&
                                selectedQuestionId === q?.questionid
                                  ? '#F4F6FF'
                                  : '',
                            }}
                            onClick={e => {
                              handleClick(e, q);
                            }}
                            justifyContent="space-between"
                            variant="outlined"
                            square
                            draggable={true}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <Typography
                                style={{
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {index + 1}.
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: q?.questiontext,
                                  }}
                                />
                              </Typography>
                              {selectedQuestionId &&
                              selectedQuestionId === q.questionid ? (
                                <span
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                  }}
                                >
                                  <RiDeleteBinLine
                                    className={classes.sectionIcons}
                                    onClick={handleDeleteIcon}
                                    style={{
                                      color: '#EF4060',
                                      height: 26,
                                      background: 'transparent',
                                    }}
                                  />
                                  <KenPopover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    handleClose={() => {
                                      setAnchorEl(null);
                                    }}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    onclose={() => {
                                      setAnchorEl(null);
                                    }}
                                  >
                                    <Paper
                                      style={{ padding: 20 }}
                                      justifyContent="space-between"
                                    >
                                      <Typography
                                        style={{
                                          marginBottom: 15,
                                          fontSize: 14,
                                        }}
                                      >
                                        Do you want to remove the question?
                                      </Typography>

                                      <Box
                                        style={{
                                          width: '85%',
                                          margin: '0 auto',
                                          display: 'flex',
                                          justifyContent: 'space-around',
                                        }}
                                      >
                                        <Button
                                          onClick={() => {
                                            setAnchorEl(null);
                                          }}
                                          variant="outlined"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={e => {
                                            handleDelete(e, q);
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </Box>
                                    </Paper>
                                  </KenPopover>
                                </span>
                              ) : (
                                ''
                              )}
                            </Box>
                            <Box
                              style={{
                                marginRight: '4px',
                                marginLeft: '16px',
                                marginTop: '6px',
                              }}
                            >
                              <Chip
                                label={handleType(q.questiontype)}
                                style={{
                                  backgroundColor: '#F4F6FF',
                                  color: '#00218D',
                                  fontWeight: 400,
                                  fontSize: '12px',
                                  lineHeight: '12px',
                                  padding: 3,
                                }}
                                variant="outlined"
                              />
                              <Typography
                                color="primary"
                                display="inline"
                                style={{
                                  fontWeight: 600,
                                  fontSize: '12px',
                                  lineHeight: '18px',
                                  marginLeft: '4px',
                                }}
                              >
                                &nbsp;&nbsp; {q.marks}&nbsp;Marks{' '}
                              </Typography>
                            </Box>
                          </Paper>
                        </>
                      );
                    })}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        ) : (
          <QuestionSectionList
            sectionRes={sectionRes}
            onDropQuestions={onDropQuestions}
            onDragOver={onDragOver}
            handleClick={handleClick}
            selectedQuestionId={selectedQuestionId}
            getSelectedQuestionsId={getSelectedQuestionsId}
            handleType={handleType}
            selectedQuestions={selectedQuestions}
            onCloseSectionPopup={onCloseSectionPopup}
            handleDelete={handleDelete}
            handleDeleteIcon={handleDeleteIcon}
            setQuizUpdated={setQuizUpdated}
            updateSectionData={updateSectionData}
            {...props}
          />
        )
      ) : ( */}
      {selectedQuestions && selectedQuestions?.length !== 0 ? (
        <Box
          className={classes.questionContents}
          container
          alignItems="center"
          justify="center"
        >
          <Accordion defaultExpanded>
            <AccordionDetails>
              <Grid container>
                <Grid
                  xs={12}
                  item
                  onDrop={event => {
                    onDropQuestions(event, index, q);
                  }}
                  onDragOver={event => {
                    onDragOver(event);
                  }}
                  style={{ curson: 'pointer' }}
                >
                  {selectedQuestions?.map((q, index) => {
                    return (
                      <>
                        <Paper
                          style={{
                            padding: '10px',
                            backgroundColor:
                              selectedQuestionId &&
                                selectedQuestionId === q?.questionid
                                ? '#F4F6FF'
                                : '',
                          }}
                          onClick={e => {
                            handleClick(e, q);
                          }}
                          justifyContent="space-between"
                          variant="outlined"
                          square
                          draggable={true}
                        >
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              style={{
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '21px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              className={classes.listQuestionItem}
                            >
                              {index + 1}.
                              {/* <span
                                dangerouslySetInnerHTML={{
                                  __html: q?.questiontext,
                                }}
                              /> */}
                              {parse(`${q?.questiontext || ''}`) || ''}
                            </Typography>
                            {selectedQuestionId &&
                              selectedQuestionId === q.questionid ? (
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                }}
                              >
                                <RiDeleteBinLine
                                  className={classes.sectionIcons}
                                  onClick={handleDeleteIcon}
                                  style={{
                                    color: '#EF4060',
                                    height: 26,
                                    background: 'transparent',
                                  }}
                                />
                                <KenPopover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  handleClose={() => {
                                    setAnchorEl(null);
                                  }}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  onclose={() => {
                                    setAnchorEl(null);
                                  }}
                                >
                                  <Paper
                                    style={{ padding: 20 }}
                                    justifyContent="space-between"
                                  >
                                    <Typography
                                      style={{
                                        marginBottom: 15,
                                        fontSize: 14,
                                      }}
                                    >
                                      Do you want to remove the question?
                                    </Typography>

                                    <Box
                                      style={{
                                        width: '85%',
                                        margin: '0 auto',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          setAnchorEl(null);
                                        }}
                                        variant="outlined"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={e => {
                                          handleDelete(e, q);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Paper>
                                </KenPopover>
                              </span>
                            ) : (
                              ''
                            )}
                          </Box>
                          <Box
                            style={{
                              marginRight: '4px',
                              marginLeft: '16px',
                              marginTop: '6px',
                            }}
                          >
                            <Chip
                              label={handleType(q.questiontype)}
                              style={{
                                backgroundColor: '#F4F6FF',
                                color: '#00218D',
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '12px',
                                padding: 3,
                              }}
                              variant="outlined"
                            />
                            <Typography
                              color="primary"
                              display="inline"
                              style={{
                                fontWeight: 600,
                                fontSize: '12px',
                                lineHeight: '18px',
                                marginLeft: '4px',
                              }}
                            >
                              &nbsp;&nbsp; {q.marks ? parseFloat(q.marks).toFixed(2) : parseFloat(q.mark).toFixed(2)}&nbsp;Marks{' '}
                            </Typography>
                          </Box>
                        </Paper>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Box p={4} justifyContent="center" alignItems="center" justify="center">
          <Grid
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
            }}
          >
            <img src={AddedQuestion} />
          </Grid>
          <Typography className={classes.label}>
            {' '}
            {t(
              'messages:Questions_added_to_this_assessment_will_be_listed_down_here.'
            )}
          </Typography>
        </Box>
      )}

      <div data-testid="questionbank-modal">
        <KenDialogBox
          open={openAddSection}
          handleClose={onCloseSectionPopup}
          dialogActionFlag={false}
          maxWidth="xs"
          styleOverrides={{ dialogPaper: classes.sectionDialog }}
        >
          <React.Fragment>
            <p className={classes.uploadText}>Create Section in Quiz</p>
            <Grid
              sm={12}
              md={12}
              style={{ padding: '0px 8px', marginBottom: 10 }}
            >
              <KenInputField
                placeholder="Type section name"
                inputBaseClass={classes.inputClass}
                value={sectionName}
                name={`sectionName`}
                autofocus={true}
                optionalLabel={false}
                // onKeyPress={handleKeyPress}
                onChange={newValue => {
                  setSectionName(newValue.target.value);
                }}
              />
            </Grid>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'end',
                margin: '20px 0px',
              }}
            >
              <KenButton
                variant="secondary"
                onClick={() => {
                  setOpenAddSection(false);
                }}
                buttonClass={classes.cancelButton}
              >
                {t('labels:Cancel')}
              </KenButton>
              <KenButton
                variant="primary"
                color="primary"
                onClick={addSectionToQuiz}
                buttonClass={classes.deleteButton}
              >
                Add Section
              </KenButton>
            </Grid>
          </React.Fragment>
        </KenDialogBox>
      </div>

      {/* <Box className={classes.questionContents} container alignItems="center" justify="center">
        <Grid container>
          <Grid xs={12} item>
            {selectedQuestions && selectedQuestions?.length !== 0 ? (
              selectedQuestions?.map((q, index) => {
                return (
                  <>
                    <Paper
                      style={{ padding: '10px', backgroundColor: selectedQuestionId && selectedQuestionId === q?.questionid ? '#F4F6FF' : '', }}
                      onClick={e => { handleClick(e, q); }}
                      justifyContent="space-between"
                      variant="outlined"
                      square>

                      <Box display="flex" justifyContent="space-between">
                        <Typography style={{ fontWeight: 400, fontSize: '14px', lineHeight: '21px', }}>
                          {index + 1}.{q?.questiontext}
                        </Typography>
                        {selectedQuestionId &&
                          selectedQuestionId === q.questionid ? (
                          <span style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <RiDeleteBinLine className={classes.sectionIcons} onClick={handleDeleteIcon} style={{ color: '#EF4060', height: 26, background: 'transparent' }} />
                            <KenPopover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              handleClose={() => { setAnchorEl(null); }}
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                              transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                              onclose={() => { setAnchorEl(null); }}>

                              <Paper style={{ padding: '20px' }} justifyContent="space-between" >
                                <Typography> Do you want to remove the question? </Typography>
                                <Box style={{ marginLeft: 'auto', marginRight: 'auto', width: '70%', display: "flex", justifyContent: "space-between" }}>
                                  <Button onClick={() => { setAnchorEl(null); }} variant="outlined">Cancel</Button>
                                  <Button variant="contained" color="primary" onClick={e => { handleDelete(e, q); }}>Remove</Button>
                                </Box>
                              </Paper>
                            </KenPopover>
                          </span>
                        ) : (
                          ''
                        )}
                      </Box>
                      <Box style={{ marginRight: '4px', marginLeft: '16px', marginTop: '6px', }} >
                        <Chip
                          label={handleType(q.questiontype)}
                          style={{ backgroundColor: '#F4F6FF', color: '#00218D', fontWeight: 400, fontSize: '12px', lineHeight: '12px', padding: 3, }}
                          variant="outlined"
                        />
                        <Typography
                          color="primary" display="inline"
                          style={{ fontWeight: 600, fontSize: '12px', lineHeight: '18px', marginLeft: '4px', }}>
                          &nbsp;&nbsp; {q.marks}&nbsp;Marks{' '}
                        </Typography>
                      </Box>
                    </Paper>
                  </>
                );
              })
            ) :
              (
                <Box p={4} justifyContent="center" alignItems="center" justify="center">
                  <Grid style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%', }}>
                    <img src={AddedQuestion} />
                  </Grid>
                  <Typography className={classes.label}> {t('messages:Questions_added_to_this_assessment_will_be_listed_down_here.')}</Typography>
                </Box>
              )}
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}
