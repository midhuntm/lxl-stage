import axios from 'axios';
import moment from 'moment';
import UrlEndPoints from './urlEndPoints.json';
import {
  KEY_ACCESS_TOKEN,
  KEY_CONFIG_URL,
  KEY_DATE_FORMAT,
  KEY_LOGIN_ACCESS_TOKEN,
  FILE_TOKEN
} from './constants';

let appConfig;
export let axiosInstance;
const configUrl = KEY_CONFIG_URL;
// let paymentInstance;
let integrationInstance;

const getInsConfig = config => {
  return config;
};

export const getAxiosInstance = async data => {
  appConfig = data[0]?.config;
  localStorage.setItem('fileToken', appConfig.lmsToken);
  if (axiosInstance) {
    return axiosInstance;
  }
  axiosInstance = axios.create({
    baseURL: `${appConfig.apiBaseUrl}`,
    timeout: 15000,
  });

  axiosInstance.interceptors.request.use(req => {
    const token = localStorage.getItem(KEY_ACCESS_TOKEN);
    req.headers['access-token'] = localStorage.getItem(KEY_LOGIN_ACCESS_TOKEN);
    req.headers.Authorization = `Bearer ${token}`;

    console.log('req: ', req);
    return req;
  });

  //Response interceptor for API calls
  axiosInstance.interceptors.response.use(
    resp => {
      return resp;
    },
    async function (error) {
      // console.log('ApiService: Interceptor: ', error);
      if (!error.response?.config && error.response?.status !== 401) {
        return error;
      }
      var config = {
        method: 'get',
        // baseURL: `${appConfig.apiBaseUrl}/token?grant_type=client_credentials`,
        // headers: {
        //   Authorization: `Basic ${appConfig.tokenHeader}`,
        // },
        baseURL: `${appConfig.tokenUrl}`,
      };
      return axios(config).then(function (response) {
        localStorage.setItem(KEY_ACCESS_TOKEN, response.data.access_token);
        error.response.config.headers['Authorization'] = `Bearer ${response.data.access_token
          }`;
        return axios(error.response.config);
      });
    }
  );
};

export const getIntegrationInstance = async () => {
  // console.log('Integration: appCOnfig ', appConfig)
  if (integrationInstance) {
    return integrationInstance;
  }
  integrationInstance = axios.create({
    baseURL: `${appConfig.integrationUrl}`,
    timeout: 15000,
  });

  integrationInstance.interceptors.request.use(req => {
    const token = localStorage.getItem(KEY_ACCESS_TOKEN);
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['access-token'] = localStorage.getItem(KEY_LOGIN_ACCESS_TOKEN);
    return req;
  });

  //Response interceptor for API calls
  integrationInstance.interceptors.response.use(
    resp => {
      return resp;
    },
    async function (error) {
      var config = {
        method: 'get',
        baseURL: `${appConfig.tokenUrl}`,
      };
      return axios(config).then(function (response) {
        localStorage.setItem(KEY_ACCESS_TOKEN, response.data.access_token);
        error.response.config.headers['Authorization'] = `Bearer ${response.data.access_token
          }`;
        return axios(error.response.config);
      });
    }
  );
  return integrationInstance;
};

export const createQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createQuiz}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//Publish/Unpublish quiz, assignments, resources etc.
export const publishUnpublishLMSModule = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.publishUnpublishLMSModule}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getPaymentInstance = async data => {
  appConfig = await getInsConfig(data[0].config);
  // paymentInstance = await axios.create({
  //   baseURL: `${appConfig.paymentBaseUrl}`,
  //   timeout: 15000,
  // });
};

// Request interceptor for API calls

const ApiService = (method, url, config = null) => {
  switch (method) {
    case 'get':
      return axiosInstance.get(url);

    case 'post':
      return axiosInstance.post(url, config.body || {});

    case 'patch':
      return axiosInstance.patch(url, config.body || {});

    case 'put':
      return axiosInstance.post(url, config.body ? config.body : null);

    case 'delete':
      return axiosInstance.delete(url);

    default:
      console.log('axios default: ', method, url, config);
      break;
  }
};

export const getStudentDetails = async contactId => {
  const res = await axiosInstance.get(`/${UrlEndPoints.contact}/${contactId}`);
  return res && res.data ? res.data : null;
};

export const getStudentInfo = async contactId => {
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }/sf/data?api=services/apexrest/ContactDetail/${contactId}`
  );
  return res && res.data ? res.data : null;
};

export const getAttendanceInfo = async (
  contactId,
  startDate = '',
  endDate = ''
) => {
  const query = encodeURIComponent(
    `services/apexrest/StudentAttendanceData?contactId=${contactId}&StartDate=${startDate}&EndDate=${endDate}`
  );
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/sf/data?api=${query}`
  );
  return res && res.data ? res.data : null;
};

// Attendance events
export const getAttendanceEvent = async (
  contactId,
  courseOffering = '',
  startDate = '',
  endDate = ''
) => {
  const query = encodeURIComponent(
    `services/apexrest/attendancebyStudent/?contactId=${contactId}&courseOfferingId=${courseOffering}&startDate=${startDate}&endDate=${endDate}`
  );
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/sf/data?api=${query}`
  );
  return res && res.data ? res.data : null;
};

export const getProfileImageData = async courseOfferingId => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(
    `services/apexrest/ContactAttachment/?recordId=${courseOfferingId}&fileName=passportPhoto`
  );
  const res = await axiosInstance.get(`${path}${query}`);
  return res && res.data ? res.data : null;
};
export const saveStudentEducationInfo = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/EducationHistoryApi`);

  const res = await axiosInstance.post(`${path}${query}`, { records: data });
  return res && res.data ? res.data : null;
};

