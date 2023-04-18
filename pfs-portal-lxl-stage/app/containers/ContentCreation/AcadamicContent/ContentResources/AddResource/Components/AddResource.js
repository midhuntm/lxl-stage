import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid, Box, Paper, Card, CardContent } from '@material-ui/core';
import { FiArrowUp, FiUpload } from 'react-icons/fi';
import KenHeader from '../../../../../../global_components/KenHeader/index';
import KenButton from '../../../../../../global_components/KenButton/index';
import KenIcon from '../../../../../../global_components/KenIcon/index';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import KenDialog from '../../../../../../components/KenDialogBox/index';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import EmptyResources from '../../../../../../assets/EmptyResources.svg';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KenSelect from '../../../../../../components/KenSelect';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import KenInputField from '../../../../../../components/KenInputField';
import KenCheckBox from '../../../../../../global_components/KenCheckbox/index';
import KenEditor from '../../../../../../global_components/KenEditor';
import Routes from '../../../../../../utils/routes.json';
import StatusErrorIcon from '../../../../../../assets/StatusErrorIcon.svg';

const uniqueArrayObjects = (array, key) => {
    return array.reduce(function (previous, current) {
        if (
            !previous.find(function (prevItem) {
                if (key) {
                    return prevItem[key] === current[key];
                } else {
                    return prevItem === current;
                }
            })
        ) {
            previous.push(current);
        }
        return previous;
    }, []);
};
import KenMultiSelect from '../../../../../../global_components/KenMultiSelect';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    stepContainer: {
        position: 'relative',
        '& .active-assessment-tab': {
            '& span': {
                color: theme.palette.KenColors.neutral900,
                fontWeight: 600,
            },
        },
    },
    actionsContainer: {
        // marginBottom: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
            display: 'none',
            background: theme.palette.KenColors.KenWhite,
        },
    },
    cardDesign: {
        // background: '#FAFBFC',
        // border: '1px  #DFE1E6',
        // borderRadius: '3px',
        // padding: '15px 20px',
        // marginTop: '8px',
    },
    listPresentation: {
        fontFamily: "'Open Sans'",
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '150%',
        color: '#061938',
    },
    Details: {
        fontFamily: "'Open Sans'",
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '120%',
        color: '#00218D',
    },
    Check: {
        fontFamily: "'Open Sans'",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '150%',
        color: '#7A869A',
    },
    title2: {
        fontWeight: 600,
        fontSize: 14,
        color: '#061938',
        width: '100%',
        marginLeft: '16px',
    },
    title: {
        paddingLeft: 10
    },
    presentationEmpty: {
        background: '#F6F7FA',
        borderRadius: 3,
        width: 'calc(100% - 40px)',
        margin: 20,
        height: 350,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listPresent: {
        textAlign: 'center',
        fontSize: 14,
        color: '#7A869A',
    },
    button: {
        marginRight: 10
    },
    presentationDetails: {
        padding: 20,
        boxSizing: 'border-box'
    },
    errorText: {
        fontSize: 12,
        color: '#F2564A',
        fontWeight: 600
    },
    dragTextBox: {
        display: 'flex',
        alignItems: 'center',
        textAlign: "left",
        width: '100%',
        paddingLeft: 10
    },
    browseBox: {
        textAlign: 'right',
        width: '30%'
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
        transition: 'border .24s ease-in-out'
    },
    title: {
        fontWeight: 600,
        fontSize: 14,
        color: '#061938',
        width: '100%'
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
        borderRadius: 3
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
        padding: "20px",
        flexFlow: 'wrap',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': { background: '#F1F5FF !important' }

    },
    downloadButton: {
        background: '#092682',
        border: '0.6px solid #092682',
        padding: '8px 12px',
        borderRadius: 3,
        fontSize: 12,
        marginBottom: 20
    },
    removeFileBtn: {
        background: '#FFFFFF',
        border: '1px solid #E3E3E3',
        padding: '8px 12px',
        color: '#EF4060',
        fontWeight: 'bold',
        borderRadius: 3,
        fontSize: 12,
        marginBottom: 20,
        marginRight: 20
    },


    iconCss: {
        fontSize: 18,
        lineHeight: 1,
        paddingRight: 5
    },
    uploadIcon: {
        fontSize: 12,
        lineHeight: 1,
        color: "#997AFF",
        fontWeight: 600
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
        justifyContent: 'center'
    },
    fileName: {
        fontWeight: 600,
        margin: '10px 0px',
        fontSize: 14,
        color: '#505F79'
    },
    fileSize: {
        color: '#A8AFBC',
        fontSize: 14,
        marginLeft: 12,
        fontWeight: 400
    },
    errorText: {
        fontSize: 12,
        color: '#F2564A',
        fontWeight: 600
    },
    typoSupporting: {
        fontSize: '12px',
        // lineHeight: '16px',
        color: theme.palette.KenColors.neutral100,
        marginTop: 4,
    }
}));


