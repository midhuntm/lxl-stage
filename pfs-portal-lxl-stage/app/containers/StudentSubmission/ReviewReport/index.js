import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import KenAutoComplete from '../../../components/KenAutoComplete';
// import KenCard from '../../../global_components/KenCard';
// import KenCheckbox from '../../../global_components/KenCheckbox';
// import KenTextArea from '../../../global_components/KenTextArea';
import KenInputField from '../../../components/KenInputField';
import KenButton from '../../../global_components/KenButton';
// import FeedBack from './components/feedback';
// import ProfileChange from './components/profileChange';
import FileSubmission from '../../Assignment/AssignmentReview/components/OriginalityReport/components/fileSubmission';
import OnlineTest from '../../Assignment/AssignmentReview/components/OriginalityReport/components/onlineTest';
import { useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes.json';
import {
  gradeAssignment,
  assignGetSubmissionStatus,
} from '../../../utils/ApiService';
// import ViewSDKClient from "../../../../ViewSDKClient/ViewSDKClient";
import KenEditor from '../../../global_components/KenEditor';
import KenLoader from '../../../components/KenLoader';

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

export default function ReviewReport(props) {
  const { cmid, contactId } = props;
  const [lmsToken, setLmstoken] = React.useState(
    localStorage.getItem('fileToken')
  );
  const classes = useStyles();
  // const [previewData, setPreviewData] = React.useState({})
  // const [usersLists, setUsersLists] = React.useState([])
  // const [userName, setUsername] = React.useState('')
  const [fileUrl, setFileUrl] = React.useState('');
  const [file, setFile] = React.useState(false);
  const [onlineTest, setOnlineTest] = React.useState(false);
  const [onlineTestContent, setOnlineTestContent] = React.useState('');
  const [onlineDesc, setOnlineDesc] = React.useState('');
  const [marks, setMarks] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [currentStudent, setCurrentStudent] = React.useState([])
  //   const [reviewPlugin, setReviewPlugin] = React.useState([])
  // const [reviewPlugin, setReviewPlugin] = React.useState(submissionRes?.lastattempt?.submission?.plugins)
  const history = useHistory();
  // const [openSnackbar, setOpenSnackbar] = React.useState(false);
  // const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  // const [snackbarMessage, setSnackbarMessage] = React.useState('');
  // const [handleActionClick, setHandleActionClick] = React.useState(false)
  const [maxGrade, setMaxGrade] = React.useState(null);

  useEffect(() => {
    setLoading(true);
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
        // setReviewPlugin(res?.lastattempt?.submission?.plugins)
        setMarks(parseFloat(feedbackGrade).toFixed(0));
        setComments(feedbackText);

        setMaxGrade(res?.gradingsummary?.maxgrade);

        let feedbackPluginData = res?.feedback?.plugins;
        let lastattemptData = res?.lastattempt?.submission?.plugins;
        let lastAttemptOnlineTextData = lastattemptData.filter(
          item => item?.type == 'onlinetext'
        );
        let feedbackOnlineTextData = feedbackPluginData.filter(
          item => item?.type == 'onlinetext'
        );

        let fileTestData = feedbackPluginData.filter(
          item => item?.type == 'file'
        );

        if (feedbackOnlineTextData.length > 0) {
          setOnlineDesc(
            feedbackOnlineTextData[0]?.editorfields[0]?.description || 0
          );
          setOnlineTestContent(feedbackOnlineTextData[0]?.editorfields[0].text);
          setOnlineTest(true);
          setLoading(false);
        }
        if (
          feedbackOnlineTextData.length == 0 &&
          lastAttemptOnlineTextData.length > 0
        ) {
          setOnlineDesc(
            lastAttemptOnlineTextData[0]?.editorfields[0]?.description || 0
          );
          setOnlineTestContent(
            lastAttemptOnlineTextData[0]?.editorfields[0].text
          );
          setOnlineTest(true);
          setLoading(false);
        }
        if (
          fileTestData.length > 0
          //   &&
          //   fileTestData[0] &&
          //   fileTestData[0]['fileareas'] &&
          //   fileTestData[0]['fileareas'][0] &&
          //   fileTestData[0]['fileareas'][0]['files'] &&
          //   fileTestData[0]['fileareas'][0]['files']?.length > 0
        ) {
          setFile(true);
          console.log(fileTestData[0]);
          let fileurl =
            fileTestData[0]?.fileareas[0]?.files[0]?.fileurl +
            `?token=${lmsToken}`;
          console.log(fileurl);
          setFileUrl(fileurl);
          setLoading(false);
        } else {
          setOnlineTest(false);
          setFile(false);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('error in Assignment Instructions', err);
      });
  }, []);

  return (
    <div>
      {loading && <KenLoader />}
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item md={9}>
            {file && (
              <Box p={2} className={classes.innerContainer}>
                <div style={{ width: '100%', height: '500px' }}>
                  <FileSubmission url={fileUrl} />
                </div>
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
                <Grid item xs={12} md={8}>
                  <Grid className={classes.gradeBox}>
                    <KenInputField
                      name="marks"
                      label={<span className={classes.labelText}>Grade</span>}
                      placeholder=""
                      value={marks}
                      disabled
                      // onChange={handleGrade}
                    />
                    <p className={classes.perText}>/ {maxGrade}</p>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <KenEditor
                    placeholder="A fully worked answer or link for more information."
                    label={<span className={classes.labelText}>Feedback</span>}
                    value={comments}
                    content={comments}
                    disabled
                    // handleChange={e => { setComments(e); }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
