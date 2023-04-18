import React, { useContext, useState } from 'react';
import { Box, useTheme, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withFormik } from 'formik';
import { getCourses, getStudentListDetails, createResourceAPI, getResource, updateResource, createURLResource, getURLResource, updateURLResource } from '../../../../../utils/ApiService';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
// import { KEY_USER } from '../../../utils/constants';
import KenDialog from '../../../../../components/KenDialogBox/index';
import { useTranslation } from 'react-i18next';
import Context from '../../../../../utils/helpers/context';
import moment from 'moment';
import AddResource from './Components/AddResource';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FiCheck } from 'react-icons/fi';
import Routes from '../../../../../utils/routes.json';

export default function AddResources(props) {
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

const ResourceDetails = props => {
    const theme = useTheme();
    const classes = useStyles();
    const { values, setFieldValue, handleSubmit, classData, touched, errors, handleChange, setFieldTouched, handleBack, activeStep, } = props;
    const [openDialog, setOpenDialog] = React.useState(values.addResourceRes.open)
    const phone = useMediaQuery(theme.breakpoints.only('xs'));
    const handleCancel = () => { history.push(`/${Routes.acadamicContent}`); };

    return (
        <Box>
            <Grid xs={12} sm={12}>

                <AddResource {...props}
                    setFieldValue={setFieldValue}
                    orientation={phone ? 'horizontal' : 'vertical'}
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                    classData={classData}
                 />
                <KenDialog
                    open={openDialog}
                    onClose={() => { values.setAddResourceRes({ open: false }) }}
                    handleClose={() => {
                        values.setAddResourceRes({ open: false })
                        props.history.push({
                            pathname: Routes.acadamicContent,
                            classData: classData,
                            restrictReload: true
                        })
                    }}
                    disabledOk={values.addResourceRes.progress < 100 ? true : false}
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
                                            bar: values.addResourceRes.status !== "error" ? classes.bar : classes.errorBar
                                        }}
                                        value={values.addResourceRes.progress}
                                    />
                                </Box>
                                <Box>
                                    <Grid item>
                                        <Typography style={{ float: 'left', color: values.addResourceRes.status !== "error" ? '#52C15A' : '#ff0000' }}>
                                            {values.addResourceRes.message}
                                        </Typography>
                                        {values.addResourceRes.progress == 100 && <div>
                                            <span className={classes.uploadSuccess}>
                                                <FiCheck strokeWidth={'2px'} fontSize={18} /></span>
                                        </div>
                                        }
                                    </Grid>
                                </Box>
                            </Box>
                            {/* <Grid item><Typography>{values.addResourceRes.message}</Typography></Grid> */}
                        </Grid>
                    </Grid>
                </KenDialog>
            </Grid>
        </Box >
    );
};

