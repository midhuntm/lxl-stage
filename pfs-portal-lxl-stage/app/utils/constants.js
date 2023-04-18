export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const KEY_PARENT_DETAILS = 'PARENT_DETAILS';
export const KEY_USER_DETAILS = 'userDetails';
export const KEY_LOGIN_ACCESS_TOKEN = 'login_token';
export const KEY_DIRECTION = {
  left: 'left',
  right: 'right',
  previous: 'prev',
  forward: 'forward',
  next: 'next',
};
export const KEY_USER_TYPE = {
  parent: 'Parent',
  faculty: 'Faculty',
  student: 'Student',
};

export const KEY_STATUS = {
  success: 'success',
  failed: 'failed',
  warning: 'Warning',
};

export const KEY_LOGIN_VIEW = {
  full: 'full',
};

export const GLOBAL_VALIDATION = {
  VALIDATIONS: {
    REQ: 'Required',
    STATUS: {
      ERROR: 'error',
      SUCCESS: 'success',
    },
    TYPE: {
      STATUS: 'status',
    },
  },
};

export const KEY_USER = {
  REGEX: {
    NAME: /^[a-zA-Z ]*$/,
    MOBILE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    NUMBER: /^[0-9]*$/,
    ALPHANUMERIC: /^[a-z0-9]+$/i,
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
  },
};

export const KEY_DATE_FORMAT = 'YYYY-MM-DD';
export const KEY_TIME_FORMAT = 'hh:mm A';
export const KEY_ACCESS_TOKEN = 'access_token';
export const KEY_CONFIG_URL = 'https://config-api.ken42.com/v1/configs/url';
export const KEY_FIRE_REG_TOKEN = 'rToken';
export const FILE_TOKEN = 'fileToken';

export const KEY_PORTAL_TYPE = {
  parent: 'PARENT PORTAL',
  faculty: 'FACULTY PORTAL',
  student: 'STUDENT PORTAL',
};
export const KEY_POSITION = {
  bottom: 'bottom',
  center_top: 'center top',
  center_bottom: 'center bottom',
  top: 'top',
};

export const KEY_LOGIN_TYPE = {
  google: 'google',
  msal: 'msal',
};

export const KEY_SEVERITY = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

export const KEY_PERFORMANCE = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
  BAD: 'bad',
};

export const KEY_ATTENDANCE_PROGRESS_VALUES = {
  MIN: '30',
  MAX: '100',
  RANGE_MIN: '30',
  RANGE_MAX: '85',
  RANGE_AVERAGE: '85',
};

export const KEY_USER_CHANGE_LANG = 'userChangeLang';

export const KEY_CBSE_DISTRIBUTION = {
  subject: 'SUBJECT',
  pp: 'P & P',
  ma: 'MA',
  portfolio: 'PORTFOLIO',
  subEn: 'SUB EN',
  tMarks: 'TOTAL MARKS',
  grade: 'GRADE',
};

export const KEY_SIGNATURE = {
  PARENT: 'parent_signature.jpg',
  CLASS_TEACHER: 'teacher_signature.jpg',
  PRIMARY_HEAD: 'head_signature.jpg',
  ALLOWED_FILE_TYPES: ['image/svg', 'image/png', 'image/jpeg'],
  MAX_FILE_SIZE: 1000000,
};

export const KEY_EMPTY_VALUES_PLACEHOLDERS = {
  DOUBLE_DASH: '--',
  SINGLE_DASH: '-',
  NA: 'NA',
};

export const KEY_ROLES = {
  CLASS_TEACHER: 'Class Teacher',
};

export const KEY_FACULTY_PROFILE_IMAGE = {
  TYPE: 'faculty_profile_image.jpg',
  ALLOWED_FILE_TYPES: ['image/svg', 'image/png', 'image/jpeg'],
  MAX_FILE_SIZE: 307200,
};

export const TRANSACTIONS = {
  CREATE: 'CREATE',
  RETRIEVE: 'RETRIEVE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multichoice',
  TRUE_FALSE: 'truefalse',
  NUMERICAL: 'numerical',
  SUBJECTIVE: 'essay',
  ESSAY: 'essay',
  SHORT_ANSWER: 'shortanswer',
  MATCH: 'match',
  FILLTHEBLANKS: 'gapselect',
};

export const SUBMISSION_STATUS = {
  SUBMITTED_LOCKED: 'submitted-locked',
  NOT_SUBMITTED_LOCKED: 'notSubmitted-locked',
  SUBMITTED_GRADED: 'submitted-graded',
  SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE:
    'submitted-overdue-extensionGranted-extensionOverdue',
  SUBMITTED_OVERDUE_EXTENSION_GRANTED: 'submitted-overdue-extensionGranted',
  SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED:
    'submitted-overdue-noExtensionGranted',
  SUBMITTED_NOT_GRADED_NOT_OVERDUE: 'submitted-noGrade-noOverDue',
  NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE:
    'notSubmitted-overdue-extensionGranted-extensionOverdue',
  NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED:
    'notSubmitted-overdue-extensionGranted',
  NOT_SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED:
    'notSubmitted-overdue-noExtensionGranted',
  NOT_SUBMITTED_NO_OVERDUE: 'notSubmitted-noOverDue',
};
