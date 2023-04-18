import React from 'react';
import { makeStyles } from '@material-ui/styles';

import clsx from 'clsx';
import { Box, Drawer } from '@material-ui/core';
import AppBar from '../../components/Header/newIndex';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDashboardCardArray } from '../../utils/dashboardCards';
import Logo from '../../assets/Ken42logo.png';
import AcademicsPlannerNavigation from '../../components/SideNavigation/AcademicsPlannerNavigation';
// import AcademicsPlannerNavigation from '../../../../components/SideNavigation/AcademicsPlannerNavigation';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import routes from '../../utils/routes.json';

import { ArrowDropDownCircleRounded } from '@material-ui/icons';
import ExamPageFaculty from './ExamPage/examPageFaculty';

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
  toolbar: theme.mixins.toolbar,
}));

const menus = [
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'Dashboard',
    // path: routes.dashboard,
  },
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'My Classes',
    // path: routes.currentProgrammes,
  },
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'Grades',
    // path: routes.addProgram,
  },
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'Fees',
    path: routes.addActivity,
  },
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'Exam',
    path: routes.facultyPage,
  },
  {
    icon: <ArrowDropDownCircleRounded />,
    label: 'Market Place',
    // path: routes.facultySection,
  },
];

const FacultyPortal = props => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleClick = () => {
    history.push('/app/academics-planner');
  };

  return (
    <Box className={classes.mainContainer}>
      <div className={classes.sideNavWrap}>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: openDrawer,
              [classes.drawerClose]: !openDrawer,
            }),
          }}
          variant="permanent"
          open
        >
          <AcademicsPlannerNavigation
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            menuList={menus}
          />
        </Drawer>
      </div>

      <div className={classes.containerWrap}>
        <AppBar
          logo={Logo}
          title="FACULTY PORTAL"
          handleClick={handleClick}
          history={history}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          cards={getDashboardCardArray(t)}
        />
        <Box className={classes.container}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path={routes.dashboard}>
                {/* <Dashboard /> */}
              </Route>
              <Route exact path={routes.facultyPage}>
                <ExamPageFaculty />
              </Route>
              {/* <Route exact path={routes.studentExam}>
                <Redirect to={routes.examPage} />
              </Route>
              <Route exact path={routes.academicsPlanner}>
                <Redirect to={routes.currentProgrammes} />
              </Route> */}
            </Switch>
          </Suspense>
        </Box>
      </div>
    </Box>
  );
};

export default FacultyPortal;
