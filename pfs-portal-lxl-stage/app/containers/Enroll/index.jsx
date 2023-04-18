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
import KenHeader from '../../global_components/KenHeader/index';
import KenButton from '../../global_components/KenButton/index';
import KenSnackBar from '../../components/KenSnackbar';
import KenInputField from '../../global_components/KenInputField';
import KenCard from '../../global_components/KenCard';
import KenGrid from '../../global_components/KenGrid';
import KenGridEditable from '../../global_components/kenGridEditable/kenGridEditable';
import KenCheckbox from '../../global_components/KenCheckbox/index';
import KenLoader from '../../components/KenLoader';
import KenDialogBox from '../../components/KenDialogBox';
import KenSelect from '../../components/KenSelect';
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineFilter,
} from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { RiCheckFill } from 'react-icons/ri';
import { MdOutlineRefresh } from 'react-icons/md';
import './style.scss';
import EnrollData from './data.json';
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
    background: '#092682',
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
    background: '#00218D !important',
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
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [enrolledData, setEnrolledData] = React.useState([]);
  const [creditBalance, setCreditBalance] = React.useState(19);
  const [termMandatoryCredit, setTermMandatoryCredit] = React.useState(3);
  const [termElectiveCredit, setTermElectiveCredit] = React.useState(3);
  const [subjectMandatoryCredit, setSubjectMandatoryCredit] = React.useState(3);
  const [subjectElectiveCredit, setSubjectElectiveCredit] = React.useState(3);
  const [accordienCheck, setAccordienCheck] = useState(true);
  const [studentEnrolled, setStudentEnrolled] = useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [creditDialog, setCreditDialog] = useState(false);
  const columns = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={value}
            onChange={event => selectedCheckBoxItem(event, row, data)}
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
      accessor: 'Course',
      disableGlobalFilter: true,
    },
    {
      Header: 'Credits',
      accessor: 'Credits',
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
    {
      Header: 'No. of Seats Left',
      accessor: 'SeatsLeft',
      disableGlobalFilter: true,
    },
  ];
  const columns2 = [
    {
      Header: 'S.No.',
      accessor: 'No',
      disableGlobalFilter: true,
    },
    {
      Header: 'Subject Code',
      accessor: 'SubjectCode',
      disableGlobalFilter: true,
    },
    {
      Header: 'Course',
      accessor: 'Course',
      disableGlobalFilter: true,
    },
    {
      Header: 'Credits',
      accessor: 'Credits',
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
  ];
  const refreshSeatAvailable = () => {};
  const selectedCheckBoxItem = (event, row, data) => {
    data.map(item => {
      item?.data.map(items => {
        if (items.SubjectCode === row.values.SubjectCode) {
          return (items.checked = event.target.checked);
        }
      });
    });
    setData([...data]);
  };
  const enrollStudent = () => {
    setStudentEnrolled(true);
    setCreditDialog(true);
  };
  const editEnroll = () => {
    setStudentEnrolled(false);
  };
  const confirmEnroll = () => {};
  const filterBtn = () => {};
  React.useEffect(() => {
    const data = [];
    Object.entries(EnrollData.Enroll).map((item, index) => {
      item[1].forEach(val => {
        return (val.checked = false);
      });
      data.push({
        courseType: item[0],
        data: item[1],
      });
    });
    setData(data);
    const enrolledData = [];
    Object.entries(EnrollData.Enrolled).map((item, index) => {
      item[1].forEach(val => {
        return (val.checked = false);
      });
      enrolledData.push({
        courseType: item[0],
        data: item[1],
      });
    });
    setEnrolledData(enrolledData);
  }, []);

  const creditDialogCancel = () => {
    setCreditDialog(false);
  };
  const creditDialogSubmit = () => {
    setCreditDialog(false);
  };
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <AppBar position="static" elevation={0} className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={6} className={classes.headerLeft}>
              <Typography variant="h6" className={classes.title}>
                {/* Enroll */}
                Course enrollment for BBA-2022-Jan- Term 2
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.headerRight}>
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
            </Grid>
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
                  {termMandatoryCredit}
                </span>
                Elective Credit:{' '}
                <span className={classes.highlightVal}>
                  {termElectiveCredit}
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
            {!studentEnrolled ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => refreshSeatAvailable()}
                variant="primary"
                edge="start"
                className={classes.refreshBtn}
                style={{ padding: '6px', position: 'absolute', right: '0px' }}
              >
                <MdOutlineRefresh
                  style={{
                    color: '#fff',
                    fontSize: '25px',
                    paddingRight: '6px',
                  }}
                />
                Refresh Seat Availability
              </IconButton>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
      {!studentEnrolled ? (
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
                        <span style={{ color: '#092682', font: 'Open Sans' }}>
                          {elem.courseType}
                        </span>
                      </Grid>
                      <Grid
                        container
                        xs={4}
                        style={{ position: 'absolute', right: '-72px' }}
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
                        <Grid>
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
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container xs={12}>
                        <div
                          className="enroll-kenGrid"
                          style={{ width: '100%' }}
                        >
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
      ) : (
        <Grid container xs={12}>
          {enrolledData.length > 0
            ? enrolledData.map((elem, index) => {
                return (
                  <>
                    <Typography className={classes.enrolledTitle}>
                      {elem.courseType}
                    </Typography>
                    <KenCard container xs={12} style={{ marginTop: '10px' }}>
                      <div
                        className="enroll-kenGrid2"
                        style={{ width: '100%', background: '#fff' }}
                      >
                        <KenGrid
                          columns={columns2}
                          data={elem?.data}
                          pagination={{ disabled: true }}
                          toolbarDisabled={true}
                          isCollasable={false}
                        />
                      </div>
                    </KenCard>
                  </>
                );
              })
            : null}
        </Grid>
      )}
      <Box style={{ width: '100%' }}>
        {!studentEnrolled ? (
          <KenButton
            label="Enroll"
            onClick={() => enrollStudent()}
            variant="primary"
            className={classes.refreshBtn}
            style={{ float: 'right' }}
          />
        ) : (
          <>
            <KenButton
              label="Confirm"
              onClick={() => confirmEnroll()}
              variant="primary"
              className={classes.refreshBtn}
              style={{ float: 'right', marginTop: '10px' }}
            />
            <KenButton
              label="Edit"
              onClick={() => editEnroll()}
              variant="primary"
              className={classes.refreshBtn}
              style={{ float: 'right', marginRight: '10px', marginTop: '10px' }}
            />
          </>
        )}
      </Box>
      {/* Popup */}
      <div className="faculty-mgmt-div">
        <KenDialogBox
          title={
            <Typography variant="h6" className={classes.dialogHeader}>
              Credit Requirement
            </Typography>
          }
          open={creditDialog}
          icon={<RiCheckFill />}
          handleClose={() => creditDialogCancel()}
          negativeButtonClick={() => creditDialogCancel()}
          positiveButtonClick={() => creditDialogSubmit()}
          positiveButtonText="Ok"
          negativeButtonText="Cancel"
          style={{ width: '80%', height: 'auto !important' }}
          dividers
        >
          <Grid xs={12}>
            {/* <Typography style={{color: 'red'}}>You are short of 3 mandatory credits and exceed 2 elective credits.</Typography> */}
            <Typography style={{color: 'green'}}>You have selected courses as per the term credit requirement</Typography>
          </Grid>
        </KenDialogBox>
      </div>
    </Grid>
  );
}
