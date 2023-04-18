import React, { useState, useEffect } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import {
  facultyActivities,
  StudentActivities,
  getCourses,
  getCourseConnections,
} from '../../utils/ApiService';

import { getUserDetails } from '../../utils/helpers/storageHelper';
import '../App/styles.scss';
import KenLoader from '../../components/KenLoader';
import { KEY_USER_TYPE, KEY_SEVERITY, KEY_STATUS } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import context from '../../utils/helpers/context';
import configContext from '../../utils/helpers/configHelper';
import UpcomingEvents from './components/UpcomingEvents';
import KenCard from '../../global_components/KenCard';
import KenTabs from '../../components/KenTabs';
import SubjectCard from './components/MySubjects';
import moment from 'moment';
import Profileimg from '../../assets/Photo.png';
import DataCard from '../LMSDashboard/components/dataCard';
import { FiFilter } from 'react-icons/fi';
import SmallSelectBox from '../LMSDashboard/components/smallSelectBox';
import ProfileCard from './components/ProfileCard';
import MyContent from './components/MyContent';
import Activities from './components/Activities';
import { BiFilterAlt } from 'react-icons/bi';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '100vh',
    [theme.breakpoints.only('xs')]: {
      padding: '0px 0px 20px 0px',
    },
  },
  grid: {
    [theme.breakpoints.only('xs')]: {
      margin: '0px 0px 0px -8px',

      '& > .MuiGrid-item': {
        padding: 8,
      },
    },
  },
  cardHandler: {
    position: 'relative',
    height: '100%',
  },
  maskWrap: {
    position: 'relative',
    height: '100%',
  },
  containerBox: {
    height: '400px',
    padding: '4px',
    overflow: 'scroll',
  },
  activityTab: {
    position: 'relative',
    top: '-15px',
  },
  viewAll: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#00218D',
    cursor: 'pointer',
    paddingRight: '4px',
  },
  dataBlock: {
    maxHeight: '65vh',
    minHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  // subjectScroll: {
  //   height: 'auto',
  // },
}));

