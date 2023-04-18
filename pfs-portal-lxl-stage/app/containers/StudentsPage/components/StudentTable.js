import React, { useState, useEffect, useContext } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  getCourses,
  getStudentAttendanceDataPerCourseOffering,
  getStudentsByCourseOffering,
} from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { Avatar, Box, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CircularProgressWithLabel from '../../../components/ChartWidgets/CircularProgressWithLabel';
import configContext from '../../../utils/helpers/configHelper';
import firebase from 'firebase/app';
import 'firebase/analytics';
import PopupState, {
  bindTrigger,
} from 'material-ui-popup-state';
import KenColors from '../../../utils/themes/KenColors';
import StudentTableGrid from './StudentTableGrid';
import KenClassList from '../../../global_components/KenClassList';
import KenHeader from '../../../global_components/KenHeader/index';
import KenButton from '../../../global_components/KenButton';
import ShareIcon from '@material-ui/icons/Share';
import ExportIcon from '../../../assets/icons/ExportIcon.svg';
import GreyExportIcon from '../../../assets/icons/ExportIconGrey.svg';
import KenDrawer from '../../../global_components/KenDrawer';
import KenSwitch from '../../../components/KenSwitch';
import ConsolidatedMarksTable from '../../ProgressReports/ClassTeacher/Components/ConsolidatedMarksTable';
import KenTabs from '../../../components/KenTabs/index';
import { KEY_EMPTY_VALUES_PLACEHOLDERS } from '../../../utils/constants';
// import ProtectedComponent from '../../../utils/rbac/ProtectedComponent';
import KenLoader from '../../../components/KenLoader';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    minHeight: '100%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  courseCardGrid: {
    maxHeight: 375,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 20,
    margin: '0 -20px',
  },
  border: {
    boxShadow: `inset 6px 0px 0px ${theme.palette.KenColors.primary}`,
  },
  bottomDivider: {
    border: `1px solid ${theme.palette.KenColors.kenWhite}`,
    background: theme.palette.KenColors.kenWhite,
    padding: 10,
    marginBottom: 12,
  },
  tableContainer: {
    marginTop: '20px',
  },
  btnLabels: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'none',
  },
  headerBtn: {
    marginLeft: '10px',
    minWidth: '100px',
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
  subHeading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '400',
  },
  closeIcon: {
    height: 'max-content',
  },
  switchLabel: {
    padding: '0px 5px',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '100%',
    textTransform: 'uppercase',
    color: theme.palette.KenColors.neutral400,
  },
}));

const progressBarTheme = createMuiTheme({
  palette: {
    // Style sheet name ⚛️
    primary: {
      // Name of the rule
      main: '#008000',
    },
    secondary: {
      main: '#FF5630',
    },
    inherite: {
      main: '#483D8B',
    },
  },
});

