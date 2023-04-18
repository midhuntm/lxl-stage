import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiTeacher } from 'react-icons/gi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import './viewSession.css';
import moment from 'moment';
import {
  KEY_USER_TYPE,
  KEY_DATE_FORMAT,
  KEY_STATUS,
} from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const ViewSession = props => {
  const {
    courseName,
    sessionName,
    startTime,
    fromTimeTable,
    endTime,
    facultyName,
    faciltyName,
    user,
    startClass,
    joinClass,
  } = props;
  const { t } = useTranslation();
  const changeDateFormat = date => {
    const a = moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
    const rightTime = a.split(', ')[2];
    return rightTime;
  };
  const onStartClass = () => {
    startClass();
  };
  const onJoinClass = () => {
    joinClass();
  };
  return (
    <Box>
      <div className="mainDiv">
        <div className="childDiv" style={{fontWeight: 600, fontSize: 14, margin: '0 auto'}}>
          {courseName} - {sessionName}
        </div>
      </div>
      <div className="mainDiv">
        <AiOutlineClockCircle
          color="#00218D"
          size={20}
          // style={{ paddingRight: '10px' }}
        />
        <div className="childDiv">
          {!fromTimeTable
            ? `${changeDateFormat(startTime)} - ${changeDateFormat(endTime)} `
            : `${startTime} - ${endTime}`}
        </div>
      </div>
      <div className="mainDiv">
        <GiTeacher color="#00218D" size={20} />
        <div className="childDiv">{facultyName ? facultyName : 'N/A'}</div>
      </div>
      <div className="mainDiv">
        <FaChalkboardTeacher color="#00218D" size={20} />
        <div className="childDiv">{faciltyName ? faciltyName : 'N/A'}</div>
      </div>
      <Grid container style={{ justifyContent: 'center', paddingBottom: 10 }}>
        <Grid item className={''} />
        <Grid item>
          <Typography>
            {user && user.Type === KEY_USER_TYPE.faculty ? (
              <Button
                variant="contained"
                target="blank"
                color="primary"
                onClick={onStartClass}
              >
                {t('labels:Start_Class')}
              </Button>
            ) : user && user.Type === KEY_USER_TYPE.student ? (
              <Button
                variant="contained"
                target="blank"
                color="primary"
                onClick={onJoinClass}
              >
                {t('labels:Join_Class')}
              </Button>
            ) : null}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewSession;
