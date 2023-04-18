import React, { Suspense, lazy } from 'react';
import {
  makeStyles,
  useTheme,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//Routes
import Routes from '../../utils/routes.json';
// import firebase from 'firebase';
//RTL
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  KEY_LOGIN_ACCESS_TOKEN,
  KEY_STATUS,
  KEY_USER_DETAILS,
} from '../../utils/constants';
// import { getCon } from '../../init-fcm';
import context from '../../utils/helpers/context';
// import PaymentSuccess from '../ParentPortal/PaymentSuccessful/index';
import Assessment from '../Assessment/index';
import QuestionBank from '../Assessment/QuestionPage/index';
import QuestionsCreation from '../ContentCreation/QuestionsCreation/index';
//contextProvider for loader
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../utils/ErrorBoundary';
import { useAppContext } from '../../utils/contextProvider/AppContext';
import { getUserDetails, logOut } from '../../utils/helpers/storageHelper';
import ProtectedRoute from '../../utils/rbac/ProtectedRoute';
import { Grid, useMediaQuery } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import SubjectContentStudent from '../LMSSubjectContent/Student';
import SubjectContentFaculty from '../LMSSubjectContent/Faculty';
import CourseContentCreation from '../../containers/CourseContentCreation';
import Facultycourses from '../LMSDashboard/Student/Facultycourses';
import ParentProfile from '../ParentPortal/ParentProfile/ParentProfile';
import Film from '../LMSSubjectContent/Student/Film.js';
import FunActivity from '../LMSSubjectContent/Student/FunActivity';
import StudentCompletion from '../ContentCreation/AcadamicContent/ContentBreadcrumbs/student completion';
import Results from '../Results';
import Grading from '../Grading';
import Gradingnext from '../Grading/Grading';
import Filmnext from '../ContentCreation/AcadamicContent/ContentActivities/Filmnext';
// import LearningModule from '../LearningModule/index';
/* Components */
const HomePage = lazy(() => import('../HomePage/Loadable'));
const LearningModule = lazy(() => import('../LearningModule/index'));
const Workshop = lazy(() => import('../LearningModule/Workshop'));
const StudentDetailsPage = lazy(() => import('../StudentsDetailPage/Loadable'));
const Footer = lazy(() => import('../../components/Footer'));
const Thankyou = lazy(() => import('../ParentPortal/ThankYou/index'));
const KenLoader = lazy(() => import('../../components/KenLoader/index'));
const KenSnackbar = lazy(() => import('../../components/KenSnackbar/index'));
const Timetable = lazy(() => import('../Timetable/Timetable'));
const AssessmentPage = lazy(() => import('../AssessmentPage'));

const MenuAppBar = lazy(() => import('../../components/Header/MenuAppBar'));
const SideNavigation = lazy(() =>
  import('../../components/SideNavigation/SideNavigation')
);
const AssignmentReview = lazy(() =>
  import('../Assignment/AssignmentReview/index')
);
const OriginalityReport = lazy(() =>
  import('../Assignment/AssignmentReview/components/OriginalityReport')
);
const AcadamicContent = lazy(() =>
  import('../ContentCreation/AcadamicContent')
);
const PreviewAndEditing = lazy(() =>
  import(
    '../ContentCreation/AcadamicContent/ContentResources/PreviewAndEditing'
  )
);
const PresentationPreview = lazy(() =>
  import(
    '../ContentCreation/AcadamicContent/ContentResources/PreviewAndEditing/PresentationPreview'
  )
);
const CreateAssignment = lazy(() => import('../Assignment/index'));
const AssignmentFileUpload = lazy(() =>
  import('../Assignment/Components/Components/AssignmentFileUpload')
);
const AddResource = lazy(() =>
  import(
    '../ContentCreation/AcadamicContent/ContentResources/AddResource/index'
  )
);
const StudentSubmission = lazy(() => import('../StudentSubmission'));
const AssessmentPreview = lazy(() =>
  import('../PreviewPages/AssessmentPreview')
);
const StudentsFeedbackNew = lazy(() =>
  import('../studentFeedback/StudentFeedBackNew')
);
const StudentsFeedbackForm = lazy(() =>
  import('../studentFeedback/studentFeedbackForm/studentFeedbackform')
);
const FacultyFeedbackNew = lazy(() =>
  import('../../../app/containers/facultyFeedback/facultyFeedBackNew')
);
const FacultyFeedbackForm = lazy(() =>
  import('../facultyFeedback/facultyFeedbackForm/facultyFeedbackform')
);
const GlobalResources = lazy(() =>
  import('../../../app/containers/facultyFeedback/GlobalResources')
);