export const saveStudentProfileImage = async (data, contactId) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const path = `${appConfig.integrationUrl}`;
  const query = `/report/signature?programEnrollmentId=${contactId}&fileName=passportPhoto`;

  const res = await axiosInstance.post(`${path}${query}`, data, headers);
  return res && res.data ? res.data : null;
};

export const saveStudentAddressInfo = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/Address`);
  const newData = data.map(ele => {
    return ele.add;
  });
  const res = await axiosInstance.post(`${path}${query}`, { records: newData });
  return res && res.data ? res.data : null;
};

export const saveResearchSuperVision = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/createAdditionalInfo`);
  const newData = {
    Operation: 'Create',
    AdditionalInformation: data,
  };
  const res = await axiosInstance.post(`${path}${query}`, newData);
  return res && res.data ? res.data : null;
};

export const saveStudentRelationInfo = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/Relationship`);

  const newData = data.map(ele => {
    return ele.res;
  });
  const res = await axiosInstance.post(`${path}${query}`, { records: newData });
  return res && res.data ? res.data : null;
};
export const saveStudentProfileInfo = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/ContactDetail`);
  const res = await axiosInstance.post(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

export const saveFacultyAddressInfo = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/Address`);
  const res = await axiosInstance.post(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

export const getFacultyDetails = async academicProgramId => {
  const res = await axiosInstance.get(
    `${UrlEndPoints.faculty}/${academicProgramId}`
  );
  return res && res.data ? res.data : null;
};

export const getAllCourses = async (contactId, programId) => {
  const res = await axiosInstance.get(
    `${UrlEndPoints.getallcourse}/${contactId}/${programId}`
  );
  return res && res.data ? res.data : null;
};

export const getStudents = async courseOfferingId => {
  const path = `/${UrlEndPoints.getstudent}/${courseOfferingId.trim()}`;
  const res = await axiosInstance.get(path);
  return res && res.data ? res.data : null;
};

// get courses for faculty
export const getCourses = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/courseConnections/?contactId=${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
  //   if (res?.data?.success === 'true') {
  //     return res.data.Data.map(el => {
  //       return {
  //         ...el,
  //         hed__Course__cName: el.CourseName,
  //         hed__Course__cId: el.CourseId,
  //         hed__Term__c: el.TermName,
  //       };
  //     });
  //   } else {
  //     return [];
  //   }
};

export const getMarketplaceURL = async params => {
  const path = `/${UrlEndPoints.marketplace}`;
  const res = await integrationInstance.get(`${path}?${params}`);
  return res && res.data ? res.data : null;
};

export const getParentDetails = async phoneNo => {
  const path = `/${UrlEndPoints.parent}/${phoneNo.trim()}`;
  const res = await axiosInstance.get(path);
  return res && res.data ? res.data : null;
};

export const facultyActivities = async (
  contactID,
  connectionID,
  startDate,
  endDate
) => {
  startDate = moment()
    .subtract(6, 'month')
    .format(KEY_DATE_FORMAT)
    .toLowerCase();
  endDate = moment()
    .add(6, 'months')
    .format(KEY_DATE_FORMAT)
    .toLowerCase();
  const data = {
    useridnumber: contactID,
    connectionid: connectionID,
    modtype: '',
    startdate: startDate,
    enddate: endDate,
    generalsection: '',
    method: 'POST',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.activities}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const StudentActivities = async (
  contactID,
  connectionID,
  generalId,
  startDate,
  endDate
) => {
  startDate = moment()
    .subtract(6, 'month')
    .format(KEY_DATE_FORMAT)
    .toLowerCase();
  endDate = moment()
    .add(6, 'months')
    .format(KEY_DATE_FORMAT)
    .toLowerCase();
  const data = {
    useridnumber: contactID,
    connectionid: '',
    modtype: '',
    generalsection: generalId ? '1' : '',
    startdate: startDate,
    enddate: endDate,
    method: 'POST',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.studentactivities}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getConfig = async () => {
  // const path = `${window.location.host}`;
  const path = 'lxl-stg-portal.ken42.com';
  const res = await axios.get(`${configUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getOtp = async params => {
  const path = `otp`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/${path}?${params}`
  );
  return res && res.data ? res.data : null;
};

export const subscribe = async data => {
  const path = `notification/subscribeWeb`;
  const res = await axiosInstance.post(
    `${appConfig.firebaseBaseURL}/${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

export const unsubscribe = async data => {
  const path = `notification/unsubscribeWeb`;
  const res = await axiosInstance.post(
    `${appConfig.firebaseBaseURL}/${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

export const getValidateOtp = async params => {
  const path = `validateotp`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/${path}?${params}`
  );
  return res && res.data ? res.data : null;
};

// TODO: remove hardcode
export const sendMail = async data => {
  const path = `email`;
  const res = await axiosInstance.post(
    `https://api.ken42.com/vks/pfs/v1/${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

export const getAllEvents = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/eventsData/?contactId=${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const requestForOTP = async payload => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/PFSOtp/send?contact=${payload}`
  )}`;
  const res = await axiosInstance.post(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const verifyOTP = async payload => {
  const path = `salesforce?endpoint=/services/apexrest/PFSOtp/verify&contact=${payload.id
    }&otpentered=${payload.otp}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getReportCardDetails = async (
  contactId,
  programEnrollmentId,
  loginContactId
) => {
  const path = `report/details`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }/${path}?contactId=${contactId}&programEnrollmentId=${programEnrollmentId}&loginContactId=${loginContactId}`
  );
  return res && res.data ? res.data : null;
};

// Query Comments

// export const getCommentsById = async id => {
//   if (!id) return;
//   const path = `/${UrlEndPoints.comments}/${id}`;
//   const res = await axiosInstance.get(path);
//   return res && res.data ? res.data : null;
// };

export const postComments = async (ContactId, Comment, ParentId) => {
  const path = `/${UrlEndPoints.comments}`;
  const res = await axiosInstance.post(path, { ContactId, Comment, ParentId });
  return res && res.data ? res.data : null;
};
export const postBreakdownMarks = async data => {
  const path = '/submit-additional-grade-pfs';
  const res = await axiosInstance.post(`${path}`, data);
  return res && res.data ? res.data : null;
};

export const getStudentListDetails = async (
  courseOfferingId,
  loginContactId
) => {
  const path = `/report/grades`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }${path}?courseOfferingId=${courseOfferingId}&loginContactId=${loginContactId}`
  );
  return res && res.data ? res.data : null;
};

export const getSignature = async (programEnrollmentId, fileName) => {
  const path = `/report/signature`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }${path}?programEnrollmentId=${programEnrollmentId}&fileName=${fileName}`
  );
  return res && res.data ? res.data : null;
};

export const uploadSignature = async (programEnrollmentId, fileName, data) => {
  const path = `/report/signature`;

  const apiUrl = `${appConfig.integrationUrl
    }${path}?programEnrollmentId=${programEnrollmentId}&fileName=${fileName}`;

  let formData = new FormData();
  formData.append('signature', data);

  const res = await axiosInstance.post(apiUrl, formData);
  return res && res.data ? res.data : null;
};

export const getConsolidatedMarks = async (classId, sectionName) => {
  const path = `/report/consolidatedReports`;
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }${path}?classId=${classId}&sectionName=${sectionName}`
  );
  return res && res.data ? res.data : null;
};

