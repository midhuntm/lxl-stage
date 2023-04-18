import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LinearProgressBar from './linearProgress';
import FileIcon from '../../../assets/Images/FileIcon.svg';
import FileIcon1 from '../../../assets/Images/FileIcon1.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  titleContainer: {
    background: theme.palette.KenColors.kenWhite,
    padding: 16,
  },
  title: {
    color: theme.palette.KenColors.primary,
    fontSize: 18,
    fontWeight: 600,
  },
  typoComplete: {
    color: theme.palette.KenColors.green,
    fontSize: 14,
    fontWeight: 600,
  },
  typoCourse: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 14,
    fontWeight: 600,
    borderBottom: `1px solid #DFE1E6`,
    paddingBottom: 8,
  },
  courseListContainer: {
    marginTop: 16,
  },
  typoLessonContainer: {
    background: '#E7F4FB',
    border: '1px solid #138CD1',
    borderRadius: '3px',
    margin: '8px 8px 8px 16px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  typoLesson: {
    color: '#138CD1',
    fontSize: 14,
    fontWeight: 600,
  },
  lessonContainer: {
    border: '1px solid #DFE1E6',
    padding: 8,
  },
  innerCourseListContainer: {
    borderRight: `1px solid #DFE1E6`,
    background: theme.palette.KenColors.kenWhite,
    marginTop: 8,
  },
  startButton: {
    color: theme.palette.KenColors.primary,
    fontSize: 14,
    fontWeight: 600,
  },
  typoLessonDes: {
    fontSize: 13,
  },
  courseDescription: {
    background: theme.palette.KenColors.kenWhite,
    paddingRight: 40,
    marginTop: 8,
  },
  typoCourseProgress: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  progressContainer: {
    background: theme.palette.KenColors.kenWhite,
    padding: 8,
  },
  typoProgress: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral100,
  },
  typoCourseProgressNum: {
    fontSize: 24,
    fontWeight: 600,
  },
  pendingTaskContainer: {
    background: theme.palette.KenColors.kenWhite,
    padding: 8,
    marginTop: 16,
  },
  typoTasks: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
  },
  dateContainer: {
    borderRight: `1px solid #DFE1E6`,
  },
  typoTaskTitle: {
    color: theme.palette.KenColors.primary,
    fontSize: 13,
    fontWeight: 600,
  },
  typoTaskDuration: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 10,
    fontWeight: 600,
  },
  typoMonth: {
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
  },
  typoDate: {
    fontSize: 16,
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
  },
  typoCompletedProgress: {
    fontSize: 10,
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
  },
  button: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const lessons = [
  {
    title: '1. Database Storage Structures',
    description: [
      {
        AssessmentName: 'Introduction ',
        completed: 100,
      },
      {
        AssessmentName: 'Database',
        completed: 25,
      },
      {
        AssessmentName: 'Indexing, Hashing, Clusters',
        completed: 25,
      },
      {
        AssessmentName: 'Data Dictionary and Dictionary Views',
        completed: 0,
      },
    ],
  },
  {
    title: '2. Data Models',
    description: [
      {
        AssessmentName: 'Introduction to various data models ',
        completed: 100,
      },
      {
        AssessmentName: 'Cardinality Ratio & Relationships',
        completed: 25,
      },
      {
        AssessmentName: 'Representation of entities, relationship',
        completed: 25,
      },
      {
        AssessmentName: 'Codd’s rules',
        completed: 0,
      },
    ],
  },
  {
    title: '3. Relational Database design',
  },
  {
    title: '4. Transaction Management',
  },
  {
    title: '5. Backup and Recovery Techniques',
  },
];

const courseProgress = [
  {
    title: 'In Progress',
    number: '02',
    styles: { color: '#FF9D54' },
  },
  {
    title: 'Completed',
    number: '02',
    styles: { color: '#52C15A' },
  },
  {
    title: 'Yet to Start',
    number: '01',
    styles: { color: '#B3BAC5' },
  },
];

const taskPending = [
  {
    title: 'Periodic assessment 1',
    month: 'Oct',
    date: '18',
    completed: 0,
  },
  {
    title: 'Periodic assessment 4',
    month: 'Nov',
    date: '20',
    completed: 0,
  },
  {
    title: 'Periodic assessment 8',
    month: 'Dec',
    date: '2',
    completed: 0,
  },
  {
    title: 'Periodic assessment 11',
    month: 'Jan',
    date: '7',
    completed: 0,
  },
];

const taskCompleted = [
  {
    title: 'Periodic assessment 2',
    month: 'Oct',
    date: '20',
    completed: 100,
    link: '/studentPerformance',
  },
  {
    title: 'Periodic assessment 7',
    month: 'Oct',
    date: '25',
    completed: 100,
    link: '/studentPerformance',
  },
];

