import React, { useContext, useEffect, useState } from 'react';
import { Box, useTheme, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import General from './Components/General';
import CreateAssignment from './Components/Assignment';
import { makeStyles } from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withFormik } from 'formik';
import {
  getCourses,
  getStudentListDetails,
  createAssignmentAPI,
  getAssignmentDetails,
  updateAssignmentSettings,
  postCoreFileUpload
} from '../../utils/ApiService';
// import { FaRegListAlt } from 'react-icons/fa';
import { BiTimeFive, BiPurchaseTag, BiLockAlt } from 'react-icons/bi';
import { FiAward, FiCalendar, FiBox, FiUsers, } from 'react-icons/fi';
import { MdOutlineFeedback } from 'react-icons/md';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { BsFileEarmarkCheck } from 'react-icons/bs';

// import { BsQuestionCircle, BsLayoutSplit } from 'react-icons/bs';
// import { AiOutlineStar } from 'react-icons/ai';
import VerticalStepper from '../../components/VerticalStepper/index';
import { getUserDetails } from '../../utils/helpers/storageHelper';
// import { KEY_USER } from '../../../utils/constants';
import KenDialog from '../../components/KenDialogBox/index';

import { useTranslation } from 'react-i18next';
import Context from '../../utils/helpers/context';
// import KenLoader from '../../../components/KenLoader';
// import { values } from 'lodash';
import moment from 'moment';
// import AssignmentFileUpload from './Components/FileUpload/AssignmentFileUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FiCheck } from 'react-icons/fi';
import { formatBytes } from '../../utils/helpers/stringHelpers';
import Routes from '../../utils/routes.json';
import jsonData from './AssignmentDetails.json';

export default function PreAssignment(props) {
  return (
    <div>
      <FormikHoc {...props} />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    height: 'none',
  },
  linearRoot: {
    borderRadius: 5,
    height: 10,
    color: '#52C15A',
    background: '#E3E3E3',
  },
  bar: {
    background: '#52C15A',
  },
  errorBar: {
    background: '#ff0000',
  },
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
  },
  uploadSuccess: {
    color: '#00B25D',
    fontSize: 14,
    background: '#CCE9E4',
    fontWeight: 'bold',
    borderRadius: '50%',
    textAlign: 'center',
    padding: 5,
    float: 'right'
  },
}));

const AssignmentDetails = props => {
  //   console.log('assignment details props', props);
  const theme = useTheme();
  const classes = useStyles();

  const {
    values,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    handleBack,
    activeStep,
    operation,
  } = props;

  const [title, setTitle] = React.useState('Assignment');
  //   const [operation, setOperation] = React.useState('Create');
  const [openDialog, setOpenDialog] = React.useState(
    values.assignmentComplete.open
  );

  const steps = [
    {
      id: 1,
      label: 'General',
    },
    {
      id: 2,
      label: 'Assignment settings',
      content: [
        {
          img: BiTimeFive,
          label: 'Availability',
          link: '/assignment/#availability',
        },
        {
          img: FiAward,
          label: 'Grade',
          link: '/assignment/#grade',
        },
        {
          img: MdOutlineFeedback,
          label: 'Feedback Types',
          link: '/assignment/#feedbacktypes',
        },
        {
          img: BsFileEarmarkCheck,
          label: 'Submission',
          link: '/assignment/#submission',
        },
        {
          img: BiPurchaseTag,
          label: 'Tags',
          link: '/assignment/#tags',
        },
        // {
        //     img: HiOutlineDocumentSearch,
        //     label: 'Plagiarism',
        //     link: '/assignment/#plagiarism',
        // },
        // {
        //     img: BiTimeFive,
        //     label: 'Due Date',
        //     link: '/assignment/#duedate',
        // },

        // {
        //     img: FiUsers,
        //     label: 'Assign students',
        //     link: '/assignment/#assignstudents'
        // }
      ],
    },
  ];

  const getStepContent = () => {
    const stepper = values.activeStep;
    switch (stepper) {
      case 0:
        return <General {...props} operation={values.operation} />;

      case 1:
        return <CreateAssignment {...props} />;

      default:
        return 'Not available';
    }
  };

  const phone = useMediaQuery(theme.breakpoints.only('xs'));

  const handleCancel = () => {
    history.push(`/${Routes.acadamicContent}`);
  };

  return (
    <Box>
      <Grid xs={12} sm={12}>
        <VerticalStepper
          setFieldValue={setFieldValue}
          steps={steps}
          getStepContent={getStepContent}
          orientation={phone ? 'horizontal' : 'vertical'}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          activeStep={values.activeStep}
          setActiveStep={values.setActiveStep}
          headerTitle={title}
          operation={values?.methodType}
          {...props}
        />
        <KenDialog
          open={openDialog}
          onClose={() => {
            values.setAssignmentComplete({ open: false });
          }}
          handleClose={() => {
            values.setAssignmentComplete({ open: false });
            props.history.push({ pathname: `/${Routes.acadamicContent}` });
          }}
          disabledOk={values.assignmentComplete.progress < 100 ? true : false}
          maxWidth="xs"
          styleOverrides={{ dialogPaper: classes.dialogPaper }}
        >
          <Grid container>
            <Grid item container direction="row">
              <Box style={{ width: '100%' }}>
                <Box
                  width="100%"
                  style={{ marginRight: 0, marginTop: 20, marginBottom: 20 }}>
                  <LinearProgress
                    variant="determinate"
                    classes={{
                      root: classes.linearRoot,
                      bar: values.assignmentComplete.status !== 'error' ? classes.bar : classes.errorBar,
                    }}
                    value={values.assignmentComplete.progress}
                  />
                </Box>
                <Box>
                  <Grid item>
                    <Typography style={{ float: 'left', color: values.assignmentComplete.status !== "error" ? '#52C15A' : '#ff0000' }}>
                      {values.assignmentComplete.message}
                    </Typography>
                    {values.assignmentComplete.progress == 100 &&
                      <div>
                        <span className={classes.uploadSuccess}> <FiCheck strokeWidth={'2px'} fontSize={18} /></span>
                      </div>
                    }
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </KenDialog>
      </Grid>
    </Box>
  );
};

