import {
  Paper,
  Typography,
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import configContext from '../../../utils/helpers/configHelper';
import KenInputField from '../../../components/KenInputField';
import { withFormik } from 'formik';
import { useHistory, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import KenButton from '../../../global_components/KenButton';
import Routes from '../../../utils/routes.json';
import {
  requestForOTP,
  getStudentInfo,
  verifyOTP,
} from '../../../utils/ApiService';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  KEY_PARENT_DETAILS,
  KEY_USER_TYPE,
  KEY_LOGIN_TYPE,
  KEY_USER_DETAILS,
  KEY_PORTAL_TYPE,
  KEY_LOGIN_VIEW,
  KEY_LOGIN_ACCESS_TOKEN,
  KEY_USER,
} from '../../../utils/constants';
import KenLoader from '../../../components/KenLoader';
import KenSnackBar from '../../../components/KenSnackbar';
import backimg from '../../../assets/lxl.jpg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    //backgroundImage: `url(https://inazstgpfs3001.blob.core.windows.net/assets/kle_pfs_new.png)`,
    // backgroundImage: `url(https://inazstgpfs3001.blob.core.windows.net/assets/spjainBgImg.png)`,
    // backgroundImage: `url(https://inazstgpfs3001.blob.core.windows.net/assets/Clients/LXL/SchoolCinema.png)`,
    background:`url(${backimg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // [theme.breakpoints.only('xs')]: {
    height: '100vh',
    // },
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.ken42.com/">
        ken42{' '}
      </Link>
      {new Date().getFullYear()}
      All Rights Reserved.
    </Typography>
  );
}
export default withRouter(function ExistingInfo(props) {
  return (
    <div>
      <FormikHoc {...props} />
    </div>
  );
});

const ExistingForm = props => {
  const {
    toggle,
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    handleSubmit,
    setFieldValue,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [checkOTP, setCheckOTP] = React.useState(false);
  const [emailData, setEmailData] = React.useState(null);
  const [verifyData, setVerifyData] = React.useState(null);
  const [emailId, setEmailId] = React.useState(null);
  const [otp, setOtp] = React.useState(null);
  const [loading, setLoading] = React.useState(false);  
  const { config } = useContext(configContext);
  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('error');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [state, setState] = React.useState({
    seconds: 0,
    minutes: 2,
  });

  useEffect(() => {
    const myInterval = setInterval(() => {
      const { seconds, minutes } = state;
      if (seconds > 0) {
        // setState(({ seconds }) => ({
        //     seconds: seconds - 1,
        // }));
        setState({ ...state, seconds: seconds - 1 });
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setState({ ...state, minutes: minutes - 1, seconds: 59 });
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [state]);

  const handleChangeEmail = event => {
    setEmailId(event.target.value);
    sessionStorage.setItem('email', event.target.value);
    setFieldValue('email', event.target.value);
  };
  const handleChangeOtp = event => {
    setOtp(event.target.value);
    setFieldValue('otp', event.target.value);
  };

  // Snackbar called

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  useEffect(() => {
    if (values.message) {
      handleSnackbarOpen(`${values.message?.type}`, `${values.message?.text}`);
    }
  }, [values.message]);

  const change = (name, e, index) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  values.authenticateUser = async () => {
    if (values.activeStep === 1) {
      LoginVerify();
    } else {
      logInProcess();
    }
  };

  const logInProcess = async () => {
    let email = sessionStorage.getItem('email');
    if (KEY_USER.REGEX.EMAIL.test(email)) {
      try {
        setLoading(true);
        const res = await requestForOTP(email);
        if (!res || !res?.success) {
          console.log(res?.errorMessage);

          values.setMessage({ type: 'error', text: res?.errorMessage });
        } else {
          setCheckOTP(true);
          setEmailData(res);
          // values.setMessage({ type: 'success', text: 'OTP sent to email' });
          values.setMessage({ type: 'success', text: `OTP Is : ${res?.OTP}` });
          alert(`OTP is : ${res?.OTP}`)
          values.setActiveStep(1);
        }
      } catch (error) {
        values.setMessage({ type: 'error', text: 'User not found' });
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    } else {
      values.setMessage({ type: 'error', text: 'Invalid Email' });
      console.log('Invalid Email');
    }
  };
  const LoginVerify = async () => {
    let email = sessionStorage.getItem('email');
    if (KEY_USER.REGEX.NUMBER.test(otp)) {
      // console.log('values', values.otp);
      let payload = {
        otp: otp,
        id: email,
      };
      if (otp) {
        try {
          setLoading(true);
          const res = await verifyOTP(payload);
          if (!res || !res?.success) {
            console.log('OTP Invalid', res?.errorMessage);
            values.setMessage({ type: 'error', text: res?.errorMessage });
          } else {
            localStorage.setItem(
              KEY_LOGIN_ACCESS_TOKEN,
              res?.accessToken?.token
            );
            setVerifyData(res);
            console.log('verified data', res);
          }
        } catch (error) {
          console.log(error);
          values.setMessage({ type: 'error', text: 'OTP Invalid' });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    // console.log('final data', verifyData);
    let userData;
    if (verifyData) {
      getStudentInfo(verifyData?.userEmail)
        .then(res => {
          if (res) {
            return (userData = res);
          } else {
            return (userData = null);
          }
        })
        .catch(err => {
          console.log('Error', err);
          return null;
        });

      // console.log('userData', userData);

      let dataToSet = {
        ContactId: verifyData?.userId,
        Name: verifyData?.userName,
        Type: verifyData?.userType,
        // Phone: userData?.Phone,
        mail: verifyData?.userEmail,
      };
      localStorage.setItem(KEY_USER_DETAILS, JSON.stringify(dataToSet));
      history.push(`/${Routes.home}`);
    }
  }, [verifyData !== null]);

  const ResendOtp = () => {
    logInProcess();
    setState({
      seconds: 0,
      minutes: 2,
    });
  };
  return (
    <Grid item xs={12} sm={12} md={12} className={classes.image}>
      {loading && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Top-Center"
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CssBaseline />
        <Box
          mt={25}
          component="main"
          maxWidth="xs"
          style={{ maxWidth: '400px' }}
        >
          <Paper style={{ padding: '24px' }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                {/* <img
                    alt="logo"
                    src='../../../assets/lxl.png'
                    style={{ height: '80px', width: 'auto' }}
                  /> */}
                {/* {config?.logo && config?.logo ? (
                  <img
                    alt="logo"
                    src='../../assets/lxl.png'
                    style={{ height: '80px', width: 'auto' }}
                  />
                ) :  */}
                
                {/* (

                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.form}>
                  {values.activeStep === 1 ? (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12}>
                        <KenInputField
                          placeholder={
                            'Please enter the OTP sent to your registered Email ID.'
                          }
                          required
                          label={t('labels:OTP')}
                          name="otp"
                          value={values.otp}
                          onChange={handleChangeOtp}
                          errors={errors.otp}
                          touched={touched.otp}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <KenButton
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={handleSubmit}
                        >
                          Verify & Sign in
                        </KenButton>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid
                          item
                          xs={12}
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item xs={12}>
                            {state?.minutes === 0 && state?.seconds === 0 ? (
                              <Box style={{display:'flex', justifyContent:'center'}}>
                                <KenButton
                                onClick={ResendOtp}
                                // disabled={
                                //   state?.minutes === 0 && state?.seconds === 0
                                //     ? false
                                //     : true
                                // }
                              >
                                Resend OTP
                              </KenButton>
                              </Box>
                            ) : (
                              <Typography align='center'>
                                {state?.minutes}:
                                {state?.seconds < 10
                                  ? `0${state?.seconds}`
                                  : state?.seconds}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12}>
                        <KenInputField
                          required
                          label={t('labels:Email')}
                          name="email"
                          placeholder="Please enter your Email Id"
                          value={values.email}
                          onChange={handleChangeEmail}
                          errors={errors.email}
                          touched={touched.email}
                          labelClassName={classes.inputFieldLabel}
                        />{' '}
                      </Grid>
                      <Grid item xs={12}>
                        <KenButton
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={handleSubmit}
                        >
                          Request OTP
                        </KenButton>
                      </Grid>
                    </Grid>
                  )}

                  {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
                  {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid> */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Grid>
  );
};

const FormikHoc = props => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);
  const [message, setMessage] = React.useState();

  const MailValidate = Yup.object().shape({
    email: Yup.string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
  });
  const OtpValidate = Yup.object().shape({
    otp: Yup.number().required(t('validations:required')),
  });
  const getValidation = () => {
    switch (activeStep) {
      case 0:
        return MailValidate;
      case 1:
        return OtpValidate;
      default:
        null;
    }
  };

  const ExistingFormik = withFormik({
    mapPropsToValues: () => ({
      phone: '',
      countrycode: '',
      otp: '',
      email: '',
      activeStep: activeStep,
      setActiveStep: setActiveStep,
      message: message,
      setMessage: setMessage,
    }),
    validationSchema: getValidation,

    handleSubmit: values => {
      values.authenticateUser();
    },

    displayName: 'ExistingInformation',
  })(ExistingForm);

  return <ExistingFormik {...props} />;
};
