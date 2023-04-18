import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import QuizNavBar from './components/QuizNavBar';
import QuizContent from './components/QuizContent';
import QuizNavigation from './components/QuizNavigation';
import QuizTimer from './components/QuizTimer';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { GetAttemptSummary, postProcessAttempt } from '../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import KenDialog from '../../global_components/KenDialog';
import SuccessImage from '../../assets/icons/success.png';
import QuizSummaryTable from './components/QuizSummaryTable';
import { useLocation, useHistory } from 'react-router-dom';

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const contactId = queryParams.get('contactId');
const quizname = queryParams.get('name');
const timer = queryParams.get('timer');
const attemptId = queryParams.get('attemptId');
const totalmarks = queryParams.get('totalMarks');
const actionTimeId = queryParams.get('actionTimeId');
const actionTimeName = queryParams.get('actionTimeName');
const actionAttemptId = queryParams.get('actionAttemptId');
const actionTotalMarks = queryParams.get('actionTotalMarks');
const actionType = queryParams.get('type');
const chapterId = queryParams.get('chapterId');
// const attemptId = queryParams.get('attemptId');

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.KenColors.neutral20,
    maxHeight: '91vh',
    overflow: 'hidden',
    margin: '-70px -24px -80px -24px',
    [theme.breakpoints.only('xs')]: {
      overflow: 'auto',
    },
  },
  quizContainer: {
    marginTop: '8px',
  },
  titleHead: {
    textAlign: 'center',
  },
  success: {
    fontSize: '14px',
    color: theme.palette.KenColors.green,
    marginTop: theme.spacing(3),
  },
}));

