import React, { useEffect, useState, useContext } from 'react';
// import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  Grid,
  makeStyles,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import {
  postFeePaymentByContact,
  getFeeScheduleByContact,
  getStudentDetailsByContact,
  postFeePaymentUsingFlywire,
} from '../../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import KenButton from '../../../../global_components/KenButton';
import KenCard from '../../../../global_components/KenCard';
import KenCheckbox from '../../../../global_components/KenCheckbox/index';
import KenInputField from '../../../../components/KenInputField/index';
import KenGrid from '../../../../global_components/KenGrid';
import KenSelect from '../../../../components/KenSelect';
import ContactCell from '../../../../global_components/KenGrid/components/ContactCell';
import KenLoader from '../../../../components/KenLoader';
import KenSnackbar from '../../../../components/KenSnackbar/index';
// import TableData from './data.json';
import Routes from '../../../../utils/routes.json';
import { Header } from '../Common/Header';
import { Link } from 'react-router-dom';
import '../style.scss';
import configContext from '../../../../utils/helpers/configHelper';
import { useAppContext } from '../../../../utils/contextProvider/AppContext';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
// import paymentResponse from './paymentResponse.json';
// import CheckIcon from '@material-ui/icons/Check';

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
  value: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '12px',
    'line-height': '16px',
    'text-align': 'center',
    color: '#7A869A',
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
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    fontSize: 13,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
    textAlign: 'center',
    marginRight: 20,
  },
  amountSection: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'center',
  },
  checkboxContent: {
    width: '100%',
    placeContent: 'center',
  },
  inputFields: {
    fontSize: 12,
  },
  amtTable: {
    width: '100%',
    height: 50,
  },
  amtTD: {
    textAlign: 'center',
    color: '#00218D',
    fontSize: 13,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
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
const FeesPayment = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [regID, setRegID] = useState();
  const [admissionYear, setAdmissionYear] = useState();
  const [studentCategory, setStudentCategory] = useState();
  const [studentName, setStudentName] = useState();
  const [studentClass, setStudentClass] = useState();
  const [totalFee, setTotalFee] = useState(formatCurrency('INR', 0));
  const [paidFee, setPaidFee] = useState(formatCurrency('INR', 0));
  const [dueAmt, setDueAmt] = useState(formatCurrency('INR', 0));
  const [amtToPay, setAmtToPay] = useState(formatCurrency('INR', 0));
  const [totalAmount, setTotalAmount] = useState(formatCurrency('INR', 0));
  const [disableField, setDisableField] = useState(true);
  const [apiAmt, setAPIAmt] = useState(0);
  const [withoutCurrencyAmt, setWithoutCurrencyAmt]=useState(0);
  const [initialAmt, setInitialAmt] = useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [payUReady, setPayUReady] = React.useState(false);
  const [payuResponse, setPayuResponse] = React.useState();
  const [userData, setUserData] = React.useState([]);
  const [state, setState] = React.useState({
    // surl: 'http://20.207.108.103/api/payu/payments/payu/status',
  });
  const { t } = useTranslation();
  /* const {
    state: { userDetails },
  } = useAppContext(); */
  const classes = useStyles();
  const { config } = useContext(configContext);
  const columns = [
    {
      Header: 'Fee Type',
      accessor: 'Fee_Type__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Due Amount (₹)',
      accessor: 'Planned_Amount_Payable__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Late Fee (₹)',
      accessor: 'lateFee',
      disableGlobalFilter: true,
    },

    {
      Header: 'Partial Fee Allowed',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <KenCheckbox
              name={`checkbox`}
              className={classes.checkbox}
              value={value}
              disabled={
                data[row.index]['Partial_Payment_Allowed__c'] ? false : true
              }
              onChange={event => selectedCheckBoxItem(event, row, data)}
              color="primary"
            />
          </div>
        );
      },
      disableGlobalFilter: false,
    },
    {
      Header: 'Amount Being Paid',
      accessor: 'Total_Fee_Amount_Formula__c',
      Cell: ({ value, row }) => {
        console.log('Row and index', row, row.index);
        console.log('Data of index', data[row.index]);
        return (
          <div className="input-field-item" style={{ width: 250 }}>
            <TextField
             variant="standard"
              placeholder="Input Amount"
              //   value={value}
              //   name={`${data[row.index].Total_Fee_Amount_Formula__c}`}
              name={`data[${row.index}]['Total_Fee_Amount_Formula__c']`}
              value={`${data[row.index]['Total_Fee_Amount_Formula__c']}`}
              className={classes.inputFields}
              onChange={event => changeAmount(event, row)}
              autoFocus={true}
              disabled={row.values.checked ? false : true}
              // errors={errors?.gradeToPassAssessment}
              // touched={touched?.gradeToPassAssessment}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
  ];
  useEffect(() => {
    setLoading(true);
    const userDetails = getUserDetails();
    console.log('userDetails', userDetails);
    const params = userDetails.ContactId;
    getFeeScheduleByContact(params)
      .then(res => {
        setLoading(false);
        if (res.success) {
          let apiResponse = res?.['Data '];
          let data = [];
          apiResponse.map(item => {
            data.push({
              ...item.PlannedPay,
              checked: item?.FeeInv['Partial_Payment_Allowed__c'],
              lateFee:
                item.LateFeeData.LateFeeAmount === null
                  ? 0
                  : item.LateFeeData.LateFeeAmount,
              planId: item.PlannedPay ? item.PlannedPay.Id : null,
            });
          });
          setData(data);
          if (res?.['Data '].length > 0) {
            setLoading(false);
            let totalFeeAmt = data.reduce(
              (sum, row) => row?.['Total_Fee_Amount_Formula__c'] + sum,
              0
            );
            setAmtToPay(formatCurrency('INR', totalFeeAmt));
            let totalFeeDueAmt = data.reduce(
              (sum, row) => row?.['Planned_Amount_Payable__c'] + sum,
              0
            );
            // setAmtToPay(formatCurrency('INR', Math.round(totalFeeAmt)));
            setAPIAmt(Math.round(totalFeeAmt));
            setAmtToPay(Math.round(totalFeeAmt));
            setWithoutCurrencyAmt(Math.round(totalFeeAmt));
            setInitialAmt(Math.round(totalFeeAmt))
            setDueAmt(formatCurrency('INR', Math.round(totalFeeDueAmt)));
            // setAmtToPay(formatCurrency('INR', Number.parseFloat(totalFeeAmt).toFixed(2)));
            // setAPIAmt(Number.parseFloat(totalFeeAmt).toFixed(2));
            // setDueAmt(formatCurrency('INR', Number.parseFloat(totalFeeDueAmt).toFixed(2)));
          }
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

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  // const payNow = () => {
  //   const userDetails = getUserDetails();
  //   const params = userDetails;
  //   const appParams = JSON.parse(localStorage.getItem('PARENT_DETAILS'));
  //   setUserData(appParams);
  //   console.log(params);
  //   let noteValues = [];
  //   // let selecteAmount =[];
  //   data.map(item => {
  //     noteValues.push({
  //       fee: item['Fee_Type__c'],
  //       amount: item.Total_Fee_Amount_Formula__c,
  //       Contact__c: params.ContactId,
  //       Fee_Type__c: item['Fee_Type__c'],
  //       K42_Planned_Payment__c: item.planId,
  //       Late_Fees__c: item.lateFee || 0,
  //       Amount__c: item.Planned_Amount_Payable__c,
  //     });
  //     // selecteAmount.push(item.Planned_Amount_Payable__c);

  //     // else{noteValues.push(false)}
  //   });
  //   // selecteAmount = selecteAmount.reduce((a, b) => a + b, 0);
  //   console.log('noteValues', noteValues);
  //   // let amount = String(apiAmt).split('.')[0]
  //   // let paisa = String(apiAmt).split('.')[1].slice(0, 2)
  //   let payload = {
  //     amount: withoutCurrencyAmt,
  //     paisa: '00',
  //     paymentReferenceId: null,
  //     acceptPartial: true,
  //     name: params.Name,
  //     mobile: appParams.Phone,
  //     email: appParams.mail,
  //     callBackUrl: 'http://sp-jain-stg-portal.ken42.com/thankyou',
  //     // "callBackUrl": `http://localhost:3000/thankyou`,
  //     currencyCode: 'INR',
  //     description: '',
  //     paidFor: 'demandNote',
  //     concessionAmount: 0,
  //     orgId: config.orgID,
  //     registrationNo: regID,
  //     // institute: 'SBMPPS Main Branch',
  //     programPlan: studentClass,
  //     notes: noteValues,
  //     studentId: params.ContactId,
  //   };
  //   console.log('payload', payload);
  //   postFeePaymentByContact(payload)
  //     .then(res => {
  //       console.log(res);
  //       setLoading(false);
  //       if (res.status == 'success') {
  //         setPayuResponse(res.data);
  //         setPayUReady(true);
  //         setTimeout(() => {
  //           document.getElementById('payU-form').submit();
  //         }, 1000);
  //       }
  //     })
  //     .catch(err => {
  //       handleSnackbarOpen('warning', 'Something Went Wrong.');
  //     });
  // };
 
  const payNow = () => {
    const userDetails = getUserDetails();
    const params = userDetails;
    // const appParams = JSON.parse(localStorage.getItem('PARENT_DETAILS'));
    // setUserData(appParams);
    console.log(params);
    let noteValues = [];
    // let selecteAmount =[];
    data.map(item => {
      noteValues.push({
        fee: item['Fee_Type__c'],
        amount: item.Total_Fee_Amount_Formula__c,
        Contact__c: params.ContactId,
        Fee_Type__c: item['Fee_Type__c'],
        K42_Planned_Payment__c: item.planId,
        Late_Fees__c: item.lateFee || 0,
        Amount__c: item.Planned_Amount_Payable__c,
      });
    });
    console.log('noteValues', noteValues);

    let payload = {
      studentId: params?.ContactId,
      firstName:params.Name, // "Ken42" //params?.Name?.substring(0, indexOfFirst)?.trim(), //params.Name,
      lastName: "Student 2", //params?.Name?.substring(indexOfFirst)?.trim(), //params.Name,
      dob: "03/06/1996", // "",
      mobile: params?.Phone,
      email: params?.mail,
      amount: withoutCurrencyAmt,
      paisa: '00',
      currencyCode: 'USD',
      acceptPartial: true,
      paymentReferenceId: null,
      callBackUrl: 'https://sp-jain-stg-portal.ken42.com/thankyou',    
      //"callBackUrl": `http://localhost:3000/thankyou`,        
      description: '',
      paidFor: '',
      concessionAmount: 0,
      orgId: config.orgID,
    }  
    console.log('[postFeePaymentUsingFlywire] payload: ', payload);
    postFeePaymentUsingFlywire(payload)
      .then(res => {
        console.log("[postFeePaymentUsingFlywire] response: ", res);
        window.open(res?.data?.url, '_self');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('warning', 'Something Went Wrong.');
      });
  };
  const moveNext = () => {};

  const changeAmount = (event, row) => {
    let val = event.target.value
    if (!isNaN(val)) {
      if (Number(val) <= initialAmt) {
        data[row.index]['Total_Fee_Amount_Formula__c'] = Number(val);
        let totalFeeAmt = data.reduce(
          (sum, row) => row?.Total_Fee_Amount_Formula__c + sum,
          0
        );
        setAmtToPay(formatCurrency('INR', totalFeeAmt));
        setWithoutCurrencyAmt(totalFeeAmt);
      } else {
        handleSnackbarOpen('warning', 'Amount should be less than total fee.');
      }
    }
  };

  const selectedCheckBoxItem = (event, row, data) => {
    if (!data[row.index]['Partial_Payment_Allowed__c']) {
      data[row.index]['checked'] = event.target.checked;
      setData([...data]);
    }
  };

  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      <KenSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      {isTabletView ? (
        <Header
          activePath={Routes.feesPayment}
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
          <Box>
            <Box>
              {data.map((item, index) => {
                return (
                  <Box className={classes.listContainer}>
                    <Box className={`${classes.row} ${classes.titleRow}`}>
                      <Box className={classes.title}>{item?.Fee_Type__c}</Box>
                    </Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Box className={classes.row}>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Due Amount</Box>
                          <Box className={classes.value}>
                            ₹{item?.Planned_Amount_Payable__c}
                          </Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Late Fee</Box>
                          <Box className={classes.value}>₹ {item?.lateFee}</Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          alignItems={'flex-start'}
                        >
                          <Box className={classes.label}>Amount Being Paid</Box>
                          <Box className={classes.value}>
                            {!item?.Partial_Payment_Allowed__c ? (
                              <KenInputField
                                onChange={e =>
                                  changeAmount(event, { ...item, index })
                                }
                                value={item?.Total_Fee_Amount_Formula__c}
                              />
                            ) : (
                              <Box component={'span'}>
                                ₹{item?.Total_Fee_Amount_Formula__c}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <div style={{ textAlign: 'center' }}>
              <KenButton
                variant="primary"
                buttonClass={classes.payNow}
                onClick={payNow}
              >
                Pay Now
              </KenButton>
            </div>
            {/* <Box className={classes.footerTotalAmount}>
              <Box>TOTAL AMOUNT</Box>
              <Box>{amtToPay}</Box>
            </Box> */}
          </Box>
        </Header>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box pl={1} className={classes.cartHeader}>
              <Typography className={classes.cardTitle}>
                {t('headings:Fees_Payment')}
              </Typography>
              {/* <KenButton
                            className={classes.btnLabels} onClick={moveNext}
                            variant="primary" style={{ height: 36, alignSelf: "center" }}>
                            {t('labels:Next')}
                        </KenButton> */}
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
              </div>
              <hr style={{ backgroundColor: '#092682' }} />

              <div className={classes.tableComponent}>
                <KenCard paperStyles={{ padding: 16 }}>
                  <div className="fee-management-fee-payment-table">
                    <KenGrid
                      columns={columns}
                      data={data}
                      pagination={{ disabled: false }}
                      toolbarDisabled={true}
                    />
                  </div>
                  <table className={classes.amtTable}>
                    <tbody>
                      <tr>
                        <td
                          className={classes.amtTD}
                          style={{ width: '110px', textAlign: 'left' }}
                        >
                          Total(INR):
                        </td>
                        <td
                          className={classes.amtTD}
                          style={{ width: '110px' }}
                        >
                          {dueAmt}
                        </td>
                        <td
                          className={classes.amtTD}
                          style={{ width: '110px' }}
                        />
                        <td
                          className={classes.amtTD}
                          style={{ width: '110px' }}
                        >
                          {amtToPay}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </KenCard>
              </div>

              <div
                style={{ position: 'absolute', bottom: '10px', left: '50%' }}
              >
                <KenButton
                  className={classes.btnLabels}
                  onClick={payNow}
                  variant="primary"
                  style={{ height: 36, marginRight: '10px' }}
                >
                  {t('labels:Pay_Now')}
                </KenButton>
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default FeesPayment;
