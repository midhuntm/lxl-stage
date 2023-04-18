import { isArray } from 'lodash';
import React, { useEffect } from 'react';
import {
  getCourseContent,
  getCourseContentFaculty,
  getFacultyCourses,
  getUserCourses,
} from '../../../../utils/ApiService';
import { useHistory } from 'react-router-dom';
import Routes from '../../../../utils/routes.json';
import { Box, Typography, MenuItem, Select, Grid } from '@material-ui/core';
import ContentCard from './components/ContentCard';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import SmallSelectBox from '../../../LMSDashboard/components/smallSelectBox';
// import {KenSelect} from '../../../../components/KenSelect/index';
import { FiFilter } from 'react-icons/fi';
function MyContent(props) {
  const { user } = props;
  const [courseOffering, setCourseOffering] = React.useState('');
  const [courseName, setCourseName] = React.useState('');
  const [courseContent, setCourseContent] = React.useState([]);
  const [user1, setUser1] = React.useState([]);
  const [user2, setUser2] = React.useState([]);
  const [subjectFilter, setSubjectFilter] = React.useState('all');

  const userDetails = getUserDetails();

  const colors = [
    { bgColor: '#E7F4FB', color: '#138CD1' },
    { bgColor: '#F7EAF1', color: '#965261' },
    { bgColor: '#FAF0FF', color: '#C06DE9' },
    { bgColor: '#DEEDF1', color: '#0A8D9E' },
    { bgColor: '#FEECEB', color: '#FF837C' },
    { bgColor: '#E3EDF9', color: '#1F7FE0' },
    { bgColor: '#FFFADE', color: '#BAA226' },
  ];

  useEffect(() => {
    const payload = {
      contactid: user?.ContactId,
      method: 'post',
    };
    getUserCourses(payload)
      .then(res => {
        {
          if (isArray(res?.courses) && res?.courses?.length > 0) {
            setCourseOffering(res.courses[0]?.courseoffering);
            setCourseName(res.courses[0]?.fullname);
          }
        }
      })
      .catch(err => {
        setCourseOffering('');
      });

    // if (user?.Type === 'Faculty') {
    //   const payload = {
    //     contactid: user?.ContactId,
    //     method: 'post',
    //   };
    //   getFacultyCourses(payload)
    //     .then(res => {
    //       console.log('res of getFacultyCourses', res);
    //       if (isArray(res?.courses) && res?.courses?.length > 0) {
    //         setCourseOffering(res.courses[0]?.courseoffering);
    //       }
    //     })
    //     .catch(err => {
    //       setCourseOffering('');
    //     });
    // } else if (user?.Type === 'Student') {
    //   const payload = {
    //     contactid: user?.ContactId,
    //     method: 'post',
    //   };
    //   getUserCourses(payload)
    //     .then(res => {
    //       console.log('res of getUserCourses', res);
    //       if (isArray(res?.courses) && res?.courses?.length > 0) {
    //         setCourseOffering(res.courses[0]?.courseoffering);
    //       }
    //     })
    //     .catch(err => {
    //       setCourseOffering('');
    //     });
    // }
  }, [user]);

  useEffect(() => {
    if (courseOffering) {
      getCourseContent(courseOffering, user?.ContactId)
        .then(res => {
          let courseData = res;
          let subject = ['all'];
          courseData.map(item => {
            if (
              item.sectiontype === 'sub' &&
              item.section_role == userDetails.Type.toLowerCase()
            ) {
              return subject.push(item.name);
            }
          });

          const removeDuplicates = subject => {
            return subject.filter(
              (item, index) => subject.indexOf(item) === index
            );
          };
          console.log(removeDuplicates(subject), 'subj1');
          setUser2(removeDuplicates(subject));
          console.log(user2,'user2')
          if (isArray(res) && res.length > 0) {
            // setCourseContent(res?.filter(item => item.sectiontype === 'sub'));
            setUser1(
              res?.filter(
                item =>
                  item.sectiontype === 'sub' &&
                  item.section_role == userDetails.Type.toLowerCase()
              )
            );
            console.log('user123',user1); 
            setCourseContent(
              res?.filter(
                item =>
                  item.sectiontype === 'sub' &&
                  item.section_role == userDetails.Type.toLowerCase()
              )
            );
          }
        })
        .catch(err => {
          setCourseContent([]);
        });
      //   if (user?.Type === 'Faculty') {
      //     getCourseContentFaculty(courseOffering, user?.ContactId)
      //       .then(res => {
      //         console.log('res of getCourseContentFaculty', res);
      //         if (isArray(res) && res.length > 0) {
      //           setCourseContent(res);
      //         }
      //       })
      //       .catch(err => {
      //         setCourseContent([]);
      //       });
      //   } else if (user?.Type === 'Student') {
      //     getCourseContent(courseOffering, user?.ContactId)
      //       .then(res => {
      //         console.log('res of getCourseContent', res);
      //         if (isArray(res) && res.length > 0) {
      //           setCourseContent(res);
      //         }
      //       })
      //       .catch(err => {
      //         setCourseContent([]);
      //       });
      //   }
    }
  }, [courseOffering]);

  const handleChange = e => {
    setSubjectFilter(e.target.value);
    console.log(subjectFilter, 'subject');
  };
  const filter1 = courseContent.filter(my => my.name === subjectFilter);

  const history = useHistory();
  const onSectionClick = section => {
    history.push({
      pathname: `/${Routes.subjectContentStudent}`,
      state: {
        section: section,
      },
    });
  };

  const getProgress = ind => {
    switch (ind) {
      case 0:
        return 100;
      case 1:
        return 76;
      case 2:
        return 15;
      case 3:
        return 80;
      case 4:
        return 100;
    }
  };

  return (
    <div>
      {/* <Box p={2} pl={0}>
        <Typography variant="h6">{courseName}</Typography>
      </Box> */}
      <Grid container spacing={1}>
        <Grid item md={8} sm={8} sx={12}>
          <h3>My Content</h3>
        </Grid>
        {/* <Grid item md={2} sm={2} sx={12} style={{marginTop : '10px'}}>
          <Select value={subjectFilter} onChange={handleChange}>
            {user2.map(item => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </Grid> */}
              <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Box pr={1} style={{ display: 'flex', alignItems: 'center', minWidth: 'max-content' }}>
                  <p>Subject :&nbsp;</p>
                  <FiFilter style={{ fontSize: 'medium', cursor: 'initial' }} />
                </Box>
                <SmallSelectBox label="" options={user2} value={subjectFilter} onChange={handleChange} />
              </Box>
        <Grid item md={12} sm={12}>
          {subjectFilter === 'all'
            ? courseContent?.map((item, index) => (
                <div className="card">
                  {' '}
                  <ContentCard
                    title={`Chapter ${index + 1}: ${item?.name}`}
                    statusLabel={
                      item?.sectioncompletion ? 'Completed' : 'In Progress'
                    }
                    status={
                      item?.sectioncompletion ? 'Completed' : 'In Progress'
                    }
                    // subTitle={item?.coursefullname}
                    onCardClick={() => onSectionClick(item)}
                    chapter={item}
                    progress={getProgress(index)}
                  />{' '}
                </div>
              ))
            : filter1.map((item1, index1) => (
                <div className="card">
                  {' '}
                  <ContentCard
                    title={`Chapter ${index1 + 1}: ${item1?.name}`}
                    statusLabel={
                      item1?.sectioncompletion ? 'Completed' : 'In Progress'
                    }
                    status={
                      item1?.sectioncompletion ? 'Completed' : 'In Progress'
                    }
                    // subTitle={item?.coursefullname}
                    onCardClick={() => onSectionClick(item1)}
                    chapter={item1}
                    progress={getProgress(index1)}
                  />{' '}
                </div>
              ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default MyContent;
