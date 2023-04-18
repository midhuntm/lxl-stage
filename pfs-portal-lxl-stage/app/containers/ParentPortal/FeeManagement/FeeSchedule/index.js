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
  getFeeScheduleByContact,
  getFeePaymentByContact,
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
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import CartBoxHeader from '../Components/CartBoxHeader';

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
  cartCurrencyBody: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    padding: '21px 20px 20px',
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
  totalCurrencyAmt: {
    color: '#00218D',
    fontSize: 16,
    fontFamily: 'Open Sans',
    textDecoration: 'uppercase',
    fontWeight: 600,
    textAlign: 'center',
    paddingTop: '12px',
  },
  scheduleBox: {
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
  status: {
    background: '#57D9A3',
    borderRadius: 3,
    width: 45,
    height: 26,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,

    '&.Partial': {
      background: '#E3E3E3',
      border: '1px solid #B3BAC5',
    },
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
  }
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
const FeeSchedule = props => {
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
  const [totalFeeAmount, setTotalFeeAmount] = useState();
  const [paidAmount, setPaidAmount] = useState();

  const [currencyName, setCurrencyName] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [currencyNameOptions, setCurrencyNameOptions] = useState();
  const { t } = useTranslation();
  const classes = useStyles();
  const columns = [
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
      Header: 'Total Fees (₹)',
      accessor: 'Total_Fee_Amount_Formula__c',
      disableGlobalFilter: true,
    },
    {
      Header: 'Fee Collection Start Date',
      accessor: 'Fee_Collection_Starts_on__c',
      disableGlobalFilter: true,
    },
     {
      Header: 'Paid Amount',
      accessor: 'PaidAmount',
      disableGlobalFilter: true,
    },
    // {
    //     Header: 'Balance (₹)',
    //     accessor: '',
    //     disableGlobalFilter: true,
    // },
    {
      Header: 'Due Date',
      accessor: 'Fee_Collection_End_Date__c',
      disableGlobalFilter: true,
    },
    {
      // Header: 'Due Amount (₹)',
      Header: 'Remaining Amount',
      accessor: 'Remaining_Amount__c',
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
  }, []);
  useEffect(() => {
    setLoading(true);
    const userDetails = getUserDetails();
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
              Currency: value?.PlannedPay?.Currency_of_Payment__c,
              PaidAmount:
                value?.PlannedPay?.Total_Fee_Amount_Formula__c -
                value?.PlannedPay?.Remaining_Amount__c,
            });
          });

          setData(tableData);
          let arrayData = [];

          tableData?.forEach(elem => {
            if (
              arrayData.some(el => el.label === elem.Currency_of_Payment__c)
            ) {
              let index = arrayData.findIndex(
                el => el.label === elem.Currency_of_Payment__c
              );
              arrayData[index].remainingAmount =
                arrayData[index].remainingAmount + elem.Remaining_Amount__c;
              arrayData[index].totalFee =
                arrayData[index].totalFee + elem.Total_Fee_Amount_Formula__c;
              arrayData[index].paidAmount =
                arrayData[index].paidAmount + elem.PaidAmount;
            } else {
              arrayData.push({
                label: elem.Currency_of_Payment__c,
                value: elem.Currency_of_Payment__c,
                remainingAmount: elem.Remaining_Amount__c,
                totalFee: elem.Total_Fee_Amount_Formula__c,
                paidAmount: elem.PaidAmount,
              });
            }
          });
         
          setCurrencyNameOptions([...arrayData]);
          setCurrencyName(arrayData[0].value);
          setCurrencyValue(arrayData[0].remainingAmount);
          setTotalFeeAmount(arrayData[0].totalFee);
          setPaidAmount(arrayData[0].paidAmount);

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

  const changedropDown = e => {

    setCurrencyName(e.target.value);
    const copyData = [...currencyNameOptions];
    const index = copyData.findIndex(el => el.value === e.target.value);

    setCurrencyValue(copyData[index]?.remainingAmount);
    setPaidAmount(copyData[index]?.paidAmount);
    setTotalFeeAmount(copyData[index]?.totalFee);
  };

  console.log(totalFeeAmount, paidAmount, currencyValue,currencyNameOptions);

  const moveNext = () => {};
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      {isTabletView ? (
        <Header
          activePath={Routes.feeSchedule}
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
            <>
            {currencyName && (
               <Box className={classes.scheduleBox}>
          <Box className={classes.col}>
                    <Box
                          className={`${classes.value} ${
                            classes.selectDropdown
                          }`}
                          width="52%"
                        >
                          <KenSelect
                      label={'Choose the Currency'}
                      placeholder="Select"
                      // inputBaseRootClass={classes.inputBaseClass}
                      options={currencyNameOptions}
                      name="CurrencyName"
                      value={currencyName}
                      variant="outline"
                      onChange={changedropDown}
                    />
                        </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Total Fees</Box>
                        <Box className={classes.value}>
                          {totalFeeAmount}
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Total PAid Amount</Box>
                        <Box className={classes.value}>
                          {paidAmount}
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Total Remaining Amount</Box>
                        <Box className={classes.value}>
                          {currencyValue}
                        </Box>
                      </Box>
                    </Box>
                    </Box>
            )}
                    </>
            {data.map((item, index) => {
              return (
                <Box className={classes.scheduleBox}>
                  <Box display={'flex'} justifyContent="space-between">
                    
                  </Box>
                  <Box className={`${classes.row} ${classes.titleRow}`}>
                    <Box className={classes.title}>{item?.Fee_Type__c}</Box>
                    {/* <Box
                      className={`${classes.status} ${
                        index % 2 === 0 ? 'Partial' : ''
                      }`}
                    >
                      {index % 2 === 0 ? 'Partial' : 'Paid'}
                    </Box> */}
                  </Box>
                  <Box display={'flex'} justifyContent="space-between">
                    <Box className={classes.col}>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Total Fees</Box>
                        <Box className={classes.value}>
                          ₹{item?.Total_Fee_Amount_Formula__c}
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Due Date</Box>
                        <Box className={classes.value}>
                          {item?.Fee_Collection_End_Date__c}
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.col}>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                         <Box className={classes.label}>Fee collection Start Date</Box>
                        <Box className={classes.value}>{item.Fee_Collection_Starts_on__c}</Box>
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Late Fee Start Date</Box>
                        <Box className={classes.value}>{item.Late_Fee_Starts_on__c}</Box>
                      </Box>
                      {/* <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        <Box className={classes.label}>Due Amount</Box>
                        <Box className={classes.value}>{item.Remaining_Amount__c}</Box>
                      </Box> */}
                    </Box>
                    <Box className={classes.col}>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        {/* <Box className={classes.label}>Balance</Box>
                        <Box className={classes.value}>₹0.00</Box> */}
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                      >
                        {/* <Box className={classes.label}>Paid on</Box>
                        <Box className={classes.value}>03/21/2021</Box> */}
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
                {t('headings:Fees_Schedule')}
              </Typography>
              {/* <KenButton
                            className={classes.btnLabels} onClick={moveNext}
                            variant="primary" style={{ height: 36, alignSelf: "center" }}>
                            {t('labels:Next')}
                        </KenButton> */}
            </Box>
          </Grid>
          <Grid item md={12}>
          <Box pl={1} className={classes.cartCurrencyBody}>
            {currencyName && (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={9} sm={3}>
                    <KenSelect
                      label={'Choose the Currency'}
                      placeholder="Select"
                      // inputBaseRootClass={classes.inputBaseClass}
                      options={currencyNameOptions}
                      name="CurrencyName"
                      value={currencyName}
                      variant="outline"
                      onChange={changedropDown}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <p className={classes.totalCurrencyAmt}>
                      Total Fees: {totalFeeAmount}
                    </p>
                  </Grid>
                  <Grid item xs={9} sm={3}>
                    <p className={classes.totalCurrencyAmt}>
                      Total Paid Amount : {paidAmount}
                    </p>
                    </Grid>
                  <Grid item xs={12} sm={4}>
                    <p className={classes.totalCurrencyAmt}>
                      Total Remaining Amount: {currencyValue}
                    </p>
                    </Grid>             
                </Grid>
              </>
            )}
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
                {/* <Typography className={classes.studentInfo}> */}
                   <CartBoxHeader
                registrationID={regID}
                studentClass={studentClass}
                studentCategory={studentCategory}
                admissionYear={admissionYear}
              />

                  {/* {t('headings:Student_Reg_ID')}: {regID}
                </Typography>
                <Typography className={classes.studentInfo}>
                  {t('headings:Student_Class')}: {studentClass}
                </Typography>
                <Typography className={classes.studentInfo}>
                  {t('headings:Student_Category')}: {studentCategory}
                </Typography>

                <Typography className={classes.studentInfo}>
                  {t('headings:Year_of_Admission')}: {admissionYear}
                </Typography> */}
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
                    pagination={{ disabled: true }}
                    toolbarDisabled={true}
                  />
                  {/* <p className={classes.totalAmt}>Total (INR) : {totalAmount}</p> */}
                </KenCard>
              </div>

              {/* <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                            <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Next')}
                            </KenButton>
                            <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Save')}
                            </KenButton>
                            <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Edit')}
                            </KenButton>
                        </div> */}
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default FeeSchedule;
