import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KenButton from '../../../global_components/KenButton/index';
//import KenLoader from '../../../global_components/KenLoader/index';
import KenLoader from '../../../components/KenLoader';
import KenSnackbar from '../../../global_components/KenSnackbar/index';
import { BsCheck2Circle } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useLocation, useHistory } from 'react-router-dom';
import { checkPaymentStatus } from '../../../utils/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
    // flex: '0 1',
  },
  title: {
    fontSize: 24,
    lineHeight: '33px',
    color: '#000',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  sub: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: '24px',
    maxWidth: 500,
    margin: '0 auto',
  },
  check: {
    fontSize: 50,
    color: 'green'
  },
  cross: {
    fontSize: 50,
    color: 'red'
  }
}));

export default function ThankYouPage() {
  const query = new URLSearchParams(useLocation().search);
  const [transactionId, setTransactionId] = useState(query.has('transactionId') ? query.get('transactionId') : '');
  const [status, setStatus] = useState();
  const [paymentID, setPaymentID] = useState();
  // const [paymentID, setPaymentID] = useState(query.has('razorpay_payment_id') ? query.get('razorpay_payment_id') : '');
  // const [status, setStatus] = useState(query.has('razorpay_payment_link_status') ? query.get('razorpay_payment_link_status') : '');
  const [loader, setLoader] = useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setLoader(true)

    checkPaymentStatus(transactionId)
    .then(res => {
      //console.log("[checkPaymentStatus] res: ", res);
      let apiStatus = res?.status;
      if(apiStatus === 'success') {
        const paymentStaus = res?.data?.Webhook_Status__c?.trim().toLowerCase();
        console.log("[checkPaymentStatus] paymentStaus: ", paymentStaus);
        if (paymentStaus === 'guaranteed') {
          setStatus('guaranteed');
          setPaymentID(res?.data?.Payment_Reference_Id__c);
        } else if (paymentStaus === 'initiated') {
          history.push({ pathname: `/feePayment` });
        } else if (paymentStaus === 'cancelled') {
          setStatus('cancelled');
          setPaymentID(res?.data?.Payment_Reference_Id__c);
        }
        setLoader(false);
      } else {
        handleSnackbarOpen('error', res?.message);
        setLoader(false);
      }

    })
    .catch(err => {
      handleSnackbarOpen('error', err?.message);
      setLoader(false);
    });

    // setTimeout(() => {
    //   handleSnackbarOpen('success', "Payment Successful");
    //   setLoader(false)
    // }, 2000);

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
  const completeTransaction = () => {
    history.push({ pathname: `/feePayment` });
    sessionStorage.clear();
  }
  return (
    <div>
      
      <KenSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      {loader && <KenLoader /> } 
 
      
    </div>
  );
}
