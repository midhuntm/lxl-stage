import React, { useEffect, useState } from 'react';
import ContentActivities from './ContentActivities';
import { Box, Grid, Paper } from '@material-ui/core';
import ContentResources from './ContentResources';
import { getCourseContent, getUserCourses } from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { useHistory } from 'react-router-dom';
import KenHeader from '../../../global_components/KenHeader';
import KenButton from '../../../global_components/KenButton';



export default function AcadamicContent() {
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const userDetails = getUserDetails();
  const [chapterData, setChapterData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const history = useHistory();
  const [description, setDescription] = useState('');
  const [urlid, setUrlid] = useState('');
  const [film, setFilm] = React.useState('');
  const [funActivity, setFunActivity] = React.useState(null);
  const [actionTime, setActionTime] = React.useState(null);
  const [gradeName, setGradeName] = React.useState('');
  const [activityFilterData, setActivityFilterData] = React.useState([]);



  useEffect(() => {
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    getUserCourses(payload)
      .then(res => {
        let id = res.courses[0]?.courseoffering;
        setCourseOfferingId(id);
      })
      .catch(err => {
        console.log('error occured', err);
        setCourseOfferingId('');
      });
  }, []);

  useEffect(() => {
    let allCourses = [];
    getCourseContent(courseOfferingId, userDetails?.ContactId)
      .then(res => {
        allCourses = res;
        let filteredCourse = allCourses?.filter(
          item => item.sectiontype === 'sub' && item.section_role == "student"
        );
        setChapter(filteredCourse);
        setChapterData(filteredCourse[0]);
           let filmfilterData = filteredCourse[0].modules.filter(s =>
          s.modname == 'url' ? s : null
        );
        let urlId = filmfilterData[0].id;
        let description = filmfilterData[0].description;
        let filmData = filmfilterData[0].contents[0].fileurl;
        let activityfilterData = filteredCourse[0].modules.filter(s =>
          s.modname == 'quiz' ? s : null
        );
        setActivityFilterData(activityfilterData);
        setDescription(description);
        setUrlid(urlId);
        setFilm(filmData);
        setGradeName(filteredCourse[0].coursefullname);


      })
      .catch(err => {
        console.log('err', err);
      });
  }, [courseOfferingId]);

  function onClickrefresh(course,chapterValue) {
    setSingleCourse(course);
        setChapterNumber(chapterValue)
    let filmfilterData = course.modules.filter(s =>
      s.modname == 'url' ? s : null
    );
    let filmData = filmfilterData[0].contents[0]?.fileurl;
    let urlId = filmfilterData[0].id;
    let description = filmfilterData[0].description;
    let activityData = course.modules.filter(s =>
      s.modname == 'quiz' ? s : null
    );
    let actionData = course.modules.filter(s =>
      s.modname == 'url' ? s : null
    );
    
    let getFunActivity = activityData.length > 0 ? activityData[0] : [];
    let getActionTime = actionData.length > 0 ? actionData[0] : [];
    let activityfilterData = course.modules.filter(s =>
      s.modname == 'quiz' ? s : null
    );
    setActivityFilterData(activityfilterData);
    setDescription(description);
    setUrlid(urlId);
    setFilm(filmData);
    setFunActivity(getFunActivity);
    setActionTime(getActionTime);
  }

  return (
    <Box>
          <Grid item xs={12} sm={12} md={12}>
            <KenHeader title="Course Content">
              <KenButton
                variant="primary"
                label="Back"
                onClick={() => history.goBack()}
              />
            </KenHeader>
          </Grid>
      <ContentActivities
        chapter={chapter}
        chapterData={chapterData}
        onClickrefresh={onClickrefresh}
        film={film}
        urlid={urlid}
        description={description}
        activityFilterData={activityFilterData}
      />
    </Box>
  );
}
