import React, { useContext, useState } from 'react';
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
} from '../../utils/ApiService';
// import { FaRegListAlt } from 'react-icons/fa';
import { BiTimeFive, BiPurchaseTag, BiLockAlt } from 'react-icons/bi';
import { FiAward, FiCalendar, FiBox, FiUsers } from 'react-icons/fi';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { BsFileEarmarkCheck } from 'react-icons/bs';

// import { BsQuestionCircle, BsLayoutSplit } from 'react-icons/bs';
// import { AiOutlineStar } from 'react-icons/ai';
import VerticalStepper from '../../components/VerticalStepper/index';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
// import { KEY_USER } from '../../../utils/constants';
import KenDialog from '../../components/KenDialogBox/index';

import { useTranslation } from 'react-i18next';
import Context from '../../../utils/helpers/context';
// import KenLoader from '../../../components/KenLoader';
// import { values } from 'lodash';
import moment from 'moment';
// import AssignmentFileUpload from './Components/FileUpload/AssignmentFileUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FiCheck } from 'react-icons/fi';
import Routes from '../../../utils/routes.json';
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
    color: "#52C15A",
    background: "#E3E3E3"
  },
  bar: {
    background: '#52C15A'
  },
  errorBar: {
    background: '#ff0000'
  },
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginBottom: 30
  },
  uploadSuccess: {
    color: '#00B25D',
    fontSize: 14,
    background: '#CCE9E4',
    fontWeight: 'bold',
    borderRadius: '50%',
    textAlign: 'center',
    padding: 5
  },
})
)

