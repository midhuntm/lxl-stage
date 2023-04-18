import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
// import KenDateTimePicker from '../../../../global_components/KenDateTimePicker';
import KenLoader from '../../../../components/KenLoader';
//  import '../style.css';
import {
  getAttendanceEvent,
  getAttendanceInfo,
} from '../../../../utils/ApiService';
import moment from 'moment';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import './attendance.css';
import SessionCards from '../sessionCards';
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
  m_0: {
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
  const userDetails = getUserDetails();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [totalAtnd, setTotalAtnd] = React.useState(0);
  const [absentSession, setAbsenceAttendance] = React.useState(0);
  const [sessions, setSessions] = React.useState(0);
  const [currentMonth, setCurrentMonth] = React.useState('Select');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [eventAttend, setEventAttend] = React.useState([]);
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));

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
        // setCourseDataSingle(res.courseLevelAttendanceList);
        // setCourseData(
        //   res.courseLevelAttendanceList.map(item => {
        //     return {
        //       subjectName: item.CourseName,
        //       subjectCode: item.CourseCode,
        //       view: item.view,
        //       totalAttendance: item.AttendancePercentage,
        //     };
        //   })
        // );
        setNoData(t('No_Records'));
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setNoData(t('No_Records'));
      });
  }, [startDate, endDate]);

  const columns = [
    {
      Header: 'SUBJECT NAME',
      accessor: 'subjectName',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'SECTION',
    //   accessor: 'section',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'DATE',
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON TYPE',
      accessor: 'reason',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON DESCRIPTION',
      accessor: 'reasontype',
      disableGlobalFilter: true,
    },
    {
      Header: 'STATUS',
      accessor: 'status',
      disableGlobalFilter: true,
    },
  ];

  // React.useEffect(() => {
  //   const data = [];
  //   CurrentData['Current Components'].map(item => {
  //     data.push({
  //       subjectName: item.subjectName,
  //       date: item.date,
  //       reason: item.reason,
  //     });
  //   });
  //   setData(data);
  // }, []);
 /*  const months = [
    { label: 'Select', value: 'Select' },
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ]; */
  const changeLang = e => {
    setCurrentMonth(e.target.value);
  };

  React.useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setEventAttend([]);
      const users = await getAttendanceEvent(
        userDetails.ContactId,
        // 'a0B0w000004pFZmEAM',
        '',
        startDate ? `${startDate}.000Z` : '',
        endDate ? `${endDate}.000Z` : ''
      );
      console.log('usersss', users.data.length);
      // setEventAttend(users.data)

      setEventAttend(
        users.data
          // ?.filter(e => e.status === 'Absent')
          .map(item => {
            // if( ){
            return {
              subjectName: item?.subjectname ? item?.subjectname : '',
              section: item.SectionId,
              date: item.sessionStartDate
                ? moment(item.sessionStartDate).format('YYYY-MM-DD')
                : '',
              reason: item?.reason ? item?.reason : '',
              reasontype: item?.resonDescription ? item?.resonDescription : '',
              status: item?.status,
            };
            // }
          })
      );
      setLoading(false);
    };
    getUsers().catch(err => {
      setLoading(false);
      setNoData(t('No_Records'));
    });

    // const data = [];
    // CurrentData['Current Components'].map(item => {
    //   data.push({
    //     subjectName: item.subjectName,
    //     date: item.date,
    //     reason: item.reason,
    //   });
    // });
    // setData(data);
  }, [startDate, endDate]);
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
              data={eventAttend}
              pagination={{ disabled: true }}
              toolbarDisabled={true}
              isCollasable={false}
              noDataText={noData}
            />
          </KenCard>
        </Grid>
      </Grid>
    </Grid>
  );
}
