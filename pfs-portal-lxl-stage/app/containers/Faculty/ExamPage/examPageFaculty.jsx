import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import { makeStyles } from '@material-ui/styles';
import KenCard from '../../../global_components/KenCard';
import EvaluationComponent from './EvaluationComponent';
import QuestionPaperComponent from './QuestionPaperComponent';
import InvigilationComponent from './InvigilationComponent';
import GradesComponent from './GradesComponent';
import AnswerScriptEvaluation from './AnswerScriptEvaluation';
// import ExamSchedule from './examSchedule';
// import HallTicket from './hallTicket';
// import ExamFees from './examFees';
// import AnswerScript from './answerScript';
// import ExamResult from './examResult';
// import ExamOfficeBoard from './examOfficeBoard';

const useStyles = makeStyles((theme) => ({
  breadCrumbWrapper: {
    margin: '10px 0',
  },
  header: {
    background: '#f8f8f800',
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
}));
function TabPanels(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: '10px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const ExamPageFaculty = () => {
  const breadCrumbsMenu = [
    // 'EVALUATION COMPONENTS',
    'QUESTION PAPER',
    'INVIGILATION / PROCTORING',
    'ANSWER SCRIPT EVALUATION',
    'GRADES',
  ];
  const [value, setValue] = useState(0);
  const [breadValue, setBreadValue] = useState('EXAM SCHEDULE');
  const history = useHistory();
  const classes = useStyles();

  const arrayBreadCrumb = [
    // { head: 'ADMIN PORTAL', url: routes.adminManagement },
    {
      head: 'FACULTY PORTAL',
      // url: routes.exam
    },
    {
      head: 'EXAM DETAILS',
    },
    {
      head: breadValue,
    },
  ];
  const handleChange = (event, newValue) => {
    setBreadValue(breadCrumbsMenu[newValue]);
    setValue(newValue);
  };

  function a11yProps(index) {
    console.log('index', index);
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
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

      <div className="cardlsitbox">
        <KenCard elevation={0} style={{ padding: 0 }}>
          <Box>
            <Box
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 25px',
              }}
            >
              <Tabs
                style={{
                  padding: '0 14px',
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {/* <Tab
                  label="EVALUATION COMPONENTS"
                  {...a11yProps(0)}
                  style={{ fontSize: '12px' }}
                /> */}
                <Tab
                  label="QUESTION PAPER"
                  {...a11yProps(0)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="INVIGILATION / PROCTORING"
                  {...a11yProps(1)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="ANSWER SCRIPT EVALUATION"
                  {...a11yProps(2)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="GRADES"
                  {...a11yProps(3)}
                  style={{ fontSize: '12px' }}
                />
                {/* <Tab
                  label="Exam Office Bulletin Board & FAQ"
                  {...a11yProps(5)}
                  style={{ fontSize: '12px' }}
                /> */}
              </Tabs>
            </Box>
          </Box>
        </KenCard>
      </div>
      {/* <TabPanels value={value} index={0}>
        <EvaluationComponent />
      </TabPanels> */}
      <TabPanels value={value} index={0}>
        <QuestionPaperComponent />
      </TabPanels>
      <TabPanels value={value} index={1}>
        <InvigilationComponent />
      </TabPanels>
      <TabPanels value={value} index={2}>
        <AnswerScriptEvaluation />
      </TabPanels>
      <TabPanels value={value} index={3}>
        <GradesComponent />
      </TabPanels>
      <TabPanels value={value} index={5}>
        {/* <ExamOfficeBoard /> */}
      </TabPanels>
    </Box>
  );
};

export default ExamPageFaculty;
