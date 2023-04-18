import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import KenButton from '../../../../../global_components/KenButton';
//icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import StarIcon from '@material-ui/icons/Star';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import KenInputField from '../../../../../components/KenInputField';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';

import previewSvg from '../../../../../assets/icons/previewSvg.svg';
import downloadSvg from '../../../../../assets/icons/downloadSvg.svg';
import KenDialog from '../../../../../global_components/KenDialog';
import StudentListDailog from './Components/StudentListDailog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: '650px',
  },
  containerModify: {
    maxHeight: '70vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  containerModify2: {
    maxHeight: '45vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#00218D',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  hoverEffect: {
    '&:hover': {
      background: '#F0F3FF',
    },
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  headingFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '100%',
    color: '#061938',
  },
  optionsFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',

    fontSize: '11px',
    lineHeight: '100%',
    color: '#838483',
  },
  OptionAnsFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',

    fontSize: '11px',
    lineHeight: '100%',
    color: '#000000',
  },
  classParticipants: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',

    fontSize: '11px',
    lineHeight: '100%',
    color: '#000000',
  },
  participentDialogFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '100%',
    color: '#2B2B2B',
  },
}));
export default function DiscussionDetails(props) {
  const classes = useStyles();
  const { testData, discussionCardClick, lock } = props;
  const [openDialog, setOpenDialog] = React.useState();
  //dialogBox
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  //

  return (
    <>
      <Paper className={classes.paper}>
        {discussionCardClick && discussionCardClick ? (
          <>
            <Grid
              container
              spacing={2}
              direction="row"
              alignItems="center"
              style={{ padding: '8px' }}
            >
              <Grid item md={12} sm={12} xs={12}>
                <Typography
                  className={classes.headingFont}
                  style={{
                    borderBottom: '1px solid #F4F5F7',
                    marginBottom: '16px',
                    padding: '8px',
                  }}
                >
                  Discussion Details
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                container
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item md={6} sm={6} xs={6}>
                  <Typography className={classes.optionsFont}>
                    Created By
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
                    <Grid item md={5} sm={6} xs={3}>
                      {/* <Avatar
                        alt={discussionCardClick?.userfullname}
                        src={discussionCardClick?.userpictureurl}
                      /> */}
                      <Avatar style={{ width: 35, height: 35, fontSize: 14 }}>
                        {discussionCardClick?.userfullname
                          .replace(/\b[a-z]/g, match => match.toUpperCase())
                          .match(/\b(\w)/g)}
                      </Avatar>
                    </Grid>
                    <Grid item md={7} sm={6} xs={9}>
                      <Typography className={classes.OptionAnsFont}>
                        {discussionCardClick?.userfullname}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Created on
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={7}>
                  <Typography className={classes.classParticipants}>
                    {moment
                      .unix(discussionCardClick?.created)
                      .format('DD MMM YYYY')}
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Subject
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={7}>
                  <Typography className={classes.classParticipants}>
                    {discussionCardClick?.subject}
                  </Typography>
                </Grid>
                {/* <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>Tags</Typography>
                </Grid> */}
                {/* <Grid
                  item
                  md={6}
                  sm={6}
                  xs={7}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {e?.tags?.map(items => {
                    return (
                      <Grid item xs={6}>
                        <Chip
                          className={classes.chip}
                          style={{
                            color: '#2656C9',
                            background: '#d5dff7',
                            fontSize: '10px',
                          }}
                          key={items.key}
                          label={items.label}
                        />
                      </Grid>
                    );
                  })}
                </Grid> */}
                {/* <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Participants
                  </Typography>
                </Grid> */}
                {/* <Grid item md={6} sm={6} xs={7}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item md={3}>
                      <Typography className={classes.classParticipants}>
                        {' '}
                        {e?.participants?.classParticipants}{' '}
                      </Typography>
                    </Grid>

                    <Grid item md={4}>
                      {e?.participants?.section?.map(sec => {
                        return (
                          <span className={classes.classParticipants}>
                            {' '}
                            {sec},
                          </span>
                        );
                      })}
                    </Grid>
                    <Grid item md={4}>
                      <KenButton
                        onClick={handleClickOpenDialog}
                        startIcon={<PeopleOutlineOutlinedIcon />}
                        size="small"
                        variant="contained"
                        style={{
                          background: '#F3F6FF',
                          borderRadius: '4px',
                          color: '#000000',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        {discussionCardClick?.usermodified?.length}
                      </KenButton>
                    </Grid>
                  </Grid>
                </Grid> */}
                <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Status
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={7}>
                  {lock === false ? (
                    <Chip
                      style={{
                        color: '#00B35D',
                        background: '#d4fce9',
                      }}
                      label="Active"
                    />
                  ) : (
                    <Chip
                      style={{
                        color: '#fa1919',
                        background: '#ffd1d1',
                      }}
                      label="Inactive"
                    />
                  )}
                </Grid>
                <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Total Replies
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={7}>
                  <Typography className={classes.OptionAnsFont}>
                    {discussionCardClick?.numreplies}
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={5}>
                  <Typography className={classes.optionsFont}>
                    Last Post on
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={7}>
                  <Typography className={classes.OptionAnsFont}>
                    {moment
                      .unix(discussionCardClick?.timemodified)
                      .format('DD MMM YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              style={{ padding: '8px', marginTop: '8px' }}
              container
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Grid item md={12}>
                <Typography
                  className={classes.headingFont}
                  style={{
                    borderBottom: '1px solid #F4F5F7',

                    padding: '8px',
                  }}
                >
                  Shared files
                </Typography>
              </Grid>
            </Grid>
            {discussionCardClick?.attachments &&
            discussionCardClick?.attachments ? (
              <Box className={classes.containerModify2}>
                {discussionCardClick?.attachments?.map(e => {
                  return (
                    <Card style={{ marginTop: '8px' }}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item md={3} xs={3}>
                            <img src={previewSvg} alt="" />
                          </Grid>
                          <Grid item md={7} xs={7}>
                            <Typography
                              style={{
                                fontFamily: "'Open Sans'",
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: '14px',

                                color: '#061938',
                              }}
                            >
                              {e.filename}
                            </Typography>
                            {/*   <Typography className={classes.classParticipants}>
                            {e.subject}
                          </Typography> */}
                          </Grid>
                          <Grid item md={2} xs={2}>
                            <a
                              href={`${e?.fileurl}?token=${localStorage.getItem(
                                'fileToken'
                              )}`}
                              download
                              // target="_blank"
                            >
                              <img src={downloadSvg} alt={e.filename} />
                            </a>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <Grid
                container
                spacing={2}
                style={{ marginTop: '30px' }}
                justifyContent="center"
                alignItems="center"
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography>No file(s) available </Typography>
                  </CardContent>{' '}
                </Card>
              </Grid>
            )}
          </>
        ) : null}
      </Paper>
      <StudentListDailog
        studentData={testData?.studentData}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleClickOpenDialog={handleClickOpenDialog}
      />
    </>
  );
}
