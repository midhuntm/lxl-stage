import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { getQuizReport } from '../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import configContext from '../../../utils/helpers/configHelper';
// import firebase from 'firebase/app';
// import 'firebase/analytics';
import QuizReportGrid from './quizReportGrid';

import { Box, Grid, Typography } from '@material-ui/core';
import KenCard from '../../../global_components/KenCard';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import KenLoader from '../../../components/KenLoader';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    minHeight: '100%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  courseCardGrid: {
    maxHeight: 375,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 20,
    margin: '0 -20px',
  },
  border: {
    boxShadow: `inset 6px 0px 0px ${theme.palette.KenColors.primary}`,
  },
  bottomDivider: {
    border: `1px solid ${theme.palette.KenColors.kenWhite}`,
    background: theme.palette.KenColors.kenWhite,
    padding: 10,
    marginBottom: 12,
  },
  tableContainer: {
    marginTop: '20px',
  },
  btnLabels: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'none',
  },
  headerBtn: {
    marginLeft: '10px',
    minWidth: '100px',
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
  subHeading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '400',
  },
  closeIcon: {
    height: 'max-content',
  },
  switchLabel: {
    padding: '0px 5px',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '100%',
    textTransform: 'uppercase',
    color: theme.palette.KenColors.neutral400,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.KenColors.primary,
  },
  typoPlagiarism: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
  },
  noRecord: {
    fontSize: 16,
    fontWeight: 600,
    margin: '30px 0px',
  },

}));

const QuizReviewPage = props => {
  const { t } = useTranslation();
  const { history } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { quizId } = props.location.state;
  const [students, setStudents] = useState([]);
  const [quizInfo, setQuizInfo] = useState();
  const [cards, setCards] = useState([]);

  const [noData, setNoData] = useState(t('messages:Fetching_Data'));

  const { config } = useContext(configContext);

  const tableTitle = 'Students Lists';

  // React.useEffect(() => {
  //   const firebaseConfig = config.firebaseConfig;
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app(); // if already initialized, use that one
  //   }
  //   const firebaseAnalytics = firebase.analytics();
  //   const ContactType = JSON.parse(localStorage.getItem('userDetails')).Type;
  //   firebaseAnalytics.logEvent(`${config.orgID}_${ContactType}_students`);
  // }, []);

  useEffect(() => {
    setNoData(t('messages:Fetching_Data'));
    setLoading(true);
    let payload = {
      quizid: quizId,
      method: 'get',
    };

    getQuizReport(payload)
      .then(res => {
        if (res?.users?.length > 0) {
          let users = res?.users;
          let quizInfo = res;

          let students = users.map((item, idx) => {
            item['contactName'] = item['firstname'] + ' ' + item['lastname'];
            item['index'] = idx + 1;
            item['status'] =
              item?.totalattempts === 0 ? 'Not attempted' : 'Attempted';
            item['action'] = item?.totalattempts > 0;
            // item['attemptId'] = 56
            return item;
          });
          setStudents(students);
          setQuizInfo(quizInfo);
          setLoading(false);
        } else {
          setNoData(t('No_Records'));
        }
      })
      .catch(err => {
        setNoData(t('No_Records'));
      });
  }, []);
  useEffect(() => {
    setCards([
      {
        key: 'quizdate',
        title: 'Quiz Date & Time',
        value: `${quizInfo && quizInfo !== null ? moment.unix(quizInfo?.startdate).format('LLL') : 'NA'}`,
        value2: `${quizInfo && quizInfo !== null ? moment.unix(quizInfo?.enddate).format('LLL') : 'NA'}`,
        typoTitle: {
          color: '#35714D',
          fontSize: 12,
        },
        typoValue: {
          color: '#35714D',
          fontSize: 20,
          fontWeight: 'bold',
        },
        container: {
          background: '#C8ECE3',
          borderRadius: 3,
          padding: 16,
          minWidth: 200,
          marginBottom: 15,
        },
      },
      {
        title: 'Total Grade for the Quiz',
        value: `${quizInfo && quizInfo !== null ? quizInfo?.grade : 'NA'}`,
        typoTitle: {
          color: '#35714D',
          fontSize: 12,
        },
        typoValue: {
          color: '#35714D',
          fontSize: 24,
          fontWeight: 'bold',
        },
        container: {
          background: '#C8ECE3',
          borderRadius: 3,
          padding: 16,
          minWidth: 180,
          marginBottom: 15,
        },
      },
      {
        title: 'Total Attempts',
        value: `${quizInfo && quizInfo !== null ? quizInfo?.totalattempts : 'NA'}`,
        typoTitle: {
          color: '#35714D',
          fontSize: 12,
        },
        typoValue: {
          color: '#35714D',
          fontSize: 24,
          fontWeight: 'bold',
        },
        container: {
          background: '#C8ECE3',
          borderRadius: 3,
          padding: 16,
          minWidth: 160,
          marginBottom: 15,
        },
      },
      {
        title: 'Total Questions',
        value: `${quizInfo && quizInfo !== null ? quizInfo?.totalquestions : '0'}`,
        typoTitle: {
          color: '#35714D',
          fontSize: 12,
        },
        typoValue: {
          color: '#35714D',
          fontSize: 24,
          fontWeight: 'bold',
        },
        container: {
          background: '#C8ECE3',
          borderRadius: 3,
          padding: 16,
          minWidth: 160,
          marginBottom: 15,
        },
      },
    ]);
  }, [quizInfo]);
  // const handleSubmit = studentId => {
  //     history.push({
  //         pathname: `/studentDetails/${studentId}`,
  //     });
  // };

  // const handleMarks = e => {
  //     setConsolidated(e.target.checked);

  return (
    <div>
      {loading && <KenLoader />}
      <KenCard>
        <Box m={1}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.heading}>
                {quizInfo?.quiz}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </KenCard>
      <Box mt={2}>
        <KenCard>
          <Box m={2}>
            <Grid container spacing={1} direction="row">
              {cards.map(el => {
                return (
                  <Grid item style={{ marginRight: 16 }}>
                    <>
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        style={el.container}
                      >
                        {el?.key == "quizdate" ?
                          <>
                            <Grid item>
                              <Typography style={el.typoTitle}>{el.title}</Typography>
                            </Grid>
                            <div style={{ display: 'flex', margin: 10 }}>
                              <Typography style={el.typoValue}>{el.value} -&nbsp; </Typography>
                              <Typography style={el.typoValue}>{el.value2}</Typography>
                            </div>
                          </> :
                          <>
                            <Grid item>
                              <Typography style={el.typoTitle}>{el.title}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography style={el.typoValue}>{el.value}</Typography>
                            </Grid>
                          </>
                        }
                      </Grid>
                    </>
                  </Grid>
                );
              })}
            </Grid>
            {students.length ? (
              <QuizReportGrid
                title={tableTitle}
                data={students}
                loading={loading}
                noData={noData}
                quizId={quizId}
                quizInfo={quizInfo}
              />
            ) : (
              <p className={classes.noRecord}>No records found</p>
            )}
          </Box>
        </KenCard>
      </Box>
    </div>
  );
  {
    /* <div>
            <div className={classes.tableContainer}>
                <Box mt={2}>
                    <QuizReportGrid
                        title={tableTitle}
                        data={students}
                        loading={loading}
                        noData={noData}
                    />
                </Box>
            </div>
        </div> */
  }
};

export default withRouter(QuizReviewPage);
