import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Paper, Card, CardContent } from '@material-ui/core';
import KenInputField from '../../../../components/KenInputField/index';
import KenToggleButton from '../../../../global_components/KenToggleButton/index';
import KenCheckBox from '../../../../global_components/KenCheckbox/index';
import KenLoader from '../../../../components/KenLoader';
import { useTranslation } from 'react-i18next';
import KenSelect from '../../../../components/KenSelect';
import KenEditor from '../../../../global_components/KenEditor';
import Typography from '@material-ui/core/Typography';
import KenDialog from '../../../../components/KenDialogBox/index';

import KenMultiSelect from '../../../../global_components/KenMultiSelect';
import { uniqueArrayObjects } from '../../../Assessment/QuestionPage/Components/QuestionTypes/Utils';
import { FiArrowUp, FiUpload } from 'react-icons/fi';
import CloseIcon from '@material-ui/icons/Close';
import { Button,  } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
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
  }
}));

export default function General(props) {
  const {
    values,
    setValues,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
    operation,
  } = props;

  const { t } = useTranslation();
  const [sectionsArray, setSectionsArray] = React.useState([]);
  const [sectionsWithIdsArray, setSectionsWithIdsArray] = React.useState(props?.values?.formData?.sectionsWithIdsArray || []);
  const [selectedSectionsArray, setSelectedSectionsArray] = React.useState(props?.values?.formData?.sectionNames || []);
  const [subjectsArray, setSubjectsArray] = React.useState(props?.values?.formData?.subjectName ? [props?.values?.formData?.subjectName] : []);
  // const [assessmentInstructions, setAssessmentInstructions] = React.useState('');
  const classes = useStyles();

  const [uploadYet, setUploadYet] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [selectedFileBase64, setSelectedFileBase64] = React.useState('')
  const [allowedFilesTypes, setAllowedFilesTypes] = React.useState()
  const [errorTxt, setErrorTxt] = React.useState('')
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false)

  const change = (name, e, index) => {
    e.persist();
    handleChange(e);
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true, false);

    if (name == 'displayDescription') {
      setFieldValue('displayDescription', e.target.checked);
    }
    else if (name == 'enableAdditionalFile') {
      setFieldValue('enableAdditionalFile', e.target.checked);
    }
  };

  useEffect(() => {
    if (values?.operation == 'edit' && values?.introattachments?.length > 0) {
      setFieldValue('enableAdditionalFile', true)
      setUploadYet(true)
      setFieldValue('additionalFileName', values.additionalFileName)
      setFileName(values.additionalFileName)
    }
    else {
      if (values?.additionalFileName?.length > 0) {
        setUploadYet(true)
      }
    }
  }, [])

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
    const myClasses = values.courses?.filter(
      (data, i) => data.accountname == values.className
    );
    const mySubjects = myClasses?.filter(
      (data, i) => data.hed__Course__cName == values.subjectName
    );
    // console.log('myClasses', myClasses);
    // console.log('mySubjects', mySubjects);
    const sections = mySubjects?.map(item => {
      return item.Section;
    });
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
    if (!props?.values?.formData?.sectionNames) {
      setFieldValue('sectionNames', selectedSectionsArray);
    }
  }, [selectedSectionsArray]);

  useEffect(() => {
    setFieldValue('sectionNameWithIds', sectionsWithIdsArray);
  }, [sectionsWithIdsArray]);

  useEffect(() => {
    if (!props?.values?.formData?.subjectName) {
      setFieldValue('subjectName', subjectsArray?.length > 0 ? subjectsArray[0] : values.subjectName);
    }
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

      setFieldValue('additionalFileName', acceptedFiles[0].name)
      setFieldValue('fileSize', acceptedFiles[0].size)
      var base64result = String(base64).split(';base64,')[1];
      setSelectedFileBase64(base64result)
      console.log('base64 data', base64result)
      setFieldValue('additionalFileBase64Data', base64result)
      setFieldValue('additionalFileDropped', true)
    }
    // else {
    //   setOpenErrorDialog(true)
    //   setErrorTxt(`Unsupported File Format. Please upload only ${allowedFilesTypes} format.`)
    // }

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

  const clearFile = () => {
    setUploadYet(false)
    setSelectedFileBase64('')
    setFieldValue('additionalFileBase64Data', '')
    setFieldValue('additionalFileName', '')
    setFieldValue('fileSize', '')
    setFieldValue('additionalFileDropped', false)
  }

  return (
    <form onSubmit={values.handleChange}>
      <Grid container spacing={2}>
        {values.loading && <KenLoader />}
        <Grid item xs={12}>
          <KenInputField
            required
            label={t('labels:Assignment_Name')}
            placeholder="Enter assignment name"
            value={values.assignmentName}
            name="assignmentName"
            onChange={change.bind(null, 'assignmentName')}
            errors={errors?.assignmentName}
            setFieldTouched={setFieldTouched}
            touched={touched?.assignmentName}
          />
        </Grid>

        <>
          {operation?.toLowerCase() === 'create' && (
            <>
              <Grid item xs={12} sm={12} md={4}>
                <KenSelect
                  onChange={e => {
                    setFieldValue('className', e.target.value);
                  }}
                  value={values.className}
                  required={true}
                  setFieldTouched={setFieldTouched}
                  label={t('labels:Select_class')}
                  options={values?.classesArray?.sort(compare)}
                  name="className"
                  // exclusive={true} // we can select only one option
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
                  // required={true}
                  onChange={handleSectionChange}
                  selectAll={true}
                  checkMarks={true}
                  setFieldTouched={setFieldTouched}
                  name="sectionNames"
                  value={values.sectionNames}
                  // value={selectedSectionsArray}
                  // label="Select section"
                  label={t('labels:Select_section')}
                  options={sectionsArray}
                  // required={true}
                  variant="outline"
                  errors={errors?.sectionNames}
                  touched={touched?.sectionNames}
                />
              </Grid>
            </>
          )}
        </>

        <Grid item xs={12} sm={12} md={12}>
          <KenEditor
            // label={t('labels:Assessments_Descriptions')}
            label={t('labels:Descriptions')}
            required={true}
            // label={t('labels:Assignment_Instructions')}
            value={values.descriptionDetail}
            errors={errors?.descriptionDetail}
            touched={touched?.descriptionDetail}
            content={values.descriptionDetail}
            setFieldTouched={setFieldTouched}
            handleChange={e => {
              setFieldValue('descriptionDetail', e);
              setFieldTouched('descriptionDetail', true);
            }}
          />
          {/* <Grid md={6} item>
            <KenCheckBox
              label={t('labels:Display_Instructions_On_Course_Page')}
              value={values.displayDescription}
              name="displayDescription"
              onChange={change.bind(null, 'displayDescription')}
            />
          </Grid> */}
          <Grid md={6} item>
            <KenCheckBox
              label={t('labels:Add_Additional_file')}
              value={values?.enableAdditionalFile}
              name="enableAdditionalFile"
              onChange={change.bind(null, 'enableAdditionalFile')}
            />
          </Grid>
        </Grid>
        {values?.enableAdditionalFile &&
          <Grid item xs={12} sm={12} md={12}>
            {uploadYet ? <React.Fragment>
              <Typography style={{ fontSize: '12px', textAlign: 'left', }}>{t('labels:Additional_files')}</Typography>
              <Grid item md={12} sm={12} xs={12} style={{ marginTop: 16, marginBottom: 16, width: '100%', border: '1px solid #ccc', padding: 15, borderRadius: 3 }} container spacing={1} >
                <Grid items md={11}>
                  <Typography style={{ fontSize: 15, margin: -7, marginBottom: 12 }}>
                    <span style={{ fontWeight: 600, fontSize: 16, marginLeft: -5, color: '#061938' }}>
                      &nbsp;&nbsp; {values?.additionalFileName}
                    </span>
                  </Typography>
                  <Typography style={{ marginTop: 3, fontSize: '10px', color: "#7A869A" }} variant="subtitle2">{getFileSize(values?.fileSize)}</Typography>
                </Grid>
                <Grid item md={1} style={{ cursor: 'pointer', textAlign: 'right' }} onClick={clearFile}><CloseIcon style={{ width: 14, height: 14, color: "#505F79" }} /></Grid>
              </Grid>
            </React.Fragment>
              :
              <Grid items md={12} style={{ height: '100%', }}>
                <Typography style={{ fontSize: '12px', textAlign: 'left', marginBottom: 10 }}>{t('labels:Additional_files')}</Typography>
                <div className={classes.dragDrop}>
                  <Dropzone onDrop={onDrop} accept={allowedFilesTypes} maxFiles={1}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ style })} className={classes.dragField}>
                        <input {...getInputProps()} />
                        <div className={classes.uploadWrapper} title={"Upload File"}><span className={classes.uploadIcon}><FiUpload style={{ strokeWidth: '2px', fontSize: 18 }} /></span></div>
                        <p className={classes.title}>Drag & Drop file to upload or</p>
                        <Button className={classes.browseButton} variant="outlined" color="secondary"><span className={classes.iconCss}><FiArrowUp /></span> Browse File</Button>
                        {/* <p className={classes.supportText}>Supported Format {allowedFilesTypes}</p> */}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </Grid>
            }
          </Grid>
        }
      </Grid>

      <KenDialog
        open={openErrorDialog}
        handleClose={() => { setOpenErrorDialog(false) }}
        maxWidth="xs"
        styleOverrides={{ dialogPaper: classes.dialogPaper }}
      >
        <Grid container>
          <Grid item container direction="row" alignItems="center">
            <Grid item>
              <Typography className={classes.dialogAgree}>
                <h4 style={{ marginBottom: 10 }}>An Error Occurred</h4>
                {errorTxt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </KenDialog>
    </form>
  );
}
