import React, { useEffect, useState } from 'react';
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
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Popover,
  Typography,
} from '@material-ui/core';

// import KenInputField from '../../../../../../components/KenInputField';
// import KenButton from '../../../../../../global_components/KenButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import StarIcon from '@material-ui/icons/Star';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import symbolA from '../../../../../assets/icons/symbolA.svg';
import KenInputField from '../../../../../components/KenInputField';
import KenButton from '../../../../../global_components/KenButton';
import moment from 'moment';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
import { BsPin } from 'react-icons/bs';
import { BsPinFill } from 'react-icons/bs';
import KenEditor from '../../../../../global_components/KenEditor';
import KenLoader from '../../../../../components/KenLoader';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import SendIcon from '@material-ui/icons/Send';

//api
import {
  lockToggleDiscussion,
  pinToggleDiscussion,
  starToggleDiscussion,
  getDiscussionPosts,
  addForumDiscussionPost,
} from '../../../../../utils/ApiService';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: '650px',
  },
  containerModify: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
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
  containerModify2: {
    maxHeight: '60vh',
    minHeight: '60vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
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
    fontSize: '18px',
    lineHeight: '150%',
    color: '#061938',
  },
  cardHeading: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '100%',
    color: '#000000',
  },
  cardHeadingBtn: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '100%',
    color: '#00218D',
  },
  hoverEffect: {
    '&:hover': {
      background: '#DFE8FF',
    },
  },
}));
export default function DiscussionReply(props) {
  const {
    lock,
    setLock,
    star,
    setStar,
    pin,
    setPin,
    handlePinClick,
    handleLockClick,
    handleStarClick,
    testData,
    discussionCardClick,
    lockData,
    setLockData,
    starData,
    setStarData,
    pinData,
    setPinData,
    forumID,
    setLoading,
    handleSnackbarOpen,
    setActionCall,
    setDiscussionCardClick,
  } = props;

  const [chatData, setChatData] = useState(testData?.ActiveCardData);
  let [inputData, setInputData] = useState(null);
  let [replyMessage, setReplyMessage] = useState(null);
  const { t } = useTranslation();

  const profile = getUserDetails();
  const contactId = profile.ContactId;
  console.log('discussionCardClick', discussionCardClick);
  const sendReply = () => {
    if (inputData !== null) {
      const newMessages = [...chatData];

      let reply = {
        id: discussionCardClick.id,
        heading: inputData,
        lastseen: moment()
          .startOf()
          .fromNow(),
        username: profile?.Name || 'unknown',
      };
      setChatData([...chatData, reply]);
      setReplyMessage(inputData);
      setInputData('');
    }
  };
  // const clearReplyData=()=>{
  //   setInputData();

  // }

  const handleInput = data => {
    console.log('recived HTML INPUT DATA');
    /* step 1 data converted html to plane text    
    `cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, ""); 
     step 2 remove special charter from string
     var newString = stringValue.replace(/(^\&)|,/g, ' '); */
    let strInputCode = data.replace(/<\/?[^>]+(>|$)/g, '');
    // setInputData(strInputCode.replace(/(^\&)|,/g, ' '));
    setInputData(data);
  };
  //popover
  const [openPopover, setOpenPopover] = useState(null);

  const handleClick = event => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const open = Boolean(openPopover);
  const id = open ? 'simple-popover' : undefined;
  //

  const classes = useStyles();

  //Api
  const [lockResponseData, setLockResponseData] = useState([]);
  const [starResponseData, setStarResponseData] = useState([]);
  const [pinResponseData, setPinResponseData] = useState([]);
  const [postReplyData, setPostReplyData] = useState([]);
  const [postSend, setPostSend] = useState(null);

  //API Integration for lockToggleDiscussion
  React.useEffect(() => {
    if (lockData !== null) {
      // setLoading(true);
      const targetstate = lockData?.locked === false ? 0 : 1;
      let paylod = {
        forumid: forumID,
        discussionid: lockData?.discussionid,
        targetstate: targetstate,
        method: 'post',
      };
      console.log('payload', paylod);
      lockToggleDiscussion(paylod)
        .then(res => {
          setLoading(false);
          setLockResponseData(res);
          // setLock(res?.locked);
          setActionCall(true);
          // handleSnackbarOpen('success', t('messages:Forum_Discussion_Lock'));
          handleSnackbarOpen(
            'success',
            t(
              `messages:Forum Discussion ${
                lockData?.locked === false ? 'locked' : 'Unlocked'
              }`
            )
          );
        })
        .catch(err => {
          setLoading(false);
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('lock Toggle Discussion err', err);
        });
      setLockData(null);
    }
  }, [lockData]);

  //API Integration for  starToggleDiscussion
  React.useEffect(() => {
    if (starData !== null) {
      setLoading(true);

      const targetstate = starData?.starred === false ? 1 : 0;
      let paylod = {
        contactid: contactId,
        discussionid: starData?.discussionid,
        targetstate: targetstate,
        method: 'post',
      };
      starToggleDiscussion(paylod)
        .then(res => {
          setLoading(false);
          setStarResponseData(res);
          setActionCall(true);
          // handleSnackbarOpen('success', t('messages:Forum_Discussion_Star'));
          handleSnackbarOpen(
            'success',
            t(
              `messages:Forum Discussion ${
                starData?.starred === false ? 'starred' : 'Unstarred'
              }`
            )
          );
        })
        .catch(err => {
          setLoading(false);
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('star Toggle Discussion err', err);
        });
      setStarData(null);
    }
  }, [starData]);

  //API Integration for  pinToggleDiscussion
  React.useEffect(() => {
    if (pinData !== null) {
      setLoading(true);

      const targetstate = pinData?.pinned === false ? 1 : 0;
      let paylod = {
        discussionid: pinData?.discussionid,
        targetstate: targetstate,
        method: 'post',
      };
      pinToggleDiscussion(paylod)
        .then(res => {
          setLoading(false);
          setPinResponseData(res);
          setActionCall(true);
          // handleSnackbarOpen('success', t('messages:Forum_Discussion_Pin'));
          handleSnackbarOpen(
            'success',
            t(
              `messages:Forum Discussion ${
                pinData?.pinned === false ? 'pinned' : 'Unpinned'
              }`
            )
          );
        })
        .catch(err => {
          setLoading(false);
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('pin Toggle Discussion err', err);
        });
      setPinData(null);
    }
  }, [pinData]);
  // get Discussion Posts
  useEffect(() => {
    if (discussionCardClick !== null) {
      const payload = {
        discussionid: discussionCardClick?.discussionid,
        contactid: contactId,
      };

      getDiscussionPosts(payload)
        .then(res => {
          console.log('get Discussion Posts', res);
          if (res?.posts.length > 0) {
            let sortData = res?.posts.sort((a, b) => a.modified - b.modified);
            setPostReplyData(sortData);
          }
        })
        .catch(err => {
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('get Discussion Posts Error', err);
        });
      // setInterval(() => { use for polling   }, 5000);
      setPostSend(null);
    }
  }, [discussionCardClick, postSend]);

  // add Forum DiscussionPost
  useEffect(() => {
    if (replyMessage !== null) {
      const payload = {
        contactid: contactId,
        postid: postReplyData[0]?.id,
        subject: postReplyData[0]?.subject,
        message: replyMessage,
      };
      addForumDiscussionPost(payload)
        .then(res => {
          setPostSend(res);
        })
        .catch(err => {
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('Add Forum Discussion Post Error', err);
        });
    }
  }, [replyMessage]);
  return (
    <Paper className={classes.paper}>
      {discussionCardClick && discussionCardClick ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={7} sm={5} xs={6}>
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
          <Grid
            item
            md={5}
            sm={7}
            xs={6}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {profile?.Type === 'Faculty' && (
              <IconButton
                onClick={() => {
                  handleLockClick(discussionCardClick);
                }}
                title={lock && lock ? 'Unlock' : 'Lock'}
              >
                {lock && lock ? (
                  <LockOutlinedIcon
                    fontSize="small"
                    style={{ color: '#de0404' }}
                  />
                ) : (
                  <LockOpenIcon fontSize="small" />
                )}
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                handleStarClick(discussionCardClick);
              }}
              title={star && star ? 'UnStar' : 'Star'}
            >
              {star && star ? (
                <StarIcon fontSize="small" style={{ color: '#F88A4F' }} />
              ) : (
                <StarBorderOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            {profile?.Type === 'Faculty' && (
              <IconButton
                onClick={() => {
                  handlePinClick(discussionCardClick);
                }}
                title={pin && pin ? 'UnPin' : 'Pin'}
              >
                {pin && pin ? (
                  <BsPinFill fontSize="medium" style={{ color: '#00218D' }} />
                ) : (
                  <BsPin fontSize="medium" />
                )}
              </IconButton>
            )}
            {/* <IconButton>
              <MoreVertOutlinedIcon onClick={handleClick} />
             
            </IconButton> */}
          </Grid>

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.containerModify2}
          >
            <Grid item md={12} xs={12}>
              <Typography className={classes.headingFont}>
                {discussionCardClick?.name}
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <p style={{ margin: 0 }}>
                {parse(`${discussionCardClick?.message}`)}
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              md={12}
            >
              <Grid item md={12} sm={12} xs={12}>
                <Typography className={classes.cardHeading}>
                  All Replies ({discussionCardClick?.numreplies})
                </Typography>
              </Grid>
              {/* <Grid item md={5} sm={6} xs={5} container justifyContent="flex-end">
              <Button item className={classes.cardHeadingBtn} size="small">
                View Older Replies
              </Button>
            </Grid> */}
            </Grid>
            <Grid item xs={12}>
              {postReplyData?.map(e => {
                return (
                  <Card variant="outlined" style={{ marginBottom: 5 }}>
                    <CardContent style={{ paddingBottom: 10, paddingTop: 5 }}>
                      <Grid
                        spacing={2}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid
                          item
                          md={12}
                          container
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Typography
                            style={{ marginTop: '4px' }}
                            variant="subtitle2"
                          >
                            {parse(`${e.message}`)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          sm={6}
                          xs={6}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar
                            style={{ width: 35, height: 35, fontSize: 14 }}
                          >
                            {/* {e?.userfullname.match(/\b(\w)/g)} */}
                            {e?.userfullname
                              .replace(/\b[a-z]/g, match => match.toUpperCase())
                              .match(/\b(\w)/g)}
                          </Avatar>
                          <Typography
                            className={classes.cardHeading}
                            style={{
                              paddingLeft: 8,
                              fontWeight: 'normal',
                              fontSize: 12,
                            }}
                          >
                            {e?.userfullname.replace(/\b[a-z]/g, match =>
                              match.toUpperCase()
                            )}
                          </Typography>
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                          <Grid
                            container
                            spacing={1}
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item md={8}>
                              <Typography variant="subtitle2">
                                {moment
                                  .unix(e?.modified)
                                  .startOf('')
                                  .fromNow()}
                              </Typography>
                            </Grid>{' '}
                            {/* <Divider orientation="vertical" flexItem />
                            <Grid item md={3}>
                              <Button size="small" color="primary">
                                Reply
                              </Button>
                            </Grid> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
          {profile?.Type === 'Student' && lock === true ? (
            <Grid
              container
              spacing={2}
              style={{ marginTop: '35px' }}
              justifyContent="center"
              alignItems="center"
            >
              <Card variant="outlined">
                <CardContent>
                  {' '}
                  <Typography>
                    This discussion has been locked so you can no longer reply
                    to it.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: 10 }}
            >
              {/* <Grid item md={1} sm={2} xs={2}>
                <img src={symbolA} alt="" />
              </Grid> */}
              <Grid item xs={12} style={{ marginBottom: 10 }}>
                {' '}
                <Divider />
              </Grid>
              <Grid item md={10} sm={8} xs={8}>
                <KenEditor
                  value={inputData}
                  name="title"
                  editorHeight={90}
                  placeholder="type here.."
                  content={inputData}
                  handleChange={handleInput}
                />
              </Grid>

              <Grid item md={2} sm={4} xs={2}>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <KenButton
                    endIcon={<SendIcon />}
                    onClick={sendReply}
                    size="small"
                    variant="contained"
                    color="primary"
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          {/* <Divider /> */}
          {/* <Popover
            id={id}
            open={open}
            anchorEl={openPopover}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List component="nav" aria-label="secondary mailbox folders">
              {profile?.Type === 'Faculty' && (
                <ListItem
                  button
                  className={classes.hoverEffect}
                  onClick={() => {
                    handleLockClick(discussionCardClick);
                    handleClose();
                  }}
                >
                  {lock === false ? (
                    <ListItemText primary="Lock Discussion" />
                  ) : (
                    <ListItemText primary="Unlock Discussion" />
                  )}
                </ListItem>
              )}
              {star === false ? (
                <ListItem
                  button
                  className={classes.hoverEffect}
                  onClick={() => {
                    handleStarClick(discussionCardClick);
                    handleClose();
                  }}
                >
                  <ListItemText primary="Star Discussion" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  className={classes.hoverEffect}
                  onClick={() => {
                    handleStarClick(discussionCardClick);
                    handleClose();
                  }}
                >
                  <ListItemText primary="Unstar Discussion" />
                </ListItem>
              )}
              {profile?.Type === 'Faculty' && (
                <ListItem
                  button
                  className={classes.hoverEffect}
                  onClick={() => {
                    handlePinClick(discussionCardClick);
                    handleClose();
                  }}
                >
                  {pin === false ? (
                    <ListItemText primary="Pin Discussion" />
                  ) : (
                    <ListItemText primary="Unpin Discussion" />
                  )}
                </ListItem>
              )}
            </List>
          </Popover> */}
        </Grid>
      ) : null}
    </Paper>
  );
}
