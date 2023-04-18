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
  getLatestForums,
  getUserActivitiesCount,
  getUserCourses,
  StudentActivities,
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
  const [attendanceCounts, setAttendanceCounts] = useState();
  const [activityCounts, setActivityCounts] = useState();
  const [mySubjects, setMySubjects] = useState([]);
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

  const [openResourceFilterDialog, setOpenResourceFilterDialog] = useState(
    false
  );
  const [originalResourceFilterData, setOriginalResourceFilterData] = useState(
    []
  );

  const [resourceFilterData, setResourceFilterData] = useState([]);
  const [resourceFilteredData, setResourceFilteredData] = useState([]);
  const [dateFilterValue, setDateFilterValue] = useState('7d');
  const [publishedActivities, setPublishedActivities] = useState([]);
  const [unPublishedActivities, setUnPublishedActivities] = useState([]);

  useEffect(() => {
    console.log('openResourceFilterDialog value', openResourceFilterDialog);
  }, [openResourceFilterDialog]);

  //Dialog methods
  const handleRFDialogOpen = () => {
    setOpenResourceFilterDialog(true);
  };

  const handleRFDialogClose = () => {
    setOpenResourceFilterDialog(false);
  };

  //1. Get student activities
  useEffect(() => {
    StudentActivities(
      userDetails?.ContactId,
      'connectionID',
      'startDate',
      'endDate'
    ).then(response => {
      if (response?.status === 'Success') {
        console.log('response?.courses', response?.courses);
        setRawActivities(response?.courses || []);
      }
      return [];
    });
  }, []);

  //2. process raw activities to add course-connection specific data to an activity
  useEffect(() => {
    if (rawActivities) {
      console.log('raw activities', rawActivities);
      let flatArray = rawActivities.reduce((acc, curVal) => {
        return acc.concat(curVal);
      }, []);
      console.log('flatArray', flatArray);
      const arrWithClassData = flatArray.map(object => {
        let activitiesObj = {};
        let eachActivities = [];
        if (object.hasOwnProperty('activities')) {
          if (Object.keys(object?.activities).length !== 0) {
            const allActivities = object?.activities;
            for (const key in allActivities) {
              console.log(`${key}: ${allActivities[key]}`);

              if (Array.isArray(allActivities[key])) {
                eachActivities = allActivities[key]?.map((item, ind) => {
                  let obj = {
                    ...item,
                    connectionData: object,
                  };
                  delete obj['connectionData'].activities;
                  return obj;
                });
                activitiesObj[key] = eachActivities;
              } else {
                return allActivities[key];
              }
            }
          }
        }

        return { ...object, activities: activitiesObj };
      });

      console.log('arrWithClassData', arrWithClassData);
      setActivities(arrWithClassData);
    }
  }, [rawActivities]);

  //3. Separate activities by types (quiz, assignments,resources etc)
  useEffect(() => {
    if (activities) {
      const obj = {
        assessments: [],
        assignments: [],
        resources: [],
        forums: [],
        lessons: [],
        urls: [],
        folders: [],
      };
      activities?.map(item => {
        for (const key in item?.activities) {
          console.log(`${key}: ${item?.activities[key]}`);
          switch (key) {
            case 'quizzes':
              if (Array.isArray(item?.activities[key])) {
                obj['assessments'] = [
                  ...obj['assessments'],
                  ...item?.activities[key],
                ];
              }
              break;

            case 'assignment':
              if (Array.isArray(item?.activities[key])) {
                obj['assignments'] = [
                  ...obj['assignments'],
                  ...item?.activities[key],
                ];
              }
              break;

            case 'resources':
              if (Array.isArray(item?.activities[key])) {
                obj['resources'] = [
                  ...obj['resources'],
                  ...item?.activities[key],
                ];
              }
              break;

            case 'forum':
              if (Array.isArray(item?.activities[key])) {
                obj['forums'] = [...obj['forums'], ...item?.activities[key]];
              }
              break;

            case 'folders':
              if (Array.isArray(item?.activities[key])) {
                obj['folders'] = [...obj['folders'], ...item?.activities[key]];
              }
              break;

            case 'lesson':
              if (Array.isArray(item?.activities[key])) {
                obj['lessons'] = [...obj['lessons'], ...item?.activities[key]];
              }
              break;

            case 'urls':
              if (Array.isArray(item?.activities[key])) {
                obj['urls'] = [...obj['urls'], ...item?.activities[key]];
              }
              break;

            default:
              break;
          }
        }
      });
      console.log('data obj', obj);
      setAcademicData(obj);

      //add type to assessments & assignments
      const assessmentsWithType = obj['assessments']
        ? obj['assessments']?.map(item => {
            return {
              ...item,
              type: 'assessment',
            };
          })
        : [];

      const assignmentsWithType = obj['assignments']
        ? obj['assignments']?.map(item => {
            return {
              ...item,
              type: 'assignment',
            };
          })
        : [];

      //show activities - quizzes and assignments together
      const assignmentsAssessments = [
        ...assessmentsWithType,
        ...assignmentsWithType,
      ];

      //add similar key value in both type of activities
      const assignmentsAssessmentsWithDueDate = assignmentsAssessments?.map(
        el => {
          console.log(' al', el);
          console.log(
            " el.hasOwnProperty('duedate')",
            el.hasOwnProperty('duedate')
          );
          console.log(' el.timeclose', el.timeclose);
          console.log(' el.duedate', el.duedate);
          return {
            ...el,
            duedate: el.hasOwnProperty('duedate')
              ? moment.unix(el.duedate)
              : moment.unix(el.timeclose),
          };
        }
      );

      setAssessmentsAssignments(
        assignmentsAssessmentsWithDueDate?.sort(function(a, b) {
          return moment.unix(a.duedate) - moment.unix(b.duedate);
        })
      );
      setFilteredAssessmentsAssignments(
        assignmentsAssessmentsWithDueDate?.sort(function(a, b) {
          return moment.unix(a.duedate) - moment.unix(b.duedate);
        })
      );

      //filter pending and completed activities
      const pending = assignmentsAssessments?.filter(
        item => item?.complitionstatus === 'Not Completed'
      );
      const completed = assignmentsAssessments?.filter(
        item => item?.complitionstatus === 'Completed'
      );
      setCompletedActivities(completed);
      setIncompleteActivities(pending);

      //   //filter published and unPublished assignments-assessments
      //   const completedAssessments = assignmentsAssessments?.filter(
      //     item =>
      //       item?.complitionstatus == 'Completed' && item?.type === 'assessment'
      //   );
      //   const inCompleteAssessments = assignmentsAssessments?.filter(
      //     item =>
      //       item?.complitionstatus === 'Not Completed' &&
      //       item?.type === 'assessment'
      //   );
      //   setPublishedAssessments(completedAssessments);
      //   setUnPublishedAssessments(inCompleteAssessments);

      //   const completedAssignments = assignmentsAssessments?.filter(
      //     item =>
      //       item?.complitionstatus === 'Not Completed' &&
      //       item?.type === 'assignment'
      //   );
      //   const inCompleteAssignments = assignmentsAssessments?.filter(
      //     item =>
      //       item?.complitionstatus === 'Completed' && item?.type === 'assignment'
      //   );
      //   setPublishedAssignments(completedAssignments);
      //   setUnPublishedAssignments(inCompleteAssignments);

      // add variants to resources
      const resourcesWithVariants = obj['resources']?.map(item => {
        let object = { ...item };
        switch (item?.filetype) {
          case 'application/pdf':
            object['type'] = 'pdf';

            break;
          case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          case 'application/vnd.ms-powerpoint':
            object['type'] = 'ppt';
            break;

          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          case 'application/vnd.ms-excel':
            object['type'] = 'excel';

            break;
          case 'video/mp4':
            object['type'] = 'video';

            break;
          case 'text/csv':
            object['type'] = 'text';
            break;

          default:
            object['type'] = 'unknown';
            break;
        }
        return object;
      });

      const urlsWithVariants = obj['urls']?.map(item => {
        let object = { ...item };
        object['type'] = 'url';
        return object;
      });

      setAssessments(obj['assessments']);
      setAssignments(obj['assignments']);
      setResources(resourcesWithVariants);
      //   setFilteredResources(resourcesWithVariants);
      setForums(obj['forums']);
      setFolders(obj['folders']);
      setLessons(obj['lessons']);
      setURLs(obj['urls']);
      const resourcesUrlsArray = [
        ...resourcesWithVariants,
        ...urlsWithVariants,
      ];
      setResourcesUrls(resourcesUrlsArray);
      setFilteredResources(resourcesUrlsArray);
    }
  }, [activities]);

  //4.get user courses - LMS
  useEffect(() => {
    setCoursesLoading(true);
    console.log('userDetails', userDetails);
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    getUserCourses(payload)
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

  //6.get session/attendance attendanceCounts
  useEffect(() => {
    setCountsLoading(true);
    getContactAttendanceCount(userDetails?.ContactId)
      .then(res => {
        setCountsLoading(false);
        console.log('getContactAttendanceCount res', res);
        if (!res.hasOwnProperty('errorcode')) {
          console.log('res?.Data?.total', res?.data?.total);
          const array = [
            {
              label: 'conducted',
              value: res?.data?.conducted,
              color: 'medium',
            },
            {
              label: 'attended',
              value: res?.data?.totalAttendance,
              color: 'dark',
            },
          ];
          const datasets = {
            labels: ['Attended', 'Conducted'],
            datasets: [
              {
                label: 'Attendance',
                backgroundColor: ['#704FE1', '#BDA9FE'],
                hoverBackgroundColor: ['#fff6ef', '#fff6ef'],
                data: [res?.data?.totalAttendance, res?.data?.conducted],
              },
            ],
          };
          setAttendanceChartData(datasets);
          setSessionProgressData(
            (res?.data?.totalAttendance / res?.data?.conducted) * 100 || 0
          );
          setAttendanceCounts(array);
        }
      })
      .catch(err => {
        setCountsLoading(false);
        console.log('err', err);
      });
  }, []);

  //7. get faculty activities count
  useEffect(() => {
    const payload = {
      method: 'post',
      contactid: userDetails?.ContactId,
    };
    getUserActivitiesCount(payload)
      .then(res => {
        console.log('res', res);
        setActivityProgressData(
          (res?.completed / res?.activitycount) * 100 || 0
        );

        const data = [
          {
            label: 'total',
            value: res?.activitycount,
            color: 'medium',
          },
          {
            label: 'completed',
            value: res?.completed,
            color: 'dark',
          },
        ];
        setActivityCounts(data);
        setActivityChartData({
          labels: ['Completed', 'Total'],
          datasets: [
            {
              label: 'Activities',
              backgroundColor: ['#FF9D54', '#FFD2B0'],
              hoverBackgroundColor: ['#fff6ef', '#fff6ef'],
              data: [res?.completed, res?.activitycount],
            },
          ],
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  //8. get latest forum discussion
  // useEffect(() => {
  //   const payload = {
  //     contactid: userDetails.ContactId,
  //     method: 'post',
  //   };
  //   getLatestForums(payload)
  //     .then(res => {
  //       // console.log('res', res);
  //       setDiscussions(res);
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //     });
  // }, []);

  //9. get resource filter data
  useEffect(() => {
    if (resourcesUrls?.length > 0) {
      const filterTypeData = uniqueArrayObjects(resourcesUrls, 'type') || [];
      const filterCourseData =
        uniqueArrayObjects(resourcesUrls, 'connectionData["shortname"]') || [];
      const filterStatusData =
        uniqueArrayObjects(resourcesUrls, 'status') || [];
      const types = filterTypeData?.map(item => {
        return {
          label: item?.type?.toUpperCase(),
          value: item?.type,
        };
      });
      const courses = filterCourseData?.map(item => {
        return {
          label: item?.connectionData?.shortname,
          value: item?.connectionData?.shortname,
        };
      });
      const status = filterStatusData?.map(item => {
        return {
          label: item?.status,
          value: item?.status,
        };
      });
      const filterRawData = [
        {
          id: 0,
          label: 'Types',
          options: types,
          type: 'checkbox',
          value: [],
          open: false,
        },
        // {
        //   id: 1,
        //   label: 'Statuses',
        //   options: status,
        //   type: 'checkbox',
        //   value: [],
        //   open: false,
        // },
        {
          id: 2,
          label: 'Courses',
          options: courses,
          type: 'checkbox',
          value: [],
          open: false,
        },
      ];
      console.log('filterRawData', filterRawData);
      setResourceFilterData(filterRawData);
      setOriginalResourceFilterData(filterRawData);
    }
  }, [resourcesUrls]);

  //10. Filter publish & unpublish activities by duedate
  useEffect(() => {
    //filter published and unPublished activities
    const completed = filteredAssessmentsAssignments?.filter(
      item => item?.complitionstatus === 'Completed'
    );
    const inCompleted = filteredAssessmentsAssignments?.filter(
      item => item?.complitionstatus === 'Not Completed'
    );
    setCompletedActivities(completed);
    setIncompleteActivities(inCompleted);
  }, [filteredAssessmentsAssignments]);

  //11. Apply duedate filter when date dropdown value changed
  useEffect(() => {
    if (dateFilterValue) {
      let result = [];
      switch (dateFilterValue) {
        case 'today':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            return d2.isSame(d1, 'day');
            // if (moment(d2).isBefore(d1)) {
            //   const diff = moment(d1).diff(d2, 'days');
            //   return diff === 0;
            // } else {
            //   return false;
            // }
          });
          console.log('result', result);
          break;

        case '7d':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            if (moment(d2).isBefore(d1)) {
              const diff = moment(d1).diff(d2, 'days');
              return diff <= 7;
            } else {
              return false;
            }
          });
          break;

        case '15d':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            if (moment(d2).isBefore(d1)) {
              const diff = moment(d1).diff(d2, 'days');
              return diff <= 15;
            } else {
              return false;
            }
          });
          break;

        case '1m':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            if (moment(d2).isBefore(d1)) {
              const diff = moment(d1).diff(d2, 'days');
              return diff <= 30;
            } else {
              return false;
            }
          });
          break;

        case '3m':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            if (moment(d2).isBefore(d1)) {
              const diff = moment(d1).diff(d2, 'months');
              return diff < 3;
            } else {
              return false;
            }
          });
          break;

        case '6m':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            if (moment(d2).isBefore(d1)) {
              const diff = moment(d1).diff(d2, 'months');
              return diff < 6;
            } else {
              return false;
            }
          });
          break;

        case 'all':
        default:
          result = assessmentsAssignments?.sort(function(a, b) {
            return moment.unix(a.duedate) - moment.unix(b.duedate);
          });
          break;
      }
      setFilteredAssessmentsAssignments(result);
    }
  }, [dateFilterValue, assessmentsAssignments]);

  
  //  userDetails.Type === 'Faculty'
  // console.log(userDetails.Type)
  // academicContent
  const StudentClick = () => {
   
    window.location.href = Routes?.subjectContentStudent;
  };
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
          <Typography className={classes.tabTitle}>{`Completed (${
            completedActivities?.length
          })`}</Typography>
        ),
        content: <Panel data={completedActivities} />,
      },
      {
        title: (
          <Typography className={classes.tabTitle}>{`Not Completed (${
            incompleteActivities?.length
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
      pathname: Routes?.subjectContentStudent,
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
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

            <Grid item xs={12} sm={12} md={4}>
        
              <Box onClick={StudentClick} style={{cursor:"pointer"}}>
              <img src={image1} style={{width:"100%",height:"200px"}}/>
                <SubjectCard
                  userType={'Faculty'}
                  percentage={'40'}
                  subjectName={'Grade 2'}
                  activityCount={'10'}
                  resourceCount={'5'}
                  studentCount={'19'}
                  className="3rd CSE - B"
                  color={colors[1 % colors.length]}
                />
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4}>
              <Box onClick={StudentClick} style={{cursor:"pointer"}}>
              <img src={image2} style={{width:"100%",height:"200px"}}/>

                <SubjectCard
                  userType={'Faculty'}
                  percentage={'50'}
                  subjectName={'Life Skills'}
                  activityCount={'10'}
                  resourceCount={'5'}
                  studentCount={'19'}
                  className="3rd CSE - B"
                  color={colors[2 % colors.length]}
                />
              </Box>
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={4}>
              <Box onClick={StudentClick} style={{cursor:"pointer"}}>
              <img src={image3} style={{width:"100%",height:"200px"}}/>

                <SubjectCard
                  userType={'Faculty'}
                  percentage={'60'}
                  subjectName={'Social Skills'}
                  activityCount={'10'}
                  resourceCount={'5'}
                  studentCount={'19'}
                  className="3rd CSE - B"
                  color={colors[3 % colors.length]}
                />
              </Box>
            </Grid> */}
          </Grid>
        </DataCard>
      </div>
    );
  };
  //----------------------------------------------------------------------------------------------------------------
  const getFilteredData = data => {
    setResourceFilteredData(data);
  };
  const applyResourceFilter = () => {
    const fData = resourceFilteredData || [];
    const fRData = resourcesUrls || [];
    let typesData = [];
    let statusData = [];
    let courseData = [];
    const isAnyFilterApplied = fData.some(el => el.value?.length > 0);
    if (isAnyFilterApplied) {
      const filtered = fData?.map(item => {
        if (item?.label === 'Types') {
          if (item?.value?.length === 0) {
            typesData = fRData;
          } else {
            item?.value?.map(elem => {
              fRData?.map(el => {
                if (elem === el?.type) {
                  let found = false;
                  if (typesData.some(element => element?.id === el?.id)) {
                    found = true;
                  }

                  if (!found) {
                    typesData.push(el);
                  }
                }
              });
            });
          }
        } else if (item?.label === 'Statuses') {
          if (item?.value?.length === 0) {
            statusData = typesData;
          } else {
            item?.value?.map(elem => {
              typesData?.map(el => {
                if (elem === el?.status) {
                  let found = false;
                  if (statusData.some(element => element?.id === el?.id)) {
                    found = true;
                  }

                  if (!found) {
                    statusData.push(el);
                  }
                }
              });
            });
            if (statusData?.length === 0) {
              statusData = typesData;
            }
          }
        } else {
          if (item?.value?.length === 0) {
            courseData = statusData;
          } else {
            item?.value?.map(elem => {
              statusData?.map(el => {
                if (elem === el?.status) {
                  let found = false;
                  if (courseData.some(element => element?.id === el?.id)) {
                    found = true;
                  }

                  if (!found) {
                    courseData.push(el);
                  }
                }
              });
            });
            if (courseData?.length === 0) {
              courseData = statusData;
            }
          }
        }
      });
      //   console.log('types', typesData);
      //   console.log('status', statusData);
      //   console.log('course', courseData);

      setFilteredResources(courseData);
      setResourceFilterData(resourceFilteredData);
    } else {
      setFilteredResources(resourcesUrls);
      setResourceFilterData(originalResourceFilterData);
    }
    handleRFDialogClose();
  };
  const clearResourceFilter = () => {
    handleRFDialogClose();
    setFilteredResources(resourcesUrls);
    setResourceFilterData(originalResourceFilterData);
  };

  const handleDateChange = e => {
    setDateFilterValue(e?.target?.value);
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
