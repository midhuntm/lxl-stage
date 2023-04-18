import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Link,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from '../../AcademicDashboard/components/Progress';
import KenIcon from '../../../global_components/KenIcon';
import KenMultiColorLinearProgressBar from '../../../global_components/KenMultiColorLinearProgressBar';
import DataList from './dataList';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import parse from 'html-react-parser';

// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  border: {
    borderBottom: '1px solid #F4F5F7',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
  },
  status: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  secondaryText: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#7A869A',
  },
  text: {
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    height: '24px',
  },

  link: {
    color: '#0077FF',
    fontSize: '12px',
    fontWeight: 600,
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'no-wrap',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  smallText: {
    fontSize: '12px',
  },
}));
const getColor = status => {
  let color = {};
  switch (status?.toLowerCase()) {
    case 'active':
      color = {
        bg: '#CCE9E4',
        color: '#00B35D',
      };
      break;

    case 'inactive':
    default:
      color = {
        bg: '#ffeae4',
        color: '#E75D3B',
      };

      break;
  }
  return color;
};

export default function ForumCard(props) {
  const {
    title,
    status,
    dateTime,
    latestMessage,
    numberOfResponses,
    onActionClick = () => {},
    item,
  } = props;
  const classes = useStyles();

  const extractContent = content => {
    // console.log('content', content);
    const span = document.createElement('span');
    span.innerHTML = content;
    // console.log('span.innerText', span.innerText);
    return span.textContent || span.innerText;
  };
  const getAcronym = str => {
    if (typeof str !== 'string') {
      return '';
    }
    return str
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '')
      ?.toUpperCase();
  };
  const StatusIcon = () => {
    const color = getColor(status);
    return (
      <Box
        p={'2px 4px'}
        style={{ backgroundColor: color.bg }}
        width="fit-content"
        borderRadius="4px"
      >
        <Typography className={classes.status} style={{ color: color.color }}>
          {status}
        </Typography>
      </Box>
    );
  };
  return (
    <Paper className={classes.paper} elevation={1}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <StatusIcon />
          <Box p="0px 8px">
            <KenIcon
              iconType={'icon'}
              icon={CalendarTodayIcon}
              styles={{ color: '#7A869A' }}
            />
          </Box>

          <Typography component="span" className={classes.secondaryText}>
            {dateTime}
          </Typography>
        </Box>
        <Box onClick={() => onActionClick(item)} style={{ cursor: 'pointer' }}>
          <KenIcon
            iconType={'icon'}
            icon={ArrowForwardIcon}
            styles={{ color: '#7A869A' }}
          />
        </Box>
      </Box>
      <Box pt={1}>
        <Typography component="span" className={classes.title}>
          {title}
        </Typography>
      </Box>
      {/* <Box pt={3}>
        <Link href="#" className={classes.link}>
          <Typography className={classes.link}>
            {numberOfResponses} New responses{' '}
          </Typography>
        </Link>
      </Box> */}
      <Box pt={3} display="flex" alignItems="center">
        <Box style={{ cursor: 'pointer' }}>
          <Tooltip title={latestMessage?.userName} placement="right">
            <Box>
              {latestMessage?.userPic ? (
                <Avatar
                  alt={latestMessage?.userName}
                  src={latestMessage?.userPic}
                  // style={{ float: 'left' }}
                  className={classes.small}
                />
              ) : (
                <Avatar
                  alt={latestMessage?.userName}
                  src={latestMessage?.userPic}
                  // style={{ float: 'left' }}
                  className={classes.small}
                >
                  {/* {getAcronym(latestMessage?.userName)} */}
                  <Typography className={classes.smallText}>
                    {latestMessage?.userName?.charAt(0)?.toUpperCase()}
                  </Typography>
                </Avatar>
              )}
            </Box>
          </Tooltip>
        </Box>
        <Typography component="span" className={classes.text}>
          {latestMessage?.text && extractContent(latestMessage?.text)}
        </Typography>
      </Box>
    </Paper>
  );
}
