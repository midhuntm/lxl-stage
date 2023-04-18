import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  useTheme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenSnackbar from '../../../global_components/KenSnackbar/index';
import KenHeader from '../../../global_components/KenHeader/index';
import KenButton from '../../../global_components/KenButton/index';
import KenInputField from '../../../global_components/KenInputField';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import KenGridEditable from '../../../global_components/kenGridEditable/kenGridEditable';
import KenCheckbox from '../../../global_components/KenCheckbox/index';
import KenLoader from '../../../components/KenLoader';
import KenDialogBox from '../../../components/KenDialogBox';
import KenSelect from '../../../components/KenSelect';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import Routes from '../../../utils/routes.json';
import { useHistory } from 'react-router-dom';
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineFilter,
} from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { RiCheckFill } from 'react-icons/ri';
import { MdOutlineRefresh } from 'react-icons/md';
import '../style.scss';
import {
  getCourseEnrollment,
  getCompletedEnrollment,
  getCourseOfferingByCourseAndTerm,
  postCourseEnrolmentByTerm,
} from '../../../utils/ApiService';
const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.KenColors.primary,
  },
  toolbar: {
    background: '#fff',
  },
  toolbar2: {
    background: '#F4F5F7',
    padding: 0,
  },
  combinedCell: {
    textAlign: 'center',
  },
  title: {
    fontSize: '18px',
  },
  headerTitle: {
    fontSize: 12,
    padding: '0px 6px',
    marginRight: '5px',
    lineHeight: '36px',
    height: '37px',
  },
  highlightVal: {
    color: '#fff',
    background: theme.palette.KenColors.primary,
    padding: '2px 5px',
    marginRight: '5px',
  },
  headBody: {
    width: '375px',
    background: '#fff',
    lineHeight: '36px',
    height: '37px',
    marginRight: '10px',
  },
  creditText: {
    fontSize: 12,
    color: '#505F79',
    marginRight: '5px',
    lineHeight: '33px',
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
  gradeComp: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  totalBorder: {
    height: '35px !important',
    borderBottom: '1px solid #000',
    marginTop: '20px',
  },
  refreshBtn: {
    marginBottom: '8px',
    justifyContent: 'right',
    fontSize: '12px',
    background: theme.palette.KenColors.primary,
    color: '#fff',
    borderRadius: '5px',
  },
  enrolledTitle: {
    background: '#F4F5F7',
    color: '#00218D',
    margin: '10px 0px',
  },
}));
export default function Enroll(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [termData, setTermData] = React.useState({});
  const [enrolledData, setEnrolledData] = React.useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = React.useState([]);
  const [sectionData, setSectionData] = React.useState([]);
  const [creditBalance, setCreditBalance] = React.useState(19);
  const [termMandatoryCredit, setTermMandatoryCredit] = React.useState(0);
  const [termElectiveCredit, setTermElectiveCredit] = React.useState(0);
  const [subjectMandatoryCredit, setSubjectMandatoryCredit] = React.useState(0);
  const [subjectElectiveCredit, setSubjectElectiveCredit] = React.useState(0);
  const [required, setRequired] = React.useState({});
  const [checkedData, setCheckedData] = React.useState({});
  const [accordienCheck, setAccordienCheck] = useState(true);
  const [studentEnrolled, setStudentEnrolled] = useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [creditDialog, setCreditDialog] = useState(false);
  const [enrollDialog, setEnrollDialog] = useState(false);
  const [disableEnroll, setDisableEnroll] = useState(false);
  const [noData, setNoData] = useState('Fetching...');
  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [newPayload, setNewPayload] = useState([]);
  const [submitData, setSumbitData] = useState([]);
  const {
    state: { userDetails },
  } = useAppContext();
  const columns = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={
              row?.original?.ExistingCourseConnectionsData != null
                ? true
                : value
            }
            onChange={event => selectedCheckBoxItem(event, row, data)}
            disabled={
              row?.original?.ExistingCourseConnectionsData != null
                ? true
                : false
            }
            color="primary"
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Subject Code',
      accessor: 'SubjectCode',
      disableGlobalFilter: true,
    },
    {
      Header: 'Course',
      accessor: 'courseName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Credits',
      accessor: 'credit',
      disableGlobalFilter: true,
    },
    {
      Header: 'Discipline',
      accessor: 'Discipline',
      disableGlobalFilter: true,
    },
    {
      Header: 'Pre-Requisite/CO-Requisite',
      accessor: 'PreRequisite',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'No. of Seats Left',
    //   accessor: 'SeatsLeft',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'Section View',
      accessor: 'view',
      Cell: ({ value, row }) => {
        return (
          <KenButton
            label="View"
            onClick={() => viewEnrollment(row)}
            variant="primary"
            style={{ padding: '0px' }}
            className={classes.refreshBtn}
          />
        );
      },
      disableGlobalFilter: true,
    },
  ];
  const columns2 = [
    {
      Header: 'Subject Code',
      accessor: 'SubjectCode',
      disableGlobalFilter: true,
    },
    {
      Header: 'Course',
      accessor: 'courseName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Credit',
      accessor: 'credit',
      disableGlobalFilter: true,
    },
    {
      Header: 'Section',
      accessor: 'sectionName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Faculty Name',
      accessor: 'FacultyName',
      disableGlobalFilter: true,
    },
  ];
  const columns3 = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={
              checkedData?.ExistingCourseConnectionsData?.courseOfferingId ===
              row.original.id
                ? true
                : value
            }
            onChange={event =>
              selectCourseOfferingCheck(event, row, sectionData)
            }
            disabled={
              checkedData?.ExistingCourseConnectionsData != null ? true : false
            }
            color="primary"
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Section Name',
      accessor: 'sectionName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Course Name',
      accessor: 'courseName',
      disableGlobalFilter: true,
    },
    {
      Header: 'Faculty Name',
      accessor: 'FacultyName',
      disableGlobalFilter: true,
    },
  ];
  const refreshSeatAvailable = () => {};
  const selectedCheckBoxItem = (event, row, data) => {
    if (!event.target.checked && newPayload.length > 0) {
      handleSnackbarOpen('info', 'Course Offering Removed');
      if (newPayload.length == 1) {
        setDisableSubmit(true);
      } else {
        setDisableSubmit(false);
      }
      data.forEach(item => {
        item.data.forEach(item2 => {
          if (item2?.id === row?.original?.id) {
            if (item.courseType === 'Mandatory') {
              setSubjectMandatoryCredit(
                subjectMandatoryCredit -
                  (item2.credit != null ? item2.credit : 0)
              );
            } else {
              setSubjectElectiveCredit(
                subjectElectiveCredit -
                  (item2.credit != null ? item2.credit : 0)
              );
            }
            return (item2.checked = false);
          }
        });
      });
      const tableData = newPayload.filter(
        item => item.courseId !== row?.original?.id
      );
      setNewPayload(tableData);
      setData([...data]);
    } else {
      viewEnrollment(row);
      setCheckedData(row.original);
      // handleSnackbarOpen('warning', 'Please select a section');
      data.forEach(item => {
        item?.data.forEach(items => {
          if (items.SubjectCode === row.values.SubjectCode) {
            return (items.checked = false); //event.target.checked
          }
        });
      });
      setData([...data]);
    }
  };
  const selectCourseOfferingCheck = (event, row, sectionData) => {
    // Single Selection for Section Enrollment
    let mandate, elective;
    sectionData.forEach(section => {
      if (section.id === row.original.id) {
        setDisableSubmit(false);
        return (section.checked = event.target.checked);
      } else {
        setDisableSubmit(true);
        return (section.checked = false);
      }
    });
    setSectionData([...sectionData]);
    // Outer Table Select
    let termManCredit = termData?.MandatoryCredits;
    let termEleCredit = termData?.ElectiveCredits;
    const outerTable = data.forEach(item => {
      item.data.forEach(tablData => {
        let subjectManCredit =
          Number(subjectMandatoryCredit) +
          Number(tablData.credit != null ? tablData.credit : 0);
        let subjectEleCredit =
          Number(subjectElectiveCredit) +
          Number(tablData.credit != null ? tablData.credit : 0);
        if (tablData.id === selectedEnrollment.id) {
          if (event.target.checked == true) {
            if (item.courseType === 'Mandatory') {
              mandate = Number(subjectManCredit) - Number(termManCredit);
              if (mandate > 0) {
                setDisableEnroll(true);
              } else {
                setDisableEnroll(false);
              }
              setSubjectMandatoryCredit(
                subjectMandatoryCredit +
                  (tablData.credit != null ? tablData.credit : 0)
              );
            } else {
              elective = Number(subjectEleCredit) - Number(termEleCredit);
              if (elective > 0) {
                setDisableEnroll(true);
              } else {
                setDisableEnroll(false);
              }
              setSubjectElectiveCredit(
                subjectElectiveCredit +
                  (tablData.credit != null ? tablData.credit : 0)
              );
            }
            let required = {
              mandate: mandate,
              elective: elective,
            };
            setRequired(required);
          } else {
            if (item.courseType === 'Mandatory') {
              setSubjectMandatoryCredit(
                subjectMandatoryCredit -
                  (tablData.credit != null ? tablData.credit : 0)
              );
            } else {
              setSubjectElectiveCredit(
                subjectElectiveCredit -
                  (tablData.credit != null ? tablData.credit : 0)
              );
            }
          }
          return (tablData.checked = event.target.checked);
        }
      });
    });
    setData([...outerTable]);
  };
  const enrollStudent = () => {
    setLoading(true);
    const selectedEnrolled = [];
    newPayload.forEach(item => {
      if (item.checked == true) {
        selectedEnrolled.push(item.id);
      }
    });
    console.log(selectedEnrolled, 'selectedEnrolled');
    let payload = {
      courseOfferingIds: selectedEnrolled,
      EnrolmentId: termData.EnrolmentId,
    };
    console.log('enrolledItems', payload);
    postCourseEnrolmentByTerm(payload)
      .then(res => {
        setLoading(false);
        setCreditDialog(false);
        if (res.success) {
          handleSnackbarOpen('success', res.message);
        }
        history.push(`/${Routes.completeEnroll}`);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  const viewEnrollment = row => {
    // View Enrollment
    setNoData('Fetching...');
    setSectionData([]);
    const checkedItem = row.original;
    setCheckedData(row.original);
    setSelectedEnrollment(checkedItem);
    setEnrollDialog(true);
    setLoading(true);
    let payload = {
      TermId: termData.TermId,
      CourseId: checkedItem.id,
    };
    getCourseOfferingByCourseAndTerm(payload)
      .then(res => {
        console.log(res);
        setCheckedData(row.original);
        setSectionData(res);
        setLoading(false);
        setNoData('No Data');
      })
      .catch(err => {
        setLoading(false);
        setSectionData([]);
        setNoData('No Data');
      });
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
  const confirmEnroll = () => {};
  const filterBtn = () => {};

  React.useEffect(() => {
    let contactID = userDetails.ContactId;
    setLoading(true);
    getCourseEnrollment(contactID)
      .then(res => {
        console.log(res);
        let data = [];
        let termData = res;
        res?.courseDetailsWrapperList.map(item => {
          data.push({
            courseType: item.CourseType,
            data: item.courseWrapperList,
          });
        });
        setData(data);
        console.log('data', data);
        data.map(item => {
          if (item?.courseType === 'Mandatory') {
            let credit = item?.data.map(item1 => {
              if (item1?.ExistingCourseConnectionsData != null) {
                return item1.credit;
              } else {
                return null;
              }
            });
            let creditVal = credit.reduce((a, b) => a + b);
            setSubjectMandatoryCredit(creditVal);
          } else {
            let credit = item?.data.map(item1 => {
              if (item1?.ExistingCourseConnectionsData != null) {
                return item1.credit;
              } else {
                return null;
              }
            });
            let creditVal = credit.reduce((a, b) => a + b);
            setSubjectElectiveCredit(creditVal);
          }
        });
        setTermData(termData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const creditDialogCancel = () => {
    setCreditDialog(false);
  };
  const creditDialogOpen = () => {
    console.log('new payload', newPayload);
    let checkedData = [];
    termData?.courseDetailsWrapperList.forEach(item => {
      item.courseWrapperList.forEach(item3 => {
        if (item3.checked) {
          checkedData.push(item3);
        }
      });
    });
    let submitData = [];
    checkedData.map(item => {
      newPayload.map(item2 => {
        if (item.id === item2.courseId) {
          submitData.push({
            courseName: item.courseName,
            SubjectCode: item.SubjectCode,
            credit: item.credit,
            sectionName: item2.sectionName,
            FacultyName: item2.FacultyName,
          });
        }
      });
    });
    console.log('submitData', submitData);
    setSumbitData(submitData);
    setCreditDialog(true);
  };
  const enrollDialogCancel = () => {
    // const unique = [...new Set(sectionData.map(item => item.checked))]
    const tableData = newPayload;
    sectionData.forEach(neew => {
      if (neew.checked) {
        tableData.push(neew);
      }
    });
    console.log('tableData', tableData);
    setNewPayload(tableData);
    setEnrollDialog(false);
  };
  const enrollDialogSubmit = () => {
    setEnrollDialog(false);
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
      <div
        position="static"
        elevation={0}
        className={classes.header}
        style={{ width: '100%' }}
      >
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={12} className={classes.headerLeft}>
              <Typography variant="h6" className={classes.title}>
                Open Enrollments for {termData?.TermName}
              </Typography>
            </Grid>
            {/* <Grid item xs={6} className={classes.headerRight}>
             <Typography
                className={classes.creditText}
                style={{ marginRight: '30px' }}
              >
                Credit Wallet Balance: {creditBalance}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ height: '33px' }}
              >
                Buy Credits
              </Button> 
            </Grid>*/}
          </Grid>
        </Toolbar>
        <Toolbar className={classes.toolbar2}>
          <Grid container xs={12}>
            <Grid container className={classes.headBody}>
              <Typography className={classes.headerTitle}>
                Term Requirement:
              </Typography>
              <Typography className={classes.creditText}>
                Mandatory Credit:{' '}
                <span className={classes.highlightVal}>
                  {termData?.MandatoryCredits != null
                    ? termData?.MandatoryCredits
                    : 0}
                </span>
                Elective Credit:{' '}
                <span className={classes.highlightVal}>
                  {termData?.ElectiveCredits != null
                    ? termData?.ElectiveCredits
                    : 0}
                </span>
              </Typography>
              <Typography className={classes.creditText} />
            </Grid>
            <Grid container className={classes.headBody}>
              <Typography className={classes.headerTitle}>
                Course Selected:
              </Typography>
              <Typography className={classes.creditText}>
                Mandatory Credit:{' '}
                <span className={classes.highlightVal}>
                  {subjectMandatoryCredit}
                </span>
                Elective Credit:{' '}
                <span className={classes.highlightVal}>
                  {subjectElectiveCredit}
                </span>
              </Typography>
              <Typography className={classes.creditText} />
            </Grid>
          </Grid>
        </Toolbar>
      </div>
      <Grid container xs={12}>
        {data.length > 0 ? (
          data.map((elem, index) => {
            return (
              <Grid container xs={12}>
                <Accordion
                  expanded={accordienCheck}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={accordienCheck}>
                    {accordienCheck ? (
                      <AiOutlineMinusSquare
                        size={20}
                        style={{ marginTop: '7px' }}
                        onClick={() => setAccordienCheck(!accordienCheck)}
                      />
                    ) : (
                      <AiOutlinePlusSquare
                        size={20}
                        style={{ marginTop: '7px' }}
                        onClick={() => setAccordienCheck(!accordienCheck)}
                      />
                    )}{' '}
                    &nbsp;{' '}
                    <Grid
                      item
                      xs={7}
                      style={{ marginRight: '10px', marginTop: '10px' }}
                    >
                      <span
                        style={{
                          color: theme.palette.KenColors.primary,
                          font: 'Open Sans',
                        }}
                      >
                        {elem.courseType}
                      </span>
                    </Grid>
                    <Grid
                      container
                      // xs={3}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        width: '335px',
                        justifyContent: 'right',
                      }}
                    >
                      <Grid>
                        <KenInputField
                          required
                          value={searchInput}
                          endAdornment={<BsSearch />}
                          onChange={e => setSearchInput(e.target.value)}
                          style={{ width: '250px' }}
                        />
                      </Grid>
                      {/* <Grid>
                          <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => filterBtn()}
                            variant="primary"
                            edge="start"
                            className={classes.refreshBtn}
                            style={{ marginLeft: '10px' }}
                          >
                            <AiOutlineFilter />
                            Filter
                          </IconButton>
                        </Grid> */}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12}>
                      <div className="enroll-kenGrid" style={{ width: '100%' }}>
                        <KenGrid
                          columns={columns}
                          data={elem?.data}
                          pagination={{ disabled: true }}
                          toolbarDisabled={true}
                          isCollasable={false}
                        />
                      </div>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })
        ) : (
          <></>
        )}
      </Grid>
      <Box style={{ width: '100%' }}>
        {data.length > 0 ? (
          <KenButton
            label="Submit"
            onClick={() => creditDialogOpen()}
            variant="primary"
            className={classes.refreshBtn}
            disabled={disableSubmit}
            style={{ float: 'right', marginRight: 24 }}
          />
        ) : null}
      </Box>
      {/* Popup */}
      <div className="faculty-mgmt-div">
        <KenDialogBox
          title={
            <Typography variant="h6" className={classes.dialogHeader}>
              Courses selected for enrollment
            </Typography>
          }
          open={creditDialog}
          icon={<RiCheckFill />}
          submitButtonClick={() => enrollStudent()}
          cancelButtonClick={() => creditDialogCancel()}
          showCustomButtons={true}
          submitButtonText="Enroll"
          // disableSubmit={disableEnroll}
          cancelButtonText="Cancel"
          style={{ width: '80%', height: 'auto !important' }}
          dividers
        >
          <Grid xs={12}>
            <Table>
              <TableHead>
                <TableCell />
                <TableCell>Term Requirement</TableCell>
                <TableCell>Course Selected</TableCell>
                <TableCell>Credit Surplus/Deficit</TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Mandatory Credits</TableCell>
                  <TableCell className={classes.combinedCell}>
                    {' '}
                    {termData?.MandatoryCredits != null
                      ? termData?.MandatoryCredits
                      : 0}
                  </TableCell>
                  <TableCell className={classes.combinedCell}>
                    {subjectMandatoryCredit}
                  </TableCell>
                  <TableCell className={classes.combinedCell}>
                    <span
                      className={classes.highlightVal}
                      style={
                        required?.mandate != undefined
                          ? required?.mandate > 0
                            ? { backgroundColor: 'green' }
                            : { backgroundColor: 'red' }
                          : { backgroundColor: '#fff', color: '#000' }
                      }
                    >
                      {required?.mandate != undefined ? required?.mandate : 0}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Elective Credit</TableCell>
                  <TableCell className={classes.combinedCell}>
                    {' '}
                    {termData?.ElectiveCredits != null
                      ? termData?.ElectiveCredits
                      : 0}
                  </TableCell>
                  <TableCell className={classes.combinedCell}>
                    {subjectElectiveCredit}
                  </TableCell>
                  <TableCell className={classes.combinedCell}>
                    <span
                      className={classes.highlightVal}
                      style={
                        required?.elective != undefined
                          ? required?.elective > 0
                            ? { backgroundColor: 'green' }
                            : { backgroundColor: 'red' }
                          : { backgroundColor: '#fff', color: '#000' }
                      }
                    >
                      {required?.elective != undefined ? required?.elective : 0}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {submitData.length > 0 ? (
              <div className="enrolled-data" style={{ marginTop: '20px' }}>
                <KenGrid
                  columns={columns2}
                  data={submitData}
                  pagination={{ disabled: true }}
                  toolbarDisabled={true}
                  isCollasable={false}
                />
              </div>
            ) : null}
          </Grid>
        </KenDialogBox>
      </div>
      {/* Popup2 */}
      <div className="faculty-mgmt-div">
        <KenDialogBox
          title={
            <Typography variant="h6" className={classes.dialogHeader}>
              Enroll Section
            </Typography>
          }
          open={enrollDialog}
          icon={<RiCheckFill />}
          handleClose={() => enrollDialogCancel()}
          negativeButtonClick={() => enrollDialogCancel()}
          positiveButtonClick={() => enrollDialogSubmit()}
          positiveButtonText="Ok"
          negativeButtonText="Cancel"
          style={{ width: '80%', height: 'auto !important' }}
          dividers
        >
          <Grid xs={12}>
            {sectionData.length > 0 ? (
              <KenGrid
                columns={columns3}
                data={sectionData}
                pagination={{ disabled: true }}
                toolbarDisabled={true}
                isCollasable={false}
              />
            ) : (
              <p style={{ width: '100%', textAlign: 'center' }}>{noData}</p>
            )}
          </Grid>
        </KenDialogBox>
      </div>
    </Grid>
  );
}
