import React from 'react';
import { Box, Typography, Paper, makeStyles, Grid } from '@material-ui/core';
// import NotificationItem from './NotificationItem';
import SubjectIcon from '../../../assets/icons/Education.svg';
import { useTranslation } from 'react-i18next';
import context from '../../../utils/helpers/context';
import { getStudentDetails, getAllCourses } from '../../../utils/ApiService';
import { KEY_SEVERITY } from '../../../utils/constants';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: 16,
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    marginBottom: '1rem',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    marginRight: 8,
  },
  scrollWrap: {
    maxHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
}));

export default function Subjects() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleSnackbarOpen } = React.useContext(context);
  const [subjects, setSubjects] = React.useState();
  const contactId = getUserDetails().ContactId;
  const [loading, setLoading] = React.useState(true);

  const getSubjects = async () => {
    try {
      const res = await getStudentDetails(contactId);
      if (res && res.Program_Enrollment) {
        const current =
          res.Program_Enrollment.find(item => item.Status === 'Current') ||
          res.Program_Enrollment[0];
        const course = await getAllCourses(contactId, current.Id);
        if (course) {
          setSubjects(Object.values(course));
          setLoading(false);
        } else {
          setLoading(false);
          handleSnackbarOpen(KEY_SEVERITY.error, t('Course_Not_Found'));
        }
      } else {
        setLoading(false);
        handleSnackbarOpen(KEY_SEVERITY.error, t('Student_Not_Found'));
      }
    } catch (err) {
      console.log('Error in Fetching student data', err);
      setLoading(false);
      handleSnackbarOpen(KEY_SEVERITY.error, t('Student_Not_Found'));
    }
  };

  const userDetails = getUserDetails();

  React.useEffect(() => {
    getSubjects();
  }, []);

  return (
    <Box p={2}>
      <Typography className="cardHeader" style={{ marginBottom: '1rem' }}>
        {t('headings:Subjects')}
      </Typography>
      {loading ? (
        <Grid container justify="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Box className={classes.scrollWrap}>
          {subjects &&
            subjects[0].map((el, index) => {
              return (
                <Link
                  class="linkDecorationNone"
                  to={
                    userDetails
                      ? `/studentDetails/${userDetails?.ContactId}?courseName=${
                          el.hed__Course__cName
                        }`
                      : ''
                  }
                >
                  <Paper elevation={0} className={classes.root} key={index}>
                    <img className={classes.img} src={SubjectIcon} />
                    <Typography color="primary" className={classes.title}>
                      {el.hed__Course__cName}
                    </Typography>
                  </Paper>
                </Link>
              );
            })}
        </Box>
      )}
    </Box>
  );
}
