import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import './stylesC.css';
import { getSessionData } from '../../utils/ApiService';
import KenCard from '../../global_components/KenCard';
import Calendar from '../FullCalendar/Calendar';
import { Box, Tooltip } from '@material-ui/core';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiTeacher } from 'react-icons/gi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import KenLoader from '../../components/KenLoader';
import ViewSession from './ViewSession';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import configContext from '../../utils/helpers/configHelper';
import KenPopover from '../../components/KenPopover';
import KenSnackBar from '../../components/KenSnackbar';
import {
  generateLink,
  onStartClass,
  onJoinClass,
  getDatesFromRrule,
  transFormRrule,
} from '../../utils/helpers/scheduleHelper';
export default function TimeTable(props) {
  // all state
  const [anchorEl, setAnchorEl] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = React.useState('');
  const [sessionName, setSessionName] = React.useState('');
  const [sessionID, setSessionID] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [facultyName, setFacultyName] = React.useState('');
  const [faciltyName, setFacilityName] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'apps-popover' : undefined;
  const user = getUserDetails();
  const { config } = useContext(configContext);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  // useEffect
  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const userData = JSON.parse(localStorage.getItem('userDetails'));
      const contactId = userData.ContactId;
      const sessionData = await getSessionData(contactId ? contactId : '');
      let transformed;
      if (sessionData?.success === 'true') {
        transformed = sessionData?.data?.map(e => ({
          ...e,
          title: `${e.courseName} - ${e.activityType}`,
          startTimes: moment(e.startDate).format('hh:mm A'),
          endTimes: moment(e.endDate).format('hh:mm A'),
          start: e.startDate,
          end: e.endDate,
        }));
      }
      const newDataEventUnAssiged = transformed?.map(ele => {
        return {
          ...ele,
          editable: true,
          sessionID: ele.id,
          allDay: false,
        };
      });
      setLoading(false);
      setEventData(newDataEventUnAssiged);
    };
    getUsers().catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, []);
  const toggleLoader = val => {
    setLoading(val);
  };
  const startClass = () => {
    onStartClass(anchorEl, toggleLoader, config, handleSnackbarOpen);
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

  const joinClass = () => {
    onJoinClass(anchorEl, toggleLoader, config, handleSnackbarOpen);
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
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  // methods

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
  const renderEventContent = (event = {}) => {
    const toopTiptext = (
      <Box>
        <div className="mainDiv">
          <div className="childDiv">
            {event.event._def.extendedProps.courseName} -{' '}
            {event.event._def.extendedProps.activityType}
          </div>
        </div>
        <div className="mainDiv">
          <AiOutlineClockCircle
            color="#00218D"
            size={20}
            // style={{ paddingRight: '10px' }}
          />
          <div className="childDiv">
            {event.event._def.extendedProps.startTimes} -{' '}
            {event.event._def.extendedProps.endTimes}
          </div>
        </div>
        <div className="mainDiv">
          <GiTeacher color="#00218D" size={20} />
          <div className="childDiv">
            {event.event._def.extendedProps.facultyName || 'N/A'}
          </div>
        </div>
        <div className="mainDiv">
          <FaChalkboardTeacher color="#00218D" size={20} />
          <div className="childDiv">
            {event.event._def.extendedProps?.facilityName || 'N/A'}
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
  return (
    <>
      {loading && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <KenCard>
        <Calendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView={'dayGridMonth'}
          handleEventClick={handleEventClick}
          eventContent={renderEventContent}
          eventData={eventData}
          allDaySlot={true}
          dayHeaders={true}
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
            fromTimeTable={true}
            endTime={endTime}
            facultyName={facultyName}
            faciltyName={faciltyName}
            user={user}
            startClass={startClass}
            joinClass={joinClass}
          />
        </KenPopover>
      </KenCard>
    </>
  );
}