const AssignmentDetails = props => {
  console.log('assignment details props', props);
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
  } = props;

  const [title, setTitle] = React.useState('Assignment');
  const [operation, setOperation] = React.useState('Create');
  const [openDialog, setOpenDialog] = React.useState(values.assignmentComplete.open);

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
        return <General {...props} />;

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
          operation={operation}
          {...props}
        />
        <KenDialog
          open={openDialog}
          onClose={() => { values.setAssignmentComplete({ open: false }) }}
          handleClose={() => {
            values.setAssignmentComplete({ open: false })
            props.history.push({ pathname: `/acadamicContent` });
          }}
          maxWidth="xs"
          styleOverrides={{ dialogPaper: classes.dialogPaper }}>
          <Grid container>
            <Grid item container direction="row" >
              <Box style={{ width: '100%' }}>
                <Box width="100%"
                  style={{
                    marginRight: 0,
                    marginTop: 20,
                    marginBottom: 20
                  }}>
                  <LinearProgress variant="determinate"
                    classes={{
                      root: classes.linearRoot,
                      bar: values.assignmentComplete.status !== "error" ? classes.bar : classes.errorBar
                    }}
                    value={values.assignmentComplete.progress}
                  />
                </Box>
                {values.assignmentComplete.progress = 100 ? <Box>
                  <div>
                    {values.assignmentComplete.progress < 100 &&
                      <span className={classes.uploadSuccess}>
                        <FiCheck strokeWidth={'2px'} fontSize={18} /></span>
                    }
                  </div>
                  <Grid item><Typography style={{ color: values.assignmentComplete.status !== "error" ? '#52C15A' : '#ff0000' }}>
                    {values.assignmentComplete.message}</Typography></Grid>

                </Box> :
                  <Grid item><Typography>Adding the assignment.. Please Wait..</Typography></Grid>
                }
              </Box>
              {/* <Grid item><Typography>{values.addResourceRes.message}</Typography></Grid> */}
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
  const [urlQuizId, setUrlQuizId] = React.useState(null);
  const [payloadData, setPayloadData] = React.useState({});
  const [operation, setOperation] = React.useState('create');
  const [previewData, setPreviewData] = React.useState(null);
  // const [fileFormatLists, setFileFormatLists] = React.useState(jsonData.fileFormatLists);
  const [fileFormatLists, setFileFormatLists] = React.useState([
    { "type": "pdf", "ext": ".pdf", "value": true, "label": "PDF document (.pdf)" },
    // { "type": "doc", "ext": ".doc", "value": false, "label": "Microsoft Word Document(.doc)" },
    // { "type": "docx", "ext": ".docx", "value": false, "label": "Microsoft Word Open XML Document(.docx)" }
  ])
  const [assignmentComplete, setAssignmentComplete] = React.useState({ open: false, progress: 5, message: '', });

  React.useEffect(() => {
    setLoading(true);
    const facultyID = profile;
    getCourses(facultyID)
      .then(response => {
        setCourses(response);
        if (Array.isArray(response) && response.length > 0) {
          setCourse(response[0].CourseOfferingID);
          getStudentListDetails(response[0].CourseOfferingID)
            .then(resp => { setStudents(resp); })
            .catch(err => {
              console.log(err);
              handleSnackbarOpen('error', t('No_Students_Found'));
            });
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

  // React.useEffect(() => {
  //     let url = window.location.href;
  //     let slashIndex = url.lastIndexOf('/')
  //     let urlQuizId = url.substr(slashIndex + 1, url.length)

  //     if (!isNaN(urlQuizId)) {
  //         setOperation('update')
  //         setUrlQuizId(urlQuizId)
  //         let payload = { method: 'get', quizid: urlQuizId }
  //         getQuizSettingsById(payload)
  //             .then(res => {
  //                 setPreviewData(res.quiz[0])
  //                 console.log('res', res);
  //             })
  //             .catch(err => {
  //                 console.log('error', err);
  //             });
  //     }
  // }, [])

  const handleAssignmentSubmit = allData => {

    let filesTypes = allData.fileFormatLists.filter(item => item.value).map(item => item.ext).join(',');

    const payload = {
      method: 'post',
      name: formData.assignmentName,
      alwaysshowdescription: Number(allData.displayDescription),

      introattachments: '0',
      mform_isexpanded_id_availability: 1,

      allowsubmissionsfromdate: String(moment(allData.availabilityFrom).unix()),
      duedate: String(moment(allData.availabilityTill).unix()),

      cutoffdate: '',
      gradingduedate: '',
      assignsubmission_file_enabled: Number(allData.fileSubmission),
      assignsubmission_comments_enabled: Number(allData.onlineText),
      assignsubmission_onlinetext_wordlimit: Number(allData.wordLimit),
      assignsubmission_file_maxfiles: Number(allData.noOfFilesUpload),
      assignsubmission_file_maxsizebytes: Number(allData.maximumFileSize),
      assignsubmission_file_filetypes: String(filesTypes),

      assignfeedback_comments_enabled: 1,
      assignfeedback_editpdf_enabled: 1,
      assignfeedback_comments_commentinline: 0,

      maxattempts: Number(allData.attemptsAllowed),
      grade: Number(allData.totalMarks),
      grade_rescalegrades: '',
      advancedgradingmethod_submissions: '',
      gradecat: 1,
      gradepass: Number(allData.gradetopass),
      visible: 1,
      courseoffering: String(formData.sectionNameWithIds[0].value),
      // section: 2
    };
    setAssignmentComplete({
      open: true,
      progress: 30,
      status: 'success',
      message: 'Adding an assignment...! Please wait..!'

    })
    console.log('create assignment payload', JSON.stringify(payload));
    createAssignmentAPI(payload)
      .then(res => {
        console.log('res', res);
        setAssignmentComplete({
          open: true,
          progress: 100,
          status: 'success',
          message: 'Assignment created successfully',
        });
      })
      .catch(err => {
        setAssignmentComplete({
          open: true,
          progress: 100,
          status: 'error',
          message: 'Something went wrong.! Please try again.'
        })
        console.log('error', err);
      });
  };

  const GeneralSchema = Yup.object().shape({
    assignmentName: Yup.string().required(t('Validations:AssignmentName_ShouldNotBe_Empty')).max(255, t('messages:Max_char', { numberOfChars: 255 })),
    descriptionDetail: Yup.string().required(t('Validations:Required')),
    className: Yup.string().required(t('Validations:Required')).nullable(),
    // displayDescription: Yup.boolean().required(t('Validations:Required')),
    subjectName: Yup.string().required(t('Validations:Required')).nullable(),
    sectionNames: Yup.array().required(t('Validations:Minimum_one_section_has_to_be_selected')),
    // assessmentInstructions: Yup.string().required(t('Validations:Required')),
  });

  const AssignmentSchema = Yup.object({
    availabilityFrom: Yup.string().required(t('Validations:Required')),
    availabilityTill: Yup.string().required(t('Validations:Required')),
    onlineText: Yup.boolean().required(t('Validations:Required')),
    fileSubmission: Yup.boolean().required(t('Validations:Required')),
    wordLimit: Yup.number().when('onlineText', { is: true, then: Yup.number().required(t('Validations:Required')) }),
    noOfFilesUpload: Yup.string().when('fileSubmission', { is: true, then: Yup.string().required(t('Validations:Required')), }),
    // gradetopass: Yup.number().required(t('Validations:Required')),
    // totalMarks: Yup.number().required(t('Validations:Required')),
    gradetopass: Yup.number().positive().required(t('Validations:Required')).min(0),
    totalMarks: Yup.number().positive().required(t('Validations:Required')).min(0),

  });

  const getValidation = () => {
    switch (activeStep) {
      case 0:
        return GeneralSchema;
      case 1:
        return AssignmentSchema;
      default:
        null;
    }
  };

  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      //general page
      assignmentName: formData?.assignmentName || previewData?.name,
      descriptionDetail: formData?.descriptionDetail || previewData?.intro,
      displayDescription: displayDescription,
      assignmentInstructions: '',

      //Grade Component
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
      availabilityFrom: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
      availabilityTill: moment(new Date()).add(7, 'days').format('YYYY-MM-DDTHH:mm'),
      attemptsAllowed: '1',
      onlineText: false,
      fileSubmission: true,
      wordLimit: '',
      noOfFilesUpload: '',
      maximumFileSize: 0,
      totalMarks: '',
      gradetopass: '',
      fileFormatLists: fileFormatLists,
      tags: tags,
      activeStep: activeStep,
      setActiveStep: setActiveStep,
      assignmentComplete: assignmentComplete,
      setAssignmentComplete: setAssignmentComplete,
      formData: formData,
      setFormData: setFormData
    }),

    validationSchema: getValidation,

    handleSubmit: values => {
      let allValues = values;
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
    },
    payloadData: payloadData,
    setFormData: setFormData,
    formData: formData,
  })(AssignmentDetails);

  return <FormikForm {...props} />;
};
