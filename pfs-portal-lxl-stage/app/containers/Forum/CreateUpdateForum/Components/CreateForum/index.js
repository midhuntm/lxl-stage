import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Hidden } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import KenLoader from '../../../../../components/KenLoader';
import Availability from '../Components/Availabilty';
import ForumType from '../Components/ForumType';
import Attachments from '../Components/Attachments';
import SubscriptionTracking from '../Components/SubscriptionTracking';
import ThresholdBlocking from '../Components/ThresholdBlocking';
import DiscussionLocking from '../Components/DiscussionLocking';

const useStyles = makeStyles(theme => ({
  activeCard: {
    '&.active': {
      borderLeft: `2px solid ${theme.palette.KenColors.tertiaryPurple300}`,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    }
  },
  card: {
    border: 'none',
    '&.active': {
      borderLeft: `2px solid ${theme.palette.KenColors.tertiaryPurple300}`,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    }
  },
  heading: {
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
  },
  accordionRoot: {
    display: 'block',
  },
  boxMargin: {
    marginTop: 0
  }
}));

export default function CreateForum(props) {
  console.log(props)
  const { values, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;

  const classes = useStyles();

  const location = useLocation();
  const initialPath = location.hash !== '' ? location.hash : 'time';

  const arr = [
    { id: 'availability', label: 'Availability', content: <Availability {...props} /> },
    { id: 'forumType', label: 'Forum Type', content: <ForumType {...props} /> },
    { id: 'attachements', label: 'Attachments', content: <Attachments {...props} /> },
    { id: 'subscriptionTracking', label: 'Subscription & Tracking', content: <SubscriptionTracking {...props} /> },
    { id: 'discussionLocking', label: 'Discussion locking', content: <DiscussionLocking {...props} /> },
    { id: 'thresholdBlocking', label: 'Post Threshold for Blocking', content: <ThresholdBlocking {...props} /> },
   ];

  return (
    <>
      <Box style={{ marginTop: -10 }}>
        {arr.map((item, index) => (
          <>
            <Hidden xsDown>
              <Box
                id={item.id}
                className={initialPath === `#${item.id}` ?
                  `${classes.activeCard} active card-layout-wrap` : `${classes.card} card-layout-wrap`}>
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
                    <AccordionDetails className={{ root: classes.accordionRoot }} >
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
