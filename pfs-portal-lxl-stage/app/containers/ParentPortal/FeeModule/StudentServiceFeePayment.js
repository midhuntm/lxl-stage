import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import FeeCartTable from './feeCartData.json';
import KenCheckbox from '../../../global_components/KenCheckbox';
import './style.scss';
import KenCard from '../../../global_components/KenCard';
import KenButton from '../../../global_components/KenButton';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import {
  getFeeInventoryByContact,
  getStudentDetailsByContact,
  postFeeInventoryByContact,
  postFeePaymentUsingFlywire,
} from '../../../utils/ApiService';
import KenSnackBar from '../../../components/KenSnackbar';
import KenLoader from '../../../components/KenLoader/index';

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
  inputFields: {
    // fontSize: 12,
    // padding:'8px',
    // margin:'10px',
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

export default function studentServiceFeeTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [collectionFrequencyOptions, setCollectionFrequencyOptions] = useState(
    []
  );
  const [regID, setRegID] = useState();
  const [totalFeeAmount, setTotalFeeAmount] = useState();
  const {
    state: { userDetails },
  } = useAppContext();
  const [studentClass, setStudentClass] = useState();
  const [studentCategory, setStudentCategory] = useState();
  const [admissionYear, setAdmissionYear] = useState();
  const [edit, setedit] = useState();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [disableTable, setDisableTable] = React.useState(true);
  const [ServiceTotalFeeAmount, setServiceTotalFeeAmount] = useState(0);
  const [serviceAllFeeAmt, setServiceAllFeeAmt] = useState(0);
  const [serviceFeeAmount, setServiceFeeAmount] = useState(0);
  const [payUReady, setPayUReady] = React.useState(false);
  const [payuResponse, setPayuResponse] = React.useState();
  // const [feeCartData, setFeeCartData] = React.useState(FeeCartTable);
  const serviceFeecolumn = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        console.log('rowwww::', row);
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={value}
            // disabled={data[row.index]['IsMan__c']}
            onChange={event => selectedCheckBoxItem(event, row, data)}
            color="primary"
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Type',
      accessor: 'Fee_Type_Name__c__',
      disableGlobalFilter: true,
    },
    {
      Header: 'Currency',
      accessor: 'currency',
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Amount',
      accessor: 'Fee_Amount__c__',
      disableGlobalFilter: true,
    },
    {
      Header: 'Pay Amount',
      // accessor: 'K42_Payment_Schedule__c',
      Cell: ({ value, row }) => {
        console.log('row:"sasa', row);
        return (
          <div className="input-field-item">
            <KenButton
              className={classes.btnLabels}
              onClick={() =>
                getPayNowAmt(row?.values?.Fee_Amount__c__, row.index)
              }
              // onClick={() => console.log(row?.values?.Fee_Amount__c__)}
              variant="primary"
              style={{ height: 36, marginRight: '10px' }}
            >
              Pay Now
            </KenButton>
          </div>
        );
      },
      disableGlobalFilter: true,
    },
  ];

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
    getFeeInventoryByContact(params)
      .then(res => {
        setLoading(false);
        if (res.success) {
          // let dataMain = res?.['Data '];
          let discountData = res?.['FeeDiscountData'];
          // let apiResponse = [...dataMain, ...discountData];
          let studentServiceData = res?.['StudentServiceFee'];
          console.log('studentServiceData', studentServiceData);
          // let data = [];
          let mainData = [];
          studentServiceData.map(elem => {
            console.log('elem', elem);
            if (
              mainData.some(
                el => el.currency === elem?.FeeInv?.Currency_of_Payment__c
              )
            ) {
              let index = mainData.findIndex(
                el => el.currency === elem?.FeeInv?.Currency_of_Payment__c
              );
              // let tAmount = 0;
              // mainData[index].data.forEach(el => {
              //   tAmount = tAmount + Number(el.Total_Fee_Amount_Formula__c);
              // });
              // mainData[index].totalAmount = tAmount;
              // totalAmt=elem?FeeInv?.Fee_Amount__c__;
              // mainData[index].totalAmount = tAmount;
              mainData[index].data.push({
                ...elem?.FeeInv,
                currency: elem?.FeeInv?.Currency_of_Payment__c,
                // checked: elem?.FeeInv?.['Partial_Payment_Allowed__c'],
                Fee_Type_Name__c__: elem?.FeeInv?.Fee_Type_Name__c,
                Fee_Amount__c__: elem?.FeeInv?.Fee_Amount__c,
                // planId: elem?.PlannedPay ? elem?.PlannedPay?.Id : null,
              });
            } else {
              mainData.push({
                currency: elem?.FeeInv?.Currency_of_Payment__c,
                data: [
                  {
                    ...elem?.FeeInv,
                    currency: elem?.FeeInv?.Currency_of_Payment__c,
                    // checked: elem?.FeeInv?.['Partial_Payment_Allowed__c'],
                    Fee_Type_Name__c__: elem?.FeeInv?.Fee_Type_Name__c,
                    Fee_Amount__c__: elem?.FeeInv?.Fee_Amount__c,
                    // planId: elem?.PlannedPay ? elem?.PlannedPay?.Id : null,
                  },
                ],
              });
              console.log('mainData', mainData);
              setData(mainData);
            }
            // data.push({
            //   ...value.FeeInv,
            //   Fee_Type_Name__c__: value?.FeeInv['Fee_Type_Name__c'],
            //   Fee_Amount__c__: value?.FeeInv?.['Fee_Amount__c']
            //     ? value?.FeeInv?.['Fee_Amount__c']
            //     : value?.FeeInv['Total_Fee_Amount__c'],
            //   // checked: value?.FeeInv['IsMan__c'],
            //   checked: value?.['IsPreviouslySelected']
            //     ? value?.['IsPreviouslySelected']
            //     : value?.FeeInv['IsMan__c'],
            //   K42_Payment_Schedule__c:
            //     value?.CartFee != null
            //       ? value?.CartFee['K42_Payment_Schedule__c']
            //       : null,
            //   CartFee: value.CartFee,
            //   IsPreviouslySelected: value.IsPreviouslySelected,
            // });
          });
          // setData(data);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const selectedCheckBoxItem = (event, row, tableDetails) => {
    console.log('data', data);
    const newData = [...data];
    newData.map(el => {
      if (el.currency === row?.original.currency) {
          if (event.target.checked) {
            let feePay = serviceFeeAmount + el.data[row.index].Fee_Amount__c;
            setServiceFeeAmount(feePay);
            setServiceTotalFeeAmount(feePay);
            setServiceAllFeeAmt(Math.round(feePay));
          } else {
            let feePaytwo = serviceFeeAmount - el.data[row.index].Fee_Amount__c;
            setServiceFeeAmount(feePaytwo);
            setServiceTotalFeeAmount(feePaytwo);
          }
          el.data[row.index]['checked'] = event.target.checked;
          setData([...newData]);
        }
    });
    // if (event.target.checked) {
    //   let feePay = serviceFeeAmount + data[row.index].Fee_Amount__c;
    //   setServiceFeeAmount(feePay);
    //   setServiceTotalFeeAmount(feePay);
    //   setServiceAllFeeAmt(Math.round(feePay));
    // } else {
    //   let feePaytwo = serviceFeeAmount - data[row.index].Fee_Amount__c;
    //   setServiceFeeAmount(feePaytwo);
    //   setServiceTotalFeeAmount(feePaytwo);
    // }
    // data[row.index]['checked'] = event.target.checked;
    // setData([...data[row.index]['checked']]);
  };

  const getPayNowAmt = (val, index) => {
    console.log('val', val);
    // setPayNowAmt(val);
    setLoading(true);
    setServiceAllFeeAmt(val);
    payNow(val, index);
    setLoading(false);
  };

  const payNow = (val, index) => {
    setLoading(true);
    // const userDetails = getUserDetails();
    const params = userDetails;
    console.log(params);
    let noteValues = [];
    const tData = index >= 0 ? data.filter((el, ind) => ind === index) : data;
    tData.map(item => {
      // if(index == i){
      noteValues.push({
        fee: item['Fee_Type_Name__c__'],
        amount: item['Fee_Amount__c__'],
        Contact__c: params.ContactId,
        Fee_Type__c: item['Fee_Type_Name__c__'],
        K42_Planned_Payment__c: item.planId || '',
        Late_Fees__c: item.lateFee || 0,
        Amount__c: item['Fee_Amount__c__'],
      });
    });
    console.log('noteValues', noteValues);
    let payload = {
      amount: val ? val : serviceAllFeeAmt,
      paisa: '00',
      paymentReferenceId: null,
      acceptPartial: true,
      name: params.Name,
      mobile: params.Phone,
      email: params.mail,
      callBackUrl: 'http://sp-jain-stg-portal.ken42.com/thankyouPage',
      //   callBackUrl: `http://localhost:3000/thankyou`,
      currencyCode: 'USD',
      description: '',
      paidFor: 'demandNote',
      concessionAmount: 0,
      // orgId: config.orgID,
      notes: noteValues,
      studentId: params.ContactId,
    };
    console.log('payload', payload);
    postFeePaymentUsingFlywire(payload)
      .then(res => {
        console.log('[postFeePaymentUsingFlywire] response: ', res);
        window.open(res?.data?.url, '_self');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('warning', 'Something Went Wrong.');
      });
  };

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div>
      {/* {loading && <KenLoader />} */}
      <Grid>
        <KenSnackBar
          message={snackbarMessage}
          severity={snackbarSeverity}
          autoHideDuration={5000}
          open={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          position="Bottom-Right"
        />
        {data &&
          data.map((el, index) => {
            console.log('el', el);
            return (
              <>
                <div className="KenDiv">
                  {loading && <KenLoader />}
                  <KenGrid
                    columns={serviceFeecolumn}
                    data={el.data}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                    toolbarDisabled={true}
                  />
                </div>
                <table className={classes.amtTable}>
                  <tbody>
                    <tr>
                      <td
                        className={classes.amtTD}
                        // style={{ width: '280px', textAlign: 'center', paddingRight: '32px' }}
                        style={{ width: '100px', textAlign: 'center' }}
                      >
                        Total:
                      </td>

                      <td
                        className={classes.amtTD}
                        // style={{ width: '210px',textAlign: 'center', paddingLeft: '80px' }}
                        style={{
                          width: '80px',
                          textAlign: 'initial',
                          paddingLeft: '25px',
                        }}
                      >
                        {serviceFeeAmount}
                      </td>
                      <td
                        className={classes.amtTD}
                        style={{
                          width: '65px',
                          paddingRight: '15px',
                          textAlign: 'initial',
                        }}
                      >
                        <KenButton
                          // className={classes.btnLabels}
                          disabled={serviceFeeAmount > 0 ? false : true}
                          onClick={() => payNow(serviceAllFeeAmt)}
                          variant="primary"
                          // style={{ height: 36, marginRight: '10px' }}
                        >
                          Pay Selected
                        </KenButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          })}

        {/* <Grid item xs={12}>
        <Box textAlign="end" marginTop="15px">
          {disableTable == false ? (
            <div>
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
            </div>
          ) : (
            <div>
              <KenButton variant="contained" onClick={editTable}>
                <Typography
                  style={{
                    fontFamily: 'sans-serif',
                    textTransform: 'none',
                  }}
                >
                  Edit Fee Cart
                </Typography>
              </KenButton>
            </div>
          )}
        </Box>
      </Grid> */}
      </Grid>
    </div>
  );
}
