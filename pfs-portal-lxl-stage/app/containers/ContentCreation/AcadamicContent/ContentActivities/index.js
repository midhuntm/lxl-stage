import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Card, Grid } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import KenCard from '../../../../global_components/KenCard';
import Forum from '../../../../assets/forum2.svg';
import KenButton from '../../../../global_components/KenButton';
import KenIcon from '../../../../global_components/KenIcon';
import DataSection from '../../../LMSSubjectContent/components/dataSections';
import { useHistory } from "react-router-dom";

const lmsVideoIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/video-icon.svg';

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
  accordian: {
    width: '100%',
    border: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  interactiv: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#555DB5',
  },
  assessmentstyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#7D5CCE',
  },
  assessmentstyle1: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#7D5CCE',
    margin: '25px 0px 0px 12px',
  },
  containerModify: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  hoverEffect: {
    '&:hover': {
      background: '#F0F3FF',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    fill: `${theme.palette.KenColors.neutral100} !important`,
  },
}));

export default function ContentActivities(props) {
  const classes = useStyles();
  const {
    chapter,
    film,
    urlid,
    description,
    chapterData,
    activityFilterData,
  } = props;
  const history = useHistory();
  const [singleCourse, setSingleCourse] = useState(undefined);
  const [chapterNumber, setChapterNumber] = useState(1);
  const [funActivityId, setFunActivityId] = useState('');
  const [actionTimeId, setActionTimeId] = useState('');
  const colors = [
    { bgColor: '#E7F4FB', color: '#138CD1' },
    { bgColor: '#F7EAF1', color: '#965261' },
    { bgColor: '#FAF0FF', color: '#C06DE9' },
  ];
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);

  const Hideshow = () => {
    setHide(!hide);
  };
  const Hideshow1 = () => {
    setHide1(!hide1);
  };
  const Hideshow2 = () => {
    setHide2(!hide2);
  };
  const Hideshow3 = () => {
    setHide3(!hide3);
  };
  const Grading = () => {
    history.push('/Grading');
  };
  const Film = () => {

    history.push('/facultyfilm', {
      film: film,
      urlid: urlid,
      description: description,
    });
  };
  const onClickrefresh = (s, indexValue) => {
    setSingleCourse(s);
    setChapterNumber(indexValue);
    
  }

  useEffect(() => {
    if (activityFilterData) {
      setFunActivityId('')
      setActionTimeId('')
      activityFilterData.map((item) => {
        let quizName = item.name.split('-')
        if (quizName[1].trim() == 'Fun Questions') {
          setFunActivityId(item.id)
        }
        if (quizName[1].trim() == 'Action Time') {
          setActionTimeId(item.id)
        }
      })
    }

  }, [activityFilterData])
  const Viewmark = (id) => {
    // history.push('/assessmentPreview');
    if (id) {
      history.push({
        pathname: '/assessmentPreview',
        state: {
          data:{
            cmid:id,
          }
        },
      });
    }
  };
  return (
    <div className={classes.root}>
      <Grid container item xs={12} md={12} sm={12} spacing={2}>
        <Grid item xs={12} sm={12} md={5}>
          <DataSection title="Course Content">
            <Grid
              container
              justifyContent="space-between"
              style={{ cursor: 'pointer', padding: '0px 15px' }}
              spacing={1}
            >
              {/* <Grid item md={1}>
                <img src={Forum} style={{ width: '40px' }} />
              </Grid>
              <Grid item md={11} style={{ paddingLeft: '15px' }}>
                <Typography
                  style={{ fontSize: '14px', padding: '10px 0px' }}
                  color="secondary"
                  className={classes.assessmentstyle}
                >
                  &nbsp;&nbsp;Forum
                </Typography>
              </Grid> */}
              <Grid item>
                <Typography>{/* <BsThreeDotsVertical/> */}</Typography>
              </Grid>
            </Grid>
            <div className={'hi brother'}>
              {chapter.map((s, index) => (
                <KenCard
                  paperStyles={{
                    background: colors[index % colors.length]?.bgColor,
                    color: colors[index % colors.length]?.color,
                    cursor: 'pointer',
                    padding: '12px 9px',
                    borderRadius: '0',
                    boxShadow: 'none',
                  }}
                >
                  <Grid container>
                    <Grid item md={6}>
                      <Typography
                        style={{ fontSize: '12px', paddingTop: "4px",fontWeight:'700',color:'black' }}
                        onClick={() => onClickrefresh(s, index + 1)}
                      >
                        CHAPTER {index + 1} : {s.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </KenCard>
              ))}
            </div>
          </DataSection>
        </Grid>
        {/* Activities */}
        <Grid item xs={12} sm={12} md={7}>
          <Card>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              style={{ margin: "10px 0px 10px 0px" }}
            >
              <Grid item md={4} sm={7} xs={4}>
                <Typography component="div" color="secondary">
                  <Box m={1} fontWeight="fontWeightBold">
                    Chapter {chapterNumber} : {singleCourse ? singleCourse.name : chapterData.name}
                  </Box>
                </Typography>
              </Grid>
              <Grid item md={4}>
                <KenButton
                  variant="primary"
                  style={{
                    height: 36,
                    marginRight: '20px',
                    float: 'right',
                    // width: 200,
                  }}
                  onClick={() => history.push('/StudentCompletion')}
                >
                  {' Student completion'}
                </KenButton>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <KenCard>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={4} style={{ marginTop: '7px' }}      onClick={Film}>
                    <Typography className={classes.videoHeadingStyle}>
                      <span>
                        <img
                          src={lmsVideoIcon}
                          alt=""
                          style={{ width: '40px', height: '40px' }}
                     
                        />
                        &nbsp; Film
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={4} onClick={Hideshow}>
                    {hide ? (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 10,
                          color: '#00B25D',
                          background: '#0000000a',
                        }}
                      >
                        {'Published'}
                      </KenButton>
                    ) : (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 10,
                          color: 'red',
                          background: '#0000000a',
                        }}
                      >
                        {'Unpublished'}
                      </KenButton>
                    )}
                  </Grid>
                  <Grid item md={2}>
                {/* <KenButton
                  style={{
                    height: 36,
                    marginLeft: '-47px',
                    marginTop: '10px',
                    background: '#0000000a',
                  }}
                  onClick={() => Viewmark(funActivityId)}
                >
                  {'view'}
                </KenButton> */}
              </Grid>
                  <Grid item md={2}>
                    <KenButton
                      variant="primary"
                      style={{
                        height: 36,
                        float: 'right',
                        width: 120,
                        marginTop: "10px"
                      }}
                      onClick={Grading}
                    >
                      {'Grading'}
                    </KenButton>
                  </Grid>
                </Grid>
              </KenCard>
            </Grid>
            <Grid container spacing={1}>
              <KenCard>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={4} style={{ marginTop: '7px' }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="secondary"
                      className={classes.presentationHeadingStyle}
                    >
                      <span>
                        <img
                          src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/presentation-icon.svg`}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        &nbsp;Fun Activity
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={4} onClick={Hideshow1}>
                    {hide1 ? (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 5,
                          color: '#00B25D',
                          background: '#0000000a',
                        }}
                      >
                        {'Published'}
                      </KenButton>
                    ) : (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 5,
                          color: 'red',
                          background: '#0000000a',
                        }}
                      >
                        {'Unpublished'}
                      </KenButton>
                    )}
                  </Grid>

                  <Grid item md={2}>
                <KenButton
                  style={{
                    height: 36,
                    marginLeft: '-47px',
                    marginTop: '10px',
                    background: '#0000000a',
                  }}
                  onClick={() => Viewmark(funActivityId)}
                >
                  {'view'}
                </KenButton>
              </Grid>
                  <Grid item md={2}>
                    <KenButton
                      variant="primary"
                      style={{
                        height: 36,
                        float: 'right',
                        width: 120,
                        marginTop: "10px"
                      }}
                      onClick={Grading}
                    >
                      {'Grading'}
                    </KenButton>
                  </Grid>
                </Grid>
              </KenCard>
            </Grid>
            <Grid container spacing={1}>
              <KenCard>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={4} style={{ marginTop: '7px' }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="secondary"
                      className={classes.presentationHeadingStyle}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: '#cbf0df',
                          color: '#185c37',
                          height: '40px',
                          width: '40px',
                        }}
                      >
                        <KenIcon
                          iconType={'img'}
                          icon={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/excelIcon.svg`}
                          styles={{
                            color: '#185c37',
                            height: '23px',
                            width: '23px',
                          }}
                        />
                      </Avatar>
                      <span style={{ color: '#185c37' }}>
                        &nbsp; Action Time
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={4} onClick={Hideshow2}>
                    {hide2 ? (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 5,
                          color: '#00B25D',
                          background: '#0000000a',
                        }}
                      >
                        {'Published'}
                      </KenButton>
                    ) : (
                      <KenButton
                        variant="warning"
                        style={{
                          height: 36,
                          marginRight: '10px',
                          marginTop: 5,
                          color: 'red',
                          background: '#0000000a',
                        }}
                      >
                        {'Unpublished'}
                      </KenButton>
                    )}
                  </Grid>
                  <Grid item md={2}>
                <KenButton
                  style={{
                    height: 36,
                    marginLeft: '-47px',
                    marginTop: '10px',
                    background: '#0000000a',
                  }}
                  onClick={() => Viewmark(actionTimeId)}
                >
                  {'view'}
                </KenButton>
              </Grid>

                  <Grid item md={2}>
                    <KenButton
                      variant="primary"
                      style={{
                        height: 36,
                        float: 'right',
                        width: 120,
                        marginTop: "10px"
                      }}
                      onClick={Grading}
                    >
                      {'Grading'}
                    </KenButton>
                  </Grid>
                </Grid>
              </KenCard>
              
            </Grid>
            <Grid container spacing={1}>
              <KenCard>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={4} style={{ marginTop: '7px' }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="secondary"
                      className={classes.presentationHeadingStyle}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: '#cbf0df',
                          color: '#185c37',
                          height: '40px',
                          width: '40px',
                        }}
                      >
                        <KenIcon
                          iconType={'img'}
                          icon={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/presentation-icon.svg`}
                          styles={{
                            color: '#185c37',
                            height: '23px',
                            width: '23px',
                          }}
                        />
                      </Avatar>
                      <span style={{ color: '#800000' }}>
                        &nbsp; Workbook Pdf
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <KenButton
                      variant="warning"
                      style={{
                        height: 36,
                        marginRight: '10px',
                        marginTop: 5,
                        color: 'red',
                        background: '#0000000a',
                      }}
                    >
                      {'view'}
                    </KenButton>
                  </Grid>
                </Grid>
              </KenCard>
            </Grid>
            <Grid container spacing={1}>
              <KenCard>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={4} style={{ marginTop: '7px' }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="secondary"
                      className={classes.presentationHeadingStyle}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: '#cbf0df',
                          color: '#185c37',
                          height: '40px',
                          width: '40px',
                        }}
                      >
                        <KenIcon
                          iconType={'img'}
                          icon={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/presentation-icon.svg`}
                          styles={{
                            color: '#185c37',
                            height: '23px',
                            width: '23px',
                          }}
                        />
                      </Avatar>
                      <span style={{ color: '#800000' }}>
                        &nbsp; Facilitator Manual
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <KenButton
                      variant="warning"
                      style={{
                        height: 36,
                        marginRight: '10px',
                        marginTop: 5,
                        color: 'red',
                        background: '#0000000a',
                      }}
                    >
                      {'view'}
                    </KenButton>
                  </Grid>
                </Grid>
              </KenCard>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div >
  );
}
