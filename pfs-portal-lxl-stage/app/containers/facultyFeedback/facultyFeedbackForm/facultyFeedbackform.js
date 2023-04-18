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
import { Card, CardContent, Grid, Paper, Radio } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import KenButton from '../../../global_components/KenButton';
import RatingTable from '../../../components/RatingTable';
import KenRadioGroup from '../../../global_components/KenRadioGroup/index';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import KenLoader from '../../../components/KenLoader';
import {
  postStudentFeedbackDetails,
  getChapterFeedbackSetup,
  postChapterFeedbackCollection,
} from '../../../utils/ApiService';
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
  const { courseData, data } = props.location.state;
  const [propsData, setPropsData] = useState(data);
  const [chapterId, setChapterId] = useState(propsData?.chapterID);
  const ContactId = JSON.parse(localStorage.getItem('userDetails'))?.ContactId;
  const [ratingsData, setRatingsData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
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

  const handlenextdata=()=>{
    handleSnackbarOpen('success', 'Feedback Submitted.');
    history.push({
      pathname: `/feedback`,
      state: {},
    });


  }
  const handleChange = (event, dataS, index, type) => {
    const newData = ratingsData;
    newData.forEach(item => {
      if (item.FeedbackTitle === dataS.FeedbackTitle) {
        if (type === 'Rating' || type === 'Descriptive' ) {
          return (item.rating = event.target.value);
        } else if (type === 'CheckBox') {
          if (event.target.checked) {
            return (item.rating = (index === 1 ? 'Yes': 'No'));
          }
        }
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
    setLoading(true);
    const payload = [];
    ratingsData.map(item => {
      payload.push({
        contactId: ContactId,
        category: item.recordType,
        chapterId: propsData?.chapterID,
        feedbckGivenByUser: item.rating,
        courseConnectionId: '',
      });
    });
    console.log('payload', payload);
    postChapterFeedbackCollection(payload)
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
  // React.useEffect(() => {
  //   const params = facultyData.feedbackParameter.split(';');
  //   let data = [];
  //   params.map(item => {
  //     data.push({
  //       FeedbackTitle: item,
  //       rating: item.rating,
  //       recordType: facultyData.recordType,
  //     });
  //   });
  //   setRatingsData(data);
  // }, []);

  React.useEffect(() => {
    setLoading(true);
    getChapterFeedbackSetup(chapterId, ContactId)
      .then(res => {
        console.log('res', res);
        let data = [];
        res?.feedbackSetupData.map(item => {
          data.push({
            FeedbackTitle: item?.question,
            rating: item?.rating,
            recordType: item?.category,
          });
        });
        setRatingsData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [chapterId]);
  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      <Grid container spacing={3}>
        <Grid item md={12} style={{ padding: '0px' }} />
        <Grid item xs={12}>
          <Paper className={classes.paper}>
        
            <RatingTable
              parameters={ratingsData}
              handleChange={handleChange}
              // onSubmit={onSubmit}
              onSubmit={handlenextdata}


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
