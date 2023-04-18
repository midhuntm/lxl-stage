import React, { useContext, useState } from 'react';
import { Box, useTheme, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import General from './Components/General';
import CreateForum from './Components/CreateForum/index';
import { makeStyles } from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withFormik } from 'formik';
import { getCourses, getForumDetails, createForum as CreateForumAPI, updateForum } from '../../../utils/ApiService';
// import { FaRegListAlt } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { GiDiscussion } from 'react-icons/gi';
import { GrAttachment } from 'react-icons/gr';
import { MdOutlineUnsubscribe, MdBlock } from 'react-icons/md';
import { AiOutlineUnlock } from 'react-icons/ai';

// import { BsQuestionCircle, BsLayoutSplit } from 'react-icons/bs';
// import { AiOutlineStar } from 'react-icons/ai';
import VerticalStepper from '../../../components/VerticalStepper/index';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
// import { KEY_USER } from '../../../utils/constants';
import KenDialog from '../../../components/KenDialogBox/index';

import { useTranslation } from 'react-i18next';
import Context from '../../../utils/helpers/context';
// import KenLoader from '../../../components/KenLoader';
// import { values } from 'lodash';
import moment from 'moment';
// import AssignmentFileUpload from './Components/FileUpload/AssignmentFileUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FiCheck } from 'react-icons/fi';
import Routes from '../../../utils/routes.json';


export default function CreateUpdateForum(props) {
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
    padding: 5,
    float: 'right'
  },
})
)

