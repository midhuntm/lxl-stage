import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  makeStyles,
  IconButton,
  useTheme,
  Tooltip,
} from '@material-ui/core';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiTeacher } from 'react-icons/gi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { withStyles } from '@material-ui/styles';
import moment from 'moment';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import TUICalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { rrulestr } from 'rrule';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import './Schedule.css';
import { Link } from 'react-router-dom';
import tuiTheme from './tuiTheme';
import KenSnackbar from '../../../../components/KenSnackbar';
import {
  generateLink,
  onStartClass,
  onJoinClass,
  getDatesFromRrule,
  transFormRrule,
} from '../../../../utils/helpers/scheduleHelper';
import configContext from '../../../../utils/helpers/configHelper';
import { useTranslation } from 'react-i18next';
import Routes from '../../../../utils/routes.json';
import {
  KEY_USER_TYPE,
  KEY_DATE_FORMAT,
  KEY_STATUS,
} from '../../../../utils/constants';
import FullCalendar from '@fullcalendar/react';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ScheduleView from './ScheduleView';
import TimeTable from '../../../Timetable/Timetable';
import Calendar from '../../../FullCalendar/Calendar';
import { getSessionData } from '../../../../utils/ApiService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ViewSession from '../../../Timetable/ViewSession';
import KenPopover from '../../../../components/KenPopover';
import '../../../FullCalendar/calendar.css';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

