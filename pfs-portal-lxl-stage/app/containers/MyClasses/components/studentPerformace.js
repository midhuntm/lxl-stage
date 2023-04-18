import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import KenTabs from '../../../components/KenTabs';
import QuizAnalysis from './quizAnalysis';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PerformanceTab from './performaceTab';
import ManualGradingTab from './manualGradingTab';
import QuestionReportTab from './questionReportTab';
import SolutionTab from './solutionTab';
import { GetAttemptReview, GetUserAttempts } from '../../../utils/ApiService';
import KenLoader from '../../../components/KenLoader';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import moment from 'moment';
import KenButton from '../../../global_components/KenButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  containerFirst: {
    background: theme.palette.KenColors.kenWhite,
    margin: 4,
    paddingBottom: 40,
  },
  typoRankTitle: {
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
    fontSiz: 14,
  },
  typoNameTitle: {
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
    fontSize: 16,
    marginTop: '-10px',
    textAlign: 'left',
    padding: '20px 0px 10px 20px',
  },
  typoSubTitle: {
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
    fontSize: 14,
    marginTop: '-10px',
    textAlign: 'left',
    padding: '20px 0px 10px 20px',
  },
  typoRank: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 48,
    fontWeight: 700,
  },
  typoTotalNumber: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 28,
    fontWeight: 700,
  },
  accuracyContainer: {
    background: '#F4F5F7',
    padding: 8,
    borderRadius: 3,
  },
  icons: {
    fontSize: '18px',
    marginRight: '10px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    border: '1px solid #DFE1E6',
    width: '80%',
    margin: '0 auto',
    marginTop: '20px',
  },
  tableRow: {
    border: '1px solid #DFE1E6',
    padding: 10,
    cursor: 'inherit',
  },
  typoText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  questionTypoText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },

  typoCorrectAnswer: {
    color: theme.palette.KenColors.kenBlack,
  },
  nodataText: {
    fontSize: 14,
    padding: '10px 0px',
    marginLeft: 10,
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
}));

