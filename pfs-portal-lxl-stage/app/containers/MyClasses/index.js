import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import SubjectCard from './components/card';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 18,
    fontWeight: 600,
  },
  courseName: {
    fontSize: 14,
  },
  container: {
    backgroundColor: theme.palette.KenColors.kenWhite,
  },
}));

const subjects = [
  {
    title: 'DBMS',
    description:
      'A database management system (or DBMS) is essentially nothing more than a computerized data-keeping system. Users of the system are given facilities to perform several kinds of operations on such a system for either manipulation of the data in the database.',
    image:
      'https://www.interviewbit.com/blog/wp-content/uploads/2021/08/dbms.jpg',
    progressValue: 60,
    faculty: 'Karan Premi',
    time: 'Monday, 8:00',
    progress: '02',
    completed: '01',
  },
  {
    title: 'Digital Electronics',
    description: `Digital electronics deals with the electronic manipulation of numbers, or with the manipulation of varying quantities by means of numbers. `,
    image: 'https://m.media-amazon.com/images/I/41X5zWDXENS.jpg',
    progressValue: 0,
    faculty: 'Virendar Singh',
    time: 'Saturday, 1:39',
  },
  {
    title: 'Value and Ethics',
    description: `Ethics refers to the guidelines for conduct, that address question about morality. Value is defined as the principles and ideals`,
    image:
      'https://previews.123rf.com/images/bestdesign36/bestdesign361706/bestdesign36170603896/81069755-vector-conceptual-core-values-integrity-ethics-concept-word-cloud-isolated-on-background.jpg',
    progressValue: 0,
    faculty: 'Yamraj Chaudhary',
    time: 'Monday, 1:00',
  },
  {
    title: 'Operating System',
    description: `An Operating System (OS) is an interface between a computer user and computer hardware. `,
    image:
      'https://www.moviesonline.ca/wp-content/uploads/2021/09/Top-10-Best-Operating-Systems-for-Laptops-and-Computers-4.jpg ',
    progressValue: 0,
    faculty: 'Pratibha Chaudhary',
    time: 'Tuesday, 4:00',
  },
  {
    title: 'Numerical Analysis',
    description: `Numerical analysis is the study of algorithms that use numerical approximation .`,
    image:
      'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_356,h_350/https://examplespedia.com/wp-content/uploads/2018/07/Numerical-Analysis-as-a-Science-and-As-an-Art_com.jpg',
    progressValue: 0,
    faculty: 'Yasmin Khan',
    time: 'Wednesday, 4:12',
  },
  {
    title: 'Python Programming',
    description: `Python is a powerful general-purpose programming language. It is used in web development.`,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
    progressValue: 0,
    faculty: 'Upendar Yadav',
    time: 'Wednesday, 4:40',
  },
  {
    title: 'Web Technology',
    description: `Web Technology refers to the various tools and techniques that are utilized in the process of communication.`,
    image:
      'https://cdn.eternalorganizer.com/wp-content/uploads/2017/09/04204517/Web.png',
    progressValue: 0,
    faculty: 'Raman Singh',
    time: 'Thursday, 3:00',
  },
];

export default function MyClasses() {
  const styles = useStyles();
  return (
    <Box>
      <Grid
        container
        spacing={2}
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Grid item>
          <Typography className={styles.title}>My Classes</Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.courseName}>
            Computer Science-2021
          </Typography>
        </Grid>
      </Grid>
      <Box className={styles.container} p={2}>
        <Grid container spacing={2}>
          {subjects.map(el => {
            return (
              <Grid item>
                <SubjectCard data={el} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
