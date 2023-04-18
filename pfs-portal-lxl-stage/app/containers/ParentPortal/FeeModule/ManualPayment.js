import React, { useState, useEffect } from 'react';
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
import KenGrid from '../../../global_components/KenGrid';
import FeeTransactionTableData from '../FeeModule/feeTransactionData.json';
import './style.scss';
import KenCard from '../../../global_components/KenCard';
import KenButton from '../../../global_components/KenButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import {
  getFeePaymentByContact,
  getMyReceiptsByContact,
  getMyTransactionsByContact,
  getStudentDetailsByContact,
  postManualFeeByContact,
  postFeePaymentUsingFlywire,
} from '../../../utils/ApiService';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import KenLoader from '../../../components/KenLoader';
import KenInputField from '../../../global_components/KenInputField';
import KenSelect from '../../../global_components/KenSelect';
import KenCheckbox from '../../../global_components/KenCheckbox';
import KenSnackBar from '../../../components/KenSnackbar';

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
  amtTD: {
    // textAlign: 'center',
    color: '#00218D',
    fontSize: 15,
    fontFamily: 'Open Sans',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  inputFields: {
    // fontSize: 12,
    // padding:'8px',
    // margin:'10px',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200,
    //     border: '1px solid',
    // padding: '10px 26px 10px 12px',
    // position: 'relative',
    // fontSize: '16px',
    // borderRadius: '4px',
    // backgroundColor: '#FAFBFC',
  },
}));

