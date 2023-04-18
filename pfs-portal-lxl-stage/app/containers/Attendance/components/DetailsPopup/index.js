import React, { useState, useEffect } from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import KenLoader from '../../../../components/KenLoader';
//  import '../style.css';
import { getAttendanceEvent } from '../../../../utils/ApiService';
import moment from 'moment';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import SessionCards from '../sessionCards';
import '../current/current.css';
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
  const {
    selectedData,
    dataSingleCourse,
    courseOfferingId,
    startDates,
    endDates,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [eventAttend, setEventAttend] = React.useState([]);
  const [currentMonth, setCurrentMonth] = React.useState('Select');
  const [startDate, setStartDate] = React.useState(startDates);
  const [endDate, setEndDate] = React.useState(endDates);
  const [noData, setNoData] = useState(t('messages:Fetching_Data'));
  const [totalAtnd, setTotalAtnd] = React.useState(
    dataSingleCourse[selectedData.index]?.AttendancePercentage || 0
  );
  const [absentSession, setAbsenceSession] = React.useState(
    dataSingleCourse[selectedData.index]?.AbsentClasses || 0
  );
  const [sessions, setSessions] = React.useState(
    dataSingleCourse[selectedData.index]?.TotalClasses || 0
  );
  console.log('courseOfferingId', courseOfferingId);
  const userDetails = getUserDetails();
  const columns = [
    {
      Header: 'DATE OF ABSENCE',
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON Type',
      accessor: 'reason',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON DESCRIPTION',
      accessor: 'reasontype',
      disableGlobalFilter: true,
    },
  ];

  React.useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setNoData(t('messages:Fetching_Data'));
      const users = await getAttendanceEvent(
        userDetails.ContactId,
        // 'a0B0w000004pFZmEAM',
        courseOfferingId,
        startDate ? `${startDate}.000Z` : '',
        endDate ? `${endDate}.000Z` : ''
      );
      console.log('usersss', users.data.length);
      let absentData = users.data?.filter(e => e.status === 'Absent');
      let session = users.data.length;
      let absentSession = absentData.length;
      let totalAtnd =
        Math.floor(((session - absentSession) * 100) / session) || 0;

      console.log('session', session);
      console.log('absentSession', absentSession);
      console.log('totalAtnd', totalAtnd);

      setEventAttend(
        absentData.map(item => {
          return {
            subjectName: item.courseName ? item.courseName : '',
            date: item.sessionStartDate
              ? moment(item.sessionStartDate).format('YYYY-MM-DD')
              : '',
            reason: item.reason ? item.reason : '',
            reasontype: item.resonDescription ? item.resonDescription : '',
          };
        })
      );
      setSessions(session);
      setAbsenceSession(absentSession);
      setTotalAtnd(totalAtnd);
      setLoading(false);
      setNoData(t('No_Records'));
    };
    getUsers();

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
  const changeLang = e => {
    setCurrentMonth(e.target.value);
  };
  const handleChangedStartDate = date => {
    let startDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setStartDate(startDate);
  };

  const handleChangedEndDate = date => {
    let endDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setEndDate(endDate);
  };
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <Typography style={{ padding: 5 }}>
        {/* Subject Name : Subject Code */}
        {dataSingleCourse[selectedData.index]?.CourseName}
      </Typography>
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
