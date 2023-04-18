import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Breadcrumbs, Grid, Paper, Radio } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import KenGrid from '../../global_components/KenGrid';
import TableData from './data.json';
import KenButton from '../../global_components/KenButton';
import KenHeader from '../../global_components/KenHeader';

import KenSelect from '../../global_components/KenSelect';
import Button from '@material-ui/core/Button';
// import history from '../../utils/history';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import RatingTable from '../../components/RatingTable';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getCourseConnections } from '../../utils/ApiService';
import { getUserDetails } from '../../utils/helpers/storageHelper';

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

export default function studentFeedback() {
  const classes = useStyles();
  const theme = useTheme();
  const ContactId = JSON.parse(localStorage.getItem('userDetails'))?.ContactId;
  const [value, setValue] = React.useState(0);
  const [data, setdata] = React.useState(TableData);
  const [breadValue, setBreadValue] = useState('EXAM SCHEDULE');
  const history = useHistory();
  const [courseOfferingData, setCourseOfferingData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseOfferingOptions, setCourseOfferingOptions] = useState([]);
  const [selectedCourseData, setSelectedCourseData] = useState({});
  const [tableData, setTableData] = useState([]);
  const userDetails = getUserDetails();

  const [radioVal, setRadioVal] = useState([
    { id: 1, value: false },
    { id: 2, value: false },
    { id: 3, value: false },
    { id: 4, value: false },
    { id: 5, value: false },
    { id: 6, value: false },
    { id: 7, value: false },
    { id: 8, value: false },
    { id: 9, value: false },
    { id: 10, value: false },
  ]);
  const columns = [
    {
      Header: 'Grade',
      accessor: 'Program',
      disableGlobalFilter: true,
    },
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
              // className={classes.btnLabels}
              onClick={() => {
                handleForm(row?.values?.status, row?.original);
              }}
              //   value={cell?.accessor}
              variant="primary"
              style={{
                height: '25px',
                marginRight: '10px',
                borderRadius: '25px',
                fontSize: '12px',
                width: '120px',
                background: `${row?.values?.status !== 'Pending' ? '#27AE60' : '#F2994A'
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
  const arrayBreadCrumb = [
    {
      head: 'My Feedback',
    },
  ];

  const handleForm = (params, data) => {
    if (params === 'Pending') {
      history.push({
        pathname: `/facultFeedBackForm`,
        state: { data: data, courseData: selectedCourseData },
      });
    } else {
      return null;
    }
  };

  const radioChange = (e, i, item) => { };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  React.useEffect(() => {
    getCourseConnections(ContactId)
      .then(res => {
        console.log(res);
        const data = res.Data?.CourseOfferings;
        let courseOfferingOptions = [];
        data.map(item => {
          courseOfferingOptions.push({
            label: item.courseName,
            value: item.courseOfferingId,
            data: item,
          });
        });
        setCourseOfferingOptions(courseOfferingOptions);
        setCourseOfferingData(data);
      })
      .catch(err => {
        console.log(err); courseOfferingData
      });
  }, []);
  const handleSelectCourse = (e, options) => {
    setSelectedCourse(e.target.value);
    setSelectedCourseData(options[0]?.data);
    const data = courseOfferingData[0]?.CHAPTERLIST;
    setTableData(data);
  };

  // "Faculty" // "Faculty"chapterName
  console.log("data", courseOfferingData[0]?.CHAPTERLIST);
  console.log("data", courseOfferingData[0]?.CHAPTERLIST[0]?.chapterAccess === "Parent" ? courseOfferingData[0]?.CHAPTERLIST[0]?.chapterName : null);
  console.log("data", courseOfferingData[0]?.CHAPTERLIST[1]?.chapterAccess === "Faculty" ? courseOfferingData[0]?.CHAPTERLIST[1]?.chapterName : null);

  // chapterAccess
  return (
    <>
      <div>
        <Grid item xs={12} sm={12} md={12}>
          <KenHeader title="FeedBack">
            <KenButton
              variant="primary"
              label="Back"
              onClick={() => history.goBack()}
            />
          </KenHeader>
        </Grid>

      </div>
      <div>
        <Box className={classes.breadCrumbWrapper}>
          {/* <BreadCrumb array={arrayBreadCrumb} /> */}
        </Box>
      </div>
      {/* <Grid container spacing={2} xs={12}>
        <Grid item xs={3}>
          <KenSelect
            inputBaseRootClass={classes.inputBaseClass}
            options={courseOfferingOptions}
            onChange={e => handleSelectCourse(e, courseOfferingOptions)}
            value={selectedCourse}
            defaultValue={selectedCourse}
            optionalLabel={false}
            label={`Select Course`}
            name={`course`}
            variant="outline"
          />
        </Grid>
      </Grid> */}

      <Grid container spacing={2} className={classes.base}>

        <div className={classes.root}>
          <Grid container item={12}>
            <AppBar position="static" color="default">
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
          </Grid>
          <Paper elevation={3}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="KenDiv">
                  <KenGrid
                    columns={columns}
                    data={courseOfferingData[0]?.CHAPTERLIST.filter(data => data.chapterAccess == "Faculty")}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                    toolbarDisabled={true}
                  />
                </div>
              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                <RatingTable
                  parameters={[
                    'Course Structure',
                    'Planning + Coordination',
                    'Student Behavior',
                    'Resources + Support',
                    'Tech Infrastructure',
                  ]}
                />
                {/* <table className={classes.amtTable}>
                  <Box pl={1} className={classes.cartBody}>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <th className={classes.tableData}>Parameters</th>
                      <th
                        className={classes.tableData1}
                        style={{ textAlign: 'center' }}
                      >
                        Rating
                      </th>
                      <th className={classes.studentInfo}>Submit Date</th>
                      <th className={classes.studentInfo}>
                        Last Modified Date
                      </th>
                    </tr>
                  </Box>
                  <tbody>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <td
                        className={classes.tableData}
                        style={{ padding: '10px' }}
                      >
                        <Typography style={{ fontSize: '15px' }}>
                          {' '}
                          Command over the Subject
                        </Typography>
                      </td>
                      <td
                        className={classes.tableData1}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {radioVal.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.id}
                              <Radio
                                size="small"
                                color="primary"
                                name="radio"
                                value={item.value}
                                onChange={e => {
                                  radioChange(e, i, item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <td
                        className={classes.tableData}
                        style={{ padding: '10px' }}
                      >
                        <Typography style={{ fontSize: '15px' }}>
                          Communication
                        </Typography>
                      </td>
                      <td
                        className={classes.tableData1}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {radioVal.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.id}
                              <Radio
                                size="small"
                                color="primary"
                                name="value"
                                value={item.value}
                                onChange={e => {
                                  radioChange(e, i, item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <td
                        className={classes.tableData}
                        style={{ padding: '10px' }}
                      >
                        <Typography style={{ fontSize: '15px' }}>
                          Class Control
                        </Typography>
                      </td>
                      <td
                        className={classes.tableData1}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {radioVal.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.id}
                              <Radio
                                size="small"
                                color="primary"
                                name="value"
                                value={item.value}
                                onChange={e => {
                                  radioChange(e, i, item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <td
                        className={classes.tableData}
                        style={{ padding: '10px' }}
                      >
                        <Typography style={{ fontSize: '15px' }}>
                          Punctuality
                        </Typography>
                      </td>
                      <td
                        className={classes.tableData1}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {radioVal.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.id}
                              <Radio
                                size="small"
                                color="primary"
                                name="value"
                                value={item.value}
                                onChange={e => {
                                  radioChange(e, i, item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <td
                        className={classes.tableData}
                        style={{ padding: '10px' }}
                      >
                        <Typography style={{ fontSize: '15px' }}>
                          Online Conduction{' '}
                        </Typography>
                      </td>
                      <td
                        className={classes.tableData1}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {radioVal.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.id}
                              <Radio
                                size="small"
                                color="primary"
                                name={'value' + i}
                                value={item.value}
                                onChange={e => {
                                  radioChange(e, i, item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ textAlign: 'end', paddingRight: '15px' }}>
                  <KenButton
                    // className={classes.btnLabels}
                    variant="primary"
                    // style={{ height: 36, marginRight: '10px' }}
                  >
                    Submit
                  </KenButton>
                </div> */}
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </div>
      </Grid>
    </>
  );
}
