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
  LinearProgress,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../global_components/KenCard';
// Icons
import { BiPencil } from 'react-icons/bi';
import { GrDocumentText } from 'react-icons/gr';
import ProgressBar from './progressBar';

const useStyles = makeStyles(theme => ({
  gridBox: {
    padding: '10px',
    overflow: 'hidden',
    height: '81vh',
  },
  containerBox: {
    background: '#fff',
    width: '100%',
    height: '80vh',
    borderRadius: '9px !important',
  },
  title: {
    fontSize: '11px',
    fontWeight: 600,
  },
  toolbar: {
    padding: '0px',
    width: '100%',
    // borderBottom: '1px solid #D7DBE1',
    minHeight: '35px',
  },
  termBox: {
    background: '#FFF3DC',
    padding: '10px',
    textAlign: 'center',
  },
  sessionBox: {
    padding: '10px',
  },
  sessionHeader: {
    color: '#997AFF',
    fontSize: '13px',
    fontWeight: 600,
  },
  academicItems: {
    fontSize: '13px',
  },
  iconBase: {
    fontSize: '25px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icons: {
    color: '#505F79',
    fontSize: '14px',
  },
  downloadIcon: {
    fontSize: '17px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  fileName: {
    fontSize: '13px',
    fontWeight: 600,
  },
  fileSubject: {
    fontSize: '11px',
    color: '#7A869A',
  },
  resource: {
    fontSize: '11px',
    color: '#7A869A',
    width: '100%',
    padding: '0px',
  },
  subjectCard: {
    padding: '10px !important',
  },
  iconBox: {
    height: '40px',
    width: '40px',
    margin: '5px',
  },
  subjectList: {
    height: '40vh',
    overflowY: 'auto',
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
  resourceList: {
    height: '67vh',
    overflowY: 'auto',
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
  subjectName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  star: {
    textAlign: 'right',
    width: '100%',
    float: 'right',
    marginRight: '11px',
    fontSize: '17px',
  },
  headerLeft: {
    width: '100%',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: '13px',
    fontWeight: 600,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    height: '37px',
  },
  details: {
    fontSize: '12px',
    fontWeight: 600,
  },
  icon: {
    paddingRight: '4px',
  },
}));

const CircularProgressProp = props => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: '40px',
        left: '16%',
      }}
    >
      <CircularProgress
        variant="determinate"
        value={props?.value}
        style={{ width: '100%', height: '100%' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
export default function SubjectCard(props) {
  const {
    userType,
    percentage,
    subjectName,
    activityCount,
    resourceCount,
    studentCount,
    className,
    color,
    handleAction,
    item,
    section,
    hideActionArrow = false,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleViewSubject = () => {
    history.push('/academics');
    // userType === 'Student'
    //   ? history.push('/academics')
    //   : history.push('/facultyAcademics');
  };
  return (
    <div>
      <KenCard paperStyles={{ padding: '0px' }}>
        <Grid container xs={12} justifyContent="center">
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            spacing={1}
            style={{
              padding: '8px',
              backgroundColor: color?.bgColor,
              borderRadius: '8px 8px 0px 0px',
            }}
          >
            <Grid item xs={10}>
              <Typography className={classes.subject}>{subjectName}</Typography>
            </Grid>
            {!hideActionArrow && (
              <Grid
                item
                xs={2}
                style={{ textAlign: 'right', cursor: 'pointer' }}
                onClick={() => handleAction(item)}
              >
                <ArrowForwardIcon
                  fontSize="small"
                  style={{ color: color?.color }}
                />
              </Grid>
            )}
          </Grid>
          {/* <Grid
            container
            xs={12}
            item
            spacing={1}
            style={{
              padding: '16px 4px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={12} sm={12} md={3}>
              <ProgressBar
                bottomColor={color?.bgColor}
                topColor={color?.color}
                value={percentage}
              />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item container xs={12} md={9} spacing={1} alignItems="center">
              <Grid item xs={6} sm={6} md={9} lg={9}>
                <Typography className={classes.resource}>
                  <GrDocumentText className={classes.icons} /> Resource:
                </Typography>
              </Grid>
              <Grid xs={6} sm={6} md={3} lg={3}>
                <Typography
                  className={classes.resource}
                  style={{ textAlign: 'right' }}
                >
                  {resourceCount}{' '}
                </Typography>
              </Grid>
              <Grid xs={6} sm={6} md={9} lg={9}>
                <Typography className={classes.resource}>
                  <BiPencil className={classes.icons} /> Activities:
                </Typography>
              </Grid>
              <Grid xs={6} sm={6} md={3} lg={3}>
                <Typography
                  className={classes.resource}
                  style={{ textAlign: 'right' }}
                >
                  {activityCount}{' '}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
          {userType === 'Faculty' && (
            <Grid
              item
              container
              spacing={1}
              xs={12}
              style={{
                padding: '16px',
                borderRadius: '0px 0px 8px 8px',
                borderTop: '1px solid #D7DBE1',
              }}
            >
              <Grid
                item
                xs={6}
                sm={6}
                md={8}
                lg={8}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <img
                  src={
                    'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-person-icon.png'
                  }
                  className={classes.icon}
                />
                <Typography component="span" className={`${classes.details}`}>
                  {className}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={4}
                style={{ textAlign: 'right' }}
              >
                <img
                  src={
                    'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-persons-icon.png'
                  }
                  className={classes.icon}
                />
                <Typography component="span" className={classes.details}>
                  {studentCount}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={8}
                lg={8}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <img
                  src={
                    'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-person-icon.png'
                  }
                  className={classes.icon}
                />
                <Typography component="span" className={`${classes.details}`}>
                  <Typography
                    className={`${classes.resource}`}
                    component="span"
                  >
                    Section:
                  </Typography>
                  <Typography
                    className={`${classes.details}`}
                    component="span"
                    style={{ paddingLeft: '3px' }}
                  >
                    {section}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </KenCard>
    </div>
  );
}
