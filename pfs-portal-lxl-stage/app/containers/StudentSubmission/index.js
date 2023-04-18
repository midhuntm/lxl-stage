import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import KenButton from '../../global_components/KenButton';
import KenCard from '../../global_components/KenCard';
import OnlineTest from '../Assignment/AssignmentReview/components/OriginalityReport/components/onlineTest';
import {
  assignGetSubmissionStatus,
  getSubmission,
  getAssignmentDetails,
  assignmentFileSubmission,
  UpdateAssignmetSubmission,
  assignmentGetParticipant,
  AssignmentGetParticipant,
} from '../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import Routes from '../../utils/routes.json';
import { FiArrowUp, FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import axios from 'axios';
import parse from 'html-react-parser';
import KenLoader from '../../components/KenLoader';
import Context from '../../utils/helpers/context';
import ReviewReport from './ReviewReport';
import { SUBMISSION_STATUS } from '../../utils/constants';
import { FALSE } from 'sass';
import KenDialog from '../../global_components/KenDialog';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.KenColors.primary,
  },
  typoPlagiarism: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
  },
  innerContainer: {
    background: theme.palette.KenColors.kenWhite,
  },
  labelText: {
    color: '#061938',
    fontSize: 12,
  },
  gradeBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  perText: {
    width: '25%',
    paddingTop: 15,
    marginLeft: 10,
    fontSize: 14,
  },
  backListText: {
    background: '#092682',
    borderRadius: 3,
    padding: '8px 12px',
    color: '#FFFFFF',
    fontSize: 14,
  },
  addButtonText: {
    background: '#092682',
    borderRadius: 3,
    padding: '8px 12px',
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 20,
  },

  redoBtn: {
    background: '#FFE9E7',
    borderRadius: 3,
    color: '#EF4060',
    fontSize: 12,
    marginRight: 20,
  },
  title: {
    paddingLeft: 10,
  },

  button: {
    marginRight: 10,
  },

  dragTextBox: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
  },

  dialogPaper: {
    height: 'none',
  },
  dragDrop: {
    borderRadius: 3,
    marginBottom: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 2,
    border: '1px dashed #A8AFBC',
    transition: 'border .24s ease-in-out',
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    color: '#061938',
    width: '100%',
  },
  browseButton: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#092682',
    height: 36,
    background: '#FFFFFF',
    border: '0.6px solid #B3BAC5',
    borderRadius: 3,
  },
  supportText: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'center',
    color: '#505F79',
    width: '100%',
  },
  dragField: {
    display: 'flex',
    padding: '20px',
    flexFlow: 'wrap',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { background: '#F1F5FF !important' },
  },

  iconCss: {
    fontSize: 18,
    lineHeight: 1,
    paddingRight: 5,
  },
  uploadIcon: {
    fontSize: 12,
    lineHeight: 1,
    color: '#997AFF',
    fontWeight: 600,
  },
  uploadWrapper: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid #E1D8FF',
    background: '#E1D8FF',
    textAalign: 'center',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'center',
  },
  fileName: {
    fontWeight: 600,
    margin: '10px 0px',
    fontSize: 14,
    color: '#505F79',
  },
  fileSize: {
    color: '#A8AFBC',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: 400,
  },
  errorText: {
    fontSize: 12,
    color: '#F2564A',
    fontWeight: 600,
  },
  participantCard: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.KenColors.kenWhite,
    padding: 20,
    marginBottom: 15,
    marginTop: 16,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '25%',
  },
  descriptionHeading: {
    marginTop: 15,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 14,
    textAlign: 'justify',
  },
  subHeading: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 18,
    fontWeight: 600,
  },
  descCard: {
    padding: '0px 20px',
  },
  due: {
    fontWeight: 'bold',
    color: 'red',
  },
  extensionGranted: {
    fontWeight: 'bold',
    color: 'green',
  },
}));

