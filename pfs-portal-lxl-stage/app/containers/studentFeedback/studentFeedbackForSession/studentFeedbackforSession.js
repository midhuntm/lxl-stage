import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Paper, Radio } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import KenButton from '../../../global_components/KenButton';
import RatingTable from '../../../components/RatingTable';
import KenRadioGroup from '../../../global_components/KenRadioGroup/index';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import KenLoader from '../../../components/KenLoader';
import { postStudentSessionFeedbackDetails } from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import KenSnackbar from '../../../components/KenSnackbar/index';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  amtTable: {
    width: '100%',
    height: 10,
  },
  cartBody: {
    padding: '20px',
    position: 'relative',
    backgroundColor: '#edeff1',
  },
  amtTable: {
    width: '100%',
    height: 10,
  },
  tableData1: {
    width: '80%',
    textAlign: 'left',
  },
  table: {
    padding: '10px',
  },
  studentInfo: {
    // color: "#00218D",
    fontSize: '14px',
    width: '25%',
    textAlign: 'left',
  },
  studentsInfo: {
    fontFamily: "'Roboto'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.44px',
    color: '#092682',
  },
  tableData: {
    width: '20%',
    textAlign: 'left',
  },
  studentInfoTitle: {
    fontFamily: "'Roboto'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.44px',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  tableTitle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.1px',
    color: '#092682',
  },
  tableTitle1: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.1px',
    color: '#092682',
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [propsData, setPropsData] = useState(props.location.state.data);
  const [facultyData, setFacultyData] = useState(propsData.item);
  const [ratingsData, setRatingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  console.log('facultyDatafacultyData', facultyData);

  const history = useHistory();
  const profile = getUserDetails();
  const arrayBreadCrumb = [
    {
      head: 'My Feedback',
      color: '#505F79',
      url: '/feedback',
    },
    {
      head: 'GMBA-Business Analytics',
    },
  ];

  const handleChange = (event, dataS, index) => {
    const newData = ratingsData;
    newData.forEach(item => {
      if (item.FeedbackTitle === dataS.FeedbackTitle) {
        item.rating = event.target.value;
      }
    });
    setRatingsData([...newData]);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const onSubmit = () => {
    // setLoading(true);
    const ratingArray = [];
    ratingsData.map(rating => {
      ratingArray.push({
        sessionFeedbackCollectionId: '',
        sessionId: facultyData.sessionId,
        rating: rating.rating,
        courseConnectionId: facultyData.courseConnectionId,
        feedBackParameters: rating.FeedbackTitle,
      });
    });

    console.log('ratingsData', ratingArray);
    const payload = {
      Operation: 'Create',
      SessionFeedbackCollection: ratingArray,
    };

    postStudentSessionFeedbackDetails(payload)
      .then(res => {
        setLoading(false);
        handleSnackbarOpen('success', 'Feedback Submitted.');
        history.push({
          pathname: `/feedback`,
          state: {},
        });
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('error', 'Something went wrong.');
        console.log(err);
      });
  };
  React.useEffect(() => {
    const params = facultyData.feedBackParameters.split(';');
    let data = [];
    params.map(item => {
      data.push({
        FeedbackTitle: item,
        rating: item.rating,
        recordType: facultyData.recordType,
      });
    });
    setRatingsData(data);
  }, []);

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      <Grid container spacing={3}>
        <Grid item md={12} style={{ padding: '0px' }} />
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box>
              <div
                style={{
                  display: 'flex',
                  marginBottom: 10,
                  textAlign: 'initial',
                  paddingLeft: '15px',
                }}
              >
                <Grid item container xs={6}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentInfoTitle}>
                      Session Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentsInfo}>
                      {propsData.Sessionname}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentInfoTitle}>
                      Session Code :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentsInfo}>
                      {facultyData.sessionId}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div
                style={{
                  display: 'flex',
                  marginBottom: 10,
                  textAlign: 'initial',
                  paddingLeft: '15px',
                }}
              >
                <Grid item container xs={6}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentInfoTitle}>
                      Faculty Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentsInfo}>
                      {facultyData.facultyName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentInfoTitle}>
                      Subject Code:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.studentsInfo}>
                      {facultyData.courseOfferingName}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Box>
            <RatingTable
              parameters={ratingsData}
              handleChange={handleChange}
              onSubmit={onSubmit}
            />
          </Paper>
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
    </div>
  );
}
