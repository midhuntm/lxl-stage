import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  useTheme,
  Box,
  CircularProgress,
} from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenHeader from '../../../../global_components/KenHeader/index';
import KenButton from '../../../../global_components/KenButton/index';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import KenGridEditable from '../../../../global_components/kenGridEditable/kenGridEditable';
import KenLoader from '../../../../components/KenLoader';
import '../../styles.scss';
import KenSelect from '../../../../global_components/KenSelect';
import {
  KEY_ATTENDANCE_PROGRESS_VALUES,
  KEY_DATE_FORMAT,
} from '../../../../utils/constants';
import KenDialogBox from '../../../../components/KenDialogBox/index';
import DetailsPopup from '../DetailsPopup/index';
import {
  getCompletedEnrollment,
  getSessionList,
  getStudentList,
  postAttendanceEvent,
} from '../../../../utils/ApiService';
import { useAppContext } from '../../../../utils/contextProvider/AppContext';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import moment from 'moment';
import KenCheckbox from '../../../../global_components/KenCheckbox';
import KenSnackbar from '../../../../components/KenSnackbar';
import KenInputField from '../../../../global_components/KenInputField';

const useStyles = makeStyles(theme => ({
  header: {
    background: 'transparent',
    color: theme.palette.KenColors.primary,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'end',
  },
  headerBtn: {
    margin: '0 5px',
  },
  leftBox: {
    width: '100%',
    background: '#fff !important',
    padding: '10px',
    overflowY: 'auto',
  },
  RightBox: {
    background: '#fff',
    width: '100%',
    background: '#fff !important',
    padding: '10px',
    position: 'relative',
  },
  sideCardTitle: {
    marginTop: '0px',
    color: '#0077FF',
    fontSize: '14px',
    fontWeight: 600,
  },
  sideCardVal: {
    margin: '0px',
  },
  selectTableCell: {
    textAlign: 'right !important',
  },
  boxTable: {
    width: '100%',
    padding: 20,
    border: '0.6px solid #D7DEE9',
  },
  textContentSpan: {
    // color: '#0077FF',
    fontSize: '12px',
  },
  textContent: {
    color: '#092682',
    fontSize: '12px',
  },
  sessionBoxes__wrap: {},
  sessionBoxes: {
    width: ' 200px',
    height: 69,
    border: '1px solid #092682',
    marginRight: 20,
    textAlign: 'center',
  },
  session__subtext: {
    margin: 0,
  },
  filterBar: {
    [theme.breakpoints.only('lg')]: {
      width: '30%',
      paddingLeft: 16,
    },
    [theme.breakpoints.only('md')]: {
      width: '50%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  subjectBtn: {
    [theme.breakpoints.only('md')]: {
      width: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));
export default function MarkAttendance(props) {
  const classes = useStyles();
  const kenTheme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('Select');
  const [subject, setSubject] = useState([]);
  const [currentSubject, setCurrentSubject] = useState();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentView, setStudentView] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [reasonTypeOptions, setReasonTypeOptions] = useState([]);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));
  const {
    state: { userDetails },
  } = useAppContext();

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiInputBase: {
        // Name of the rule
        root: {
          // Some CSS
          display: 'block',
          paddingLeft: '5px',
          fontFamily: `'Open Sans', sans-serif`,
        },
      },
    },
  });

  const getCircleColor = value => {
    if (!Number(value)) return kenTheme.palette.KenColors.kenBlack;
    if (
      value >= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MIN &&
      value <= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MAX
    ) {
      return kenTheme.palette.KenColors.orange;
    } else if (value <= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MIN) {
      return kenTheme.palette.KenColors.red;
    } else {
      return kenTheme.palette.KenColors.green;
    }
  };

  const onclickMarkAttendance = (row, data) => {
    setStudentView(false);
    setSessionId(row['original']?.id);
    setLoading(true);
    setNoData(t('messages:Fetching_Data'));
    getStudentList(row['original'].courseOfferingId)
      .then(res => {
        console.log('res', res);
        let data = [];
        let reasonsList = [];
        if (res?.message !== 'No Data Found') {
          let details = res?.data?.studentsList;
          details.map(el => {
            data.push({
              checked: true,
              contactName: el?.contactName,
              contactId: el?.contactId,
              contactEmail: el?.contactEmail,
              attendanceId: el?.attendanceEventId,
            });
          });
          res?.data?.reasonDropdownValues.map(item => {
            reasonsList.push({ label: item, value: item });
          });
          setReasonTypeOptions(reasonsList);
        } else {
          setNoData(t('No_Records'));
        }
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setStudents([]);
        setLoading(false);
        setNoData(t('No_Records'));
      });
    // }
  };
  const columns = [
    // {
    //   Header: 'SESSION No.',
    //   accessor: 'sessionName',
    //   disableGlobalFilter: true,
    // Cell: ({ value, row }) => {
    //   return (
    //     <Link
    //       // to={`/${Routes.studentDetails}`}
    //       style={{ textDecoration: 'none' ,}}
    //     >
    //       {/* <ContactCell value={value} /> */}
    //     </Link>
    //   );
    // },
    // },
    // {
    //   Header: 'Course NAME',
    //   accessor: 'courseName',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'TERM NAME',
      accessor: 'termName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Date',
      accessor: 'startDate1',
      disableGlobalFilter: true,
    },
    {
      Header: 'Start Time',
      accessor: 'startTime',
      disableGlobalFilter: true,
    },
    {
      Header: 'End Time',
      accessor: 'endTime',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'End Date',
    //   accessor: 'endDate',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'MARK ATTENDANCE',
      accessor: 'attendance',
      Cell: ({ value, row }) => {
        return (
          <>
            <KenButton
              variant="contained"
              color="primary"
              style={{ marginRight: '15px' }}
              className={classes.addButton}
              onClick={() => onclickMarkAttendance(row, data)}
            >
              {'Mark Attendance'}
            </KenButton>
          </>
        );
      },
      disableGlobalFilter: true,
    },
  ];

  const columns2 = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <KenCheckbox
              name={`checkbox`}
              className={classes.checkbox}
              value={value}
              // disabled={data[row.index]['IsMan__c'] || disableTable}
              onChange={event => selectedCheckBoxItem(event, row, students)}
              color="primary"
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'STUDENT NAME',
      accessor: 'contactName',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON TYPE',
      accessor: 'Reasons',
      disableGlobalFilter: true,
      Cell: ({ value, row }) => {
        return (
          <KenSelect
            value={value}
            options={reasonTypeOptions}
            placeholder={'Select'}
            required={true}
            onChange={e => {
              handleReasons(e, row, students);
            }}
          />
        );
      },
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'Description',
      disableGlobalFilter: true,
      Cell: ({ value, row }) => {
        return (
          <KenInputField
            value={value}
            placeholder={'ENTER DESCRIPTION'}
            required={true}
            style={{ padding: '5px 26px 5px 12px' }}
            onChange={e => {
              handleAttendenceDescription(e, row, students);
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const userDetails = getUserDetails();
    const ContactId = userDetails.ContactId;
    setLoading(true);
    getCompletedEnrollment(ContactId)
      .then(res => {
        console.log('res', res);
        let data = [];
        if (res?.message !== 'No Data Found') {
          let courses = res?.mandatoryCourses;
          courses.map(el => {
            data.push({
              //  ...el,
              label: el.CourseName + ' ' + el.courseOfferingSectionId,
              value: el.courseOfferingId,
            });
          });
        }
        setSubject(data);
        setCurrentSubject(data[0]?.value);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setSubject([]);
        setLoading(false);
      });
  }, []);
  const onChangeSubject = val => {
    setCurrentSubject(val);
    // onSessionList(val)
  };

  useEffect(() => {
    if (currentSubject) {
      onSessionList(currentSubject);
    }
  }, [currentSubject]);

  const onSessionList = val => {
    setLoading(true);
    setNoData(t('messages:Fetching_Data'));
    getSessionList(val)
      .then(res => {
        console.log('res', res);
        let data = [];
        if (res?.message !== 'No Data Found') {
          let details = res?.data;
          details.map((el, index) => {
            data.push({
              ...el,
              sessionName: index + 1,
              courseName: el.courseName,
              termName: el.termName,
              startTime: moment(el.startDate).format('LT'),
              endTime: moment(el.endDate).format('LT'),
              startDate1: moment(el.startDate).format(KEY_DATE_FORMAT),
              // endDate: moment(el.endDate).format(KEY_DATE_FORMAT),
            });
          });
        } else {
          setNoData('You are upto date!');
        }
        data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setData([]);
        setNoData(t('No_Records'));
        setLoading(false);
      });
  };

  const onDailogOpen = id => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setLoading(true);
    const AttendanceEvent = [];
    students.forEach(student => {
      AttendanceEvent.push({
        contactId: student.contactId,
        sessionId: sessionId,
        attendanceStatus: student.checked === true ? 'Present' : 'Absent',
        reasonType: student.Reasons,
        reasonDescription: student.Description,
      });
    });
    let payload = {
      Operation: 'Create',
      AttendanceEvent: AttendanceEvent,
    };
    postAttendanceEvent(payload)
      .then(res => {
        console.log(res);
        setStudentView(true);
        // ongetStudentList(sessionId)
        onSessionList(currentSubject);
        setTimeout(() => {
          setLoading(false);
        }, 5000);

        handleSnackbarOpen('success', 'Attendance added sucessfully');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        handleSnackbarOpen('error', 'Something went Wrong');
      });
  };
  const onBackStudentsView = () => {
    setStudentView(true);
  };
  const selectedCheckBoxItem = (event, row, students) => {
    let val = event.target.checked;
    students[row.index]['checked'] = val;
    setStudents([...students]);
  };
  const handleReasons = (event, row, students) => {
    let val = event.target.value;
    students[row.index]['Reasons'] = val;
    setStudents([...students]);
  };
  const handleAttendenceDescription = (event, row, students) => {
    students[row.index]['Description'] = event.target.value;
    // setStudents([...students]);
  };

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <KenSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      {studentView ? (
        <>
          <Grid
            container
            xs={12}
            className={classes.wrapper_content}
            style={{
              //   padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid className={classes.filterBar}>
              {subject.length > 0 && (
                <KenSelect
                  value={currentSubject ? currentSubject : subject[0].value}
                  // onChange={onChangeSubject}
                  options={subject}
                  className={classes.subjectBtn}
                  placeholder={'Select'}
                  required={true}
                  label="Select Subject"
                  onChange={e => {
                    onChangeSubject(e.target.value);
                  }}
                  // defaultValue={() => {
                  //   onChangeSubject(subject[0]?.value);
                  //   return subject[0]?.value;
                  // }}
                />
              )}
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid className={classes.RightBox}>
              <KenCard
                elevation={0}
                paperStyles={{ padding: 0, boxShadow: 'none' }}
              >
                <div className="KenDiv">
                  <KenGrid
                    columns={columns}
                    data={data}
                    pagination={{ disabled: true }}
                    toolbarDisabled={true}
                    isCollasable={false}
                    noDataText={noData}
                  />
                </div>
              </KenCard>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            xs={12}
            className={classes.wrapper_content}
            style={{
              //   padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'absolute',
              top: -65,
              right: 25,
              width: '20%',
            }}
          >
            <Box display="flex" justifyContent="flex-end" my={1}>
              <KenButton onClick={onBackStudentsView} variant="secondary">
                {t('labels:Cancel')}
              </KenButton>

              <KenButton
                onClick={handleSubmit}
                variant="primary"
                style={{ marginLeft: 8 }}
              >
                {t('labels:Submit')}
              </KenButton>
            </Box>
          </Grid>
          <Grid container xs={12}>
            <Grid className={classes.RightBox}>
              <KenCard
                elevation={0}
                paperStyles={{ padding: 0, boxShadow: 'none' }}
              >
                <div className="KenStudentsDiv">
                  <KenGrid
                    columns={columns2}
                    data={students}
                    pagination={{ disabled: true }}
                    toolbarDisabled={true}
                    isCollasable={false}
                    noDataText={noData}
                  />
                </div>
              </KenCard>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