const serializeQuizData = data => {
  let serialNumber = 0;
  return data?.map(item => {
    const queObj = item?.quizItem?.map(question => {
      serialNumber = serialNumber + 1;
      return {
        ...question,
        serialNumber: serialNumber,
        answer: '',
        status: 'Not Visited',
        itemId: '',
      };
    });

    return { ...item, quizItem: queObj };
  });
};
export default function AssessmentPage(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [flatSectionData, setFlatSectionData] = useState();
  const [statusCount, setStatusCount] = useState([]);
  const [currentQuestionDetails, setCurrentQuestionDetails] = useState();
  const [totalQuestions, setTotalQuestions] = useState();
  const [openSubmitConfirmation, setOpenSubmitConfirmation] = useState(false);
  const [openSubmitAlert, setOpenSubmitAlert] = useState(false);
  const [quizData, setQuizData] = useState();
  // const [attemptId, setAttemptId] = useState(
  //   props?.history?.location?.state?.attemptId
  // );
  const location = useLocation();
  const history = useHistory();
  const [nextClickSubmit, setNextClickSubmit] = useState(false);
  const [answered, setAnswered] = useState();
  const [singaleAnswered, setSingaleAnswered] = useState({});
  const [total_marks, setTotal_marks] = useState(
    props?.history?.location?.state?.totalMarks
  );
  const [multianswer, setMultianswer] = useState(false);
  

  useEffect(() => {
    // back disable
    // history.push(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
      //refresh disable
      document.location.reload(false);
    };

    //refresh on F5 disale
    document.onkeydown = function (event) {
      if (
        event.keyCode === 116 ||
        event.keyCode === 18 ||
        event.keyCode === 14
      ) {
        event.preventDefault();
        alert('Please do not try to refresh');
      }
    };
    //Scroll Top
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    //reload issue resloved using props?.history?.location?.state?.attemptId
    GetAttemptSummary(attemptId).then(res => {
      //   let questions = JSON.parse(res?.questionstexts);
      let questions = res?.questionstexts;
      let data = Object.values(questions?.question);
      let arr = [];
      let updatedQuetions = res?.questions;
      data.map((el, index) => {
        if (
          arr.findIndex(item => {
            return item.section == el.section || '';
          }) !== -1
        ) {
          let index = arr.findIndex(item => {
            return item.section == el.section || '';
          });
          arr[index].quizItem.push(el);
        } else {
          arr.push({ section: el.section, id: index, quizItem: [el] });
        }
      });
      let newData = arr.map(el => {
        let copyQuizItem = el?.quizItem?.map((elem, index) => {
          /* filterd object for sequence check */
          let sqCheck = updatedQuetions.filter(
            item => elem?.options[0]?.name === item?.questionformelement
          );
          return {
            ...elem,
            id: index,
            question: elem.questiontext,
            name: elem?.options ? elem?.options[0]?.name : '',
            sequence: sqCheck[0]?.sequencecheck,
          };
        });
        return { section: el.section, id: el.id, quizItem: [...copyQuizItem] };
      });
      setQuizData([...serializeQuizData(newData)]);
    });
  }, []);
  /* stoped API Re call with emapty [] */
  /*  }, [nextClickSubmit]);
   */

  useEffect(() => {
    if (quizData) {
      const array = [];
      Object.keys(quizData).map((section, index) => {
        array.push(quizData[section]?.quizItem);
      });
      const flatData = Object.values(array).flat();
      const counts = count(flatData);
      setTotalQuestions(flatData?.length);
      setFlatSectionData(Object.values(array).flat());

      setStatusCount(counts);
    }
  }, [quizData]);
  const handleClick = data => {
    setSelectedQuestion({
      ...data.question,
      sectionId: data?.section?.id,
    });
    setCurrentQuestionDetails({
      question: { ...data.question, sectionId: data?.section?.id },
      section: data.section,
    });
  };

  function compare(a, b) {
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  }

  function count(arrayElements) {
    const sortedArray = arrayElements.sort(compare);
    let current = null;
    let cnt = 0;

    const countsArray = [];
    sortedArray?.map(item => {
      if (item.status !== current) {
        if (cnt > 0) {
          countsArray.push({ status: current, count: cnt });
        }
        current = item.status;
        cnt = 1;
      } else {
        cnt++;
      }
    });

    if (cnt > 0) {
      countsArray.push({ status: current, count: cnt });
    }

    return countsArray;
  }

  useEffect(() => {
    const secId = currentQuestionDetails?.section?.id;
    const queId = currentQuestionDetails?.question?.id;
    const updatedQuiz =
      quizData &&
      Object.keys(quizData).map((section, index) => {
        const quiz = quizData[section]?.quizItem?.map(que => {
          return {
            ...que,
            isActive:
              (queId === que.id && secId === quizData[section]?.id) ||
              (queId === que.id && secId === selectedQuestion?.section?.id),
          };
        });
        const sec = quizData[section];

        return { ...sec, quizItem: quiz };
      });
    if (updatedQuiz) {
      setQuizData([...updatedQuiz]);
    }
  }, [currentQuestionDetails, selectedQuestion]);

  const getSeqName = name => {
    const sequence = ':sequencecheck';
    return name.substr(0, name.indexOf('_') + 1) + sequence;
  };

  const getAttachmentName = name => {
    const attach = 'attachments';
    return name.substr(0, name.indexOf('_') + 1) + attach;
  };
  useEffect(() => {
    if (nextClickSubmit === true) {
      const answers = {};
      let index = 0;
      quizData?.map(el => {
        if (el?.quizItem) {
          el?.quizItem?.map(elem => {
            if (elem?.name === answered?.name) {
              answers[`${index + 1}`] = {
                name: getSeqName(elem?.name),
                value: elem?.sequence,
              };
              answers[`${index}`] = {
                name: elem?.name,
                value:
                  elem.answer.length > 1 ? elem?.answer : Number(elem.answer),
              };
              if (!elem?.itemId == '') {
                answers[`${index + 2}`] = {
                  name: getAttachmentName(elem?.name),
                  value: elem.itemId,
                };
                index = index + 3;
              } else {
                index = index + 2;
              }
            }
          });
        }
      });
      postProcessAttempt(attemptId, answers, 0, 0).then(res => {
        setNextClickSubmit(false);
      });
    }
  }, [nextClickSubmit]);

  const handleSubmit = () => {
    const answers = {};
    let index = 0;
    quizData?.map(el => {
      if (el?.quizItem) {
        el?.quizItem?.map(elem => {
          answers[`${index + 1}`] = {
            name: getSeqName(elem?.name),
            value: 1,
          };
          answers[`${index}`] = {
            name: elem?.name,
            value: elem.answer.length > 1 ? elem?.answer : Number(elem.answer),
          };
          if (elem?.itemId !== '') {
            answers[`${index + 2}`] = {
              name: getAttachmentName(elem?.name),
              value: elem.itemId,
            };
            index = index + 3;
          } else {
            index = index + 2;
          }
        });
      }
    });
    const data = {}; /* //no answers when save button is enabled pass in payload as answers */
    // uncomment this to call submit API
    //  ------------
    // postProcessAttempt(attemptId, answers, 1, 0).then(res => {
    setOpenSubmitConfirmation(false);
    setOpenSubmitAlert(true);
    // });
    // ------------------------------------
    //   alert('Assessment submitted successfully!');
    //   window.close();
  };

  //   const getQuizSummary = () => {
  //   const fData = flatSectionData;
  //   const sectionsStatus = countSections(fData);
  //     return [];
  //   };
  return (
    <Box data-testid={'assessment-view'} mt={3}>
      <QuizNavBar
        total_marks={total_marks}
        name={quizname}
        totalmarks={totalmarks}
        quizId={id}
        handleSubmit={() => setOpenSubmitConfirmation(true)}
      // handleSubmit={handleSubmit}
      />
      <Box p={2} mt={8}>
        <Paper style={{ padding: '16px' }}>
          <Grid container spacing={2} justify="space-around" p={2}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} sm={8} md={9}>
                {quizData && (
                  <QuizContent
                    quizData={quizData}
                    // quizData={[...serializeQuizData(DUMMY_RESPONSE)]}
                    setQuizData={setQuizData}
                    selectedQuestion={selectedQuestion}
                    handleQuestionClick={handleClick}
                    setCurrentQuestionDetails={setCurrentQuestionDetails}
                    currentQuestionDetails={currentQuestionDetails}
                    totalQuestions={totalQuestions}
                    handleSubmit={handleSubmit}
                    nextClickSubmit={nextClickSubmit}
                    setNextClickSubmit={setNextClickSubmit}
                    setAnswered={setAnswered}
                    answered={answered}
                    multianswer={multianswer}
                    setMultianswer={setMultianswer}
                  />
                )}
              </Grid>
              <Grid container item xs={12} sm={4} md={3} direction="column">
                {/* <Grid item>
                  <QuizTimer
                    totalTime={parseInt(props?.history?.location?.state?.timer)}
                    handleSubmit={handleSubmit}
                  />
                </Grid> */}
                <Grid item>
                  {quizData && (
                    <QuizNavigation
                      quizData={quizData}
                      handleClick={handleClick}
                      selectedQuestion={selectedQuestion}
                      statusCount={statusCount}
                    />
                  )}
                  {/* <QuizNavigation quizData={DUMMY_RESPONSE.quizSection} /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <KenDialog
            open={openSubmitConfirmation}
            handleClose={() => setOpenSubmitConfirmation(false)}
            handleClickOpen={() => setOpenSubmitConfirmation(true)}
            positiveButtonText={t('labels:Submit')}
            negativeButtonText={t('labels:Go_Back')}
            negativeButtonClick={() => setOpenSubmitConfirmation(false)}
            positiveButtonProps={{
              onClick: handleSubmit,
              // disabled: !profilePicture,
            }}
            title={
              <Typography align="center">Submit your answer sheet</Typography>
            }
            dialogActions={true}
          >
            <QuizSummaryTable
              statusCount={statusCount}
              totalQuestions={totalQuestions}
            />
          </KenDialog>

          <KenDialog
            open={openSubmitAlert}
            handleClose={() => setOpenSubmitAlert(false)}
            handleClickOpen={() => setOpenSubmitAlert(true)}
            positiveButtonText={t('labels:Cancel')}
            // hideNegativeButton={actionType == 'actionTime' ? true : false}
            negativeButtonText={actionType == 'actionTime' ?t('labels:Continue to FeedBack'):t('labels:Continue to Action time')}
            negativeButtonClick={() => {
              let quizType = 'actionTime'
              if (actionType == 'actionTime') {
                history.push({
                  pathname: `/studentFeedBackForm`,
                  state: {
                    data: {
                      chapterID: chapterId
                    }
                  },
                });
              }
              else{
                window.open(
                  `studentAssessment?id=${actionTimeId}&contactId=${contactId}&name=${actionTimeName}&attemptId=${actionAttemptId}&totalMarks=${actionTotalMarks}&type=${quizType}&chapterId=${chapterId}`,
                  'mywindow',
                  'fullscreen=yes,status=1,toolbar=0'
                );
              }
            }}
            positiveButtonProps={{
              onClick: () => {
                window.close();
              },
              // style: { textAlign: 'center' },
              // disabled: !profilePicture,
            }}
            title={<Typography align="center">{actionType == 'actionTime' ? 'Action time Submitted' : 'Fun Questions Submitted'}</Typography>}
            dialogActions={true}
            dialogActionProps={{ style: { justifyContent: 'center' } }}
          >
            <Box m={1} textAlign={'center'}>
              <img src={SuccessImage} />
              <Typography className={classes.success}>
                {actionType == 'actionTime' ? 'You have successfully submitted the Action time.' : 'You have successfully submitted the Fun Questions.'}
              </Typography>
            </Box>
          </KenDialog>
        </Paper>
      </Box>
    </Box>
  );
}