// SalesforceAPIs
export const getSalesforceData = async data => {
  const path = encodeURIComponent(`${data}`);
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/${UrlEndPoints.FeeInventory}?api=${path}`
  );
  return res && res.data ? res.data : null;
};
export const getSalesforceBaseData = async data => {
  const path = encodeURIComponent(`${data}`);
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/salesforce?endpoint=${path}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    }
  );
  return res && res.data ? res.data : null;
};
// Fee Management Common
export const getStudentDetailsByContact = async data => {
  return getSalesforceData(`StudentDetailAPI/${data}`);
};
// My Cart
export const getFeeInventoryByContact = async data => {
  return getSalesforceData(`FeeScheduleAPI/${data}`);
};
export const postFeeInventoryByContact = async (params, data) => {
  const path = encodeURIComponent(`CartDefaultFee/${params}`);
  const res = await axiosInstance.post(
    `${appConfig.integrationUrl}/${UrlEndPoints.PostFeeInventory}?api=${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

// Fee Schedule
export const getFeeScheduleByContact = async data => {
  return getSalesforceData(`PaymentSchedule/${data}`);
};

// Fee Payment
export const getFeePaymentByContact = async data => {
  return getSalesforceData(`FeeLineItem/${data}`);
};

export const postFeePaymentByContact = async data => {
  const path = encodeURIComponent(`payment_links`);
  const res = await axiosInstance.post(
    `${appConfig.integrationUrl}/payment_links`,
    data
  );
  return res && res.data ? res.data : null;
};

// My Transactions
export const getMyTransactionsByContact = async data => {
  return getSalesforceData(`ActualPayment/${data}`);
};

export const getMyReceiptsByContact = async data => {
  return getSalesforceBaseData(
    `services/data/v53.0/sobjects/Attachment/${data}/Body`
  );
};

export const getAttendancePercentage = async data => {
  const path = encodeURIComponent(`getAttendancePercentage?${data}`);
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/${UrlEndPoints.attendancePercentage
    }?api=${path}`
  );
  return res && res.data ? res.data : null;
};

// Virtual class
export const getRecordings = async meetingId => {
  const instance = await getIntegrationInstance();
  const res = await instance?.get(
    `${UrlEndPoints.getRecordings}?meetingID=${meetingId}`
  );
  return res && res.data ? res.data : null;
};

export const getQuestionBankFilters = async contactId => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.questionBankFilters}`,
    { method: 'get', contactid: contactId },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const createAttribute = async data => {
  const path = `${UrlEndPoints.attributes}`;
  const res = await axiosInstance.post(
    `${appConfig?.appBaseUrl}/${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

//-----------------------Faculty/Admin Assessments

export const getQuizQuestions = async quizId => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizQuestions}`,
    { method: 'get', quizcmid: quizId },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const getQuestionBankQuestions = async (subjectId, questionTypes) => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.questionBank}`,
    { courseid: subjectId, qtype: questionTypes, method: 'get' },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getQuestionDetail = async qId => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.questionDetail}`,
    { questionid: qId, method: 'get' },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

const getChoices = options => {
  if (Array.isArray(options)) {
    return options.map(item => {
      return {
        option: item.option,
        correctanswer: item.correctAnswer,
        feedback: item.feedback,
      };
    });
  } else return [];
};

export const addMCQQuestionToQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addMCQQuestion}`,
    {
      method: 'post',
      quizid: data?.quizId,
      page: data?.page,
      questionname: data?.questionName,
      questiontext: data?.questionText,
      defaultmark: data?.defaultMarks,
      penalty: data?.penalty,
      singleanswer: data?.singleAnswer,
      correctfeedback: data?.correctFeedback || '',
      incorrectfeedback: data?.incorrectFeedback || '',
      generalfeedback: data?.generalFeedback || '',
      tags: data?.tags || [],
      choices: getChoices(data?.choices),
      shuffleanswers: data?.shuffleAnswers,
      answernumbering: data?.answerNumbering,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateMCQQuestionToQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateMCQQuestion}`,
    {
      method: 'post',
      quizid: data?.quizId,
      questionid: data?.questionId,
      //   page: data?.page,
      questionname: data?.questionName,
      questiontext: data?.questionText,
      defaultmark: data?.defaultMarks,
      penalty: data?.penalty,
      singleanswer: data?.singleAnswer,
      correctfeedback: data?.correctFeedback || '',
      incorrectfeedback: data?.incorrectFeedback || '',
      generalfeedback: data?.generalFeedback || '',
      tags: data?.tags || [],
      choices: getChoices(data?.choices),
      //   shuffleanswers: data?.shuffleAnswers,
      answernumbering: data?.answerNumbering,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const addQuestionsToQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addQuestionsToQuiz}`,
    {
      method: 'post',
      quizid: data?.quizId,
      questions: data?.questions,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const deleteQuestionFromQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.deleteQuestionFromQuiz}`,
    {
      method: 'post',
      quizid: data?.quizId,
      questionid: data?.questionId,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//----------------True/false------------------------

export const addTrueFalseToQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addTrueFalseQuestion}`,
    {
      method: 'post',
      quizid: data?.quizId,
      page: data?.page || 1,
      defaultmark: data?.defaultMarks || 0,
      questionname: data?.questionName || 'truefalse',
      questiontext: data?.questionText,
      rightanswer: data?.rightAnswer,
      generalfeedback: data?.generalFeedback || '',
      feedbacktrue: data?.correctFeedback || '',
      feedbackfalse: data?.incorrectFeedback || '',
      tags: data?.tags || [],
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateTrueFalseToQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateTrueFalseQuestion}`,
    {
      method: 'post',
      quizid: data?.quizId,
      questionid: data?.questionId,
      //   page: data?.page,
      defaultmark: data?.defaultMarks || 0,
      questionname: data.questionName,
      questiontext: data?.questionText,
      rightanswer: data?.rightAnswer,
      generalfeedback: data?.generalFeedback || '',
      feedbacktrue: data?.correctFeedback || '',
      feedbackfalse: data?.incorrectFeedback || '',
      tags: data?.tags || [],
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const addTrueFalseQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addTrueFalseQuestionBank}`,
    {
      courseid: data?.courseId,
      chapter: data?.chapterId,
      method: 'post',
      questionname: '',
      questiontext: data?.questionText,
      rightanswer: data?.rightAnswer,
      generalfeedback: data?.generalFeedback,
      defaultmark: data?.defaultMarks || 0,
      generalfeedback: data?.generalFeedback || '',
      feedbacktrue: data?.correctFeedback || '',
      feedbackfalse: data?.incorrectFeedback || '',
      tags: data?.tags || [],
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateTrueFalseQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateTrueFalseQuestionBank}`,
    {
      questionid: data?.questionId,
      courseid: data?.courseId,
      chapter: data?.chapterId,
      method: 'post',
      questionname: '',
      questiontext: data?.questionText,
      rightanswer: data?.rightAnswer,
      defaultmark: data?.defaultMarks || 0,
      generalfeedback: data?.generalFeedback || '',
      feedbacktrue: data?.correctFeedback || '',
      feedbackfalse: data?.incorrectFeedback || '',
      tags: data?.tags || [],
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//--------------------Match the following-------------
export const addMatchingQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addMatchingQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      page: data?.page,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      shuffleanswers: data?.shuffleanswers,
      correctfeedback: data?.correctfeedback,
      incorrectfeedback: data?.incorrectfeedback,
      generalfeedback: data?.generalfeedback,
      partiallycorrectfeedback: data?.partiallycorrectfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateMatchingQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateMatchingQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      questionid: data?.questionId,
      //   page: data?.page,
      questionname: data?.questionname,
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      shuffleanswers: data?.shuffleanswers,
      correctfeedback: data?.correctfeedback,
      incorrectfeedback: data?.incorrectfeedback,
      generalfeedback: data?.generalfeedback,
      partiallycorrectfeedback: data?.partiallycorrectfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//--------------------Subjective-------------
export const addEssayQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addEssayQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      page: data?.page,
      questionname: 'test',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      generalfeedback: data?.generalfeedback || '',
      allowattachments: data?.allowattachments,
      attachmentrequired: data?.attachmentrequired,
      tags: data?.tags,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateEssayQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateEssayQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      //   page: data?.page,
      questionname: '',
      questionid: data?.questionId,
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      generalfeedback: data?.generalfeedback || '',
      allowattachments: data?.allowattachments,
      attachmentrequired: data?.attachmentrequired,
      tags: data?.tags,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
//--------------------Fill in the Blanks-------------
export const addMissingWordsQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addMissingWordsQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      page: data?.page,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      correctfeedback: data?.correctfeedback,
      incorrectfeedback: data?.incorrectfeedback,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateMissingWordsQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateMissingWordsQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      questionid: data?.questionId,
      //   page: data?.page,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      correctfeedback: data?.correctfeedback,
      incorrectfeedback: data?.incorrectfeedback,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
//--------------------Numerical-------------
export const addNumericalQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addNumericalQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      page: data?.page,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateNumericalQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateNumericalQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      questionid: data?.questionId,
      //   page: data?.page,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//--------------------Short Answer-------------
export const addShortAnswerQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addShortAnswerQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      page: data?.page,
      questionname: 'shortanswer',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      // penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateShortAnswerQuestion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateShortAnswerQuestion}`,
    {
      method: 'post',
      quizid: data?.quizid,
      questionid: data?.questionId,
      //   page: data?.page,
      questionname: 'shortanswer',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      // penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags,
      choices: data?.choices,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//--------------------Short Answer-------------
export const addShortAnswerQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addShortAnswerQuestionBank}`,
    {
      method: 'post',
      courseid: data?.courseId,
      chapter: data?.chapterId,
      questionname: 'shortanswer',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      // penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags || [],
      choices: data?.choices,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateShortAnswerQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateShortAnswerQuestionBank}`,
    {
      method: 'post',
      questionid: data?.questionId,
      courseid: data?.courseId,
      chapter: data?.chapterId,
      //   page: data?.page,
      questionname: 'shortanswer',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      // penalty: data?.penalty,
      generalfeedback: data?.generalfeedback,
      tags: data?.tags || [],
      choices: data?.choices,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//-------------student assessments------------------------------------

export const GetAttemptSummary = async attemptId => {
  const data = {
    attemptid: attemptId,
    method: 'get',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getAttemptSummary}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const postProcessAttempt = async (
  attemptId,
  answers,
  finishattempt,
  timeup
) => {
  const data = {
    attemptid: attemptId,
    data: answers,
    finishattempt: finishattempt,
    timeup: timeup,
    method: 'post',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.processAttempt}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};
/* Assessment get quiz instruction */
export const QuizInstruction = async quizid => {
  const data = {
    quizid: quizid,
    method: 'GET',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizInstruction}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};
/* Assessment 1)  quiz access information */
export const QuizAccessInformation = async (contactId, quizId) => {
  const data = {
    contactid: contactId,
    quizid: quizId,
    method: 'GET',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizAccessInformation}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};
/* Assessment 2) Attempt Access Information */
export const AttemptAccessInformation = async (
  contactId,
  quizId,
  attemptId
) => {
  const data = {
    contactid: contactId,
    quizid: quizId,
    attemptid: '0',
    method: 'GET',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getAttemptAccessInformation}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};
/* Assessment 3) view quiz*/
export const ViewQuiz = async quizId => {
  const data = {
    quizid: quizId,
    method: 'GET',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.viewQuiz}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

/* Assesment 4) get_user_attempts */

export const GetUserAttempts = async (contactId, quizId) => {
  const data = {
    quizid: quizId,
    contactid: contactId,
    status: 'all',
    includepreviews: '1',
    method: 'post',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getUserAttempts}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};
/* Assesment 5)  start attempt */
export const StartAttempt = async (contactId, quizId) => {
  const data = {
    quizid: quizId,
    contactid: contactId,
    method: 'POST',
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.startAttempt}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const getQuizzes = async courseOffering => {
  const data = { courseoffering: courseOffering };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizzes}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const postCoreFileUpload = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.coreFileUpload}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const postDeleteUploadedFile = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.deleteUploadedFile}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const getChapterGrades = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.get_chapter_grades}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const FacultyResult = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.get_result_faculty}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
/* ----start Question bank  */
export const getChaptersByCourse = async courseId => {
  const data = {
    method: 'get',
    courseid: courseId,
  };
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getChaptersByCourse}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const getUserCourses = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getUserCourses}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//get session list with filters
export const getAllAttendanceSessionCount = async () => {
  const path = `sf/data?api=${encodeURIComponent(
    `services/apexrest/AttendanceCount`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getFacultyAttendanceCount = async facultyId => {
  const path = `sf/data?api=${encodeURIComponent(
    `services/apexrest/AttendanceCount/?facultyId=${facultyId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const getContactAttendanceCount = async contactId => {
  const path = `sf/data?api=${encodeURIComponent(
    `services/apexrest/AttendanceCount/?contactId=${contactId}`
  )}`;

  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const getFacultyAttendanceCountByOffering = async (
  facultyId,
  courseOfferingId
) => {
  const path = `sf/data?api=${encodeURIComponent(
    `services/apexrest/AttendanceCount/?facultyId=${facultyId}&courseOfferingId=${courseOfferingId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const getContactAttendanceCountByOffering = async (
  contactId,
  courseOfferingId
) => {
  const path = `sf/data?api=${encodeURIComponent(
    `services/apexrest/AttendanceCount/?contactId=${contactId}&courseOfferingId=${courseOfferingId}`
  )}`;

  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getStudentListByCourseOffering = async courseId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/studentsByCourseOffering?CourseOfferingId=${courseId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getAttendanceByCourseOffering = async (
  courseId,
  startTime,
  endTime,
  dateval
) => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/attendanceByCourseOffering?CourseOfferingId=${courseId}&startTime=${startTime}&endTime=${endTime}&dateval=${dateval}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const postAttendanceByCourseOffering = async data => {
  const path = `api=attendanceByCourseOffering`;
  const res = await axiosInstance.post(
    `${appConfig.integrationUrl}/sf/createData?${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

export const addMCQToQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addMultichoiceQuestionBank}`,
    {
      courseid: data?.courseId,
      chapter: data?.chapterId,
      method: 'post',
      questionname: data?.questionName,
      questiontext: data?.questionText,
      defaultmark: data?.defaultMarks,
      penalty: data?.penalty,
      singleanswer: data?.singleAnswer,
      correctfeedback: data?.correctFeedback || '',
      incorrectfeedback: data?.incorrectFeedback || '',
      generalfeedback: data?.generalFeedback || '',
      tags: data?.tags || [],
      choices: getChoices(data?.choices),
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const updateMCQToQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateMultichoiceQuestionBank}`,
    {
      questionid: data?.questionId,
      courseid: data?.courseId,
      chapter: data?.chapterId,
      method: 'post',
      questionname: data?.questionName,
      questiontext: data?.questionText,
      defaultmark: data?.defaultMarks,
      penalty: data?.penalty,
      singleanswer: data?.singleAnswer,
      correctfeedback: data?.correctFeedback || '',
      incorrectfeedback: data?.incorrectFeedback || '',
      generalfeedback: data?.generalFeedback || '',
      tags: data?.tags || [],
      choices: getChoices(data?.choices),
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const postFeePaymentUsingFlywire = async data => {
  const res = await axiosInstance.post(
    `${appConfig.integrationUrl}/payments/flywire/initiate`,
    data
  );
  return res && res.data ? res.data : null;
};

export const getCourseEnrollment = async contactID => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/CoursesByContactActiveEnrol?contactId=${contactID}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getCourseOfferingByCourseAndTerm = async payload => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/CourseOfferingByCourseAndTerm?TermId=${payload.TermId
    }&CourseId=${payload.CourseId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getRecordingsByCourseOffering = async courseOfferingId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/recording?courseOfferingId=${courseOfferingId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//lxl
export const courseDataOrganizer = async courseId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/Chapters/?CourseOfferingID=${courseId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const updateRecordingsByCourseOffering = async (recordingId, data) => {
  const path = `endpoint=${encodeURIComponent(
    `services/apexrest/recording?recordingId=${recordingId}`
  )}`;

  const res = await axiosInstance.patch(
    `${appConfig.integrationUrl}/salesforce/?${path}`,
    data
  );
  return res && res.data ? res.data : null;
};
export const addEssayQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addEssayQuestionBank}`,
    {
      method: 'get',
      courseid: data?.courseId,
      chapter: data?.chapterId,
      questionname: 'test',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      generalfeedback: data?.generalfeedback,
      allowattachments: data?.allowattachments,
      attachmentrequired: data?.attachmentrequired,
      tags: data?.tags,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const updateEssayQuestionBank = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateEssayQuestionBank}`,
    {
      method: 'get',
      questionid: data?.questionId,
      courseid: data?.courseId,
      chapter: data?.chapterId,
      questionname: '',
      questiontext: data?.questiontext,
      defaultmark: data?.defaultmark,
      generalfeedback: data?.generalfeedback,
      allowattachments: data?.allowattachments,
      attachmentrequired: data?.attachmentrequired,
      tags: data?.tags,
      metadata: data?.metadata || [],
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//Get subject content
export const getCourseContent = async (courseid, useridnumber) => {
  console.log('in api service getCourse', courseid, useridnumber);
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getCourseContent}`,
    {
      method: 'post',
      courseoffering: courseid,
      useridnumber: useridnumber,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//Get subject content faculty
export const getCourseContentFaculty = async (courseid, useridnumber) => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getCourseContentFaculty}`,
    {
      method: 'post',
      courseoffering: courseid,
      useridnumber: useridnumber,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const getCourseActivities = async (
  connectionId,
  contactId,
  activityType
) => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getCourseActivities}`,
    {
      connectionid: connectionId,
      contactid: contactId,
      allsection: 1,
      addtionalinfo: 1,
      activitytype: activityType,
      method: 'get',
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const getQuizSettingsById = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizSettings}`,
    {
      method: 'get',
      quizid: data?.quizid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const createSectionInQuiz = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createSectionInQuiz}`,
    {
      method: 'post',
      page: data?.page,
      quizid: data?.quizid,
      section: data?.section,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

// videostatus uploading
export const urlCompletionSet = async data => {
  let token = localStorage.getItem(FILE_TOKEN);
  console.log("fileToken", token);
  console.log("payload", data);
  const res = await axios.post(
    `https://lxl-stg-lms.ken42.com/webservice/restful/server.php/${UrlEndPoints.urlCompletionSet}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: { token }
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const postCourseEnrolmentByTerm = async payload => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(
    `services/apexrest/createCourseEnrolmentByTerm`
  );
  const res = await axiosInstance.post(`${path}${query}`, payload);
  return res && res.data ? res.data : null;
};
// Completed Enrollment
export const getCompletedEnrollment = async contactID => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/courseconnectionByContactId?contactId=${contactID}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
// Student Feedback Form
export const getStudentFeedbackDetails = async contactID => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/api/FacultyFeedback/${contactID}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const getProgramFeedbackDetails = async contactID => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/api/ProgramFeedback/${contactID}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const postProgramFeedbackDetails = async payload => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/api/ProgramFeedback`);
  const res = await axiosInstance.post(`${path}${query}`, payload);
  return res && res.data ? res.data : null;
};
export const getStudentSessionFeedbackDetails = async contactID => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/SessionFeedbackSetupData/?studentId=${contactID}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const postStudentFeedbackDetails = async payload => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/api/FacultyFeedback`);
  const res = await axiosInstance.post(`${path}${query}`, payload);
  return res && res.data ? res.data : null;
};

export const checkPaymentStatus = async data => {
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl}/payments/transaction?transactionId=${data}`
  );
  return res && res.data ? res.data : null;
};

//list of session
export const getSessionList = async courseOfferingId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/SessionData/?attendance=false&courseOfferingId=${courseOfferingId} `
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//list of students
export const getStudentList = async CourseOfferingId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/studentsByCourseOffering?CourseOfferingId=${CourseOfferingId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const getStudentAttendanceDataPerCourseOffering = async CourseOfferingId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/StudentAttendanceDataPerCourseOffering?courseOfferingId=${CourseOfferingId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export const updateAssessmentSettings = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateAssessmentSettings}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//----------Submissions of an Assignment---------

export const getSubmission = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getSubmission}`,
    {
      method: 'post',
      cmid: data?.cmid,
      status: data?.status,
      since: data?.since,
      before: data?.before,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const assignGetSubmissionStatus = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.assignGetSubmissionStatus}`,
    {
      method: 'post',
      cmid: data?.cmid,
      contactid: data?.contactid,
      groupid: data?.groupid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const gradeAssignment = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.gradeAssignment}`,
    {
      assignmentid: data?.assignmentid,
      contactid: data?.contactid,
      method: 'post',
      mark: data?.mark,
      comment: data?.comment,
      filename: data?.filename,
      filecontent: data?.filecontent,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const createAssignmentAPI = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createAssignment}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const createResourceAPI = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createResource}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const getResource = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getResource}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const updateResource = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateResource}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const assignmentFileSubmission = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.fileSubmission}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const wsAssignLockSubmission = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.wsAssignLockSubmission}`,
    {
      method: 'post',
      cmid: data?.cmid,
      contactid: data?.contactid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const getSessionData = async (contactId, courseOfferingId) => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(
    `/services/apexrest/SessionData/?contactId=${contactId}`
  );
  const res = await axiosInstance.get(`${path}${query}`);
  return res && res.data ? res.data : null;
};

export const wsAssignUnlockSubmission = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.wsAssignUnlockSubmission}`,
    {
      method: 'post',
      cmid: data?.cmid,
      contactid: data?.contactid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
// GET BOOK REQUEST
export const getBookRequest = async (ContactId, AppID) => {
  const path = `${appConfig.integrationUrl
    }/sf/getData?api=GetCase/${ContactId}`;
  const res = await axiosInstance.get(path);
  return res && res.data ? res.data : null;
};
//POST BOOK REQUEST
export const postBookRequest = async data => {
  const path = `${appConfig.integrationUrl}/sf/case`;
  const res = await axiosInstance.post(path, data);
  return res && res.data ? res.data : null;
};
// GET CASE HISTORY
export const getCaseHistory = async (caseID, AppID) => {
  const path = `${appConfig.integrationUrl
    }/sf/getData?api=GetCaseHistory/${caseID}`;
  const res = await axiosInstance.get(path);
  return res && res.data ? res.data : null;
};
export const postDashboardCases = async data => {
  const path = `${appConfig.integrationUrl
    }/sf/data?api=services/data/v53.0/sobjects/Case`;
  const res = await axiosInstance.post(path, data);
  return res && res.data ? res.data : null;
};
export const updateDashboardQuery = async (caseID, data) => {
  const path = `${appConfig.integrationUrl
    }/sf/data?api=services/data/v53.0/sobjects/Case/${caseID}`;
  const res = await axiosInstance.patch(path, data);
  return res && res.data ? res.data : null;
};

//post attendance event
export const postAttendanceEvent = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/createAttendanceEvent`);
  const res = await axiosInstance.post(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

//get session list with filters
export const getSessionListFilter = async (
  startDate,
  endDate,
  courseOfferingId
) => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/SessionData/?attendance=true&startDate=${startDate}&endDate=${endDate}&courseOfferingId=${courseOfferingId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//get session list with filters
export const getattendancePerSession = async sessionId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/attendancePerSession/?sessionId=${sessionId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//get Events Data
export const getEventsData = async eventId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/eventsData${eventId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//post event register
export const postEventRegister = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/EventRegistration`);
  const res = await axiosInstance.post(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

//get event register
export const getEventRegister = async eventId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/EventRegistration${eventId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
export default ApiService;

//LMS delete course module
export const deleteCourseModule = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.deleteCourseModule}`,
    {
      method: 'get',
      cmid: data?.cmid,
      module: data?.module,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
// LMS get quiz Totalattempted
export const getTotalattemptedQuiz = async quizId => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.quizTotalattempted}`,
    {
      method: 'get',
      quizid: quizId,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//update assignment
export const updateAssignmentSettings = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateAssignmentSettings}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getAssignmentDetails = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getAssignmentDetails}`,
    {
      method: 'post',
      assignid: data?.assignid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const AssignmentGetParticipant = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.assignmentGetParticipant}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
export const UpdateAssignmetSubmission = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateAssignmetSubmission}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
//get Events FiltersData
export const getEventsFiltersData = async () => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `services/apexrest/eventDropdownValues`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const getAttendanceClassConducted = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/AttendanceCount/${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//get teach history
export const getTeachHistory = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/allCourseConnections/?contactId=${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

//getStudents count
export const getStudentsCount = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/courseConnectionsPerStudent/?contactId=${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};

/* LMS Forum API */
/* create Forum */
export const createForum = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createForum}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* Update Forum */
export const updateForum = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateForum}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
/* Get Forum Discussions */
export const getForumDiscussions = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getForumDiscussions}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* Add Forum Discussion */
export const addForumDiscussion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addForumDiscussion}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* Add Forum Discussion Post*/
export const addForumDiscussionPost = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.addForumDiscussionPost}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* Set Fourm Subscription State*/
export const fourmSubscription = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.setFourmSubscriptionState}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* Get Fourm */
export const getForums = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getForums}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* get Forum Access Information*/
export const getForumAccessInformation = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getForumAccessInformation}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* get Discussion Posts*/
export const getDiscussionPosts = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getDiscussionPosts}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* star Toggle Discussion */
export const starToggleDiscussion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.starToggleDiscussion}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* set Lock StateFor Discussion*/
export const lockToggleDiscussion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.setLockStateForDiscussion}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* set Pin State For Discussion*/
export const pinToggleDiscussion = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.setPinStateForDiscussion}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* delete Forum Post */
export const deleteForumPost = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.deleteForumPost}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

