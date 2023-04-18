import React, { useEffect, useState } from 'react';
import { Grid, Box, List, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DataCard from '../components/dataCard';
import SessionCard from '../components/sessionCard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import ActivityCard from '../components/activityCard';
import SubjectCard from '../components/subjectCard';
import ForumCard from '../components/forumCard';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import {
  facultyActivities,
  getCourses,
  getFacultyActivitiesCount,
  getFacultyAttendanceCount,
  getFacultyCourses,
  getLatestForums,
  publishUnpublishLMSModule,
} from '../../../utils/ApiService';
import KenLoader from '../../../components/KenLoader';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes.json';
import KenChart from '../../../global_components/KenChart';
import KenIcon from '../../../global_components/KenIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KenTabs from '../../../components/KenTabs';
import { FiFilter } from 'react-icons/fi';
import FilterComponent from '../components/filterComponent';
import ResourceFilterContent from '../components/resourceFilterContent';
import { uniqueArrayObjects } from '../../Assessment/QuestionPage/Components/QuestionTypes/Utils';
import KenSelect from '../../../global_components/KenSelect';
import SmallSelectBox from '../components/smallSelectBox';

const useStyles = makeStyles(theme => ({
  scroll: {
    maxHeight: '307px',
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
  mySubjects: {
    maxHeight: '686px',
    minHeight: '307px',
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
  paper: {
    padding: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    height: '100%',
  },
  viewAll: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#00218D',
    // cursor: 'pointer',
    paddingRight: '4px',
  },
  tabTitle: {
    fontSize: '14px',
    textTransform: 'capitalize',
    color: '#2862FF',
    textAlign: 'left',
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
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [countsLoading, setCountsLoading] = useState(false);
  const [attendanceCounts, setAttendanceCounts] = useState();
  const [activityCounts, setActivityCounts] = useState();
  const [rawActivities, setRawActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [mySubjects, setMySubjects] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [assessmentsAssignments, setAssessmentsAssignments] = useState([]);
  const [
    filteredAssessmentsAssignments,
    setFilteredAssessmentsAssignments,
  ] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourcesUrls, setResourcesUrls] = useState([]);
  const [filteredResources, setFilteredResources] = useState(resources);
  const [forums, setForums] = useState([]);
  const [folders, setFolders] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [sessionProgressData, setSessionProgressData] = useState();
  const [activityProgressData, setActivityProgressData] = useState();
  const [toggle, setToggle] = useState(true);
  const [activityChartData, setActivityChartData] = useState();
  const [sessionChartData, setSessionChartData] = useState();
  const history = useHistory();
  const [publishedActivities, setPublishedActivities] = useState([]);
  const [unPublishedActivities, setUnPublishedActivities] = useState([]);
  const [publishedAssessments, setPublishedAssessments] = useState([]);
  const [unPublishedAssessments, setUnPublishedAssessments] = useState([]);
  const [publishedAssignments, setPublishedAssignments] = useState([]);
  const [unPublishedAssignments, setUnPublishedAssignments] = useState([]);
  const [openResourceFilterDialog, setOpenResourceFilterDialog] = useState(
    false
  );
  const [resourceFilterData, setResourceFilterData] = useState([]);
  const [originalResourceFilterData, setOriginalResourceFilterData] = useState(
    []
  );
  const [resourceFilteredData, setResourceFilteredData] = useState([]);
  const [dateFilterValue, setDateFilterValue] = useState('7d');

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

  //1. get courses
  useEffect(() => {
    console.log('userDetails', userDetails);
    setLoading(true);
    getCourses(userDetails?.ContactId)
      .then(res => {
        if (!res.hasOwnProperty('errorcode')) {
          // get unique courses
          let flags = [];
          const output = [];
          const l = res.length;
          let i;
          for (i = 0; i < l; i++) {
            if (flags[res[i].CourseOfferingID]) continue;
            flags[res[i].CourseOfferingID] = true;
            output.push(res[i]);
          }

          activitiesByCourse(output);
        }
        setLoading(false);
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
  }, []);

  //2. get all activities for each course

  const activitiesByCourse = data => {
    const promises = data.map(item => {
      const contactID = userDetails?.ContactId;
      const connectionID = item?.Id || '';
      const startDate = '';
      const endDate = '';

      return facultyActivities(
        contactID,
        connectionID,
        startDate,
        endDate
      ).then(response => {
        if (response?.status === 'Success') {
          return response?.courses;
        }
        return [];
      });
    });

    Promise.all(promises).then(results => {
      console.log('results', results);
      const updatedRes = results.filter(item => item?.length > 0);
      setRawActivities(updatedRes);
    });
  };

  //3. process raw activities to add course-connection specific data to an activity
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

  //4. Separate activities by types (quiz, assignments,resources etc)
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
      //   console.log('data obj', obj);
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
      //   setFilteredAssessmentsAssignments(
      //     assignmentsAssessmentsWithDueDate?.sort(function(a, b) {
      //       return moment.unix(a.duedate) - moment.unix(b.duedate);
      //     })
      //   );

      //filter published and unPublished activities
      const published = assignmentsAssessments?.filter(
        item => item?.status === 'Published'
      );
      const unPublished = assignmentsAssessments?.filter(
        item => item?.status === 'Unpublished'
      );
      setPublishedActivities(published);
      setUnPublishedActivities(unPublished);

      //filter published and unPublished assignments-assessments
      const publishedAssessments = assignmentsAssessments?.filter(
        item => item?.status === 'Published' && item?.type === 'assessment'
      );
      const unPublishedAssessments = assignmentsAssessments?.filter(
        item => item?.status === 'Unpublished' && item?.type === 'assessment'
      );
      setPublishedAssessments(publishedAssessments);
      setUnPublishedAssessments(unPublishedAssessments);

      //   const publishedAssignments = assignmentsAssessments?.filter(
      //     item => item?.status === 'Unpublished' && item?.type === 'assignment'
      //   );
      //   const unPublishedAssignments = assignmentsAssessments?.filter(
      //     item => item?.status === 'Published' && item?.type === 'assignment'
      //   );
      //   setPublishedAssignments(publishedAssignments);
      //   setUnPublishedAssignments(unPublishedAssignments);

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

          // case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          //   object['type'] = 'word';

          //   break;
          case 'video/mp4':
            object['type'] = 'video';
            break;

          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          case 'application/vnd.ms-excel':
            object['type'] = 'excel';

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

  //6.get session/attendance attendanceCounts
  useEffect(() => {
    setCountsLoading(true);
    getFacultyAttendanceCount(userDetails?.ContactId)
      .then(res => {
        setCountsLoading(false);
        console.log('getFacultyAttendanceCount res', res);
        if (!res.hasOwnProperty('errorcode')) {
          console.log('res?.Data?.total', res?.data?.total);
          const array = [
            {
              label: 'total',
              value: res?.data?.total,
              color: 'medium',
            },
            {
              label: 'conducted',
              value: res?.data?.conducted,
              color: 'dark',
            },
          ];
          setSessionProgressData(
            (res?.data?.conducted / res?.data?.total) * 100 || 0
          );
          setAttendanceCounts(array);
          setSessionChartData({
            labels: ['Conducted', 'Yet to be Conducted'],
            datasets: [
              {
                label: 'Sessions',
                backgroundColor: ['#704FE1', '#BDA9FE'],
                hoverBackgroundColor: ['#fff6ef', '#fff6ef'],
                data: [
                  res?.data?.conducted,
                  res?.data?.total - res?.data?.conducted >= 0
                    ? res?.data?.total - res?.data?.conducted
                    : 0,
                ],
              },
            ],
          });
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
    getFacultyActivitiesCount(payload)
      .then(res => {
        console.log('res', res);
        setActivityProgressData(
          (res?.activities_published_count / res?.total) * 100 || 0
        );

        const data = [
          {
            label: 'total',
            value: res?.total_activities_count,
            color: 'light',
          },
          {
            label: 'unpublished',
            value: res?.activities_unpublished_count,
            color: 'medium',
          },
          {
            label: 'published',
            value: res?.activities_published_count,
            color: 'dark',
          },
        ];
        setActivityCounts(data);
        setActivityChartData({
          labels: ['Published', 'Unpublished'],
          datasets: [
            {
              label: 'Activities',
              backgroundColor: ['#FF9D54', '#FFD2B0', '#fff6ef'],
              hoverBackgroundColor: ['#fff6ef', '#fff6ef'],
              data: [
                res?.activities_published_count,
                res?.activities_unpublished_count,
              ],
            },
          ],
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  //8. get latest forum discussion
  useEffect(() => {
    const payload = {
      contactid: userDetails.ContactId,
      method: 'post',
    };
    getLatestForums(payload)
      .then(res => {
        // console.log('res', res);
        setDiscussions(res);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);

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
        {
          id: 1,
          label: 'Statuses',
          options: status,
          type: 'checkbox',
          value: [],
          open: false,
        },
        {
          id: 2,
          label: 'Courses',
          options: courses,
          type: 'checkbox',
          value: [],
          open: false,
        },
      ];
      //   console.log('filterRawData', filterRawData);
      setResourceFilterData(filterRawData);
      setOriginalResourceFilterData(filterRawData);
    }
  }, [resourcesUrls]);

  //10. Filter publish & unpublish activities by duedate
  useEffect(() => {
    //filter published and unPublished activities
    const published = filteredAssessmentsAssignments?.filter(
      item => item?.status === 'Published'
    );
    const unPublished = filteredAssessmentsAssignments?.filter(
      item => item?.status === 'Unpublished'
    );
    setPublishedActivities(published);
    setUnPublishedActivities(unPublished);
  }, [filteredAssessmentsAssignments]);

  //11. Apply duedate filter when date dropdown value changed
  useEffect(() => {
    console.log('assessmentsAssignments', assessmentsAssignments.length);
    if (dateFilterValue) {
      let result = [];
      switch (dateFilterValue) {
        case 'today':
          result = assessmentsAssignments?.filter(item => {
            const d1 = moment(item.duedate);
            const d2 = moment();
            return d2.isSame(d1, 'day');
            // if (moment(d2).isBefore(d1)) {
            //   return d2.isSame(d1, 'day');

            //   //   const diff = moment(d1).diff(d2, 'days');
            //   //   return diff === 0;
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
  //------------------------------------------ Activity Components -------------------------------------------------------------------------------

  const SessionComponent = () => {
    return (
      <DataCard title="Overview">
        <Grid container spacing={2} className={classes.scroll}>
          {sessionProgressData != undefined && attendanceCounts != undefined && (
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
          )}
          {activityProgressData != undefined && activityCounts != undefined && (
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
          )}
          {sessionChartData && (
            <Grid item xs={12} sm={12} md={6}>
              {/* <SessionCard
                title="Sessions"
                icon={AccessTimeIcon}
                iconVariant="small"
                variant="purple"
                data={attendanceCounts || []}
                progressData={sessionProgressData}
                type="session"
                sessionChartData={sessionChartData}
                chart={true}
              /> */}
              <Paper className={classes.paper} elevation={1}>
                <Typography />
                <KenChart title="Sessions" data={sessionChartData} />
              </Paper>
            </Grid>
          )}
          {activityChartData && (
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} elevation={1}>
                <Typography />
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
      <DataCard
        title={`Discussions (${discussions?.length})`}
        // action={
        //   <Box>
        //     <Typography
        //       onClick={goToDiscussionPage}
        //       className={classes.viewAll}
        //       component="span"
        //     >
        //       View All
        //     </Typography>
        //     <KenIcon icon={ArrowForwardIcon} iconType="icon" variant="small" />
        //   </Box>
        // }
      >
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
    let action = '';
    console.log('obj getActivityAction', obj);
    if (obj?.type === 'assignment') {
      if (obj?.status === 'Unpublished') {
        action = 'Edit';
      } else {
        action = 'Review';
      }

      //   if (obj.status === 'Published') {
      //     action = 'Review';
      //   } else {
      //     action = 'Publish';
      //   }
    } else {
      action = 'Preview';
    }
    return action;
  };

  const getActivityActionEvent = obj => {
    const action = getActivityAction(obj);
    console.log('action for obj', action);
    console.log('obj', obj);
    let event;
    switch (action) {
      case 'Review':
        event = item => {
          history.push({
            pathname: Routes?.assignmentReview,
            state: {
              quizId: item.id,
              submissionHeading: '',
            },
          });
        };
        break;

      case 'Edit':
        event = item => {
          history.push({
            pathname: `/assignment/${item?.id}`,
            state: {
              assignmentId: item?.id,
              assignmentName: item?.name,
              origin: 'lms-dashboard',
              status:
                item?.status === 'Published' ? 'published' : 'unpublished',
              operation: 'update',
            },
          });
        };
        break;
      case 'Preview':
        event = item => {
          history.push({
            pathname: Routes?.assessmentPreview,
            state: {
              data: {
                cmid: item?.id,
                status: item?.status,
                date: '02-04-2021,10:30 AM',
                origin: 'lms-dashboard',
              },
            },
          });
        };
        break;

      case 'Closed':
        event = item => {
          history.push({
            pathname: Routes?.assessmentPreview,
            state: {
              data: {
                cmid: item?.id,
                status: item?.status,
                date: '02-04-2021,10:30 AM',
                origin: 'lms-dashboard',
              },
            },
          });
        };
        break;

      case 'Publish':
        event = item => {
          //   setLoading(true);
          //   const payload = {
          //     method: 'post',
          //     quizid: item?.id,
          //     publish: 1,
          //   };
          //   publishUnpublishLMSModule(payload)
          //     .then(res => {
          //       setLoading(false);
          //       setToggle(!toggle);
          //       console.log('res', res);
          //     })
          //     .catch(err => {
          //       setLoading(false);
          //       console.log('err', err);
          //     });
        };

        break;

      default:
        break;
    }
    return event;
  };

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
          <Typography className={classes.tabTitle}>{`Published (${
            publishedActivities?.length
          })`}</Typography>
        ),
        content: <Panel data={publishedActivities} />,
      },
      {
        title: (
          <Typography className={classes.tabTitle}>{`Unpublished (${
            unPublishedActivities?.length
          })`}</Typography>
        ),
        content: <Panel data={unPublishedActivities} />,
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
        // title={`Activities (${assessmentsAssignments?.length})`}
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

  //   const handleActionClick = item => {
  //     history.push({
  //       pathname: Routes?.acadamicContent,
  //       state: {
  //         courseOfferingId: item?.courseoffering,
  //       },
  //     });
  //   };

  const handleActionClick = item => {
    history.push({
      pathname: Routes?.subjectContentFaculty,
      state: {
        courseOfferingId: item?.courseoffering,
        subject: item?.fullname,
      },
    });
  };

  const MyClassComponent = () => {
    return (
      <DataCard title={`My Content (${mySubjects?.length})`}>
        <Grid container spacing={2} className={` ${classes.mySubjects}`}>
          {mySubjects &&
            mySubjects?.map((item, index) => {
              return (
                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <SubjectCard
                      userType={'Faculty'}
                      percentage={item?.completionpercentage}
                      subjectName={item?.fullname}
                      activityCount={item?.activitycount}
                      resourceCount={item?.resourcecount}
                      studentCount={item?.enrolcount}
                      className={`${item.programname}-${item?.section}`}
                      color={colors[index % colors.length]}
                      handleAction={handleActionClick}
                      section={item?.section}
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
    );
  };

  //---------------------------------------------------------------------------

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

  const handleDateChange = (e, val) => {
    console.log('e', e?.target?.value);
    console.log('val', val);
    setDateFilterValue(e?.target?.value);
  };

  return (
    <>
      {(loading || countsLoading || coursesLoading) && <KenLoader />}
      <Box minHeight="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <SessionComponent />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <ActivityComponent />
              {/* <ActivityTabs /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <ForumComponent />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <ResourceComponent />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <MyClassComponent />
            </Grid>
          </Grid>
        </Grid>
        <FilterComponent
          content={
            <ResourceFilterContent
              data={resourceFilterData}
              getFilteredData={d => getFilteredData(d)}
              handleClearFilter={() => {
                clearResourceFilter();
              }}
            />
          }
          title="Resource Filters"
          open={openResourceFilterDialog}
          onClose={handleRFDialogClose}
          onCancelClick={handleRFDialogClose}
          onOkClick={() => applyResourceFilter()}
          okText={'Apply Filter'}
        />
      </Box>
    </>
  );
}
