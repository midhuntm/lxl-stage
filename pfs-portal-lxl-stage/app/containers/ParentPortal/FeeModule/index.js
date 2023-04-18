import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KenGrid from '../../../global_components/KenGrid';
import FeePaymentTable from './feePaymentData.json';
import KenCheckbox from '../../../global_components/KenCheckbox';
// import FeeTransactionTableData from './feeTransactionData.json';
import './style.scss';
import KenCard from '../../../global_components/KenCard';
import KenButton from '../../../global_components/KenButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
  getFeePaymentByContact,
  postFeePaymentUsingFlywire,
} from '../../../utils/ApiService';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import MyCartTable from '../FeeModule/MyCart';
import StudentServiceFeeTable from '../FeeModule/StudentServiceFeePayment';
import FeeScheduleTable from './FeeSchedule';
import FeeTransactionTable from './FeeTransactions';
import PaymentPage from '../FeeModule/PaymentPage';
import KenLoader from '../../../components/KenLoader';
import FeeCard from './FeeCard';
import moment from 'moment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    width: '100%',
    marginTop: '30px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardText: {
    fontSize: '30px',
    textAlign: 'initial',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    //  paddingBottom:'27px',
  },
  tableComponent: {
    marginBottom: 10,
  },
  amtTable: {
    width: '100%',
    height: 50,
  },
  amtTD: {
    // textAlign: 'center',
    color: '#00218D',
    fontSize: 15,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
  },
  heading: {
    fontSize: '18px',
    fontWeight: 400,
  },
  tabs: {
    width: '100%',
    marginTop: '30px',
    // boxShadow:'none',
    backgroundColor: 'white',
  },
  boxTable: {
    width: '100%',
    padding: 20,
    border: '0.6px solid #D7DEE9',
  },
  studentsInfo: {
    // fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19.5px',
    display: 'flex',
    alignItems: 'center',
    // letterSpacing: '0.44px',
    color: '#505F79',
    margin: '20px',
  },
  studentInfoTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19.5px',
    display: 'flex',
    alignItems: 'center',
    // letterSpacing: '0.44px',
    color: '#092682',
    margin: '20px',
  },
  textContent: {
    color: '#092682',
    fontSize: '12px',
  },
  textContentSpan: {
    // color: '#0077FF',
    fontSize: '12px',
  },
  inputFields: {
    // fontSize: 12,
    // padding:'8px',
    // margin:'10px',
  },
}));