const CreateUpdateForumUI = props => {
  const theme = useTheme();
  const classes = useStyles();

  const { values, setFieldValue, handleSubmit, touched, errors, handleChange, setFieldTouched, handleBack, activeStep, } = props;

  const [title, setTitle] = React.useState('Forum');
  const [openDialog, setOpenDialog] = React.useState(values.forumOperationComplete.open);

  const steps = [
    {
      id: 1,
      label: 'General',
    },
    {
      id: 2,
      label: 'Forum settings',
      content: [
        {
          img: BiTimeFive,
          label: 'Availability',
          link: '/forum/#availability',
        },
        {
          img: GiDiscussion,
          label: 'Forum Type',
          link: '/forum/#forumType',
        },
        {
          img: GrAttachment,
          label: 'Attachments',
          link: '/forum/#attachements',
        },
        {
          img: MdOutlineUnsubscribe,
          label: 'Subscription Tracking',
          link: '/forum/#subscriptionTracking',
        },
        {
          img: AiOutlineUnlock,
          label: 'Discussion Locking',
          link: '/forum/#discussionLocking',
        },
        {
          img: MdBlock,
          label: 'Threshold Blocking',
          link: '/forum/#thresholdBlocking',
        },
      ],
    },
  ];

  const getStepContent = () => {
    const stepper = values.activeStep;
    switch (stepper) {
      case 0:
        return <General {...props} />;

      case 1:
        return <CreateForum {...props} />;

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
          onClose={() => { values.setForumOperationComplete({ open: false }) }}
          handleClose={() => {
            values.setForumOperationComplete({ open: false })
            props.history.push({ pathname: `/${Routes.acadamicContent}` });
          }}
          disabledOk={values.forumOperationComplete.progress < 100 ? true : false}
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
                      bar: values.forumOperationComplete.status !== "error" ? classes.bar : classes.errorBar
                    }}
                    value={values.forumOperationComplete.progress}
                  />
                </Box>
                <Box>
                  <Grid item>
                    <Typography style={{ float: 'left', color: values.forumOperationComplete.status !== "error" ? '#52C15A' : '#ff0000' }}>
                      {values.forumOperationComplete.message}
                    </Typography>
                    {values.forumOperationComplete.progress == 100 && <div>
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
  // const { handleFormSubmit } = props;
  const { handleSnackbarOpen } = useContext(Context);

  const [course, setCourse] = useState();
  const [loading, setLoading] = React.useState(false);

  const [courses, setCourses] = useState([]);
  const [classesArray, setClassesArray] = React.useState([]);
  const { t } = useTranslation();

  const [students, setStudents] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({ assessment: 'Physics' });
  const [displayDescription, setDisplayDescription] = React.useState(false);
  const profile = getUserDetails().ContactId;
  const [urlForumId, setUrlForumId] = React.useState(null);
  const [payloadData, setPayloadData] = React.useState({});
  const [operation, setOperation] = React.useState('Create');
  const [previewData, setPreviewData] = React.useState(null);

  const [forumOperationComplete, setForumOperationComplete] = React.useState({ open: false, progress: 5, message: '', });

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

  //Get forum api
  React.useEffect(() => {
    let url = window.location.href;
    let slashIndex = url.lastIndexOf('/');
    let urlForumId = url.substr(slashIndex + 1, url.length);

    if (!isNaN(urlForumId)) {
      setOperation('Edit');
      setUrlForumId(urlForumId);
      let payload = { method: 'post', forumid: Number(urlForumId) };
      getForumDetails(payload)
        .then(res => {
          let data = {}
          res.data.map(item => data[item.name] = item.value)
          let modifiedRes = data
          setPreviewData(data);
          console.log('res', modifiedRes);
        })
        .catch(err => {
          console.log('error', err);
        });
    }
  }, []);

  const handleForumSubmit = allData => {
    // let filesTypes = allData.fileFormatLists.filter(item => item.value).map(item => item.ext).join(',');
    const payload = {
      method: "post",
      forumsettings: [{
        name: String(formData.forumName),
        visible: 0,
        intro: String(formData.descriptionDetail),
        type: String(allData.forumType),
        duedate: String(moment(allData.availabilityTill).unix()),
        maxattachments: Number(allData.maxattachments),
        forcesubscribe: Number(allData.forcesubscribe),
        trackingtype: Number(allData.trackingtype),
        lockdiscussionafter: Number(allData.lockdiscussionafter),
        blockperiod: Number(allData.blockperiod),
        blockafter: Number(allData.blockafter),
        warnafter: Number(allData.warnafter)
      }],
    };
    if (operation == 'Create') {
      setForumOperationComplete({
        open: true,
        progress: 30,
        status: 'success',
        message: 'Creating forum...! Please wait..!'
      })
      payload.generalsection = 0
      payload.courseoffering = String(formData.sectionNameWithIds[0].value);
      console.log('Forum creation payload', JSON.stringify(payload));
      CreateForumAPI(payload)
        .then(res => {
          console.log('res', res);
          if (!res.hasOwnProperty('errorcode')) {
            setForumOperationComplete({
              open: true,
              status: 'success',
              progress: 100,
              message: 'Forum has been created successfully',
            })
          }
          else {
            setForumOperationComplete({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Something went wrong..!'
            })
          }
        })
        .catch(err => {
          setForumOperationComplete({
            open: true,
            progress: 100,
            status: 'error',
            message: 'Something went wrong.! Please try again.'
          })
          console.log('error', err);
        });
    }
    else {
      setForumOperationComplete({
        open: true,
        progress: 30,
        status: 'success',
        message: 'Updating the forum...! Please wait..!',
      });
      payload.forumid = String(urlForumId)
      updateForum(payload)
        .then(res => {
          console.log('res', res);
          if (!res.hasOwnProperty('errorcode')) {
            setForumOperationComplete({
              open: true,
              status: 'success',
              progress: 100,
              message: 'Forum has been updated successfully',
            })
          }
          else {
            setForumOperationComplete({
              open: true,
              progress: 100,
              status: 'error',
              message: 'Something went wrong..!'
            })
          }
        })
        .catch(err => {
          setForumOperationComplete({
            open: true,
            progress: 100,
            status: 'error',
            message: 'Something went wrong.! Please try again.'
          })
          console.log('error', err);
        });
    }
  };

  const GeneralSchema = Yup.object().shape({
    forumName: Yup.string().required(t('Validations:ForumName_ShouldNotBe_Empty')).max(255, t('messages:Max_char', { numberOfChars: 255 })),
    descriptionDetail: Yup.string().required(t('Validations:Required')),
    className: Yup.string().required(t('Validations:Required')).nullable(),
    subjectName: Yup.string().required(t('Validations:Required')).nullable(),
    sectionNames: Yup.array().required(t('Validations:Minimum_one_section_has_to_be_selected')),
  });

  const updateGeneralSchema = Yup.object().shape({
    forumName: Yup.string().required(t('Validations:ForumName_ShouldNotBe_Empty')).max(255, t('messages:Max_char', { numberOfChars: 255 })),
    descriptionDetail: Yup.string().required(t('Validations:Required')),
    // assessmentInstructions: Yup.string().required(t('Validations:Required')),
  });

  const ForumSchema = Yup.object({
    // availabilityFrom: Yup.string().required(t('Validations:Required')),
    availabilityTill: Yup.string().required(t('Validations:Required')),

    forumType: Yup.string().required(t('Validations:Required')),

    maxattachments: Yup.number().required(t('Validations:Required')),

    forcesubscribe: Yup.number().required(t('Validations:Required')),
    trackingtype: Yup.number().required(t('Validations:Required')),

    lockdiscussionafter: Yup.number().required(t('Validations:Required')),

    blockperiod: Yup.number().required(t('Validations:Required')),
    blockafter: Yup.number().when('blockperiod', {
      is: (blockperiod) => blockperiod !== 0,
      then: Yup.number().required(t('Validations:Required'))
    }),
    warnafter: Yup.number().when('blockperiod', {
      is: (blockperiod) => blockperiod !== 0,
      then: Yup.number().required(t('Validations:Required'))
    }),
  });

  const getValidation = () => {
    switch (activeStep) {
      case 0:
        return operation?.toLowerCase() === 'create'
          ? GeneralSchema
          : updateGeneralSchema;
      case 1:
        return ForumSchema;
      default:
        null;
    }
  };

  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      //general page
      urlForumId: urlForumId,
      methodType: operation,
      forumName: formData?.forumName || previewData?.name,
      descriptionDetail: formData?.descriptionDetail || previewData?.intro,
      displayDescription: previewData?.showdescription == "0" ? false : previewData?.showdescription == "1" ? true : displayDescription,
      className: formData?.className || classesArray[0],
      sectionNames: formData?.sectionNames || [],
      sectionNameWithIds: formData?.sectionNameWithIds || [],
      subjectName: formData?.subjectName || '',
      classesArray: formData?.classesArray || classesArray,
      courses: courses,
      loading: loading,
      availabilityTill: (previewData?.duedate &&
        moment.unix(previewData?.duedate).format('YYYY-MM-DDTHH:mm')) ||
        moment(new Date()).add(7, 'days').format('YYYY-MM-DDTHH:mm'),
      forumType: previewData?.type || 'general',
      maxattachments: Number(previewData?.maxattachments) || 1,
      forcesubscribe: Number(previewData?.forcesubscribe) || 0,
      trackingtype: Number(previewData?.trackingtype) || 1,
      lockdiscussionafter: Number(previewData?.lockdiscussionafter) || 0,
      blockperiod: Number(previewData?.blockperiod) || 0,
      blockafter: Number(previewData?.blockafter) || 0,
      warnafter: Number(previewData?.warnafter) || 0,
      operation: operation,
      activeStep: activeStep,
      showBlocksField: Number(previewData?.blockperiod) == 0 ? false : true || false,
      setActiveStep: setActiveStep,
      forumOperationComplete: forumOperationComplete,
      setForumOperationComplete: setForumOperationComplete,
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
          handleForumSubmit(allValues);
          break;

        default:
          break;
      }
    },
    payloadData: payloadData,
    setFormData: setFormData,
    formData: formData,
    operation: operation,
  })(CreateUpdateForumUI);

  return <FormikForm {...props} />;
};
