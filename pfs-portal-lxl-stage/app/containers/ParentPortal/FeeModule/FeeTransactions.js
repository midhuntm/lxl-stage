
import React ,{useState , useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import KenGrid from '../../../global_components/KenGrid';
import FeeTransactionTableData from '../FeeModule/feeTransactionData.json';
import './style.scss'
import KenCard from '../../../global_components/KenCard';
import KenButton from '../../../global_components/KenButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import { getMyReceiptsByContact, getMyTransactionsByContact, getStudentDetailsByContact, postFeePaymentUsingFlywire } from '../../../utils/ApiService';
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

  const CollapseDataTransaction = props => {
    const [rows, setRows] = React.useState([]);
    const classes = useStyles();

  
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="space-evenly" margin='10px'>
          <div>
          <Typography className={classes.studentInfoTitle}>
    Transaction ID
  </Typography>
          <Typography className={classes.studentInfoTitle}>
    Reciept No.
  </Typography>
          </div>
          <div>
          <Typography className={classes.studentsInfo}>
  837987512
  </Typography>
          <Typography className={classes.studentsInfo}>
    283920
  </Typography>
          </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex"  justifyContent="space-evenly" margin='10px'>
          <div>
          <Typography  className={classes.studentInfoTitle}>
    Payment Type
  </Typography>
          <Typography  className={classes.studentInfoTitle}>
   Remaining Amount
  </Typography>
          </div>
          <div>
          <Typography  className={classes.studentsInfo}>
   UPI
  </Typography>
          <Typography className={classes.studentsInfo}>
    15,34,004
  </Typography>
          </div>
          </Box>
        </Grid>
      </Grid>
    );
  };

export default function feeTransactionTable(){
    const classes = useStyles();
    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [regID, setRegID] = useState();
    const [studentCategory, setStudentCategory] = useState();
    const [admissionYear, setAdmissionYear] = useState();
    const [studentClass, setStudentClass] = useState();
    const { state: { userDetails }, } = useAppContext();
    // const [feeTransactionData, setTransactionData] = React.useState(FeeTransactionTableData);

    const FeeTransactioncolumn = [
        { 
          Header: 'S.No.',
          accessor: 'S_No',
          disableGlobalFilter: true,
        },
        { 
          Header: 'Currency',
          accessor: 'currency_Name',
          disableGlobalFilter: true,
        },
        {
          Header: 'Transaction Date',
          accessor: 'Date__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Payment Mode',
          accessor: 'Payment_mode',
          disableGlobalFilter: true,
        },
        {
          Header: 'Particulars',
          accessor: 'Fee_Type__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Paid Amount',
          accessor: 'Amount__c',
          disableGlobalFilter: true,
        },
        {
          Header: 'Reciept',
          accessor: 'Receipt_ID__c',
          Cell: ({ value, row }) => {
            return (
              <Typography >
                <VisibilityIcon color='primary'/> <GetAppIcon  onClick={event => downloadReceipt(event, row, data)} color='primary'/>
              </Typography>
            );
          },
          disableGlobalFilter: true,
        },
      ];

      useEffect(() => {
        setLoading(true);
        const params = userDetails.ContactId;
        getMyTransactionsByContact(params)
          .then(res => {
            setLoading(false);
            if (res.success) {
              let apiResponse = res?.['Data'];
              let tableData = [];
              apiResponse.map((value, index) => {
                tableData.push({
                  ...value.actualPay,
                  Date__c: moment(value?.actualPay?.Date__c).format('L'),
                  Receipt_Number__c:
                    value.actualPay.Record_Receipt_Id__r != undefined
                      ? value.actualPay.Record_Receipt_Id__r.Receipt_Number__c
                      : '',
                  S_No: index + 1,
                  Remaining_Amount__c:
                    value.plannedPay != undefined
                      ? value.plannedPay.Remaining_Amount__c
                      : 0,
                  attachment: value.attachment,
                });
              });
              console.log('tableData', tableData);
              setData(tableData);
            }
          })
          .catch(err => {
            setLoading(false);
          });
      }, []);

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

      const downloadReceipt = (event, row, data) => {
        console.log(event, row, data, data[row.index].attachment?.Id);
        const params = data[row.index].attachment?.Id;
        getMyReceiptsByContact(params)
          .then(res => {
            const blob = new Blob([res], { type: 'application/pdf' });
            saveAs(blob, 'Receipt.pdf');
          })
          .catch(err => {
            console.log('Err: ', err);
          });
      };

      return(
        <>
        <div className={classes.tableComponent}>
        {loading && <KenLoader />}
                <KenCard paperStyles={{ padding: 16 }}>
            <div className='KenDivFeeSchedule'>
                  <KenGrid
                    columns={FeeTransactioncolumn}
                    data={data}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                     isCollasable={true}
              component={CollapseDataTransaction}
                    toolbarDisabled={true}
                    gridProps={{
                      getRowProps: row => ({
                        isCollasable: true,
                      }),
                      getHeaderProps: cell => ({
                        // isCollasable: true,
                        style: {
                          textAlign:
                            cell.id === 'Sl_No' ? 'left' : 'column',
                            paddingLeft:cell.id === 'Sl_No' ? '50px' : '0px',
                        },
                    }),
                      getCellProps: cell => ({
                        style: {
                          textAlign:
                            cell.column.id === 'Sl_No' ? 'left' : 'column',
                        },
                      }),
                    }}
                  />
                </div>
                <Grid item xs={12}>
<Box textAlign='end'  marginTop='15px'>
                        <KenButton
                        variant='contained'>
                            <Typography style={{
                                fontFamily:'sans-serif',
                                textTransform:'none'
                            }}>Download History</Typography>
                        </KenButton>
                    </Box>
</Grid>
                </KenCard>
                </div>
           </>
      )
};