export default function HomePage(props) {
  const classes = useStyles();
  const { drawerChanges } = props;
  const [user, setUser] = useState(getUserDetails());
  const [assignments, setAssignments] = useState();
  const [assessments, setAssessments] = useState();
  const [resources, setResources] = useState();
  const [activityUrls, setActivityUrls] = useState();
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [publishedActivities, setPublishedActivities] = useState([]);
  const [unpublishedActivities, setUnpublishedActivities] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const ContactId = JSON.parse(localStorage.getItem('userDetails'))?.ContactId;
  const [feedbackdata, setFeedbackdata] = useState();
  const [feedbackpending,setFeedbackpending]=useState();

  let profile = getUserDetails();

  useEffect(() => {
    drawerChanges('show');
    if (profile) {
      setUser(profile);
    }
  }, []);

  useEffect(() => {
    const userDetails = getUserDetails();
    console.log(userDetails,'userdetails123');
    if (
      userDetails &&
      userDetails.Type === KEY_USER_TYPE.faculty
      // (schedule && schedule.length > 0)
    ) {
      setFlag(true);
      getCourses(userDetails.ContactId)
        .then(res => {
          console.log(res,'res123')
          const promiseArray = res?.Data?.courseConnections?.map(item => {
            return facultyActivities(userDetails.ContactId, item.Id);
          });
          Promise.all(promiseArray)
            .then(function(responses) {
              // Get a JSON object from each of the responses
              if (responses && responses.length > 0) {
                let activityLinks = [];
                let newAssignment = [];
                let newAssesment = [];
                let newResources = [];
                responses.forEach(item => {
                  console.log(item,'itemitem');
                  if (item.status != KEY_STATUS.failed) {
                    item?.courses.forEach(el => {
                      let subject = el.fullname;
                      let programId = el.connectionid;
                      const chapters = el.section?.filter(
                        item =>
                          item.section_role == 'student' &&
                          item.section_name != 'A'
                      );
                      chapters?.map(el => {
                        if (el.assignment) {
                          el.assignment.forEach(ele => {
                            // if (ele.complitionstatus == "Not Completed" && ele.status == "Published") {
                            newAssignment.push({
                              ...ele,
                              subject,
                              programId,
                              sectionName: el?.section_name,
                              sectionId: el?.section_id,
                            });
                            // };
                          });
                        }
                        if (el.quizzes) {
                          el.quizzes.forEach((ele, index) => {
                            // if (ele.complitionstatus == "Not Completed" && ele.status == "Published") {
                            newAssesment.push({
                              ...ele,
                              subject,
                              programId,
                              sectionName: el?.section_name,
                              sectionId: el?.section_id,
                              type:
                                ele.metadata[0].data == 'Action Time'
                                  ? 'action'
                                  : 'fun',
                            });
                            // };
                          });
                        }
                        if (el.resources) {
                          el.resources.forEach(ele => {
                            // if (ele.complitionstatus == "Not Completed" && ele.status == "Published") {
                            newResources.push({
                              ...ele,
                              subject,
                              programId,
                              sectionName: el?.section_name,
                              sectionId: el?.section_id,
                              type:
                                ele.metadata[0].data == 'Action Time'
                                  ? 'action'
                                  : 'fun',
                            });
                            // };
                            console.log(newResources,'newresource')
                          });
                        }
                        if (el?.urls) {
                          el.urls.forEach(ele => {
                            activityLinks.push({
                              ...ele,
                              subject,
                              url: el.urls,
                              programId,
                              sectionName: el?.section_name,
                              sectionId: el?.section_id,
                              type: 'film',
                            });
                          });
                        }
                      });
                    });
                  }
                });
                newAssesment = newAssesment.sort(
                  (a, b) => Number(a?.timeclose) - Number(b?.timeclose)
                );
                setActivityUrls(activityLinks);
                setAssignments(newAssignment);
                setFilteredAssessments(newAssesment);
                setFilteredAssignments(newAssignment);
                setFilteredResources(newResources);
                setResources(newResources);
                setAssessments(newAssesment);
                setFlag(false);
              } else {
                setActivityUrls([]);
                setAssignments([]);
                setAssessments([]);
                setFilteredResources([]);
                setResources([]);
                setFlag(false);
              }

              setFlag(false);
            })
            .catch(err => {
              console.log('Error', err);
              setActivityUrls([]);
              setAssignments([]);
              setAssessments([]);
              setFilteredAssessments([]);
              setFilteredAssignments([]);
              setFlag(false);
            });
        })
        .catch(error => {
          console.log('error in getCourses', error);
          setFlag(false);
          return [];
        });
    } else if (userDetails) {
      setFlag(true);

      StudentActivities(userDetails.ContactId, '')
        .then(res => {
          console.log(res,'res456')
          let activityLinks = [];
          let newAssignment = [];
          let newAssesment = [];
          let newResources = [];
          let courseArr = res?.courses;
          courseArr.forEach(el => {
            let subject = el.fullname;
            let programId = el.connectionid;
            const chapters = el.section?.filter(
              item => item.section_role == 'student' && item.section_name != 'A'
            );
            console.log('chapters', chapters);
            chapters?.map(el => {
              if (el.assignment) {
                el.assignment.forEach(ele => {
                  // if (ele.complitionstatus == "Not Completed" && ele.status == "Published") {
                  newAssignment.push({
                    ...ele,
                    subject,
                    programId,
                    sectionName: el?.section_name,
                    sectionId: el?.section_id,
                  });
                  // };
                });
              }
              if (el.quizzes) {
                el.quizzes.forEach(ele => {
                  // if (ele.complitionstatus == "Not Completed" && ele.status == "Published") {
                  newAssesment.push({
                    ...ele,
                    subject,
                    programId,
                    sectionName: el?.section_name,
                    sectionId: el?.section_id,
                    type:
                      ele.metadata[0].data == 'Action Time' ? 'action' : 'fun',
                  });
                  // };
                });
              }
              if (el.resources) {
                el.resources.forEach(ele => {
                  newResources.push({
                    ...ele,
                    subject,
                    programId,
                    sectionName: el?.section_name,
                    sectionId: el?.section_id,
                    type:
                      ele.metadata[0].data == 'Action Time' ? 'action' : 'fun',
                  });
                });
              }
              if (el?.urls) {
                el.urls.forEach(ele => {
                  activityLinks.push({
                    ...ele,
                    subject,
                    url: el.urls,
                    programId,
                    sectionName: el?.section_name,
                    sectionId: el?.section_id,
                    type: 'film',
                  });
                });
              }
            });
          });
          console.log(newAssesment,'newAssessment');
          newAssesment = newAssesment.sort(
            (a, b) => Number(a?.timeclose) - Number(b?.timeclose)
          );
          setActivityUrls(activityLinks);
          setAssignments(newAssignment);
          setFilteredAssessments(newAssesment);
          setFilteredAssignments(newAssignment);
          setFilteredResources(newResources);
          setResources(newResources);
          setAssessments(newAssesment);
          setFlag(false);
        })
        .catch(err => {
          setFlag(false);
          setAssignments([]);
          setAssessments([]);
          setFilteredAssessments([]);
          setFilteredAssignments([]);
          setActivityUrls([]);
          console.log('error in studentActivities', err);
        });
    }
  }, []);

  useEffect(() => {
    getCourseConnections(ContactId).then(res => {
      console.log(res,'res678')
      let feeddata = res.Data.CourseOfferings[0].CHAPTERLIST;
      let feedbackdata = [];
      let feedbackpending=[];
      feeddata?.filter(item => {
        if(item?.status=="Submitted"){
          feedbackdata?.push({
            // complitionstatus:item.status=="Submitted"?"Completed":"Not Completed",
            sectionName: item?.chapterName,
            // title:"FeedbacK",
            type: 'FeedbacK',
            metadata: [
              {
                  "field": "FeedbacK",
                  "data": "FeedbacK"
              }
          ],
          });
          
        }
        if(item?.status=="Pending"){
          feedbackpending?.push({
            sectionName: item?.chapterName,
            // title:"FeedbacK",
            type: 'FeedbacK',
            metadata: [
              {
                  "field": "FeedbacK",
                  "data": "FeedbacK"
              }
          ],
          });

        }
        
      
      });
      // console.log(feedbackdata,'feedbackdata');
      setFeedbackdata(feedbackdata);
      setFeedbackpending(feedbackpending);

      // console.log(feedbackdata, 'feedbackdata');
    });
  }, []);

  console.log(feedbackpending, 'feedbackpending');

  useEffect(() => {

    let publishedAssessments = [];
    let unpublishedAssessments = [];
    let publishedAssignments = [];
    let unpublishedAssignments = [];
    let publishedResources = [];
    let unpublishedResources = [];
    let publishedUrls = [];
    let unpublishedUrls = [];
    const userDetails = getUserDetails();
    const condition =
      userDetails.Type === 'Faculty' ? 'status' : 'complitionstatus';
    const conditionValue =
      userDetails.Type === 'Faculty' ? 'Published' : 'Completed';

    if (assessments?.length > 0) {
      publishedAssessments = assessments?.filter(
        assessment => assessment[condition] === conditionValue
      );
      unpublishedAssessments = assessments?.filter(
        assessment => assessment[condition] !== conditionValue
      );
    }
    if (assignments?.length > 0) {
      publishedAssignments = assignments?.filter(
        assignment => assignment[condition] === conditionValue
      );
      unpublishedAssignments = assignments?.filter(
        assignment => assignment[condition] !== conditionValue
      );
    }
    if (resources?.length > 0) {
      publishedResources = resources?.filter(
        resource => resource[condition] === conditionValue
      );
      unpublishedResources = resources?.filter(
        resource => resource[condition] !== conditionValue
      );
    }
    if (activityUrls?.length > 0) {
      publishedUrls = activityUrls?.filter(
        activityUrl => activityUrl[condition] === conditionValue
      );
      unpublishedUrls = activityUrls?.filter(
        activityUrl => activityUrl[condition] !== conditionValue
      );
    }

    let sortDta = [...unpublishedUrls, ...unpublishedAssessments];
    let sortResource = sortDta.filter(
      (data, i, a) => a.findIndex(x => x.sectionName === data.sectionName) === i
    );
    let srtResource = [];
    for (let i = 0; i < sortResource.length; i++) {
      let flim = sortDta.find(
        x => x.sectionName == sortResource[i].sectionName && x.type == 'film'
      );
      if (flim) {
        srtResource.push(flim);
      }
      let fun = sortDta.find(
        x => x.sectionName == sortResource[i].sectionName && x.type == 'fun'
      );

      if (fun) {
        srtResource.push(fun);
      }
      let action = sortDta.find(
        x => x.sectionName == sortResource[i].sectionName && x.type == 'action'
      );
      if (action) {
        srtResource.push(action);
      }
    }

    let sortDta1 = [...publishedUrls, ...publishedAssessments];
    let sortResource1 = sortDta1.filter(
      (data, i, a) => a.findIndex(x => x.sectionName === data.sectionName) === i
    );
    let srtResource1 = [];
    for (let i = 0; i < sortResource1.length; i++) {
      let flim = sortDta1.find(
        x => x.sectionName == sortResource1[i].sectionName && x.type == 'film'
      );
      if (flim) {
        srtResource1.push(flim);
      }
      let fun = sortDta1.find(
        x => x.sectionName == sortResource1[i].sectionName && x.type == 'fun'
      );

      if (fun) {
        srtResource1.push(fun);
      }
      let action = sortDta1.find(
        x => x.sectionName == sortResource1[i].sectionName && x.type == 'action'
      );
      if (action) {
        srtResource1.push(action);
      }
    }

    setPublishedActivities([
      ...srtResource1,
      ...publishedAssignments,
      // ...publishedResources,
      // ...feedbackdata,
    ]);
    setUnpublishedActivities([
      ...srtResource,
      ...unpublishedAssignments,
      // ...unpublishedResources,
      // ...feedbackdata,
    ]);
    console.log(
      unpublishedAssessments,
      unpublishedAssignments,
      unpublishedUrls,
      'testu'
    );
  }, [assessments, assignments, resources]);
//learing
  let unpublishedActivitiesdata;
  if (feedbackdata?.length > 0  && unpublishedActivities?.length > 0) {
    
    
    unpublishedActivitiesdata = [...unpublishedActivities, ...feedbackdata];
  }
console.log(unpublishedActivitiesdata,"unpublishedActivitiesdata");

let publishedActivitiesdata;
if (feedbackpending?.length > 0  && publishedActivities?.length > 0) {
  
  
  publishedActivitiesdata = [...publishedActivities, ...feedbackpending];
}
  
  const tabData = [
    {
      title: `Pending (${
        unpublishedActivitiesdata ? unpublishedActivitiesdata.length : 0
      })`,
      content: <Activities activities={unpublishedActivitiesdata} />,
    },
    {
      title: `Completed  (${
        publishedActivitiesdata ? publishedActivitiesdata.length : 0
      })`,
      content: <Activities activities={publishedActivitiesdata} />,
    },
  ];
  const tabData1 = [
    {
      title: `published (${
        publishedActivities ? publishedActivities.length : 0
      })`,
      content: <Activities activities={publishedActivities} />,
    },
    {
      title: `unpublished (${
        unpublishedActivities ? unpublishedActivities.length : 0
      })`,
      content: <Activities activities={unpublishedActivities} />,
    },
  ];

  return (
    <>
      <Box>
        {(flag || loading) && <KenLoader />}

        <Grid className={classes.root}>
          {user ? (
            <>
              <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                  <ProfileCard />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  // style={{ height: '67vh', padding: '5px' }}
                >
                  <KenCard paperStyles={{ height: '450px' }}>
                    {/* <h3 style={{marginTop : '35px'}}>My Content</h3> */}
                    <div className={classes.dataBlock}>
                      <MyContent user={user} />
                    </div>
                  </KenCard>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  // style={{ height: '67vh', padding: '5px' }}
                >
                  <KenCard paperStyles={{ height: '450px' }}>
                    <Grid container>
                      <Grid md={6}>
                        <h3>My Activities</h3>
                      </Grid>
                      {/* <Grid md={6}>
                        <br />
                        {/* <BiFilterAlt
                          style={{
                            color: '#092682',
                            float: 'right',
                            height: '20px',
                            width: '20px',
                          }}
                        />
                      </Grid> */}
                    </Grid>
                    <div className={classes.subjectScroll}>
                      <KenTabs
                        data={profile.Type === 'Faculty' ? tabData1 : tabData}
                        tabPanelProps={{
                          style: {
                            minHeight: '259px',
                            position: 'relative',
                            padding: '0px',
                          },
                          tabPanelBoxPadding: 1,
                        }}
                      />
                    </div>
                  </KenCard>
                </Grid>
                {/* <Grid xs={4} style={{ padding: '5px' }}> */}
                {/* <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <KenCard paperStyles={{ height: "400px" }}>
                    <UpcomingEvents
                      user={user}
                      style={{ height: '100%', padding: '0px' }}
                    />
                  </KenCard>
                </Grid> */}
              </Grid>
            </>
          ) : (
            <KenLoader />
          )}
        </Grid>
      </Box>
    </>
  );
}
