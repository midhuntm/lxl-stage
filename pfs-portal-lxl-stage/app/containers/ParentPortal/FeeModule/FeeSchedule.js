
import React ,{useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
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
import FeeScheduleTableData from '../FeeModule/feeSchedule.json';
import KenCheckbox from '../../../global_components/KenCheckbox';
import './style.scss'
import KenCard from '../../../global_components/KenCard';
import moment from 'moment';
import KenButton from '../../../global_components/KenButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import { getFeePaymentByContact, getStudentDetailsByContact, postFeePaymentUsingFlywire } from '../../../utils/ApiService';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import KenLoader from '../../../components/KenLoader';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    root1: {
      width: '95%',
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
      width: '95%',
      marginTop: '30px',
      // boxShadow:'none',
      backgroundColor: 'white',
    },
    boxTable:{
      width:'100%',
      padding:20,
      border:'0.6px solid #D7DEE9'
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
      margin:'20px',
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
      margin:'20px',
    },
    textContent:{
      color:'#092682',
      fontSize: '12px',
    },
    textContentSpan:{
      // color: '#0077FF',
      fontSize: '12px',
    },
    inputFields: {
      // fontSize: 12,
      // padding:'8px',
      // margin:'10px',
    },
  }));

  const CollapseData = props => {
    const [rows, setRows] = React.useState([]);
    const classes = useStyles();
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="space-evenly" margin='10px'>
          <div>
          <Typography className={classes.studentInfoTitle}>
    Total Fee Due
  </Typography>
          <Typography className={classes.studentInfoTitle}>
    Late Fee
  </Typography>
          </div>
          <div>
          <Typography className={classes.studentsInfo}>
  30,00,000
  </Typography>
          <Typography className={classes.studentsInfo}>
    500 per day
  </Typography>
          </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex"  justifyContent="space-evenly" margin='10px'>
          <div>
          <Typography  className={classes.studentInfoTitle}>
    Installment Type
  </Typography>
          <Typography  className={classes.studentInfoTitle}>
    Installment No.
  </Typography>
          </div>
          <div>
          <Typography  className={classes.studentsInfo}>
   Quarterly
  </Typography>
          <Typography className={classes.studentsInfo}>
    2
  </Typography>
          </div>
          </Box>
        </Grid>
      </Grid>
    );
  };

export default function feeScheduleTable(){
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const [regID, setRegID] = useState();
    const [studentCategory, setStudentCategory] = useState();
    const [admissionYear, setAdmissionYear] = useState();
    const [studentName, setStudentName] = useState();
    const [studentClass, setStudentClass] = useState();
    const {
      state: { userDetails },
    } = useAppContext();
    // const [feeScheduleData, setFeeScheduleData] = React.useState(FeeScheduleTableData);

    const FeeSchedulecolumn = [
        {
          Header: 'Fee Type',
          accessor: 'Fee_Type__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Currency',
          accessor: 'Currency',
          disableGlobalFilter: true,
        },
        {
          Header: 'Due Amount',
          accessor: 'Remaining_Amount__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Start Date',
          accessor: 'Fee_Collection_Starts_on__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Due Date',
          accessor: 'Fee_Collection_End_Date__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Late Fee Start Date',
          accessor: 'Late_Fee_Starts_on__c',
          disableGlobalFilter: true,
        },
      ];

      useEffect(() => {
        setLoading(true);
        const params = userDetails.ContactId;
        getStudentDetailsByContact(params).then(resp => {
          let studentDetails = resp;
          setRegID(studentDetails?.Data['Registration_Number__c']);
          setStudentCategory(studentDetails?.Data['Fee_Category_of_the_Students__c']);
          setAdmissionYear(studentDetails?.Data['Year_of_Joining__c']);
          setStudentClass(studentDetails['ProgramPlan']);
        })
      }, []);
      useEffect(() => {
        setLoading(true);
        const params = userDetails.ContactId;
        getFeePaymentByContact(params)
          .then(res => {
            setLoading(false);
            if (res.success) {
              let apiResponse = res?.['Data '];
              let tableData = [];
              apiResponse.map((value) => {
                tableData.push({
                  ...value.PlannedPay,
                  Fee_Collection_Starts_on__c: moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Fee_Collection_Starts_on__c
                  ).format('L'),
                  Fee_Collection_End_Date__c: moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Fee_Collection_Ends_on__c
                  ).format('L'),
                  Late_Fee_Starts_on__c: moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Late_Fee_Starts_on__c
                  ).format('L'),
                  Currency:value?.PlannedPay?.Currency_of_Payment__c,
                });
              });
    
              setData(tableData);
              if (res?.['Data '].length > 0) {
                setLoading(false);
                let totalFeeAmt = tableData.reduce(
                  (sum, row) => row?.amount + sum,
                  0
                );
                setAmtToPay(formatCurrency('INR', totalFeeAmt));
                setAPIAmt(totalFeeAmt);
                setDueAmt(formatCurrency('INR', totalFeeAmt));
              }
            }
          })
          .catch(err => {
            setLoading(false);
          });
      }, []);

      return(
        <>
       <div className={classes.tableComponent}>
       {loading && <KenLoader />}
                <KenCard paperStyles={{ padding: 16 }}>
            <div className='KenDivFeeSchedule'>
                  <KenGrid
                    columns={FeeSchedulecolumn}
                    data={data}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                     isCollasable={true}
              component={CollapseData}
                    toolbarDisabled={true}
                    gridProps={{
                      getRowProps: row => ({
                        isCollasable: true,
                      }),
                      getHeaderProps: cell => ({
                        style: {
                          textAlign:
                            cell.id === 'Fee_Type__c' ? 'left' : 'column',
                            paddingLeft:cell.id === 'Fee_Type__c' ? '66px' : '0px',
                        },
                    }),
                      getCellProps: cell => ({
                        style: {
                          textAlign:
                            cell.column.id === 'Fee_Type__c' ? 'left' : 'column',
                        },
                      }),
                    }}
                  />
                </div>
                </KenCard>
                </div>
           </>
      )
};