export default function StudentSubmission(props) {
  const { cmid, sectionDataSend, title } = props?.history?.location?.state;

  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [userName, setUsername] = React.useState('');
  const [submissionHeading, setSubmissionHeading] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(false);
  const [onlineTest, setOnlineTest] = React.useState(false);
  const [onlineTestContent, setOnlineTestContent] = React.useState('');
  const [onlineTestContentString, setOnlineTestContentString] = React.useState(
    ''
  );
  const [onlineDesc, setOnlineDesc] = React.useState('');
  const [fileSubmitted, setFileSubmitted] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [fileSize, setFileSize] = React.useState('');
  const [fileContent, setFileContent] = React.useState('');
  // const [resourceType, setResourceType] = React.useState(props?.history?.location?.state?.resourceType)
  const [selectedFileBase64, setSelectedFileBase64] = React.useState('');
  const [fileSelected, setFileSelected] = React.useState();
  const [facultyFiles, setFacultyFiles] = React.useState([]);
  const { handleSnackbarOpen } = useContext(Context);

  const history = useHistory();
  const [userDetails, setUserDetails] = React.useState(
    JSON.parse(localStorage.getItem('userDetails'))
  );
  const [lmsToken, setLmsToken] = React.useState(
    localStorage.getItem('fileToken')
  );
  const [assignmentDesc, setAssignmentDesc] = React.useState('');
  const [participantRes, setParticipantRes] = React.useState('');
  const [showAddSubmit, setShowAddSubmit] = React.useState(false);
  const [showAddSubmitFields, setShowAddSubmitFields] = React.useState(false);
  const [showEditSubmitFields, setShowEditSubmitFields] = React.useState(false);
  const [showCancelsubmit, setShowCancelsubmit] = React.useState(false);
  const [showEditSubmit, setShowEditSubmit] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [showReviewReport, setShowReviewReport] = React.useState(false);
  const [maxGrade, setMaxGrade] = React.useState(null);
  const [obtainedGrade, setObtainedGrade] = React.useState('-');
  const [lockForSubmission, setLockForSubmission] = React.useState(true);
  const [mode, setMode] = React.useState('create');
  const [
    onlinetext_assignsubmission_enabled,
    setOnlinetextAssignsubmissionEnabled,
  ] = React.useState(false);
  const [
    onlinetext_assignsubmission_wordlimit,
    setOnlinetextAssignsubmissionWordlimit,
  ] = React.useState('');
  const [
    onlinetext_assignsubmission_wordlimitenabled,
    setOnlinetextAssignsubmissionWordlimitenabled,
  ] = React.useState(false);
  const [
    file_assignsubmission_enabled,
    setFileAssignsubmissionEnabled,
  ] = React.useState(true);
  const [
    file_assignsubmission_maxfilesubmissions,
    setFileAssignsubmissionMaxfilesubmissions,
  ] = React.useState('');
  const [
    file_assignsubmission_maxsubmissionsizebytes,
    setFileAssignsubmissionMaxsubmissionsizebytes,
  ] = React.useState('');
  const [
    file_assignsubmission_filetypeslist,
    setFileAssignsubmissionFiletypeslist,
  ] = React.useState('');
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [disableBtnFile, setDisableBtnFile] = React.useState(true);
  const [disableBtnEditor, setDisableBtnEditor] = React.useState(true);

  //late submission states
  const [assignmentSubmitted, setAssignmentSubmitted] = React.useState(true);
  const [assignmentGraded, setAssignmentGraded] = React.useState(false);
  const [dueDatePassed, setDueDatePassed] = React.useState(false);
  const [extensionGranted, setExtensionGranted] = React.useState(false);
  const [extensionDatePassed, setExtensionDatePassed] = React.useState(false);
  const [submissionLocked, setSubmissionLocked] = React.useState(false);
  const [showSubmissionElement, setShowSubmissionElement] = React.useState();
  const [humanReadableDueDate, setHumanReadableDueDate] = React.useState();
  const [
    humanReadableExtensionOverdue,
    setHumanReadableExtensionOverdue,
  ] = React.useState();
  const [extensionDueDate, setExtensionDueDate] = React.useState();
  const [dueDate, setDueDate] = React.useState();

  const [dropClick, setDropClick] = React.useState(false);
  const [textClick, setEditorClick] = React.useState(false);
  const [openEditConfirmation, setOpenEditConfirmation] = React.useState(false);
  const [fileEdited, setFileEdited] = React.useState(false);
  const [textEdited, setTextEdited] = React.useState(false);

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    border: '1px dashed #A8AFBC',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  // drag state
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const getFileSize = bytes => {
    if (bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
      if (i === 0) return `${bytes} ${sizes[i]})`;
      return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
    }
  };
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const onDrop = async acceptedFiles => {
    setFileEdited(true);
    let base64 = await toBase64(acceptedFiles[0]);
    setFileSubmitted(true);
    setFileName(acceptedFiles[0].name);
    let fname = acceptedFiles[0].name;
    let fsize = acceptedFiles[0].size;
    setFileSize(acceptedFiles[0].size);
    var base64result = String(base64).split(';base64,')[1];
    setSelectedFileBase64(base64result);
    setFileContent(base64result);
    setDropClick(true);
    setTimeout(() => {
      fileValidation(fname, fsize);
    }, 100);
  };

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    // setSubmissionHeading(title)
    setLoading(true);
    // getSubmissionStatus()
    let payload1 = {
      method: 'post',
      assignid: cmid,
    };
    getAssignmentDetails(payload1)
      .then(res => {
        if (!res.hasOwnProperty('errorcode')) {
          setLoading(false);
          let assignData = res.assignment[0];
          setSubmissionHeading(assignData?.name);
          setAssignmentDesc(assignData?.intro);

          if (assignData?.configs) {
            let configs = assignData?.configs;
            let data = {};
            configs.map(item => {
              data[
                item['plugintype'] + '_' + item['subtype'] + '_' + item['name']
              ] = item['value'];
            });
            setOnlinetextAssignsubmissionEnabled(
              data?.onlinetext_assignsubmission_enabled == '1' ? true : false
            );
            setOnlinetextAssignsubmissionWordlimit(
              data?.onlinetext_assignsubmission_wordlimit
            );
            setOnlinetextAssignsubmissionWordlimitenabled(
              data?.onlinetext_assignsubmission_wordlimitenabled == '1'
                ? true
                : false
            );
            setFileAssignsubmissionEnabled(
              data?.file_assignsubmission_enabled == '1' ? true : false
            );
            setFileAssignsubmissionMaxfilesubmissions(
              data?.file_assignsubmission_maxfilesubmissions
            );
            setFileAssignsubmissionMaxsubmissionsizebytes(
              data?.file_assignsubmission_maxsubmissionsizebytes
            );
            setFileAssignsubmissionFiletypeslist(
              data?.file_assignsubmission_filetypeslist
            );
          }
        } else {
          setLoading(false);
          handleSnackbarOpen('error', res.errorcode);
        }
      })
      .catch(err => {
        setLoading(false);
        handleSnackbarOpen('error', 'Something wrong..');
        console.log(err);
      });

    // Get Participant
    let payload = {
      method: 'post',
      cmid: cmid,
      contactid: userDetails.ContactId,
      embeduser: false,
    };

    AssignmentGetParticipant(payload)
      .then(res => {
        setParticipantRes(res);
        if (!res.hasOwnProperty('errorcode')) {
          setShowAddSubmit(!res.submitted ? true : false);
          setShowEditSubmit(res.submitted ? true : false);
          setMaxGrade(res.maximumgrade);
          setObtainedGrade(res?.obtainedGrade);
          if (res?.obtainedGrade !== null) {
            setShowFeedback(true);
          }
          setLockForSubmission(res?.locked_for_submission);
          setMode(!res.submitted ? 'create' : 'edit');
          setLoading(false);

          //set states for late submission
          setAssignmentSubmitted(res?.submitted);
          setAssignmentGraded(res?.obtainedGrade !== null);
          setDueDatePassed(moment().isAfter(moment.unix(res?.duedate)));
          setExtensionGranted(res?.grantedextension);
          setExtensionDatePassed(
            res?.extensionduedate
              ? moment().isAfter(res?.extensionduedate)
              : false
          );
          setSubmissionLocked(res?.locked_for_submission);
          setDueDate(moment.unix(res?.duedate).format('LLLL'));
          setExtensionDueDate(
            moment.unix(res?.extensionduedate).format('LLLL')
          );
          setHumanReadableDueDate(moment.unix(res?.duedate).fromNow(true));
          setHumanReadableExtensionOverdue(
            moment.unix(res?.extensionduedate).fromNow(true)
          );
        } else {
          console.log(res);
          setLoading(false);
          handleSnackbarOpen('error', res.errorcode);
        }
      })
      .catch(err => {
        handleSnackbarOpen('error', 'Something wrong..');
        console.log(err);
      });
  }, []);

  //on click on backtoactivities button -> go back to activity page
  const onBackList = () => {
    if (showReviewReport) {
      setShowReviewReport(false);
    } else {
      history.push({
        pathname: Routes?.acadamicContent,
        state: {
          cmid: '',
          submissionHeading: '',
        },
      });
    }
  };
  //counting words
  function WordCount(value) {
    return String(value).length;
    // let res = [];
    // let str = String(value).replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    // str.map((s) => {
    //   let trimStr = s.trim();
    //   if (trimStr.length > 0) {
    //     res.push(trimStr);
    //   }
    // });
    // return res.length
  }
  //On clicking the grade button -->submit the assignment
  const submitAssignment = () => {
    setLoading(true);
    callApis();
    setFileEdited(false);
  };

  const fileValidation = (fname, fsize) => {
    let fnameValid = checkFilenameLength(fname);
    if (fnameValid && fname !== null && fsize !== null) {
      let filetypeArray = String(file_assignsubmission_filetypeslist).split(
        ','
      );
      if (file) {
        if (file_assignsubmission_filetypeslist == '') {
          if (
            Number(fsize) <=
            Number(file_assignsubmission_maxsubmissionsizebytes)
          ) {
            setDisableBtnFile(false);
            setFileSubmitted(true);
          } else if (
            Number(fsize) > Number(file_assignsubmission_maxsubmissionsizebytes)
          ) {
            handleSnackbarOpen(
              'error',
              `Maximum file size should be ${getFileSize(
                file_assignsubmission_maxsubmissionsizebytes
              )}`
            );
            setDisableBtnFile(true);
            setFileSubmitted(false);
          }
        } else if (file_assignsubmission_filetypeslist !== '') {
          if (filetypeArray.includes(getExtenstion(fname))) {
            setDisableBtnFile(false);
            setFileSubmitted(true);
          } else if (!filetypeArray.includes(getExtenstion(fname))) {
            handleSnackbarOpen(
              'error',
              `Unsupported file format. Only ${file_assignsubmission_filetypeslist} formats accepted`
            );
            setDisableBtnFile(true);
            setFileSubmitted(false);
          } else if (
            Number(fsize) > Number(file_assignsubmission_maxsubmissionsizebytes)
          ) {
            handleSnackbarOpen(
              'error',
              `Maximum file size should be ${getFileSize(
                file_assignsubmission_maxsubmissionsizebytes
              )}`
            );
            setDisableBtnFile(true);
            setFileSubmitted(false);
          }
        } else if (fname.length == 0) {
          // handleSnackbarOpen('error', `Please upload maximum one file...`)
          setDisableBtnFile(true);
          setFileSubmitted(false);
        }
      } else if (!file) {
        setDisableBtnFile(false);
      }
    } else if (!fnameValid && fname !== null) {
      handleSnackbarOpen('error', `File name is too big..!`);
      setDisableBtnFile(true);
      setFileSubmitted(false);
    } else {
      setDisableBtnFile(true);
    }
  };
  const checkFilenameLength = fname => {
    return fname !== null && fname.length <= 50 ? true : false;
  };

  useEffect(() => {
    if (!disableBtnFile || !disableBtnEditor) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [disableBtnFile, disableBtnEditor]);

  const callApis = () => {
    if (mode == 'create') {
      let payload = {
        method: 'post',
        contactid: userDetails.ContactId,
        assignid: Number(cmid),
        filename: String(fileName),
        filecontent: String(selectedFileBase64),
        onlinetext: String(onlineTestContent),
      };
      assignmentFileSubmission(payload)
        .then(res => {
          console.log(res);
          if (!res.hasOwnProperty('errorcode')) {
            setLoading(false);
            handleSnackbarOpen(
              'success',
              t('messages:Assignment_submitted_success')
            );
            history.push({
              pathname: Routes?.acadamicContent,
            });
          } else {
            setLoading(false);
            handleSnackbarOpen('error', res.errorcode);
          }
        })
        .catch(err => {
          setLoading(false);
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log(err);
        });
    } else {
      let payload = {
        method: 'post',
        contactid: userDetails.ContactId,
        assignmentid: Number(cmid),
        filename: String(fileName),
        filecontent: String(selectedFileBase64),
        onlinetext: String(onlineTestContent),
      };
      UpdateAssignmetSubmission(payload)
        .then(res => {
          if (!res.hasOwnProperty('errorcode')) {
            console.log(res);
            handleSnackbarOpen(
              'success',
              t('messages:Assignment_submitted_success')
            );
            setLoading(false);
            history.push({
              pathname: Routes?.acadamicContent,
            });
          } else {
            setLoading(false);
            handleSnackbarOpen('error', res.errorcode);
          }
        })
        .catch(err => {
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          setLoading(false);
          console.log(err);
        });
    }
  };

  const clearFile = () => {
    setFileSubmitted(false);
    setFileName('');
    setFileContent('');
    setSelectedFileBase64('');
    setFileSize('');
    fileValidation(null, null);
    // setDisableBtn(true)
    setDisableBtnFile(true);
    // setDisableBtnEditor(true)
  };

  const onHandleOnlineText = (value, editor) => {
    setOnlineTestContent(value);
    let string = editor.getContent({ format: 'text' });
    setOnlineTestContentString(string);
    editorValidation(value, string);
  };

  const editorValidation = (value, string) => {
    if (onlineTest) {
      let wordCount = WordCount(string);
      if (onlinetext_assignsubmission_wordlimitenabled) {
        if (
          value.length !== 0 &&
          Number(wordCount) <= Number(onlinetext_assignsubmission_wordlimit)
        ) {
          setDisableBtnEditor(false);
        } else if (value.length == 0) {
          // handleSnackbarOpen('error', '!')
          setDisableBtnEditor(true);
          setDisableBtn(true);
        } else {
          handleSnackbarOpen(
            'error',
            `Maximum allowed words are ${onlinetext_assignsubmission_wordlimit}`
          );
          setDisableBtnEditor(true);
          setDisableBtn(true);
        }
      } else if (value.length == 0) {
        // handleSnackbarOpen('error', '!')
        setDisableBtnEditor(true);
        setDisableBtn(true);
      } else {
        setDisableBtnEditor(false);
      }
    } else {
      setDisableBtnEditor(false);
    }
  };
  const onClickCancel = () => {
    setShowCancelsubmit(false);
    setShowAddSubmit(!participantRes.submitted ? true : false);
    setShowAddSubmitFields(false);
  };
  //Get Base64 from file url
  const getBase64String = async url => {
    const data = await Buffer.from(
      (await axios.get(url, {
        responseType: 'arraybuffer',
      })).data,
      'utf-8'
    ).toString('base64');
    return data;
  };

  //On clicking edit submission button
  const onEditSubmission = async () => {
    // if (onlinetext_assignsubmission_enabled) {
    //   setDisableBtnEditor(onlinetext_assignsubmission_enabled)
    // }
    // else {
    //   setDisableBtnEditor(onlinetext_assignsubmission_enabled)
    // }
    // setDisableBtnEditor(false)
    // setDisableBtnFile(false)

    // setOnlineTest(onlinetext_assignsubmission_enabled);
    setShowEditSubmit(false);
    setFileSubmitted(false);
    // setFile(file_assignsubmission_enabled);
    setShowEditSubmitFields(true);

    let editSubmisstionData = {
      method: 'post',
      cmid: cmid,
      contactid: userDetails.ContactId,
      groupid: 0,
    };
    assignGetSubmissionStatus(editSubmisstionData)
      .then(async res => {
        let onlineTextData = res?.lastattempt?.submission?.plugins.filter(
          item => item.type == 'onlinetext'
        );
        let fileData = res?.lastattempt?.submission?.plugins.filter(
          item => item.type == 'file'
        );

        if (
          onlineTextData.length > 0 &&
          onlineTextData[0]?.editorfields[0]?.text.length > 0
        ) {
          setOnlineTestContent(onlineTextData[0]?.editorfields[0]?.text);
          setOnlineTestContentString(
            parse(onlineTextData[0]?.editorfields[0]?.text)
          );
        }

        if (
          fileData.length > 0 &&
          fileData[0]?.fileareas[0]?.files?.length > 0
        ) {
          setFileSubmitted(true);
          setFile(true);
          let fileDatas = fileData[0]?.fileareas[0]?.files[0];
          let url = String(fileDatas?.fileurl).split('?');
          let token = localStorage.getItem('fileToken');
          let prevUrl = fileDatas?.fileurl + `?token=${token}`;
          console.log('pdf url', prevUrl);
          let filebase64 = await getBase64String(prevUrl);
          console.log(filebase64);
          setFileName(fileDatas?.filename);
          let fname = fileDatas?.filename;
          let fsize = fileDatas?.filesize;
          setFileSize(fileDatas?.filesize);
          setFileContent(filebase64);
          setSelectedFileBase64(filebase64);
          // filetestmodule = true
          setTimeout(() => {
            fileValidation(fname, fsize);
          }, 100);
        }
        // setFile(filetestmodule)
        // setOnlineTest(onlinetestmodule)
        // setFileurl(fileDatas?.fileurl)
      })
      .catch(err => {
        console.log(err);
      });
    setShowAddSubmitFields(false);
    setShowAddSubmit(false);
    setShowCancelsubmit(true);
  };
  const getExtenstion = fileName => {
    let arr = String(fileName).split('.');
    return '.' + arr[arr.length - 1];
  };

  const onAddSubmission = () => {
    setShowAddSubmitFields(true);
    // console.log(file, onlineTest);
    // setFile(file_assignsubmission_enabled);
    // setOnlineTest(onlinetext_assignsubmission_enabled);

    // if (onlinetext_assignsubmission_enabled) {
    //   setDisableBtnEditor(onlinetext_assignsubmission_enabled);
    // } else {
    //   setDisableBtnEditor(onlinetext_assignsubmission_enabled);
    // }
    setShowAddSubmit(false);
    setShowCancelsubmit(true);
  };
  const onShowFeedback = () => {
    setShowReviewReport(true);
  };

  useEffect(() => {
    if (submissionLocked) {
      if (assignmentSubmitted) {
        setShowSubmissionElement(SUBMISSION_STATUS.SUBMITTED_LOCKED);
      } else {
        setShowSubmissionElement(SUBMISSION_STATUS.NOT_SUBMITTED_LOCKED);
      }
    } else {
      if (assignmentSubmitted) {
        if (assignmentGraded) {
          setShowSubmissionElement(SUBMISSION_STATUS.SUBMITTED_GRADED);
        } else {
          if (dueDatePassed) {
            if (extensionGranted) {
              if (extensionDatePassed) {
                setShowSubmissionElement(
                  SUBMISSION_STATUS.SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE
                );
              } else {
                setShowSubmissionElement(
                  SUBMISSION_STATUS.SUBMITTED_OVERDUE_EXTENSION_GRANTED
                );
                onEditSubmission();
              }
            } else {
              setShowSubmissionElement(
                SUBMISSION_STATUS.SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED
              );
            }
          } else {
            setShowSubmissionElement(
              SUBMISSION_STATUS.SUBMITTED_NOT_GRADED_NOT_OVERDUE
            );
            onEditSubmission();
          }
        }
      } else {
        if (dueDatePassed) {
          if (extensionGranted) {
            if (extensionDatePassed) {
              setShowSubmissionElement(
                SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE
              );
            } else {
              setShowSubmissionElement(
                SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED
              );
              onAddSubmission();
            }
          } else {
            setShowSubmissionElement(
              SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED
            );
          }
        } else {
          setShowSubmissionElement(SUBMISSION_STATUS.NOT_SUBMITTED_NO_OVERDUE);
          onAddSubmission();
        }
      }
    }
  }, [
    assignmentSubmitted,
    assignmentGraded,
    dueDatePassed,
    extensionGranted,
    extensionDatePassed,
    submissionLocked,
  ]);

  useEffect(() => {
    setOnlineTest(onlinetext_assignsubmission_enabled);
    setFile(file_assignsubmission_enabled);
    setDisableBtnEditor(onlinetext_assignsubmission_enabled);
  }, [onlinetext_assignsubmission_enabled, file_assignsubmission_enabled]);

  const openConfirmation = () => {
    setOpenEditConfirmation(true);
  };

  const getViewComponent = a => {
    let elem = '';

    switch (showSubmissionElement) {
      case SUBMISSION_STATUS.SUBMITTED_LOCKED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>Submission is locked</Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                {/* NON EDITABLE SUBMISSION -SUBMITTED_LOCKED */}
                {nonEditableSubmission}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.NOT_SUBMITTED_LOCKED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You no longer can submit your assignment because this
                  assignment is locked for submission
                </Typography>
              </Box>
            </Grid>
          </>
        );
        break;

      case SUBMISSION_STATUS.SUBMITTED_GRADED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                {/* EDITABLE SUBMISSION - SUBMITTED_GRADED */}
                {editableSubmission}
                {/* {nonEditableSubmission} */}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You no longer can edit this submission because
                  <span className={classes.due}>
                    extension is overdue by {humanReadableExtensionOverdue}
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                {/* NON EDITABLE SUBMISSION -
                SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE{' '} */}
                {nonEditableSubmission}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.SUBMITTED_OVERDUE_EXTENSION_GRANTED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You can edit the submission until{' '}
                  <span className={classes.due}> {extensionDueDate}</span>
                </Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                {/* EDITABLE SUBMISSION- SUBMITTED_OVERDUE_EXTENSION_GRANTED */}
                {/* {nonEditableSubmission} */}
                {editableSubmission}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You no longer can edit the submission because
                  <span className={classes.due}>
                    {' '}
                    submission is overdue by {humanReadableDueDate}{' '}
                  </span>{' '}
                  and there is no extension granted.
                </Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                {' '}
                {/* NON EDITABLE SUBMISSION - SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED */}
                {nonEditableSubmission}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.SUBMITTED_NOT_GRADED_NOT_OVERDUE:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>You can still edit the submission. </Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                <Typography>
                  {/* Editable Submission  */}
                  {editableSubmission}
                  {/* {nonEditableSubmission} */}
                </Typography>
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED_EXTENSION_OVERDUE:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You can not submit assignment because
                  <span className={classes.due}>
                    extension is overdue by {humanReadableExtensionOverdue}
                  </span>
                  .
                </Typography>
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_EXTENSION_GRANTED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  <span className={classes.due}>
                    {' '}
                    Submission is overdue by {humanReadableDueDate}{' '}
                  </span>{' '}
                  <span className={classes.extensionGranted}>
                    but extension is granted until {extensionDueDate}
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                <Typography>Add submission</Typography>
                {addSubmission}
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.NOT_SUBMITTED_OVERDUE_NO_EXTENSION_GRANTED:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box>
                <Typography>
                  You no longer can submit your assignment because
                  <span className={classes.due}>
                    {' '}
                    submission is overdue by {humanReadableDueDate}{' '}
                  </span>{' '}
                  and there is no extension granted.
                </Typography>
              </Box>
            </Grid>
          </>
        );
        break;
      case SUBMISSION_STATUS.NOT_SUBMITTED_NO_OVERDUE:
        elem = (
          <>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Box style={{ width: '100%' }}>
                <Typography>Add Submission</Typography>
                {addSubmission}
              </Box>
            </Grid>
          </>
        );
        break;

      default:
        elem = <></>;
        break;
    }
    return elem;
  };

  const nonEditableSubmission = (
    <>
      <Grid container spacing={1}>
        <React.Fragment>
          <Grid item md={12}>
            {file && (
              <Box p={2} className={classes.innerContainer}>
                {fileSubmitted ? (
                  <React.Fragment>
                    <Typography
                      style={{
                        fontSize: '12px',
                        textAlign: 'left',
                        marginTop: 16,
                      }}
                    >
                      {/* {t('labels:Select_Files')} */}
                      Uploaded file
                    </Typography>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                        width: '100%',
                        border: '1px solid #ccc',
                        padding: 15,
                        borderRadius: 3,
                      }}
                      container
                      spacing={1}
                    >
                      <Grid items md={11}>
                        <Typography
                          style={{ fontSize: 15, margin: -7, marginBottom: 12 }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              marginLeft: -5,
                              color: '#061938',
                            }}
                          >
                            &nbsp;&nbsp; {fileName}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            marginTop: 3,
                            fontSize: '10px',
                            color: '#7A869A',
                          }}
                          variant="subtitle2"
                        >
                          {getFileSize(fileSize)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={1}
                        style={{ cursor: 'pointer', textAlign: 'right' }}
                        onClick={clearFile}
                      >
                        {/* <CloseIcon
                          style={{ width: 14, height: 14, color: '#505F79' }}
                        /> */}
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <Grid items md={12} style={{ height: '100%', marginTop: 16 }}>
                    <Typography
                      style={{
                        fontSize: '12px',
                        textAlign: 'left',
                        marginBottom: 10,
                      }}
                    >
                      {t('labels:Select_Files')}
                    </Typography>
                    <div className={classes.dragDrop}>
                      <Dropzone
                        onDrop={onDrop}
                        // accept={file_assignsubmission_filetypeslist}
                        accept=""
                        maxFiles={1}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps({ style })}
                            className={classes.dragField}
                          >
                            <input {...getInputProps()} />
                            <div
                              className={classes.uploadWrapper}
                              title={'Upload File'}
                            >
                              <span className={classes.uploadIcon}>
                                <FiUpload
                                  style={{ strokeWidth: '2px', fontSize: 18 }}
                                />
                              </span>
                            </div>
                            <p className={classes.title}>
                              Drag & Drop file to upload or
                            </p>
                            <Button
                              className={classes.browseButton}
                              variant="outlined"
                              color="secondary"
                            >
                              <span className={classes.iconCss}>
                                <FiArrowUp />
                              </span>{' '}
                              Browse File
                            </Button>
                            {/* <p className={classes.supportText}>Supported Format {allowedFilesTypes}, (upto 20 MB)</p> */}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </Grid>
                )}
              </Box>
            )}
            {onlineTest && (
              <Box p={2} className={classes.innerContainer}>
                {onlinetext_assignsubmission_wordlimitenabled &&
                  onlinetext_assignsubmission_wordlimit > 0 && (
                    <>
                      <p>
                        Maximum words limit:{' '}
                        <b>{onlinetext_assignsubmission_wordlimit}. </b>
                        <span>
                          {' '}
                          You have typed:{' '}
                          <b>{WordCount(onlineTestContentString)}</b>{' '}
                        </span>
                      </p>
                    </>
                  )}
                <OnlineTest
                  description={onlineDesc}
                  content={onlineTestContent}
                  onWriteContent={onHandleOnlineText}
                  disabled={true}
                />
              </Box>
            )}
          </Grid>
        </React.Fragment>
      </Grid>
    </>
  );

  const editableSubmission = (
    <>
      {' '}
      <Grid container spacing={1}>
        <Grid item md={12}>
          <>
            {showEditSubmitFields &&
              file &&
              (fileSubmitted ? (
                <Box p={2} className={classes.innerContainer}>
                  <React.Fragment>
                    <Typography
                      style={{
                        fontSize: '12px',
                        textAlign: 'left',
                        marginTop: 16,
                      }}
                    >
                      {t('labels:Select_Files')}
                    </Typography>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                        width: '100%',
                        border: '1px solid #ccc',
                        padding: 15,
                        borderRadius: 3,
                      }}
                      container
                      spacing={1}
                    >
                      <Grid items md={11}>
                        <Typography
                          style={{
                            fontSize: 15,
                            margin: -7,
                            marginBottom: 12,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              marginLeft: -5,
                              color: '#061938',
                            }}
                          >
                            &nbsp;&nbsp; {fileName}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            marginTop: 3,
                            fontSize: '10px',
                            color: '#7A869A',
                          }}
                          variant="subtitle2"
                        >
                          {getFileSize(fileSize)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={1}
                        style={{ cursor: 'pointer', textAlign: 'right' }}
                        onClick={clearFile}
                      >
                        <CloseIcon
                          style={{ width: 14, height: 14, color: '#505F79' }}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                </Box>
              ) : (
                <React.Fragment>
                  <Box p={2} className={classes.innerContainer}>
                    <Grid
                      items
                      md={12}
                      style={{ height: '100%', marginTop: 16 }}
                    >
                      <Typography
                        style={{
                          fontSize: '12px',
                          textAlign: 'left',
                          marginBottom: 10,
                        }}
                      >
                        {t('labels:Select_Files')}
                      </Typography>
                      <div className={classes.dragDrop}>
                        <Dropzone onDrop={onDrop} accept={''} maxFiles={1}>
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps({ style })}
                              className={classes.dragField}
                            >
                              <input {...getInputProps()} />
                              <div
                                className={classes.uploadWrapper}
                                title={'Upload File'}
                              >
                                <span className={classes.uploadIcon}>
                                  <FiUpload
                                    style={{
                                      strokeWidth: '2px',
                                      fontSize: 18,
                                    }}
                                  />
                                </span>
                              </div>
                              <p className={classes.title}>
                                Drag & Drop file to upload or
                              </p>
                              <Button
                                className={classes.browseButton}
                                variant="outlined"
                                color="secondary"
                              >
                                <span className={classes.iconCss}>
                                  <FiArrowUp />
                                </span>{' '}
                                Browse File
                              </Button>
                              {/* <p className={classes.supportText}>Supported Format {allowedFilesTypes}, (upto 20 MB)</p> */}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </Grid>
                  </Box>
                </React.Fragment>
              ))}

            {showEditSubmitFields && onlineTest && (
              <Box p={2} className={classes.innerContainer}>
                {onlinetext_assignsubmission_wordlimitenabled &&
                  onlinetext_assignsubmission_wordlimit > 0 && (
                    <>
                      <p>
                        Maximum words limit:{' '}
                        <b>{onlinetext_assignsubmission_wordlimit}. </b>
                        <span>
                          {' '}
                          You have typed:{' '}
                          <b>{WordCount(onlineTestContentString)}</b>{' '}
                        </span>
                      </p>
                    </>
                  )}
                <OnlineTest
                  description={onlineDesc}
                  content={onlineTestContent}
                  onWriteContent={onHandleOnlineText}
                />
              </Box>
            )}
          </>
        </Grid>
        {showCancelsubmit && (
          <Grid
            item
            md={12}
            //   className={classes.buttonWrapper}
            style={{ textAlign: 'right' }}
          >
            <Box>
              <KenButton buttonClass={classes.redoBtn} onClick={onBackList}>
                Cancel
              </KenButton>

              <KenButton
                variant={'primary'}
                className={classes.backListText}
                // disabled={true}
                disabled={disableBtn && fileEdited}
                // onClick={submitAssignment}
                onClick={() => {
                  obtainedGrade && fileEdited
                    ? openConfirmation()
                    : submitAssignment();
                }}
              >
                Submit
              </KenButton>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );

  const addSubmission = (
    <>
      {showAddSubmitFields && (
        <Grid container spacing={1}>
          <React.Fragment>
            <Grid item md={12}>
              {file && (
                <Box p={2} className={classes.innerContainer}>
                  {fileSubmitted ? (
                    <React.Fragment>
                      <Typography
                        style={{
                          fontSize: '12px',
                          textAlign: 'left',
                          marginTop: 16,
                        }}
                      >
                        {t('labels:Select_Files')}
                      </Typography>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                          width: '100%',
                          border: '1px solid #ccc',
                          padding: 15,
                          borderRadius: 3,
                        }}
                        container
                        spacing={1}
                      >
                        <Grid items md={11}>
                          <Typography
                            style={{
                              fontSize: 15,
                              margin: -7,
                              marginBottom: 12,
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: 16,
                                marginLeft: -5,
                                color: '#061938',
                              }}
                            >
                              &nbsp;&nbsp; {fileName}
                            </span>
                          </Typography>
                          <Typography
                            style={{
                              marginTop: 3,
                              fontSize: '10px',
                              color: '#7A869A',
                            }}
                            variant="subtitle2"
                          >
                            {getFileSize(fileSize)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={1}
                          style={{ cursor: 'pointer', textAlign: 'right' }}
                          onClick={clearFile}
                        >
                          <CloseIcon
                            style={{ width: 14, height: 14, color: '#505F79' }}
                          />
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <Grid
                      items
                      md={12}
                      style={{ height: '100%', marginTop: 16 }}
                    >
                      <Typography
                        style={{
                          fontSize: '12px',
                          textAlign: 'left',
                          marginBottom: 10,
                        }}
                      >
                        {t('labels:Select_Files')}
                      </Typography>
                      <div className={classes.dragDrop}>
                        <Dropzone
                          onDrop={onDrop}
                          // accept={file_assignsubmission_filetypeslist}
                          accept=""
                          maxFiles={1}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps({ style })}
                              className={classes.dragField}
                            >
                              <input {...getInputProps()} />
                              <div
                                className={classes.uploadWrapper}
                                title={'Upload File'}
                              >
                                <span className={classes.uploadIcon}>
                                  <FiUpload
                                    style={{ strokeWidth: '2px', fontSize: 18 }}
                                  />
                                </span>
                              </div>
                              <p className={classes.title}>
                                Drag & Drop file to upload or
                              </p>
                              <Button
                                className={classes.browseButton}
                                variant="outlined"
                                color="secondary"
                              >
                                <span className={classes.iconCss}>
                                  <FiArrowUp />
                                </span>{' '}
                                Browse File
                              </Button>
                              {/* <p className={classes.supportText}>Supported Format {allowedFilesTypes}, (upto 20 MB)</p> */}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </Grid>
                  )}
                </Box>
              )}
              {onlineTest && (
                <Box p={2} className={classes.innerContainer}>
                  {onlinetext_assignsubmission_wordlimitenabled &&
                    onlinetext_assignsubmission_wordlimit > 0 && (
                      <>
                        <p>
                          Maximum words limit:{' '}
                          <b>{onlinetext_assignsubmission_wordlimit}. </b>
                          <span>
                            {' '}
                            You have typed:{' '}
                            <b>{WordCount(onlineTestContentString)}</b>{' '}
                          </span>
                        </p>
                      </>
                    )}
                  <OnlineTest
                    description={onlineDesc}
                    content={onlineTestContent}
                    onWriteContent={onHandleOnlineText}
                  />
                </Box>
              )}
            </Grid>
          </React.Fragment>
        </Grid>
      )}
      {showCancelsubmit && (
        <Grid
          item
          md={12}
          //   className={classes.buttonWrapper}
          style={{ textAlign: 'right' }}
        >
          <Box>
            <KenButton buttonClass={classes.redoBtn} onClick={onBackList}>
              Cancel
            </KenButton>
            <KenButton
              variant={'primary'}
              className={classes.backListText}
              disabled={disableBtn}
              onClick={submitAssignment}
            >
              {' '}
              Submit
            </KenButton>
          </Box>
        </Grid>
      )}
    </>
  );

  return (
    <React.Fragment>
      {loading && <KenLoader />}
      <div>
        <KenCard>
          <Box m={1}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.heading}>
                  {submissionHeading}
                </Typography>
              </Grid>
              <KenButton
                className={classes.backListText}
                variant={'primary'}
                onClick={onBackList}
              >
                {showReviewReport ? 'Back to Submission' : 'Back to Activities'}
              </KenButton>
            </Grid>
          </Box>
        </KenCard>
        {showReviewReport ? (
          <Box>
            <ReviewReport
              cmid={cmid}
              submissionHeading={submissionHeading}
              contactId={userDetails.ContactId}
            />
          </Box>
        ) : (
          <Box mt={2}>
            <Grid item md={12}>
              <Box p={2} className={classes.innerContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} />
                  <Grid className={classes.descCard}>
                    <p className={classes.subHeading}> {submissionHeading}</p>
                    <p className={classes.descriptionHeading}>Description:</p>
                    <p className={classes.descriptionText}>
                      {assignmentDesc.length > 0 ? parse(assignmentDesc) : '-'}
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid className={classes.participantCard} md={12} mt={2}>
              <Grid className={classes.cardsInfo}>
                <Typography>
                  <b>Submission start date : </b>{' '}
                  {moment
                    .unix(participantRes?.allowsubmissionsfromdate)
                    .format('LLLL')}
                </Typography>
                {showFeedback && (
                  <Typography>
                    {' '}
                    <b>Obtained grade : </b> {obtainedGrade}
                  </Typography>
                )}
                <Typography>
                  {' '}
                  <b>Maximum grade : </b> {maxGrade}
                </Typography>
                <Typography>
                  {' '}
                  <b>Due Date : </b>{' '}
                  {moment.unix(participantRes?.duedate).format('LLLL')}
                </Typography>
                <Typography>
                  {' '}
                  <b>Is extension granted : </b>{' '}
                  {participantRes?.grantedextension ? 'Yes' : 'No'}
                </Typography>
                <Typography>
                  {' '}
                  <b>Is assignment submitted : </b>{' '}
                  {participantRes?.submitted ? 'Yes' : 'No'}
                </Typography>
                <Typography>
                  {' '}
                  <b>Locked for submission : </b>{' '}
                  {participantRes?.locked_for_submission ? 'Yes' : 'No'}
                </Typography>

                <>
                  {showFeedback && (
                    <Box style={{ marginTop: 10 }}>
                      {/* <Grid className={classes.buttonWrapper}>  */}
                      <KenButton
                        className={classes.addButtonText}
                        variant={'primary'}
                        onClick={onShowFeedback}
                      >
                        View Feedback
                      </KenButton>
                      {/* </Grid>  */}
                    </Box>
                  )}
                </>
              </Grid>
              {/* <Grid className={classes.buttonWrapper}>
                {getActionByStatus()}
              </Grid> */}

              {/* {showCancelsubmit && (
                <Grid
                  className={classes.buttonWrapper}
                  style={{ marginTop: 10 }}
                >
                  <KenButton buttonClass={classes.redoBtn} onClick={onBackList}>
                    Cancel
                  </KenButton>
                  <KenButton
                    variant={'primary'}
                    className={classes.backListText}
                    disabled={disableBtn}
                    onClick={submitAssignment}
                  >
                    {' '}
                    Submit
                  </KenButton>
                </Grid>
              )} */}
            </Grid>

            {getViewComponent(showSubmissionElement)}
          </Box>
        )}
      </div>

      <KenDialog
        open={openEditConfirmation}
        handleClose={() => {
          setOpenEditConfirmation(false);
        }}
        negativeButtonClick={() => setOpenEditConfirmation(false)}
        positiveButtonProps={{
          onClick: submitAssignment,
        }}
        title={
          <Typography align="center">
            Are you sure to update your submission?
          </Typography>
        }
        dialogActions={true}
      >
        <Box mt={2}>
          <Typography>
            The grade and feedback for your previous submission will be
            discarded. It is adviced to consult with your faculty before
            updating.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography>Are you still want to update this submission?</Typography>
        </Box>
      </KenDialog>
    </React.Fragment>
  );
}
