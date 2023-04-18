import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import KenSnackBar from '../../../../components/KenSnackbar';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import TUICalendar from '@toast-ui/react-calendar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Link } from 'react-router-dom';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import {
  KEY_USER_TYPE,
  KEY_DATE_FORMAT,
  KEY_STATUS,
} from '../../../../utils/constants';
import { useTranslation } from 'react-i18next';
import tuiTheme from './tuiTheme';
import Routes from '../../../../utils/routes.json';

const useStyles = makeStyles(theme => ({
  scheduler: {
    maxHeight: '40vh',
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
      height: '50vh',
    },
  },
  cardHeader: {
    fontWeight: 600,
    color: theme.palette.KenColors.neutral100,
    textTransform: "uppercase",
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
  title: { fontSize: 14, fontWeight: 600, fontFamily: "Open Sans" },
}));

const ScheduleView = props => {
  const {
    user,
    snackbarData,
    handleSnackbarClose,
    getCalendar,
    updateCalendarDate,
    title,
    currentDate,
    calRef,
    schedules,
    onClickSchedule,
    config,
    popupStyles,
    popupRef,
    currentSchedule,
    setCurrentSchedule,
    startClass,
    joinClass,
    bbbLink,
    activityUrl,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
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
  return (
    <Box p={2} data-testid={'schedule-view'} style={{padding: '0px'}}>
      <div>
        <KenSnackBar
          message={snackbarData.snackbarMessage}
          severity={snackbarData.snackbarSeverity}
          autoHideDuration={2000}
          open={snackbarData.openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          position="Bottom-Right"
        />
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            alignItems="center"
            className={classes.headerItem}
            sm={5}
            md={5}
          >
            <Typography className={classes.title}>
              {user.Type === KEY_USER_TYPE.faculty
                ? t('headings:My_Schedule').toUpperCase()
                : t('headings:Schedule').toUpperCase()}
            </Typography>
          </Grid>
          <Grid item sm={7} md={7} className={classes.scheduleLabel}>
            <IconButton
              aria-label="previous"
              className={classes.iconButtons}
              onClick={e => {
                getCalendar().prev();
                updateCalendarDate();
              }}
            >
              <NavigateBeforeOutlinedIcon />
            </IconButton>

            <Button
              aria-label="today"
              onClick={e => {
                // change current date

                if (title !== 'TODAY') {
                  getCalendar().today();
                  getCalendar().scrollToNow();
                  updateCalendarDate();
                }
              }}
              className={classes.scheduleDay}
              data-testid="current-date-button"
            >
              {' '}
              {title === 'TODAY' ||
                title === 'TOMORROW' ||
                title === 'YESTERDAY' ? (
                <div>{title}</div>
              ) : (
                <div>{currentDate}</div>
              )}
            </Button>

            <IconButton
              aria-label="next"
              className={classes.iconButtons}
              onClick={e => {
                getCalendar().next();
                updateCalendarDate();
              }}
            >
              <NavigateNextOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>

      {currentDate && (
        <Box pt={2} className={classes.scheduler}>
          <TUICalendar
            usageStatistics={false}
            ref={calRef}
            view={'day'}
            // useCreationPopup={true}
            isReadOnly={true}
            useDetailPopup={false}
            calendars={calendars}
            schedules={schedules}
            onClickSchedule={onClickSchedule}
            taskView={[]}
            theme={tuiTheme(theme)}
            scheduleView={['time']}
            template={{
              time: function (schedule) {
                return (
                  `<div style="color: ${theme.palette.KenColors.neutral100
                  }; font-size: 14px; padding: 8px;font-weight: bold; ">` +
                  schedule.title +
                  '</div>'
                );
              },
            }}
            week={{
              hourStart: config?.schedule?.hourStart || 0,
              hourEnd: config?.schedule?.hourEnd || 24,
            }}

          // onBeforeCreateSchedule={onBeforeCreateSchedule}
          // onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          // onBeforeUpdateSchedule={onBeforeUpdateSchedule}
          />
          <Box
            style={{ ...popupStyles }}
            id="popup"
            className={classes.popup}
            ref={popupRef}
          >
            {currentSchedule && (
              <Box p={2} data-testid={'current-schedule'}>
                <Grid container className={classes.popDetailsItem}>
                  <Grid item className={classes.popDetailsIcon}>
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        background: currentSchedule.bgColor,
                        borderRadius: 3,
                      }}
                    >
                      {' '}
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {currentSchedule.raw.hed__Course__cName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.popDetailsItem}>
                  <Grid item className={classes.popDetailsIcon}>
                    <AccessTimeIcon color="primary" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      {moment(currentSchedule.start.toUTCString()).format('LT')}{' '}
                      - {moment(currentSchedule.end.toUTCString()).format('LT')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.popDetailsItem}>
                  <Grid item className={classes.popDetailsIcon} />
                  <Grid item>
                    <Typography>
                      {user && user.Type === KEY_USER_TYPE.faculty ? (
                        <Button
                          variant="contained"
                          target="blank"
                          color="primary"
                          onClick={startClass}
                        >
                          {t('labels:Start_Class')}
                        </Button>
                      ) : user && user.Type === KEY_USER_TYPE.student ? (
                        <Button
                          variant="contained"
                          target="blank"
                          color="primary"
                          onClick={joinClass}
                        >
                          {t('labels:Join_Class')}
                        </Button>
                      ) : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.popDetailsItem}>
                  <Grid item className={classes.popDetailsIcon} />
                  <Grid item>
                    {user && user.Type === KEY_USER_TYPE.faculty ? (
                      <Link
                        to={{
                          pathname: `/${Routes.classroom}`,
                          state: {
                            courseId: currentSchedule.raw.CourseOfferingID,
                            date: currentDate,
                            currentSchedule: currentSchedule,
                            bbbLink: bbbLink,
                          },
                        }}
                        className={classes.link}
                        onClick={e => {
                          currentSchedule.raw.meeting_link = bbbLink;
                        }}
                      >
                        <Button variant="contained" color="primary">
                          {t('labels:Go_To_Classroom')}
                        </Button>
                      </Link>
                    ) : null}
                  </Grid>
                </Grid>
                {activityUrl && (
                  <Grid container className={classes.popDetailsItem}>
                    <Grid item className={classes.popDetailsIcon}>
                      <LibraryBooksIcon color="primary" />
                    </Grid>
                    <Grid item>
                      <a
                        href={activityUrl}
                        target="_blank"
                        className={classes.lessonLink}
                        onClick={() => setCurrentSchedule(null)}
                      >
                        {t('labels:Go_To_Activities')}
                      </a>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ScheduleView;
