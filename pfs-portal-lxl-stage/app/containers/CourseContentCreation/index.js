import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KenClassList from '../../global_components/KenClassList';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { facultyActivities, StudentActivities, ApplicantActivities, getDownloadCertificateId, getDownloadCertificate, getStudentResult } from '../../utils/ApiService';
import { KEY_STATUS, KEY_USER_TYPE } from '../../utils/constants';
import KenTabs from '../../components/KenTabs';
import AssignmentsTab from './Components/AssignmentsTab';
import AssessmentsTab from './Components/AssessmentsTab';
import LessonsTab from './Components/LessonsTab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import KenLoader from '../../components/KenLoader';
import { useTranslation } from 'react-i18next';
import KenButton from '../../global_components/KenButton';
import Hidden from '@material-ui/core/Hidden';
import ClassListDropDown from '../../global_components/KenClassList/ClassListDropDown';

import { useAppContext } from '../../utils/contextProvider/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: -1,
  },
  dropDown: {
    display: 'flex',
  },
  button: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
  },
  icons: {
    fontSize: '18px',
    marginRight: '10px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function ContentCreationPage() {
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = useState();
  const [activityUrls, setActivityUrls] = useState();
  const [tabData, setTabData] = useState();
  const [loading, setLoading] = useState(false);
  const [studetResult, setStudetResult] = useState(null);
  const { t } = useTranslation();
  const {
    state: { userDetails },
  } = useAppContext();

  const getSelectedSection = section => {
    setSelectedSection(section);
  };

  const getTabData = (assignsArray, assesArray, lessonArray, notesArray) => {
    return [
      // {
      //   title: (
      //     <Box className={classes.title}>
      //       <MenuBookIcon className={classes.icons} />
      //       <span>{`Lessons (${lessonArray?.length || '0'})`}</span>
      //     </Box>
      //   ),
      //   content: <LessonsTab data={lessonArray} />,
      // },
      // {
      //   title: (
      //     <Box className={classes.title}>
      //       <AssignmentIcon className={classes.icons} />
      //       <span>{`Assignments (${assignsArray?.length || '0'})`}</span>
      //     </Box>
      //   ),
      //   content: <AssignmentsTab data={assignsArray} />,
      // },
      {
        title: (
          <Box className={classes.title}>
            <AssessmentIcon className={classes.icons} />
            <span>{`My Test (${assesArray?.length || '0'})`}</span>
          </Box>
        ),
        content: <AssessmentsTab data={assesArray} />,
      },
    ];
  };

  const goToContent = () => {
    let urlObj = activityUrls.find(url => url.id === selectedSection.Id);
    if (urlObj) {
      window.open(urlObj.url, '_blank');
    }
  };


  useEffect(() => {
    setLoading(true);
    const user = getUserDetails();
    const contactID = user?.ContactId;
    const connectionId = selectedSection?.Id;
    if (connectionId && contactID) {
      if (
        user?.Type?.toLocaleLowerCase() ===
        KEY_USER_TYPE.faculty?.toLocaleLowerCase()
      ) {
        facultyActivities(contactID, connectionId)
          .then(res => {
            setLoading(false);
            const activityLinks = [];
            let assignmentsArray = [];
            let assessmentsArray = [];
            let lessonsArray = [];
            if (res.status !== KEY_STATUS.failed) {
              res?.courses.forEach(el => {
                let subject = el.fullname;
                if (el.activities.assignment) {
                  el.activities.assignment.forEach(ele => {
                    assignmentsArray.push({ ...ele, subject });
                  });
                }
                if (el.activities.quizzes) {
                  el.activities.quizzes.forEach(ele => {
                    assessmentsArray.push({ ...ele, subject });
                  });
                }
                if (el.activities.lesson) {
                  el.activities.lesson.forEach(ele => {
                    lessonsArray.push({ ...ele, subject });
                  });
                }
                if (el?.url) {
                  activityLinks.push({
                    subject: el.fullname,
                    url: el.url,
                    id: el.connectionid,
                  });
                }
              });
            }
            setTabData(
              getTabData(assignmentsArray, assessmentsArray, lessonsArray)
            );
            setActivityUrls(activityLinks);
          })
          .catch(err => {
            console.log('error in facultyActivities', err);
            setActivityUrls([]);
            setLoading(false);
          });
      } else if (
        user?.Type?.toLocaleLowerCase() ===
        KEY_USER_TYPE.student?.toLocaleLowerCase()
      ) {
        StudentActivities(contactID, connectionId)
          .then(res => {
            setLoading(false);
            const activityLinks = [];
            let assignmentsArray = [];
            let assessmentsArray = [];
            let lessonsArray = [];
            if (res.status !== KEY_STATUS.failed) {
              res?.courses.forEach(el => {
                let subject = el.fullname;
                if (el.activities.assignment) {
                  el.activities.assignment.forEach(ele => {
                    assignmentsArray.push({ ...ele, subject });
                  });
                }
                if (el.activities.quizzes) {
                  el.activities.quizzes.forEach(ele => {
                    assessmentsArray.push({ ...ele, courseId: el.id, subject, isDisabled: (studetResult && studetResult?.Passed__c === "Yes") ? true : false });
                  });
                }
                if (el.activities.lesson) {
                  el.activities.lesson.forEach(ele => {
                    lessonsArray.push({ ...ele, subject });
                  });
                }
                if (el?.url) {
                  activityLinks.push({
                    subject: el.fullname,
                    url: el.url,
                    id: el.connectionid,
                  });
                }
              });
            }
            setTabData(
              getTabData(assignmentsArray, assessmentsArray, lessonsArray)
            );
            setActivityUrls(activityLinks);
          })
          .catch(err => {
            console.log('error in facultyActivities', err);
            setActivityUrls([]);
            setLoading(false);
          });
      }
      else if (
        user?.Type?.toLocaleLowerCase() ===
        KEY_USER_TYPE.applicant?.toLocaleLowerCase()
      ) {
        ApplicantActivities(contactID, connectionId)
          .then(res => {
            setLoading(false);
            const activityLinks = [];
            let assignmentsArray = [];
            let assessmentsArray = [];
            let lessonsArray = [];
            if (res.status !== KEY_STATUS.failed) {
              res?.courses.forEach(el => {
                let subject = el.fullname;
                if (el.activities.assignment) {
                  el.activities.assignment.forEach(ele => {
                    assignmentsArray.push({ ...ele, subject });
                  });
                }
                if (el.activities.quizzes) {
                  el.activities.quizzes.forEach(ele => {
                    assessmentsArray.push({ ...ele, courseId: el.id, subject, isDisabled: (studetResult && studetResult?.Passed__c === "Yes") ? true : false });
                  });
                }
                if (el.activities.lesson) {
                  el.activities.lesson.forEach(ele => {
                    lessonsArray.push({ ...ele, subject });
                  });
                }
                if (el?.url) {
                  activityLinks.push({
                    subject: el.fullname,
                    url: el.url,
                    id: el.connectionid,
                  });
                }
              });
            }
            setTabData(
              getTabData(assignmentsArray, assessmentsArray, lessonsArray)
            );
            setActivityUrls(activityLinks);
          })
          .catch(err => {
            console.log('error in facultyActivities', err);
            setActivityUrls([]);
            setLoading(false);
          });
      }
    }
  }, [selectedSection, studetResult]);



  const downloadCertificate = () => {
    setLoading(true);
    const user = getUserDetails();
    const contactID = user?.ContactId;
    const offeringID = selectedSection?.CourseOfferingID;
    //const contactID = "0030p00000YMX7wAAH";
    //const offeringID = "a0B0p00000v2tpCEAQ";
    getDownloadCertificateId(contactID, offeringID).then(res => {
      getDownloadCertificate(res).then(resp => {
        setLoading(false);
        const blob = new Blob([resp], { type: 'application/pdf' });
        saveAs(blob, 'Certificate.pdf');
      }).catch(err => {
        setLoading(false);
        console.log(err)
      })

    }).catch(err => {
      setLoading(false);
      console.log(err)
    })

  }

  useEffect(() => {
    setLoading(true);
    const user = getUserDetails();
    const contactID = user?.ContactId;
    const offeringID = selectedSection?.CourseOfferingID;
    // const offeringID = "a0B0p00000v2tpCEAQ";
    getStudentResult(contactID, offeringID).then(res => {

      // console.log("[getStudentResult] res: ", res);
      if (res.status === 'success')
        setLoading(false);
      setStudetResult(res?.data);

    });
  }, [selectedSection]);

  return (
    <>
      {loading && <KenLoader />}
      <Grid container direction="column" className={classes.root} spacing={2}>
        <Grid item>
          <Box>
            <ClassListDropDown
              getSelectedSection={getSelectedSection}
            // title={t('headings:Course_Content')}
            // listTitle={t('headings:Your_Subjects')}
            // listSubTitle={t('headings:Mode')}
            />
          </Box>
        </Grid>
        {userDetails?.Type?.toLowerCase() ===
          KEY_USER_TYPE.faculty.toLocaleLowerCase() ? (
          <Grid item style={{ textAlign: 'right' }}>
            <Box>
              <Hidden only={['md', 'lg', 'xl']}>
                <KenButton
                  label={t('labels:Add_Content')}
                  onClick={() => goToContent()}
                  variant="primary"
                  style={{ marginBottom: '8px' }}
                />
              </Hidden>
            </Box>
          </Grid>
        ) : null}
        {/* <Grid item>
        
        </Grid> */}
      </Grid>
      {tabData && (
        <Box mt={2}>
          <KenTabs
            data={tabData}
            tabPanelProps={{
              style: { minHeight: '250px', position: 'relative', /* pointerEvents: "none" */ },
            }}
          >
            <KenButton
              label={'Download Certificate'}
              onClick={() => downloadCertificate()}
              variant="primary"
              style={{
                position: 'absolute',
                right: '10px',
                height: '80%',
                bottom: '5px',
                padding: '5px',
                float: 'right',
                fontSize: 12
              }}
              disabled={(studetResult && studetResult?.Passed__c === "Yes") ? false : true}
            />
            {userDetails?.Type?.toLowerCase() ===
              KEY_USER_TYPE.faculty.toLocaleLowerCase() && (
                <Hidden only={['xs', 'sm']}>
                  <KenButton
                    label={t('labels:Add_Content')}
                    onClick={() => goToContent()}
                    variant="primary"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      height: '80%',
                      bottom: '5px',
                      padding: '5px',
                      float: 'right',
                    }}
                  />
                </Hidden>
              )}
          </KenTabs>
        </Box>
      )}
    </>
  );
}
