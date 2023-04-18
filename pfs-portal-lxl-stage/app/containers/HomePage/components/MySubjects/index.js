import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  Grid,
  Typography,
  useTheme,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Routes from '../../../../utils/routes.json';
import CourseCards from '../../../../components/UI/CourseCards';
import ProgressBar from '../progressBar.js';

// import KenCard from '../../../../global_components/KenCard';

// Icons
// import { BiPencil } from 'react-icons/bi';
// import { GrDocumentText } from 'react-icons/gr';
// import { FiUsers } from 'react-icons/fi';

// Data
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import {
  getUserCourses,
  getFacultyCourses,
} from '../../../../utils/ApiService';
import MyClassCard from '../../../LMSDashboard/components/subjectCard';
import KenLoader from '../../../../components/KenLoader';
import KenCard from '../../../../global_components/KenCard';
import KenButton from '../../../../global_components/KenButton';

const useStyles = makeStyles(theme => ({
  gridBox: {
    padding: '10px',
    overflow: 'hidden',
    height: '81vh',
  },
  containerBox: {
    background: '#fff',
    width: '100%',
    height: '80vh',
    borderRadius: '9px !important',
  },
  title: {
    fontSize: '11px',
    fontWeight: 600,
  },
  toolbar: {
    padding: '0px',
    width: '100%',
    // borderBottom: '1px solid #D7DBE1',
    minHeight: '35px',
  },
  termBox: {
    background: '#FFF3DC',
    padding: '10px',
    textAlign: 'center',
  },
  sessionBox: {
    padding: '10px',
  },
  sessionHeader: {
    color: '#997AFF',
    fontSize: '13px',
    fontWeight: 600,
  },
  academicItems: {
    fontSize: '13px',
  },
  iconBase: {
    fontSize: '25px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icons: {
    color: '#505F79',
    fontSize: '14px',
  },
  downloadIcon: {
    fontSize: '17px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  fileName: {
    fontSize: '13px',
    fontWeight: 600,
  },
  fileSubject: {
    fontSize: '11px',
    color: '#7A869A',
  },
  resource: {
    fontSize: '11px',
    color: '#7A869A',
    width: '100%',
    padding: '0px',
  },
  subjectCard: {
    padding: '10px !important',
  },
  iconBox: {
    height: '40px',
    width: '40px',
    margin: '5px',
  },
  subjectList: {
    height: '35vh',
    // height: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#787878`,
      opacity: '0.1',
      outline: `1px solid #787878`,
    },
  },
  resourceList: {
    height: '67vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#787878`,
      opacity: '0.1',
      outline: `1px solid #787878`,
    },
  },
  subjectName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  star: {
    textAlign: 'right',
    width: '100%',
    float: 'right',
    marginRight: '11px',
    fontSize: '17px',
  },
  headerLeft: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const CircularProgressProp = props => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: '40px',
        left: '16%',
      }}
    >
      <CircularProgress
        variant="determinate"
        value={props?.value}
        style={{ width: '100%', height: '100%' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
export default function SubjectCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const propsData = props;
  const [loading, setLoading] = React.useState(false);
  const [subjectBar, setSubjectBar] = useState([]);
  const [mySubjects, setMySubjects] = useState([]);
  const userDetails = getUserDetails();
  const colors = [
    { bgColor: '#FAF0FF', color: '#C06DE9' },
    { bgColor: '#FEECEB', color: '#FF837C' },
    { bgColor: '#FFFADE', color: '#BAA226' },
  ];

  useEffect(() => {
    setLoading(true);
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    if (userDetails.Type === 'Faculty') {
      getFacultyCourses(payload)
        .then(res => {
          //   console.log('getFacultyCourses res', res);
          setLoading(false);
          if (!res.hasOwnProperty('errorcode')) {
            setMySubjects(res?.courses);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('err', err);
        });
    } else {
      getUserCourses(payload)
        .then(res => {
          setLoading(false);
          //   console.log('getUserCourses res', res);
          if (!res.hasOwnProperty('errorcode')) {
            setMySubjects(res?.courses);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('err', err);
        });
    }
  }, []);

  const handleViewSubject = () => {
    history.push('/academics');
    // userDetails.Type === 'Student'
    //   ? history.push('/academics')
    //   : history.push('/facultyAcademics');
  };


const Handelclick =()=>{
 
    history.push('/academicContent');

}

  const handleActionClick = item => {
    let pathName = '';
    if (userDetails.Type === 'Faculty') {
      pathName = Routes?.subjectContentFaculty;
    } else {
      pathName = Routes?.subjectContentStudent;
    }
    history.push({
      pathname: pathName,
      state: {
        courseOfferingId: item?.courseoffering,
        subject: item?.fullname,
      },
    });
  };

  const percentagedata = [70];
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <div className="container-card">
        <Grid container xs={12}>
          <Toolbar className={classes.toolbar}>
            <Grid item container xs={12} className={classes.headerLeft}>
              <Typography
                className={classes.title}
                style={{ fontSize: '14px', fontFamily: 'Open Sans' }}
              >
                {/* {userDetails?.Type === 'Student' ? 'MY Classes' : 'MY CLASSES'}{' '} */}
                {'My Content '}(
                {mySubjects != undefined ? mySubjects?.length : 0})
              </Typography>
              {/* <Typography
                style={{ fontSize: '13px', cursor: 'pointer' }}
                onClick={handleViewSubject}
              >
                View All
              </Typography> */}
            </Grid>
          </Toolbar>
        
            <Grid container xs={12} className={classes.subjectList}  style={{width:"100%"}}>
              {mySubjects &&
                mySubjects?.map((item, index) => {
                  return (
                    <Grid container xs={6} style={{ padding: '5px' }}>
                      <div className="subjectCard">
                        <MyClassCard
                          userType={userDetails?.Type}
                          percentage={
                            (item?.activitiescompleted / item?.activitycount) *
                              100 || 0
                          }
                          subjectName={item?.fullname}
                          activityCount={item?.activitycount}
                          resourceCount={item?.resourcecount}
                          studentCount={item?.enrolcount}
                          color={colors[index % colors.length]}
                          //   hideActionArrow={true}
                          // handleAction={handleActionClick}
                          handleAction={Handelclick}
                          section={item?.section}
                          className={`${item.programname}-${item?.section}`}
                          item={item}
                        />

                        {/* <KenCard className="subject-card">
                      <Grid
                        xs={12}
                        style={{
                          height: '55px',
                          background: `${item.data.background}`,
                          padding: '10px',
                          marginBottom: '5px',
                          position: 'relative',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, 0%)',
                          borderRadius: '9px',
                          textAlign: 'center',
                        }}
                      >
                        {item.data['Subject Name']}
                      </Grid>
                      <Grid container xs={12}>
                        <Grid
                          xs={4}
                          style={{
                            overflow: 'hidden',
                            borderRight: '1px solid #d7dbe1',
                          }}
                        >
                          <CircularProgressProp value={item.data.percentage} />
                        </Grid>
                        <Grid container xs={8} style={{ paddingLeft: '3px' }}>
                          <Grid xs={8}>
                            <Typography className={classes.resource}>
                              <GrDocumentText className={classes.icons} />{' '}
                              Resource:
                            </Typography>
                          </Grid>
                          <Grid xs={2}>
                            <Typography className={classes.resource}>
                              {item.data['resource']}{' '}
                            </Typography>
                          </Grid>
                          <Grid xs={8}>
                            <Typography className={classes.resource}>
                              <BiPencil className={classes.icons} /> Activities:
                            </Typography>
                          </Grid>
                          <Grid xs={2}>
                            <Typography className={classes.resource}>
                              {item.data['activities']}{' '}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {propsData?.user?.Type != 'Student' ? (
                        <Grid
                          container
                          xs={12}
                          style={{
                            borderTop: '1px solid #D7DBE1',
                            paddingTop: '10px',
                          }}
                        >
                          <Grid xs={6}>{item.data.class}</Grid>
                          <Grid xs={6} style={{ textAlign: 'right' }}>
                            <span
                              style={{
                                background: '#D7DBE1',
                                padding: '3px',
                                borderRadius: '4px',
                              }}
                            >
                              <FiUsers /> <b>{item.data.NoOfStudents}</b>
                            </span>
                          </Grid>
                        </Grid>
                      ) : null}
                    </KenCard> */}
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
         
        </Grid>
      </div>
    </Grid>
  );
}
