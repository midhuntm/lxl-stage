import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import { Tab, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AuthorizedVisitorsDataTable from './AuthorizedVisitorsDataTable';
import VisitorsHistoryDataTable from './VisitorsHistoryDataTable';
import KenColors from '../../../../utils/themes/KenColors';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ minHeight: '76vh' }}
      {...other}
    >
      {value === index && (
        <Box p={2}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper
  },
  tabHeads: {
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginTop: 5,
    marginRight: 8,
  },
  prRoot: {
    display: 'flex',
    margin: '15px 10px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    margin: 10,
  },
  controls: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    paddingLeft: '16px',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  bookTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.palette.KenColors.primary,
  },
  CrossButton: {
    position: 'absolute',
    right: '6px',
    bottom: '80px',
    cursor: 'pointer',
  },
  buyAllButton: {
    position: 'absolute',
    right: '5px',
    border: `1px solid ${theme.palette.KenColors.neutral60}`,
    padding: '0px 5px',
  },
  prPaper: {
    padding: '20px 13px',
  },
  buyButtons: {
    border: `1px solid ${theme.palette.KenColors.neutral60}`,
    padding: '0px 5px',
  },
  paneHeading: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.KenColors.neutral100,
  },
}));

export default function FullWidthTabs(props) {
  const { t } = useTranslation();
  const data = [
    {
      title: t('Authorized_Visitors'),
    },
    {
      title: t('Visitor_History'),
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="off"
            aria-label="full width tabs example"
            className={classes.tabHeads}
            style={{ overFlow: 'hidden' }}
          >
            {data.map((el, index) => {
              return (
                <Tab
                  classes={{ wrapper: classes.wrapper }}
                  label={el.title}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <AuthorizedVisitorsDataTable
                      title={''}
                      data={props.authorizedVisitors}
                      loading={props.loading}
                    />
                  </Grid>
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div>
                <Grid container>
                  <Grid item xs={12}>
                    <VisitorsHistoryDataTable
                      title={''}
                      data={props.visitorsHistory}
                      loading={props.loading}
                    />
                  </Grid>
                </Grid>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </div>
  );
}