const Students = lazy(() => import('../Students/index'));
const MyCart = lazy(() => import('../ParentPortal/FeeManagement/MyCart'));
const FeeSchedule = lazy(() =>
  import('../ParentPortal/FeeManagement/FeeSchedule')
);
const FeesPayment = lazy(() =>
  import('../ParentPortal/FeeManagement/FeePayment')
);
const MyTransactions = lazy(() =>
  import('../ParentPortal/FeeManagement/MyTransactions')
);
const RaiseRequest = lazy(() => import('../StudentServices/index'));
const ServiceList = lazy(() => import('../StudentServices/ServiceList/index'));
const facultyProfile = lazy(() =>
  import('../FacultyPortal/FacultyProfiles/facultyProfile')
);
const ManualPayments = lazy(() =>
  import('../ParentPortal/FeeManagement/ManualPayment/index')
);
const ExamPageFaculty = lazy(() =>
  import('../Faculty/ExamPage/examPageFaculty')
);
const ExamPage = lazy(() => import('../StudentExam/ExamPage/examPage'));
const FeeModule = lazy(() => import('../ParentPortal/FeeModule/index'));
const Exams = lazy(() => import('../Exams'));
const EventsModified = lazy(() => import('../EventsModified'));
const EventDetails = lazy(() =>
  import('../EventsModified/Components/eventDetails')
);
const LMSDashboardFaculty = lazy(() => import('../LMSDashboard/Faculty'));
const LMSDashboardStudent = lazy(() => import('../LMSDashboard/Student'));

