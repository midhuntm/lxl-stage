import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import { Tab, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TutionFeesDataTable from './tutionFeesDataTable';
import PaymentHistoryDataTable from './paymentHistoryDataTable';
import PurchaseRequest from '../../../../../app/assets/PurchaseRequest.svg';
import CrossButton from '../../../../../app/assets/icons/Vector.svg';
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
  tableGrid: {
    marginLeft: ' -13px',
    width: '102.55%',
  },
  tabHeads: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: '3px',
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
    width: '56px',
    height: '72px',
    margin: '10px',
    borderRadius: '3px',
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
    padding: '25px 13px',
    height: '550px',
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
  tableCaption: {
    fontWeight: 400,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
}));

export default function FullWidthTabs(props) {
  const { t } = useTranslation();
  const { pendingLoading, historyLoading } = props;
  const data = [
    {
      title: `${t('headings:Payments')} (${props.tutionFees.length})`,
    },
    {
      title: `${t('headings:Payment_History')}`,
    },
  ];

  const books = [
    {
      title: 'Medical Psychology for undergraduate students',
      price: 3000,
    },
    {
      title: 'Problem solving skills for undergraduate students',
      price: 3000,
    },
    {
      title: 'Professional ethics for undergraduate students',
      price: 3000,
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
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              style={{ backgroundColor: '#F4F6FC' }}
            >
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ paddingLeft: '0px' }}>
                    <TutionFeesDataTable
                      title={
                        <Typography className={classes.tableCaption}>
                          {t('headings:Tuition_Fees')}: 2021-22
                        </Typography>
                      }
                      data={props.tutionFees}
                      loading={pendingLoading}
                      {...props}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={4} style={{ paddingRight: "0px" }}>
                    <Paper className={classes.prPaper}>
                      <div className={classes.controls}>
                        <Typography className={classes.paneHeading}>
                          {t("headings:Purchase_Requests")} ({books.length}){" "}
                        </Typography>
                        <Button className={classes.buyAllButton}>
                          {t("labels:Buy_All")}
                        </Button>
                      </div>
                      {books.map((book, index) => {
                        return (
                          <Card className={classes.prRoot}>
                            <CardMedia
                              className={classes.cover}
                              image={PurchaseRequest}
                            />
                            <div className={classes.details}>
                              <CardContent className={classes.content}>
                                <Typography className={classes.bookTitle}>
                                  {book.title}
                                </Typography>
                              </CardContent>
                              <div className={classes.controls}>
                                <Typography> ₹ {book.price}</Typography>
                                <Button
                                  className={classes.buyButtons}
                                  style={{ position: "absolute", right: "5px" }}
                                >
                                  {t("labels:Buy")}
                                </Button>
                                <img
                                  src={CrossButton}
                                  className={classes.CrossButton}
                                />
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </Paper>
                  </Grid> */}
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div>
                <Grid container className={classes.tableGrid}>
                  <Grid item xs={12}>
                    <PaymentHistoryDataTable
                      title={''}
                      data={props.paymentHistory}
                      loading={historyLoading}
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
