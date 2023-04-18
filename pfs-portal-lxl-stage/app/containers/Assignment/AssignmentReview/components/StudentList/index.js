import {
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Box,
  Switch,
  FormGroup,
  FormControlLabel,
  withStyles,
  Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useHistory } from 'react-router-dom';
import KenGrid from '../../../../../global_components/KenGrid';
import Routes from '../../../../../utils/routes.json';
import SubmittedIcon from '../../../../../assets/Images/Submitted.svg';
import NotSubmittedIcon from '../../../../../assets/Images/NotSubmitted.svg';
import MessageIcon from '../../../../../assets/Images/Message.svg';
import KenButton from '../../../../../global_components/KenButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  assignGetSubmissionStatus,
  wsAssignLockSubmission,
  wsAssignUnlockSubmission,
} from '../../../../../utils/ApiService';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

// const Popover = React.lazy(() => { import('@material-ui/core/Popover') });

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 10,
    color: theme.palette.KenColors.neutral400,
    textAlign: 'initial',
  },
  name: {
    fontSize: 13,
    color: theme.palette.KenColors.primary,
  },
  typoSubmit: {
    fontSize: 12,
    fontWeight: 600,
    color: '#B49353',
  },
  typoNotSubmit: {
    fontSize: 12,
    fontWeight: 600,
    color: '#A8AFBC',
  },
  userNameWrap: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  popover: {
    '&.MuiPopover-root': {
      //whatever you want
    },
  },
  // paperEdit: {
  //   position: 'absolute'
  // }
}));

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 25,
    padding: 0,
    margin: 5,
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#FF0000',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#61f002',
      border: '6px solid #dce',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #4BB543`,
    backgroundColor: `#4BB543`,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      icon={<LockOpenIcon style={{
        fontSize: 18, height: 20,
        lineHeight: 20,
        marginLeft: 3,
        marginTop: 2
      }} />}
      checkedIcon={<LockIcon style={{
        fontSize: 18, height: 20,
        lineHeight: 20,
        marginTop: 2,
        marginLeft: 3
      }} />}
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function StudentList(props) {
  const {
    data,
    submittedUsers,
    submissionHeading,
    cmid,
    setLockAction,
  } = props;
  console.log('props', props);
  const classes = useStyles();
  const history = useHistory();
  // const [editBox, setEditBox] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currContactId, setCurrContactId] = React.useState('');
  const divRef = React.useRef();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onGradeClick = contactId => {
    history.push({
      pathname: Routes.assignmentOriginal,
      state: {
        cmid: cmid,
        contactId: contactId,
        groupid: 0,
        submittedUsers: submittedUsers,
        submissionHeading: submissionHeading,
      },
    });
  };
  const lockstatus = contactId => {
    let status = false
    data.filter((el, i) => {
      if (String(contactId) == String(el?.userId)) {
        status = el?.lockstatus;
      }
    });
    return status
  };

  const onDisableBtn = value => {
    let status = false;
    data.map((el, i) => {
      if (String(value) == String(el.userid)) {
        status = el.status === 'submitted' ? false : true;
      }
    });
    return status;
  };
  // editbox
  const openEditBox = (event, data) => {
    setCurrContactId(event); //contact id
    console.log(divRef.current);
    setAnchorEl(divRef.current);
    // setOpen(true)
  };

  const closeEditBox = () => {
    setAnchorEl(null);
  };

  const lockOnClick = contactId => {
    const payload = {
      cmid: props.cmid,
      contactid: contactId,
    };
    wsAssignLockSubmission(payload)
      .then(res => {
        setAnchorEl(null);
        setLockAction(true)
      })
      .catch(err => {
        setAnchorEl(null);
        setLockAction(true)
        console.log('error in Assignment Instructions', err);
      });
  };

  const lockUnLockClick = contactId => {
    const payload = {
      cmid: props.cmid,
      contactid: contactId,
    };
    wsAssignUnlockSubmission(payload)
      .then(res => {
        setLockAction(true);
        setAnchorEl(null);
      })
      .catch(err => {
        setLockAction(true);
        setAnchorEl(null);
        console.log('error in Assignment Instructions', err);
      });
  };

  const handleChangeLock = (value, lockstatus) => {
    let contactId = value;
    if (lockstatus) {
      lockUnLockClick(contactId);
    } else {
      lockOnClick(contactId);
    }
  };

  const columns = [
    {
      Header: <Typography className={classes.heading}>STUDENT NAME</Typography>,
      accessor: 'username',
      // disableGlobalFilter: true,
      Cell: ({ value }) => {
        console.log(value);
        return (
          <Link
            // to={`/${Routes.assignmentOriginal}`}
            style={{ textDecoration: 'none' }}
            className={classes.userNameWrap}
          >
            <Avatar alt="" style={{ position: 'initial' }} />
            <Typography className={classes.name} style={{ paddingLeft: 10 }}>
              {value}
            </Typography>
          </Link>
        );
      },
    },
    // {
    //   Header: (
    //     <Typography className={classes.heading}>SEC. & ROLL NO.</Typography>
    //   ),
    //   accessor: 'section',
    //   disableGlobalFilter: true,
    // },
    {
      Header: <Typography className={classes.heading}>STATUS</Typography>,
      accessor: 'status',
      Cell: ({ value }) => {
        return (
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <img
                src={value == 'submitted' ? SubmittedIcon : NotSubmittedIcon}
              />
            </Grid>
            <Grid item>
              {value == 'submitted' ? (
                <Typography className={classes.typoSubmit}>
                  Submitted
                </Typography>
              ) : (
                <Typography className={classes.typoNotSubmit}>
                  Not Submitted
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      },
      // disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography className={classes.heading}>Grading Status </Typography>
      ),
      accessor: 'gradingstatus',
      Cell: ({ value }) => {
        return (
          <Typography className={classes.name} style={{ textAlign: 'initial' }}>
            {value}
          </Typography>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: <Typography className={classes.heading}>GRADES</Typography>,
      accessor: 'ObtainedGrade',
      Cell: ({ value }) => {
        return (
          <Typography className={classes.name} style={{ textAlign: 'initial' }}>
            {value && value !== null && value > 0 ? value : 0}
          </Typography>
        );
      },
      disableGlobalFilter: true,
    },
    // {
    //   Header: (
    //     <Typography className={classes.heading}>PLAGIARIZED REPORT</Typography>
    //   ),
    //   accessor: 'report',
    //   disableGlobalFilter: true,
    // },
    // {
    //   Header: <Typography className={classes.heading}>FEEDBACK</Typography>,
    //   accessor: 'feedback',
    //   disableGlobalFilter: true,
    //   Cell: ({ value }) => {
    //     return (
    //       <Grid item style={{ display: 'flex', alignItems: 'center' }}>
    //         <img src={MessageIcon} />
    //         <Typography className={classes.name}>{value}</Typography>
    //       </Grid>
    //     );
    //   },
    // },

    /* {
      Header: <Typography className={classes.heading}>CREATED DATE</Typography>,
      accessor: 'timecreated',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={classes.name}>{value}</Typography>
          </Grid>
        );
      },
    }, */
    {
      Header: (
        <Typography className={classes.heading}>MODIFIED DATE</Typography>
      ),
      accessor: 'timemodified',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={classes.name}>{value}</Typography>
          </Grid>
        );
      },
    },
    {
      Header: <Typography className={classes.heading}>Lock/Unlock</Typography>,
      accessor: 'userId',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <Grid item >
            <Typography className={classes.name} align="center">
              {/* {value && value === true ? (
                <LockIcon color="error" />
              ) : (
                <LockOpenIcon style={{ color: '#4BB543' }} />
              )}
           */}
              <FormGroup style={{
                justifyContent: 'flex-start',
                flexFlow: 'nowrap',
                marginLeft: 0
              }}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={lockstatus(value)}
                      onChange={() => {
                        handleChangeLock(value, lockstatus(value));
                      }}
                      name="checkedB"
                    />
                  }
                  // label={lockstatus(value) ? 'Lock' : 'Unlock'}
                  labelPlacement="top"
                />
              </FormGroup>
            </Typography>
          </Grid>
        );
      },
    },
    {
      Header: (
        <Typography className={classes.heading} style={{ textAlign: 'center' }}>
          ACTIONS
        </Typography>
      ),
      accessor: 'userid',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <KenButton
            variant={value ? 'primary' : 'secondary'}
            disabled={onDisableBtn(value)}
            onClick={() => onGradeClick(value)}
            style={{ position: 'relative', left: '20px' }}
          >
            Grade
          </KenButton>
        );
      },
    },
    /* {
      Header: (
        <Typography className={classes.heading} style={{ textAlign: 'center' }}>
          {EDIT}
          {''}
        </Typography>
      ),
      accessor: 'userId',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <>
            <Grid item xs={1}>
              <Box textAlign="center">
                <Typography color="textSecondary" component="h5">
                  <MoreVertIcon
                    aria-describedby={id}
                    onClick={openEditBox.bind(this, value)}
                  />
                </Typography>
              </Box>
            </Grid>
          </>
        );
      },
    }, */
  ];

  return (
    <React.Fragment>
      <div ref={divRef}>
        <KenGrid
          columns={columns}
          data={data}
          pagination={{ disabled: false }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={closeEditBox}
          classes={{
            paper: classes.paperEdit,
          }}
          // anchorReference="anchorPosition"
          // anchorPosition={{ top: 50, left: 140 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List>
            <ListItem button onClick={lockOnClick}>
              <ListItemText primary="Prevent changes" />
            </ListItem>
            <ListItem button onClick={lockUnLockClick}>
              <ListItemText primary="Allow changes" />
            </ListItem>
          </List>
        </Popover>
      </div>
    </React.Fragment>
  );
}
