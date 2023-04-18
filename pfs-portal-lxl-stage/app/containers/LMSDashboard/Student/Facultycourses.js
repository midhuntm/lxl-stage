import React, { useEffect, useState } from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DataCard from '../components/dataCard';
import SessionCard from '../components/sessionCard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import ActivityCard from '../components/activityCard';
import SubjectCard from '../components/subjectCard';
import ForumCard from '../components/forumCard';
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";



import {
  getContactAttendanceCount,
  getFacultyCourses,
  getLatestForums,
  getUserActivitiesCount,
  getUserCourses,
  StudentActivities,
  getCourseContent,
} from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { useHistory } from 'react-router-dom';
import KenLoader from '../../../components/KenLoader';
import moment from 'moment';
import KenChart from '../../../global_components/KenChart';
import KenTabs from '../../../components/KenTabs';
import Routes from '../../../utils/routes.json';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KenIcon from '../../../global_components/KenIcon';
import { FiFilter } from 'react-icons/fi';
import ResourceFilterContent from '../components/resourceFilterContent';
import FilterComponent from '../components/filterComponent';
import { uniqueArrayObjects } from '../../Assessment/QuestionPage/Components/QuestionTypes/Utils';
import SmallSelectBox from '../components/smallSelectBox';
import UpcomingEvents from '../components/UpcomingEvents/index';
import KenCard from '../../../global_components/KenCard';
import { WindowScrollController } from '@fullcalendar/react';

const useStyles = makeStyles(theme => ({
  scroll: {
    maxHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#d1d1d1`,
      opacity: '0.1',
      outline: `1px solid #d1d1d1`,
    },
  },
  mySubjects: {
    maxHeight: '686px',
    minHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#d1d1d1`,
      opacity: '0.1',
      outline: `1px solid #d1d1d1`,
    },
  },
  scrollPanel: {
    maxHeight: '244px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#d1d1d1`,
      opacity: '0.1',
      outline: `1px solid #d1d1d1`,
    },
  },
  tabTitle: {
    fontSize: '14px',
    textTransform: 'capitalize',
    color: '#2862FF',
    textAlign: 'left',
  },
  viewAll: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#00218D',
    // cursor: 'pointer',
    paddingRight: '4px',
  },
}));

