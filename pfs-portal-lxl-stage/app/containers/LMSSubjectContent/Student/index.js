import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import KenLoader from '../../../components/KenLoader';
import KenHeader from '../../../global_components/KenHeader';
import DataSection from '../components/dataSections';
import {
  getCourseContent, getUserCourses, GetUserAttempts,
  QuizInstruction,
  StartAttempt,
  getCourseConnections
} from '../../../utils/ApiService';
import { useHistory } from 'react-router-dom';
import KenButton from '../../../global_components/KenButton';
import KenCard from '../../../global_components/KenCard';
import Presentation from '../../../assets/presentation-icon.svg';
import ActionTime from '../../../assets/actionTime.png';
import PdfIcon from '../../../assets/pdf-icon.svg';
import VideoIcon from '../../../assets/video-icon.svg';
import Forum from '../../../assets/forum2.svg';
import Accordion from '@material-ui/core/Accordion';
import AIW from '../../../assets/all is well.jpg';
import AAO from '../../../assets/Apples and Oranges.jpg';
import ISB from '../../../assets/i say bhallaji.jpg';
import WUD from '../../../assets/wake up dev.jpg';
import ContentCard from '../../HomePage/components/MyContent/components/ContentCard';
import { attempt } from 'lodash';
import InstructionData from '../../AssessmentPage/components/InstructionData';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cardImage: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: '200px',
    width: '100%',
    objectFit: 'cover',
  },
  assessmentstyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#7D5CCE',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '16px 0px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    border: `1px solid #DFE1E6`,
    // margin: '16px'
  },
  searchIcon: {
    padding: '3px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    opacity: '0.54',
    zIndex: 100,
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor: theme.palette.KenColors.neutral10,
    borderRadius: '3px',
    height: '38px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    // width: 'auto',
    height: '38px',
    [theme.breakpoints.up('sm')]: {
      // width: 'auto',
      '&:focus': {
        // width: 'auto',
      },
    },
  },
  // accordion
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white',
    },
  },
  stepperbutton: {
    '& span>span>svg>circle': {
      color: '#B3BAC5',
    },

    '& span>span>svg': {
      color: 'green !important',
    },
  },
  topicList: {
    marginTop: '8px',
    textAlign: 'right',
  },
  contentcard: {
    paddingLeft: '105px',
    '&>div': {
      padding: '0px',
      border: 'none',
      marginBottom: '0px',
    },
    '&> div > div> div > div': {
      padding: '0px !important',
    },
  },
}));