function AddResources(props) {
    const { values, handleChange, handleSubmit, setFieldValue, setFieldTouched, errors, touched, classData } = props;

    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles();
    const [openDialogCancel, setOpenDialogCancel] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [sectionsArray, setSectionsArray] = React.useState([]);
    const [sectionsWithIdsArray, setSectionsWithIdsArray] = React.useState([]);
    const [selectedSectionsArray, setSelectedSectionsArray] = React.useState([]);
    const [subjectsArray, setSubjectsArray] = React.useState([]);
    const [uploadYet, setUploadYet] = React.useState(false)
    const [fileName, setFileName] = React.useState('')
    const [allowedFilesTypes, setAllowedFilesTypes] = React.useState(props?.history?.location?.state?.allowedFilesTypes)
    const [fileSize, setFileSize] = React.useState('')
    // const [resourceType, setResourceType] = React.useState(props?.history?.location?.state?.resourceType)
    const [selectedFileBase64, setSelectedFileBase64] = React.useState('')
    const [fileSelected, setFileSelected] = React.useState()
    const [showPreview, setShowPreview] = React.useState(false)
    const [errorTxt, setErrorTxt] = React.useState('')
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false)
    // const [assessmentInstructions, setAssessmentInstructions] = React.useState('');

    // useEffect(() => {
    //     if (values?.mode == 'edit' && values?.fileName?.length > 0) {
    //         setUploadYet(true)
    //         setFieldValue('fileName', values.fileName)
    //         setFileName(values.fileName)
    //     }
    //     else {
    //         if (values?.fileName?.length > 0) {
    //             setUploadYet(true)
    //         }
    //     }
    // }, [])

    const change = (name, e, index) => {
        e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    };
    const onhandleShowDescription = (event) => {
        let value = event.target.checked;
        let name = event.target.name;
        setFieldValue(name, value)
    }
    const compare = (a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }

        // names must be equal
        return 0;
    };

    React.useEffect(() => {
        const currentSectionArray = [];
        const currentSubjectArray = [];
        // setSelectedSectionsArray([]);
        setFieldValue('className', values.className);
        setFieldValue('sectionNames', values.sectionNames);
        values.courses?.map((data, i) => {
            if (data.accountname == values.className) {
                //subjects
                currentSubjectArray.push(data.hed__Course__cName);
                let subSubjectArray = [...new Set(currentSubjectArray)];
                // let subSubjectArray = uniqueArrayObjects(currentSubjectArray, 'label');
                subSubjectArray.sort(compare);
                setSubjectsArray(subSubjectArray);
            } else {
                return null;
            }
        });
    }, [values.className]);

    React.useEffect(() => {
        const currentSubjectArray = [];
        const myClasses = values.courses?.filter((data, i) => data.accountname == values.className);
        const mySubjects = myClasses?.filter((data, i) => data.hed__Course__cName == values.subjectName);
        // console.log('myClasses', myClasses);
        // console.log('mySubjects', mySubjects);
        const sections = mySubjects?.map(item => { return item.Section; });
        const sectionsWithIds = mySubjects?.map(item => {
            return {
                label: item.Section,
                value: item.CourseOfferingID,
            };
        });
        //subjects
        // currentSubjectArray.push(data.hed__Course__cName);
        // let subSubjectArray = [...new Set(currentSubjectArray)];
        let secArray = uniqueArrayObjects(sections);
        let secIdsArray = uniqueArrayObjects(sectionsWithIds, 'label');
        // subSubjectArray.sort(compare);
        // setSubjectsArray(subSubjectArray);
        // });
        setSectionsArray(secArray);
        setSectionsWithIdsArray(secIdsArray);
    }, [values.subjectName]);

    const handleSectionChange = (e, selectedItems) => {
        // console.log('selectedItems', selectedItems);
        let mySections = [];
        selectedItems?.map(selectedItem => {
            const array = sectionsWithIdsArray?.filter(
                item => item.label === selectedItem
            );
            if (array?.length > 0) {
                mySections = [...mySections, ...array];
            }
        });
        console.log('mySections', mySections);
        setSelectedSectionsArray(selectedItems);
        setSectionsWithIdsArray(mySections);
    };

    const handleCheck = (e, item) => {
        console.log('check', e.target.checked);
        console.log('item', item);
        return false;
    };

    useEffect(() => {
        console.log('selectedSectionsArray', selectedSectionsArray);
        setFieldValue('sectionNames', selectedSectionsArray);
    }, [selectedSectionsArray]);

    useEffect(() => {
        setFieldValue('sectionNameWithIds', sectionsWithIdsArray);
    }, [sectionsWithIdsArray]);

    useEffect(() => {
        setFieldValue(
            'subjectName',
            subjectsArray?.length > 0 ? subjectsArray[0] : values.subjectName
        );
    }, [subjectsArray]);

    // drag state
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, } = useDropzone();
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    const getFileSize = (bytes) => {
        if (bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
            if (i === 0) return `${bytes} ${sizes[i]})`
            return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
        }
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            let base64 = await toBase64(acceptedFiles[0])
            setUploadYet(true);
            setFileName(acceptedFiles[0].name);
            setFieldValue('fileName', acceptedFiles[0].name)
            // setFileSize(getFileSize(acceptedFiles[0].size));
            setFieldValue('fileSize', acceptedFiles[0].size)
            // setFileSelected(acceptedFiles);
            var base64result = String(base64).split(';base64,')[1];
            setSelectedFileBase64(base64result)
            setFieldValue('fileContent', base64result)
            setFieldValue('resourceFileDropped', true)
        }
        else {
            setOpenErrorDialog(true)
            setFieldValue('resourceFileDropped', false)
            setErrorTxt(`Unsupported File Format. Please upload only ${allowedFilesTypes} format.`)
        }

    };
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

    const commonMethod = (op) => {
        setFieldValue('operation', op);
        handleSubmit();
    }

    const clearFile = () => {
        setUploadYet(false)
        setFieldValue('resourceFileDropped', false)
        setSelectedFileBase64('')
        setFieldValue('fileContent', '')
        setFieldValue('fileName', '')
        setFieldValue('fileSize', '')
    }
    useEffect(() => {
        if (values.mode == "create") {
            setShowPreview(false)
        }
        else if (values.mode == "edit") {
            setShowPreview(true)
            setUploadYet(true)
        }
    }, [])
    return (
        <Box>
            <Grid className={classes.stepContainer}>
                <Grid xs={12} sm={12}>
                    <Box className={classes.header}>
                        <KenHeader title={values.mode == 'create' ? `Add ${values.resourceType}(s)` : `Edit ${values.resourceType}(s)`}>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <KenButton variant="secondary" onClick={() => { setOpenDialogCancel(true); }} buttonClass={classes.button}> {t('labels:Cancel')}</KenButton>
                                    <KenButton variant="primary" color="primary" onClick={() => commonMethod('submit')} buttonClass={classes.button}>{t('labels:Save_Resource(s)')}</KenButton>
                                </div>
                            </div>
                        </KenHeader>
                    </Box>
                    <Paper elevation={0} style={{ marginTop: '16px' }}>
                        <Grid className={classes.root} md={12} sm={12} xs={12} container>

                            {/* <Grid md={5} sm={6} xs={12}>
                                <Grid md={12} sm={12} xs={12} style={{ paddingLeft: 20, paddingTop: 15, height: 55, }}>
                                    <Typography className={classes.listPresentation}>List Of {values.resourceType}</Typography>
                                </Grid>
                                <Divider />
                                <Grid md={12} sm={12} xs={12} className={classes.presentationEmpty}>
                                    <Box className={classes.emptyResBox}>
                                        <img src={EmptyResources} alt="" />
                                        <p className={classes.listPresent}> Files added to this {String(values.resourceType).toLowerCase()} resource will be listed <br />down here.</p>
                                    </Box>
                                </Grid>
                                <Divider />
                            </Grid> */}

                            <Grid md={12} sm={12} xs={12} >
                                <Grid md={12} sm={12} xs={12} style={{ paddingLeft: 20, paddingTop: 15, height: 55, borderLeft: '1px solid #0000001f' }}>
                                    <Typography className={classes.Details}>{values.resourceType} Details</Typography>
                                </Grid>
                                <Divider />
                                <Box className={classes.presentationDetails} style={{ borderLeft: '1px solid #0000001f' }}>
                                    <Grid container spacing={2}>
                                        {classData?.hed__Term__c && <Grid item xs={12} container spacing={2} >
                                            <Grid item xs={12} ><span style={{ fontWeight: 'bold' }}>Term :</span> <span>{classData?.hed__Term__c}</span></Grid>
                                            <Grid item xs={12} ><span style={{ fontWeight: 'bold' }}>Course :</span> <span>{classData?.CourseName}</span></Grid>
                                            <Grid item xs={12} ><span style={{ fontWeight: 'bold' }}>Section :</span> <span>{classData?.Section}</span></Grid>
                                        </Grid>}
                                        <Grid item xs={12}>
                                            <KenInputField
                                                required
                                                label={t('labels:Resource_name')}
                                                placeholder="Enter name"
                                                value={values.resourceName}
                                                name="resourceName"
                                                onChange={change.bind(null, 'resourceName')}
                                                errors={errors?.resourceName}
                                                setFieldTouched={setFieldTouched}
                                                touched={touched?.resourceName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            {/* Normal text area input for assessment description field */}
                                            {/* <KenInputField
                                                label={t('labels:Resource_Descriptions')}
                                                multiline
                                                required
                                                rows={5}
                                                value={values.resourceDescription}
                                                setFieldTouched={setFieldTouched}
                                                name="resourceDescription"
                                                onChange={change.bind(null, 'resourceDescription')}
                                                errors={errors?.resourceDescription}
                                                touched={touched?.resourceDescription}
                                            /> */}
                                            <KenEditor
                                                label={t('labels:Resource_Descriptions')}
                                                required
                                                value={values.resourceDescription}
                                                errors={errors?.resourceDescription}
                                                touched={touched?.resourceDescription}
                                                content={values.resourceDescription}
                                                setFieldTouched={setFieldTouched}
                                                handleChange={e => {
                                                    setFieldValue('resourceDescription', e);
                                                    setFieldTouched('resourceDescription', true);
                                                }}
                                            // disabled={values.mode == "create" ? false : true}
                                            />
                                        </Grid>
                                        {/* <Grid md={12} item >
                                            <KenCheckBox
                                                label={t('labels:Display_Description_On_Course_Page')}
                                                value={values.showDescription}
                                                name="showDescription"
                                                onChange={onhandleShowDescription}
                                            />
                                        </Grid> */}

                                        {/* <Grid item xs={12} sm={12} md={4}>
                                            <KenSelect
                                                onChange={e => { setFieldValue('className', e.target.value); }}
                                                value={values.className}
                                                required={true}
                                                setFieldTouched={setFieldTouched}
                                                label={t('labels:Select_class')}
                                                options={values?.classesArray?.sort(compare)}
                                                name="className"
                                                variant="outline"
                                                errors={errors?.className}
                                                touched={touched?.className}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4}>
                                            <KenSelect
                                                onChange={event => {
                                                    console.log('e.target.value', event.target.value);
                                                    setFieldValue('subjectName', event.target.value);
                                                }}
                                                name="subjectName"
                                                value={values.subjectName}
                                                label={t('labels:Select_subject')}
                                                options={subjectsArray}
                                                setFieldTouched={setFieldTouched}
                                                // required={true}
                                                variant="outline"
                                                errors={errors?.subjectName}
                                                touched={touched?.subjectName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <KenMultiSelect
                                                onChange={handleSectionChange}
                                                selectAll={true}
                                                checkMarks={true}
                                                setFieldTouched={setFieldTouched}
                                                name="sectionNames"
                                                value={values.sectionNames}
                                                label={t('labels:Select_section')}
                                                options={sectionsArray}
                                                // required={true}
                                                variant="outline"
                                                errors={errors?.sectionNames}
                                                touched={touched?.sectionNames}
                                            />
                                        </Grid> */}
                                    </Grid>
                                    {values.resourceType !== 'URL' ?
                                        (values.mode == "create" && uploadYet && !showPreview ?
                                            <React.Fragment>
                                                <Typography style={{ fontSize: '12px', textAlign: 'left', marginTop: 16 }}><span style={{ color: "#B92500" }}>*</span>{t('labels:Select_Files')}</Typography>
                                                <Grid item md={12} sm={12} xs={12} style={{ marginTop: 16, marginBottom: 16, width: '100%', border: '1px solid #ccc', padding: 15, borderRadius: 3 }} container spacing={1} >
                                                    <Grid items md={11}>
                                                        <Typography style={{ fontSize: 15, margin: -7, marginBottom: 12 }}>
                                                            <span style={{ fontWeight: 600, fontSize: 16, marginLeft: -5, color: '#061938' }}>
                                                                &nbsp;&nbsp; {values.fileName}
                                                            </span>
                                                        </Typography>
                                                        <Typography style={{ marginTop: 3, fontSize: '10px', color: "#7A869A" }} variant="subtitle2">{getFileSize(values.fileSize)}</Typography>
                                                    </Grid>
                                                    <Grid item md={1} style={{ cursor: 'pointer', textAlign: 'right' }} onClick={clearFile}><CloseIcon style={{ width: 14, height: 14, color: "#505F79" }} /></Grid>
                                                </Grid>
                                            </React.Fragment>
                                            :
                                            values.mode == "edit" && showPreview && uploadYet ?
                                                <React.Fragment>
                                                    <Typography style={{ fontSize: '12px', textAlign: 'left', marginTop: 16 }}><span style={{ color: "#B92500" }}>*</span>{t('labels:Select_Files')}</Typography>
                                                    <Grid item md={12} sm={12} xs={12} style={{ marginTop: 16, marginBottom: 16, width: '100%', border: '1px solid #ccc', padding: 15, borderRadius: 3 }} container spacing={1} >
                                                        <Grid items md={11}>
                                                            <Typography style={{ fontSize: 15, margin: -7, marginBottom: 12 }}>
                                                                <span style={{ fontWeight: 600, fontSize: 16, marginLeft: -5, color: '#061938' }}>
                                                                    &nbsp;&nbsp; {values.fileName}
                                                                </span>
                                                            </Typography>
                                                            <Typography style={{ marginTop: 3, fontSize: '10px', color: "#7A869A" }} variant="subtitle2">{getFileSize(values.fileSize)}</Typography>
                                                        </Grid>
                                                        <Grid item md={1} style={{ cursor: 'pointer', textAlign: 'right' }} onClick={clearFile}><CloseIcon style={{ width: 14, height: 14, color: "#505F79" }} /></Grid>
                                                    </Grid>
                                                </React.Fragment>
                                                :
                                                <Grid items md={12} style={{ height: '100%', marginTop: 16 }}>
                                                    <Typography style={{ fontSize: '12px', textAlign: 'left', marginBottom: 10 }}><span style={{ color: "#B92500" }}>*</span>{t('labels:Select_Files')}</Typography>
                                                    <div className={classes.dragDrop}>
                                                        <Dropzone onDrop={onDrop} accept={allowedFilesTypes} maxFiles={1}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps({ style })} className={classes.dragField}>
                                                                    <input {...getInputProps()} />
                                                                    <div className={classes.uploadWrapper} title={"Upload File"}><span className={classes.uploadIcon}><FiUpload style={{ strokeWidth: '2px', fontSize: 18 }} /></span></div>
                                                                    <p className={classes.title}>Drag & Drop file to upload or</p>
                                                                    <Button className={classes.browseButton} variant="outlined" color="secondary"><span className={classes.iconCss}><FiArrowUp /></span> Browse File</Button>
                                                                    <p className={classes.supportText}>Supported Format {allowedFilesTypes}</p>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </div>

                                                    {errors.fileName &&
                                                        <Typography className={classes.typoSupporting} align="left">
                                                            <span style={{ color: '#B92500' }}>
                                                                <img src={StatusErrorIcon} alt="Error" /> Resource file should be uploaded </span>
                                                        </Typography>}
                                                </Grid>
                                        ) : (
                                            <React.Fragment>
                                                <Grid item xs={12} sm={12} md={12} style={{ marginTop: 16 }}>
                                                    {/* <KenEditor
                                                        // label={t('labels:Assessments_Descriptions')}
                                                        label={"External Url"}
                                                        value={values.externalUrl}
                                                        errors={errors?.externalUrl}
                                                        touched={touched?.externalUrl}
                                                        content={values.externalUrl}
                                                        setFieldTouched={setFieldTouched}
                                                        handleChange={e => {
                                                            setFieldValue('externalUrl', e);
                                                            setFieldTouched('externalUrl', true);
                                                        }}
                                                        disabled={values.mode == "create" ? false : true}
                                                    /> */}
                                                    <KenInputField
                                                        // label={t('labels:Resource_Descriptions')}
                                                        // multiline
                                                        label={"External Url"}
                                                        required
                                                        rows={5}
                                                        value={values.externalUrl}
                                                        setFieldTouched={setFieldTouched}
                                                        name="externalUrl"
                                                        onChange={change.bind(null, 'externalUrl')}
                                                        errors={errors?.externalUrl}
                                                        touched={touched?.externalUrl}
                                                    />
                                                </Grid>

                                            </React.Fragment>
                                        )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid >

                <KenDialog
                    open={openDialogCancel}
                    onClose={() => {
                        setOpenDialogCancel(false);
                        props.history.push({
                            pathname: Routes.acadamicContent,
                            classData: classData,
                            restrictReload: true
                        });
                    }}
                    handleClose={() => {
                        props.history.push({
                            pathname: Routes.acadamicContent,
                            classData: classData,
                            restrictReload: true
                        });
                    }}
                    handleCancel={() => { setOpenDialogCancel(false) }}
                    maxWidth="xs"
                    styleOverrides={{ dialogPaper: classes.dialogPaper }}
                >
                    <Grid container>
                        <Grid item container direction="row" alignItems="center">
                            <Grid item>
                                <Typography className={classes.dialogAgree}>
                                    Are you sure you want to Cancel ?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </KenDialog>
                <KenDialog
                    open={openErrorDialog}
                    // onClose={() => { setOpenErrorDialog(false) }}
                    handleClose={() => { setOpenErrorDialog(false) }}
                    // handleCancel={() => { setOpenErrorDialog(false) }}
                    maxWidth="xs"
                    styleOverrides={{ dialogPaper: classes.dialogPaper }}
                >
                    <Grid container>
                        <Grid item container direction="row" alignItems="center">
                            <Grid item>
                                <Typography className={classes.dialogAgree}>
                                    <h4 style={{ marginBottom: 10 }}>An Error occurred</h4>
                                    {errorTxt}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </KenDialog>
            </Grid >
        </Box >
    )
}

export default withRouter(AddResources);