const FormikHoc = props => {
    // const { handleFormSubmit } = props;
    console.log('selected section info', props?.history?.location?.state?.sectionDataSend)
    const { handleSnackbarOpen } = useContext(Context);
    const [course, setCourse] = useState();
    const [loading, setLoading] = React.useState(false);
    const [courses, setCourses] = useState([]);
    const [classesArray, setClassesArray] = React.useState([]);
    const { t } = useTranslation();
    const [students, setStudents] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState();
    const [resourceType, setResourceType] = React.useState(props?.history?.location?.state?.resourceType || 'Presentation')
    const [defaultSectionData, setDefaultSectionData] = React.useState(props?.history?.location?.state?.sectionDataSend)
    const [allowedFilesTypes, setAllowedFilesTypes] = React.useState(props?.history?.location?.state?.allowedFilesTypes)
    const [resourceId, setResourceId] = React.useState(props?.history?.location?.state?.resourceId)
    const [mode, setMode] = React.useState(props?.history?.location?.state?.mode || 'create')
    const [showDescription, setShowDescription] = React.useState(false);
    const [operation, setOperation] = React.useState('create')
    const [previewData, setPreviewData] = React.useState({})
    const profile = getUserDetails().ContactId;

    const [addResourceRes, setAddResourceRes] = React.useState({ open: false, message: "", progress: 5 })

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

    // _______________________***********************____________________
    //Get Base64 from file url
    const getBase64String = async (url) => {
        const data = await Buffer.from((await axios.get(url, {
            responseType: "arraybuffer"
        })).data, "utf-8").toString("base64");
        return data
    };

    React.useEffect(() => {
        if (mode == 'edit') {
            //OTHER Resource types (except URL type)
            if (resourceType !== "URL") {
                const payload = {
                    method: 'post',
                    cmid: resourceId
                }
                getResource(payload)
                    .then(async res => {
                        if (res.length > 0) {
                            let url = String(res[0]?.contents[0]?.fileurl).split('?')
                            let previewType = String(res[0].contents[0].filename).split('.')[1]
                            let token = localStorage.getItem('fileToken')
                            let prevUrl = ''
                            if (previewType == "ppt" || previewType == "pptx") {
                                prevUrl = url[0] + `?token=${token}`
                            }
                            else {
                                prevUrl = res[0]?.contents[0]?.fileurl + `&token=${token}`
                            }
                            let filebase64 = await getBase64String(prevUrl)
                            console.log(filebase64)

                            let resourceData = {
                                ...res[0],
                                resourceName: res[0]?.name,
                                resourceDescription: res[0]?.description,
                                resourceType: resourceType,
                                showDescription: true,
                                fileName: res[0]?.contents[0]?.filename,
                                fileSize: res[0]?.contents[0]?.filesize,
                                fileContent: String(filebase64),
                                fileurl: res[0]?.contents[0]?.fileurl
                            }
                            setPreviewData(resourceData)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
            else {
                //Call get_url api 
                const payload = {
                    method: 'post',
                    cmid: resourceId
                }
                getURLResource(payload)
                    .then(async res => {
                        if (res) {
                            let resourceData = {
                                resourceName: res?.name,
                                resourceDescription: res?.intro,
                                resourceType: resourceType,
                                showDescription: true,
                                externalUrl: res?.externalurl,
                                ...res
                            }
                            setPreviewData(resourceData)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }
    }, [])

    const handleResourceSubmit = (allData) => {
        if (allData.resourceType !== "URL") {
            if (allData.fileContent.length !== 0 && allData.fileName.length !== 0 && allData.resourceFileDropped) {
                if (allData.mode !== 'edit') {
                    setAddResourceRes({
                        open: true,
                        progress: 40,
                        status: 'success',
                        message: 'Adding the resource...! Please wait..!'
                    })
                    const payload = {
                        method: "post",
                        name: String(allData.resourceName),
                        description: String(allData.resourceDescription),
                        filename: String(allData.fileName),
                        filecontent: String(allData.fileContent),
                        courseofferingid: String(allData.courseofferingId),
                    };
                    createResourceAPI(payload)
                        .then(res => {
                            console.log('res', res);
                            if (!res.hasOwnProperty('errorcode')) {
                                setAddResourceRes({
                                    open: true,
                                    status: 'success',
                                    progress: 100,
                                    message: 'Resource added successfully'
                                })
                            }
                            else {
                                setAddResourceRes({
                                    open: true,
                                    progress: 100,
                                    status: 'error',
                                    message: 'Something went wrong..!'
                                })
                            }
                        })
                        .catch(err => {
                            setAddResourceRes({
                                open: true,
                                progress: 100,
                                status: 'error',
                                message: 'Something went wrong..!'
                            })
                            console.log('error', err);
                        });
                }
                else {
                    setAddResourceRes({
                        open: true,
                        progress: 40,
                        status: 'success',
                        message: 'Updating the resource...! Please wait..!'
                    })
                    const payload = {
                        method: "post",
                        name: String(allData.resourceName),
                        showdescription: 1,
                        cmid: Number(allData.resourceId),
                        description: String(allData.resourceDescription),
                        filename: String(allData.fileName),
                        filecontent: String(allData.fileContent),
                        visible: Number(allData.visible),
                        // courseofferingid: String(allData.sectionNameWithIds[0].value),
                    };
                    updateResource(payload)
                        .then(res => {
                            console.log('res', res);
                            if (!res.hasOwnProperty('errorcode')) {
                                setAddResourceRes({
                                    open: true,
                                    status: 'success',
                                    progress: 100,
                                    message: 'Resource has been updated successfully'
                                })
                            }
                            else {
                                setAddResourceRes({
                                    open: true,
                                    progress: 100,
                                    status: 'error',
                                    message: 'Something went wrong..!'
                                })
                            }
                        })
                        .catch(err => {
                            setAddResourceRes({
                                open: true,
                                progress: 100,
                                status: 'error',
                                message: 'Updating Resource is failed..! Please try again.'
                            })
                            console.log('error', err);
                        });
                }
            }
            else if (!String(allData.fileName).toLowerCase().includes(allData.resourceType)) {
                setAddResourceRes({
                    open: true,
                    progress: 100,
                    status: 'error',
                    message: 'Unsupported file is attached..!'
                })
            }
            else {
                alert('Resource file should be attached...!')
            }
        }
        else {
            if (allData.mode !== 'edit') {
                setAddResourceRes({
                    open: true,
                    progress: 40,
                    status: 'success',
                    message: 'Adding the resource...! Please wait..!'
                })
                const payload = {
                    method: "post",
                    name: String(allData.resourceName),
                    intro: String(allData.resourceDescription),
                    externalurl: String(allData.externalUrl),
                    courseoffering: String(allData.courseofferingId),
                    showdescription: 1,
                    display: 1,
                    visible: 0,
                    visibleoncoursepage: 1
                };
                createURLResource(payload)
                    .then(res => {
                        console.log('res', res);
                        if (!res.hasOwnProperty('errorcode')) {
                            setAddResourceRes({
                                open: true,
                                status: 'success',
                                progress: 100,
                                message: 'URL Resource added successfully'
                            })
                        }
                        else {
                            setAddResourceRes({
                                open: true,
                                progress: 100,
                                status: 'error',
                                message: 'Something went wrong..!'
                            })
                        }
                    })
                    .catch(err => {
                        setAddResourceRes({
                            open: true,
                            progress: 100,
                            status: 'error',
                            message: 'Something went wrong..!'
                        })
                        console.log('error', err);
                    });
            }
            else {
                setAddResourceRes({
                    open: true,
                    progress: 40,
                    status: 'success',
                    message: 'Updating the URL resource...! Please wait..!'
                })
                const payload = {
                    method: "post",
                    name: String(allData.resourceName),
                    intro: String(allData.resourceDescription),
                    externalurl: String(allData.externalUrl),
                    cmid: Number(allData.resourceId),
                    showdescription: 1,
                    display: 1,
                    visible: Number(allData.visible),
                    visibleoncoursepage: 1
                    // courseofferingid: String(allData.sectionNameWithIds[0].value),
                };
                updateURLResource(payload)
                    .then(res => {
                        console.log('res', res);
                        if (!res.hasOwnProperty('errorcode')) {
                            setAddResourceRes({
                                open: true,
                                status: 'success',
                                progress: 100,
                                message: 'URL Resource has been updated successfully'
                            })
                        }
                        else {
                            setAddResourceRes({
                                open: true,
                                progress: 100,
                                status: 'error',
                                message: 'Something went wrong..!'
                            })
                        }
                    })
                    .catch(err => {
                        setAddResourceRes({
                            open: true,
                            progress: 100,
                            status: 'error',
                            message: 'Updating URL Resource is failed..! Please try again.'
                        })
                        console.log('error', err);
                    });
            }
        }
    };

    const urlRegMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

    const ResourceSchema = Yup.object().shape({
        resourceName: Yup.string().required(t('Validations:ResourceName_ShouldNotBe_Empty'))
            .max(255, t('messages:Max_char', { numberOfChars: 255 })),
        resourceDescription: Yup.string().required(t('Validations:Required')),
        className: Yup.string().required(t('Validations:Required')).nullable(),
        // displayDescription: Yup.boolean().required(t('Validations:Required')),
        subjectName: Yup.string().required(t('Validations:Required')).nullable(),
        sectionNames: Yup.array().required(t('Validations:Minimum_one_section_has_to_be_selected')),
        // fileName: Yup.string().required(t('Validations:Required')).nullable(),
        // fileContent: Yup.string().required(t('Validations:Required')).nullable(),
        fileContent: Yup.string().when('resourceType', {
            is: (resourceType) => resourceType !== 'URL',
            then: Yup.string().required(t('Validations:Required')).nullable()
        }),
        fileName: Yup.string().when('resourceType', {
            is: (resourceType) => resourceType !== 'URL',
            then: Yup.string().required(t('Validations:Required')).nullable()
        }),
        externalUrl: Yup.string().when('resourceType', {
            is: 'URL',
            then: Yup.string().required('Url is required')
            // then: Yup.string().matches(urlRegMatch, 'Enter valid URL(s)').required('Url is required')
        }),
    });


    const getValidation = () => {
        switch (activeStep) {
            case 0:
                return ResourceSchema;
            default:
                null;
        }
    };


    const FormikForm = withFormik({
        mapPropsToValues: () => ({
            operation: operation,
            mode: mode,
            courseofferingId: defaultSectionData?.CourseOfferingID,
            allowedFilesTypes: allowedFilesTypes,
            resourceName: previewData?.resourceName || '',
            resourceFileDropped: previewData?.fileName?.length > 0 || false,
            resourceId: resourceId,
            visible: previewData?.visible || 0,
            resourceDescription: previewData?.resourceDescription || '',
            resourceType: resourceType,
            showDescription: previewData?.showDescription || showDescription,
            className: classesArray[0],
            sectionNames: [],
            sectionNameWithIds: [],
            subjectName: '',
            classesArray: classesArray,
            courses: courses,
            loading: loading,
            fileName: previewData?.fileName || '',
            fileSize: previewData?.fileSize || '',
            fileContent: previewData?.fileContent || '',
            fileurl: previewData?.fileurl || '',
            externalUrl: previewData?.externalUrl || '',
            formData: formData,
            setFormData: setFormData,
            addResourceRes: addResourceRes,
            setAddResourceRes: setAddResourceRes
        }),

        validationSchema: getValidation,

        handleSubmit: (values) => {
            let allValues = values
            switch (values?.operation) {
                // case 'previous':
                //     setFormData({ ...formData, ...values });
                //     values.setActiveStep(prevActiveStep => {
                //         return prevActiveStep - 1;
                //     });
                //     break;

                // case 'next':
                //     setFormData({ ...formData, ...values });
                //     values.setActiveStep(prevActiveStep => {
                //         return prevActiveStep + 1;
                //     });
                //     break;

                case 'submit':
                    setFormData({ ...formData, ...values, });
                    handleResourceSubmit(allValues);
                    break;

                default:
                    break;
            }
        },
        setFormData: setFormData,
        formData: formData,
    })(ResourceDetails);

    return <FormikForm {...props} classData={defaultSectionData} />;
};

