import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenAutoComplete from '../../../../../components/KenAutoComplete';
import KenCard from '../../../../../global_components/KenCard';
import KenCheckbox from '../../../../../global_components/KenCheckbox';
import KenTextArea from '../../../../../global_components/KenTextArea';
import KenInputField from '../../../../../components/KenInputField';
import KenButton from '../../../../../global_components/KenButton';
import FeedBack from './components/feedback';
import ProfileChange from './components/profileChange';
import FileSubmission from './components/fileSubmission';
import OnlineTest from './components/onlineTest';
import { useHistory } from 'react-router-dom';
import KenSnackbar from '../../../../../components/KenSnackbar/index';
import {
  gradeAssignment,
  assignGetSubmissionStatus,
} from '../../../../../utils/ApiService';
import Routes from '../../../../../utils/routes.json';
import { wsAssignLockSubmission } from '../../../../../../utils/ApiService';

const useStyles = makeStyles(theme => ({
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
  innerContainer: {
    background: theme.palette.KenColors.kenWhite,
  },
  labelText: {
    color: '#061938',
    fontSize: 12,
  },
  gradeBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  perText: {
    width: '25%',
    paddingTop: 15,
    marginLeft: 10,
    fontSize: 14,
  },
  backListText: {
    background: '#092682',
    borderRadius: 3,
    padding: '8px 12px',
    color: '#FFFFFF',
    fontSize: 14,
  },
  redoBtn: {
    background: '#FFE9E7',
    borderRadius: 3,
    color: '#EF4060',
    fontSize: 12,
  },
}));

