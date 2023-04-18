import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import KenSelect from '../../components/KenSelect';
const forumAnimation =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/forumAnimation.svg';
import noDiscussionFound from '../../assets/icons/noDiscussionFound.svg';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import KenButton from '../../global_components/KenButton';
import KenLoader from '../../components/KenLoader';
import { getForumDiscussions, getCourses } from '../../utils/ApiService';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import DiscussionForum from './DiscussionForum';
import CreateDiscussionDialog from './DiscussionForum/Components/CreateDiscussionDialog';
import KenSnackBar from '../../components/KenSnackbar';

const useStyles = makeStyles(theme => ({
  heading: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    color: '#00218D',
  },
  boxDesign: {
    height: '100%',
    // display: 'flex',
    // alignItems: 'center',
    padding: '16px',
    background: '#FAFBFC',
    borderRadius: '3px',
    overFlow: 'hidden',
  },
  optionsText: {
    fontSize: 13,
    color: theme.palette.KenColors.neutral400,
  },
  uploadContainer: {
    border: `1px dashed ${theme.palette.KenColors.neutral100}`,
  },
  typoUpload: {
    fontSize: 12,
    color: theme.palette.KenColors.kenBlack,
    marginTop: 24,
    marginBottom: 8,
  },
  typoDrag: {
    fontSize: 14,
    color: theme.palette.KenColors.kenBlack,
    fontWeight: 600,
  },
  typoBrowse: {
    fontSize: 14,
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
  },
  containerBrowse: {
    border: `0.6px solid #B3BAC5`,
  },
  typoImgDes: {
    fontSize: 12,
  },
  dropzone: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  progress: {
    color: theme.palette.KenColors.green,
  },
  deleteIcon: {
    color: theme.palette.KenColors.red,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Discussion(props) {
  const {
    forumID,
    forumSubject,
    lastDate,
    status,
    discussionId,
  } = props?.location?.state;

  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState();
  const { t } = useTranslation();

  /* get courses details */
  const [loading, setLoading] = React.useState(false);
  const profile = getUserDetails();
  const contactId = profile?.ContactId;
  const [responseData, setResponseData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [subjectOption, setSubjectoption] = useState([]);
  const [sectionOption, setSectionOption] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedClassName, setSelectedClassName] = React.useState(null);
  const [selectedSubjectName, setSelectedSubjectName] = React.useState();
  const [selectedSectionName, setSelectedSectionName] = React.useState();
  const [selectedTerms, setSelectedTerms] = React.useState([]);

  // responseData
  const [dataCheck, setDataCheck] = useState(false);
  const [discussionData, setDiscussionData] = useState([]);

  // Action call
  const [actionCall, setActionCall] = useState(false);

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('error');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  /* Fetch Forum Discussions API*/
  useEffect(() => {
    setLoading(true);
    let payload = {
      forumid: forumID,
      contactid: contactId,
    };

    getForumDiscussions(payload)
      .then(res => {
        setLoading(false);
        if (res?.discussions.length > 0) {
          setDataCheck(true);
          setDiscussionData(res?.discussions);
        } else {
          setDataCheck(false);
        }
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('error', t('translations:Something_Wrong'));
        console.log('Forum Discussions', err);
      });
    setActionCall(false);
  }, [actionCall]);

  /* API Integration  */
  React.useEffect(() => {
    setLoading(true);
    getCourses(contactId)
      .then(response => {
        setLoading(false);
        setResponseData(response);
      })
      .catch(err => {
        setLoading(false);
        console.log('get Courses err', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCourses(responseData);
  }, [responseData]);

  useEffect(() => {
    if (responseData?.length > 0) {
      let classOption = [];
      const classNameArray = [
        ...new Set(responseData?.map(item => item.accountname)),
      ];
      classNameArray?.map(item => {
        classOption.push({
          value: item,
          label: item,
        });
      });

      setClassOption(classOption);
      setSelectedClassName(classOption[0].value);
    }
  }, [responseData]);

  useEffect(() => {
    if (selectedClassName !== null) {
      let subOption = [];
      const subjectNameArray = [
        ...new Set(
          responseData?.map(item => {
            if (item?.accountname === selectedClassName) {
              return item?.hed__Course__cName;
            }
          })
        ),
      ];
      subjectNameArray?.map(subject => {
        if (subject) {
          subOption.push({
            value: subject,
            label: subject,
          });
        }
      });

      setSubjectoption(subOption);
      setSelectedSubjectName(subOption[0]?.value);
    }
  }, [selectedClassName]);

  const handleClassChange = value => {
    setSelectedClassName(value);
  };
  const handleSubChange = value => {
    setSelectedSubjectName(value);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Snackbar called

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  return (
    <Grid container spacing={2}>
      {loading && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <Grid item xs={12}>
        <Paper elevation={0} style={{ padding: '16px' }}>
          <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item md={10} sm={9} xs={6}>
              <Typography className={classes.heading}>
                {forumSubject}
              </Typography>
            </Grid>
            {/* <Grid item md={3} sm={3} xs={12}>
              <KenSelect
                options={classOption}
                label="Class"
                value={selectedClassName}
                defaultValue={e => {
                  handleClassChange(classOption[0]?.value);
                  return classOption[0]?.value;
                }}
                name="classOption"
                onChange={event => {
                  handleClassChange(event.target.value);
                }}
              />
            </Grid> */}

            {/* <Grid item md={3} sm={3} xs={12}>
              <KenSelect
                options={subjectOption}
                label="Subject"
                value={selectedSubjectName}
                defaultValue={e => {
                  handleSubChange(subjectOption[0]?.value);
                  return subjectOption[0]?.value;
                }}
                name="allsubject"
                onChange={event => {
                  handleSubChange(event.target.value);
                }}
              />
            </Grid> */}

            <Grid item md={2} sm={3} xs={6}>
              {dataCheck && (
                <KenButton
                  startIcon={<AddCircleOutlineIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  New discussion
                </KenButton>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {dataCheck && dataCheck === true ? (
          <DiscussionForum
            forumID={forumID}
            discussionData={discussionData}
            setDiscussionData={setDiscussionData}
            setLoading={setLoading}
            handleSnackbarOpen={handleSnackbarOpen}
            setActionCall={setActionCall}
            actionCall={actionCall}
            discussionId={discussionId}
          />
        ) : (
          <Box>
            {' '}
            <Grid spacing={2} container>
              <Grid
                item
                md={4}
                xs={12}
                sm={6}
                container
                spacing={2}
                style={{ marginTop: '16px', height: '480px', padding: '16px' }}
              >
                <Paper elevation={0} style={{ width: '100%' }}>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        borderBottom: '1px solid #F4F5F7',
                        marginBottom: '16px',
                        padding: '16px',
                      }}
                    >
                      All Discussions
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      padding: '16px',
                      background: '#FAFBFC',
                      borderRadius: '3px',
                    }}
                  >
                    <img src={forumAnimation} item />
                    <Typography item style={{ padding: '22px' }}>
                      Discussion added to this forum will be listed down here.
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item md={8} sm={6} xs={12}>
                <Paper
                  elevation={0}
                  style={{
                    marginTop: '25px',
                    height: '445px',
                    padding: '16px',
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img item src={noDiscussionFound} alt="" />
                    <Typography
                      style={{
                        marginBottom: '150px',
                        align: 'center',
                        color: '#00218D',
                      }}
                      item
                    >
                      No Discussions found
                    </Typography>
                    <KenButton
                      startIcon={<ControlPointIcon />}
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                      item
                    >
                      Create New discussion
                    </KenButton>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
      <CreateDiscussionDialog
        forumID={forumID}
        responseData={responseData}
        openDialog={openDialog}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        dataCheck={dataCheck}
        setDataCheck={setDataCheck}
        actionCall={actionCall}
        setActionCall={setActionCall}
        handleSnackbarOpen={handleSnackbarOpen}
        setLoading={setLoading}
      />
    </Grid>
  );
}