//get Additional InfoData
export const getAdditionalInfoData = async contactId => {
  const path = `salesforce?endpoint=${encodeURIComponent(
    `/services/apexrest/ContactAdditionalInfoData/?contactId=${contactId}`
  )}`;
  const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
  return res && res.data ? res.data : null;
};
//delete Additional InfoData
export const deleteAdditionalInfoData = async data => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(`services/apexrest/createAdditionalInfo`);
  console.log('data==============>', data);
  const newData = {
    Operation: 'Delete',
    AdditionalInformation: data,
  };
  const res = await axiosInstance.post(`${path}${query}`, newData);
  return res && res.data ? res.data : null;
};

export const deleteStudentAddressInfo = async id => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(`Address/?recordId=${id}`);
  const res = await axiosInstance.delete(`${path}${query}`);
  return res && res.data ? res.data : null;
};

export const deleteEducationInfo = async id => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(`EducationHistoryApi/?recordId=${id}`);
  const res = await axiosInstance.delete(`${path}${query}`);
  return res && res.data ? res.data : null;
};
/* Get Forum  api*/
export const getForumDetails = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getForumDetails}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

/* get faculty activities count */
export const getFacultyActivitiesCount = async data => {
  const instance = await getIntegrationInstance();

  const res = await instance.post(
    `/lms/?endpoint=${UrlEndPoints.getFacultyActivitiesCount}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getFacultyCourses = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getFacultyCourses}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    }
  );
  return res && res.data ? res.data : null;
};

/* get user activities count */
export const getUserActivitiesCount = async data => {
  const instance = await getIntegrationInstance();
  console.log('data');
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getUserActivitiesCount}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
/* Get Latest Fourm */
export const getLatestForums = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getLatestForums}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
// Create URL Resource
export const createURLResource = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.createURLResource}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
// Update URL Resource
export const updateURLResource = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.updateURLResource}`,
    {
      method: 'post',
      cmid: data?.cmid,
      name: data?.name,
      externalurl: data?.externalurl,
      showdescription: data?.showdescription,
      display: data?.display,
      visible: data?.visible,
      visibleoncoursepage: data?.visibleoncoursepage,
      intro: data?.intro,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};
// get URL Resource
export const getURLResource = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getURLResource}`,
    {
      method: 'post',
      cmid: data?.cmid,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const postAddWorkExperience = async (contactId, data) => {
  const path = `${appConfig.integrationUrl}/sf/data?api=`;
  const query = encodeURIComponent(
    `services/apexrest/AddWorkExperience/${contactId}`
  );
  const res = await axiosInstance.post(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

export const GetAttemptReview = async attemptId => {
  const instance = await getIntegrationInstance();
  let data = {
    attemptid: attemptId,
    page: '-1',
    method: 'get',
  };
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getAttemptReview}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const getQuizReport = async data => {
  const instance = await getIntegrationInstance();
  let payload = {
    quizid: data?.quizid,
    method: 'get',
  };
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.getQuizReport}`,
    payload,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return res && res.data ? res.data : null;
};

