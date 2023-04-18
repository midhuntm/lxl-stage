import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import BreadCrumb from '../../../Components/BreadCrumb';
import { makeStyles } from '@material-ui/styles';
import './examPage.css'

const Dashboard = () => {
  const cardArray = [
    {
      title: 'Exam Schedule',
      circleValue: [{ value: 4, heading: 'exams this week', color: '#00BA35' }],
      description: 'You have DBMS exam tomorrow',
    },
    {
      title: 'Hall Ticket',
      circleValue: [
        { value: 2, heading: 'Not Eligible for Exam', color: '#EB5757' },
      ],
      description: 'Download Hall tickets',
    },
    {
      title: 'Exam Results',
      circleValue: [
        { value: 2, heading: 'Results are available', color: '#00BA35' },
      ],
      description: 'New Results coming soon',
    },
    {
      title: 'Answer Script',
      circleValue: [
        { value: 2, heading: 'Online', color: '#00BA35' },
        { value: 3, heading: 'Offline', color: '#00BA35' },
      ],
      description: '',
    },
    {
      title: 'Bulletin Board & FAQs',
      circleValue: [
        { value: 5, heading: 'Announcements this week', color: '#00BA35' },
      ],
      description: '',
    },
    {
      title: 'Hall Ticket',
      circleValue: [
        { value: 3, heading: 'Eligible for Exam', color: '#00BA35' },
      ],
      description: 'Hall tickets are available for download',
    },
  ];
  const useStyles = makeStyles((theme) => ({
    breadCrumbWrapper: {
      margin: '15px 0',
    },
    header: {
      background: '#ffffff',
      color: theme.palette.KenColors.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subHeaderTitle: {
      width: '100%',
    },
    addButton: {
      color: 'white',
      fontWeight: 'bold',
      textDecoration: 'none',
      textTransform: 'none',
      '&:hover': {
        color: 'white',
        borderBottom: '1px solid white',
      },
    },
    mainActions: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '2rem 0 1rem',
    },
    error: {
      color: '#FFFFFF',
      background: '#EB5757',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    normal: {
      color: '#FFFFFF',
      background: '#27AE60',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    publishGenerate: {
      color: '#FFFFFF',
      background: '#979797',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    publishView: {
      color: '#FFFFFF',
      background: '#F2994A',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    Blue: {
      color: '#FFFF',
      background: '#03248F',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    Green: {
      color: '#FFFF',
      background: '#27AE60',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
      width: '102px',
    },
    medium: {
      color: '#FFFFFF',
      background: '#F2994A',
      width: '102px',
      borderRadius: 15,
      fontSize: '10px',
      fontWeight: 'bold',
      margin: '0 5px',
    },
    errorText: {
      color: '#F14B2D',
    },
    greenText: {
      color: '#27AE60',
    },
    gridKenClass: {
      '&  table tbody tr td ': {
        padding: '5px',
      },
      '&  table thead tr th ': {
        fontWeight: 'bold',
        color: '#061938',
      },
    },
    circleBlue: {
      borderRadius: '50%',
      height: '60px',
      width: '60px',
      border: '4px solid #00BA35',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    circleRed: {
      borderRadius: '50%',
      height: '60px',
      width: '60px',
      border: '4px solid #EB5757',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  const history = useHistory();
  const classes = useStyles();

  const arrayBreadCrumb = [
    {
      head: 'STUDENT PORTAL',
    },
    {
      head: 'EXAM DETAILS',
    },
    {
      head: 'DASHBOARD',
    },
  ];
  return (
    <Box>
      <Box className={classes.breadCrumbWrapper}>
        <BreadCrumb array={arrayBreadCrumb} history={history} />
      </Box>
      <AppBar position="static" elevation={0} className={classes.header}>
        <Toolbar
          style={{
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" className={classes.title}>
            Exam Details
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='cardFlex'>
        {cardArray.map((ele) => {
          return (
            <div className='cardContent'>
              <Card
                className='cardItem'
              >
                <b>{ele.title}</b>
                {ele.circleValue.map((e) => {
                  return (
                    <>
                      {e.heading != 'Not Eligible for Exam' ? (
                        <>
                          <>
                            <div className={classes.circleBlue}>
                              <p
                                className='heads'
                              >
                                {e.value}
                              </p>
                            </div>
                            <div>{e.heading}</div>
                          </>
                        </>
                      ) : (
                        <div>
                          <div className={classes.circleRed}>
                            <div
                              className='heads'
                            >
                              {e.value}
                            </div>
                          </div>
                          <div>{e.heading}</div>
                        </div>
                      )}
                    </>
                  );
                })}

                <p style = {{color:'rgba(255, 120, 0, 1)'}}>{ele.description}</p>
                <small>View Detail</small>
              </Card>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default Dashboard;