const CompleteEnroll = lazy(() => import('../Enroll/complete-enrollment'));
const OpenEnroll = lazy(() => import('../Enroll/open-enroll'));
const StudentAttendance = lazy(() => import('../Attendance/index'));
const TestPage = lazy(() => import('../Testpage/Testpage'));
const FacultyAttendance = lazy(() => import('../FacultyAttendance/index'));
// Forum LMS
const Forum = lazy(() => import('../Forum'));
const CreateUpdateForum = lazy(() => import('../Forum/CreateUpdateForum'));
const QuizReviewPage = lazy(() =>
  import('../MyClasses/components/quizReviewPage')
);
const StudentPerformance = lazy(() =>
  import('../MyClasses/components/studentPerformace')
);
const CodingInterface = lazy(() => import('../CodingInterface'));

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    color: theme.palette.KenColors.neutral400,
    minHeight: '100vh',
    background: theme.palette.KenColors.background,
    position: 'relative',
    // marginRight: 0,
  },
  rootSideNav: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('md')]: {
      width: '100%',
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
  menuButton: {
    marginRight: 36,
  },
  // hide: {
  //   display: 'none',
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  contentTrue: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    background: theme.palette.background.default,
    marginBottom: 10,
    // [theme.breakpoints.only('xs')]: {
    //   padding: 16,
    // },
    minHeight: '80vh',
  },
  wrapper: {
    display: 'flex',
  },
  contentFalse: {
    // position: 'relative',
    flexGrow: 1,
    // padding: theme.spacing(3),
    background: theme.palette.background.default,
    marginBottom: 10,
    // [theme.breakpoints.only('xs')]: {
    //   padding: 8,
    // },
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  newSideNav: {
    maxWidth: '100%',
    padding: '70px 24px',
  },
  mainContent: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mainWrap: {
    width: 'calc(100% - 70px)',
    padding: 24,
    background: theme.palette.KenColors.neutral20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default function MainLayout(props) {
  const { history } = props;
  const classes = useStyles();
  const theme = useTheme();

  const {
    state: { config, userDetails, sideNavigation },
    dispatch,
  } = useAppContext();
  const { drawer: { open: drawerOpen = true } = {} } = config || {};
  const [openDrawer, setOpenDrawer] = React.useState(
    sideNavigation || drawerOpen
  );

  window.addEventListener('storage', () => {
    const userDetails = localStorage.getItem(KEY_USER_DETAILS);
    const tokenCheck = localStorage.getItem(KEY_LOGIN_ACCESS_TOKEN);
    if (!userDetails) {
      console.log('logged out!');
      logOut(config, history);
      history.push('/');
    }
    if (!tokenCheck) {
      console.log('logged out!');
      logOut(config, history);
    }
  });

  const [showDrawer] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false); //for responsive drawer
  const [webOpen, setWebOpen] = React.useState(true);

  // Validate if userDetails are available and logout if not present
  React.useEffect(() => {
    const uD = getUserDetails();
    const tokenCheck = localStorage.getItem(KEY_LOGIN_ACCESS_TOKEN);

    if (uD) {
      dispatch({ type: 'updateUserDetails', value: uD });
    } else {
      // Logout
      logOut(config, history);
    }
    if (!tokenCheck) {
      console.log('logged out!');
      logOut(config, history);
    }

    if (config) {
      dispatch({
        type: 'updateSideNavigation',
        value: drawerOpen,
      });
    }
  }, []);

  const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    // Collapse sidebar in mobile screens
    if (mobileScreen) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(sideNavigation);
    }
  }, [sideNavigation, mobileScreen]);

  // React.useEffect(() => {
  //   if (config && firebase.messaging.isSupported()) {
  //     // getCon(config);
  //     if ('serviceWorker' in navigator && config) {
  //       navigator.serviceWorker
  //         .register('./firebase-messaging-sw.js')
  //         .then(function (registration) {
  //           firebase
  //             .messaging()
  //             .getToken({ serviceWorkerRegistration: registration });

  //           console.log(
  //             'Registration successful, scope is:',
  //             registration.scope
  //           );
  //         })
  //         .catch(function (err) {
  //           console.log('Service worker registration failed, error:', err);
  //         });
  //     }
  //   }
  // }, [config]);

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const onDrawerChanges = () => {
    setMobileOpen(!mobileOpen);
  };

  const onWebDrawerChanges = isOpen => {
    setWebOpen(!webOpen);
  };

  const handleDrawer = text => {
    switch (text) {
      case 'show':
        setWebOpen(true);
        break;

      case 'hide':
        setWebOpen(false);
        break;

      default:
        setWebOpen(!webOpen);
    }
  };
  // for global loader
  const [loading, setLoading] = React.useState(false);
  const handleLoader = val => {
    if (val !== undefined) {
      setLoading(val);
    } else {
      setLoading(!loading);
    }
  };

  //for global snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState(
    KEY_STATUS.success
  );
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  if (!userDetails) return <KenLoader />;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        window.location.reload();
      }}
    >
      <StylesProvider jss={jss}>
        <context.Provider
          value={{
            handleLoader: handleLoader,
            handleSnackbarOpen: handleSnackbarOpen,
          }}
        >
          <Router>
            <div className={classes.root}>
              {/* global loader */}
              {loading && <KenLoader />}

              <main
                className={webOpen ? classes.contentTrue : classes.contentFalse}
              >
                <KenSnackbar
                  message={snackbarMessage}
                  severity={snackbarSeverity}
                  autoHideDuration={4000}
                  open={openSnackbar}
                  handleSnackbarClose={handleSnackbarClose}
                  position="Bottom-Right"
                />
                {/* <div className={classes.toolbar} /> */}
                <div className={classes.wrapper}>
                  <div className={classes.sideNavWrap}>
                    {/* <Hidden smDown> */}
                    <SideNavigation
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                      showDrawer={showDrawer}
                      drawerChanges={onWebDrawerChanges}
                      open={webOpen}
                      variant={webOpen ? 'permanent' : ''}
                    />
                    {/* </Hidden> */}

                    {/* <Hidden mdUp> */}
                    <SideNavigation
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                      showDrawer={showDrawer}
                      open={webOpen}
                      drawerChanges={onWebDrawerChanges}
                      // variant="temporary"
                      // ModalProps={
                      //   true // Better open performance on mobile.
                      // }
                      variant={webOpen ? 'permanent' : ''}

                    // anchor={
                    //   theme.direction === 'rtl'
                    //     ? KEY_DIRECTION.right
                    //     : KEY_DIRECTION.left
                    // }
                    />
                    {/* </Hidden> */}
                  </div>
                  <Grid
                    xs={12}
                    sm={12}
                    className={webOpen ? classes.mainWrap : classes.newSideNav}
                  >
                    <AppBar
                      position="fixed"
                      className={clsx(classes.appBar, {
                        [classes.appBarShift]: openDrawer,
                      })}
                    >
                      <MenuAppBar
                        drawerChanges={onDrawerChanges}
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                        className={clsx(classes.appBar, {
                          [classes.appBarShift]: openDrawer,
                        })}
                      />
                    </AppBar>   
                    <Toolbar />
                    {/* Routes */}
                    <Suspense fallback={<div>Loading...</div>}>
                      <Route
                        exact
                        path="/"
                        render={() => <Redirect to={`/${Routes.home}`} />}
                      />
                      <Route
                        exact
                        path={`/${Routes.home}`}
                        render={routerProps => (
                          <HomePage
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.workshop}`}
                        render={routerProps => (
                          <Workshop
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route 
                      exact
                      path={`/${Routes.LearningModule}`}
                      render={routerProps => (
                        <LearningModule
                        {...routerProps}
                        drawerChanges={handleDrawer}
                        />
                      )}
                      />
                      
                      <Route
                        exact
                        path={`/${Routes.thankyou}`}
                        render={routerProps => (
                          <Thankyou
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.Grading}`}
                        render={routerProps => (
                          <Grading
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.results}`}
                        render={routerProps => (
                          <Results
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.StudentCompletion}`}
                        render={routerProps => (
                          <StudentCompletion
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.SelfLearningCourses}`}
                        render={routerProps => (
                          <LMSDashboardStudent
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.acadamicContentlms}`}
                        render={routerProps => (
                          <Facultycourses
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.facultyfilm}`}
                        render={routerProps => (
                          <Filmnext
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.studentDetails}/:contactId`}
                        render={routerProps => (
                          <StudentDetailsPage
                            {...routerProps}
                            drawerChanges={onWebDrawerChanges}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.facultyProfile}/:contactId`}
                        render={routerProps => (
                          <StudentDetailsPage
                            {...routerProps}
                            drawerChanges={onWebDrawerChanges}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.lmsDashboardFaculty}`}
                        render={routerProps => (
                          <LMSDashboardFaculty
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.lmsDashboardStudent}`}
                        render={routerProps => (
                          <LMSDashboardStudent
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.eventDetails}/:eventId`}
                        render={routerProps => (
                          <EventDetails
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.feePayment}`}
                        render={routerProps => (
                          <FeeModule
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        path={`/${Routes.courseContentCreation}`}
                        component={CourseContentCreation}
                      />
                      {/* <Route
                        exact
                        path={`/${Routes.paymentSucces}`}
                        render={routerProps => (
                          <PaymentSuccess
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      /> */}

                      {/* <Route
                        exact
                        path={`/${Routes.enroll}`}
                        render={routerProps => (
                          <Enroll
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      /> */}

                      <Route
                        exact
                        path={`/${Routes.timetable}`}
                        render={routerProps => (
                          <Timetable
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.assessment}`}
                        render={routerProps => (
                          <Assessment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.result}`}
                        render={routerProps => (
                          <Assessment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.editAssessment}`}
                        render={routerProps => (
                          <Assessment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.questionBank}`}
                        render={routerProps => (
                          <QuestionBank
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.assignmentReview}`}
                        render={routerProps => (
                          <AssignmentReview
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.assignmentOriginal}`}
                        render={routerProps => (
                          <OriginalityReport
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.studentAssessment}`}
                        render={routerProps => (
                          <AssessmentPage
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.questionsCreation}`}
                        render={routerProps => (
                          <QuestionsCreation
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.acadamicContent}`}
                        render={routerProps => (
                          <AcadamicContent
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.assessmentPreview}`}
                        render={routerProps => (
                          <AssessmentPreview
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.updateAndEditPreview}`}
                        render={routerProps => (
                          <PreviewAndEditing
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.addResource}`}
                        render={routerProps => (
                          <AddResource
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.presentationPreview}`}
                        render={routerProps => (
                          <PresentationPreview
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.submitAssignment}`}
                        render={routerProps => (
                          <StudentSubmission
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.studentPerformance}`}
                        render={routerProps => (
                          <StudentPerformance
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.assignment}`}
                        render={routerProps => (
                          <CreateAssignment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.editAssignment}`}
                        render={routerProps => (
                          <CreateAssignment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.assignmentFileupload}`}
                        render={routerProps => (
                          <AssignmentFileUpload
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.feedBack}`}
                        render={routerProps => (
                          <StudentsFeedbackNew
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.studentFeedBackForm}`}
                        render={routerProps => (
                          <StudentsFeedbackForm
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.Grid}`}
                        render={routerProps => (
                          <Gradingnext
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.facultFeedBack}`}
                        render={routerProps => (
                          <FacultyFeedbackNew
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.facultFeedBackForm}`}
                        render={routerProps => (
                          <FacultyFeedbackForm
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.GlobalResources}`}
                        render={routerProps => (
                          <GlobalResources
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.myCart}`}
                        render={routerProps => (
                          <MyCart
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.feeSchedule}`}
                        render={routerProps => (
                          <FeeSchedule
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.feesPayment}`}
                        render={routerProps => (
                          <FeesPayment
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.manualPayment}`}
                        render={routerProps => (
                          <ManualPayments
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.myTransactions}`}
                        render={routerProps => (
                          <MyTransactions
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.raiseRequest}`}
                        render={routerProps => (
                          <RaiseRequest
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.serviceList}`}
                        render={routerProps => (
                          <ServiceList
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.parentprofile}`}
                        render={routerProps => (
                          <ParentProfile
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      {/* <Route
                        exact
                        path={`/${Routes.facultyProfile}/:contactId`}
                        component={facultyProfile}
                        drawerChanges={handleDrawer}
                        feature="facultyProfile"
                        action="view"
                      /> */}

                      <Route
                        exact
                        path={`/${Routes.faculty}`}
                        component={ExamPageFaculty}
                        drawerChanges={handleDrawer}
                        feature="faculty"
                        action="view"
                      />

                      <Route
                        exact
                        path={`/${Routes.student_exam}`}
                        component={ExamPage}
                        drawerChanges={handleDrawer}
                        feature="faculty"
                        action="view"
                      />
                      <Route
                        exact
                        path={`/${Routes.exams}`}
                        render={routerProps => (
                          <Exams
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.eventsModified}`}
                        render={routerProps => (
                          <EventsModified
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <ProtectedRoute
                        exact
                        path={`/${Routes.studentsByOffering}`}
                        component={Students}
                        drawerChanges={handleDrawer}
                        feature="studentsByOffering"
                        action="view"
                      />

                      <Route
                        exact
                        path={`/${Routes.completeEnroll}`}
                        render={routerProps => (
                          <CompleteEnroll
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.openEnroll}`}
                        render={routerProps => (
                          <OpenEnroll
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.attendance}`}
                        render={routerProps => (
                          <StudentAttendance
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.facultyAttendance}`}
                        render={routerProps => (
                          <FacultyAttendance
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.testPage}`}
                        render={routerProps => (
                          <TestPage
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />

                      <Route
                        exact
                        path={`/${Routes.discussion}`}
                        render={routerProps => (
                          <Forum
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.forum}`}
                        render={routerProps => (
                          <CreateUpdateForum
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.forum}/:id`}
                        render={routerProps => (
                          <CreateUpdateForum
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.reviewQuiz}`}
                        render={routerProps => (
                          <QuizReviewPage
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.codingInterface}`}
                        render={routerProps => (
                          <CodingInterface
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.subjectContentStudent}`}
                        render={routerProps => (
                          <SubjectContentStudent
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.film}`}
                        render={routerProps => (
                          <Film
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.FunActivity}`}
                        render={routerProps => (
                          <FunActivity
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={`/${Routes.subjectContentFaculty}`}
                        render={routerProps => (
                          <SubjectContentFaculty
                            {...routerProps}
                            drawerChanges={handleDrawer}
                          />
                        )}
                      />
                    </Suspense>
                  </Grid>
                </div>
              </main>
              <div className={classes.footer}>
                <Footer />
              </div>
            </div>
          </Router>
        </context.Provider>
      </StylesProvider>
    </ErrorBoundary>
  );
}