const StudentTable = props => {
  const { t } = useTranslation();
  const { history } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  // const [studentByCourse, setStudentByCourse] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([
    {
      Id: 'a031y000009K0TjAAK',
      name: 'CC-0754',
      ProgramId: 'a081y0000016X18AAE',
      ProgramName: '2020-NCECVR-PS-ClassIII',
      CourseOfferingID: 'a041y000002TITIAA4',
      Registration_Number__c: '2021-000001',
      Name: '2020-ENG-NCECVR-PS-C03-A',
      accountname: 'NCECVR-Class III',
      accountId: '0011y000008iLnAAAU',
      Section: 'A',
      department: 'NCECVR-Primary School',
      departmentId: '0011y000008iLmmAAE',
      hed__Course__cId: 'a051y000000wVe1AAE',
      hed__Course__cName: 'English-Class III Test',
      hed__Start_Date__c: '2021-04-01',
      hed__End_Date__c: '2024-03-31',
      hed__Term__c: '2020-NCECVR-PS-C03',
      hed__Grade__c: null,
      No_Of_Classes_Attended__c: 128,
      Percentage_of_classes_attended__c: null,
    },
  ]);
  const [students, setStudents] = useState([]);
  const [CourseOfferingID, setCourseOfferingId] = useState();
  const [consolidated, setConsolidated] = React.useState(false);
  const [sectionObj, setSectionObj] = React.useState({});
  const [gradeData, setGradeData] = React.useState();
  const [consolidatedFinalData, setConsolidatedFinalData] = React.useState([]);
  const [sectionId, setSectionId] = useState();
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));
  const [
    openConsolidatedGradesDrawer,
    setOpenConsolidatedGradesDrawer,
  ] = useState(false);

  const { config } = useContext(configContext);

  const tableTitle = `${t('My_Students')}`;

  const disabledBtn = true;

  const profile = getUserDetails();
  // React.useEffect(() => {
  //   const firebaseConfig = config.firebaseConfig;
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app(); // if already initialized, use that one
  //   }
  //   const firebaseAnalytics = firebase.analytics();
  //   const ContactType = JSON.parse(localStorage.getItem('userDetails')).Type;
  //   firebaseAnalytics.logEvent(`${config.orgID}_${ContactType}_students`);
  // }, []);

  // get the courses
  useEffect(() => {
    if (!profile) return;
    const facultyID = profile.ContactId;
    setLoading(true);
    getCourses(facultyID)
      .then(response => {
        setCourses(response);
        if (response.length > 0) {
          setCourseOfferingId(response[0].CourseOfferingID);
          setLoading(false);
        }
        // else {
        //   setLoading(false);
        // }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   getStudentAttendanceDataPerCourseOffering(CourseOfferingID)
  //     .then(res => {
  //       if (res?.data?.contactsList.length > 0) {
  //         let data = res?.data?.contactsList.map(item => {
  //           return {
  //             ...item,
  //             contactEmail: item.email
  //           }
  //         })
  //         // setStudents(res?.data?.contactsList);
  //         setStudents(data);
  //         setLoading(false);
  //       } else {
  //         setNoData(t('No_Records'));
  //         setLoading(false);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err');
  //       setNoData(t('No_Records'));
  //       // setStudents([]);
  //     });
  // }, [CourseOfferingID]);

  const handleSubmit = studentId => {
    history.push({
      pathname: `/studentDetails/${studentId}`,
    });
  };


  //getStudentsByCourseOffering

  useEffect(() => {
    setLoading(true);

    getStudentsByCourseOffering(CourseOfferingID)
      .then(resp => {
        setLoading(false);
        console.log('response', resp);
        setStudents(resp)
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [CourseOfferingID]);

  const handleMarks = e => {
    setConsolidated(e.target.checked);
  };

  //obj from the props
  const getSelectedSection = el => {
    setSectionObj(el);
  };

  const getDistributedMarks = sub => {
    let mainMarks =
      sub.MainMarks === 'null' || sub.MainMarks === undefined
        ? KEY_EMPTY_VALUES_PLACEHOLDERS.DOUBLE_DASH
        : sub.MainMarks;

    let unitMarks =
      sub.UnitMarks === 'null' || sub.UnitMarks === undefined
        ? KEY_EMPTY_VALUES_PLACEHOLDERS.DOUBLE_DASH
        : sub.UnitMarks;

    return `${mainMarks} + ${unitMarks}`;
  };

  const getConsolidateMarks = sub => {
    return sub.FinalMarks === 'null' || sub.MainMarks === undefined
      ? KEY_EMPTY_VALUES_PLACEHOLDERS.DOUBLE_DASH
      : sub.FinalMarks;
  };

  const getConsolidatedDistributedData = (students, termName, type) => {
    let distributedFinalData = [];

    students?.map(student => {
      let obj = {};

      obj['termName'] = termName;
      obj['Student Name'] = student['Student Name'];
      obj['Total Marks'] = student['Total Marks'];

      student?.subjects.map(sub => {
        if (type === 'distributed') {
          obj[
            `${sub.Subject}(${sub.MaxMainMarks} + ${sub.MaxUnitMarks})`
          ] = getDistributedMarks(sub);
        } else {
          obj[`${sub.Subject} (${sub.MaxFinalMarks})`] = getConsolidateMarks(
            sub
          );
        }
      });
      distributedFinalData.push(obj);
    });
    return distributedFinalData;
  };

  const getConsolidatedDistributedSubjects = (students, termName, type) => {
    let consolidatedSubjects = [];

    students?.map((student, index) => {
      if (index === 0) {
        student?.subjects.map(sub => {
          let consolidatedObj = {};

          if (type === 'consolidated') {
            consolidatedObj['subject'] = `${sub.Subject} (${sub.MaxFinalMarks
              })`;
          } else {
            consolidatedObj['subject'] = `${sub.Subject}(${sub.MaxMainMarks
              } + ${sub.MaxUnitMarks})`;
          }
          consolidatedObj['termName'] = termName;
          consolidatedSubjects.push(consolidatedObj);
        });
      }
    });
    return consolidatedSubjects;
  };


  React.useEffect(() => {
    const initialFinalArray = [];

    gradeData?.map(el => {
      const dataArray = {
        title: el.term,
        content: (
          <ConsolidatedMarksTable
            data={consolidated ? el.consolidatedData : el.distributedData}
            subjects={
              consolidated ? el.consolidatedSubjects : el.distributedSubjects
            }
          />
        ),
      };
      initialFinalArray.push(dataArray);
      setConsolidatedFinalData(initialFinalArray);
    });
  }, [gradeData, consolidated]);

  return (
    <React.Fragment>
      {loading && <KenLoader />}
      <div>
        <KenClassList
          setCourseOfferingId={setCourseOfferingId}
          setSectionId={setSectionId}
          // title={t('headings:Courses_My_Students')}
          listTitle={t('headings:Your_Subjects')}
          getSelectedSection={getSelectedSection}
        />
        <Hidden xsDown>
          <div className={classes.tableContainer}>
            <Box mt={2}>
              {students.length > 0 &&
                <StudentTableGrid
                  title={tableTitle}
                  data={students}
                  // loading={loading}
                  noData={noData}
                />
              }
            </Box>
          </div>
        </Hidden>
        <Hidden smUp>
          {students ? (
            <>
              {students.length > 0 && students?.map(student => (
                <Box className={classes.bottomDivider}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2} sm={2}>
                      <Avatar
                        alt="user"
                        className={classes.grey}
                        onClick={() => handleSubmit(student?.ContactId)}
                      >
                        {student?.contactName?.charAt(0)}
                      </Avatar>
                    </Grid>
                    <Grid item xs={6} sm={6} container alignItems="center">
                      <Typography color="primary">
                        {student?.contactName}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '14px',
                          color: KenColors.neutral400,
                        }}
                      >
                        {student?.name}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '14px',
                          color: KenColors.neutral400,
                        }}
                      >
                        {student?.ProgramName}
                      </Typography>
                      {/* <Typography
                      style={{
                        fontSize: '14px',
                        color: KenColors.neutral400,
                      }}
                    >
                    {student.Courses}
                    </Typography> */}
                      <Grid xs={2} sm={2} style={{ textAlign: 'center' }}>
                        <Typography
                          style={{
                            fontSize: '14px',
                            color: KenColors.neutral400,
                          }}
                        >
                          {student?.No_Of_Classes_Attended__c}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid xs={2} sm={2} style={{ textAlign: 'center' }}>
                      <Typography>
                        {' '}
                        {student?.Percentage_of_classes_attended__c}
                      </Typography>
                      <MuiThemeProvider theme={progressBarTheme}>
                        <CircularProgressWithLabel
                          value={+student?.Percentage_of_classes_attended__c}
                          size={20}
                          thickness={5}
                          color={
                            +student >= 30 && +student <= 85
                              ? 'primary'
                              : +student <= 30
                                ? 'secondary'
                                : 'inherit'
                          }
                        />
                        <Typography>
                          {' '}
                          {student?.Percentage_of_classes_attended__c}
                        </Typography>
                      </MuiThemeProvider>
                    </Grid>
                    <Grid xs={2} sm={2} style={{ textAlign: 'center' }}>
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                        className={classes.moreColumn}
                      >
                        {popupState => (
                          <div>
                            <MoreVertIcon
                              {...bindTrigger(popupState)}
                              className={classes.moreColumn}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        )}
                      </PopupState>
                    </Grid>
                  </Grid>
                </Box>
                // </Link>
              ))}
            </>
          ) : (
            <Typography className={classes.subHeading}>
              No Students Found
            </Typography>
          )}
        </Hidden>
        <KenDrawer
          drawerWidth="70%"
          closeIconStyles={classes.closeIcon}
          title={
            <KenHeader
              title={
                <Typography className={classes.heading}>
                  {t('headings:Report_Card_View')}
                  <Typography
                    component="span"
                    className={classes.subHeading}
                    data-testid="academicYear"
                  >
                    {/* {' ' + t('headings:General_Details_For') + ' '} 
                  {`${reportCardDetails?.class} ${reportCardDetails?.section}`} */}
                  </Typography>
                </Typography>
              }
            >
              <KenSwitch
                switchLabel={
                  <Typography className={classes.switchLabel}>
                    {t('labels:Consolidated_Marks')}
                  </Typography>
                }
                onChangeSwitch={e => {
                  handleMarks(e);
                }}
              />
              <KenButton
                disabled={true}
                variant="secondary"
                startIcon={<ShareIcon />}
                className={classes.headerBtn}
                //   onClick={handleShare}
                label={
                  <Typography className={classes.btnLabels}>
                    {t('labels:Share')}
                  </Typography>
                }
              />
              <KenButton
                disabled={true}
                variant="secondary"
                //   startIcon={<img src={ExportIcon} />}
                startIcon={
                  disabledBtn ? (
                    <img src={GreyExportIcon} />
                  ) : (
                    <img src={ExportIcon} />
                  )
                }
                className={classes.headerBtn}
                //   onClick={handleExport}
                label={
                  <Typography className={classes.btnLabels}>
                    {t('labels:Export')}
                  </Typography>
                }
              />
            </KenHeader>
          }
          open={openConsolidatedGradesDrawer}
          onClose={() => {
            setOpenConsolidatedGradesDrawer(false);
          }}
        >
          <Box p={2}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <KenTabs data={consolidatedFinalData} />
              </Grid>
            </Grid>
          </Box>
        </KenDrawer>
      </div>
    </React.Fragment>
  );
};

export default withRouter(StudentTable);
