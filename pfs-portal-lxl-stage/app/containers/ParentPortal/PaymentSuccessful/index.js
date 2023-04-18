import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  getParentDetails,
  getUserDetails,
} from '../../../utils/helpers/storageHelper';
import Routes from '../../../utils/routes.json';
import configContext from '../../../utils/helpers/configHelper';
import context from '../../../utils/helpers/context';
import { addPay, getStudentDetails, sendMail } from '../../../utils/ApiService';
import CVR from '../../../utils/ncfeMail/CVR.html';
import JBN from '../../../utils/ncfeMail/JBN.html';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
}));

export default function index(props) {
  const { history } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { config } = React.useContext(configContext);
  const { handleLoader, handleSnackbarOpen } = React.useContext(context);
  const [message, setMessage] = React.useState();
  const [success, setSuccess] = React.useState(false);
  const parentDetails = getParentDetails();

  console.log('config: ', config);
  //for getting the feeReciept

  const handleClick = () => {
    history.push(`/${Routes.feePayment}`);
  };

  const sendWelcomeMail = () => {
    handleLoader(true);
    const query = new URLSearchParams(props.location.search);
    const status = query.get('razorpay_payment_link_status');
    const contactId = getUserDetails().ContactId;
    getStudentDetails(contactId)
      .then(res => {
        let file;
        if (res.AccountName === 'National Center For Excellence (JBN Branch)') {
          file = JBN;
        } else {
          file = CVR;
        }
        let data = {
          recievers: `${parentDetails?.mail}`,
          subject: 'VKGI Issue Update',
          message: `${file}`,
        };
        if (status === 'paid') {
          sendMail(data)
            .then(resp => {
              console.log(resp);
              handleLoader(false);
            })
            .catch(err => {
              console.log(err);
              handleLoader(false);
            });
        }
      })
      .catch(err => {
        console.log(err);
        handleLoader(false);
      });
  };

  const addPayments = async () => {
    handleLoader(true);
    const contactId = getUserDetails().ContactId;
    const query = new URLSearchParams(props.location.search);
    const payload = {
      orgId: config.orgID.toString(),
      studentId: contactId.toString(),
      razorpayId: query.get('razorpay_payment_id'),
      paymentLinkId: query.get('razorpay_payment_link_id'),
    };
    //console.log(payload);
    const status = query.get('razorpay_payment_link_status');
    try {
      if (status === 'paid') {
        const res = await addPay(payload);
        if (res) {
          setSuccess(true);
        }
        handleLoader(false);
      } else {
        setSuccess(false);
        handleLoader(false);
      }
    } catch (err) {
      console.log('error from addPay', err);
      handleLoader(false);
      setMessage(JSON.stringify(payload));
    }
  };

  React.useEffect(() => {
    addPayments();
    sendWelcomeMail();
  }, [props.location.search]);

  return (
    <Box className={classes.root}>
      {success ? (
        <Box>
          <Typography>Your Payment has been successful.</Typography>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Ok
          </Button>
        </Box>
      ) : (
        <Typography>{message || t('Payment_Processing_Message')}</Typography>
      )}
    </Box>
  );
}