const FormikHoc = props => {
  // const { handleFormSubmit } = props;
  const { handleSnackbarOpen } = useContext(Context);

  const [course, setCourse] = useState();
  const [loading, setLoading] = React.useState(false);

  const [courses, setCourses] = useState([]);
  const [classesArray, setClassesArray] = React.useState([]);
  const { t } = useTranslation();

  const [students, setStudents] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({ assessment: 'Physics' });
  const [displayDescription, setDisplayDescription] = React.useState(false);
  const profile = getUserDetails().ContactId;
  const [urlAssignmentId, setUrlAssignmentId] = React.useState(null);
  const [payloadData, setPayloadData] = React.useState({});
  const [operation, setOperation] = React.useState('Create');
  const [previewData, setPreviewData] = React.useState(null);
  const [configData, setConfigData] = React.useState(null);

  // const [fileFormatLists, setFileFormatLists] = React.useState(jsonData.fileFormatLists);
  const [fileFormatLists, setFileFormatLists] = React.useState([
    { "type": "pdf", "ext": ".pdf", "value": true, "label": "PDF document (.pdf)" },
    // { "type": "doc", "ext": ".doc", "value": false, "label": "Microsoft Word Document(.doc)" },
    // { "type": "docx", "ext": ".docx", "value": false, "label": "Microsoft Word Open XML Document(.docx)" }
  ])
  const [assignmentComplete, setAssignmentComplete] = React.useState({
    open: false,
    progress: 5,
    message: '',
  });
  useEffect(() => {
    if (configData && configData?.file_filetypeslist) {
      const array = getFileTypes(configData?.file_filetypeslist);
      setFileFormatLists(array);
    }
  }, [configData]);

  const getFileTypes = str => {
    if (typeof str !== 'string') {
      return fileFormatLists;
    }
    const strToArray = str?.split(',');
    if (Array.isArray(strToArray)) {
      const updatedArray = fileFormatLists?.map(item => {
        if (strToArray.includes(item.ext)) {
          item['value'] = true;
        } else {
          item['value'] = false;
        }
        return item;
      });
      //   setFileFormatLists(updatedArray);
      return updatedArray;
    } else {
      return fileFormatLists;
    }
  };

  React.useEffect(() => {
    setLoading(true);
    const facultyID = profile;
    getCourses(facultyID)
      .then(response => {
        setCourses(response);
        if (Array.isArray(response) && response.length > 0) {
          setCourse(response[0].CourseOfferingID);
        } else {
          setLoading(false);
        }

        const classes = [...new Set(response?.map(item => item.accountname))];
        setClassesArray(classes);
        setLoading(false);
      })
      .catch(err => {
        console.log(err, 'err');
        setLoading(false);
        handleSnackbarOpen('error', t('translations:Course_Not_Found'));
      });
  }, []);

  const getCourseOfferings = sections => {
    return (
      sections?.map(item => {
        return {
          id: item.value,
        };
      }) || []
    );
  };

  const convertToSeconds = (hour, min) => {
    return Number(hour) * 60 * 60 + Number(60 * Number(min));
  };

  React.useEffect(() => {
    let url = window.location.href;
    let slashIndex = url.lastIndexOf('/');
    let urlAssignmentId = url.substr(slashIndex + 1, url.length);

    if (!isNaN(urlAssignmentId)) {
      setOperation('Edit');
      setUrlAssignmentId(urlAssignmentId);
      let payload = { method: 'get', assignid: urlAssignmentId };
      getAssignmentDetails(payload)
        .then(res => {
          setPreviewData(res.assignment[0]);
          let obj = {};
          if (res && res.assignment[0] && res.assignment[0]['configs']) {
            res.assignment[0]['configs']?.map(item => {
              obj[`${item.plugintype}_${item.name}`] = item.value;
            });
            setConfigData(obj);
          }
          console.log('res', res);
        })
        .catch(err => {
          console.log('error', err);
        });
    }
  }, []);

  const handleAssignmentSubmit = async allData => {
    let filesTypes = allData.fileFormatLists
      .filter(item => item.value)
      .map(item => item.ext)
      .join(',');

    function createUpdateAssignment() {
      if (operation == 'Create') {
        setAssignmentComplete({
          open: true,
          progress: 30,
          status: 'success',
          message: 'Adding an assignment...! Please wait..!',
        });
        payload.courseoffering = String(formData.sectionNameWithIds[0].value);
        payload.mform_isexpanded_id_availability = formData.mform_isexpanded_id_availability || 0
        console.log('payload create assignment', payload)
        createAssignmentAPI(payload)
          .then(res => {
            console.log('res', res);
            if (!res.hasOwnProperty('errorcode')) {
              setAssignmentComplete({
                open: true,
                status: 'success',
                progress: 100,
                message: 'Assignment created successfully',
              });
            } else {
              setAssignmentComplete({
                open: true,
                progress: 100,
                status: 'error',
                message: 'Something went wrong..!',
              });
            }
          })
          .catch(err => {
            setAssignmentComplete({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Something went wrong.! Please try again.',
            });
            console.log('error', err);
          });
      } else {
        setAssignmentComplete({
          open: true,
          progress: 30,
          status: 'success',
          message: 'Updating the assignment...! Please wait..!',
        });
        payload.assignmentid = urlAssignmentId;
        //   console.log('update quiz payload', JSON.stringify(payload));

        updateAssignmentSettings(payload)
          .then(res => {
            console.log('res', res);
            if (Array.isArray(res) && res[0]?.status === true) {
              setLoading(false);
              setAssignmentComplete({
                open: true,
                progress: 100,
                status: 'success',
                message: 'Assignment has been updated successfully..!',
                pathname: `/${Routes.questionBank}`,
                state: {
                  assignmentId: urlAssignmentId,
                  assignmentName: formData.assessmentName,
                  origin: 'Dashboard',
                },
              });
            } else {
              setLoading(false);
              setAssignmentComplete({
                open: true,
                progress: 100,
                status: 'error',
                message: 'Something went wrong..!',
              });
            }
          })
          .catch(err => {
            setLoading(false);
            setAssignmentComplete({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Error while updating assignment with existing settings',
            });
            console.log('error', err);
          });
      }
    }

    const payload = {
      method: 'post',
      name: formData.assignmentName,
      description: formData.descriptionDetail,
      alwaysshowdescription: 1,
      // alwaysshowdescription: Number(allData.displayDescription),
      showdescription: allData.showDescription || 0,
      introattachments: '',

      allowsubmissionsfromdate: String(moment(allData.availabilityFrom).unix()),
      duedate: String(moment(allData.availabilityTill).unix()),

      cutoffdate: '',
      gradingduedate: '',
      assignsubmission_file_enabled: Number(allData.fileSubmission),
      assignsubmission_comments_enabled: Number(allData.onlineText),
      assignsubmission_onlinetext_wordlimit: Number(allData.wordLimit) || 0,
      assignsubmission_file_maxfiles: Number(allData.noOfFilesUpload),
      assignsubmission_file_maxsizebytes: Number(allData.maximumFileSize),
      assignsubmission_file_filetypes: String(filesTypes),

      assignsubmission_onlinetext_enabled: Number(allData.onlineText),
      assignsubmission_onlinetext_wordlimit_enabled: Number(allData.wordLimit) ? 1 : 0,
      // assignsubmission_onlinetext_wordlimit_enabled: Number(formData.wordLimitEnable),

      assignfeedback_comments_enabled: Number(allData.assignfeedback_comments_enabled),
      assignfeedback_editpdf_enabled: 1,
      assignfeedback_comments_commentinline: 0,

      maxattempts: Number(allData.attemptsAllowed),
      grade: Number(allData.totalMarks),
      grade_rescalegrades: '',
      advancedgradingmethod_submissions: '',
      gradecat: 1,
      gradepass: Number(allData.gradetopass),
      visible: 0,
      assignfeedback_offline_enabled: 0,
      assignfeedback_file_enabled: Number(allData.assignfeedback_file_enabled)
      // section: 2
    };
    // console.log('create assignment payload', JSON.stringify(payload));
    // const fileData = file[0];
    // const fileURL = URL.createObjectURL(fileData);
    const additionalFileName = formData?.additionalFileName;
    const additionalFileBase64Data = formData?.additionalFileBase64Data;

    if (formData?.enableAdditionalFile) {
      let fileUploadPayload = {
        contextid: '0',
        component: 'user',
        filearea: 'draft',
        itemid: '0',
        filepath: '/',
        filename: additionalFileName,
        filecontent: additionalFileBase64Data,
        contextlevel: 'user',
        instanceid: '2',
      };
      console.log('file upload console', fileUploadPayload)
      await postCoreFileUpload(fileUploadPayload).then(res => {
        if (res?.itemid) {
          // introattachmentId = res?.itemid;
          payload.introattachments = res?.itemid;
        }
      })
      createUpdateAssignment()
    }
    else {
      payload.introattachments = '0'
      createUpdateAssignment()
    }

  };

  const GeneralSchema = Yup.object().shape({
    assignmentName: Yup.string()
      .required(t('Validations:AssignmentName_ShouldNotBe_Empty'))
      .max(255, t('messages:Max_char', { numberOfChars: 255 })),
    descriptionDetail: Yup.string().required(t('Validations:Required')),
    className: Yup.string()
      .required(t('Validations:Required'))
      .nullable(),
    // displayDescription: Yup.boolean().required(t('Validations:Required')),
    subjectName: Yup.string()
      .required(t('Validations:Required'))
      .nullable(),
    sectionNames: Yup.array().required(
      t('Validations:Minimum_one_section_has_to_be_selected')
    ),
    // assessmentInstructions: Yup.string().required(t('Validations:Required')),
  });

  const updateGeneralSchema = Yup.object().shape({
    assignmentName: Yup.string()
      .required(t('Validations:AssignmentName_ShouldNotBe_Empty'))
      .max(255, t('messages:Max_char', { numberOfChars: 255 })),
    descriptionDetail: Yup.string().required(t('Validations:Required')),
    // assessmentInstructions: Yup.string().required(t('Validations:Required')),
  });

  const AssessmentSchema = Yup.object({
    availabilityFrom: Yup.string().required(t('Validations:Required')),
    availabilityTill: Yup.string().required(t('Validations:Required')),
    onlineText: Yup.boolean().required(t('Validations:Required')),
    fileSubmission: Yup.boolean().required(t('Validations:Required')),
    wordLimit: Yup.number().when('onlineText', {
      is: true,
      then: Yup.number().required(t('Validations:Required')),
    }),
    noOfFilesUpload: Yup.string().when('fileSubmission', {
      is: true,
      then: Yup.string().required(t('Validations:Required')),
    }),
    // gradetopass: Yup.number().required(t('Validations:Required')),
    // totalMarks: Yup.number().required(t('Validations:Required')),
    gradetopass: Yup.number().positive().required(t('Validations:Required')).min(0),
    totalMarks: Yup.number().positive().required(t('Validations:Required')).min(0),

  });

  const getValidation = () => {
    switch (activeStep) {
      case 0:
        return operation?.toLowerCase() === 'create'
          ? GeneralSchema
          : updateGeneralSchema;
      case 1:
        return AssessmentSchema;
      default:
        null;
    }
  };
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      //general page
      methodType: operation,
      //general page
      urlAssignmentId: urlAssignmentId,
      introattachments: formData?.introattachments || previewData?.introattachments,
      assignmentName: formData?.assignmentName || previewData?.name,
      descriptionDetail: formData?.descriptionDetail || previewData?.intro,
      displayDescription: displayDescription,
      assignmentInstructions: '',

      additionalFileName: formData?.additionalFileName || (previewData?.introattachments.length > 0 && previewData?.introattachments[0]?.filename),
      additionalFileBase64Data: formData?.additionalFileBase64Data,
      fileSize: formData?.fileSize || (previewData?.introattachments.length > 0 && previewData?.introattachments[0]?.filesize),
      enableAdditionalFile: formData?.enableAdditionalFile || previewData?.introattachments.length > 0,
      additionalFileDropped: formData?.additionalFileDropped || (previewData?.introattachments.length > 0 || false),
      // Grade Component
      // assessmentGraded: '',
      // examType: previewData?.examtype,
      // gradeType: previewData?.gradetype,

      className: formData?.className || classesArray[0],
      sectionNames: formData?.sectionNames || [],
      sectionNameWithIds: formData?.sectionNameWithIds || [],
      subjectName: formData?.subjectName || '',
      classesArray: formData?.classesArray || classesArray,
      courses: courses,
      loading: loading,
      //time page
      availabilityFrom: (previewData?.allowsubmissionsfromdate &&
        moment.unix(previewData?.allowsubmissionsfromdate).format('YYYY-MM-DDTHH:mm')) ||
        moment(new Date()).format('YYYY-MM-DDTHH:mm'),

      availabilityTill: (previewData?.duedate &&
        moment.unix(previewData?.duedate).format('YYYY-MM-DDTHH:mm')) ||
        moment(new Date()).add(7, 'days').format('YYYY-MM-DDTHH:mm'),

      attemptsAllowed: operation == "Edit" && String(previewData?.maxattempts) || 1,
      onlineText: operation == "Edit" && configData?.onlinetext_enabled ? Boolean(Number(configData?.onlinetext_enabled)) : (operation == "Create" ? true : false),
      wordLimitEnable: operation == "Edit" && configData?.onlinetext_wordlimitenabled ? Boolean(Number(configData?.onlinetext_wordlimitenabled)) : (operation == "Create" ? true : false),
      fileSubmission: operation == "Edit" && configData?.file_enabled ? Boolean(Number(configData?.file_enabled)) : (operation == "Create" ? true : false),
      wordLimit: operation == "Edit" && configData?.onlinetext_wordlimit ? Number(configData?.onlinetext_wordlimit) : (operation == "Create" ? 1000 : 1000),
      noOfFilesUpload: operation == "Edit" && configData?.file_maxfilesubmissions ? Number(configData?.file_maxfilesubmissions) : (operation == "Create" ? 1 : 1),
      maximumFileSize: operation == "Edit" && configData?.file_maxsubmissionsizebytes ? Number(configData?.file_maxsubmissionsizebytes) : (operation == "Create" ? 2097152 : 2097152),
      totalMarks: Number(previewData?.grade) || 0,
      gradetopass: Number(previewData?.gradepass) || 0,
      assignfeedback_file_enabled: operation == "Edit" && previewData?.assignfeedback_file_enabled ? Boolean(Number(previewData?.assignfeedback_file_enabled)) : (operation == "Create" ? true : false),
      assignfeedback_comments_enabled: operation == "Edit" && previewData?.assignfeedback_comments_enabled ? Boolean(Number(previewData?.assignfeedback_comments_enabled)) : (operation == "Create" ? true : false),
      fileFormatLists: fileFormatLists,
      tags: tags,
      activeStep: activeStep,
      setActiveStep: setActiveStep,
      assignmentComplete: assignmentComplete,
      setAssignmentComplete: setAssignmentComplete,
      formData: formData,
      setFormData: setFormData,
      operation: operation,
    }),

    validationSchema: getValidation,

    handleSubmit: values => {
      let allValues = values;
      if (values?.enableAdditionalFile == values?.additionalFileDropped) {
        switch (values?.operation) {
          case 'previous':
            setFormData({ ...formData, ...values });
            values.setActiveStep(prevActiveStep => {
              return prevActiveStep - 1;
            });
            break;

          case 'next':
            setFormData({ ...formData, ...values });
            values.setActiveStep(prevActiveStep => {
              return prevActiveStep + 1;
            });
            break;

          case 'submit':
            setFormData({ ...formData, ...values });
            handleAssignmentSubmit(allValues);
            break;

          default:
            break;
        }
      }
      else {
        setFormData({ ...formData, ...values });
        alert('Please upload the additional file..!!')
      }
    },
    payloadData: payloadData,
    setFormData: setFormData,
    formData: formData,
    operation: operation,
  })(AssignmentDetails);

  return <FormikForm {...props} />;
};
