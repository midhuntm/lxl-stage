import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Attendence from '../../components/Attendence/attendence';
import Assignments from '../../components/Assignments/assignments';
import Assessments from '../../components/Assessments/assessments';
import Assessment from '../../../../assets/icons/clipboard.svg';
import AssignmentsIcon from '../../../../assets/icons/Assignments.svg';
import FeedbackIcon from '../../../../assets/icons/feedback.svg';
import {useTranslation} from 'react-i18next';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '11px',
  },
  image: {
    marginTop: 5,
    marginRight: 8,
  },
}));

export default function SimpleTabs(props) {
  const {t} = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="off"
        aria-label="full width tabs example"
      >
        <Tab
          icon={<img className={classes.image} src={Assessment} />}
          classes={{ wrapper: classes.wrapper }}
          label={`${t('headings:Attendance')}`}
          {...a11yProps(0)}
        />
        <Tab
          icon={<img className={classes.image} src={AssignmentsIcon} />}
          classes={{ wrapper: classes.wrapper }}
          label={`${t('headings:Assignments')}`}
          {...a11yProps(1)}
        />
        <Tab
          icon={<img className={classes.image} src={Assessment} />}
          classes={{ wrapper: classes.wrapper }}
          label={`${t('headings:Assesments')}`}
          {...a11yProps(2)}
        />
        <Tab
          icon={<img className={classes.image} src={FeedbackIcon} />}
          classes={{ wrapper: classes.wrapper }}
          label={`${t('headings:Feedback')}`}
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Attendence />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Assignments {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Assessments {...props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {t("Coming_soon")} ...
      </TabPanel>
    </div>
  );
}