export default function OriginalityReport(props) {
  const {
    submittedUsers,
    submissionHeading,
    submissionRes,
    cmid,
    previewData,
  } = props?.history?.location?.state;
  const [lmsToken, setLmstoken] = React.useState(
    localStorage.getItem('fileToken')
  );
  const classes = useStyles();
  const [usersLists, setUsersLists] = React.useState([]);
  const [userName, setUsername] = React.useState('');
  const [fileUrl, setFileUrl] = React.useState('');
  const [file, setFile] = React.useState(false);
  const [onlineTest, setOnlineTest] = React.useState(true);
  const [onlineTestContent, setOnlineTestContent] = React.useState('');
  const [onlineDesc, setOnlineDesc] = React.useState('');
  const [marks, setMarks] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [currentStudent, setCurrentStudent] = React.useState([]);
  const [currentStudentDetails, setCurrentStudentDetails] = React.useState([]);
  const [reviewPlugin, setReviewPlugin] = React.useState(
    submissionRes?.lastattempt?.submission?.plugins
  );
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  useEffect(() => {
    let lists = [];
    submittedUsers.map(item => {
      let obj = {};
      obj['label'] = item.username;
      obj['userInfo'] = item;
      obj['value'] = item.username;
      lists.push(obj);
    });
    let onlineTestData = reviewPlugin.filter(item => item.type == 'onlinetext');
    let fileTestData = reviewPlugin.filter(item => item.type == 'file');
    let currStudent = submittedUsers.filter(
      item => item.userid == previewData.contactId
    );
    let csd = [];
    submittedUsers.filter(item => {
      if (item.userid == previewData.contactId) {
        csd.push(item);
      }
    });
    setCurrentStudent(currStudent);
    setCurrentStudentDetails(csd);
    if (onlineTestData.length > 0) {
      setOnlineDesc(onlineTestData[0]?.editorfields[0]?.description || 0);
      setOnlineTestContent(onlineTestData[0].editorfields[0].text);
      setOnlineTest(true);
    }
    if (fileTestData.length > 0) {
      setFile(true);
      console.log(fileTestData[0]);
      let fileurl =
        fileTestData[0]?.fileareas[0]?.files[0]?.fileurl + `&token=${lmsToken}`;
      console.log(fileurl);
      setFileUrl(fileurl);
    } else {
      setOnlineTest(false);
      setFile(false);
    }
    let fileData = [];
    setUsersLists(lists);
    setMarks(previewData.feedbackGrade);
    setComments(previewData.feedbackText);
  }, []);

  const handelFeedBack = e => {
    setComments(e.target.value);
  };
  const onBackList = () => {
    history.push({
      pathname: Routes?.assignmentReview,
      state: {
        quizId: cmid,
        submissionHeading: submissionHeading,
      },
    });
  };
  const handleStudents = e => {
    setOnlineTest(false);

    const payload = {
      cmid: cmid,
      contactid: e.userInfo.contactId,
      groupid: 0,
    };
    assignGetSubmissionStatus(payload)
      .then(res => {
        let feedbackGrade = res.feedback?.grade?.grade;
        let feedbackcomments = res.feedback?.plugins?.filter(
          item => item.type == 'comments'
        );
        let feedbackText = feedbackcomments[0]?.editorfields[0]?.text;
        setMarks(feedbackGrade);
        setComments(feedbackText);

        setTimeout(() => {
          // let lists = []
          // let obj = {}
          // obj['label'] = e.userInfo.username
          // obj['userInfo'] = e.userInfo
          // obj['value'] = e.userInfo.username
          // lists.push(obj)
          let onlineTestData = e.userInfo.plugins.filter(
            item => item.type == 'onlinetext'
          );
          let fileTestData = e.userInfo.plugins.filter(
            item => item.type == 'file'
          );
          let currStudent = e.userInfo.contactId;
          setCurrentStudent(currStudent);
          let csd = [e.userInfo];
          setCurrentStudentDetails(csd);
          if (onlineTestData.length > 0) {
            setOnlineDesc(onlineTestData[0]?.editorfields[0]?.description || 0);
            setOnlineTestContent(onlineTestData[0].editorfields[0].text);
          }
          if (fileTestData.length > 0) {
            setFile(true);
            console.log(fileTestData[0]);
            let fileurl =
              fileTestData[0]?.fileareas[0]?.files[0]?.fileurl +
              `&token=${lmsToken}`;
            setFileUrl(fileurl);
          } else {
            setOnlineTest(false);
            setFile(false);
          }
          setOnlineTest(true);
        }, 100);
        // history.push({
        //   pathname: '/assignment/originalityReport',
        //   state: {
        //     submissionRes: res,
        //     submittedUsers: submittedUsers,
        //     submissionHeading: submissionHeading,
        //     cmid: cmid,
        //     previewData: {
        //       contactId: contactId,
        //       feedbackGrade: feedbackGrade,
        //       feedbackText: feedbackText
        //     }
        //   }
        // })
      })
      .catch(err => {
        console.log('error in Assignment Instructions', err);
      });
  };

  const handleGrade = e => {
    setMarks(e.target.value);
  };

  const assignmentGrading = () => {
    const payload = {
      assignmentid: cmid,
      contactid: previewData.contactId,
      mark: marks,
      comment: comments,
    };
    gradeAssignment(payload)
      .then(res => {
        const payload = {
          cmid: cmid,
          contactid: previewData.contactId,
        };
        wsAssignLockSubmission(payload)
          .then(res => {
            console.log('Assignment locked', res);
            setSnackbarMessage('Assignment graded Successfully');
            setTimeout(() => {
              history.push({
                pathname: Routes?.assignmentReview,
                state: {
                  cmid: cmid,
                  submissionHeading: submissionHeading,
                },
              });
            }, 1000);
          })
          .catch(err => {
            console.log('error in locking assignment', err);
          });
      })

      .catch(err => {
        console.log('error in Assignment Instructions', err);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div>
      <KenCard>
        <Box m={1}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.heading}>
                {submissionHeading}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography className={classes.typoPlagiarism}>
                Check plagiarism activated{' '}
              </Typography>
            </Grid> */}
            <KenButton
              className={classes.backListText}
              variant={'primary'}
              onClick={onBackList}
            >
              Back to List
            </KenButton>
          </Grid>
        </Box>
      </KenCard>
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item md={9}>
            {file && (
              <Box p={2} className={classes.innerContainer}>
                {/* <FileSubmission url={fileUrl} /> */}
                <iframe src={fileUrl} width="100%" height="500px" />
              </Box>
            )}
            {onlineTest && (
              <Box p={2} className={classes.innerContainer}>
                <OnlineTest
                  disabled={true}
                  description={onlineDesc}
                  content={onlineTestContent}
                />
              </Box>
            )}
          </Grid>
          <Grid item md={3}>
            <Box p={2} className={classes.innerContainer}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <KenAutoComplete
                    options={usersLists}
                    placeholder="Search..."
                    setData={handleStudents}
                    // setData={handleSelection}
                  />
                </Grid>
                <Grid item xs={12}>
                  {onlineTest && (
                    <ProfileChange
                      submittedUsers={currentStudentDetails}
                      currentStudent={currentStudent}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid className={classes.gradeBox}>
                    <KenInputField
                      name="marks"
                      label={<span className={classes.labelText}>Grade</span>}
                      placeholder=""
                      value={marks}
                      onChange={handleGrade}
                    />
                    <p className={classes.perText}>/ 100</p>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <KenTextArea
                    label={<span className={classes.labelText}>Feedback</span>}
                    multiline={true}
                    minRows={3}
                    placeholder="A fully worked answer or link for more information."
                    name="comments"
                    value={comments}
                    onChange={handelFeedBack}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <KenButton buttonClass={classes.redoBtn}>Redo</KenButton>
                  <KenButton
                    variant={'primary'}
                    className={classes.backListText}
                    onClick={assignmentGrading}
                  >
                    Grade
                  </KenButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <KenSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          autoHideDuration={5000}
          open={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          position="Bottom-Right"
        />
      </Box>
    </div>
  );
}
