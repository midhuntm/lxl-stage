import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Box,
  makeStyles,
  Divider,
  Typography,
  Popover,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import QuizItems from './QuizItems';
import { useTranslation } from 'react-i18next';
import Pagination from './Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 16,
    // maxHeight: '90vh',
    // overflow: 'auto',
  },
  questionContainer: {
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    borderRadius: 3,
  },
  questionBox: {
    maxHeight: '90vh',
    overflow: 'auto',
  },
  divider: {
    margin: 16,
  },
  questionType: {
    width: '100%',
    // maxHeight: '90vh',
    // overflow: 'auto',
    '& > p': {
      fontWeight: 600,
      fontSize: 14,
      padding: 16,
      color: theme.palette.KenColors.neutral900,
    },
  },
  questionText: {
    padding: 16,
  },
  sectionLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.KenColors.neutral900,
  },
  sectionTabs: {
    width: 'inherit',
    marginBottom: 10,
    marginTop: 10,
    '& .MuiTabs-scroller': {
      height: 37,
    },
    '& .MuiTab-textColorInherit': {
      opacity: 1,
    },
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
    },
  },
  sectionBtn: {
    minWidth: 34,
    minHeight: 37,
    background: theme.palette.KenColors.gradeSectionSubjectBg,
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    border: `1px solid ${theme.palette.KenColors.sideNavColor}`,
    fontWeight: 600,
    fontSize: 14,
    '&.Mui-disabled': {
      color: theme.palette.KenColors.tertiaryGray50,
      pointerEvents: 'auto',
    },
  },
  warningPopover: {
    pointerEvents: 'none',
    '& .MuiPopover-paper': {
      border: `0.6px solid ${theme.palette.KenColors.flagIconBorderColor}`,
      borderRadius: 3,
    },
  },
  popoverText: {
    fontSize: 12,
    color: theme.palette.KenColors.gradeTermLabel,
    padding: '12px 12px',
  },
}));