export default function StudentPerformance(props) {
  const classes = useStyles();
  const { contactId, studentName, quizId, quizInfo } = props?.location?.state;
  const [totalRank, setTotalRank] = useState('-');
  const [myRank, setMyRank] = useState('-');
  const [myScore, setMyScore] = useState();
  const [totalScore, setTotalScore] = useState();
  const [accuracy, setAccuracy] = useState('-');
  const [quizAnalysisData, setQuizAnalysisData] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const userDetails = getUserDetails();
  const [attemptId, setAttemptId] = useState('');
  const [listAttempts, setListAttempts] = useState([]);
  const [attemptView, setAttemptView] = useState(true);
  const [noData, setNoData] = useState(false);
  const [subjectiveQuestionData, setSubjectiveQuestionData] = useState([]);

  const [refreshData, setRefreshData] = useState(false)

  const allTabs = [{
    id: 1,
    title: (
      <Box className={classes.title}>
        <MenuBookIcon className={classes.icons} />
        <span>{`Pending Questions`}</span>
      </Box>
    ),
    content: (
      <ManualGradingTab
        data={data}
        // data={subjectiveQuestionData}
        noData={noData}
        attemptId={attemptId}
        userType={userDetails.Type}
        quizInfo={quizInfo}
        setRefreshData={setRefreshData}
        {...props}
      />
    ),
  },
  {
    id: 2,
    title: (
      <Box className={classes.title}>
        <MenuBookIcon className={classes.icons} />
        <span>{`Question Report `}</span>
      </Box>
    ),
    content: (
      <QuestionReportTab
        data={data}
        noData={noData}
        attemptId={attemptId}
        userType={userDetails.Type}
        {...props}
      />
    ),
  },
  {
    id: 3,
    title: (
      <Box className={classes.title}>
        <MenuBookIcon className={classes.icons} />
        <span>{`Solutions `}</span>
      </Box>
    ),
    content: (
      <SolutionTab
        data={data}
        noData={noData}
        attemptId={attemptId}
        userType={userDetails.Type}
        {...props}
      />
    ),
  },
  ]
  const [tabs, setTabs] = useState([
    // {
    //   title: (
    //     <Box className={classes.title}>
    //       <MenuBookIcon className={classes.icons} />
    //       <span>{`Performance `}</span>
    //     </Box>
    //   ),
    //   content: <PerformanceTab />,
    // },
  ])

  useEffect(() => {
    setLoading(true);
    setTabs(allTabs)
    getAttempts();
  }, []);

  //After manual grading ->refreshing the page !!
  useEffect(() => {
    if (refreshData) {
      setLoading(true);
      setNoData(false);
      setAttemptView(true);
      setTimeout(() => {
        setAttemptView(false)
        getAttemptsById({ id: attemptId })
        setRefreshData(false)
      });
    }
  }, [refreshData])

  const getAttempts = () => {
    GetUserAttempts(contactId, quizId)
      .then(res => {
        if (res.attempts.length > 0) {
          console.log(res.attempts);
          let listAttempts = res.attempts;
          listAttempts.sort((a, b) => b.attempt - a.attempt);
          setListAttempts(listAttempts);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error in User Attempts', err);
        setLoading(false);
      });
  };

  const getAttemptsById = ({ id }) => {
    setAttemptView(false);
    setAttemptId(id);
    setLoading(true);
    GetAttemptReview(id)
      .then(res => {
        if (res !== null) {
          setData(res);
          const quizAnalysisData = res?.attemptoverview;
          setNoData(false);
          setQuizAnalysisData(quizAnalysisData);
          let totalMarks = quizAnalysisData.find(item => item.name == 'totalmarks')?.value;
          let marksobtained = quizAnalysisData.find(item => item.name == 'marksobtain')?.value;
          setMyScore(marksobtained);
          setTotalScore(totalMarks);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setNoData(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true)
    let tabs = []
    let questionArray = data?.questionstexts?.question || [];
    const subjectiveQuestionsArray = questionArray?.filter(item => item.type !== 'multichoice' && item.type !== 'truefalse');
    const pendingQuestions = subjectiveQuestionsArray?.filter(item => item.status == "needsgrading" || item.status == "mangrpartial");
    const graded = subjectiveQuestionsArray?.filter(item => item.status == 'mangrright');
    console.log('graded', graded)
    console.log('pendingQuestions', pendingQuestions)

    if (graded?.length == subjectiveQuestionsArray.length) {
      let tabsArr = allTabs.filter(item => item.id !== 1)
      setLoading(false)
      tabs = tabsArr
    }
    else {
      setLoading(false)
      tabs = allTabs
    }
    setTabs(tabs)
  }, [data,]);

  return (
    <Box>
      {loading && <KenLoader />}
      <Box m={1}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography className={classes.heading}>
              {quizInfo?.quiz}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid item md={6} xs={12}>
        <KenButton
          label={'Review Quiz'}
          variant="text"
          startIcon={<ArrowBackIcon />}
          size="small"
          onClick={() => {
            if (!attemptView) setAttemptView(true);
            else {
              props.history.goBack()
            }
          }}
        />
      </Grid>
      {attemptView ? (
        <React.Fragment>
          <Box className={classes.containerFirst}>
            <Typography className={classes.typoNameTitle}>
              Student Name: <strong>{studentName}</strong>
            </Typography>
            <br />
            <Typography className={classes.typoNameTitle}>
              List of Attempts :
            </Typography>
            <table className={classes.table}>
              <tr>
                <th className={classes.tableRow}>
                  <Typography className={classes.typoText}>S.No</Typography>
                </th>
                <th className={classes.tableRow}>
                  <Typography className={classes.typoText}>
                    Start Time
                  </Typography>
                </th>
                <th className={classes.tableRow}>
                  <Typography className={classes.typoText}>End Time</Typography>
                </th>
                <th className={classes.tableRow}>
                  <Typography className={classes.typoText}>State</Typography>
                </th>
                <th className={classes.tableRow}>
                  <Typography className={classes.typoText}>Action</Typography>
                </th>
              </tr>
              {listAttempts.map((el, idx) => {
                return (
                  <tr style={{ cursor: 'initial' }}>
                    <td className={classes.tableRow}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <div className={classes.questionTypoText}>
                            {idx + 1}
                          </div>
                        </Grid>
                      </Grid>
                    </td>
                    <td className={classes.tableRow}>
                      <Box>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>
                              {moment
                                .unix(el.timestart)
                                .format('DD/MM/YYYY hh:mm A')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </td>
                    <td className={classes.tableRow}>
                      <Box>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>
                              {moment
                                .unix(el.timefinish)
                                .format('DD/MM/YYYY hh:mm A')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </td>
                    <td className={classes.tableRow}>
                      <Box>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography className={classes.typoCorrectAnswer}>
                              {el.state}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </td>
                    <td className={classes.tableRow}>
                      <Box>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item onClick={() => getAttemptsById(el)}>
                            <Typography className={classes.typoCorrectAnswer} />
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ borderRadius: 15, cursor: 'pointer' }}
                              // disabled={row.row.original.totalattempts < 1}
                              onClick={() => getAttemptsById(el)}
                            >
                              View Attempt
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </table>
          </Box>
        </React.Fragment>
      ) :
        (<React.Fragment>
          <Grid container>
            <Grid item md={4}>
              <Box className={classes.containerFirst}>
                {userDetails.Type === 'Faculty' && (
                  <Typography className={classes.typoNameTitle}>
                    Student Name: <strong>{studentName}</strong>
                  </Typography>
                )}
                <br />
                {!noData && (
                  <React.Fragment>
                    <Grid container spacing={2} justifyContent="space-around">
                      <Grid item style={{ display: 'none' }}>
                        <>
                          <Grid container direction="column" alignItems="center" >
                            <Grid item>
                              <Typography className={classes.typoRankTitle}>Your Rank </Typography>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.typoRank}>{myRank}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Out of {totalRank}</Typography>
                            </Grid>
                          </Grid>
                        </>
                      </Grid>

                      <Grid item>
                        <>
                          <Grid container direction="column">
                            <Grid item justifyContent="space-around">
                              {userDetails.Type === 'Faculty' ? (
                                <Typography className={classes.typoRankTitle}>Score</Typography>
                              ) : (
                                <Typography className={classes.typoRankTitle}>Your Score</Typography>
                              )}
                            </Grid>
                            <Grid item container alignItems="baseline">
                              <Typography className={classes.typoRank}>{myScore} </Typography>
                              <Typography className={classes.typoTotalNumber}>/{totalScore}</Typography>
                            </Grid>
                            {/* <Grid item>
                              <Typography className={classes.typoRankTitle}>
                                Accuracy
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              container
                              justifyContent="center"
                              className={classes.accuracyContainer}
                            >
                              <Typography className={classes.typoRankTitle}>
                                {accuracy}
                              </Typography>
                            </Grid> */}
                          </Grid>
                        </>
                      </Grid>
                    </Grid>
                    <QuizAnalysis quizAnalysisData={quizAnalysisData} />
                  </React.Fragment>
                )}
                {noData && (
                  <Typography className={classes.nodataText}>No data found for this attempt</Typography>
                )}
              </Box>
            </Grid>
            <Grid item md={8}>
              <Box className={classes.containerFirst}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <KenTabs data={tabs} {...props} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
        )}
    </Box>
  );
}
