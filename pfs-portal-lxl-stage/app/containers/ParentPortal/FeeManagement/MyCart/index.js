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
  getFeeInventoryByContact,
  postFeeInventoryByContact,
  getStudentDetailsByContact,
} from '../../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import KenButton from '../../../../global_components/KenButton';
import KenCard from '../../../../global_components/KenCard';
import KenCheckbox from '../../../../global_components/KenCheckbox/index';
import KenGrid from '../../../../global_components/KenGrid';
import KenSelect from '../../../../components/KenSelect';
import KenSnackbar from '../../../../components/KenSnackbar/index';
import ContactCell from '../../../../global_components/KenGrid/components/ContactCell';
import KenLoader from '../../../../components/KenLoader';
// import TableData from './data.json';
// import ApiData from './apiData.json';
import Routes from '../../../../utils/routes.json';
import { Link, Route } from 'react-router-dom';
import '../style.scss';
import { useAppContext } from '../../../../utils/contextProvider/AppContext';
import { Header } from '../Common/Header';
// import CheckIcon from '@material-ui/icons/Check';
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
    fontSize: 13,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
    textAlign: 'center',
    marginRight: 98,
  },
  totalTitle: {
    width: '100%',
    position: 'relative',
    height: 50,
  },
  totalAmtTitle: {
    float: 'left',
    width: '27%',
    textAlign: 'center',
  },
  amountSection: {
    display: 'flex',
    width: '67%',
    boxSizing: 'border-box',
    position: 'absolute',
    left: '33%',
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
  listContainer: {
    background: '#F2F5FA',
    borderRadius: '3px',
    minHeight: 141,
    margin: '16px auto',
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  listItemSelected: {
    background: '#E7ECFF !important',
  },
  title: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '600',
    'font-size': '14px',
    'line-height': '19px',
    color: '#505F79',
    textTransform: 'uppercase',
  },
  titleRow: {
    display: 'flex',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'flex-start !important',
    alignItems: 'center !important',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  selectDropdown: {
    '& .MuiInputBase-root': {
      background: '#FAFBFC',
    },
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
const MyCart = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;
  const [data, setData] = useState([]);
  const [collectionFrequencyOptions, setCollectionFrequencyOptions] = useState(
    []
  ); //["Yearly", "Half-Yearly", "Quartly", "Monthly"]
  const [loading, setLoading] = useState();
  const [regID, setRegID] = useState('-');
  const [studentName, setStudentName] = useState();
  const [studentClass, setStudentClass] = useState();
  const [totalFee, setTotalFee] = useState(formatCurrency('INR', 0));
  const [paidFee, setPaidFee] = useState(formatCurrency('INR', 0));
  const [studentCategory, setStudentCategory] = useState('-');
  const [admissionYear, setAdmissionYear] = useState('-');
  const [totalAmount, setTotalAmount] = useState(formatCurrency('INR', 0));
  const [totalFeeAmount, setTotalFeeAmount] = useState();
  const [totalTaxAmount, setTotalTaxAmount] = useState(
    formatCurrency('INR', 0)
  );
  const [hideTax, setHideTax] = useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  /* const {
    state: { userDetails },
  } = useAppContext(); */
  const { t } = useTranslation();
  const classes = useStyles();
  const columns = [
    {
      Header: '',
      accessor: 'checked',
      Cell: ({ value, row }) => {
        return (
          <KenCheckbox
            name={`checkbox`}
            className={classes.checkbox}
            value={value}
            disabled={data[row.index]['IsMan__c']}
            onChange={event => selectedCheckBoxItem(event, row, data)}
            color="primary"
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Type',
      accessor: 'Fee_Type_Name__c',
      disableGlobalFilter: true,
    },
    // {
    //     Header: 'Fee Type ID',
    //     accessor: 'fee_type_id',
    //     disableGlobalFilter: true,
    // },
    {
      Header: 'Net Fee Amount (₹)',
      accessor: 'Fee_Amount__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Collection Frequency',
      accessor: 'K42_Payment_Schedule__c',
      Cell: ({ value, row }) => {
        console.log("value",value);
        return (
          <div className="input-field-item">
            <KenSelect
              placeholder="Select"
              inputBaseRootClass={classes.inputBaseClass}
              options={collectionFrequencyOptions}
              name="collectionFrequency"
              value={value}
              variant="outline"
              onChange={event => {
                handleCollectionFrequency(event.target.value, row, data);
              }}
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
    const params = userDetails.ContactId;
    setStudentName (userDetails.Name)
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
          apiResponse.map(value => {
            tableData.push({
              ...value.FeeInv,
              Fee_Type_Name__c: value?.FeeInv['Fee_Type_Name__c'],
              Fee_Amount__c: value?.FeeInv?.['Fee_Amount__c']
                ? value?.FeeInv?.['Fee_Amount__c']
                : value?.FeeInv['Total_Fee_Amount__c'],
              // checked: value?.FeeInv['IsMan__c'],
              checked: value?.['IsPreviouslySelected']
                ? value?.['IsPreviouslySelected']
                : value?.FeeInv['IsMan__c'],
              K42_Payment_Schedule__c:
                value?.CartFee != null
                  ? value?.CartFee['K42_Payment_Schedule__c']
                  : null,
              CartFee: value.CartFee,
              IsPreviouslySelected: value.IsPreviouslySelected,
            });
          });
          setData(tableData);
          let collectionFrequencyOpt = [];
          res?.FeeSchedule.map(item => {
            collectionFrequencyOpt.push({
              label: item['Title__c'],
              value: item['Id'],
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
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const onSubmit = () => {
    setLoading(true);
    const userDetails = getUserDetails();
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
  const handleCollectionFrequency = (event, row, data) => {
    data[row.index]['K42_Payment_Schedule__c'] = event;
    setData([...data]);
  };
  const selectedCheckBoxItem = (event, row, data) => {
    // var amount = totalAmount.split('₹')[1].replace(/,/g, "");
    // amount = Number(amount);
    if (!data[row.index]['IsMan__c']) {
      data[row.index]['checked'] = event.target.checked;
      setData([...data]);
    }
  };

  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down('sm'));

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
          activePath={Routes.myCart}
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
          onSave={onSubmit}
          showSave={true}
          showEdit={false}
        >
          <Box>
            {data.map((item, index) => {
              return (
                <Box
                  className={`${classes.listContainer} ${
                    item?.checked ? classes.listItemSelected : ''
                  }`}
                >
                  <Box className={`${classes.row} ${classes.titleRow}`}>
                    <KenCheckbox
                      name={`checkbox`}
                      className={classes.checkbox}
                      value={item?.checked}
                      disabled={item?.IsMan__c}
                      onChange={event =>
                        selectedCheckBoxItem(event, { ...item, index }, data)
                      }
                      color="primary"
                    />
                    <Box className={classes.title}>{item.Fee_Type_Name__c || "Tuition Fee"}</Box>
                  </Box>
                  <Box display={'flex'} flexDirection="column">
                    <Box className={classes.row}>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Net Fee Amount</Box>
                        <Box className={classes.value}>₹{item.Fee_Amount__c}</Box>
                      </Box>
                     {/*  <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Tax</Box>
                        <Box className={classes.value}>₹50,000</Box>
                      </Box> */}
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Total(INR):</Box>
                        <Box className={classes.value}>{totalFeeAmount}</Box>
                      </Box>
                    </Box>
                    <Box className={classes.row}>
                      <Box display={'flex'} alignItems={'center'} width="100%">
                        <Box
                          className={classes.label}
                          width="48%"
                          textAlign={'left !important'}
                        >
                          Collection Frequency
                        </Box>
                        <Box
                          className={`${classes.value} ${
                            classes.selectDropdown
                          }`}
                          width="52%"
                        >
                          <KenSelect
                            placeholder="Select"
                            options={collectionFrequencyOptions}
                            name="collectionFrequency"
                            value={item?.K42_Payment_Schedule__c}
                            variant="outline"
                            onChange={event => {
                              handleCollectionFrequency(
                                event.target.value,
                                { ...item, index },
                                data
                              );
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Header>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box pl={1} className={classes.cartHeader}>
              <Typography className={classes.cardTitle}>
                {t('headings:Fees_Management_Cart')}
              </Typography>
              {/* <KenButton
                            className={classes.btnLabels} onClick={onSubmit}
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
                {/* <Typography className={classes.studentInfo}>
                                {t('headings:Total_Fee')} : {totalFee}
                            </Typography> 
                             <Typography className={classes.studentInfo}>
                                {t('headings:Paid_Fee')} : {paidFee}
                            </Typography> */}
              </div>
              <hr style={{ backgroundColor: '#092682' }} />

              <div className={classes.tableComponent}>
                {data.length > 0 ? (
                  <KenCard paperStyles={{ padding: 16 }}>
                    <div className="fee-management-my-cart-table">
                      <KenGrid
                        columns={columns}
                        data={data}
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
                            style={{ width: '60px' }}
                          />
                          <td
                            className={classes.amtTD}
                            style={{ width: '280px', textAlign: 'left' }}
                          >
                            Total(INR):
                          </td>
                          {/* <td className={classes.amtTD} style={{ width: "210px" }}></td> */}
                          <td
                            className={classes.amtTD}
                            style={{ width: '210px' }}
                          >
                            {totalFeeAmount}
                          </td>
                          <td
                            className={classes.amtTD}
                            style={{ width: '300px' }}
                          />
                        </tr>
                      </tbody>
                    </table>
                  </KenCard>
                ) : null}
              </div>

              <div
                style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              >
                {/* <KenButton
                                className={classes.btnLabels} onClick={onSubmit}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Next')}
                            </KenButton> */}
                <KenButton
                  className={classes.btnLabels}
                  onClick={onSubmit}
                  variant="primary"
                  style={{ height: 36, marginRight: '10px' }}
                >
                  {t('labels:Save')}
                </KenButton>
                {/* <KenButton
                                className={classes.btnLabels} onClick={onSubmit}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Edit')}
                            </KenButton> */}
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default MyCart;