export default function QuizContent({
  quizData,
  setQuizData,
  selectedQuestion,
  currentQuestionDetails,
  setCurrentQuestionDetails,
  totalQuestions,
  handleSubmit,
  nextClickSubmit,
  setNextClickSubmit,
  setAnswered,
  answered,
  multianswer,
  setMultianswer,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [selectedSection, setSelectedSection] = useState(quizData[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [itemId, setItemId] = useState();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (currentQuestionDetails?.section) {
      setSelectedSection(currentQuestionDetails?.section);
      const indexOfSection = quizData.findIndex(
        item => item.id === currentQuestionDetails?.section?.id
      );
      setTabValue(indexOfSection);
    } else {
      setSelectedSection(quizData[0]);
    }
  }, [currentQuestionDetails]);

  useEffect(() => {
    setCurrentQuestion(selectedQuestion);
    setPage(selectedQuestion?.serialNumber - 1);
  }, [selectedQuestion]);

  useEffect(() => {
    setPage(selectedSection?.quizItem[0]?.serialNumber - 1);
  }, [tabValue]);

  useEffect(() => {
    if (selectedSection) {
      const data = getSectionData(selectedSection?.id);
      const quizQuestions = data?.quizItem;
      const currentQue = quizQuestions.find(
        que => que.serialNumber === page + 1
      );
      if (currentQue) {
        setCurrentQuestion(currentQue);
        setCurrentQuestionDetails({
          question: currentQue,
          section: selectedSection,
        });
      }
    }
  }, [page, selectedSection]);

  useEffect(() => {
    const allData = [...quizData];
    const sectionIndex = allData.findIndex(
      item => item.id === selectedSection.id
    );
    allData[sectionIndex] = selectedSection;
    setQuizData(allData);
  }, [selectedSection]);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const changeSection = section => {
    const selectedSectionQuiz = quizData.find(item => item.id === section.id);
    setSelectedSection(selectedSectionQuiz);
  };
  const getSectionNumber = index => {
    if (index === selectedSection?.id) {
      return (
        String.fromCharCode(index + 65) + '.' + ' ' + selectedSection?.name
      );
    } else {
      return String.fromCharCode(index + 65);
    }
  };

  const getSectionData = id => {
    return quizData.find(item => item.id === id);
  };

  const handleAnswerChange = (op, id, val) => {
    try {
      //   console.log('handleAnswerChange called', val);
      const data = getSectionData(selectedSection.id);
      // setAnswered(currentQuestion);
      const quizQuestions = data?.quizItem;
      const index = quizQuestions.findIndex(item => item.id === id);
      if ((index && index !== -1) || index === 0) {
        switch (op) {
          case 'flagged':
            {
              if (
                quizQuestions[index].status === 'Answered' ||
                quizQuestions[index].status === 'Answered & Flagged'
              ) {
                if (val) {
                  quizQuestions[index].status = 'Answered & Flagged';
                } else {
                  quizQuestions[index].status = 'Answered';
                }
              } else if (
                quizQuestions[index].status === 'Not Visited' ||
                quizQuestions[index].status === 'Flagged'
              ) {
                if (val) {
                  quizQuestions[index].status = 'Flagged';
                } else {
                  quizQuestions[index].status = 'Not Visited';
                }
              } else {
                quizQuestions[index].status = 'Flagged';
              }
            }
            break;

          case 'fileUpload':
            {
              if (val) {
                if (
                  quizQuestions[index].status === 'Flagged' ||
                  quizQuestions[index].status === 'Answered & Flagged'
                ) {
                  quizQuestions[index].status = 'Answered & Flagged';
                } else {
                  quizQuestions[index].status = 'Answered';
                }
              } else {
                if (
                  quizQuestions[index].status === 'Flagged' ||
                  quizQuestions[index].status === 'Answered & Flagged'
                ) {
                  quizQuestions[index].status = 'Flagged';
                } else {
                  quizQuestions[index].status = 'Not Visited';
                }
              }
              quizQuestions[index].itemId = val;
            }
            break;

          case 'answered':
          default:
            {
              if (val) {
                if (
                  quizQuestions[index].status === 'Flagged' ||
                  quizQuestions[index].status === 'Answered & Flagged'
                ) {
                  quizQuestions[index].status = 'Answered & Flagged';
                } else {
                  quizQuestions[index].status = 'Answered';
                }
              } else {
                if (
                  quizQuestions[index].status === 'Flagged' ||
                  quizQuestions[index].status === 'Answered & Flagged'
                ) {
                  quizQuestions[index].status = 'Flagged';
                } else {
                  quizQuestions[index].status = 'Not Visited';
                }
              }
              quizQuestions[index].answer = val;
            }
            break;
        }
        // if (itemId) {
        //   quizQuestions[index].itemId = itemId;
        // }
        data['quizItem'] = quizQuestions;
        setSelectedSection({ ...data });
      }
    } catch (error) {
      console.log('error in change', error);
    }
  };

  const renderQuestions = () => {
    if (currentQuestion) {
      //   return quizQuestions?.map((question, index) => (
      return (
        <Box key={currentQuestion?.id} className={classes.questionText}>
          <QuizItems
            quizItem={currentQuestion}
            // quizItem={quizQuestions[page]}
            // number={quizQuestions[page]?.serialNumber}
            setItemId={setItemId}
            itemId={itemId}
            handleAnswerChange={handleAnswerChange}
            setAnswered={setAnswered}
            multianswer={multianswer}
            setMultianswer={setMultianswer}
          />
          {/* {page <=
            selectedSection?.quizItem[selectedSection?.quizItem?.length - 1]
              .serialNumber && (
            <Divider variant="middle" className={classes.divider} />
          )} */}
        </Box>
      );
      //   ));
    }
  };
  /* needs to call prosees attempt API */
  const handelSaveAnswer = () => {
    setNextClickSubmit(true);
  };
  const handleNext = () => {
    setAnswered();
    if (selectedSection?.quizItem[selectedSection?.quizItem?.length - 1]?.serialNumber - 1 > page) {
      const add = page + 1;
      setPage(add);
    } else {
      const nextSection = quizData.map(sec => {
        const que = sec.quizItem.find(item => item.serialNumber === page + 2);
        if (que) {
          setSelectedSection(sec);
          setPage(page + 1);
          const indexOfSection = quizData.findIndex(item => item.id === sec.id);
          setTabValue(indexOfSection);
        }
      });
    }
  };

  const handlePrev = () => {
    setAnswered();
    if (selectedSection?.quizItem[0]?.serialNumber - 1 === page) {
      const prevSection = quizData.map(sec => {
        const que = sec.quizItem.find(item => item.serialNumber === page);
        if (que) {
          setSelectedSection(sec);
          setPage(page - 1);
          const indexOfSection = quizData.findIndex(item => item.id === sec.id);
          setTabValue(indexOfSection);
        }
      });
    } else {
      const remove = page - 1;
      setPage(remove);
    }
  };

  //   const renderQuestions = quizData?.Physics?.quizItem?.map(
  //     (question, index) => (
  //       <Box key={index} className={classes.questionText}>
  //         <QuizItems quizItem={question} />
  //         {index < quizData?.Physics?.quizItem?.length - 1 && (
  //           <Divider variant="middle" className={classes.divider} />
  //         )}
  //       </Box>
  //     )
  //   );
  const renderSectionArr = [];
  const renderSectionBtn = Object.keys(quizData).map((section, index) => {
    if (!quizData[section]?.name === '') {
      renderSectionArr.push(
        <Tab
          key={index}
          value={index}
          //   value={index}
          //   label={getSectionNumber(index)}
          label={quizData[section]?.name}
          className={classes.sectionBtn}
          onClick={() => changeSection(quizData[section])}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
      );
    }
    return renderSectionArr;
  });

  return (
    <Paper square elevation={0} className={classes.root}>
      {/* <Grid container direction="column">
        <Typography className={classes.sectionLabel}>
          {t('labels:Sections')}
        </Typography>
        <Box className={classes.sectionTabs}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
            scrollButtons="off"
          >
            {renderSectionBtn}
          </Tabs>
        </Box>
      </Grid> */}
      <Grid container direction="column" className={classes.questionContainer}>
        <Box>
          <Box className={classes.questionType}>
            <Typography>{selectedSection?.name}</Typography>
            <Divider />
          </Box>
          <Box className={classes.questionBox}>
            <Box>{renderQuestions}</Box>
          </Box>
        </Box>
        <Grid item md={12}>
          <Pagination
            stepperHandleBack={handlePrev}
            stepperHandleNext={handleNext}
            handelSaveAnswer={handelSaveAnswer}
            stepperActiveStep={page}
            answered={answered}
            //   stepperSteps = []
            //   handleSubmit,
            stepsCount={totalQuestions}
          />
        </Grid>
        {/* <Grid item md={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              disabled={page === 0}
              variant="outlined"
              color="primary"
              onClick={handlePrev}
              style={{ margin: '10px' }}
            >
              Previous Question
            </Button>
            {/* <span>&nbsp; &nbsp; &nbsp; &nbsp;</span> */}
        {/* <Button
              disabled={page === selectedSection?.quizItem?.length - 1}
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{ margin: '10px' }}
            >
              Next Question
            </Button>
          </Box> */}
        {/* </Grid>  */}
      </Grid>
      <Popover
        id={open ? 'simple-popover' : undefined}
        elevation={0}
        className={classes.warningPopover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
      >
        <Typography className={classes.popoverText}>
          Warning Message.
        </Typography>
      </Popover>
    </Paper>
  );
}
