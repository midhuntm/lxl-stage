import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Time from './Components/Time';
import Grade from './Components/Grade';
import Tags from './Components/Tags';
import ExamDetails from './Components/ExamDetails';
import Layout from './Components/Layout';
import QuestionBehaviour from './Components/QuestionBehaviour';
import ReviewOptions from './Components/ReviewOptions/index';
import SafeExamBrowser from './Components/SafeExamBrowser';
import ExtraRestrictionsAttempt from './Components/ExtraRestrictionsAttempt';
import Appearance from './Components/Appearance';
import AssignStudent from './Components/AssignStudents/index';
// accordion

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Hidden } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CommonModuleSettings from './Components/CommonModule';
import RestrictAccess from './Components/RestrictAccess';
import ActivityCompletion from './Components/ActivityCompletion';
import Competencies from './Components/Competencies';
import KenLoader from '../../../../components/KenLoader';

const useStyles = makeStyles(theme => ({
  activeCard: {
    '&.active': {
      borderLeft: `2px solid ${theme.palette.KenColors.tertiaryPurple300}`,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  card: {
    border: 'none',
    '&.active': {
      borderLeft: `2px solid ${theme.palette.KenColors.tertiaryPurple300}`,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  heading: {
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
  },
  accordionRoot: {
    display: 'block',
  },
  boxMargin: {
    marginTop: 0,
  },
}));

export default function Assessment(props) {
  console.log(props);
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
  } = props;

  const classes = useStyles();

  const location = useLocation();
  const initialPath = location.hash !== '' ? location.hash : 'time';

  const arr = [
    { id: 'time', label: 'Time', content: <Time {...props} /> },
    { id: 'grade', label: 'Grade', content: <Grade {...props} /> },
    {
      id: 'questionBehaviour',
      label: 'Question Behaviour',
      content: <QuestionBehaviour {...props} />,
    },
    { id: 'layout', label: 'Layout', content: <Layout {...props} /> },
    { id: 'tags', label: 'Tags', content: <Tags {...props} /> },
    // { id: 'examDetails', label: 'Exam Details', content: <ExamDetails {...props} />, },
    { id: 'review', label: 'Review', content: <ReviewOptions {...props} /> },
    {
      id: 'appearance',
      label: 'Appearance',
      content: <Appearance {...props} />,
    },
    // { id: 'safeexambrowser', label: 'Safe Exam Browser', content: <SafeExamBrowser {...props} /> },
    // {
    //   id: 'extrarestrictionsattempt',
    //   label: 'Extra Restrictions on attempt',
    //   content: <ExtraRestrictionsAttempt {...props} />,
    // },
    // {
    //   id: 'commonmodulesettings',
    //   label: 'Common Module Settings',
    //   content: <CommonModuleSettings {...props} />,
    // },
    // {
    //   id: 'assignstudents',
    //   label: 'Assign Students',
    //   content: <AssignStudent {...props} />,
    // },
    {
      id: 'restrictaccess',
      label: 'Restrict Access',
      content: <RestrictAccess {...props} />,
    },
    // {
    //   id: 'activitycompletion',
    //   label: 'Activity Completion',
    //   content: <ActivityCompletion {...props} />,
    // },
    // {
    //   id: 'competencies',
    //   label: 'Competencies',
    //   content: <Competencies {...props} />,
    // },
  ];

  return (
    <>
      {/* {values.loading && <KenLoader />} */}
      <Box style={{ marginTop: -10 }}>
        {arr.map((item, index) => (
          <>
            <Hidden xsDown>
              <Box
                id={item.id}
                className={
                  initialPath === `#${item.id}`
                    ? `${classes.activeCard} active card-layout-wrap`
                    : `${classes.card} card-layout-wrap`
                }
              >
                <Box className={classes.boxMargin}>{item?.content}</Box>
              </Box>
            </Hidden>
            <Hidden smUp>
              <Grid xs={12}>
                <Box id={item.id} className={classes.boxMargin}>
                  <Accordion classes={{ root: classes.accordionRoot }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {item?.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      className={{ root: classes.accordionRoot }}
                    >
                      <Box className={classes.boxMargin}>{item?.content}</Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Hidden>
          </>
        ))}
      </Box>
    </>
  );
}