export const getRetestReval = async studentId => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(
    `services/apexrest/examsRelatedToStudent/?studentId=${studentId}`
  );
  const res = await axiosInstance.get(`${path}${query}`);
  return res && res.data ? res.data : null;
};

export const postRetestReval = async data => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(`services/apexrest/CreateRevaluationData`);
  const res = await axiosInstance.get(`${path}${query}`, data);
  return res && res.data ? res.data : null;
};

// export const getRetestReval = async studentId => {
//   const path = `salesforce?endpoint=${encodeURIComponent(
//     `services/apexrest/examsRelatedToStudent/?studentId=${studentId}`
//   )}`;
//   const res = await axiosInstance.get(`${appConfig.integrationUrl}/${path}`);
//   return res && res.data ? res.data : null;
// };

// export const postRetestReval = async data => {
//   const path = `${appConfig.integrationUrl}/sf/data?api=`;
//   const query = encodeURIComponent(`services/apexrest/CreateRevaluationData`);
//   const res = await axiosInstance.post(`${path}${query}`, data);
//   return res && res.data ? res.data : null;
// };

// get students By CourseOffering for faculty
export const getStudentsByCourseOffering = async courseOfferingId => {
  const res = await axiosInstance.get(
    `${appConfig.integrationUrl
    }/sf/data?api=services/apexrest/getStudentsByCourseOffering/?courseOfferingId=${courseOfferingId}`
  );

  return res && res.data ? res.data : null;
};
export const manualGradeEssayQuestiontype = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.manualGradeEssayQuestiontype}`,
    {
      method: 'post',
      attemptid: data?.attemptid,
      questionid: data?.questionid,
      mark: data?.mark,
      // 'comment':data?.comment
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const mediaFileUpload = async data => {
  const instance = await getIntegrationInstance();
  const res = await instance.post(
    `/lms?endpoint=${UrlEndPoints.questionUploadmedia}`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return res && res.data ? res.data : null;
};

export const getChapterFeedbackSetup = async (chapterId, contactId) => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(
    `services/apexrest/chapterFeedbackSetup?chapterId=${chapterId}&contactId=${contactId}`
  );
  const res = await axiosInstance.get(`${path}${query}`);
  return res && res.data ? res.data : null;
};

export const getCourseConnections = async contactId => {
  const path = `${appConfig.integrationUrl}/sf/getData?api=`;
  const query = encodeURIComponent(
    `services/apexrest/courseConnections?contactId=${contactId}`
  );
  const res = await axiosInstance.get(`${path}${query}`);
  return res && res.data ? res.data : null;
};
export const postChapterFeedbackCollection = async data => {
  const path = `api=chapterFeedbackCollection`;
  const res = await axiosInstance.post(
    `${appConfig.integrationUrl}/sf/createData?${path}`,
    data
  );
  return res && res.data ? res.data : null;
};

//lxl
