import React, { useState } from 'react';
import {
  Grid,
  Typography,
  useTheme,
  Box,
  CircularProgress,
  
} from '@material-ui/core';
import { makeStyles,createMuiTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenButton from '../../../../global_components/KenButton/index';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
// import KenDateTimePicker from '../../../../global_components/KenDateTimePicker';
// import KenGridEditable from '../../../../global_components/kenGridEditable/kenGridEditable';
import KenLoader from '../../../../components/KenLoader';
//  import '../style.css';
// import KenSelect from '../../../../global_components/KenSelect';
import { KEY_ATTENDANCE_PROGRESS_VALUES } from '../../../../utils/constants';
import KenDialogBox from '../../../../components/KenDialogBox/index';
import DetailsPopup from '../DetailsPopup/index';
import { getAttendanceInfo } from '../../../../utils/ApiService';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import './current.css';
import SessionCards from '../sessionCards';
import moment from 'moment';
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
    width: '150px',
    height: 69,
    border: '1px solid #092682',
    marginRight: 20,
    textAlign: 'center',
  },
  session__subtext: {
    margin: 0,
  },
  root: {
    // minHeight: '100vh',
    width: '100%',
    paddingLeft: 20,
    [theme.breakpoints.only('xs')]: {
      padding: '0px 0px 20px 0px',
    },
  },
  maskWrap: {
    position: 'relative',
    height: '100%',
  },
  grid: {
    [theme.breakpoints.only('xs')]: {
      margin: '0px 0px 0px -8px',

      '& > .MuiGrid-item': {
        padding: 8,
      },
    },
  },
}));
export default function GradeBook(props) {
  const classes = useStyles();
  const kenTheme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [currentMonth, setCurrentMonth] = React.useState('Select');
  const [open, setOpen] = React.useState(false);
  const [courseData, setCourseData] = React.useState([]);
  const [courseDataSingle, setCourseDataSingle] = React.useState([]);
  const [totalAtnd, setTotalAtnd] = React.useState(0);
  const [absentSession, setAbsenceAttendance] = React.useState(0);
  const [courseOfferingId, setCourseOfferingId] = React.useState();
  const [sessions, setSessions] = React.useState(0);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedData, setSelectedData] = React.useState();
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));
  const userDetails = getUserDetails();
  console.log('user==========', userDetails);
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

  const columns = [
    {
      Header: 'SUBJECT NAME',
      accessor: 'subjectName',
      disableGlobalFilter: true,
    },
    {
      Header: 'SECTION',
      accessor: 'section',
      disableGlobalFilter: true,
    },
    {
      Header: 'VIEW',
      accessor: 'view',
      Cell: ({ value, row }) => {
        console.log('valuevaluevaluevalue', value, row);
        return (
          <>
            <KenButton
              variant="contained"
              color="primary"
              style={{
                marginRight: '15px',
                // background: '#092682',
                // fontSize: 12,
                // width: 120,
              }}
              className={classes.addButton}
              onClick={() => onDailogOpen(value, row)}
            >
              {'VIEW DETAILS'}
            </KenButton>
          </>
        );
      },
      disableGlobalFilter: true,
      disableGlobalFilter: true,
    },
    {
      Header: 'TOTAL ATTENDANCE',
      accessor: 'totalAttendance',
      disableGlobalFilter: true,
      Cell: ({ value, row }) => {
        return (
          <div>
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={value}
                size={40}
                //   thickness={6}
                circle={getCircleColor(+value)}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                >
                  {value}%
                </Typography>
              </Box>
            </Box>
          </div>
        );
      },
    },
  ];

  const handleChangedStartDate = date => {
    let startDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setStartDate(startDate);
  };

  const handleChangedEndDate = date => {
    let endDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setEndDate(endDate);
  };

  React.useEffect(() => {
    setNoData(t('messages:Fetching_Data'));
    setCourseData([]);
    const selectedStartDate = startDate ? `${startDate}.000Z` : '';
    const selectedEndDate = endDate ? `${endDate}.000Z` : '';
    getAttendanceInfo(userDetails.ContactId, selectedStartDate, selectedEndDate)
      .then(res => {
        setLoading(true);
        setTotalAtnd(
          res?.AttendancePercentageForAll ? res?.AttendancePercentageForAll : 0
        );
        setAbsenceAttendance(
          res?.AbsentClassesForAll ? res?.AbsentClassesForAll : 0
        );
        setSessions(res?.TotalClassesForAll ? res?.TotalClassesForAll : 0);
        // setAttendance(res?.AttendancePercentageForAll);
        setCourseDataSingle(res.courseLevelAttendanceList);
        setCourseData(
          res.courseLevelAttendanceList.map(item => {
            console.log('item.CourseOfferingId', item.CourseOfferingId);
            return {
              subjectName: item.CourseName,
              section: item.SectionId,
              view: item.CourseOfferingId,
              totalAttendance: item.AttendancePercentage,
            };
          })
        );
        setNoData(t('No_Records'));
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setNoData(t('No_Records'));
      });
  }, [startDate, endDate]);

  const changeLang = e => {
    setCurrentMonth(e.target.value);
  };

  const onDailogOpen = (id, row) => {
    setCourseOfferingId(id);
    console.log('id===============', id, row);
    setSelectedData(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <Grid
        container
        xs={12}
        className={classes.wrapper_content}
        style={{
          //   padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
        }}
      >
        <Grid container xs={12} md={12} sm={12} className="box">
          <Grid xs={12} md={6} sm={12} className="main-date-part">
            <KenDatePicker
              name={'startDate'}
              label="Start Date"
              value={startDate}
              required={true}
              onChange={e => handleChangedStartDate(e)}
              maxDate={endDate ? new Date(endDate) : null}
            />
            <div style={{ marginLeft: 15 }}>
              <KenDatePicker
                name={'endDate'}
                label="End Date"
                value={endDate}
                required={true}
                onChange={e => handleChangedEndDate(e)}
                minDate={new Date(startDate)}
              />
            </div>

            {/* <div style={{ marginRight: '15px' }}>
              <KenDateTimePicker
                name={'startDate'}
                label="Start Date"
                // disabled={readOnly}
                value={startDate}
                type="datetime-local"
                required={true}
                // defaultValue={startData}
                onChange={e => handleChangedStartDate(e)}
              />
            </div>
            <div>
              <KenDateTimePicker
                name={'endDate'}
                label="End Date"
                // disabled={readOnly}
                value={endDate}
                type="datetime-local"
                required={true}
                minValue={moment(startDate).format('YYYY-MM-DD')}
                // defaultValue={startData}
                onChange={e => handleChangedEndDate(e)}
                errors={Date.parse(endDate) <= Date.parse(startDate)}
              />
            </div> */}
          </Grid>
          <Grid
            xs={12}
            md={6}
            sm={12}
            style={{ paddingTop: 15, paddingLeft: 15 }}
          >
            {/* cards */}
            <div className={classes.maskWrap}>
              <Grid container spacing={3} classes={{ root: classes.grid }}>
                <SessionCards
                  session={sessions}
                  absentSession={absentSession}
                  totalAttendance={totalAtnd}
                />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={12}>
        <Grid className={classes.RightBox}>
          <KenCard paperStyles={{ padding: 0 }}>
            <KenGrid
              columns={columns}
              data={courseData}
              pagination={{ disabled: true }}
              toolbarDisabled={true}
              isCollasable={false}
              noDataText={noData}
            />
          </KenCard>
        </Grid>
      </Grid>

      <KenDialogBox
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        maxWidth="md"
        title=""
        titleStyle={classes.titleHead}
        dialogActionFlag={false}
      >
        <div style={{ padding: 20 }}>
          <DetailsPopup
            selectedData={selectedData}
            dataSingleCourse={courseDataSingle}
            courseOfferingId={courseOfferingId}
            startDates={startDate}
            endDates={endDate}
          />
        </div>
      </KenDialogBox>
    </Grid>
  );
}
