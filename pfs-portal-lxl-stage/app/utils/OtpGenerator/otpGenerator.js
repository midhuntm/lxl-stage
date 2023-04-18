var otpGenerator = require('otp-generator');


const generateOtp = ()=>{
    const otp = otpGenerator.generate(4,
      { 
        digits:true,
        upperCase: false, 
        specialChars: false,
        alphabets:false 
      }
    );
    return otp; 
}

export default generateOtp;