const CollapseDataTransaction = props => {
  const [rows, setRows] = React.useState([]);
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="space-evenly" margin="10px">
          <div>
            <Typography className={classes.studentInfoTitle}>
              Transaction ID
            </Typography>
            <Typography className={classes.studentInfoTitle}>
              Reciept No.
            </Typography>
          </div>
          <div>
            <Typography className={classes.studentsInfo}>837987512</Typography>
            <Typography className={classes.studentsInfo}>283920</Typography>
          </div>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="space-evenly" margin="10px">
          <div>
            <Typography className={classes.studentInfoTitle}>
              Payment Type
            </Typography>
            <Typography className={classes.studentInfoTitle}>
              Remaining Amount
            </Typography>
          </div>
          <div>
            <Typography className={classes.studentsInfo}>UPI</Typography>
            <Typography className={classes.studentsInfo}>15,34,004</Typography>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default function CenteredGrid() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState();
  const [feePaymentData, setFeePaymentData] = React.useState(FeePaymentTable);
  const [data, setData] = React.useState([]);

  // console.log("feeTransactionData",feeTransactionData['FeeTransactionTableData']);
  const {
    state: { userDetails },
  } = useAppContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  //Group similar currency type objects in a single array
  function groupBy(objectArray, property) {
    return objectArray.reduce(function(acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  useEffect(() => {
    setLoading(true);
    const params = userDetails.ContactId;
    getFeePaymentByContact(params)
      .then(res => {
        setLoading(false);
        // debugger;
        try {
          if (res.success === 'true' || res.success === true) {
            //combine all PlannedPay in a single Array
            const arr = res['Data '].map(item => {
              return {
                ...item.PlannedPay,
                LateFeeData: item.LateFeeData,
                FeeInv: item.FeeInv,
                currency: item?.PlannedPay?.Currency_of_Payment__c,
                checked: item?.FeeInv?.['Partial_Payment_Allowed__c'],
                Remaining_Amount__c: item.PlannedPay.Remaining_Amount__c,
                Fee_Collection_Starts_on__c: moment(
                  item?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                    ?.Fee_Collection_Starts_on__c
                ).format('L'),
                Fee_Collection_End_Date__c: moment(
                  item?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                    ?.Fee_Collection_Ends_on__c
                ).format('L'),
                Late_Fee_Starts_on__c: moment(
                  item?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                    ?.Late_Fee_Starts_on__c
                ).format('L'),
              };
            });

            //Put "--" if there is no currency in an object so that further execution won't be disturbed
            const dataArray = arr.map(item => {
              if (!item.hasOwnProperty('Currency_of_Payment__c')) {
                return {
                  ...item,
                  Currency_of_Payment__c: 'NA',
                  currency: '--',
                };
              }
              return item;
            });

            //Group similar currency data together
            const groupedByCurrency = groupBy(
              dataArray,
              'Currency_of_Payment__c'
            );

            const finalArr = [];
            for (const key in groupedByCurrency) {
              const totalPendingAmount = groupedByCurrency[key].reduce(
                //sum of all remaining amounts
                (previousValue, currentValue) =>
                  previousValue + currentValue.Remaining_Amount__c,
                0
              );

              const totalAmount = groupedByCurrency[key].reduce(
                //sum of similar currency amounts
                (previousValue, currentValue) =>
                  previousValue + currentValue.Total_Fee_Amount_Formula__c,
                0
              );

              // console.log(`${key}`);

              finalArr.push({
                [key]: groupedByCurrency[key],
                totalPendingAmount: totalPendingAmount,
                totalAmount: totalAmount,
                currency: key,
                data: groupedByCurrency[key],
              });
            }

            console.log(`finalArr in module`, finalArr);
            setData(finalArr);
            setLoading(false);
          }
        } catch (error) {
          console.log('error', error);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      <Grid container spacing={2}>
        {data?.length > 0 &&
          data?.map(item => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FeeCard
                  primaryText={`${item.currency}, ${item.totalPendingAmount}`}
                  subText={`Total Pending Fees`}
                />
              </Grid>
            );
          })}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          {/* <Box display="flex" justifyContent="space-between"> */}
          <FeeCard primaryText="30-09-2022" subText="Next Installment Due" />
          {/* <Button
              variant="outlined"
              color="secondary"
              style={{
                // width: '40%',
                width: '260px',
                height: '100%',
                backgroundColor: 'white',
                borderWidth: 'medium',
                borderColor: '#092682',
                display: 'block',
                borderRadius: 13,
              }}
              // disabled
            >
              <div>
                <Typography className={classes.cardText}>USD 40,000</Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '15px',
                    fontFamily: 'sans-serif',
                    textAlign: 'initial',
                    color: 'grey',
                    textTransform: 'none',
                  }}
                >
                  Total Pending Fees (2024-24)
                </Typography>
              </div>
            </Button> */}
          {/* <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: '100px',
                // width: '38%',
                width: '240px',
                height: '100%',
                backgroundColor: 'white',
                borderWidth: 'medium',
                borderColor: '#092682',
                display: 'block',
                borderRadius: 13,
              }}
              // disabled
            >
              <div>
                <Typography className={classes.cardText}>30-09-2022</Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '15px',
                    fontFamily: 'sans-serif',
                    textAlign: 'initial',
                    color: 'grey',
                    textTransform: 'none',
                  }}
                >
                  Next Installment Due
                </Typography>
              </div>
            </Button> */}
          {/* </Box> */}
        </Grid>
        <Grid item xs={5}>
          {''}
        </Grid>
      </Grid>
      <div>
        <div className={classes.root1}>
          <Accordion
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>FEE CART</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: 'block',
              }}
            >
              <MyCartTable />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={classes.tabs}>
          <AppBar
            position="static"
            color="#ffffff"
            style={{ boxShadow: 'none' }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              //   indicatorColor="primary"
              textColor="primary"
              variant="standard"
            >
              <Tab label="Fee Payment" {...a11yProps(0)} />
              <Tab label="Fee Schedule" {...a11yProps(1)} />
              <Tab label="Transactions" {...a11yProps(2)} />
              <Tab label="Student Service Fee" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <PaymentPage />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <FeeScheduleTable />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <FeeTransactionTable />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <StudentServiceFeeTable />
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}
