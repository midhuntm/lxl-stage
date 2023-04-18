import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
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
import Routes from '../../../../../utils/routes.json';
import {
  gradeAssignment,
  assignGetSubmissionStatus,
  wsAssignLockSubmission,
} from '../../../../../utils/ApiService';
// import ViewSDKClient from "../../../../ViewSDKClient/ViewSDKClient";
import KenEditor from '../../../../../global_components/KenEditor';
import KenLoader from '../../../../../components/KenLoader';
import PDFAnnotateViewer from './pdfAnnotateViewer';
import moment from 'moment';
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
    cmid,
    contactId,
  } = props?.history?.location?.state;
  const [lmsToken, setLmstoken] = React.useState(
    localStorage.getItem('fileToken')
  );
  const classes = useStyles();
  const [previewData, setPreviewData] = React.useState({});
  const [usersLists, setUsersLists] = React.useState([]);
  const [userName, setUsername] = React.useState('');
  const [fileUrl, setFileUrl] = React.useState('');
  const [file, setFile] = React.useState(false);
  const [onlineTest, setOnlineTest] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [onlineTestContent, setOnlineTestContent] = React.useState('');
  const [onlineDesc, setOnlineDesc] = React.useState('');
  const [marks, setMarks] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [currentStudent, setCurrentStudent] = React.useState([]);
  const [currentStudentDetails, setCurrentStudentDetails] = React.useState([]);
  const [reviewPlugin, setReviewPlugin] = React.useState([]);
  // const [reviewPlugin, setReviewPlugin] = React.useState(submissionRes?.lastattempt?.submission?.plugins)
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [handleActionClick, setHandleActionClick] = React.useState(false);
  const [maxGrade, setMaxGrade] = React.useState(null);
  const [isEdited, setIsEdited] = React.useState(false);
  const [annotatedPDFData, setAnnotatedPDFData] = React.useState('');

  useEffect(() => {
    setLoading(true);
    let lists = [];
    submittedUsers.map(item => {
      let obj = {};
      obj['label'] = item?.username;
      obj['userInfo'] = item;
      obj['value'] = item?.username;
      lists.push(obj);
    });
    let currStudent = submittedUsers.filter(item => item?.userid == contactId);
    let csd = [];
    submittedUsers.filter(item => {
      if (item?.userid == contactId) {
        csd.push(item);
      }
    });
    setCurrentStudent(currStudent);
    setCurrentStudentDetails(csd);
    setUsersLists(lists);

    const payload = {
      method: 'post',
      cmid: cmid,
      contactid: contactId,
      groupid: 0,
    };
    assignGetSubmissionStatus(payload)
      .then(res => {
        let feedbackGrade = res?.feedback?.grade?.grade || 0;
        let feedbackcomments =
          res?.feedback?.plugins?.filter(item => item.type == 'comments') || [];
        let feedbackText =
          feedbackcomments.length > 0
            ? feedbackcomments[0]?.editorfields[0]?.text
            : '';
        let reviewPluginData;
        let feedbackFile =
          (res?.feedback &&
            res?.feedback?.plugins.filter(item => item?.type == 'file')) ||
          [];

        if (
          res?.feedback &&
          feedbackFile.length > 0 &&
          feedbackFile[0]?.fileareas[0]?.files.length > 0
        ) {
          reviewPluginData = res?.feedback?.plugins;
        } else {
          reviewPluginData = res?.lastattempt?.submission?.plugins;
        }

        let onlineTestData = (res?.lastattempt?.submission?.plugins).filter(
          item => item?.type == 'onlinetext'
        );
        let fileTestData = reviewPluginData.filter(
          item => item?.type == 'file'
        );

        setMarks(parseFloat(feedbackGrade).toFixed(0));
        setComments(feedbackText);
        setMaxGrade(res?.gradingsummary?.maxgrade);
        // let reviewPluginData = res?.lastattempt?.submission?.plugins
        let onlinetestmodule = false;
        let filetestmodule = false;

        if (
          onlineTestData.length > 0 &&
          String(onlineTestData[0]?.editorfields[0]?.text).length > 0
        ) {
          setOnlineDesc(onlineTestData[0]?.editorfields[0]?.description || 0);
          setOnlineTestContent(onlineTestData[0]?.editorfields[0].text);
          onlinetestmodule = true;
        }
        if (
          fileTestData.length > 0 &&
          fileTestData[0]?.fileareas[0]?.files?.length > 0
        ) {
          console.log(fileTestData[0]);
          let fileurl =
            fileTestData[0]?.fileareas[0]?.files[0]?.fileurl +
            `?token=${lmsToken}`;
          setFileUrl(fileurl);
          filetestmodule = true;
        }

        setOnlineTest(onlinetestmodule);
        setFile(filetestmodule);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('error in Assignment Instructions', err);
      });
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
    setLoading(true);
    setHandleActionClick(true);
    setOnlineTest(false);
    setFile(false);

    const payload = {
      cmid: cmid,
      contactid: e.userInfo.contactId,
      groupid: 0,
    };
    assignGetSubmissionStatus(payload)
      .then(res => {
        let feedbackGrade = res?.feedback?.grade?.grade || 0;
        let feedbackcomments =
          res?.feedback?.plugins?.filter(item => item.type == 'comments') || [];
        let feedbackText =
          feedbackcomments.length > 0
            ? feedbackcomments[0]?.editorfields[0]?.text
            : '';
        setMarks(parseFloat(feedbackGrade).toFixed(0));
        setComments(feedbackText);
        setMaxGrade(res?.gradingsummary?.maxgrade);
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
        console.log(csd);

        let onlinetestmodule = false;
        let filetestmodule = false;
        if (
          onlineTestData.length > 0 &&
          onlineTestData[0]?.editorfields[0]?.text.length > 0
        ) {
          setOnlineDesc(onlineTestData[0]?.editorfields[0]?.description || 0);
          setOnlineTestContent(onlineTestData[0]?.editorfields[0].text);
          onlinetestmodule = true;
        }
        if (
          fileTestData.length > 0 &&
          fileTestData[0]?.fileareas[0]?.files?.length > 0
        ) {
          console.log(fileTestData[0]);
          let fileurl =
            fileTestData[0]?.fileareas[0]?.files[0]?.fileurl +
            `?token=${lmsToken}`;
          setFileUrl(fileurl);
          filetestmodule = true;
        }
        setOnlineTest(onlinetestmodule);
        setFile(filetestmodule);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setSnackbarMessage('Something went wrong...!');
        console.log('error in Assignment Instructions', err);
      });
  };

  const handleGrade = e => {
    let val = e.target.value;
    if (val <= maxGrade) {
      setMarks(Number(e.target.value));
    } else {
      alert(`Grade should not be greater than ${maxGrade}`);
    }
  };

  const assignmentGrading = () => {
    console.log('annotatedPDFData', annotatedPDFData);
    setLoading(true);
    const payload = {
      assignmentid: cmid,
      contactid: !handleActionClick ? contactId : currentStudent,
      mark: Number(marks).toFixed(0),
      comment: comments,
      filename: `${currentStudentDetails[0].username +
        '_' +
        moment().valueOf()}.pdf`,
      filecontent: String(annotatedPDFData),
    };
    gradeAssignment(payload)
      .then(res => {
        const payload = {
          cmid: cmid,
          contactid: !handleActionClick ? contactId : currentStudent,
        };
        wsAssignLockSubmission(payload)
          .then(res => {
            setSnackbarMessage('Assignment Grade Succes');
            setLoading(false);
            setTimeout(() => {
              history.push({
                pathname: Routes?.assignmentReview,
                state: {
                  quizId: cmid,
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
        setLoading(false);
        console.log('error in Assignment Instructions', err);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const getAnnotatedData = React.useCallback(
    data => {
      if (data) {
        setAnnotatedPDFData(data?.data?.pdfData);
        setIsEdited(true);
      }
    },
    [fileUrl]
  );

  return (
    <div>
      {loading && <KenLoader />}
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
            {/* <div style={{ width: '100%', height: '500px' }}>
                  <FileSubmission url={fileUrl} />
                </div> */}

            {/* <iframe src={fileUrl} width="100%" height="500px" /> */}
            <Box p={2} className={classes.innerContainer}>
              <PDFAnnotateViewer
                file={file}
                getAnnotatedData={getAnnotatedData}
                fileUrl={fileUrl}
              />
            </Box>
            {/* <div className="webviewer" ref={viewer} style={{ height: "500px" }}></div> */}

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
                    <p className={classes.perText}>/ {maxGrade}</p>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {/* <KenTextArea
                    label={<span className={classes.labelText}>Feedback</span>}
                    multiline={true}
                    minRows={3}
                    placeholder="A fully worked answer or link for more information."
                    name="comments"
                    value={comments}
                    onChange={handelFeedBack}
                  /> */}
                  <KenEditor
                    placeholder="A fully worked answer or link for more information."
                    label={<span className={classes.labelText}>Feedback</span>}
                    value={comments}
                    content={comments}
                    handleChange={e => {
                      setComments(e);
                    }}
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
                  <KenButton buttonClass={classes.redoBtn} onClick={onBackList}>
                    Cancel
                  </KenButton>
                  <KenButton
                    variant={'primary'}
                    className={classes.backListText}
                    onClick={assignmentGrading}
                    disabled={!isEdited}
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
