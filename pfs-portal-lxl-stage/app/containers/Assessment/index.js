import React, { useContext, useState } from 'react';
import { Box, useTheme, Grid, makeStyles, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import General from './Components/General/index';
import Assessment from './Components/Assessment/index';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withFormik } from 'formik';
import {
  createQuiz,
  getCourses,
  getStudentListDetails,
  getQuizSettingsById,
  updateAssessmentSettings,
} from '../../utils/ApiService';
import { FaRegListAlt, FaRegEdit } from 'react-icons/fa';
import { BiTimeFive, BiPurchaseTag, BiLockAlt } from 'react-icons/bi';
import { FiAward, FiUnlock, FiBox } from 'react-icons/fi';
import { RiLayoutLine, RiGlobalLine } from 'react-icons/ri';
import { GrCodeSandbox } from 'react-icons/gr';
import { TbWaveSawTool } from 'react-icons/tb';

import { BsQuestionCircle, BsLayoutSplit } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import VerticalStepper from '../../components/VerticalStepper/index';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { KEY_USER } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import Context from '../../utils/helpers/context';
import KenLoader from '../../components/KenLoader';
import KenDialog from '../../components/KenDialogBox/index';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FiCheck } from 'react-icons/fi';
import Routes from '../../utils/routes.json';