export default function AcademicDashboard(props) {
  const classes = useStyles();
  const colors = [
    { bgColor: '#FAF0FF', color: '#C06DE9' },
    { bgColor: '#FEECEB', color: '#FF837C' },
    { bgColor: '#FFFADE', color: '#BAA226' },
  ];
  const userDetails = getUserDetails();
  const [rawActivities, setRawActivities] = useState();
  const [activities, setActivities] = useState();
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [countsLoading, setCountsLoading] = useState(false);
  const [mySubjects, setMySubjects] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState();
  const [activityCounts, setActivityCounts] = useState();
  const [academicData, setAcademicData] = useState([]);
  const [assessmentsAssignments, setAssessmentsAssignments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourcesUrls, setResourcesUrls] = useState([]);
  const [filteredResources, setFilteredResources] = useState(resources);
  const [forums, setForums] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [folders, setFolders] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [sessionProgressData, setSessionProgressData] = useState();
  const [activityProgressData, setActivityProgressData] = useState();
  const [toggle, setToggle] = useState(true);
  const [attendanceChartData, setAttendanceChartData] = useState();
  const [activityChartData, setActivityChartData] = useState();
  const history = useHistory();
  const [completedActivities, setCompletedActivities] = useState([]);
  const [incompleteActivities, setIncompleteActivities] = useState([]);
  const [completedAssessments, setPublishedAssessments] = useState([]);
  const [inCompleteAssessments, setUnPublishedAssessments] = useState([]);
  const [completedAssignments, setPublishedAssignments] = useState([]);
  const [inCompleteAssignments, setUnPublishedAssignments] = useState([]);
  const [
    filteredAssessmentsAssignments,
    setFilteredAssessmentsAssignments,
  ] = useState([]);
  // //4.get user courses - LMS
  // useEffect(() => {
  //   setCoursesLoading(true);
  //   console.log('userDetails', userDetails);
  //   const payload = {
  //     contactid: userDetails?.ContactId,
  //     method: 'post',
  //   };
  //   getUserCourses(payload)
  //     .then(res => {
  //       setCoursesLoading(false);
  //       console.log('getUserCourses res', res);
  //       if (!res.hasOwnProperty('errorcode')) {
  //         setMySubjects(res?.courses);
  //       }
  //     })
  //     .catch(err => {
  //       setCoursesLoading(false);
  //       console.log('err', err);
  //     });
  // }, []);


  //5.get user courses - LMS
  useEffect(() => {
    setCoursesLoading(true);
    console.log('userDetails', userDetails);
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    getFacultyCourses(payload)
      .then(res => {
        setCoursesLoading(false);
        console.log('getUserCourses res', res);
        if (!res.hasOwnProperty('errorcode')) {
          setMySubjects(res?.courses);
        }
      })
      .catch(err => {
        setCoursesLoading(false);
        console.log('err', err);
      });
  }, []);

  const StudentClick = () => {

    window.location.href = Routes?.acadamicContent;
  };

  //get 
  // const [data, setdata] = useState();
  // const ContactId = localStorage.getItem('userDetails');
  // useEffect(() => {

  //   getCourseContent(userDetails?.ContactId)
  //   .then(res => {
  //     setdata(res);
  //   })
  //   .catch(err => {
  //     setLoading(false);
  //   });
  // }, []);

  // console.log("data",data)
  //------------------------------------------ Activity Components -------------------------------------------------------------------------------

  const SessionComponent = () => {
    return (
      <DataCard title="Overview">
        <Grid container spacing={2} className={classes.scroll}>
          <Grid item xs={12} sm={12} md={6}>
            <SessionCard
              title="Sessions"
              icon={AccessTimeIcon}
              iconVariant="small"
              variant="purple"
              data={attendanceCounts || []}
              progressData={sessionProgressData}
              type="session"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SessionCard
              title="Activities"
              icon={EditIcon}
              iconVariant="small"
              variant="orange"
              progressData={activityProgressData}
              type="activity"
              data={activityCounts || []}
            />
          </Grid>
          {attendanceChartData && (
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} elevation={1}>
                <KenChart title="Sessions" data={attendanceChartData} />
              </Paper>
            </Grid>
          )}
          {activityChartData && (
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} elevation={1}>
                <KenChart title="Sessions" data={activityChartData} />
              </Paper>
            </Grid>
          )}
        </Grid>
      </DataCard>
    );
  };

  const goToDiscussionPage = data => {
    console.log('data in goToDiscussionPage', data);
    history.push({
      pathname: Routes?.discussion,
      state: {
        forumID: data?.forumid,
        heading: data?.forumname,
        forumSubject: data?.forumname,
        origin: 'lms-dashboard',
        status: '',
        lastDate: data?.modified,
        discussionId: data?.discussionid,
        ...data,
      },
    });
  };

  const ForumComponent = () => {
    return (
      <DataCard title={`Discussions (${discussions?.length})`}>
        <Grid container spacing={2} className={classes.scroll}>
          {discussions &&
            discussions?.map(item => {
              return (
                <Grid item xs={12} sm={12} md={12}>
                  <ForumCard
                    title={item?.subject}
                    status={item?.status === 'Unlocked' ? 'active' : 'inactive'}
                    dateTime={moment.unix(item?.created).format('LLL')}
                    numberOfResponses={10}
                    latestMessage={{
                      userName: `${item?.firstname} ${item?.lastname}`,
                      //   userPic: 'https://v4.mui.com/static/images/avatar/1.jpg',
                      text: item?.message,
                    }}
                    onActionClick={item => {
                      goToDiscussionPage(item);
                    }}
                    item={item}
                  />
                </Grid>
              );
            })}

          {/* <Grid item xs={12} sm={12} md={12}>
            <ForumCard
              title="Postpone DMS Assignment after Diwali"
              status="active"
              dateTime="12:33pm, 11 Mar 2022"
              numberOfResponses={10}
              latestMessage={{
                userName: 'Dushyant',
                userPic: 'https://v4.mui.com/static/images/avatar/2.jpg',
                text: 'Postpone DMS Assignment after Diwali',
              }}
            />
          </Grid> */}
        </Grid>
      </DataCard>
    );
  };

  const getActivityAction = obj => {
    console.log('obj in getActivityAction', obj);
    let action = '';

    if (obj?.type)
      if (obj?.type === 'assignment') {
        action = 'Submit';
        //   if (obj.status === 'Published') {
        //     action = 'Review';
        //   } else {
        //     action = 'Publish';
        //   }
      } else {
        action = 'Attempt';
        //   if (obj.status === 'Published') {
        //     action = 'Preview';
        //   } else {
        //     action = 'Publish';
        //   }
      }
    if (obj?.complitionstatus === 'Completed') {
      action = '';
    }
    return action;
  };

  const getActivityActionEvent = obj => {
    const action = getActivityAction(obj);
    let event;
    switch (action) {
      case 'Attempt':
        event = item => {
          window.open(
            `/instructions?id=${item?.id}&name=${item?.name}`,
            'mywindow',
            'fullscreen=yes,status=1,toolbar=0'
          );
        };
        break;
      case 'Submit':
        event = item => {
          history.push({
            pathname: '/assignment-submission',
            state: {
              cmid: Number(item?.id),
              title: item?.name,
            },
          });
        };
        break;

      default:
        break;
    }
    return event;
  };
  //   const ActivityComponent = () => {
  //     return (
  //       <DataCard title={`Activities (${assessmentsAssignments?.length})`}>
  //         <Grid container spacing={2} className={classes.scroll}>
  //           {assessmentsAssignments &&
  //             assessmentsAssignments?.map((item, index) => {
  //               console.log('item in activity', item);
  //               return (
  //                 <Grid item xs={12} sm={12} md={12}>
  //                   <Box
  //                     pb={2}
  //                     style={{ borderBottom: '1px solid #F4F5F7' }}
  //                     pl={2}
  //                     pr={2}
  //                   >
  //                     <ActivityCard
  //                       variant={item?.type}
  //                       primaryText={item?.name}
  //                       actionText={getActivityAction(item)}
  //                       handleAction={getActivityActionEvent(item)}
  //                       secondaryActionText={
  //                         item?.duedate
  //                           ? moment(item?.duedate).format('D MMM')
  //                           : item?.timeclose
  //                           ? moment(item?.timeclose).format('D MMM')
  //                           : ''
  //                       }
  //                       subjectName={item?.connectionData?.fullname}
  //                       className={'4th CSE - A'}
  //                       item={item}
  //                     />
  //                   </Box>
  //                 </Grid>
  //               );
  //             })}
  //         </Grid>
  //       </DataCard>
  //     );
  //   };

  const ActivityComponent = () => {
    const Panel = ({ data }) => {
      return (
        <Box className={classes.scrollPanel} pt={1}>
          {data &&
            data?.map((item, index) => {
              return (
                <Grid item xs={12} sm={12} md={12}>
                  <Box
                    style={{
                      borderBottom: '1px solid #F4F5F7',
                      padding: '0px 8px 8px 8px',
                    }}
                  >
                    <ActivityCard
                      item={item}
                      variant={item?.type}
                      primaryText={item?.name}
                      actionText={getActivityAction(item)}
                      handleAction={getActivityActionEvent(item)}
                      secondaryActionText={moment(item?.duedate).format(
                        'D MMM'
                      )}
                      subjectName={item?.connectionData?.fullname}
                      className={'4th CSE - A'}
                      userType={'Faculty'}
                    />
                  </Box>
                </Grid>
              );
            })}
        </Box>
      );
    };
    const tabData = [
      {
        title: (
          <Typography className={classes.tabTitle}>{`Completed (${completedActivities?.length
            })`}</Typography>
        ),
        content: <Panel data={completedActivities} />,
      },
      {
        title: (
          <Typography className={classes.tabTitle}>{`Not Completed (${incompleteActivities?.length
            })`}</Typography>
        ),
        content: <Panel data={incompleteActivities} />,
      },
    ];
    const dateFilterOptions = [
      { label: 'Today', value: 'today' },
      { label: '7 Days', value: '7d' },
      { label: '15 Days', value: '15d' },
      { label: '1 Month', value: '1m' },
      { label: '3 Months', value: '3m' },
      { label: '6 Months', value: '6m' },
      { label: 'All', value: 'all' },
    ];
    return (
      <DataCard
        title={`Activities`}
        childrenContainerStyle={{ paddingTop: '0px' }}
        action={
          <Box
            className={classes.viewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box pr={1}>
              <FiFilter style={{ fontSize: 'medium' }} />
            </Box>

            <SmallSelectBox
              label=""
              options={dateFilterOptions}
              value={dateFilterValue}
              onChange={handleDateChange}
            />
          </Box>
        }
      >
        {/* <Grid container spacing={2} style={{ maxHeight: '307px' }}> */}
        <KenTabs
          data={tabData}
          tabPanelProps={{
            style: { minHeight: '259px', position: 'relative', padding: '0px' },
            tabPanelBoxPadding: 1,
          }}
        />
        {/* </Grid> */}
      </DataCard>
    );
  };

  const ResourceComponent = () => {
    return (
      <DataCard
        title={`Resources (${filteredResources?.length})`}
        action={
          <Box
            className={classes.viewAll}
            onClick={() => {
              handleRFDialogOpen();
            }}
          >
            <FiFilter style={{ fontSize: 'medium', cursor: 'pointer' }} />
          </Box>
        }
      >
        <Grid container spacing={2} className={classes.scroll}>
          {filteredResources &&
            filteredResources?.map(item => {
              return (
                <Grid item xs={12} sm={12} md={12}>
                  <Box
                    // pb={2}
                    style={{
                      borderBottom: '1px solid #F4F5F7',
                      padding: '0px 8px 8px 8px',
                    }}
                  // pl={2}
                  // pr={2}
                  >
                    <ActivityCard
                      variant={item?.type}
                      primaryText={item?.name}
                      actionText={'Resume'}
                      subjectName={item?.connectionData?.fullname}
                      item={item}
                    //   className={'4th CSE - A'}
                    //   secondaryActionText={'12 Apr'}
                    />
                  </Box>
                </Grid>
              );
            })}

          {/* <Grid item xs={12} sm={12} md={12}>
            <Box
              pb={2}
              style={{ borderBottom: '1px solid #F4F5F7' }}
              pl={2}
              pr={2}
            >
              <ActivityCard
                variant={'ppt'}
                primaryText={'Chapter I'}
                actionText={'Resume'}
                subjectName={'Computer Science'}
                className={'4th CSE - A'}
                secondaryActionText={'20 Apr'}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              pb={2}
              style={{ borderBottom: '1px solid #F4F5F7' }}
              pl={2}
              pr={2}
            >
              <ActivityCard
                variant={'pdf'}
                primaryText={'Chapter I Notes'}
                actionText={'Resume'}
                subjectName={'Computer Science'}
                className={'4th CSE - A'}
                secondaryActionText={'30 Apr'}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              pb={2}
              style={{ borderBottom: '1px solid #F4F5F7' }}
              pl={2}
              pr={2}
            >
              <ActivityCard
                variant={'ppt'}
                primaryText={'Chapter II'}
                actionText={'Resume'}
                subjectName={'Computer Science'}
                className={'4th CSE - A'}
                secondaryActionText={'1 May'}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              pb={2}
              style={{ borderBottom: '1px solid #F4F5F7' }}
              pl={2}
              pr={2}
            >
              <ActivityCard
                variant={'video'}
                primaryText={'Lecture II'}
                actionText={'Resume'}
                subjectName={'Computer Science'}
                className={'4th CSE - A'}
                secondaryActionText={'17 Apr'}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              pb={2}
              style={{ borderBottom: '1px solid #F4F5F7' }}
              pl={2}
              pr={2}
            >
              <ActivityCard
                variant={'pdf'}
                primaryText={'Chapter II Notes'}
                actionText={'Resume'}
                subjectName={'Computer Science'}
                className={'4th CSE - A'}
                secondaryActionText={'22 Apr'}
              />
            </Box>
          </Grid> */}
        </Grid>
      </DataCard>
    );
  };

  const handleActionClick = item => {
    history.push({
      pathname: Routes?.acadamicContent,
      state: {
        courseOfferingId: item?.courseoffering,
        subject: item?.fullname,
      },
    });
  };

  const MyClassComponent = () => {
    return (
      <div style={{ height: '100%' }}>
        <DataCard title={`My Subjects (${mySubjects?.length})`}>
          <Grid container spacing={2} className={` ${classes.mySubjects}`}>
            {mySubjects &&
              mySubjects?.map((item, index) => {
                return (
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <img src={image1} style={{ width: "100%", height: "200px" }} />
                      <SubjectCard
                        userType={'Student'}
                        percentage={
                          (item?.activitiescompleted / item?.activitycount) *
                          100 || 0
                        }
                        subjectName={item?.fullname}
                        activityCount={item?.activitycount}
                        resourceCount={item?.resourcecount}
                        studentCount={item?.enrolcount}
                        className={item?.programname}
                        color={colors[index % colors.length]}
                        handleAction={handleActionClick}
                        item={item}
                      />
                    </Box>
                  </Grid>
                );
              })}

            {/* <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'40'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[1 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'50'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[2 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'60'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[3 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'70'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[4 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'80'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[5 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'90'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[6 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'55'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[7 % colors.length]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <SubjectCard
                userType={'Faculty'}
                percentage={'69'}
                subjectName={'Computer Science'}
                activityCount={'10'}
                resourceCount={'5'}
                studentCount={'19'}
                className="3rd CSE - B"
                color={colors[8 % colors.length]}
              />
            </Box>
          </Grid> */}
          </Grid>
        </DataCard>
      </div>
    );
  };

  const MyCoursesComponent = () => {
    return (
      <div style={{ height: '100%' }}>
        <DataCard title={`My Content (${mySubjects?.length})`}>
          <Grid container spacing={2} className={` ${classes.mySubjects}`}>
            {mySubjects &&
              mySubjects?.map((item, index) => {
                return (
                  <Grid item xs={12} sm={12} md={4}>
                    <Box onClick={StudentClick} style={{ cursor: "pointer" }}>
                      <img src={image1} style={{ width: "100%", height: "200px" }} />
                      <SubjectCard
                        userType={'Student'}
                        // percentage={
                        //   (item?.activitiescompleted / item?.activitycount) *
                        //   100 || 0
                        // }
                        subjectName="Grade 6"
                        // activityCount={item?.activitycount}
                        // resourceCount={item?.resourcecount}
                        // studentCount={item?.enrolcount}
                        // className={item?.programname}
                        color={colors[index % colors.length]}
                        handleAction={handleActionClick}
                        // item={item}
                      />
                    </Box>
                  </Grid>
                );
              })}
            {/* <Grid item xs={12} sm={12} md={4}>
              <Box onClick={StudentClick} style={{ cursor: "pointer" }}>
                <img src={image2} style={{ width: "100%", height: "200px" }} />

                <SubjectCard
                  userType={'Faculty'}
                  percentage={'50'}
                  subjectName={'Grade 3'}
                  activityCount={'10'}
                  resourceCount={'5'}
                  studentCount={'19'}
                  className="Grade 3"
                  color={colors[2 % colors.length]}
                />
              </Box>
            </Grid> */}

          </Grid>
        </DataCard>
      </div>
    );
  };

  return (
    <>
      {(loading || countsLoading || coursesLoading) && <KenLoader />}
      <Box minHeight="100%">
        <Grid>
          <MyCoursesComponent />
        </Grid>
      </Box>
    </>
  );
}