export default function ClassDetails() {
  const classes = useStyles();
  const [description, setDescription] = useState(lessons[0]?.description);
  const [title, setTitle] = useState(lessons[0]?.title);
  const [task, setTask] = useState(taskPending);

  const handleOnClick = index => {
    if (index < 2) {
      setDescription(lessons[index]?.description);
      setTitle(lessons[index]?.title);
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justify="space-between"
        alignItems="center"
        direction="row"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>DBMS</Typography>
        </Grid>
        <Grid item>
          <Box>
            <Grid container alignItems="center" spacing={2}>
              <Grid item style={{ width: 200 }}>
                <LinearProgressBar value={60} />
              </Grid>
              <Grid item>
                <Typography>60% completed</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box p={1} className={classes.courseListContainer}>
        <Grid container spacing={2}>
          <Grid item md={3} className={classes.innerCourseListContainer}>
            <Box>
              <Typography className={classes.typoCourse}>
                Course Chapter
              </Typography>
              <Grid
                container
                spacing={2}
                direction="column"
                style={{ marginTop: 8 }}
              >
                {lessons.map((el, index) => {
                  return (
                    <Grid
                      item
                      onClick={() => {
                        handleOnClick(index);
                      }}
                      className={classes.typoLessonContainer}
                    >
                      <Typography className={classes.typoLesson}>
                        {el.title}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid item md={5} className={classes.courseDescription}>
            <Typography className={classes.typoCourse}>{title}</Typography>
            <Box>
              <Grid
                container
                spacing={2}
                direction="column"
                style={{ marginTop: 8, marginLeft: 8, paddingRight: 24 }}
              >
                <Grid item>
                  <>
                    {description.map(el => {
                      return (
                        <Grid
                          container
                          spacing={2}
                          className={classes.lessonContainer}
                        >
                          <Grid item md={2}>
                            <img src={FileIcon} />
                          </Grid>
                          <Grid item md={8}>
                            <>
                              <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                              >
                                <Grid
                                  item
                                  container
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    <Typography
                                      className={classes.typoLessonDes}
                                    >
                                      {el?.AssessmentName}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      className={classes.typoLessonDes}
                                    >
                                      13 min
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                  <LinearProgressBar value={el?.completed} />
                                </Grid>
                              </Grid>
                            </>
                          </Grid>
                          <Grid
                            item
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            md={2}
                          >
                            <Typography className={classes.startButton}>
                              Start
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={4}>
            <>
              <Box className={classes.progressContainer}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography className={classes.typoCourseProgress}>
                      Course Progress
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.typoCourseProgress}>
                      Total Courses 05
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  style={{ marginTop: 16 }}
                >
                  {courseProgress.map(el => {
                    return (
                      <Grid item>
                        <>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography className={classes.typoProgress}>
                                {el?.title}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                className={classes.typoCourseProgressNum}
                                style={el.styles}
                              >
                                {el.number}
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Box className={classes.pendingTaskContainer}>
                <Grid container justifyContent="space-evenly">
                  <Grid
                    item
                    onClick={() => {
                      setTask(taskPending);
                    }}
                    className={classes.button}
                  >
                    <Typography className={classes.typoTasks}>
                      Pending Tasks
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    onClick={() => {
                      setTask(taskCompleted);
                    }}
                    className={classes.button}
                  >
                    <Typography className={classes.typoTasks}>
                      Completed Tasks
                    </Typography>
                  </Grid>
                </Grid>
                {task.map(el => {
                  return (
                    <Link to={el?.link}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        style={{ width: '100%', marginTop: 16 }}
                      >
                        <Grid item className={classes.dateContainer}>
                          <>
                            <Grid
                              container
                              direction="column"
                              style={{ width: 28 }}
                            >
                              <Grid item>
                                <Typography className={classes.typoMonth}>
                                  {el.month}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.typoDate}>
                                  {el.date}
                                </Typography>
                              </Grid>
                            </Grid>
                          </>
                        </Grid>
                        <Grid item>
                          <>
                            <Grid container>
                              <Grid item container direction="row" spacing={2}>
                                <Grid
                                  item
                                  container
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <img src={FileIcon1} />
                                  </Grid>
                                  <Grid item>
                                    <>
                                      <Grid container direction="column">
                                        <Grid item>
                                          <Typography
                                            className={classes.typoTaskTitle}
                                          >
                                            {el.title}
                                          </Typography>
                                        </Grid>
                                        <Grid item>
                                          <Typography
                                            className={classes.typoTaskDuration}
                                          >
                                            1.00 hr | 20 marks
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </>
                                  </Grid>
                                </Grid>
                                <Grid item md={12}>
                                  <>
                                    <Grid
                                      container
                                      direction="row"
                                      alignItems="center"
                                    >
                                      <Grid item md={8}>
                                        <LinearProgressBar
                                          value={el.completed}
                                        />
                                      </Grid>
                                      <Grid item md={4}>
                                        <Typography
                                          className={
                                            classes.typoCompletedProgress
                                          }
                                        >
                                          {el.completed}% Completed
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        </Grid>
                      </Grid>
                    </Link>
                  );
                })}
              </Box>
            </>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
