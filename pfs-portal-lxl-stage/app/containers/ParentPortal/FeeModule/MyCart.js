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
} from '../../../utils/ApiService';
import KenSelect from '../../../global_components/KenSelect';
import KenSnackBar from '../../../components/KenSnackbar';
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

export default function myCartTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
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
  // const [feeCartData, setFeeCartData] = React.useState(FeeCartTable);
  const FeeCartcolumn = [
    // {
    //   Header: 'S.No.',
    //   accessor: 'Sl_No',
    //   disableGlobalFilter: true,
    // },
    {
      Header: '',
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
              disabled={data[row.index]['IsMan__c'] || disableTable}
              onChange={event => selectedCheckBoxItem(event, row, data)}
              color="primary"
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Term',
      accessor: 'Term_c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Particulars',
      accessor: 'Fee_Type_Name__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Currency',
      accessor: 'Currency_of_Payment__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Total Fee Amount',
      accessor: 'Fee_Amount__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Collection Frequency',
      accessor: 'K42_Payment_Schedule__c',
      Cell: ({ value, row }) => {
        console.log("value",value)
        return (
          <div className="input-field-item">
            <KenSelect
              placeholder="Select"
              inputBaseRootClass={classes.inputBaseClass}
              options={collectionFrequencyOptions}
              name="collectionFrequency"
              value={value}
              variant="outline"
              disabled={disableTable}
              optionalLabel={false}
              // label='collectionFrequency'
              onChange={event => {
                handleCollectionFrequency(event.target.value, row, data);
              }}
            />
          </div>
        );
      },
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'Collection frequency ',
    //   accessor: 'Collection_Frequency',
    //   Cell: ({ value, row }) => {
    //     // console.log("row",row)
    //     return (
    //       <div  style={{ width: 128 , backgroundColor:'#F4F5F7'}}>
    //         <TextField
    //         // style={{padding:'8px 5px'}}
    //          variant="outlined"
    //          size="small"
    //          inputProps ={{height:'10px'}}
    //                      //   placeholder="Input Amount"
    //         //   name={`data[${row.index}]['Total_Fee_Amount_Formula__c']`}
    //         //   label={row?.values?.Amount_To_Pay}
    //         // inputRef
    //           value={row?.values?.Collection_Frequency}
    //         //   disabled={row?.values?.checked === false ? true : false}
    //           disabled={true}
    //           className={classes.inputFields}
    //           autoFocus={true}
    //           onChange={event => changeAmount(event, row)}
    //         />
    //       </div>
    //     );
    //   },
    //   disableGlobalFilter: true,
    // },
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
          let dataMain = res?.['Data '];
          let discountData = res?.['FeeDiscountData'];
          let apiResponse = [...dataMain, ...discountData];
          console.log('apiResponse', apiResponse);
          let tableData = [];
          apiResponse.map((value, index) => {
            tableData.push({
              ...value.FeeInv,
              Fee_Type_Name__c: value?.FeeInv['Fee_Type_Name__c'],
              Fee_Amount__c: value?.FeeInv?.['Fee_Amount__c']
                ? value?.FeeInv?.['Fee_Amount__c']
                : value?.FeeInv['Total_Fee_Amount__c'],
                Term_c: value?.FeeInv?.Term__r?.Name,
              checked: value?.FeeInv['IsMan__c'],
              // checked: value?.['IsPreviouslySelected'],
              K42_Payment_Schedule__c:
                value?.CartFee != null
                  ? value?.CartFee['Verification_Id__c']
                  : null,
              CartFee: value.CartFee,
              IsPreviouslySelected: value.IsPreviouslySelected,
              Currency: value?.FeeInv?.Currency_of_Payment__c,
              Sl_No: index + 1,
            });
          });
          setData(tableData);
          let collectionFrequencyOpt = [];
          res?.FeeSchedule.map(item => {
            collectionFrequencyOpt.push({
              label: item['Title__c'],
              value: item['Program_Plan__c'],
            });
          });
          setCollectionFrequencyOptions(collectionFrequencyOpt);
          if (apiResponse.length > 0) {
            setLoading(false);
            let totalFeeAmt = tableData.reduce(
              (sum, row) => row?.Fee_Amount__c + sum,
              0
            );
            setTotalFeeAmount(formatCurrency('INR', totalFeeAmt));
          }
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const selectedCheckBoxItem = (event, row, data) => {
    // var amount = totalAmount.split('₹')[1].replace(/,/g, "");
    // amount = Number(amount);
    if (!data[row.index]['IsMan__c']) {
      data[row.index]['checked'] = event.target.checked;
      setData([...data]);
    }
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

  const handleCollectionFrequency = (event, row, data) => {
    data[row.index]['K42_Payment_Schedule__c'] = event;
    setData([...data]);
  };

  const onSubmit = () => {
    setLoading(true);
    // const userDetails = getUserDetails();
    const params = userDetails.ContactId;
    let payloadData = [];
    let apiPass = [];
    data.map(item => {
      if (item['checked']) {
        if (!item['IsPreviouslySelected']) {
          if (item['K42_Payment_Schedule__c'] != null) {
            apiPass.push(true);
            payloadData.push({
              FeeType: item.Id,
              TotalFeeAmount: item['Fee_Amount__c'],
              Discounts: 0,
              Tax: 0,
              Activated: item['checked'],
              CartId: item['IsMan__c'] ? item.CartFee.Id : null,
              PaymentScheduleId: item['K42_Payment_Schedule__c'],
            });
          } else {
            apiPass.push(false);
            setLoading(false);
            handleSnackbarOpen('error', 'Please select a Payment Schedule.');
          }
        }
      }
    });
    let payload = { feeLineItem: payloadData };
    let checker = apiPass => apiPass.every(check => check === true);
    if (checker(apiPass)) {
      setLoading(false);
      postFeeInventoryByContact(params, payload)
        .then(res => {
          setLoading(false);
          handleSnackbarOpen(res.success ? 'success' : 'warning', res.message);
          console.log(res);
          setDisableTable(true);
        })
        .catch(err => {
          console.log('err');
          handleSnackbarOpen(res.failure ? 'success' : 'warning', res.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const editTable = () => {
    setDisableTable(false);
  };

  return (
    <>
    {loading && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <div className="KenDiv">
        <KenGrid
          columns={FeeCartcolumn}
          data={data}
          pagination={{ disabled: true }}
          tableTotal={{ disabled: true, checkbox: true }}
          getRowProps={{ selected: true }}
          toolbarDisabled={true}
        />
      </div>
      <Grid item xs={12}>
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
      </Grid>
    </>
  );
}
