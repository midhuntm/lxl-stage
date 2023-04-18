import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenHeader from '../../../global_components/KenHeader';
import KenButton from '../../../global_components/KenButton';
import KenChip from '../../../global_components/KenChip';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  getQuizQuestions,
  publishUnpublishLMSModule,
  QuizInstruction,
} from '../../../utils/ApiService';
import AssessmentPreviewQuestionList from './Components/ListOfQuestions';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import Routes from '../../../utils/routes.json';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import KenLoader from '../../../components/KenLoader';
import KenSnackBar from '../../../components/KenSnackbar';

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
  heading: {
    fontSize: '18px',
    fontWeight: 600,
  },
  instruction: {
    fontSize: '16px',
    fontWeight: 600,
    marginLeft: '16px',
  },
  btn: {
    marginRight: '16px',
  },
  expand: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#A8AFBC',
  },
  basicDetails: {
    backgroundColor: '#DFE8FF',
  },
  basicDetailsText: {
    fontWeight: 600,
    padding: '16px 24px',
  },
  headings: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#505F79',
    marginLeft: '16px',
  },
  icons: {
    color: '#505F79',
  },
  chipHeadings: {
    fontSize: '14px',
    fontWeight: 500,
    width: '100%',
  },
}));

export default function AssessmentPreview(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [quizData, setQuizData] = useState();
  const [quizInstructions, setQuizInstructions] = useState();
  const [quizTime, setQuizTime] = useState();
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const history = useHistory();

  //Snackbar states - Not using from context intentionally (to keep state)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const [data, setData] = useState(props?.history?.location?.state?.data);
  const [classSectionName, setClassSectionName] = useState();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  const [publishStatus, setPublishStatus] = useState(
    data?.status?.toLowerCase()
  );
  function compare(a, b) {
    if (a.qtype > b.qtype) {
      return -1;
    }
    if (a.qtype < b.qtype) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    data?.classData?.accountname &&
      data?.classData?.section &&
      setClassSectionName(
        data?.classData?.accountname + ' - ' + data?.classData?.section
      );
  }, [data]);

  useEffect(() => {
    setLoading(true);
    getQuizQuestions(data?.cmid)
      .then(res => {
        if (!res.hasOwnProperty('errorcode')) {
          const quizQuestions = res.questions?.sort(compare);
          setQuizData(quizQuestions);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('err in quiz questions', err);
      });
  }, []);

  useEffect(() => {
    setNextLoading(true);
    QuizInstruction(data?.cmid)
      .then(res => {
        if (!res.hasOwnProperty('errorcode')) {
          setQuizInstructions(res);
          const seconds = res?.timelimit;
          const formatted = moment.utc(seconds * 1000).format('HH:mm:ss');
          setQuizTime(formatted);
        } else {
          handleSnackbarOpen('error', 'Something went wrong');
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
        setNextLoading(false);
      })
      .catch(err => {
        console.log('err in quiz questions', err);
        setNextLoading(false);
      });
  }, []);

  const publishAssessment = () => {
    setNextLoading(true);
    const payload = {
      method: 'post',
      quizid: data?.cmid,
      publish: 1,
    };
    publishUnpublishLMSModule(payload)
      .then(res => {
        setNextLoading(false);
        console.log('res', res);
        if (!res.hasOwnProperty('errorcode')) {
          setPublishStatus('published');
        }
      })
      .catch(err => {
        console.log('err', err);
        setNextLoading(false);
      });
  };

  return (
    <Box data-testid={'assessment-view'}>
      {(loading || nextLoading) && <KenLoader />}
      {/* <Paper> */}
      <Grid container spacing={1} justify="space-around">
        <Grid item xs={12}>
          <KenHeader
            title={
              <Typography className={classes.heading}>
                {t('labels:Assessment_Preview', {
                  assessment: quizInstructions?.quizname,
                })}
              </Typography>
            }
          >
            <KenButton
              variant="secondary"
              label={
                data?.origin === 'question-page'
                  ? t('labels:Assessment_Back_To_Edit')
                  : data?.origin === 'lms-dashboard'
                  ? t('labels:Assessment_Back_To_LMS_Dashboard')
                  : t('labels:Assessment_Back_To_Activities')
              }
              buttonClass={classes.btn}
              onClick={() => {
                // history.push(Routes.acadamicContent);
                history.goBack();
              }}
            />
            {/* <KenButton
              variant="primary"
              startIcon={
                publishStatus === 'published' ? (
                  <CheckCircleOutlineIcon style={{ color: '#fff' }} />
                ) : (
                  ''
                )
              }
              label={
                publishStatus === 'published'
                  ? t('labels:Published_Assessment')
                  : t('labels:Publish_Assessment')
              }
              disabled={publishStatus === 'published'}
              style={{
                backgroundColor:
                  publishStatus === 'published' ? 'green' : 'inherited',
                color: publishStatus === 'published' ? 'white' : 'inherited',
              }}
              onClick={() => {
                publishAssessment();
              }}
            /> */}
          </KenHeader>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Paper style={{ minHeight: '500px' }} elevation={1}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box className={classes.basicDetails}>
                  <Typography className={classes.basicDetailsText}>
                    Basic Details
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box p={2}>
              <Grid container spacing={2} alignItems="center">
                {/* Name */}
                <Grid item xs={12} sm={12} md={6}>
                  <AssignmentOutlinedIcon className={classes.icons} />
                  <Typography className={classes.headings} component="span">
                    Assessment name
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <KenChip
                    className={classes.chipHeadings}
                    label={quizInstructions?.quizname}
                    style={{
                      backgroundColor: '#E1D8FF',
                      color: '#997AFF',
                      //   width: '100%',
                    }}
                  />
                </Grid>

                {/* Subject */}
                <Grid item xs={12} sm={12} md={6}>
                  <BookOutlinedIcon className={classes.icons} />
                  <Typography className={classes.headings} component="span">
                    Subject
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <KenChip
                    className={classes.chipHeadings}
                    label={quizInstructions?.subject}
                    style={{
                      backgroundColor: '#D6EFFF',
                      color: '#7287BC',
                      //   width: '100%',
                    }}
                  />
                </Grid>

                {/* Class */}
                {classSectionName && (
                  <Grid item xs={12} sm={12} md={6}>
                    <DashboardOutlinedIcon className={classes.icons} />
                    <Typography className={classes.headings} component="span">
                      Class
                    </Typography>
                  </Grid>
                )}
                {classSectionName && (
                  <Grid item xs={12} sm={12} md={6}>
                    <KenChip
                      className={classes.chipHeadings}
                      label={classSectionName}
                      style={{
                        backgroundColor: '#FDEECF',
                        color: '#B49353',
                        //   width: '100%',
                      }}
                    />
                  </Grid>
                )}

                {/* Published on */}
                <Grid item xs={12} sm={12} md={6}>
                  <CalendarTodayOutlinedIcon className={classes.icons} />
                  <Typography className={classes.headings} component="span">
                    Published on
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <KenChip
                    className={classes.chipHeadings}
                    label={data?.date}
                    style={{
                      backgroundColor: '#FFD7D1',
                      color: '#B17373',
                      //   width: '100%',
                    }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} sm={12} md={6}>
                  <ScheduleOutlinedIcon className={classes.icons} />
                  <Typography className={classes.headings} component="span">
                    Time
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <KenChip
                    className={classes.chipHeadings}
                    label={quizTime}
                    style={{
                      backgroundColor: '#DFE8FF',
                      color: '#648DFC',
                      //   width: '100%',
                    }}
                  />
                </Grid>
                {/* Total Marks */}
                <Grid item xs={12} sm={12} md={6}>
                  <StarBorderOutlinedIcon className={classes.icons} />
                  <Typography className={classes.headings} component="span">
                    Total Marks
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <KenChip
                    className={classes.chipHeadings}
                    label={`${quizInstructions?.totalmarks} Marks`}
                    style={{
                      backgroundColor: '#C8ECE3',
                      color: '#5EA67B',
                      //   width: '100%',
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item container xs={12} sm={8} md={8} spacing={1}>
          <Grid item xs={12}>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {/* <Typography component="span">
                  <img src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-info-icon.png'} alt="info" />
                </Typography> */}
                <ErrorOutlineOutlinedIcon />
                <Typography
                  component="span"
                  pl={1}
                  className={classes.instruction}
                >
                  Important Instructions & Guidelines
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {parse(`${quizInstructions?.description}`)}
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ minHeight: '500px' }} elevation={1}>
              <AssessmentPreviewQuestionList data={quizData} />{' '}
            </Paper>
          </Grid>
        </Grid>
        {/* <Grid item container xs={12} spacing={1}>
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
                  />
                )}
              </Grid>
            </Grid> */}
      </Grid>
      {/* </Paper> */}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={3000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
    </Box>
  );
}