export default function PreAssessment(props) {
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
  paperScrollPaper: {
    background: '#fff',
  },
}));
const AssessmentDetails = props => {
  const theme = useTheme();
  const classes = useStyles();
  // const { loading } = props;

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

  const [title, setTitle] = React.useState('Assessment');
  // const [operation, setOperation] = React.useState('Create')
  const [openDialog, setOpenDialog] = React.useState(values.addAssessment.open);

  const steps = [
    {
      id: 1,
      label: 'General',
    },
    {
      id: 2,
      label: 'Assessment settings',
      content: [
        {
          img: BiTimeFive,
          label: 'Time',
          link: '/assessment/#time',
        },
        {
          img: FiAward,
          label: 'Grade',
          link: '/assessment/#grade',
        },

        {
          img: BsQuestionCircle,
          label: 'Question behaviour',
          link: '/assessment/#questionBehaviour',
        },

        // {
        //   img: FaRegListAlt,
        //   label: 'Grade Component',
        //   link: '/assessment/#examDetails',
        // },
      ],

      collapseItem: [
        {
          img: RiLayoutLine,
          label: 'Layout',
          link: '/assessment/#layout',
        },
        {
          img: BiPurchaseTag,
          label: 'Tags',
          link: '/assessment/#tags',
        },
        {
          img: AiOutlineStar,
          label: 'Review options',
          link: '/assessment/#review',
        },
        {
          img: BsLayoutSplit,
          label: 'Appearance',
          link: '/assessment/#appearance',
        },
        // {
        //   img: RiGlobalLine,
        //   label: 'Safe exam browser',
        //   link: '/assessment/#safeexambrowser',
        // },
        // {
        //   img: FiUnlock,
        //   label: 'Extra restrictions on attempts',
        //   link: '/assessment/#extrarestrictionsattempt',
        // },
        // {
        //   img: FiBox,
        //   label: 'Common module settings',
        //   link: '/assessment/#commonmodulesettings',
        // },
        // {
        //   img: FaRegEdit,
        //   label: 'Assign students',
        //   link: '/assessment/#assignstudents',
        // },
        {
          img: BiLockAlt,
          label: 'Restrict access',
          link: '/assessment/#restrictaccess',
        },
        // {
        //   img: TbWaveSawTool,
        //   label: 'Activity completion',
        //   link: '/assessment/#activitycompletion',
        // },
        // {
        //   img: GrCodeSandbox,
        //   label: 'Competencies',
        //   link: '/assessment/#competencies',
        // },
      ],
    },
    // {
    //   id: 3,
    //   label: 'Proctoring settings',
    // }
  ];

  const getStepContent = () => {
    const stepper = values.activeStep;
    switch (stepper) {
      case 0:
        return <General {...props} operation={values?.operation} />;
      case 1:
        return <Assessment {...props} />;
      // case 2:
      //   return <ProctoringSettings {...props} />;
      default:
        return 'Not available';
    }
  };

  const phone = useMediaQuery(theme.breakpoints.only('xs'));

  const handleCancel = () => {
    history.push(`/${Routes.home}`);
  };

  return (
    <Box>
      {/* {values.loading && <KenLoader />} */}
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
            values.setAddAssessment({ open: false });
          }}
          handleClose={() => {
            values.setAddAssessment({ open: false });
            props.history.push({
              pathname: values.addAssessment.pathname,
              state: values.addAssessment.state,
            });
          }}
          disabledOk={values.addAssessment.progress < 100 ? true : false}
          maxWidth="xs"
          styleOverrides={{
            dialogPaper: classes.dialogPaper,
            paperScrollPaper: classes.paperScrollPaper,
          }}
        >
          <Grid container>
            <Grid item container direction="row">
              <Box style={{ width: '100%' }}>
                <Box
                  width="100%"
                  style={{ marginRight: 0, marginTop: 20, marginBottom: 20 }}
                >
                  <LinearProgress
                    variant="determinate"
                    classes={{
                      root: classes.linearRoot,
                      bar:
                        values.addAssessment.status !== 'error'
                          ? classes.bar
                          : classes.errorBar,
                    }}
                    value={values.addAssessment.progress}
                  />
                </Box>
                <Box>
                  <Grid item>
                    <Typography style={{ float: 'left', color: values.addAssessment.status !== "error" ? '#52C15A' : '#ff0000' }}>
                      {values.addAssessment.message}
                    </Typography>
                    {values.addAssessment.progress == 100 && <div>
                      <span className={classes.uploadSuccess}>
                        <FiCheck strokeWidth={'2px'} fontSize={18} /></span>
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
  const { handleFormSubmit } = props;
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
  const [browsersecurity, setBrowsersecurity] = React.useState(false);
  const [quizOfflineAttemptAllow, setquizOfflineAttemptAllow] = React.useState(false);
  const [showAssessmentCoursePage, setShowAssessmentCoursePage,] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState([{ profileField1: '', profileField2: '', typeSomething: '' },]);
  const profile = getUserDetails().ContactId;
  const [urlQuizId, setUrlQuizId] = React.useState(null);
  const [payloadData, setPayloadData] = React.useState({});
  const [operation, setOperation] = React.useState('Create');
  const [previewData, setPreviewData] = React.useState(null);
  const [addAssessment, setAddAssessment] = React.useState({ open: false, message: 'Loading...', progress: 5, });

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
    // var hms = moment(new Date()).format('hh:mm');   // your input string
    // var a = hms.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    // return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2] ? a[2] : 0);
    return Number(hour) * 60 * 60 + Number(60 * Number(min));
  };

  React.useEffect(() => {
    let url = window.location.href;
    let slashIndex = url.lastIndexOf('/');
    let urlQuizId = url.substr(slashIndex + 1, url.length);

    if (!isNaN(urlQuizId)) {
      setOperation('Edit');
      setUrlQuizId(urlQuizId);
      let payload = { method: 'get', quizid: urlQuizId };
      getQuizSettingsById(payload)
        .then(res => {
          setPreviewData(res.quiz[0]);
          console.log('res', res);
        })
        .catch(err => {
          console.log('error', err);
        });
    }
  }, []);

  const handleAssessmentSubmit = (allData, operation) => {
    setLoading(true);
    let quizsettings = [
      {
        name: String(formData.assessmentName), //Quiz name
        description: String(formData.descriptionDetail), //description,
        // "showdescription": allData.displayDescription ? 1 : 0,
        // "gradetype": String(allData.gradeType), //Quiz grade type
        // "examtype": String(allData.examType), //Quiz exam type

        // gradetype: 'Half-Yearly', //Quiz grade type
        gradetype: '', //Quiz grade type
        examtype: '', //Quiz exam type

        opentime: moment(allData.startQuizTime).unix(), //Quiz opentime unixtimestamp
        closetime: moment(allData.endQuizTime).unix(), //Quiz closetime unixtimestamp
        timelimit: convertToSeconds(
          Number(allData.timeLimitHours),
          Number(allData.timeLimitMinutes)
        ), //Quiz time limit in seconds
        overduehandling: String(allData.onTimeExpiration), //On time expiration possible values "autosubmit","autoabandon","graceperiod"

        totalmarks: Number(allData.totalMarks || 10), //totalmarks
        gradetopass: Number(allData.inputMarks), //Grade to pass
        grademethod: Number(allData.gradeMethod), //Grade method possible values: 1 for Highest grade, 2 for Average grade, 3 for First attempt, 4 for Last attempt
        attemptallowed: Number(allData.attemptsAllowed), //No of Attempt allowed
        overallfeedback: allData.overallfeedback, //overall Feeddback (optional)
        tags: allData.tags, //Tags (Optional)
        questionsperpage: Number(allData.questionsPerPage), //No. of questions per page. value "0" for all question in one page
        navmethod: String(allData.navigationMethod), //Navigation method "free", "sequential"
        graceperiod: Number(allData.submissionGradeInputValue || 0), //Grace period
        // "graceperiod": "0", //Grace period
        shuffleanswers: Number(allData.shuffleWithInAnswers), //Shuffle answers 0 for No 1 for Yes
        preferredbehaviour: String(allData.questionBehaviour), //Possible value "adaptive", "adaptivenopenalty", "deferredfeedback", "deferredcbm", "immediatefeedback","immediatecbm", "eractive"
        canredoquestions: Number(allData.attemptRedo), //Allow redo within an attempt 0 for no and 1 for yes
        attemptonlast: Number(allData.attemptLast), //Each attempt builds on the last : 0 for No and 1 for yes

        attemptduring: allData.attemptduring ? 1 : 0, //----Review options --- During the attempt :- "The attempt"  0 for No and 1 for yes
        correctnessduring: allData.correctnessduring ? 1 : 0, //----Review options --- During the attempt :-  Weather correct : 0 for No and 1 for yes
        marksduring: allData.marksduring ? 1 : 0, //----Review options --- During the attempt :- Marks: 0 for No and 1 for yes
        specificfeedbackduring: allData.specificfeedbackduring ? 1 : 0, //----Review options --- During the attempt :- specific feedback  : 0 for No and 1 for yes
        generalfeedbackduring: allData.generalfeedbackduring ? 1 : 0, //----Review options --- During the attempt :- General feedback : 0 for No and 1 for yes
        rightanswerduring: allData.rightanswerduring ? 1 : 0, //----Review options --- During the attempt :- Right answer : 0 for No and 1 for yes
        overallfeedbackduring: allData.overallfeedbackduring ? 1 : 0, //----Review options --- During the attempt :- Overall feedback : 0 for No and 1 for yes

        attemptimmediately: allData.attemptimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :- The attempt: 0 for No and 1 for yes
        correctnessimmediately: allData.correctnessimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :-  Weather correct : 0 for No and 1 for yes
        marksimmediately: allData.marksimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :-  Marks : 0 for No and 1 for yes
        specificfeedbackimmediately: allData.specificfeedbackimmediately
          ? 1
          : 0, //----Review options --- Immediately after the attempt :-  Specific feedback : 0 for No and 1 for yes
        generalfeedbackimmediately: allData.generalfeedbackimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :-  General feedback  : 0 for No and 1 for yes
        rightanswerimmediately: allData.rightanswerimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :-  Right answer : 0 for No and 1 for yes
        overallfeedbackimmediately: allData.overallfeedbackimmediately ? 1 : 0, //----Review options --- Immediately after the attempt :-  Overall feedback : 0 for No and 1 for yes

        attemptopen: allData.attemptopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :- The attempt: 0 for No and 1 for yes
        correctnessopen: allData.correctnessopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  Weather correct : 0 for No and 1 for yes
        marksopen: allData.marksopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  Marks : 0 for No and 1 for yes
        specificfeedbackopen: allData.specificfeedbackopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  Specific feedback : 0 for No and 1 for yes
        generalfeedbackopen: allData.generalfeedbackopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  General feedback  : 0 for No and 1 for yes
        rightansweropen: allData.rightansweropen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  Right answer : 0 for No and 1 for yes
        overallfeedbackopen: allData.overallfeedbackopen ? 1 : 0, //----Review options --- Later, while the quiz is still open. :-  Overall feedback : 0 for No and 1 for yes

        attemptclosed: allData.attemptclosed ? 1 : 0, //----Review options --- After the quiz is closed :- The attempt: 0 for No and 1 for yes
        correctnessclosed: allData.correctnessclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  Weather correct : 0 for No and 1 for yes
        marksclosed: allData.marksclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  Marks : 0 for No and 1 for yes
        specificfeedbackclosed: allData.specificfeedbackclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  Specific feedback : 0 for No and 1 for yes
        generalfeedbackclosed: allData.generalfeedbackclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  General feedback  : 0 for No and 1 for yes
        rightanswerclosed: allData.rightanswerclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  Right answer : 0 for No and 1 for yes
        overallfeedbackclosed: allData.overallfeedbackclosed ? 1 : 0, //----Review options --- After the quiz is closed :-  Overall feedback : 0 for No and 1 for yes

        showuserpicture: Number(allData.showUserPicture), //Show user picture 0 for no image 1 for small image 2 for large image
        decimalpoints: Number(allData.decimalPlaceinGrades), // allData.decimalPlaceinGrades //Decimal places in grades possible values 0,1,2,3,4,5
        questiondecimalpoints: Number(allData.questionGrades), //Decimal places in question grades -1 for Same as for overall grades, 0,1,2,3,4,5,6,7
        showblocks: Number(allData.showblocks), //Show blocks during attempt 1 for yes 0 for no

        seb_requiresafeexambrowser: Number(allData.safeExamBrowserUse), //Require the use of Safe Exam Browser possible values 0,1,2,3,4
        seb_showsebdownloadlink: allData.seb_showsebdownloadlink ? 1 : 0, //Show Safe Exam Browser download button 0 for no 1 for yes
        seb_linkquitseb: String(allData.seb_linkquitseb), //Show Exit Safe Exam Browser button, configured with this quit link
        seb_userconfirmquit: allData.seb_userconfirmquit ? 1 : 0, //Ask user to confirm quitting 0 for no 1 for yes
        seb_allowuserquitseb: allData.seb_allowuserquitseb ? 1 : 0, //seb_allowuserquitseb 0 for no 1 for yes
        seb_quitpassword: String(allData.seb_quitpassword), //Quit password
        seb_allowreloadinexam: allData.seb_allowreloadinexam ? 1 : 0, //Enable reload in exam 0 for no 1 for yes
        seb_showsebtaskbar: allData.seb_showsebtaskbar ? 1 : 0, //Show SEB task bar 0 for no 1 for yes
        seb_showreloadbutton: allData.seb_showreloadbutton ? 1 : 0, //Show reload button 0 for no 1 for yes
        seb_showtime: allData.seb_showtime ? 1 : 0, //Show time 0 for no 1 for yes
        seb_showkeyboardlayout: allData.seb_showkeyboardlayout ? 1 : 0, //Show keyboard layout 0 for no 1 for yes
        seb_showwificontrol: allData.seb_showwificontrol ? 1 : 0, //Show Wi-Fi control 0 for no 1 for yes
        seb_enableaudiocontrol: allData.seb_enableaudiocontrol ? 1 : 0, //Enable audio controls 0 for no 1 for yes
        seb_muteonstartup: allData.seb_muteonstartup ? 1 : 0, //Mute on startup 0 for no and 1 for yes
        seb_allowspellchecking: allData.seb_allowspellchecking ? 1 : 0, //Enable spell checking 0 for no 1 for yes
        seb_activateurlfiltering: allData.seb_activateurlfiltering ? 1 : 0, //Enable URL filtering 0 for no 1 for yes
        seb_allowedbrowserexamkeys: String(allData.seb_allowedbrowserexamkeys), //Allowed browser exam keys
        seb_filterembeddedcontent: 0, //Filter Embedded content 0 for no 1 for yes
        seb_expressionsallowed: '', //Expressions allowed
        seb_regexallowed: '', //Regex allowed
        seb_expressionsblocked: '', //Expression blocked
        seb_regexblocked: '', //Regex blocked

        quizpassword: String(allData.passwordAssessment), //Quiz password
        subnet: String(allData.networkAddress), //Require network address
        delay1: convertToSeconds(
          Number(allData.delay1Hours),
          Number(allData.delay1Minutes)
        ), // (allData.delayBtwInitialAttempt)  Enforced delay between 1st and 2nd attempts
        delay2: convertToSeconds(
          Number(allData.delay2Hours),
          Number(allData.delay2Minutes)
        ), // (allData.delayBtwLaterAttempt) Enforced delay between later attempts
        browsersecurity: allData.browsersecurity ? 'securewindow' : '-', //Browser security possible values "-" for None, "securewindow" for Full screen pop-up with some JavaScript security
        allowofflineattempts: allData.quizOfflineAttemptAllow ? 1 : 0, //Allow quiz to be attempted offline using the mobile app 0 for no and 1 for yes
        proctoringrequired: 0, //Webcam identity validation 0,1
      },
    ];
    const payload = {
      method: 'post',
      quizsettings: quizsettings,
    };
    if (operation?.toLowerCase() === 'create') {
      payload.quizsettings[0]['courseoffering'] = getCourseOfferings(
        formData.sectionNameWithIds
      ); //Course offering ids;

      console.log('create quiz payload', JSON.stringify(payload));
      createQuiz(payload)
        .then(res => {
          console.log('res', res);
          if (!res.hasOwnProperty('errorcode')) {
            setLoading(false);
            setAddAssessment({
              open: true,
              progress: 100,
              status: 'success',
              pathname: `/${Routes.questionBank}`,
              message: 'Assessment has been added successfully..!',
              state: {
                quizId: res.quizid,
                quizName: formData.assessmentName,
                origin: 'Dashboard',
              },
            });
          } else {
            setLoading(false);
            setAddAssessment({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Error while creating quiz with exisiting settings',
            });
            // alert('Error while creating quiz with exisiting settings');
          }
        })
        .catch(err => {
          setLoading(false);
          setAddAssessment({
            open: true,
            progress: 100,
            status: 'error',
            message: 'Error while creating quiz with exisiting settings',
          });
          console.log('error', err);
        });
    } else {
      payload.quizsettings[0]['quizid'] = urlQuizId;
      console.log('update quiz payload', JSON.stringify(payload));
      console.log('update quiz payload', payload);

      updateAssessmentSettings(payload)
        .then(res => {
          console.log('res', res);
          if (!res.hasOwnProperty('errorcode')) {
            setLoading(false);
            setAddAssessment({
              open: true,
              progress: 100,
              status: 'success',
              message: 'Assessment has been updated successfully..!',
              pathname: `/${Routes.questionBank}`,
              state: {
                quizId: urlQuizId,
                quizName: formData.assessmentName,
                origin: 'Dashboard',
              },
            });
          } else {
            setLoading(false);
            setAddAssessment({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Something went wrong..!',
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setAddAssessment({
            open: true,
            progress: 100,
            status: 'error',
            message: 'Error while updating quiz with exisiting settings',
          });
          console.log('error', err);
        });
    }
  };

  const GeneralSchema = Yup.object().shape({
    assessmentName: Yup.string()
      .required(t('Validations:AssessmentName_ShouldNotBe_Empty'))
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

  const AssessmentSchema = Yup.object({
    startQuizTime: Yup.string().required(t('Validations:Required')),
    endQuizTime: Yup.string().required(t('Validations:Required')),
    // timeLimit: Yup.string().required(t('Validations:Required')),
    timeLimitHours: Yup.number().positive().required(t('Validations:Required')).min(0),
    // delay1Hours: Yup.number().required(t('Validations:Required')),
    // delay2Hours: Yup.number().required(t('Validations:Required')),

    // timeLimit: Yup.object({
    //   hours: Yup.number().required(t('Validations:Required')),
    //   // minutes: Yup.number().required(t('Validations:Required')),
    // }),
    onTimeExpiration: Yup.string().required(t('Validations:Required')),
    submissionGradeInputValue: Yup.number().when('onTimeExpiration', {
      is: 'graceperiod', then: Yup.number().required(t('Validations:Required')),
    }),

    // submissionGradeSelectValue: Yup.string().required(t('Validations:Required')),
    // MinimumTimeAssignment: Yup.string().required(t('Validations:Required')),
    // examDuration: Yup.string().required(t('Validations:Required')),
    // sectionalTimeCutoff: Yup.string().required(t('Validations:Required')),

    // CourseComponent
    // courseComponent: Yup.string().required(t('Validations:Required')).nullable(),
    // totalMarks: Yup.string().required(t('Validations:Required')),
    inputMarks: Yup.number().min(0).max(10).required(t('Validations:Required')),
    // selectMarks: Yup.string().required(t('Validations:Required')),
    attemptsAllowed: Yup.string().required(t('Validations:Required')),
    gradeMethod: Yup.string().required(t('Validations:Required')),

    //Layout Component
    questionsPerPage: Yup.number().required(t('Validations:Required')),
    navigationMethod: Yup.string()
      .required(t('Validations:Required'))
      .matches(KEY_USER.REGEX.NAME, t('Validations:Name_Match')),

    //Question behavior
    shuffleWithInQuestion: Yup.string().required(t('Validations:Required')),
    shuffleWithInAnswers: Yup.string().required(t('Validations:Required')),
    questionBehaviour: Yup.string().required(t('Validations:Required')),

    attemptRedo: Yup.string().when('questionBehaviour', {
      is: 'immediatefeedback',
      then: Yup.string().required(t('Validations:Required')),
      is: 'immediatecbm',
      then: Yup.string().required(t('Validations:Required')),
      is: 'interactive',
      then: Yup.string().required(t('Validations:Required')),
    }),
    attemptLast: Yup.string().required(t('Validations:Required')),

    //  Note: All the below validations schema will be enabled in future
    //Tag
    // tags: Yup.array().min(1, t('Validations:Minimum_one_tag_has_to_be_added')),

    //Restricted Access
    // activityCompletion: Yup.string().required(t('Validations:Required')),
    // activityCompletion2: Yup.string().required(t('Validations:Required')),
    // restrictionDateOpt: Yup.string().required(t('Validations:Required')),

    // restrictionDate: Yup.string().required(t('Validations:Required')),
    // restrictionDateTime: Yup.string().required(t('Validations:Required')),
    // grade: Yup.string().required(t('Validations:Required')),
    // mustGreaterEqualto: Yup.number().required(t('Validations:Required')),
    // mustLessThan: Yup.number().required(t('Validations:Required')),

    // userProfile: Yup.array().of(
    //   Yup.object().shape({
    //     profileField1: Yup.string().required(t('Validations:Required')),
    //     profileField2: Yup.string().required(t('Validations:Required')),
    //     typeSomething: Yup.string().required(t('Validations:Required'))
    //   })),

    //Extra Restriction on Attempt
    // passwordAssessment: Yup.string().required(t('Validations:Required')),
    // networkAddress: Yup.string().required(t('Validations:Required')),

    // browsersecurity: Yup.boolean().required(t('Validations:Required')),
    // quizOfflineAttemptAllow: Yup.boolean().required(t('Validations:Required')),

    //Common module settings
    // showAssessmentCoursePage: Yup.boolean().required(t('Validations:Required')),
    // moduleID: Yup.string().required(t('Validations:Required')),
    // groupMode: Yup.string().required(t('Validations:Required')),
    // grouping: Yup.string().required(t('Validations:Required')),

    //Activity Completion
    // completionTracking: Yup.string().required(t('Validations:Required')),
    // expectCompletedOnValue: Yup.string().when('completionTracking', { is: '1', then: Yup.string().required(t('Validations:Required')) }),
    // expectCompletedTime: Yup.string().when('completionTracking', { is: '2', then: Yup.string().required(t('Validations:Required')) }),
    // expectCompletedOnDate: Yup.string().when('completionTracking', { is: '2', then: Yup.string().required(t('Validations:Required')) }),

    //Apperance page
    showUserPicture: Yup.string().required(t('Validations:Required')),
    decimalPlaceinGrades: Yup.string().required(t('Validations:Required')),
    questionGrades: Yup.string().required(t('Validations:Required')),
    showblocks: Yup.string().required(t('Validations:Required')),

    //Safe Exam Browser
    safeExamBrowserUse: Yup.number().required(t('Validations:Required')),

    // seb_quitpassword: Yup.string().when('safeExamBrowserUse', {
    //   is: '1', then: Yup.string().required(t('Validations:Required')),
    // }),
    // seb_allowedbrowserexamkeys: Yup.string().when('safeExamBrowserUse', {
    //   is: '2', then: Yup.string().required(t('Validations:Required')),
    //   is: '3', then: Yup.string().required(t('Validations:Required')),
    // }),
    // seb_linkquitseb: Yup.string().when('safeExamBrowserUse', {
    //   is: '1', then: Yup.string().required(t('Validations:Required'))
    // }),

    // seb_quitpassword: Yup.string().required(t('Validations:Required')),
    seb_showsebdownloadlink: Yup.boolean().required(t('Validations:Required')),

    seb_userconfirmquit: Yup.boolean().required(t('Validations:Required')),
    seb_allowuserquitseb: Yup.boolean().required(t('Validations:Required')),
    seb_allowreloadinexam: Yup.boolean().required(t('Validations:Required')),
    seb_showsebtaskbar: Yup.boolean().required(t('Validations:Required')),
    seb_showreloadbutton: Yup.boolean().required(t('Validations:Required')),
    seb_showtime: Yup.boolean().required(t('Validations:Required')),
    seb_showkeyboardlayout: Yup.boolean().required(t('Validations:Required')),
    seb_showwificontrol: Yup.boolean().required(t('Validations:Required')),
    seb_enableaudiocontrol: Yup.boolean().required(t('Validations:Required')),
    seb_muteonstartup: Yup.boolean().required(t('Validations:Required')),
    seb_allowspellchecking: Yup.boolean().required(t('Validations:Required')),
    seb_activateurlfiltering: Yup.boolean().required(t('Validations:Required')),

    // competencies
    // courseCompetency: Yup.string().required(t('Validations:Required')),
    // uponActivityCompletion: Yup.string().required(t('Validations:Required')),

    //Grade Component
    assessmentGraded: Yup.string().required(t('Validations:Required')),
    // examType: Yup.string().required(t('Validations:Required')),
    // gradeType: Yup.string().required(t('Validations:Required')),
  });

  const getValidation = () => {
    switch (activeStep) {
      case 0:
        return GeneralSchema;
      case 1:
        return AssessmentSchema;
      default:
        null;
    }
  };

  const getHours = seconds => {
    if (String(seconds) !== 'NaN') {
      const time = new Date(Number(seconds) * 1000).toISOString().slice(11, 19);
      const timeSplit = time.split(':');
      return {
        hours: timeSplit[0] ? timeSplit[0] : 0,
        minutes: timeSplit[1] ? timeSplit[1] : 0,
      };
    } else {
      return {
        hours: 0,
        minutes: 0,
      };
    }
  };
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      methodType: operation,
      //general page
      urlQuizId: urlQuizId,
      assessmentName: formData?.assessmentName || previewData?.name,
      descriptionDetail: formData?.descriptionDetail || previewData?.description,
      displayDescription: previewData?.showdescription || displayDescription,
      assessmentInstructions: previewData?.description,

      //Grade Component
      assessmentGraded: '',
      examType: previewData?.examtype || '',
      gradeType: previewData?.gradetype || '',

      className: formData?.className || classesArray[0],
      sectionNames: formData?.sectionNames || [],
      sectionNameWithIds: formData?.sectionNameWithIds || [],
      subjectName: formData?.subjectName || '',
      classesArray: formData?.classesArray || classesArray,
      courses: courses,
      loading: loading,
      //time page
      // startQuizTime: previewData?.timeopen
      //   ? moment(new Date(previewData?.timeopen)).format('YYYY-MM-DDTHH:mm')
      //   : moment(new Date()).format('YYYY-MM-DDTHH:mm'),
      // endQuizTime: previewData?.timeclose
      //   ? moment(new Date(previewData?.timeclose)).format('YYYY-MM-DDTHH:mm')
      //   : moment(new Date())
      //     .add(2, 'hours')
      //     .format('YYYY-MM-DDTHH:mm'),

      startQuizTime: (previewData?.timeopen &&
        moment.unix(previewData?.timeopen).format('YYYY-MM-DDTHH:mm')) ||
        moment(new Date()).format('YYYY-MM-DDTHH:mm'),
      endQuizTime: (previewData?.timeclose &&
        moment.unix(previewData?.timeclose).format('YYYY-MM-DDTHH:mm')) ||
        moment(new Date()).add(2, 'hours').format('YYYY-MM-DDTHH:mm'),

      timeLimitHours: previewData ? getHours(String(previewData?.timelimit)).hours : 0,
      // timeLimitMinutes: previewData ? getHours(Number(previewData?.timelimit)).minutes : 0,
      // timeLimitHours: 0,
      timeLimitMinutes: previewData
        ? getHours(Number(previewData?.timelimit)).minutes
        : 0,

      onTimeExpiration: previewData?.overduehandling || 'autosubmit',
      submissionGradeInputValue: previewData?.graceperiod,
      submissionGradeSelectValue: '',
      MinimumTimeAssignment: '',
      examDuration: '',
      sectionalTimeCutoff: '',
      //grade page
      courseComponent: '',
      totalMarks: previewData?.totalmarks,
      // gradeToPassAssessment: '',
      inputMarks: previewData?.gradetopass || 0,
      selectMarks: '',
      attemptsAllowed: previewData?.attemptallowed || 0,
      gradeMethod: previewData?.grademethod || 'highest',
      overallfeedback: previewData?.overallfeedback || [],
      //layout
      questionsPerPage: previewData?.questionsperpage || -1,
      navigationMethod: previewData?.navmethod || 'free',
      operation: operation,
      //Question Behaviour
      shuffleWithInQuestion: '',
      shuffleWithInAnswers: previewData?.shuffleanswers || '',
      questionBehaviour: previewData?.preferredbehaviour || '',
      attemptRedo: previewData?.canredoquestions == 0 ? false : true,
      attemptLast: previewData?.attemptonlast == 0 ? false : true,
      //Tag
      tags: previewData?.tags || tags,
      //Extra Restriction on attempt
      passwordAssessment: previewData?.quizpassword || '',
      networkAddress: previewData?.subnet || '',
      // delayBtwInitialAttempt: new Date(),
      // delayBtwLaterAttempt: new Date(),
      delay1Hours: previewData
        ? getHours(String(previewData?.delay1)).hours
        : 0,
      delay1Minutes: previewData
        ? getHours(String(previewData?.delay1)).minutes
        : 0,
      delay2Hours: previewData
        ? getHours(String(previewData?.delay2)).hours
        : 0,
      delay2Minutes: previewData
        ? getHours(String(previewData?.delay2)).minutes
        : 0,

      // fullScreenPopupEnable: fullScreenPopupEnable,
      browsersecurity:
        previewData?.browsersecurity == 'securewindow' ? true : false,
      quizOfflineAttemptAllow:
        previewData?.allowofflineattempts || quizOfflineAttemptAllow,
      //Common module settings
      showAssessmentCoursePage:
        Number(previewData?.visible) == 0 ? false : true,
      moduleID: previewData?.moduleid || '',
      groupMode: previewData?.groupmode || '',
      grouping: '',
      //Restricted Access
      activityCompletion: '',
      activityCompletion2: '',
      restrictionDateOpt: '',
      restrictionDate: '',
      // restrictionDateTime: new Date(),
      grade: '',
      mustGreaterEqualto: '',
      mustLessThan: '',
      userProfile: userProfile,
      //Appearance
      showUserPicture: previewData?.showuserpicture,
      decimalPlaceinGrades: previewData?.decimalpoints || '0',
      questionGrades: previewData?.questiondecimalpoints || -1,
      showblocks: previewData?.showblocks == 0 ? false : true,
      //Safe Exam Browser
      safeExamBrowserUse: previewData?.seb_requiresafeexambrowser || '0',
      seb_showsebdownloadlink:
        previewData?.seb_showsebdownloadlink == 0
          ? false
          : previewData?.seb_showsebdownloadlink == 1
            ? true
            : false,
      seb_linkquitseb: previewData?.seb_userconfirmquit || '',
      seb_userconfirmquit:
        previewData?.seb_userconfirmquit == 0
          ? false
          : previewData?.seb_userconfirmquit == 1
            ? true
            : false,
      seb_allowuserquitseb:
        previewData?.seb_allowuserquitseb == 0
          ? false
          : previewData?.seb_allowuserquitseb == 1
            ? true
            : false,
      seb_quitpassword: previewData?.seb_quitpassword || '',
      seb_allowreloadinexam:
        previewData?.seb_allowreloadinexam == 0
          ? false
          : previewData?.seb_allowreloadinexam == 1
            ? true
            : false,
      seb_showsebtaskbar:
        previewData?.seb_showsebtaskbar == 0
          ? false
          : previewData?.seb_showsebtaskbar == 1
            ? true
            : false,
      seb_showreloadbutton:
        previewData?.seb_showreloadbutton == 0
          ? false
          : previewData?.seb_showreloadbutton == 1
            ? true
            : false,
      seb_showtime:
        previewData?.seb_showtime == 0
          ? false
          : previewData?.seb_showtime == 1
            ? true
            : false,
      seb_showkeyboardlayout:
        previewData?.seb_showkeyboardlayout == 0
          ? false
          : previewData?.seb_showkeyboardlayout == 1
            ? true
            : false,
      seb_showwificontrol:
        previewData?.seb_showwificontrol == 0
          ? false
          : previewData?.seb_showwificontrol == 1
            ? true
            : false,
      seb_enableaudiocontrol:
        previewData?.seb_enableaudiocontrol == 0
          ? false
          : previewData?.seb_enableaudiocontrol == 1
            ? true
            : false,
      seb_muteonstartup:
        previewData?.seb_muteonstartup == 0
          ? false
          : previewData?.seb_muteonstartup == 1
            ? true
            : false,
      seb_allowspellchecking:
        previewData?.seb_allowspellchecking == 0
          ? false
          : previewData?.seb_allowspellchecking == 1
            ? true
            : false,
      seb_activateurlfiltering:
        previewData?.seb_activateurlfiltering == 0
          ? false
          : previewData?.seb_activateurlfiltering == 1
            ? true
            : false,
      seb_allowedbrowserexamkeys: previewData?.seb_allowedbrowserexamkeys || '',
      sebquizAttempts: '',
      //Activity Completion
      completionTracking: '',
      expectCompletedOnValue: '',
      expectCompletedTime: new Date(),
      expectCompletedOnDate: new Date(),
      //Competency
      courseCompetency: '',
      uponActivityCompletion: '',

      //Review Options
      attemptduring:
        previewData?.attemptduring == 0
          ? false
          : previewData?.attemptduring == 1
            ? true
            : false,
      correctnessduring:
        previewData?.correctnessduring == 0
          ? false
          : previewData?.correctnessduring == 1
            ? true
            : false,
      marksduring:
        previewData?.marksduring == 0
          ? false
          : previewData?.marksduring == 1
            ? true
            : false,
      specificfeedbackduring:
        previewData?.specificfeedbackduring == 0
          ? false
          : previewData?.specificfeedbackduring == 1
            ? true
            : false,
      generalfeedbackduring:
        previewData?.generalfeedbackduring == 0
          ? false
          : previewData?.generalfeedbackduring == 1
            ? true
            : false,
      rightanswerduring:
        previewData?.rightanswerduring == 0
          ? false
          : previewData?.rightanswerduring == 1
            ? true
            : false,
      overallfeedbackduring:
        previewData?.overallfeedbackduring == 0
          ? false
          : previewData?.overallfeedbackduring == 1
            ? true
            : false,

      attemptimmediately:
        previewData?.attemptimmediately == 0
          ? false
          : previewData?.attemptimmediately == 1
            ? true
            : false,
      correctnessimmediately:
        previewData?.correctnessimmediately == 0
          ? false
          : previewData?.correctnessimmediately == 1
            ? true
            : false,
      marksimmediately:
        previewData?.marksimmediately == 0
          ? false
          : previewData?.marksimmediately == 1
            ? true
            : false,
      specificfeedbackimmediately:
        previewData?.specificfeedbackimmediately == 0
          ? false
          : previewData?.specificfeedbackimmediately == 1
            ? true
            : false,
      generalfeedbackimmediately:
        previewData?.generalfeedbackimmediately == 0
          ? false
          : previewData?.generalfeedbackimmediately == 1
            ? true
            : false,
      rightanswerimmediately:
        previewData?.rightanswerimmediately == 0
          ? false
          : previewData?.rightanswerimmediately == 1
            ? true
            : false,
      overallfeedbackimmediately:
        previewData?.overallfeedbackimmediately == 0
          ? false
          : previewData?.overallfeedbackimmediately == 1
            ? true
            : false,

      attemptopen:
        previewData?.attemptopen == 0
          ? false
          : previewData?.attemptopen == 1
            ? true
            : false,
      correctnessopen:
        previewData?.correctnessopen == 0
          ? false
          : previewData?.correctnessopen == 1
            ? true
            : false,
      marksopen:
        previewData?.marksopen == 0
          ? false
          : previewData?.marksopen == 1
            ? true
            : false,
      specificfeedbackopen:
        previewData?.specificfeedbackopen == 0
          ? false
          : previewData?.specificfeedbackopen == 1
            ? true
            : false,
      generalfeedbackopen:
        previewData?.generalfeedbackopen == 0
          ? false
          : previewData?.generalfeedbackopen == 1
            ? true
            : false,
      rightansweropen:
        previewData?.rightansweropen == 0
          ? false
          : previewData?.rightansweropen == 1
            ? true
            : false,
      overallfeedbackopen:
        previewData?.overallfeedbackopen == 0
          ? false
          : previewData?.overallfeedbackopen == 1
            ? true
            : false,

      attemptclosed:
        previewData?.specificfeedbackclosed == 0
          ? false
          : previewData?.specificfeedbackclosed == 1
            ? true
            : true,
      correctnessclosed:
        previewData?.specificfeedbackclosed == 0
          ? false
          : previewData?.specificfeedbackclosed == 1
            ? true
            : true,
      marksclosed:
        previewData?.specificfeedbackclosed == 0
          ? false
          : previewData?.specificfeedbackclosed == 1
            ? true
            : true,
      specificfeedbackclosed:
        previewData?.specificfeedbackclosed == 0
          ? false
          : previewData?.specificfeedbackclosed == 1
            ? true
            : false,
      generalfeedbackclosed:
        previewData?.generalfeedbackclosed == 0
          ? false
          : previewData?.generalfeedbackclosed == 1
            ? true
            : false,
      rightanswerclosed:
        previewData?.specificfeedbackclosed == 0
          ? false
          : previewData?.specificfeedbackclosed == 1
            ? true
            : true,
      overallfeedbackclosed:
        previewData?.overallfeedbackclosed == 0
          ? false
          : previewData?.overallfeedbackclosed == 1
            ? true
            : false,

      activeStep: activeStep,
      setActiveStep: setActiveStep,
      formData: formData,
      setFormData: setFormData,
      payloadData: payloadData,
      setLoading: setLoading,
      addAssessment: addAssessment,
      setAddAssessment: setAddAssessment,
      operation: operation,
    }),

    validationSchema: getValidation,

    handleSubmit: values => {
      let allValues = values;
      values.setLoading(true);
      switch (values?.operation) {
        case 'previous':
          setFormData({ ...formData, ...values });
          values.setActiveStep(prevActiveStep => {
            return prevActiveStep - 1;
          });
          values.setLoading(false);
          break;

        case 'next':
          setFormData({ ...formData, ...values });
          values.setActiveStep(prevActiveStep => {
            return prevActiveStep + 1;
          });
          values.setLoading(false);
          break;

        case 'submit':
          values.setLoading(false);
          values.setAddAssessment({
            open: true,
            progress: 30,
            status: 'success',
            message: 'Loading....',
          });
          setFormData({ ...formData, ...values, payloadData: values });
          setPayloadData(allValues);
          handleAssessmentSubmit(allValues, operation);
          break;

        default:
          break;
      }
    },
    payloadData: payloadData,
    setFormData: setFormData,
    formData: formData,
    loading: loading,
    operation: operation,
  })(AssessmentDetails);

  return <FormikForm {...props} />;
};
