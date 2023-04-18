import { Grid, makeStyles, Typography, Avatar, Box } from '@material-ui/core';
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
import { assignGetSubmissionStatus, wsAssignLockSubmission, wsAssignUnlockSubmission } from '../../../../../utils/ApiService';

// const Popover = React.lazy(() => { import('@material-ui/core/Popover') });

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 10,
    color: theme.palette.KenColors.neutral400,
    textAlign: 'initial'
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
    textAlign: 'left'
  },
  popover: {
    "&.MuiPopover-root": {
      //whatever you want
    }
  }
  // paperEdit: {
  //   position: 'absolute'
  // }
}));

export default function StudentList(props) {
  const { data, submittedUsers, submissionHeading, cmid } = props;
  console.log("props", props);
  const classes = useStyles();
  const history = useHistory();
  // const [editBox, setEditBox] = React.useState(false);  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currContactId, setCurrContactId] = React.useState('')
  const divRef = React.useRef();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onGradeClick = (contactId) => {
    const payload = {
      cmid: cmid,
      contactid: contactId,
      groupid: 0
    }
    assignGetSubmissionStatus(payload)
      .then(res => {
        let feedbackGrade = res.feedback?.grade?.grade
        let feedbackcomments = res.feedback?.plugins?.filter(item => item.type == "comments")
        let feedbackText = feedbackcomments[0]?.editorfields[0]?.text
        history.push({
          pathname: '/assignment/originalityReport',
          state: {
            submissionRes: res,
            submittedUsers: submittedUsers,
            submissionHeading: submissionHeading,
            cmid: cmid,
            previewData: {
              contactId: contactId,
              feedbackGrade: feedbackGrade,
              feedbackText: feedbackText
            }
          }
        })
      })
      .catch(err => {
        console.log('error in Assignment Instructions', err);
      });
  }

  const onDisableBtn = (value) => {
    let status = false
    data.map((el, i) => {
      if (String(value) == String(el.userid)) {
        status = el.status == "new" ? true : false;
      }
    })
    return status;
  }
  // editbox
  const openEditBox = (event, data) => {
    setCurrContactId(event) //contact id
    console.log(divRef.current);
    setAnchorEl(divRef.current);
    // setOpen(true)
  };

  const closeEditBox = () => {
    setAnchorEl(null);
  };

  const lockOnClick = () => {

    const payload = {
      cmid: props.cmid,
      contactid: currContactId,
    }
    wsAssignLockSubmission(payload)
      .then(res => {
        setAnchorEl(null);
      })
      .catch(err => {
        setAnchorEl(null);
        console.log('error in Assignment Instructions', err);
      });
  }

  const lockUnLockClick = () => {
    const payload = {
      cmid: props.cmid,
      contactid: currContactId,
    }
    wsAssignUnlockSubmission(payload)
      .then(res => {
        setAnchorEl(null);
      })
      .catch(err => {
        setAnchorEl(null);
        console.log('error in Assignment Instructions', err);
      });
  }

  const columns = [
    {
      Header: <Typography className={classes.heading}>STUDENT NAME</Typography>,
      accessor: 'username',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        console.log(value);
        return (
          <Link
            // to={`/${Routes.assignmentOriginal}`}
            style={{ textDecoration: 'none' }}
            className={classes.userNameWrap}
          >
            <Avatar alt="" style={{ position: 'initial' }}></Avatar>
            <Typography className={classes.name} style={{ paddingLeft: 10 }}>{value}</Typography>
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
          <Grid
            container
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <img src={value == "submitted" ? SubmittedIcon : NotSubmittedIcon} />
            </Grid>
            <Grid item>
              {value == "submitted" ? (
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
      disableGlobalFilter: true,
    },
    {
      Header: <Typography className={classes.heading}>GRADES</Typography>,
      accessor: 'gradingstatus',
      Cell: ({ value }) => {
        return (
          <Typography className={classes.name} style={{ textAlign: 'initial' }}>{value}</Typography>
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
    {
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
    },
    {
      Header: <Typography className={classes.heading}>MODIFIED DATE</Typography>,
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
      Header: <Typography className={classes.heading} style={{ textAlign: 'center' }}>ACTIONS</Typography>,
      accessor: 'contactId',
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
    {
      Header: <Typography className={classes.heading} style={{ textAlign: 'center' }}>EDIT</Typography>,
      accessor: 'userId',
      disableGlobalFilter: true,
      Cell: ({ value }) => {
        return (
          <>
            <Grid item xs={1} >
              <Box textAlign="center">
                <Typography
                  color="textSecondary"
                  component="h5"
                >
                  <MoreVertIcon aria-describedby={id}
                    onClick={openEditBox.bind(this, value)} />
                </Typography>

              </Box>
            </Grid>
          </>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div ref={divRef}>
        <KenGrid columns={columns} data={data} />
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
  )
}
