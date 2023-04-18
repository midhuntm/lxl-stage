import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Paper, Radio, Card } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import KenGrid from '../../global_components/KenGrid';
import KenCard from '../../global_components/KenCard';
import moment from 'moment';
import TableData from './data.json';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import KenButton from '../../global_components/KenButton';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import KenLoader from '../../components/KenLoader';
import KenSelect from '../../global_components/KenSelect';
import './style.scss';
import RatingTable from '../../components/RatingTable';
import {
  getStudentFeedbackDetails,
  getProgramFeedbackDetails,
  postProgramFeedbackDetails,
  getStudentSessionFeedbackDetails,
  getChapterFeedbackSetup,
  getCourseConnections,
} from '../../utils/ApiService';
import KenSnackBar from '../../components/KenSnackbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.white,
    width: '100%',
  },
  base: {
    backgroundColor: 'white',
    display: 'flex',
  },
  breadCrumbWrapper: {
    margin: '15px 0',
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#505F79',
    opacity: '0.6',
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
  studentInfo: {
    // color: "#00218D",
    fontSize: '14px',
    width: '25%',
    textAlign: 'left',
  },
  tableData: {
    width: '20%',
    textAlign: 'left',
  },
  wrapper: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#00218D',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  headText: {
    fontSize: '11px',
  },
  Tcontent: {
    fontSize: '13px',
    color: '#000000',
    fontWeight: 700,
    marginTop: '8px',
  },
}));
const ActionCell = row => {
  const { id } = row.row.values;
  return (
    <Box>
      <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15 }}
      >
        Submitted
      </Button>
    </Box>
  );
};
const ButtonForMobile = row => {
  return (
    <div>
      <KenButton
        className={classes.btnLabels}
        onClick={() => {
          handleSessionForm(row?.original);
        }}
        variant="primary"
        style={{
          height: '25px',
          marginRight: '10px',
          borderRadius: '25px',
          fontSize: '12px',
          width: '120px',
          background: `${
            row?.values?.Feedback !== 'Pending' ? '#27AE60' : '#F2994A'
          }`,
        }}
        label={row?.values?.Feedback}
      />
    </div>
  );
};
export default function studentFeedback() {
  const classes = useStyles();
  const profile = getUserDetails();
  const theme = useTheme();
  const today = new Date();
  const [value, setValue] = useState(0);
  const ContactId = JSON.parse(localStorage.getItem('userDetails'))?.ContactId;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [reload, setReload] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [programItem, setProgramItem] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [breadValue, setBreadValue] = useState('EXAM SCHEDULE');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sessionData, setSessionData] = useState([]);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [courseOfferingData, setCourseOfferingData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseOfferingOptions, setCourseOfferingOptions] = useState([]);
  const [selectedCourseData, setSelectedCourseData] = useState({});
  const [tableData, setTableData] = useState([]);

  const [radioVal, setRadioVal] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: 10 },
  ]);
  const handleSessionForm = values => {
    console.log('handleSessionForm', values);
    history.push({
      pathname: `/sessionFeedBackForm`,
      state: { data: values },
    });
  };
  const columns = [
    // {
    //   Header: 'Faculty',
    //   accessor: 'Faculty',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'Chapters',
      accessor: 'chapterName',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'Subject Code',
    //   accessor: 'SubjectCode',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'Feedback Status',
      accessor: 'status',
      //   Cell:ActionCell,
      Cell: ({ row }) => {
        return (
          <div>
            <KenButton
              className={classes.btnLabels}
              onClick={() => {
                handleForm(row?.values?.status, row?.original);
              }}
              variant="primary"
              style={{
                height: '25px',
                marginRight: '10px',
                borderRadius: '25px',
                fontSize: '12px',
                width: '120px',
                background: `${
                  row?.values?.status !== 'Pending' ? '#27AE60' : '#F2994A'
                }`,
              }}
              label={row?.values?.status}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
  ];
  const columnsForFeedBack = [
    {
      Header: 'Faculty',
      accessor: 'Faculty',
      disableGlobalFilter: true,
    },
    {
      Header: 'Subject',
      accessor: 'Subject',
      disableGlobalFilter: true,
    },
    {
      Header: 'Subject Code',
      accessor: 'SubjectCode',
      disableGlobalFilter: true,
    },
    {
      Header: 'Session name',
      accessor: 'Sessionname',
      disableGlobalFilter: true,
    },
    {
      Header: 'Date',
      accessor: 'Date',
      disableGlobalFilter: true,
    },
    {
      Header: 'Time',
      accessor: 'time',
      disableGlobalFilter: true,
    },
    {
      Header: 'Feedback',
      accessor: 'Feedback',
      //   Cell:ActionCell,
      Cell: ({ row }) => {
        console.log('rowrowrow', row);
        return (
          <div>
            <KenButton
              className={classes.btnLabels}
              onClick={() => {
                handleSessionForm(row?.original);
              }}
              variant="primary"
              style={{
                height: '25px',
                marginRight: '10px',
                borderRadius: '25px',
                fontSize: '12px',
                width: '120px',
                background: `${
                  row?.values?.Feedback !== 'Pending' ? '#27AE60' : '#F2994A'
                }`,
              }}
              label={row?.values?.Feedback}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
  ];
  const arrayBreadCrumb = [
    {
      head: 'My Feedback',
    },
  ];
  const handleForm = (params, data) => {
    if (params === 'Pending') {
      history.push({
        pathname: `/studentFeedBackForm`,
        state: { data: data, courseData: selectedCourseData },
      });
    } else {
      return null;
    }
  };
  const handleFormmobile = params => {
    console.log(params);
    // if (params === 'Pending') {
    //   history.push({
    //     pathname: `/studentFeedBackForm`,
    //     state: { data: data },
    //   });
    // } else {
    //   return null;
    // }
  };
  const radioChange = (e, i, item) => {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };
  const handleProgramChange = (event, dataS, index) => {
    const newData = programData;
    newData.forEach(item => {
      if (item.FeedbackTitle === dataS.FeedbackTitle) {
        item.rating = event.target.value;
      }
    });
    setProgramData([...newData]);
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
  const onProgramSubmit = () => {
    setLoading(true);
    const payload = [];
    programData.map(item => {
      payload.push({
        parameter: item.FeedbackTitle,
        rating: item.rating,
        programId: programItem.programId,
        studentId: profile.ContactId,
        recordType: item.recordType,
      });
    });
    console.log('payload', payload);
    postProgramFeedbackDetails({ requestData: payload })
      .then(res => {
        setLoading(false);
        handleSnackbarOpen('success', 'Feedback Submitted.');
        setValue(0);
        setReload(true);
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('error', 'Something went wrong.');
        console.log(err);
      });
  };
  useEffect(() => {
    setLoading(true);
    getProgramFeedbackDetails(ContactId)
      .then(res => {
        const params = res[0].feedbackParameter.split(';');
        let data = [];
        params.map(item => {
          data.push({
            FeedbackTitle: item,
            rating: item.rating,
            recordType: res[0].recordType,
          });
        });
        setProgramItem(res[0]);
        if (res[0].feedbackStatus !== 'Submitted') {
          setFeedbackSubmitted(false);
        } else {
          setFeedbackSubmitted(true);
        }

        setProgramData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [reload]);
  useEffect(() => {
    getCourseConnections(ContactId)
      .then(res => {
        console.log(res);
        const data = res.Data?.CourseOfferings;
        let courseOfferingOptions = [];
        data.map(item => {
          courseOfferingOptions.push({
            label: item.courseName,
            value: item.courseOfferingId,
            data: item
          });
        });
        setCourseOfferingOptions(courseOfferingOptions);
        setCourseOfferingData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleSelectCourse = (e, options) => {
    setSelectedCourse(e.target.value);
    setSelectedCourseData(options[0]?.data)
    const data = courseOfferingData[0]?.CHAPTERLIST;
    setTableData(data);
  };

  const handlenextdata=()=>{
    handleSnackbarOpen('success', 'Feedback Submitted.');
    


  }
  return (
    <>
      <Box>
        {loading && <KenLoader />}
        <KenSnackBar
          message={snackbarMessage}
          severity={snackbarSeverity}
          autoHideDuration={5000}
          open={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          position="Bottom-Right"
        />
        <Grid container spacing={2} xs={12}>
          {/* <Grid item xs={3}>
            <KenSelect
              inputBaseRootClass={classes.inputBaseClass}
              options={courseOfferingOptions}
              onChange={(e)=> handleSelectCourse(e, courseOfferingOptions)}
              value={selectedCourse}
              optionalLabel={false}
              label={`Select Course`}
              name={`course`}
              variant="outline"
            />
          </Grid> */}
          {/* <Grid item xs={3}>
            <KenSelect
              inputBaseRootClass={classes.inputBaseClass}
              options={chapterOptions}
              onChange={handleSelectChapter}
              value={chapterId}
              optionalLabel={false}
              label={`Select Chapter`}
              name={`chapter`}
              variant="outline"
            />
          </Grid> */}
        </Grid>
        <div className="cardlsitbox">
          <KenCard
            elevation={0}
            paperStyles={{
              padding: 16,
              paddingLeft: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Box>
              <Box
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // padding: '0 25px',
                  width: '100%',
                }}
              >
                <AppBar
                  position="static"
                  color="default"
                  style={{ marginLeft: '9px', boxShadow: 'none' }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label=" Feedback" {...a11yProps(0)} />
                    {/* <Tab label="Institute Feedback" {...a11yProps(1)} /> */}
                  </Tabs>
                </AppBar>
                {/* <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                > */}
                {/* <Tab
                    label="Faculty Feedback"
                    {...a11yProps(0)}
                    classes={{ wrapper: classes.wrapper }}
                  /> */}
                {/* <Tab
                    style={{
                      marginLeft: '450px',
                      borderBottom:'none'
                    }}
                    label="Program Feedback"
                    {...a11yProps(1)}
                    classes={{ wrapper: classes.wrapper }}
                  /> */}
                {/* <Tab
                   style={{
                    marginLeft: '190px',
                  }}
                    label="Session Feedback"
                    {...a11yProps(2)}
                    classes={{ wrapper: classes.wrapper }}
                  /> */}
                {/* <Tab
                  label="Institute Feedback"
                  {...a11yProps(2)}
                  classes={{ wrapper: classes.wrapper }}
                /> */}
                {/* </Tabs> */}
              </Box>
            </Box>
          </KenCard>
        </div>
        <div className={classes.root}>
          <Paper elevation={3}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {isMobileScreen ? (
                  <>
                    {tableData.map((item, i, row) => {
                      return (
                        <Card style={{ marginTop: '15px', padding: '10px' }}>
                          <Grid container spacing={2}>
                            {columns.map(headText => {
                              return (
                                <>
                                  {headText?.accessor === 'Feedback' ? (
                                    <Grid
                                      item
                                      xs={12}
                                      style={{ marginTop: '10px' }}
                                    >
                                      <>
                                        <KenButton
                                          className={classes.btnLabels}
                                          onClick={() => {
                                            handleForm(
                                              data[i].Feedback,
                                              data[i]
                                            );
                                          }}
                                          variant="primary"
                                          style={{
                                            height: '20px',
                                            marginRight: '10px',
                                            borderRadius: '25px',
                                            fontSize: '12px',
                                            width: '100%',
                                            background: `${
                                              data[i].Feedback !== 'Pending'
                                                ? '#27AE60'
                                                : '#F2994A'
                                            }`,
                                          }}
                                          label={data[i].Feedback}
                                        />
                                      </>
                                    </Grid>
                                  ) : (
                                    <Grid
                                      item
                                      xs={6}
                                      style={{ marginTop: '10px' }}
                                    >
                                      <>
                                        {headText?.Header !== 'Feedback' && (
                                          <Typography
                                            className={classes.headText}
                                          >
                                            {String(
                                              headText?.Header
                                            ).toUpperCase()}{' '}
                                          </Typography>
                                        )}
                                        {
                                          <Typography
                                            className={classes.Tcontent}
                                          >
                                            {item?.[headText?.accessor]}
                                          </Typography>
                                        }
                                      </>
                                    </Grid>
                                  )}
                                </>
                              );
                            })}
                          </Grid>
                        </Card>
                      );
                    })}
                  </>
                ) : (
                  <div className="KenDiv">
                    <KenGrid
                      columns={columns}
                      data={courseOfferingData[0]?.CHAPTERLIST}
                      pagination={{ disabled: true }}
                      tableTotal={{ disabled: true, checkbox: true }}
                      getRowProps={{ selected: true }}
                      toolbarDisabled={true}
                    />
                  </div>
                )}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {programData?.length > 0 ? (
                  !feedbackSubmitted ? (
                    <RatingTable
                      parameters={programData}
                      handleChange={handleProgramChange}
                      // onSubmit={onProgramSubmit}
                      onSubmit={handlenextdata}

                    />
                  ) : (
                    <div style={{ height: 'calc(100vh - 50vh)' }}>
                      <Typography
                        style={{
                          textAlign: 'center',
                          top: '50%',
                          position: 'relative',
                        }}
                      >
                        Your Feedback is already submitted.
                      </Typography>
                    </div>
                  )
                ) : (
                  <div style={{ height: 'calc(100vh - 50vh)' }}>
                    <Typography
                      style={{
                        textAlign: 'center',
                        top: '50%',
                        position: 'relative',
                      }}
                    >
                      No Program Feedbacks
                    </Typography>
                  </div>
                )}
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="KenDiv">
                  <KenGrid
                    columns={columnsForFeedBack}
                    data={sessionData}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                    toolbarDisabled={true}
                  />
                </div>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <RatingTable parameters={['', '', '', '', '']} />
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </div>
      </Box>
    </>
  );
}
