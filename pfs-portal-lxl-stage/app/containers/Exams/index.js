import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  Grid,
  Box,
  Drawer,
  Accordion,
  AccordionDetails,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  AccordionSummary,
} from '@material-ui/core';
import { AiOutlineDown } from 'react-icons/ai';
import KenCard from '../../global_components/KenCard';
// import AppBar from '../../Components/Header/newIndex';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { getDashboardCardArray } from '../../Utils/dashboardCards';
// import Logo from '../../Assets/ken42-logo.jpg';
// import AcademicsPlannerNavigation from '../../Components/SideNavigation/AcademicsPlannerNavigation';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
// import routes from '../../Utils/routes.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ExamDetails from './Components/examdetails';
import ExamFees from './Components/examfees/index';
import HallTicket from './Components/hallticket';
import Revaluation from './Components/Revaluation';
import Retest from './Components/Retest';
import RequestQuestionPaper from './Components/RequestQuestionPaper';
// import KenInputField from '../../global_components/KenInputField';
const drawerWidth = 260;
const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    background: theme.palette.KenColors.background,
    padding: '0 32px',
    minHeight: '100vh',
    marginTop: 64,
    overflow: 'hidden',
  },
  containerWrap: {
    width: 'calc(100% - 260px)',
  },
  appBar: {
    [theme.breakpoints.up('smUp')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      zIndex: 1000,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpen: {
    width: drawerWidth,
    overflow: 'hidden',
    background: '#092682',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.KenColors.kenLogoColor,
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 65,
    },
    [theme.breakpoints.down('xs')]: {
      width: 65,
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00218D',
  },
  AccordionDetailsStyle: {
    display: 'Block',
  },
  annoucementTable: {
    width: '100%',
  },
  annoucementTab: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    background: '#F4F5F7',
    border: ' 0.6px dashed #DFE1E6',
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  toolbar: theme.mixins.toolbar,
}));

const menus = [
  {
    icon: '',
    label: 'EXAM DETAILS',
    // path: routes.dashboard,
  },
  {
    icon: '',
    label: 'EXAM FEES',
    // path: routes.currentProgrammes,
  },
  {
    icon: '',
    label: 'HALL TICKETS',
    // path: routes.currentProgrammes,
  },
];
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
const Exams = props => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = React.useState(true);

  const handleClick = () => {
    history.push('/app/academics-planner');
  };
  const handleChange = (event, newValue) => {
    // setBreadValue(breadCrumbsMenu[newValue])
    setValue(newValue);
  };
  function a11yProps(index) {
    console.log('index', index);
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChangeAccordien = () => {
    setExpanded(!expanded);
  };
  return (
    <Box>
      {' '}
      <ToastContainer />
      <Accordion
        // style={{ marginBottom: '10px' }}
        expanded={expanded}
        onChange={() => handleChangeAccordien()}
      >
        <AccordionSummary
          expandIcon={<AiOutlineDown style={{ fontSize: 18 }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" className={classes.title}>
            Announcements{' '}
          </Typography>{' '}
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetailsStyle}>
          <Grid item xs={12} sm={12}>
            <Box
              role="alert"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              className={classes.annoucementTable}
            >
              <Typography className={classes.annoucementTab}>
                15-10-2022 &nbsp; &nbsp; &nbsp;{' '}
                <span>
                  ALL EXAMINATIONS SCHEDULED FOR THE WEEK OF DECEMBER 12 2022 to
                  DECEMBER 17 2022 STAND CANCELLED ....{' '}
                </span>
              </Typography>
              <Typography className={classes.annoucementTab}>
                10-10-2022 &nbsp; &nbsp; &nbsp;{' '}
                <span>
                  {' '}
                  DUE TO RECENT TRAVEL RESTRICTIONS, EXAMINATIONS FOR THE JUNE
                  2022 INTAKE WILL BE HELD ONLINE STARTI ....{' '}
                </span>
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={3}> */}
          {/* <KenInputField
              label=""
              name="LastName"
              value={''}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChangeInput(e);
              }}
            /> */}
          {/* </Grid> */}
        </AccordionDetails>
      </Accordion>
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
                <Tab
                  label="Exam Details"
                  {...a11yProps(0)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="Request The Answer Sheet"
                  {...a11yProps(1)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="Revaluation"
                  {...a11yProps(2)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="Retest"
                  {...a11yProps(3)}
                  style={{ fontSize: '12px' }}
                />
                {/* <Tab
                  label="Exam Fees"
                  {...a11yProps(1)}
                  style={{ fontSize: '12px' }}
                />
                <Tab
                  label="Hall Ticket"
                  {...a11yProps(2)}
                  style={{ fontSize: '12px' }}
                /> */}
              </Tabs>
            </Box>
          </Box>
        </KenCard>
      </div>
      <TabPanels value={value} index={0} style={{ background: '#fff' }}>
        <ExamDetails />
      </TabPanels>
      <TabPanels value={value} index={1} style={{ background: '#fff' }}>
        <RequestQuestionPaper />
      </TabPanels>
      <TabPanels value={value} index={2} style={{ background: '#fff' }}>
        <Revaluation />
      </TabPanels>
      <TabPanels value={value} index={3} style={{ background: '#fff' }}>
        <Retest />
      </TabPanels>
      {/* <TabPanels value={value} index={1} style={{ background: '#fff' }}>
        <RequestQuestionPaper />
      </TabPanels>
      <TabPanels value={value} index={2} style={{ background: '#fff' }}>
        <HallTicket />
      </TabPanels> */}
    </Box>
  );
};

export default Exams;