export default function SubjectContentStudent(props) {
  const { color } = props;
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const [description, setDescription] = useState('');
  const classes = useStyles();
  const userDetails = getUserDetails();
  const [singleCourse, setSingleCourse] = React.useState({});
  const [chapterNumber, setChapterNumber] = React.useState(1);
  const [film, setFilm] = React.useState('');
  const [funActivity, setFunActivity] = React.useState(null);
  const [actionTime, setActionTime] = React.useState(null);
  const [selectedSection, setSelectedSection] = React.useState({});
  const [updatedSelectedSection, setUpdatedSelectedSection] = React.useState(
    {}
  );
  const [gradeName, setGradeName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  const theme = useTheme();
  const [hide, setHide] = useState(false);
  const [urlid, setUrlid] = useState('');
  const [attemptId, setAttemptId] = React.useState(null);
  const [instructionsData, setInstructionsData] = React.useState({});
  const [actionAttemptId, setActionAttemptId] = React.useState(null);
  const [actioninstructionsData, setActionInstructionsData] = React.useState({});
  const [chapterName, setChapterName] = useState('');
  const [feedbackChapterId, setFeedbackChapterId] = useState('');
  //color
  const colors = [
    { bgColor: '#E7F4FB', color: '#138CD1' },
    { bgColor: '#F7EAF1', color: '#965261' },
    { bgColor: '#FAF0FF', color: '#C06DE9' },
  ];
  // const datauser = JSON.parse(localStorage.getItem(KEY_USER_DETAILS));

  useEffect(() => {

    if(funActivity?.id){
      let quizId=funActivity?.id
      setLoading(true);
      GetUserAttempts(userDetails?.ContactId,quizId)
        .then(res => {
          if (res?.attempts?.length > 0) {
            // find the Gretest Attempt ID with "state": "inprogress",
            const obj = res.attempts.find(item => item.state === 'inprogress');
            if (obj) {
              setAttemptId(obj.id);
              // setStartTime(obj.timestart);
              setLoading(false);

              return obj.id;
            }
            else {
              StartAttempt(userDetails?.ContactId,quizId)
                .then(res => {
                  // setStartTime(obj.timestart)
                  setAttemptId(res?.attempt?.id);
                  setLoading(false);
                })
                .catch(err => {
                  console.log('error in Start Attempt', err);
                  setLoading(false);
                });
            }
          }
        })
        .catch(err => {
          console.log('error in User Attempts', err);
          setLoading(false);
        });


      setLoading(true);
      QuizInstruction(quizId)
        .then(res => {
          setInstructionsData(res);
          setLoading(false);
        })
        .catch(err => {
          console.log('error in Assignment Instructions', err);
          setLoading(false);
        });

  }
    if(actionTime?.id){
      let actionQuizId=actionTime?.id
      setLoading(true);
      GetUserAttempts(userDetails?.ContactId,actionQuizId)
        .then(res => {
          if (res?.attempts?.length > 0) {
            // find the Gretest Attempt ID with "state": "inprogress",
            const obj = res.attempts.find(item => item.state === 'inprogress');
            if (obj) {
              setActionAttemptId(obj.id);
              // setStartTime(obj.timestart);
              setLoading(false);

              return obj.id;
            }
            else {
              StartAttempt(userDetails?.ContactId,actionQuizId)
                .then(res => {
                  // setStartTime(obj.timestart)
                  setActionAttemptId(res?.attempt?.id);
                  setLoading(false);
                })
                .catch(err => {
                  console.log('error in Start Attempt', err);
                  setLoading(false);
                });
            }
          }
        })
        .catch(err => {
          console.log('error in User Attempts', err);
          setLoading(false);
        });


      setLoading(true);
      QuizInstruction(actionQuizId)
        .then(res => {
          setActionInstructionsData(res);
          setLoading(false);
        })
        .catch(err => {
          console.log('error in Assignment Instructions', err);
          setLoading(false);
        });

  }
}, [funActivity,actionTime])

useEffect(() => {
  if (chapterName) {
    getCourseConnections(userDetails?.ContactId)
      .then(res => {
        console.log(res);
        // const feedbackdata =[];
        const data = res.Data?.CourseOfferings;
        let feedbackdata = [];
        data[0].CHAPTERLIST.map(x => {
          feedbackdata.push({
            status: x.chapterName.slice(10),
            chapterID: x.chapterID,
            completionStatus: x.status
          });
        });
          feedbackdata?.map((item) => {
            if (item.status == chapterName) {
              setFeedbackChapterId(item.chapterID)
            }
          })
      })
      .catch(err => {
        console.log(err);
      });
  }

}, [chapterName]);

  useEffect(() => {
    if (selectedSection) {
      const updatedModules = selectedSection?.modules?.filter(
        item =>
          item.modname === 'assign' ||
          item.modname === 'quiz' ||
          item?.modname === 'url' ||
          item?.modname === 'resource'
      );
      updatedModules?.sort(compare);
      const updatedObj = {
        ...selectedSection,
        modules: updatedModules,
      };
      setUpdatedSelectedSection(updatedObj);
    }
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
          item =>
            item.sectiontype === 'sub' &&
            item.section_role == userDetails.Type.toLowerCase()
        );
        setData(filteredCourse);
        setSingleCourse(filteredCourse[0]);
        setChapterName(filteredCourse[0]?.name);
        let filmfilterData = filteredCourse[0].modules.filter(s =>
          s.modname == 'url' ? s : null
        );
        let activityData = filteredCourse[0].modules.filter(s => {
          if (
            s?.metadatainfo[0]['data'] == 'Fun activity' &&
            s?.modname == 'quiz'
          ) {
            return s;
          }
        });

        let actionData = filteredCourse[0].modules.filter(s => {
          if (
            s?.metadatainfo[0]['data'] == 'Action Time' &&
            s?.modname == 'quiz'
          ) {
            return s;
          }
        });
        let urlId = filmfilterData[0].id;
        let description = filmfilterData[0].description;
        let filmData = filmfilterData[0].contents[0].fileurl;

        let getFunActivity = activityData.length > 0 ? activityData[0] : null;
        let getActionTime = actionData.length > 0 ? actionData[0] : null;
        setDescription(description);
        setUrlid(urlId);
        setFunActivity(getFunActivity);
        setActionTime(getActionTime);
        setFilm(filmData);
        setGradeName(filteredCourse[0].coursefullname);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [courseOfferingId]);

  function onClickrefresh(course, chapterValue) {
    setSingleCourse(course);
    setChapterNumber(chapterValue);
    setChapterName(course?.name);
    let filmfilterData = course.modules.filter(s =>
      s.modname == 'url' ? s : null
    );
    let filmData = filmfilterData[0].contents[0]?.fileurl;
    let urlId = filmfilterData[0].id;
    let description = filmfilterData[0].description;
    let activityData = course.modules.filter(s =>
      s.modname == 'quiz' ? s : null
    );
    let actionData = course.modules.filter(s => {
      if (
        s?.metadatainfo[0]['data'] == 'Action Time' &&
        s?.modname == 'quiz'
      ) {
        return s;
      }
    });
    let getFunActivity = activityData.length > 0 ? activityData[0] : [];
    let getActionTime = actionData.length > 0 ? actionData[0] : [];
    setDescription(description);
    setUrlid(urlId);
    setFilm(filmData);
    setFunActivity(getFunActivity);
    setActionTime(getActionTime);
  }

  function compare(a, b) {
    if (a.modname < b.modname) {
      return -1;
    }
    if (a.modname > b.modname) {
      return 1;
    }
    return 0;
  }

  function onClickdata() {
    setHide(true);
  }

  //stepper
  //const steps = ['Flim', 'Fun Activity', 'Action Time', 'Workbook Pdf'];
  const steps =
    userDetails?.Type == 'Student' || userDetails?.Type == 'Parent'
      ? ['Film', 'Fun Activity', 'Action Time', 'Feedback']
      : ['Film', 'Fun Activity', 'Action Time', 'Feedback'];
  // userDetails = user ? steps = ['Flim', 'Fun Activity', 'Action Time', 'Workbook Pdf'] : ['Flim', 'Fun Activity', 'Action Time'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const Film = () => {
    history.push('/film', {
      fileState: film,
      urlid: urlid,
      description: description,
      quizData: funActivity,
      actionTime:{
        id:actionTime?.id,
        name:actionTime?.name,
        attemptId:actionAttemptId,
        totalMarks:actioninstructionsData?.totalmarks,
        chapterId:feedbackChapterId,
      }
    });
  };
  const FeedbackClick = () => {
    // window.location.href = Routes?.feedBack;
    history.push('/feedBack');
  };
  const openFunActivity = () => {
    const quizData = funActivity;
    const actionTimequiz = actionTime;
        if (funActivity && attemptId && instructionsData) {
          // history.push('/FunActivity');
          // window.open(
          //   `/instructions?id=${quizData?.id}&name=${quizData?.name}`,
          //   'mywindow',
          //   'fullscreen=yes,status=1,toolbar=0'
          // );
          window.open(
            `studentAssessment?id=${quizData?.id}&actionTimeId=${actionTimequiz?.id}&contactId=${userDetails?.ContactId}&name=${quizData?.name}
            &actionTimeName=${actionTimequiz?.name}&attemptId=${attemptId}&actionAttemptId=${actionAttemptId}&totalMarks=${instructionsData?.totalmarks}
            &actionTotalMarks=${actioninstructionsData?.totalmarks}&chapterId=${feedbackChapterId}`,
            'mywindow',
            'fullscreen=yes,status=1,toolbar=0'
          );
        } else {
          alert('There is no fun activity available');
        }
  };

  const openActionTime = () => {
    const actionTimequiz = actionTime;
    if (actionTime && actionAttemptId && actioninstructionsData) {
      // history.push('/FunActivity');
      // window.open(
      //   `/instructions?id=${actionTimequiz?.id}&name=${actionTimequiz?.name}`,
      //   'mywindow',
      //   'fullscreen=yes,status=1,toolbar=0'
      // );
      window.open(
        `studentAssessment?id=${actionTimequiz?.id}&contactId=${userDetails?.ContactId}&name=${actionTimequiz?.name}&attemptId=${actionAttemptId}&totalMarks=${actioninstructionsData?.totalmarks
        }&chapterName=${feedbackChapterId}&type=${'actionTime'}`,
        'mywindow',
        'fullscreen=yes,status=1,toolbar=0'
      );
    } else {
      alert('There is no action item available...');
    }
    // history.push('/FunActivity');
    // window.open(
    //   `/instructions?id=${actionTimequiz?.id}&name=${actionTimequiz?.name}`,
    //   'mywindow',
    //   'fullscreen=yes,status=1,toolbar=0'
    // );
  };
  //IN PROCESS
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);

  const Hideshow1 = () => {
    setHide1(!hide1);
  };
  const Hideshow2 = () => {
    setHide2(!hide2);
  };
  const Hideshow3 = () => {
    setHide3(!hide3);
  };
  const Hideshow4 = () => {
    setHide4(!hide4);
  };

  return (
    <>
      {loading && <KenLoader />}
      <Box minHeight="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <KenHeader title="Grade 6">
              <KenButton
                variant="primary"
                label="Back"
                onClick={() => history.goBack()}
              />
            </KenHeader>
          </Grid>
          {/* {personName?.length>0?null:} */}

          <Grid item xs={12} sm={12} md={5}>
            <DataSection title="Course Content">
              <Accordion
                elevation={0}
                classes={{ root: classes.MuiAccordionroot }}
              >
                {/* <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ '&:before': { display: 'none' } }}
                  > */}
                <Grid
                  container
                  justifyContent="space-between"
                  style={{ cursor: 'pointer', padding: '0px 15px' }}
                  spacing={1}
                >

                  <Grid item>
                    <Typography>{/* <BsThreeDotsVertical/> */}</Typography>
                  </Grid>
                </Grid>
                {/* </AccordionSummary> */}
                {/* <AccordionDetails>
                    <Grid container>
                      <Grid item md={12} style={{ paddingBottom: '1em' }}>
                        <KenCard>
                          <Grid container>
                            <Grid item md={4}>
                              <h4> Forum1</h4>
                            </Grid>
                            <Grid item md={4}>
                              <h4> Due Date:</h4>
                              <h4>December19</h4>
                            </Grid>
                            <Grid item md={4}>
                              <h4 style={{ color: '#37B24D' }}>Published</h4>
                            </Grid>
                          </Grid>
                        </KenCard>
                      </Grid>
                      <Grid item md={12}>
                        <KenCard>
                          <Grid container>
                            <Grid item md={4}>
                              <h4> Forum2</h4>
                            </Grid>
                            <Grid item md={4}>
                              <h4> Due Date:</h4>
                              <h4>December19</h4>
                            </Grid>
                            <Grid item md={4}>
                              <h4 style={{ color: 'red' }}> Unpublished</h4>
                            </Grid>
                          </Grid>
                        </KenCard>
                      </Grid>
                    </Grid>
                    <Typography onClick={onClickdata} />
                  </AccordionDetails> */}
              </Accordion>
              <br />
              <div className={'hi brother'}>
                {data.map((s, index) => (
                  <KenCard
                    paperStyles={{
                      background: colors[index % colors.length]?.bgColor,
                      color: colors[index % colors.length]?.color,
                      // background:"#E7F4FB",
                      // color: '#138CD1',
                      cursor: 'pointer',
                      padding: '12px 9px',
                      borderRadius: '0',
                      boxShadow: 'none',
                      // border: "1px solid black"
                    }}
                  >
                    <Grid container>
                      <Grid item md={6}>
                        <Typography
                          style={{
                            fontSize: '12px',
                            paddingTop: '4px',
                            color: 'black',
                          }}
                          onClick={() => onClickrefresh(s, index + 1)}
                        >
                          <b>
                            CHAPTER {index + 1} : {s.name}
                          </b>
                        </Typography>
                      </Grid>
                      <Grid item md={6} className={classes.contentcard}>
                        <ContentCard
                          statusLabel={'In Progress'}
                          status={'In Progress'}
                        />
                      </Grid>
                    </Grid>
                  </KenCard>
                ))}
              </div>
            </DataSection>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <DataSection
              // title={updatedSelectedSection?.name}
              title={`Chapter ${chapterNumber?chapterNumber:''} : ${singleCourse?.name?singleCourse?.name:''}`}
            >
              <div>
                <img
                  src={
                    singleCourse?.name =='All is Well'
                      ? AIW
                      : singleCourse?.name =='Apples and Oranges'
                        ? AAO
                        : singleCourse?.name == 'Wake up Dev'
                          ? WUD
                          : ISB
                  }
                  style={{ width: '100%', height: '200px' }}
                />{' '}
              </div>
              <br />
              <div>
                <br />
                <div>
                  <b>Activity List</b>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepOptional(index)) {
                        // labelProps.optional = (
                        //   <Typography variant="caption">Optional</Typography>
                        // );
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step
                          key={label}
                          {...stepProps}
                          className={classes.stepperbutton}
                        >
                          <StepLabel
                            {...labelProps}
                            onClick={() => {
                              setActiveStep(index);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        You have completed all steps
                      </Typography>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                      >
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep == 0 && (
                          <KenCard>
                            <Grid container justifyContent="space-between">
                              <Grid
                                item
                                md={4}
                                onClick={() => Film()}
                                style={{ cursor: 'pointer' }}
                              >
                                <img
                                  src={VideoIcon}
                                  style={{ width: '40px', height: '40px' }}
                                />
                                &nbsp;&nbsp;Film
                              </Grid>
                              <Grid item md={4} style={{ paddingLeft: '2em' }}>
                                {/* <ProgressBar
                                      bottomColor={color?.bgColor}
                                      topColor={color?.color}
                                    /> */}
                              </Grid>
                              <Grid
                                item
                                md={4}
                                className={classes.topicList}
                                onClick={Hideshow1}
                              >
                                {hide1 ? (
                                  <KenButton
                                    style={{
                                      background: '#D0EED2',
                                      color: '#000000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    Completed
                                  </KenButton>
                                ) : (
                                  <KenButton
                                    style={{
                                      background: 'rgba(255, 122, 23, 0.25)',
                                      color: '#000000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    In Progress
                                  </KenButton>
                                )}
                                {/* <img src="https://img.icons8.com/material-rounded/24/null/menu-2.png" /> */}
                              </Grid>
                            </Grid>
                          </KenCard>
                        )}
                      </Typography>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep == 1 && (
                          <>
                            <KenCard>
                              <Grid container justifyContent="space-between">
                                <Grid
                                  item
                                  md={4}
                                  onClick={() => openFunActivity()}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <img
                                    src={Presentation}
                                    style={{ width: '40px', height: '40px' }}
                                  />
                                  Fun Activity
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  style={{ paddingLeft: '2em' }}
                                >
                                  {/* <ProgressBar
                                      bottomColor={color?.bgColor}
                                      topColor={color?.color}
                                    /> */}
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  className={classes.topicList}
                                  onClick={Hideshow2}
                                >
                                  {/* <img src="https://img.icons8.com/material-rounded/24/null/menu-2.png" /> */}
                                  {hide2 ? (
                                    <KenButton
                                      style={{
                                        background: '#D0EED2',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      completed
                                    </KenButton>
                                  ) : (
                                    <KenButton
                                      style={{
                                        background: 'rgba(255, 122, 23, 0.25)',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      In Progress
                                    </KenButton>
                                  )}
                                </Grid>
                              </Grid>
                            </KenCard>
                          </>
                        )}
                      </Typography>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep == 2 && (
                          <>
                            <KenCard>
                              <Grid
                                container
                                justifyContent="space-between"
                                style={{ cursor: 'pointer' }}
                              >
                                <Grid
                                  item
                                  md={4}
                                  onClick={() => openActionTime()}
                                >
                                  <img
                                    src={ActionTime}
                                    style={{ width: '40px', height: '40px' }}
                                  />{' '}
                                  Action Time
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  style={{ paddingLeft: '2em' }}
                                >
                                  {/* <ProgressBar
                                      bottomColor={color?.bgColor}
                                      topColor={color?.color}
                                    /> */}
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  className={classes.topicList}
                                  onClick={Hideshow3}
                                >
                                  {/* <img src="https://img.icons8.com/material-rounded/24/null/menu-2.png" /> */}
                                  {hide3 ? (
                                    <KenButton
                                      style={{
                                        background: '#D0EED2',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      completed
                                    </KenButton>
                                  ) : (
                                    <KenButton
                                      style={{
                                        background: 'rgba(255, 122, 23, 0.25)',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      In Progress
                                    </KenButton>
                                  )}
                                </Grid>
                              </Grid>
                            </KenCard>
                          </>
                        )}
                      </Typography>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep == 3 && (
                          <>
                            <KenCard>
                              <Grid
                                container
                                justifyContent="space-between"
                                style={{ cursor: 'pointer' }}
                              >
                                <Grid item md={4} onClick={FeedbackClick}>
                                  <img
                                    src={PdfIcon}
                                    style={{ width: '40px', height: '40px' }}
                                  />
                                  Feedback
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  style={{ paddingLeft: '2em' }}
                                />
                                <Grid
                                  item
                                  md={4}
                                  className={classes.topicList}
                                  onClick={Hideshow4}
                                >
                                  {/* <img src="https://img.icons8.com/material-rounded/24/null/menu-2.png" /> */}
                                  {hide4 ? (
                                    <KenButton
                                      style={{
                                        background: '#D0EED2',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      completed
                                    </KenButton>
                                  ) : (
                                    <KenButton
                                      style={{
                                        background: 'rgba(255, 122, 23, 0.25)',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      In Progress
                                    </KenButton>
                                  )}
                                </Grid>
                              </Grid>
                            </KenCard>
                          </>
                        )}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                          style={{
                            color: 'black',
                            backgroundColor: 'lightgray',
                          }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <KenButton onClick={handleNext} variant="primary">
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </KenButton>
                      </Box>
                    </React.Fragment>
                  )}
                </Box>
              </div>
            </DataSection>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
