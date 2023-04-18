import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
  Box,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Popover,
} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React from 'react';
import { useState } from 'react';
import style from '../../../../AcadamicContent/style.css';
// import clockIcon from '../../../../../../assets/clockIcon.svg';
// import calenderIcon from '../../../../../../assets/calendorIcon.svg';
// import awardIcon from '../../../../../../assets/awardIcon.svg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RateReviewIcon from '@material-ui/icons/RateReviewOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Routes from '../../../../../../utils/routes.json';
import { getUserDetails } from '../../../../../../utils/helpers/storageHelper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  hoverEffect: {
    '&:hover': {
      background: '#F0F3FF',
    },
  },

  accordian: {
    width: '100%',
  },
  cardList: {
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    boxShadow: `5px 7px 2px ${theme.palette.KenColors.kenWhite}`,
    borderLeft: `1.5px solid ${theme.palette.KenColors.tertiaryRed500}`,
    padding: 16,
    marginRight: 16,
    borderRadius: 3,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  headingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#505F79',
    cursor: 'pointer',
  },
  topicStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '20px',
    color: '#7A869A',
  },
  statusStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '150%',
    color: '#52C15A',
  },
}));

export default function ActivityCard(props) {
  const {
    data,
    formDate,
    toDate,
    setcourseActivities,
    courseActivities,
    activityType,
    classData,
    deleteData,
    setDeleteData,
    editQuizID,
    setEditQuizID,
    broadcastData,
    setBroadcastData,
    handleEditAssessment,
  } = props;
  const classes = useStyles();
  const userDetails = getUserDetails();
  const [editBox, setEditBox] = React.useState(null);
  const [type, setType] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState();

  // const [data2, setData] = useState(!data2);

  // editbox
  const openEditBox = (event, item, data) => {
    setEditBox(data.currentTarget);
    setSelectedItem(item);
    setType(event);
  };

  const closeEditBox = () => {
    setEditBox(null);
  };

  const open = Boolean(editBox);
  const id = open ? 'simple-popover' : undefined;
  const history = useHistory();

  const goToSubmission = (submissionOf, data) => {
    history.push({
      pathname: '/assignment-submission',
      state: {
        cmid: Number(data?.cmid),
        title: data?.name,
      },
    });
  };

  const goToPreview = (previewOf, data) => {
    data.origin = 'academic-content';
    data.classData = classData;
    if (previewOf === 'quiz') {
      history.push({
        pathname: `/${Routes.assessmentPreview}`,
        state: { data: data },
      });
    }
    closeEditBox();
  };
  const goToReview = (reviewof, data) => {
    console.log('goToReview data', data);
    switch (reviewof) {
      case 'quiz':
        if (userDetails.Type === 'Faculty') {
          history.push({
            pathname: Routes.reviewQuiz,
            state: {
              quizId: data?.cmid,
              quizInfo: {
                quiz: data?.name
              }
            },
          });
        } else {
          history.push({
            pathname: Routes.studentPerformance,
            state: {
              quizId: data?.cmid,
              contactId: userDetails.ContactId,
              studentName: userDetails.Name,
            },
          });
        }

        break;
      case 'assign':
        history.push({
          pathname: Routes.assignmentReview,
          state: {
            quizId: data?.cmid,
            // quizName: data?.heading || 'Dummy Assessment',
            // origin: 'Activities',
            // status: data?.status === 'Published' ? 'published' : 'unpublished',
          },
        });
        break;
    }
    closeEditBox();
  };

  const goToEdit = (editof, data) => {
    switch (editof) {
      case 'quiz':
        console.log('onclick data', data);
        handleEditAssessment(data);
        // setEditQuizID(data);
        /*  history.push({
          pathname: Routes.questionBank,
          state: {
            quizId: data?.cmid || 1956,
            quizName: data?.heading || 'Dummy Assessment',
            origin: 'Activities',
            status: data?.status === 'Published' ? 'published' : 'unpublished',
          },
        }); */
        break;
      case 'assign':
        history.push({
          pathname: `/assignment/${data?.cmid}`,
          state: {
            assignmentId: data?.cmid,
            assignmentName: data?.heading,
            origin: 'Activities',
            status: data?.status === 'Published' ? 'published' : 'unpublished',
            operation: 'update',
          },
        });
        break;
      case 'forum':
        history.push({
          pathname: `/${Routes.forum}/${data?.cmid}`,
          state: {
            forumID: data?.cmid,
            heading: data?.heading,
            forumSubject: data?.name,
            origin: 'Activities',
            status: data?.status === 'Published' ? 'published' : 'unpublished',
            lastDate: data?.timeclose,
            operation: 'update',
          },
        });
        break;
    }
    closeEditBox();
  };
  const goToAttempt = (attemptOf, data) => {
    console.log('data', data);

    window.open(
      `/instructions?id=${data?.id}&name=${data?.heading}`,
      'mywindow',
      'fullscreen=yes,status=1,toolbar=0'
    );
  };
  // delete module
  const goToDelete = (deleteOF, data) => {
    setDeleteData(data);
    closeEditBox();
  };
  // goto publish
  const goToPublish = (publishOF, data) => {
    console.log(data)
    setBroadcastData(data);
    closeEditBox();
  };

  // goto Discussions
  const goToDiscussions = (publishOF, data) => {
    console.log('data', data);

    history.push({
      pathname: `/${Routes.discussion}`,
      state: {
        forumID: data?.cmid,
        heading: data?.heading,
        forumSubject: data?.name,
        origin: 'Activities',
        status: data?.status === 'Published' ? 'published' : 'unpublished',
        lastDate: data?.timeclose,
      },
    });
    closeEditBox();
  };

  const redirectToRelevantPage = item => {
    if (userDetails.Type === 'Faculty') {
      if (activityType === 'assignment') {
        if (item?.status === 'Published') {
          goToReview('assign', item);
        } else {
          goToEdit('assign', item);
        }
      } else if (activityType === 'quiz') {
        if (item?.status === 'Published') {
          goToPreview('quiz', item);
        } else {
          goToEdit('quiz', item);
        }
      } else {
        goToDiscussions('', item);
      }
    } else {
      if (activityType === 'assignment') {
        goToSubmission('', item);
      } else if (activityType === 'quiz') {
        goToAttempt('', item);
      } else {
        goToDiscussions('', item);
      }
    }
  };

  const isAttemptAvailable = () => {
    console.log('selectedItem', selectedItem);
    if (
      Number(
        selectedItem?.addtionalinfo?.find(
          item => item.name === 'mytotalattempts'
        )?.value
      ) === 0
    ) {
      return true;
    }

    if (
      Number(
        selectedItem?.addtionalinfo?.find(
          item => item.name === 'mytotalattempts'
        )?.value
      ) <
      Number(
        selectedItem?.addtionalinfo?.find(
          item => item.name === 'attemptallowed'
        )?.value
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box style={{ maxHeight: '100%' }}>
      {data &&
        data?.map((e, index) => {
          return (
            // <div>
            <>
              {/* popper for editbox */}
              <>
                {/* {moment(e?.date).format(YYYY-MM-DD).isSame(formDate).format(YYYY-MM-DD) && "true"} */}
                {/* {e?.date && formDate=== e?.date || toDate === e?.date ? "Date Available": 'Date Not Available'} */}
                <div>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={editBox}
                    onClose={closeEditBox}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    elevation={1}
                    PaperProps={{
                      style: {
                        boxShadow: '0px 0px 4px #e6e6e6',
                      },
                    }}
                  >
                    <Grid style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                      <List component="nav">
                        {userDetails.Type === 'Faculty' && (
                          <>
                            {activityType === 'quiz' && (
                              <ListItem
                                button
                                className={classes.hoverEffect}
                                onClick={() =>
                                  activityType === 'quiz' &&
                                  goToPreview('quiz', selectedItem)
                                }
                              >
                                <ListItemIcon>
                                  <VisibilityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Preview" />
                              </ListItem>
                            )}
                            <ListItem
                              button
                              className={classes.hoverEffect}
                              onClick={event => {
                                console.log(
                                  ' const element = event.currentTarget;',
                                  event.target
                                );
                                /* history.push({
                                  pathname: Routes.questionBank,
                                  state: {
                                    quizId: e?.cmid || 1956,
                                    quizName: e?.heading || 'Dummy Assessment',
                                    origin: 'Activities',
                                    status:
                                      e?.status === 'Published'
                                        ? 'published'
                                        : 'unpublished',
                                  },
                                }) */
                                goToEdit(selectedItem?.modtype, selectedItem);
                              }}
                            >
                              <ListItemIcon>
                                <EditOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText primary="Edit" />
                            </ListItem>
                            <ListItem
                              button
                              className={classes.hoverEffect}
                              onClick={event => {
                                goToDelete(selectedItem?.modtype, selectedItem);
                              }}
                            >
                              <ListItemIcon>
                                <DeleteOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText primary="Delete" />
                            </ListItem>
                            <ListItem
                              button
                              disabled={Number(selectedItem?.marks) < 1}
                              className={classes.hoverEffect}
                              onClick={event => {
                                goToPublish(
                                  selectedItem?.modtype,
                                  selectedItem
                                );
                              }}
                            >
                              <ListItemIcon>
                                <PublishOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  selectedItem?.publish === 0
                                    ? 'Publish'
                                    : 'Unpublish'
                                }
                              />
                            </ListItem>
                          </>
                        )}

                        {/* <ListItem button className={classes.hoverEffect}>
                          <ListItemIcon>
                            <ShareOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Share" />
                        </ListItem> */}

                        {activityType === 'assignment' && (
                          <>
                            {userDetails.Type === 'Faculty' && (
                              <ListItem
                                button
                                className={classes.hoverEffect}
                                onClick={() => {
                                  // history.push({
                                  //   pathname: Routes.assignmentReview,
                                  //   state: {
                                  //     cmid: selectedItem?.cmid,
                                  //   },
                                  // })
                                  goToReview(
                                    selectedItem?.modtype,
                                    selectedItem
                                  );
                                }}
                              >
                                <ListItemIcon>
                                  <RateReviewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Review" />
                              </ListItem>
                            )}
                            {userDetails.Type !== 'Faculty' && (
                              <ListItem
                                button
                                className={classes.hoverEffect}
                                onClick={() => {
                                  goToSubmission(
                                    selectedItem?.modtype,
                                    selectedItem
                                  );
                                }}
                              >
                                <ListItemIcon>
                                  <UnarchiveOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Submission"
                                // onClick={viewSubmitPage.bind(this, e.type, e)}
                                />
                              </ListItem>
                            )}
                          </>
                        )}
                        {activityType === 'quiz' && (
                          <>
                            {userDetails.Type === 'Faculty' && (
                              <ListItem
                                button
                                className={classes.hoverEffect}
                                onClick={() => {
                                  // history.push({
                                  //   pathname: Routes.assignmentReview,
                                  //   state: {
                                  //     cmid: selectedItem?.cmid,
                                  //   },
                                  // })
                                  goToReview(
                                    selectedItem?.modtype,
                                    selectedItem
                                  );
                                }}
                              >
                                <ListItemIcon>
                                  <RateReviewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Review Quiz" />
                              </ListItem>
                            )}
                            {userDetails.Type !== 'Faculty' && (
                              <>
                                {isAttemptAvailable() && (
                                  <ListItem
                                    button
                                    className={classes.hoverEffect}
                                    onClick={event => {
                                      goToAttempt(
                                        selectedItem?.modtype,
                                        selectedItem
                                      );
                                    }}
                                    disabled={moment(selectedItem?.timeclose).isBefore()}
                                  >
                                    <ListItemIcon>
                                      <BorderColorOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Attempt Now" />
                                  </ListItem>
                                )}
                                {Number(selectedItem?.mytotalattempts) > 0 && (
                                  <ListItem
                                    button
                                    className={classes.hoverEffect}
                                    onClick={event => {
                                      goToReview(
                                        selectedItem?.modtype,
                                        selectedItem
                                      );
                                    }}
                                  >
                                    <ListItemIcon>
                                      <AssessmentOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Result" />
                                  </ListItem>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {activityType === 'forum' && (
                          <ListItem
                            button
                            className={classes.hoverEffect}
                            onClick={event => {
                              goToDiscussions(
                                selectedItem?.modtype,
                                selectedItem
                              );
                            }}
                          >
                            <ListItemIcon>
                              <ForumOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Discussions" />
                          </ListItem>
                        )}
                      </List>
                    </Grid>

                    {/* <Grid style={{ padding: '16px' }}>
                      <Grid item xs={12}>
                        <Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.hoverEffect}
                          >
                            <VisibilityOutlinedIcon /> &nbsp; &nbsp;Preview{' '}
                          </Button>
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.hoverEffect}
                          >
                            <EditOutlinedIcon /> &nbsp; &nbsp;Edit
                          </Button>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.hoverEffect}
                          >
                            <DeleteOutlinedIcon /> &nbsp; &nbsp;Delete{' '}
                          </Button>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.hoverEffect}
                          >
                            <PublishOutlinedIcon /> &nbsp; &nbsp;Publish
                          </Button>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.hoverEffect}
                          >
                            <ShareOutlinedIcon /> &nbsp; &nbsp;Share
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Popover>
                </div>
              </>

              {userDetails.Type === 'Faculty' ? (
                <Box mb={1}>
                  <Card
                    className={(classes.root, classes.hoverEffect)}
                    variant="outlined"
                  >
                    <Box p={2}>
                      <Grid container spacing={2} justifyContent="space-around">
                        <Grid item container md={3} spacing={1}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              className={classes.headingStyle}
                              onClick={() => redirectToRelevantPage(e)}
                            >
                              {e?.heading}
                            </Typography>
                          </Grid>
                          {activityType !== 'forum' && <Grid item xs={12} md={12}>
                            <Typography
                              className={classes.topicStyle}
                            >{`Total Marks ${Number(e.marks)?.toFixed(
                              2
                            )}`}</Typography>
                          </Grid>}
                        </Grid>
                        <Grid
                          item
                          container
                          md={3}
                          spacing={1}
                          alignItems="center"
                        >
                          <Grid item xs={12} md={12}>
                            {' '}
                            <>
                              {e?.date && e?.date ? (
                                <Typography className={classes.topicStyle}>
                                  Start Date: {e?.date}
                                </Typography>
                              ) : (
                                ''
                              )}
                            </>
                          </Grid>
                          <Divider />
                          <Grid item xs={12} md={12}>
                            {' '}
                            {e?.timeclose && e?.timeclose ? (
                              <Typography className={classes.topicStyle}>
                                Due Date: {e?.timeclose}
                              </Typography>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Grid>
                        <Grid item container md={3} spacing={1}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              className={classes.statusStyle}
                              style={{
                                color:
                                  e?.status === 'Published'
                                    ? 'green'
                                    : 'orange',
                              }}
                            >
                              {e?.status}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {activityType === 'assignment' && (
                              <>
                                {' '}
                                {e?.allsubmissions == '1' ? (
                                  <Typography className={classes.topicStyle}>
                                    Submissions available
                                  </Typography>
                                ) : (
                                  <Typography className={classes.topicStyle}>
                                    No submissions yet
                                  </Typography>
                                )}
                              </>
                            )}
                            {activityType === 'quiz' && (
                              <Typography className={classes.topicStyle}>
                                {`${e?.mytotalattempts || '0'} Attempts`}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item md={1} style={{ textAlign: 'right' }}>
                          <Typography
                            color="textSecondary"
                            component="h5"
                            gutterBottom
                            style={{ cursor: 'pointer' }}
                            onClick={openEditBox.bind(this, e.type, e)}
                          >
                            <MoreVertIcon
                            // onClick={openEditBox.bind(this, e.type, e)}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Box>
              ) : (
                <Box mb={1}>
                  <Card
                    className={(classes.root, classes.hoverEffect)}
                    variant="outlined"
                  >
                    <Box p={2}>
                      <Grid container spacing={2} justifyContent="space-around">
                        <Grid item container md={3} spacing={1}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              className={classes.headingStyle}
                              onClick={() => redirectToRelevantPage(e)}
                            >
                              {e?.heading}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography
                              className={classes.topicStyle}
                            >{`Total Marks ${Number(e.marks)?.toFixed(
                              2
                            )}`}</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          md={3}
                          spacing={1}
                          alignItems="center"
                        >
                          <Grid item xs={12} md={12}>
                            {' '}
                            <>
                              {e?.date && e?.date ? (
                                <Typography className={classes.topicStyle}>
                                  Start Date: {e?.date}
                                </Typography>
                              ) : (
                                ''
                              )}
                            </>
                          </Grid>
                          <Divider />
                          <Grid item xs={12} md={12}>
                            {' '}
                            {e?.timeclose && e?.timeclose ? (
                              <Typography className={classes.topicStyle}>
                                Due Date: {e?.timeclose}
                              </Typography>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          md={4}
                          spacing={1}
                          alignItems="center"
                        >
                          <Grid item xs={12} md={12}>
                            {activityType === 'assignment' && (
                              <Typography
                                className={classes.statusStyle}
                                style={{
                                  color:
                                    Number(e?.allsubmissions) > 0
                                      ? 'green'
                                      : 'orange',
                                }}
                              >
                                {Number(e?.allsubmissions) > 0
                                  ? 'Submitted'
                                  : 'Not Submitted'}
                              </Typography>
                            )}
                            {activityType === 'quiz' && (
                              <Typography
                                className={classes.statusStyle}
                                style={{
                                  color:
                                    Number(e?.mytotalattempts) > 0
                                      ? 'green'
                                      : 'orange',
                                }}
                              >
                                {Number(e?.mytotalattempts) > 0
                                  ? 'Attempted'
                                  : (moment(e?.timeclose).isBefore() ? 'Quiz Expired' : 'Not Attempted')}
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(Number(e?.mytotalattempts) > 0 ||
                              Number(e?.allsubmissions) > 0) && (
                                <>
                                  {Number(e?.usergrade) < 0 ? (
                                    <Typography className={classes.topicStyle}>
                                      {`Not graded yet`}
                                    </Typography>
                                  ) : (
                                    <Typography className={classes.topicStyle}>
                                      {/* {` Marks obtained: ${Number(
                                        e?.usergrade
                                      ).toFixed(2) || '0'}`} */}
                                    </Typography>
                                  )}
                                </>
                              )}
                            {activityType === 'assignment' && (
                              <>
                                {e?.allsubmissions == '1' ? (
                                  <Typography className={classes.topicStyle}>
                                    Submitted once
                                  </Typography>
                                ) : (
                                  <>
                                    {e?.allsubmissions == '0' ? (
                                      ''
                                    ) : (
                                      <Typography
                                        className={classes.topicStyle}
                                      >
                                        {`Submitted ${e?.allsubmissions ||
                                          '0'} times`}
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            {activityType === 'quiz' && (
                              <>
                                {/* <Typography className={classes.topicStyle}>
                                  {`Attempted ${e?.mytotalattempts ||
                                    '0'} times`}
                                </Typography> */}
                                <>
                                  {e?.mytotalattempts == '1' ? (
                                    <Typography className={classes.topicStyle}>
                                      Attempted once
                                    </Typography>
                                  ) : (
                                    <>
                                      {e?.mytotalattempts == '0' ? (
                                        ''
                                      ) : (
                                        <>
                                          {e?.mytotalattempts && (
                                            <Typography
                                              className={classes.topicStyle}
                                            >
                                              {`Attempted ${e?.mytotalattempts ||
                                                '0'} times`}
                                            </Typography>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              </>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item md={1} style={{ textAlign: 'right' }}>
                          <Typography
                            color="textSecondary"
                            component="h5"
                            gutterBottom
                            style={{ cursor: 'pointer' }}
                            onClick={openEditBox.bind(this, e.type, e)}
                          >
                            <MoreVertIcon
                            // onClick={openEditBox.bind(this, e.type, e)}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Box>
              )}
              {/* </div> */}
            </>
          );
        })}
    </Box>
  );
}