export default function ManualPaymentPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [regID, setRegID] = useState();
  const [studentCategory, setStudentCategory] = useState();
  const [admissionYear, setAdmissionYear] = useState();
  const [selectedValue, setSelectedValue] = React.useState('');
  const [paymentModeValue, setPaymentModeValue] = React.useState();
  const [currencySelectedValue, setCurrencySelectedValue] = React.useState();
  const [studentClass, setStudentClass] = useState();
  const [initialAmt, setInitialAmt] = useState();
  const [withoutCurrencyAmt, setWithoutCurrencyAmt] = useState(0);
  const [value, setValue] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const initialValues = {
    StudentName: '',
    TransactionType: '',
    ModeOfPayment: '',
    PaymentDate: '',
    TransactionId: '',
    bankName: '',
    branchName: '',
    chequeNumber: '',
    paymentReferenceId: '',
    demandDraftId: '',
  };
  const [checked, setChecked] = useState(false);
  const [manualPymentData, setManualPymentData] = useState(initialValues);
  const {
    state: { userDetails },
  } = useAppContext();
  const currencyTypesOptions = [
    {
      value: 'AustralianDollar',
      label: 'AUD',
    },
    {
      value: 'AED',
      label: 'AED',
    },
    {
      value: 'EU',
      label: 'EU',
    },
    {
      value: 'INR',
      label: 'INR',
    },
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'GBP',
      label: 'GBP',
    },
    {
      value: 'SGD',
      label: 'SGD',
    },
  ];

  const transationTypeOptions = [
    {
      label: 'Collection',
      value: 'collection',
    },
  ];

  const paymentModeOptions = [
    {
      label: 'Cash',
      value: 'Cash',
    },
    {
      label: 'Swift',
      value: 'Swift',
    },
    {
      label: 'Debit Card',
      value: 'DebitCard',
    },
    {
      label: 'Credit Card',
      value: 'CreditCard',
    },
    {
      label: 'Cheque',
      value: 'Cheque',
    },
    {
      label: 'UPI',
      value: 'UPI',
    },
    {
      label: 'DD',
      value: 'DD',
    },
    {
      label: 'Net Banking',
      value: 'NetBanking',
    },
  ];
  // const [feeTransactionData, setTransactionData] = React.useState(FeeTransactionTableData);

  const manualFeecolumn = [
    // {
    //   Header: 'S.No.',
    //   accessor: 'S_No',
    //   disableGlobalFilter: true,
    // },
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={value}
            // checked={checked}
            // disabled={data[row.index]['IsMan__c']}
            onChange={eve => selectedCheckBoxItem(eve, row, data)}
            color="primary"
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Planned Payment',
      accessor: 'PlannedPayName',
      //   Cell: ({ value, row }) => {
      //     return (
      //       <KenInputField
      //         name={`inourField`}
      //         // className={classes.checkbox}
      //         value={value}
      //         // disabled={data[row.index]['IsMan__c']}
      //         //   onChange={event => selectedCheckBoxItem(event, row, data)}
      //         color="primary"
      //         optionalLabel={false}
      //       />
      //     );
      //   },
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Type',
      accessor: 'Fee_Type__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Start Date',
      accessor: 'Fee_Collection_Starts_on__c',
      disableGlobalFilter: true,
      Footer: <p className={classes.amtTD}>Total</p>,
    },
    {
      Header: 'Remark',
      accessor: '',
      Cell: ({ value, row }) => {
        return (
          <div class="nameInput">
            <KenInputField
              name={`inputField`}
              // className={classes.checkbox}
              value={value}
              // disabled={data[row.index]['IsMan__c']}
              //   onChange={event => selectedCheckBoxItem(event, row, data)}
              color="primary"
              optionalLabel={false}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Payment Amount',
      accessor: 'Remaining_Amount__c',
      //   accessor: '',
      Cell: ({ value, row }) => {
        return (
          <div class="nameInput">
            <TextField
              variant="outlined"
              placeholder="Input Amount"
              //   value={value}
              //   name={`${data[row.index].Total_Fee_Amount_Formula__c}`}S
              name={`data[${row.index}]['Remaining_Amount__c']`}
              value={`${data[row.index]['Remaining_Amount__c']}`}
              className={classes.inputFields}
              autoFocus={row?.index === selectedIndex ? true : false}
              onChange={event => changeAmount(event, row)}
              //   disabled={row.values.checked ? false : true}
              // errors={errors?.gradeToPassAssessment}
              // touched={touched?.gradeToPassAssessment}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Late Fee',
      accessor: 'LateFee',
      disableGlobalFilter: true,
    },
    {
      Header: 'Demanded Currency',
      accessor: 'Currency',
      disableGlobalFilter: true,
    },
    {
      Header: 'Currency Of Payment',
      accessor: 'currencyOfPayment',
      Cell: ({ value, row }) => {
        return (
          // <KenSelect
          //     required={true}
          //     // label="Transaction Type"
          //     type="currencyOfPayment"
          //     name="currencyOfPayment"
          //     id="currencyOfPayment"
          //     value={row?.values.currencyOfPayment}
          //     optionalLabel={false}
          //     options={currencyTypesOptions}
          //     onChange={handleChangeCurrency}
          //     // className={formErrors.feeType && "input-error"}
          //   />

          <KenSelect
            id="currencyOfPayment"
            name="currencyOfPayment"
            options={currencyTypesOptions}
            // className={classes.checkbox}
            // value={manualPymentData.currencyOfPayment}
            value={value}
            // disabled={data[row.index]['IsMan__c']}
            //   onChange={event => selectedCheckBoxItem(event, row, data)}
            color="primary"
            optionalLabel={false}
            // onChange={handleChange}
            onchange={handleChangeCurrency}
          />
        );
      },
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'Total Amount',
    //   accessor: 'Amount__c',
    //   disableGlobalFilter: true,
    // },
  ];

  useEffect(() => {
    setLoading(true);
    const params = userDetails.ContactId;
    getFeePaymentByContact(params)
      .then(res => {
        setLoading(false);
        if (res.success) {
          let apiResponse = res?.['Data '];
          let tableData = [];
          apiResponse.map(value => {
            tableData.push({
              ...value.PlannedPay,
              LateFee: value?.LateFeeData?.LateFeeAmount || 0,
              Fee_Collection_Starts_on__c: value?.PlannedPay
                ?.K42_Payment_Sch_Suppliment__r?.Fee_Collection_Starts_on__c
                ? moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Fee_Collection_Starts_on__c
                  ).format('L')
                : null,
              Fee_Collection_End_Date__c: value?.PlannedPay
                ?.K42_Payment_Sch_Suppliment__r?.Fee_Collection_Ends_on__c
                ? moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Fee_Collection_Ends_on__c
                  ).format('L')
                : null,
              Late_Fee_Starts_on__c: value?.PlannedPay
                ?.K42_Payment_Sch_Suppliment__r?.Late_Fee_Starts_on__c
                ? moment(
                    value?.PlannedPay?.K42_Payment_Sch_Suppliment__r
                      ?.Late_Fee_Starts_on__c
                  ).format('L')
                : null,
              Currency: value?.PlannedPay?.Currency_of_Payment__c,
              PlannedPayName: value?.PlannedPay?.Name,
            });
          });

          setData(tableData);
          setManualPymentData({});
          console.log('tabledata::', tableData);
          if (res?.['Data '].length > 0) {
            setLoading(false);
            let totalFeeAmt = tableData.reduce(
              (sum, row) => row?.['Remaining_Amount__c'] + sum,
              0
            );
            setInitialAmt(Math.round(totalFeeAmt));
            setWithoutCurrencyAmt(totalFeeAmt);
          }
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
      setStudentCategory(
        studentDetails?.Data['Fee_Category_of_the_Students__c']
      );
      setAdmissionYear(studentDetails?.Data['Year_of_Joining__c']);
      setStudentClass(studentDetails['ProgramPlan']);
    });
  }, []);

  const changeAmount = (event, row) => {
    let val = event.target.value;
    setSelectedIndex(row.index);
    if (!isNaN(val)) {
      if (Number(val) <= initialAmt) {
        data[row.index]['Remaining_Amount__c'] = Number(val);
        let totalFeeAmt = data.reduce(
          (sum, row) => row?.Remaining_Amount__c + sum,
          0
        );
        // setAmtToPay(formatCurrency('INR', totalFeeAmt));
        setWithoutCurrencyAmt(totalFeeAmt);
      }
      //   } else {
      //     handleSnackbarOpen('warning', 'Amount should be less than total fee.');
      //   }
    }
  };

  const selectedCheckBoxItem = (eve, row) => {
    const newData = [...data];
    if (eve.target.checked) {
      newData[row.index]['checked'] = eve.target.checked;
      //   setData([...data]);
    } else {
      newData[row.index]['checked'] = false;
      //   setData([...data]);
    }
    setData([...newData]);
  };
  const onSubmit = () => {
    setLoading(true);
    // const userDetails = getUserDetails();
    const params = userDetails.ContactId;
    let payloadData = [];
    let apiPass = [];
    data.map(item => {
      if (item['checked']) {
        // if (!item['IsPreviouslySelected']) {
        //   if (item['K42_Payment_Schedule__c'] != null) {
        apiPass.push(true);
        payloadData.push({
          modeOfPayment: manualPymentData.ModeOfPayment,
          bankName: manualPymentData.bankName || null,
          bankBranchName: manualPymentData.branchName || null,
          chequeNumber: manualPymentData.chequeNumber || null,
          transactionId: manualPymentData.TransactionId || null,
          paymentReferenceId: manualPymentData.paymentReferenceId || null,
          ddId: manualPymentData.demandDraftId || null,
          studentName: manualPymentData.StudentName,
          studentId: params,
          totalAmount: withoutCurrencyAmt,
          feeBreakUp: JSON.stringify([
            {
              StudentName: manualPymentData.StudentName,
              FeeAmount: item['Remaining_Amount__c'] || 0,
              FeeType: item['Fee_Type__c'],
              PlannedPayID: item['id'],
              LateFeesAmount: item['LateFee'],
              UnplannedPayment: null,
              ApplicationId: null,
              TransactionType: manualPymentData.TransactionType,
              DateOfPayment: manualPymentData.PaymentDate,
              TotalAmount: withoutCurrencyAmt,
              CurrencyVal: item['Currency_of_Payment__c'],
            },
          ]),
          currencyOfPay: manualPymentData.currencyOfPayment,
        });
        console.log('Payload data::', payloadData);
      }
    });
    let payload = { paymentDetail: payloadData };
    let checker = apiPass => apiPass.every(check => check === true);
    if (checker(apiPass)) {
      setLoading(false);
      postManualFeeByContact(params, payload)
        .then(res => {
          setLoading(false);
          handleSnackbarOpen(res.success ? 'success' : 'warning', res.message);
          console.log(res);
          setDisableTable(true);
        })
        .catch(err => {
          console.log('err');
          //   handleSnackbarOpen(err.failure ? 'failure' : 'warning', res.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = (event, reason) => {
    setOpenSnackbar(false);
  };

  const changedropDown = e => {
    setCurrencySelectedValue(e.target.value);
  };
  //   const handleChange = e => {
  //     setSelectedValue(e.target.value);
  //   };

  const handleChange = e => {
    const { name, value } = e.target;
    setManualPymentData({ ...manualPymentData, [name]: value });
  };

  //   const modeHandleChange = event => {
  //     setManualPymentData[event.target.name] = event.target.value;
  //     // setPaymentModeValue(e.target.value);
  //   };

  console.log('manualPymentData::', manualPymentData);

  const handleChangeCurrency = (event, row) => {
    setSelectedValue(event.target.value);
  };
  //   const handlePaymentModeChange =(e,row)=>{
  //         // e.preventDefault()
  //         data[row.index][''] = eve.target.value;
  //        setData([...data])
  //   }

  return (
    <>
      <div className={classes.tableComponent}>
        {loading && <KenLoader />}
        <KenCard>
          <Grid container spacing={3} style={{ marginBottom: '5px' }}>
            <Grid item xs={3}>
              <div class="nameInput">
                <KenInputField
                  label="Student Name"
                  type="StudentName"
                  name="StudentName"
                  id="StudentName"
                  value={userDetails.Name}
                  // onChange={handleChange}
                  size={'medium'}
                  disabled
                  optionalLabel={false}
                  // className={formErrors.StudentName && "input-error"}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <KenSelect
                required={true}
                label="Transaction Type"
                type="TransactionType"
                name="TransactionType"
                id="TransactionType"
                value={manualPymentData.TransactionType}
                optionalLabel={false}
                options={transationTypeOptions}
                onChange={handleChange}
                // className={formErrors.feeType && "input-error"}
              />
            </Grid>
            <Grid item xs={3}>
              <KenSelect
                required={true}
                label="Mode of Payment"
                type="ModeOfPayment"
                name="ModeOfPayment"
                id="ModeOfPayment"
                value={manualPymentData.ModeOfPayment}
                options={paymentModeOptions}
                onChange={handleChange}
                optionalLabel={false}
                // onChange={handleChange}
                // className={formErrors.feeType && "input-error"}
              />
            </Grid>
            <Grid item xs={3} style={{ display: 'grid' }}>
              <label
                style={{
                  color: '#505F79',
                  fontSize: '12px',
                  paddingBottom: '3px',
                }}
              >
                Payment Date
              </label>
              <TextField
                id="PaymentDate"
                name="PaymentDate"
                // label="Payment Date"
                type="date"
                variant="outlined"
                onChange={handleChange}
                value={manualPymentData.PaymentDate}
                // defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  borderColor: '#ced4da',
                }}
                // inputProps={{}}
                size={'small'}
              />
            </Grid>
            {manualPymentData?.ModeOfPayment === 'DebitCard' ||
            manualPymentData?.ModeOfPayment === 'CreditCard' ? (
              <Grid item xs={3}>
                <div class="nameInput">
                  <KenInputField
                    label="Transaction Id"
                    type="TransactionId"
                    name="TransactionId"
                    id="TransactionId"
                    value={manualPymentData.TransactionId}
                    onChange={handleChange}
                    optionalLabel={false}
                    // className={formErrors.StudentName && "input-error"}
                    inputProps={{
                      padding: '10px 26px 10px 12px',
                    }}
                  />
                </div>
              </Grid>
            ) : (
              ''
            )}
            {manualPymentData?.ModeOfPayment === 'Cheque' ? (
              <>
                <Grid item xs={3}>
                  <div class="nameInput">
                    <KenInputField
                      label="Bank Name"
                      type="bankName"
                      name="bankName"
                      id="bankName"
                      value={manualPymentData.bankName}
                      onChange={handleChange}
                      optionalLabel={false}
                      // className={formErrors.StudentName && "input-error"}
                      inputProps={{
                        padding: '10px 26px 10px 12px',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div class="nameInput">
                    <KenInputField
                      label="Branch Name"
                      type="branchName"
                      name="branchName"
                      id="branchName"
                      value={manualPymentData.branchName}
                      onChange={handleChange}
                      optionalLabel={false}
                      // className={formErrors.StudentName && "input-error"}
                      inputProps={{
                        padding: '10px 26px 10px 12px',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div class="nameInput">
                    <KenInputField
                      label="Cheque Number"
                      type="chequeNumber"
                      name="chequeNumber"
                      id="chequeNumber"
                      value={manualPymentData.chequeNumber}
                      onChange={handleChange}
                      optionalLabel={false}
                      // className={formErrors.StudentName && "input-error"}
                      inputProps={{
                        padding: '10px 26px 10px 12px',
                      }}
                    />
                  </div>
                </Grid>
              </>
            ) : (
              ''
            )}
            {manualPymentData?.ModeOfPayment === 'UPI' ||
            manualPymentData?.ModeOfPayment === 'NetBanking' ? (
              <Grid item xs={3}>
                <div class="nameInput">
                  <KenInputField
                    label="Payment Reference Id"
                    type="paymentReferenceId"
                    name="paymentReferenceId"
                    id="paymentReferenceId"
                    value={manualPymentData.paymentReferenceId}
                    onChange={handleChange}
                    optionalLabel={false}
                    // className={formErrors.StudentName && "input-error"}
                    inputProps={{
                      padding: '10px 26px 10px 12px',
                    }}
                  />
                </div>
              </Grid>
            ) : (
              ''
            )}
            {manualPymentData?.ModeOfPayment === 'DD' ? (
              <>
                <Grid item xs={3}>
                  <div class="nameInput">
                    <KenInputField
                      label="Bank Name"
                      type="bankName"
                      name="bankName"
                      id="bankName"
                      value={manualPymentData.bankName}
                      onChange={handleChange}
                      optionalLabel={false}
                      // className={formErrors.StudentName && "input-error"}
                      inputProps={{
                        padding: '10px 26px 10px 12px',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div class="nameInput">
                    <KenInputField
                      label="Demand Draft Id"
                      type="demandDraftId"
                      name="demandDraftId"
                      id="demandDraftId"
                      value={manualPymentData.demandDraftId}
                      onChange={handleChange}
                      optionalLabel={false}
                      // className={formErrors.StudentName && "input-error"}
                      inputProps={{
                        padding: '10px 26px 10px 12px',
                      }}
                    />
                  </div>
                </Grid>
              </>
            ) : (
              ''
            )}
          </Grid>
          <div className="KenDivFeeSchedule">
            <KenGrid
              columns={manualFeecolumn}
              data={data}
              pagination={{ disabled: true }}
              tableTotal={{ disabled: true, checkbox: true }}
              getRowProps={{ selected: true }}
              //   isCollasable={true}
              //   component={CollapseDataTransaction}
              toolbarDisabled={true}
              //   gridProps={{
              //     getRowProps: row => ({
              //       isCollasable: true,
              //     }),
              //     getHeaderProps: cell => ({
              //       // isCollasable: true,
              //       style: {
              //         textAlign: cell.id === 'Sl_No' ? 'left' : 'column',
              //         paddingLeft: cell.id === 'Sl_No' ? '50px' : '0px',
              //       },
              //     }),
              //     getCellProps: cell => ({
              //       style: {
              //         textAlign: cell.column.id === 'Sl_No' ? 'left' : 'column',
              //       },
              //     }),
              //   }}
            />
          </div>
          <Grid container style={{ marginTop: '10px' }}>
            <Grid item xs={6}>
              {/* <Box> */}
              <div>
                <Typography
                  style={{
                    color: '#00218D',
                    fontSize: 15,
                    fontFamily: 'Open Sans',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    textAlign: 'center',
                    paddingRight:'60px'
                  }}
                >
                  TOTAL
                </Typography>
              </div>
              {/* </div>
              <div> */}
            </Grid>
            <Grid item xs={6}>
              <div>
                <Typography
                  style={{
                    color: '#00218D',
                    fontSize: 15,
                    fontFamily: 'Open Sans',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    textAlign: 'initial',
                    paddingLeft:'80px'
                  }}
                >
                  {withoutCurrencyAmt}
                </Typography>
              </div>
              {/* </Box> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="end" marginTop="15px">
              <KenButton variant="contained" onClick={onSubmit}>
                <Typography
                  style={{
                    fontFamily: 'sans-serif',
                    textTransform: 'none',
                  }}
                >
                  Save
                </Typography>
              </KenButton>
            </Box>
          </Grid>
        </KenCard>
      </div>
    </>
  );
}