const useStyles = makeStyles(theme => ({
  scheduler: {
    maxHeight: '45vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#787878`,
      opacity: '0.1',
      outline: `1px solid #787878`,
    },
  },
  iconButtons: {
    padding: 0,
  },
  headerItem: {
    flexGrow: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  popDetailsIcon: {
    width: 40,
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    margintop: 10,
  },
  popDetailsItem: {
    padding: '5px 0',
    alignItems: 'center',
  },
  popup: {
    position: 'absolute',
    zIndex: 2000,
    background: 'white',
    borderRadius: 5,
    maxWidth: 350,
    maxHeight: 350,
    right: 0,
    boxShadow:
      '0px 8px 5px rgba(23, 43, 77, 0.04), 0px 15px 12px rgba(23, 43, 77, 0.08)',
    [theme.breakpoints.only('xs')]: {
      left: '0 !important',
      maxWidth: 'none',
      margin: 'auto',
      heigh: '50vh',
    },
  },
  cardHeader: {
    [theme.breakpoints.only('sm')]: {
      fontSize: '13px !important',
    },
  },

  scheduleDay: {
    padding: '6px !important',
    [theme.breakpoints.only('sm')]: {
      padding: '3px 2px !important',
    },
  },
  scheduleLabel: {
    textAlign: 'end',
  },

  schedule: {
    color: 'yellow',
  },
  someClass: {},
  lessonLink: {
    color: theme.palette.KenColors.primary,
    fontSize: '16px',
  },
  title: { fontSize: 16, fontWeight: 600 },
}));
const useItemStyles = makeStyles(theme => ({
  root: {
    '& > .MuiTreeItem-content': {
      height: '35px',
    },
    '& > .MuiTreeItem-content > .MuiTreeItem-label': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0',
      background: 'transparent !important',
      pointerEvents: 'none',
      fontSize: '12px',
      lineHeight: '12px',
      padding: '0 15px 15px',
    },
    '& > .MuiTreeItem-content  > .MuiTreeItem-label::before': {
      content: "''",
      display: 'inline-block',
      minWidth: 15,
      minHeight: 15,
      marginRight: 8,
      border: '1px solid #ccc',
      background: 'white',
    },
  },
  iconContainer: {
    marginRight: 3,
    marginLeft: 0,
    '& > svg': {
      '&:hover': {
        opacity: 0.6,
      },
    },
  },
  label: {
    padding: 0,
  },
  selected: {
    '& > .MuiTreeItem-content  > .MuiTreeItem-label::before': {
      background: theme.palette.primary.main,
      // content: '\f095',
      border: '1px solid #ccc',
      // fontFamily: 'Font Awesome 5 Free',
    },
  },
  tooltipTable: {
    minWidth: ' 250px',
    maxWidth: '100%',
    padding: '30px',
    borderCollapse: ' collapse',
    background: '#ffffff',
    padding: '10px',
  },
  tooltipTable_Tr: {
    height: '25px',
    color: '#7A869A',
    fontSize: '12px',
    background: '#fff',
  },
  tooltipTable_td: {
    height: '25px',
    paddingLeft: '10px',
    color: 'rgba(0, 0, 0, 0.87)',
    // background: '#f4f6fc',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    // borderLeft: '1px solid #303030',
    fontSize: '12px',
  },
  tooltipTable_th: {
    height: '25px',
    paddingLeft: '10px',
    color: 'rgb(9, 38, 130)',
    background: '#ffffff',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  resourceItem: {
    '&:hover': {
      color: theme.palette.KenColors.primary,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
}));
export default function Schedule(props) {
  const classesItem = useItemStyles();
  const { toggleLoader, activityUrls } = props;
  const calRef = useRef();
  const popupRef = useRef();
  const classes = useStyles();
  const theme = useTheme();
  const { config } = useContext(configContext);
  const { t } = useTranslation();

  const schedulesRaw = props.data;
  //console.log('schedule: ', props.data);
  const [currentDate, setCurrentDate] = useState(
    moment().format(KEY_DATE_FORMAT)
  );
  const [schedules, setschedules] = useState();
  const [todayDate, setTodayDate] = useState();
  const [popupStyles, setpopupStyles] = useState({});
  const [currentSchedule, setCurrentSchedule] = useState();
  const [title, setTitle] = useState('TODAY');
  // let schedules = [];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bbbLink, setbbbLinks] = useState();
  const [activityUrl, setActivityUrl] = useState();
  const [eventData, setEventData] = useState([]);
  const [courseName, setCourseName] = React.useState('');
  const [sessionName, setSessionName] = React.useState('');
  const [sessionID, setSessionID] = React.useState('');
  const [facultyName, setFacultyName] = React.useState('');
  const [faciltyName, setFacilityName] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'apps-popover' : undefined;
  const handleSnackbarOpen = (severity, message) => () => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const changeDateFormat = date => {
    const a = moment(date).format('dddd, MMMM Do YYYY, h:mm a');
    const rightTime = a.split(', ')[2];
    return rightTime;
  };
  const getActivityUrl = courseConnectionId => {
    let activity;
    if (Array.isArray(activityUrls) && activityUrls.length > 0) {
      activity = activityUrls.find(act => act.id === courseConnectionId);
      return activity.url || null;
    } else {
      return null;
    }
  };

  const handleEventClick = event => {
    console.log(
      'event.event._def.extendedProps',
      event.event._def.extendedProps
    );
    setAnchorEl(event);
    setCourseName(event.event._def.extendedProps.courseName);
    setSessionName(event.event._def.extendedProps.sessionName);
    setSessionID(event.event._def.extendedProps.sessionID);
    setFacultyName(event.event._def.extendedProps?.FacultyBooking?.facultyName);
    setFacilityName(event.event._def.extendedProps.facultyName);
    setStartTime(event.event._def.extendedProps.startTimes);
    setEndTime(event.event._def.extendedProps.endTimes);
  };
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: 'black',
      // backgroundColor: "green",
      // padding: 0,
      border: '1px solid #fff',
      borderRadius: '4px',
      background: '#ffffff',
      boxShadow: '-2px 1px 8px 1px #737f8d',
    },
  })(Tooltip);

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }
  const handleDateToday = arg => {
    const dates = moment(arg.start.toString()).format('YYYY-MM-DD');
    let Caltoday = new Date(dates);
    let today = new Date();
    if (Caltoday.getDate() == today.getDate()) {
      setTodayDate('Today');
    } else if (Caltoday.getDate() + 1 == today.getDate()) {
      setTodayDate('YesterDay');
    } else if (Caltoday.getDate() - 1 == today.getDate()) {
      setTodayDate('Tomorrow');
    } else {
      setTodayDate(moment(arg.start.toString()).format('YYYY-MM-DD'));
    }
  };
  const renderEventContent = (event = {}) => {
    const toopTiptext = (
      <Box>
        <div className="mainDiv">
          <div className="childDiv">
            {event.event._def.extendedProps.courseName} -{' '}
            {event.event._def.extendedProps.sessionName}
          </div>
        </div>
        <div className="mainDiv">
          <AiOutlineClockCircle
            color="#00218D"
            size={20}
            // style={{ paddingRight: '10px' }}
          />
          <div className="childDiv">
            {changeDateFormat(event.event._def.extendedProps.startTimes)} -{' '}
            {changeDateFormat(event.event._def.extendedProps.endTimes)}
          </div>
        </div>
        <div className="mainDiv">
          <GiTeacher color="#00218D" size={20} />
          <div className="childDiv">
            {event.event._def.extendedProps.facultyName
              ? event.event._def.extendedProps.facultyName
              : 'N/A'}
          </div>
        </div>
        <div className="mainDiv">
          <FaChalkboardTeacher color="#00218D" size={20} />
          <div className="childDiv">
            {event.event._def.extendedProps?.FacultyBooking?.facultyName
              ? event.event._def.extendedProps?.FacultyBooking?.facultyName
              : 'N/A'}
          </div>
        </div>
      </Box>
    );

    return (
      // <BlueOnGreenTooltip placement="bottom" title={toopTiptext}>
      // </BlueOnGreenTooltip>
      <div className="fc-event-title fc-sticky">
        {`${event.event?.title}`.trim()}
      </div>
    );
  };
  const calendars = [
    {
      name: 'Calendar',
      id: '1',
      color: '#ffffff',
      bgColor: `${theme.palette.KenColors.background}`,
      dragBgColor: '#00a9ff',
      borderColor: `${theme.palette.KenColors.primary}`,
    },
  ];

  const formatSchedule = (sch, start, end) => {
    return {
      calendarId: '1',
      category: 'time',
      isVisible: true,
      title: sch.hed__Course__cName,
      start: start || sch.hed__Start_Date__c + 'T' + sch.hed__Start_Time__c,
      end: end || sch.hed__End_Date__c + 'T' + sch.hed__End_Time__c,
      body: sch.meeting_link,
      raw: {
        ...sch,
      },
    };
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  // check for recurrence rule
  useEffect(() => {
    setCurrentDate(moment().format(KEY_DATE_FORMAT));
  }, []);
  useEffect(() => {
    if (schedulesRaw && schedulesRaw.length) {
      let finalSchedules = [];
      // console.log(schedulesRaw)
      schedulesRaw.forEach(el => {
        if (el.RRULE) {
          const rRule = getDatesFromRrule(
            transFormRrule(el.RRULE),
            new Date(currentDate)
          );
          console.log(rRule, transFormRrule(el.RRULE));
          if (rRule.length > 0) {
            const start =
              moment(rRule[0]).format(KEY_DATE_FORMAT) +
              'T' +
              el.hed__Start_Time__c.substring(0, 8);
            const end =
              moment(rRule[0]).format(KEY_DATE_FORMAT) +
              'T' +
              el.hed__End_Time__c.substring(0, 8);
            finalSchedules.push(formatSchedule(el, start, end));
          }
        } else {
          finalSchedules.push(formatSchedule(el));
        }
      });

      setschedules(finalSchedules);
      // schedules = finalSchedules;
      console.log(finalSchedules);
    }
  }, [currentDate, schedulesRaw]);
  let calendarRef = useRef();
  const nextMethod = () => {
    let calendarApi = calendarRef.current.getApi();
    console.log(calendarRef.current.getApi().title);
    calendarApi.next();
  };

  const preMethod = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const todayMethod = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  // const getDates = () => {
  //   let calendarApi = calendarRef.current.getApi();
  //   console.log('calendarApi.title()', calendarApi.title());
  //   calendarApi.title();
  // };
  useEffect(() => {
    const getUsers = async () => {
      const userData = JSON.parse(localStorage.getItem('userDetails'));
      const contactId = userData.ContactId;
      const sessionData = await getSessionData(contactId ? contactId : '');
      const dataSession = Object.values(sessionData);
      const newEvents = [...dataSession];
      console.log('newEvents', newEvents[1]);
      // "2022-06-06T05:15:00.000Z"
      const transformed = newEvents[1]?.map(
        ({
          sessionName,
          activityType,
          endDate,
          contactId,
          contactName,
          FacultyBooking,
          courseId,
          courseName,
          courseOfferingId,
          facultyName,
          id,
          startDate,
          termId,
        }) => ({
          title: `${courseName} - ${activityType}`,
          end: endDate,
          contactId: contactId,
          contactName,
          startTimes: startDate,
          endTimes: endDate,
          sessionName,
          FacultyBooking,
          courseId,
          courseName,
          courseOfferingId,
          facultyName,
          termId,
          id,
          start: startDate, // `${endDate}T00:00:00`
        })
      );
      const newDataEventUnAssiged = transformed?.map(ele => {
        return {
          ...ele,
          editable: true,
          sessionID: ele.id,
          allDay: false,
          // textColor: '#fff',
          // borderLeft: '3px solid #00218D',
          // boxShadow: 'none',
          // fontWeight: 700,
        };
      });
      console.log('newDataEventUnAssiged', newDataEventUnAssiged);
      setEventData(newDataEventUnAssiged);
    };
    getUsers();
  }, []);

  // TODO: replace with redux
  const user = getUserDetails();
  const onClickSchedule = e => {
    setActivityUrl(prev => {
      let courseId = e?.schedule?.raw?.Id;
      if (courseId) {
        return getActivityUrl(courseId);
      } else {
        return null;
      }
    });
    setbbbLinks(generateLink(e.schedule.raw, config));
    setCurrentSchedule(e.schedule);
    window.innerHeight <
    e.event.clientY + document.getElementById('popup').offsetHeight
      ? setpopupStyles({
          ...popupStyles,
          left: e.event.pageX,
          top: e.event.pageY - document.getElementById('popup').offsetHeight,
        })
      : setpopupStyles({
          ...popupStyles,
          left: e.event.pageX,
          top: e.event.pageY,
        });
  };

  const getCalendar = () => {
    return calRef && calRef.current ? calRef.current.getInstance() : null;
  };

  const updateCalendarDate = () => {
    const cDate = getCalendar()
      .getDate()
      .toDate();
    setschedules([]);
    setCurrentDate(moment(cDate).format(KEY_DATE_FORMAT));
    if (
      moment(cDate).format(KEY_DATE_FORMAT) ===
      moment()
        .subtract(1, 'days')
        .format(KEY_DATE_FORMAT)
    )
      setTitle('YESTERDAY');
    else if (
      moment(cDate).format(KEY_DATE_FORMAT) ===
      moment()
        .add(1, 'days')
        .format(KEY_DATE_FORMAT)
    )
      setTitle('TOMORROW');
    else if (
      moment(cDate).format(KEY_DATE_FORMAT) ===
      moment()
        .add(0, 'days')
        .format(KEY_DATE_FORMAT)
    )
      setTitle('TODAY');
    else {
      setCurrentDate(moment(cDate).format(KEY_DATE_FORMAT));
      setTitle('');
    }
  };

  const startClass = () => {
    toggleLoader(true);
    onStartClass(anchorEl, toggleLoader, config, handleSnackbarOpen);
  };

  const joinClass = () => {
    toggleLoader(true);
    onJoinClass(anchorEl, toggleLoader, config, handleSnackbarOpen);
  };

  useOutsideAlerter(popupRef, currentSchedule, setCurrentSchedule);
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          alignItems="center"
          className={classes.headerItem}
          sm={5}
          md={5}
        >
          <Typography className={classes.title}>Schedule</Typography>
        </Grid>
        <Grid item sm={7} md={7} className={classes.scheduleLabel}>
          <IconButton
            aria-label="previous"
            className={classes.iconButtons}
            onClick={() => preMethod()}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          {/* <AiOutlineLeft
            style={{ paddingTop: '5px', paddingRight: '8px' }}
            onClick={() => preMethod()}
            size={18}
          /> */}
          <Button
            aria-label="today"
            onClick={() => todayMethod()}
            className={classes.scheduleDay}
            data-testid="current-date-button"
          >
            {todayDate}
          </Button>
          <IconButton
            aria-label="next"
            className={classes.iconButtons}
            onClick={() => nextMethod()}
          >
            <NavigateNextOutlinedIcon />
          </IconButton>
          {/* <AiOutlineRight
            style={{ paddingTop: '5px', paddingLeft: '8px' }}
            onClick={() => nextMethod()}
            size={18}
          /> */}
        </Grid>
      </Grid>

      <Calendar
        customButtons={{
          myCustomButton: {
            text: 'My Schedular',
            // click: function() {
            //   alert('clicked the custom button!');
            // }
          },
        }}
        buttonText={{
          today: 'title',
          day: 'My Schedule',
          month: 'My Schedule',
        }}
        reference={calendarRef}
        // headerToolbar={{
        //           right: 'prev,title,next',
        // center: '',
        // left: 'myCustomButton',
        // }}
        titleFormat={'string'}
        // plugins={[timeGridPlugin, interactionPlugin]}
        plugins={[timeGridPlugin]}
        headerToolbar={false}
        initialView={'timeGridDay'}
        handleEventClick={handleEventClick}
        eventData={eventData}
        eventContent={renderEventContent}
        allDaySlot={false}
        dayHeaders={false}
        datesSet={handleDateToday}
      />
      <KenPopover
        disableScrollLock={true}
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handlePopoverClose}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <ViewSession
          courseName={courseName}
          sessionName={sessionName}
          sessionID={sessionID}
          startTime={startTime}
          fromTimeTable={false}
          endTime={endTime}
          facultyName={facultyName}
          faciltyName={faciltyName}
          user={user}
          startClass={startClass}
          joinClass={joinClass}
        />
      </KenPopover>
      <KenSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
    </>
  );
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, schedule, setCurrentSchedule) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && schedule) {
        console.log('outside: ', schedule);
        setCurrentSchedule(null);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, schedule]);
}
