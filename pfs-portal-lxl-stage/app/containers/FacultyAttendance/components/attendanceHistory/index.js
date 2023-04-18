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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControlLabel,
  Checkbox,
  IconButton,
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
import KenLoader from '../../../../components/KenLoader';
import '../../styles.scss';
import KenSelect from '../../../../global_components/KenSelect';
import {
  KEY_ATTENDANCE_PROGRESS_VALUES,
  KEY_DATE_FORMAT,
} from '../../../../utils/constants';
import {
  getCompletedEnrollment,
  getSessionListFilter,
  getattendancePerSession,
  postAttendanceEvent,
} from '../../../../utils/ApiService';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import moment from 'moment';
import KenDateTimePicker from '../../../../global_components/KenDateTimePicker/index';
import KenGridEditable from '../../../../global_components/kenGridEditable/kenGridEditable';
import EditIcon from '@material-ui/icons/EditOutlined';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import KenSnackbar from '../../../../components/KenSnackbar';
import KenDatePicker from '../../../../components/KenDatePicker';

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
    textAlign: 'left !important',
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
    // marginRight: 20,
    textAlign: 'center',
  },
  session__subtext: {
    margin: 0,
  },
  inputClass: {
    padding: '10px 26px 10px 12px !important',
    background: 'red',
  },
}));
export default function AttendanceHistory(props) {
  const classes = useStyles();
  const kenTheme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('Select');
  const [subject, setSubject] = useState([]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentSubjectName, setCurrentSubjectName] = useState('');
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentView, setStudentView] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [previous, setPrevious] = useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [sessionId, setSessionId] = useState();
  const [reasonTypeOptions, setReasonTypeOptions] = useState([]);
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));

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

  const onClickViewAttendance = (row, data) => {
    setStudentView(false);
    let id = row['original']?.id;
    setSessionId(id);
    setLoading(true);
    ongetAttendancePerSession(id);
    //  getattendancePerSession(row['original'].id)
    //   .then(res => {
    //     console.log('res', res);
    //     let data = [];
    //     if (res?.message !== 'No Data Found') {
    //       let details = res?.data[0]?.attendance;
    //       details.map(el => {
    //         data.push({
    //           ...el,
    //           checked: el.attendanceStatus == 'Absent' ? false : true,
    //           contactName: el.contactName,
    //           id: el.contactId,
    //           contactEmail: el.contactEmail,
    //           attendanceId: el.attendanceEventId,
    //         });
    //       });
    //     }
    //     setStudents(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     setStudents([]);
    //     setLoading(false);
    //   });
  };

  const ongetAttendancePerSession = id => {
    setLoading(true);
    setNoData(t('messages:Fetching_Data'));
    getattendancePerSession(id)
      .then(res => {
        console.log('res', res);
        let data = [];
        let reasonsList = [];
        if (res?.message !== 'No Data Found') {
          let details = res?.data[0]?.attendance;
          if (details.length > 0) {
            details.map(el => {
              data.push({
                ...el,
                checked: el.attendanceStatus === 'Absent' ? false : true,
                contactName: el.contactName,
                reasonType: el?.reasonType,
                reasonDescription: el?.reasonDescription,
                id: el.contactId,
                contactEmail: el.contactEmail,
                attendanceId: el.attendanceEventId,
              });
            });
          }else{
            setNoData(t('No_Records'));
          }
          res?.data[0]?.reasonDropdownValues.map(item => {
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
        setNoData(t('No_Records'));
        setStudents([]);
        setLoading(false);
      });
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
      Header: 'Start Date',
      accessor: 'startDate1',
      disableGlobalFilter: true,
    },
    {
      Header: 'End Date',
      accessor: 'endDate1',
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
    {
      Header: 'ATTENDANCE',
      accessor: 'attendance',
      Cell: ({ value, row }) => {
        return (
          <>
            <KenButton
              variant="contained"
              color="primary"
              style={{
                marginRight: '15px',
                // background: '#092682',
                // fontSize: 12,
                // width: 80,
              }}
              className={classes.addButton}
              onClick={() => onClickViewAttendance(row, data)}
            >
              {'View'}
            </KenButton>
          </>
        );
      },
      disableGlobalFilter: true,
      disableGlobalFilter: true,
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
        setCurrentSubjectName(data[0]?.label);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setSubject([]);
        setLoading(false);
      });
  }, []);

  const onChangeSubject = (val, subject) => {
    let subjectFilter = subject.filter(item => {
      if (item.value === val) {
        return item;
      }
    });
    setCurrentSubject(val);
    setCurrentSubjectName(subjectFilter[0].label);
  };

  useEffect(() => {
    if (currentSubject) {
      setLoading(true);
      setData([]);
      setNoData(t('messages:Fetching_Data'));
      const StartDate = selectedStartDate ? `${selectedStartDate}.000Z` : '';
      const EndDate = selectedEndDate ? `${selectedEndDate}.000Z` : '';
      const courseOfferingId = currentSubject;
      getSessionListFilter(StartDate, EndDate, courseOfferingId)
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
                startDate1: moment(el.startDate).format(KEY_DATE_FORMAT),
                endDate1: moment(el.endDate).format(KEY_DATE_FORMAT),
                startTime: moment(el.startDate).format('LT'),
                endTime: moment(el.endDate).format('LT'),
              });
            });
          } else {
            setNoData(t('No_Records'));
          }
          data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setData([]);
          setLoading(false);
          setNoData(t('No_Records'));
        });
    }
  }, [currentSubject, selectedStartDate, selectedEndDate]);

  const onDailogOpen = id => {
    setOpen(true);
  };
  const handleSubmit = () => {};
  const onBackStudentsView = () => {
    setStudentView(true);
  };
  const selectedCheckBoxItem = (event, row, students) => {
    students[row.index]['checked'] = event.target.checked;
    setStudents([...students]);
  };

  const handleStartDateChange = date => {
    let startDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setSelectedStartDate(startDate);
  };

  const handleEndtDateChange = date => {
    let endDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setSelectedEndDate(endDate);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value =
      e.target.name == 'checked' ? e.target.checked : e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newData = [...students];
    newData.forEach(row => {
      if (row.id === id) {
        row[name] = value;
      }
    });
    setStudents(newData);
  };

  const onToggleEditMode = (check, id, index) => {
    const newData = [...students];
    newData.forEach(row => {
      if (row.id === id) {
        row.isEditMode = true;
        if (check === 'done') {
          console.log('students', students);
          setLoading(true);
          const AttendanceEvent = [];
          students.forEach(student => {
            if (id === student.contactId) {
              AttendanceEvent.push({
                contactId: student.contactId,
                eventId: student.attendanceId,
                sessionId: sessionId,
                attendanceStatus:
                  student.checked === true ? 'Present' : 'Absent',
                reasonType: student.reasonType,
                reasonDescription: student.reasonDescription,
              });
            }
          });
          let payload = {
            Operation: 'Create',
            AttendanceEvent: AttendanceEvent,
          };
          postAttendanceEvent(payload)
            .then(res => {
              console.log(res);
              row.isEditMode = false;
              ongetAttendancePerSession(sessionId);
              setLoading(false);
              handleSnackbarOpen('success', 'Attendance added sucessfully');
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
              handleSnackbarOpen('error', 'Something went Wrong');
            });
        } else if (check === 'edit') {
          row.isEditMode = true;
          setStudents(newData);
        }
      }
    });
    // setEditIndex(index);
  };
  const onRevert = (id, students, index) => {
    const newData = [...students];
    newData.map(row => {
      if (row.id === id) {
        return (row.isEditMode = false);
      }
    });
    setStudents(newData);
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={3} style={{ paddingLeft: 16 }}>
              {subject.length > 0 && (
                <KenSelect
                  value={currentSubject ? currentSubject : subject[0].value}
                  // onChange={onChangeSubject}
                  onChange={e => {
                    onChangeSubject(e.target.value, subject);
                  }}
                  options={subject}
                  placeholder={'Select'}
                  required={true}
                  label="Select Subject"
                />
              )}
            </Grid>
            <Grid item xs={3} style={{ paddingRight: ' 0px' }}>
              <KenDatePicker
                name={'startDate'}
                label="Start Date"
                value={selectedStartDate}
                required={true}
                onChange={e => handleStartDateChange(e)}
                maxDate={selectedEndDate ? new Date(selectedEndDate) : null}
              />
            </Grid>
            <Grid item xs={3} style={{ paddingRight: ' 0px' }}>
              <KenDatePicker
                name={'endDate'}
                label="End Date"
                value={selectedEndDate}
                required={true}
                onChange={e => handleEndtDateChange(e)}
                minDate={new Date(selectedStartDate)}
              />
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
          {/* <Grid container xs={12}>
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
                  />
                </div>
              </KenCard>
            </Grid>
          </Grid> */}
          <KenCard elevation={0} className="KenStudentsDiv">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
              my={1}
            >
              <p>{currentSubjectName}</p>
              <KenButton
                onClick={onBackStudentsView}
                variant="secondary"
                style={{ height: 40 }}
              >
                {t('Back')}
              </KenButton>
            </Box>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead
                style={{
                  fontSize: 13,
                  background: 'whitesmoke',
                  fontWeight: 'bold',
                }}
              >
                <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left" style={{ width: '20%' }}>
                    STUDENT NAME
                  </TableCell>
                  <TableCell align="left" style={{ width: '20%' }}>
                    REASON TYPE
                  </TableCell>
                  <TableCell align="left" style={{ width: '40%' }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell align="left" style={{ width: '14%' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((row, index) => {
                    return (
                      <TableRow key={row.id}>
                        <KenGridEditable
                          {...{
                            row,
                            onChange,
                            columns: [
                              {
                                column_name: 'checked',
                                is_inline_edit: false,
                                inline_edit_type: 'kenCheckbox',
                                disabled: row.isEditMode ? false : true,
                                label: '',
                              },
                              {
                                column_name: 'contactName',
                                is_inline_edit: false,
                                inline_edit_type: '',
                                label: 'Student Name',
                              },
                              {
                                column_name: 'reasonType',
                                is_inline_edit: false,
                                inline_edit_type: 'kenSelect',
                                dropdown: reasonTypeOptions,
                                // label: 'Reason Type',
                              },
                              {
                                column_name: 'reasonDescription',
                                is_inline_edit: false,
                                inline_edit_type: 'kenInput',
                                label: 'Description',
                              },
                            ],
                          }}
                        />
                        <TableCell
                          className={classes.selectTableCell}
                          style={{ textAlign: 'left' }}
                        >
                          {row.isEditMode ? (
                            <>
                              <KenButton
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  onToggleEditMode('done', row.id, index)
                                }
                              >
                                Save
                              </KenButton>
                              <IconButton
                                aria-label="revert"
                                onClick={() =>
                                  onRevert(row.id, students, index)
                                }
                              >
                                <RevertIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              {!row.saved && (
                                // <IconButton
                                //   aria-label="edit"
                                //   onClick={() =>
                                //     onToggleEditMode('edit', row.id, index)
                                //   }
                                //   style={{textAlign:"left"}}
                                // >
                                //   <EditIcon />
                                // </IconButton>
                                <KenButton
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    onToggleEditMode('edit', row.id, index)
                                  }
                                  style={{ textTransform: 'none' }}
                                >
                                  Edit
                                  <span style={{ marginLeft: 10 }}>
                                    <EditIcon />
                                  </span>
                                </KenButton>
                              )}
                              {row.saved && (
                                <>
                                  <KenButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      handleSubject('save', rows, index)
                                    }
                                  >
                                    Save
                                  </KenButton>
                                  <IconButton
                                    aria-label="revert"
                                    onClick={() =>
                                      handleCancel(row.id, rows, index)
                                    }
                                  >
                                    <RevertIcon />
                                  </IconButton>
                                </>
                              )}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    {' '}
                    <TableCell
                      className={classes.noDataFound}
                      colSpan={6}
                      align="center"
                    >
                      {noData}
                    </TableCell>{' '}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </KenCard>
        </>
      )}
    </Grid>
  );
}
