import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import {
  getMyTransactionsByContact,
  getMyReceiptsByContact,
  getStudentDetailsByContact,
} from '../../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import KenButton from '../../../../global_components/KenButton';
import KenCard from '../../../../global_components/KenCard';
import KenCheckbox from '../../../../global_components/KenCheckbox/index';
import KenGrid from '../../../../global_components/KenGrid';
import KenSelect from '../../../../components/KenSelect';
import ContactCell from '../../../../global_components/KenGrid/components/ContactCell';
import KenLoader from '../../../../components/KenLoader';
// import TableData from './data.json';
import Routes from '../../../../utils/routes.json';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../../utils/contextProvider/AppContext';
import moment from 'moment';
import { Header } from '../Common/Header';
// import DownloadLogo from '../../../../assets/icons/download-receipt.svg';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';

const useStyles = makeStyles(theme => ({
  name: {
    textAlign: 'left',
    marginLeft: 38,
    color: theme.palette.KenColors.neutral400,
    fontSize: 10,
  },
  cartHeader: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    height: 50,
    justifyContent: 'space-between',
    display: 'flex',
    paddingRight: 10,
  },
  cartBody: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    padding: '21px 20px 50px',
    position: 'relative',
  },
  cardTitle: {
    lineHeight: '50px',
    color: '#00218D',
    fontSize: '18px',
  },
  studentInfo: {
    color: '#00218D',
    fontSize: '14px',
  },
  tableComponent: {
    marginBottom: 10,
  },
  totalAmt: {
    color: '#00218D',
    fontSize: 16,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
    textAlign: 'center',
  },
  listContainer: {
    background: '#E7ECFF',
    borderRadius: '3px',
    minHeight: 141,
    margin: '16px auto',
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '600',
    'font-size': '14px',
    'line-height': '19px',
    color: '#505F79',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,

    '& > div + div': {
      marginTop: 16,
    },
  },
  label: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '600',
    'font-size': '12px',
    'line-height': '16px',
    'text-align': 'center',
    color: '#7A869A',
    marginBottom: '8px',
  },
  value: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '12px',
    'line-height': '16px',
    'text-align': 'center',
    color: '#7A869A',
  },
}));
function formatCurrency(type, amount) {
  let currencyFormat;
  if (type === 'INR') {
    currencyFormat = 'en-IN';
  } else {
    currencyFormat = 'en-US';
  }
  return new Intl.NumberFormat(currencyFormat, {
    style: 'currency',
    currency: type,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
const MyTransactions = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;
  const [data, setData] = useState([]); //TableData?.TableData
  const [loading, setLoading] = useState();
  const [regID, setRegID] = useState();
  const [studentCategory, setStudentCategory] = useState();
  const [admissionYear, setAdmissionYear] = useState();
  const [studentName, setStudentName] = useState();
  const [studentClass, setStudentClass] = useState();
  const [totalFee, setTotalFee] = useState(formatCurrency('INR', 0));
  const [paidFee, setPaidFee] = useState(formatCurrency('INR', 0));
  const [totalAmount, setTotalAmount] = useState(formatCurrency('INR', 0));
  /*  const {
    state: { userDetails },
  } = useAppContext(); */
  const { t } = useTranslation();
  const classes = useStyles();
  const columns = [
    {
      Header: 'S.No.',
      accessor: 'S_No',
      disableGlobalFilter: true,
    },
    {
      Header: 'Transaction Type',
      accessor: 'Transaction_type__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Particulars',
      accessor: 'Fee_Type__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Payment Date',
      accessor: 'Date__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Paid Amount(₹)',
      accessor: 'Amount__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Remaining Amount (₹)',
      accessor: 'Remaining_Amount__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Receipt Number',
      accessor: 'Receipt_Number__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Transaction ID',
      accessor: 'Payment_Reference_ID__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Payment Mode',
      accessor: 'Mode_of_payment__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Download Recipt',
      accessor: 'Receipt_ID__c',
      Cell: ({ value, row }) => {
        return (
          <KenButton
            variant="primary"
            color="primary"
            onClick={event => downloadReceipt(event, row, data)}
            buttonClass={classes.button}
          >
            {t('labels:Download_Receipt')}
          </KenButton>
        );
      },
      disableGlobalFilter: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const userDetails = getUserDetails();
    const params = userDetails.ContactId;

    getMyTransactionsByContact(params)
      .then(res => {
        setLoading(false);
        if (res.success) {
          let apiResponse = res?.['Data '];
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
    const userDetails = getUserDetails();
    const params = userDetails.ContactId;
    setStudentName(userDetails.Name);
    getStudentDetailsByContact(params).then(resp => {
      let studentDetails = resp;
     
      setRegID(studentDetails?.Data['Registration_Number__c']);
      setStudentCategory(
        studentDetails?.Data['Fee_Category_of_the_Students__c']
      );
      setAdmissionYear(studentDetails?.Data['Year_of_Joining__c']);
      setStudentClass(studentDetails['ProgramPlan']);
    });
  }, []);

  const downloadReceipt = (event, row, data) => {
    
    console.log(event, row, data, data[row.index].attachment?.Id);
    const params = data[row.index].attachment?.Id;
    // console.log("[downloadReceipt] params: ", attachmentId);
    getMyReceiptsByContact(params)
      .then(res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        saveAs(blob, 'Receipt.pdf');
      })
      .catch(err => {
        console.log('Err: ', err);
      });
  };

  const downloadReceiptResponsive = (attachmentId) => {
    
    // console.log("[downloadReceiptResponsive] Attachment Id: ", attachmentId);
    getMyReceiptsByContact(attachmentId)
      .then(res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        saveAs(blob, 'Receipt.pdf');
      })
      .catch(err => {
        console.log('downloadReceiptResponsive error: ', err);
      });
  };  

  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      {isTabletView ? (
        <Header
          activePath={Routes.myTransactions}
          info={{
            regID,
            studentClass,
            studentCategory,
            admissionYear,
            totalFee,
            paidFee,
            totalAmount,
            studentName,
          }}
          showEdit={false}
          showSave={false}
        >
          <div>
            {/* TODO: add actual data  */}
            {data &&
              data.map((item, index) => {
                return (
                  <Box className={classes.listContainer}>
                    <Box className={`${classes.row} ${classes.titleRow}`}>
                      <Box className={classes.title}>{item?.Fee_Type__c}</Box>
                      <Box>
                        <KenButton
                          variant="primary"
                          onClick={event => downloadReceiptResponsive(item?.attachment?.Id)}
                        >
                          Receipt 
                          {/* <img src={DownloadLogo} /> */}
                        </KenButton>
                      </Box>
                    </Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Box className={classes.col}>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Payment Date</Box>
                          <Box className={classes.value}>{item.Date__c}</Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Reaming Amount</Box>
                          <Box className={classes.value}>
                            {item.Remaining_Amount__c}
                          </Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Transaction ID</Box>
                          <Box className={classes.value}>
                            {item.Payment_Reference_ID__c}
                          </Box>
                        </Box>
                      </Box>
                      <Box className={classes.col}>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Payment Amount</Box>
                          <Box className={classes.value}>{item.Amount__c}</Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Receipt No.</Box>
                          <Box className={classes.value}>
                            {item.Receipt_Number__c}
                          </Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Payment Mode</Box>
                          <Box className={classes.value}>
                            {item.Mode_of_payment__c}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </div>
        </Header>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box pl={1} className={classes.cartHeader}>
              <Typography className={classes.cardTitle}>
                {t('headings:Fee_Payment_History')}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box pl={1} className={classes.cartBody}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <Typography className={classes.studentInfo}>
                  {t('headings:Student_Reg_ID')}: {regID}
                </Typography>
                <Typography className={classes.studentInfo}>
                  {t('headings:Student_Class')}: {studentClass}
                </Typography>
                <Typography className={classes.studentInfo}>
                  {t('headings:Student_Category')}: {studentCategory}
                </Typography>

                <Typography className={classes.studentInfo}>
                  {t('headings:Year_of_Admission')}: {admissionYear}
                </Typography>
                {/* <Typography className={classes.studentInfo}>
                                {t('headings:Total_Fee')} : {totalFee}
                            </Typography>
                            <Typography className={classes.studentInfo}>
                                {t('headings:Paid_Fee')} : {paidFee}
                            </Typography> */}
              </div>
              <hr style={{ backgroundColor: '#092682' }} />

              <div className={classes.tableComponent}>
                <KenCard paperStyles={{ padding: 16 }}>
                  <KenGrid
                    columns={columns}
                    data={data}
                    pagination={{ disabled: false }}
                    toolbarDisabled={true}
                  />
                  {/* <p className={classes.totalAmt}>Total (INR) : {totalAmount}</p> */}
                </KenCard>
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default MyTransactions;
