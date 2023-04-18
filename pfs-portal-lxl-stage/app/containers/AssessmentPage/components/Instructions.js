import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import InstructionData from './InstructionData';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes.json';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import QuizNavBar from './QuizNavBar';
import AssessmentNavBar from './AssessmentNavBar';
import {
  QuizAccessInformation,
  AttemptAccessInformation,
  ViewQuiz,
  GetUserAttempts,
  StartAttempt,
} from '../../../utils/ApiService';
import { KEY_STATUS } from '../../../utils/constants';
import KenLoader from '../../../components/KenLoader';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'left',
    marginBottom: 24,
    color: theme.palette.KenColors.kenBlack,
  },
  checked: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
}));

const queryParams = new URLSearchParams(window.location.search);
const quizid = queryParams.get('id');
const quizname = queryParams.get('name');

export default function Instructions() {
  const [checked, setChecked] = React.useState(false);
  const [canStart, setCanStart] = React.useState(false);
  const styles = useStyles();
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState(getUserDetails());
  const [flag, setFlag] = React.useState(true);
  const contactId = profile.ContactId;
  const [isFullScreen, setFullScreen] = React.useState(false);
  //quiz access info
  const [quizAccessInfo, setQuizAccessInfo] = React.useState({});
  const [attemptAccessInfo, setAttemptAccessInfo] = React.useState({});
  const [viewQuizData, setViewQuizData] = React.useState({});
  const [userAttemptsData, setUserAttemptsData] = React.useState({});
  const [startAttemptData, setStartAttemptData] = React.useState({});
  const [attemptId, setAttemptId] = React.useState(null);
  const [isEligible, setEligible] = React.useState({
    allowed: true,
    message:
      "Oops! You seem to have run into a technical issue. Please close this window and click on the assessment link again. If that doesn't work, please contact your teacher",
  });
  const history = useHistory();
  const [timer, setTimer] = React.useState(null);
  const [totalQuizTime, setTotalQuizTime] = React.useState();
  const [startTime, setStartTime] = React.useState(null);
  const [startNew, setStartNew] = React.useState(false);

  const [totalMarks, setTotalMarks] = React.useState();
  const [instructionsData, setInstructionsData] = React.useState({});
  /*  API Fetch Start */

  const callStartAttempt = () => {
    //Start Attempt
    StartAttempt(contactId, quizid)
      .then(res => {
        if (res.status === KEY_STATUS.failed) {
          setStartAttemptData();
        } else {
          setStartAttemptData(res || {});
          // setStartTime(obj.timestart)
          setAttemptId(res?.attempt?.id);
          setEligible({
            allowed: true,
            message: 'attempts available',
          });
          setStartTime(res?.attempt?.timestart);
        }
        setFlag(false);
      })
      .catch(err => {
        console.log('error in Start Attempt', err);
        setFlag(false);
      });
  };
  const checkAttempts = () => {
    GetUserAttempts(contactId, quizid)
      .then(res => {
        if (res.status === KEY_STATUS.failed) {
          setUserAttemptsData();
        } else {
          if (res.attempts.length > 0) {
            // find the Gretest Attempt ID with "state": "inprogress",
            const obj = res.attempts.find(item => item.state === 'inprogress');
            if (obj) {
              setAttemptId(obj.id);
              setEligible({
                allowed: true,
                message: 'attempts available',
              });
              setUserAttemptsData(obj);
              setStartTime(obj.timestart);
              return obj.id;
            } else {
              // callStartAttempt(contactId, quizid);
            }
            setFlag(false);
          } else {
            // callStartAttempt(contactId, quizid);
          }
        }
        setFlag(false);
      })
      .catch(err => {
        console.log('error in User Attempts', err);
        setFlag(false);
      });
  };
  React.useEffect(() => {
    setFlag(true);
    // get Quiz Access Information
    QuizAccessInformation(contactId, quizid)
      .then(res => {
        if (res.status === KEY_STATUS.failed) {
          setQuizAccessInfo();
        } else {
          setQuizAccessInfo(res);
          if (res.canattempt === true) {
            // get Attempt access Information
            AttemptAccessInformation(contactId, quizid)
              .then(res => {
                if (res.status === KEY_STATUS.failed) {
                  setAttemptAccessInfo();
                } else {
                  setAttemptAccessInfo(res);
                  if (res.isfinished === false) {
                    //View Quiz Status
                    ViewQuiz(quizid)
                      .then(res => {
                        if (res.status === KEY_STATUS.failed) {
                          setViewQuizData();
                        } else {
                          setViewQuizData(res.status);
                          if (res.status === true) {
                            // Get User Attempts
                            checkAttempts();
                          } else {
                            setEligible({
                              allowed: false,
                              message:
                                "You don't have access to attempt this assessment",
                            });
                          }
                        }
                        setFlag(false);
                      })
                      .catch(err => {
                        console.log('error in View Quiz', err);
                        setFlag(false);
                      });
                  } else {
                    setEligible({
                      allowed: false,
                      message:
                        'You cannot attempt this assessment because it is already finished',
                    });
                  }
                }
                setFlag(false);
              })
              .catch(err => {
                console.log('error in Attempt Access Information', err);
                setFlag(false);
              });
          } else {
            setEligible({
              allowed: false,
              message:
                'You cannot attempt this assessment because you do not have access',
            });
          }
        }
        setFlag(false);
      })
      .catch(err => {
        console.log('error in Quiz Access Information', err);
        setFlag(false);
      });
  }, []);
  const handleChange = event => {
    setChecked(event.target.checked);
  };
  // full screen
  const elementBox = React.useRef(null);
  const handle = () => {
    if (elementBox.current.requestFullscreen) {
      elementBox.current.requestFullscreen();
    } else if (elementBox.current.msRequestFullscreen) {
      elementBox.current.msRequestFullscreen();
    } else if (elementBox.current.mozRequestFullScreen) {
      elementBox.current.mozRequestFullScreen();
    } else if (elementBox.current.webkitRequestFullscreen) {
      elementBox.current.webkitRequestFullscreen();
    }
  };

  useEffect(() => {
    if (attemptId !== null && canStart == true && timer !== null) {
      history.push({
        pathname: `/${Routes.studentAssessment}`,
        state: {
          attemptId: attemptId,
          timer: timer,
          totalMarks: instructionsData?.totalmarks,
        },
        search: `?id=${quizid}&contactId=${contactId}&name=${quizname}&attemptId=${attemptId}&timer=${timer}&totalMarks=${
          instructionsData?.totalmarks
        }`,
      });
    }
  }, [canStart, attemptId, timer]);

  /* timer caluculation */
  useEffect(() => {
    if (startTime !== null) {
      const startTime1 = moment.unix(startTime);
      const currentTime = moment();
      const delta = currentTime.diff(startTime1, 'seconds');
      console.log('currentTime: ', currentTime);
      console.log('startTime: ', startTime1);
      console.log('delta: ', delta);
      setTimer(totalQuizTime - delta);
    }
  }, [startTime]);

  /* if (startTime !== null) {
    const currentTime = moment();
    const startTime1 = moment.unix(startTime);

    const delta = currentTime.diff(startTime1, 'seconds');
    
    console.log('currentTime: ', currentTime);
    console.log('startTime: ', startTime1);
    console.log('delta: ', delta);
  } */
  useEffect(() => {
    if(timer !== null && startNew){
      setCanStart(true)
    }
  }, [timer, startNew]);
  console.log('timer: ', timer);

  const handleContinue = () => {
    console.log('user data', userAttemptsData);
    setCanStart(true);
  };
  const handleStart = () => {
    if (viewQuizData) {
      callStartAttempt();
      setStartNew(true);
    }
  };
  return (
    <>
      {flag && <KenLoader />}
      {canStart && <KenLoader />}
      {!flag && isEligible && isEligible.allowed === false ? (
        <Box p={2} mt={8}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4" align="center">
              {quizname}
            </Typography>
            <Divider />
            <Typography align="center" color="error" m={2}>
              {isEligible?.message}
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  window.close();
                }}
              >
                {t('translations:Close')}
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        <>
          {/* <Button onClick={handle}>Go Fullscreen</Button> */}

          <Box ref={elementBox}>
            {<AssessmentNavBar name={quizname} />}
            <Box p={2} mt={8}>
              <Paper style={{ padding: '16px' }}>
                <Grid container spacing={2} justify="space-around" p={2}>
                  <Grid item xs={12} p={2}>
                    <Typography className={styles.title}>
                      {t('instructions:Important_Instructions_Guidelines')}
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <InstructionData
                      quizid={quizid}
                      setTotalQuizTime={setTotalQuizTime}
                      instructionsData={instructionsData}
                      setInstructionsData={setInstructionsData}
                    />
                  </Grid>
                  <Grid item xs={12} p={2}>
                    <FormControl>
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                            required
                          />
                        }
                        label={
                          <Typography className={styles.checked}>
                            {t(
                              'instructions:Agree_Given_Instructions_And_Exam_Details'
                            )}
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} p={2}>
                    {checked && (
                      <Box display="flex" justifyContent="flex-end">
                        {viewQuizData ? (
                          <>
                            {/* <Link
                            to={{
                              pathname: `/${Routes.studentAssessment}`,
                              search: `?id=${quizid}&contactId=${contactId}&name=${quizname}&attemptId=${attemptId}&timer=${timer}`,
                              // hash: '#the-hash',
                              state: { attemptId: attemptId, timer: timer },
                            }}
                          > */}
                            {/* <Link
                            to={`/${
                              Routes.studentAssessment
                            }?id=${quizid}&contactId=${contactId}&name=${quizname}&attemptId=${attemptId}&timer=${timer}`}
                            params={{ contactId: contactId }}
                          > */}
                            {userAttemptsData &&
                            userAttemptsData?.state === 'inprogress' ? (
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={handleContinue}
                                disabled={canStart}
                              >
                                {/* {t('instructions:Start_Assessment')} */}
                                Continue Attempt
                              </Button>
                            ) : (
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={handleStart}
                                disabled={canStart}
                              >
                                {t('instructions:Start_Assessment')}
                              </Button>
                            )}
                            {/* </Link> */}
                          </>
                        ) : (
                          <>
                            <Button disabled variant="contained">
                              {t('instructions:Start_Assessment')}
                            </Button>
                          </>
                        )}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
