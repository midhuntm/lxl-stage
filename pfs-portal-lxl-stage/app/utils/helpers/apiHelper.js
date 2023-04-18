import { getOtp, getValidateOtp } from '../ApiService';

const sendOtpTo = async (email, phone, otpto) => {
  const optpTo = otpto.toLowerCase();
  let queryParams;
  switch (optpTo) {
    case 'both':
      queryParams = `email=${email}&mobileno=${phone}`;
      break;
    case 'sms':
      queryParams = `mobileno=${phone}`;
      break;
    case 'email':
      queryParams = `email=${email}`;
      break;

    default:
      queryParams = null;
      break;
  }
  if (queryParams) {
    return getOtp(queryParams).then(res => {
      return res;
    });
  } else return null;
};

const isOtpValid = async (email, phone, otpto, otp) => {
  const optpTo = otpto.toLowerCase();
  let queryParams;
  switch (optpTo) {
    case 'both':
      queryParams = `email=${email}&mobileno=${phone}&otp=${otp}`;
      break;
    case 'sms':
      queryParams = `mobileno=${phone}&otp=${otp}`;
      break;
    case 'email':
      queryParams = `email=${email}&otp=${otp}`;
      break;

    default:
      queryParams = null;
      break;
  }

  if (queryParams) {
    return getValidateOtp(queryParams).then(res => {
      return res;
    });
  } else return null;
};

export { sendOtpTo, isOtpValid };
