import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FiArrowUp, FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import KenInputField from '../../../../../components/KenInputField';
import KenSelect from '../../../../../components/KenSelect';
import KenButton from '../../../../../global_components/KenButton';
import KenDialog from '../../../../../global_components/KenDialog';
import uploadFileIcon from '../../../../../assets/Images/uploadFile.svg';
import context from '../../../../../utils/helpers/context';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
import KenEditor from '../../../../../global_components/KenEditor';
import PurpleKenChip from '../../../../Assessment/QuestionPage/Components/QuestionTypes/DisplayComponents/PurpleKenChip';
import {
  addForumDiscussion,
  postCoreFileUpload,
} from '../../../../../utils/ApiService';

const useStyles = makeStyles(theme => ({
  heading: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    color: '#00218D',
  },
  boxDesign: {
    height: '100%',
    // display: 'flex',
    // alignItems: 'center',
    padding: '16px',
    background: '#FAFBFC',
    borderRadius: '3px',
    overFlow: 'hidden',
  },
  optionsText: {
    fontSize: 13,
    color: theme.palette.KenColors.neutral400,
  },
  uploadContainer: {
    border: `1px dashed ${theme.palette.KenColors.neutral100}`,
  },
  typoUpload: {
    fontSize: 12,
    color: theme.palette.KenColors.kenBlack,
    marginTop: 24,
    marginBottom: 8,
  },
  typoDrag: {
    fontSize: 14,
    color: theme.palette.KenColors.kenBlack,
    fontWeight: 600,
  },
  typoBrowse: {
    fontSize: 14,
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
  },
  containerBrowse: {
    border: `0.6px solid #B3BAC5`,
  },
  typoImgDes: {
    fontSize: 12,
  },
  dropzone: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  progress: {
    color: theme.palette.KenColors.green,
  },
  deleteIcon: {
    color: theme.palette.KenColors.red,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  innerContainer: {
    background: theme.palette.KenColors.kenWhite,
    width: '100%',
    margin: 0,
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
  dragField: {
    display: 'flex',
    padding: '20px',
    flexFlow: 'wrap',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { background: '#F1F5FF !important' },
  },
  uploadIcon: {
    fontSize: 12,
    lineHeight: 1,
    color: '#997AFF',
    fontWeight: 600,
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
  iconCss: {
    fontSize: 18,
    lineHeight: 1,
    paddingRight: 5,
  },
  fileSize: {
    color: '#A8AFBC',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: 400,
  },
}));
export default function CreateDiscussionDialog(props) {
  return <MyFormFormikHoc {...props} />;
}
const profile = getUserDetails();
const contactId = profile?.ContactId;

const MyCreateDiscussionForm = props => {
  /* formik props */
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleCancel,
    handleSubmit,
    dirty,
  } = props;
  /* props from MyFormFormikHoc*/
  const {
    openDialog,
    handleClose,
    handleClickOpen,
    responseData,
    dataCheck,
    setDataCheck,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [uploading, setUploading] = useState(true);
  const [uploadedFileData, setUploadedFileData] = useState(null);

  /* get courses details */
  //   const [loading, setLoading] = React.useState(false);

  const [courses, setCourses] = useState([]);
  const [classOp, setclassOp] = useState([]);
  const [subjectOp, setSubjectOp] = useState([]);
  const [sectionOp, setSectionOp] = useState([]);
  //   const [terms, setTerms] = useState([]);
  const [selectedClsName, setSelectedClsName] = React.useState(null);
  const [selectedSubName, setSelectedSubName] = React.useState(null);
  const [selectedSecName, setSelectedSecName] = React.useState(null);
  //   const [selectedTerms, setSelectedTerms] = React.useState([]);

  const [fileSubmitted, setFileSubmitted] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [fileSize, setFileSize] = React.useState('');
  const [selectedFileBase64, setSelectedFileBase64] = React.useState('');
  const [fileContent, setFileContent] = React.useState('');
  const [discussionTags, setDiscussionTags] = useState(values.tags);

  useEffect(() => {
    if (responseData?.length > 0) {
      let classOption = [];
      const classNameArray = [
        ...new Set(responseData?.map(item => item.accountname)),
      ];
      classNameArray?.map(item => {
        classOption.push({
          value: item,
          label: item,
        });
      });
      setclassOp(classOption);
      setSelectedClsName(classOption[0].value);
    }
  }, [responseData]);

  useEffect(() => {
    if (selectedClsName !== null) {
      let secOption = [];
      const sectionNameArray = [
        ...new Set(
          responseData?.map(item => {
            if (item?.accountname === selectedClsName) {
              return item?.Section;
            }
          })
        ),
      ];

      sectionNameArray?.map(item => {
        if (item) {
          secOption.push({
            value: item,
            label: item,
          });
        }
      });

      setSectionOp(secOption);
      setSelectedSecName(secOption[0].value);
    }
  }, [selectedClsName]);

  useEffect(() => {
    if (selectedSecName !== null && selectedClsName !== null) {
      let subOption = [];

      const subjectNameArray = [
        ...new Set(
          responseData?.map(item => {
            if (item?.accountname === selectedClsName) {
              if (item?.Section === selectedSecName) {
                return item?.hed__Course__cName;
              }
            }
          })
        ),
      ];
      subjectNameArray?.map(subject => {
        if (subject) {
          subOption.push({
            value: subject,
            label: subject,
          });
        }
      });

      setSubjectOp(subOption);
      setSelectedSubName(subOption[0]?.value);
    }
  }, [selectedSecName, selectedClsName]);

  const change = (name, e, index) => {
    e.persist();
    handleChange(e);
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true, false);
  };

  const handleClassChange = value => {
    setSelectedClsName(value);
    setFieldValue('selectclass', value);
  };
  const handleSectionChange = value => {
    setFieldValue('selectsection', value);
    setSelectedSecName(value);
  };
  const handleSubjectChange = value => {
    setFieldValue('selectsubject', value);
    setSelectedSubName(value);
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

  const clearFile = () => {
    setFileSubmitted(false);
    setFileName('');
    setFileContent('');
    setSelectedFileBase64('');
    setFileSize('');
  };
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
  const onDrop = async acceptedFiles => {
    let base64 = await toBase64(acceptedFiles[0]);
    setFileSubmitted(true);
    setFileName(acceptedFiles[0].name);
    setFileSize(acceptedFiles[0].size);
    var base64result = String(base64).split(';base64,')[1];
    setSelectedFileBase64(base64result);
    setFileContent(base64result);
  };

  const keyPress = val => {
    const tags = [...values.tags];
    tags.push({ text: val });
    setFieldValue('tags', tags);
    setDiscussionTags(tags);
  };
  const deleteTag = index => {
    let tags = [...values.tags];
    tags.splice(index, 1);
    setFieldValue('tags', tags);
    setDiscussionTags(tags);
  };
  /* file upload */
  const handleDrop = file => {
    if (file) {
      const fileData = file[0];
      const fileURL = URL.createObjectURL(fileData);
      let data = {
        contextid: '0',
        component: 'user',
        filearea: 'draft',
        itemid: '0',
        filepath: '/',
        filename: fileData?.name,
        filecontent: fileURL,
        contextlevel: 'user',
        instanceid: '2',
      };

      postCoreFileUpload(data).then(res => {
        setFileSubmitted(true);
        if (res?.itemid) {
          values.setItemId(res?.itemid);
        }
      });
    }
  };

  return (
    <div style={{ border: '5px solid' }}>
      <KenDialog
        open={openDialog}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        title={'New Discussion'}
        disableEnforceFocus={true}
      >
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={12}>
            <KenInputField
              label="Title"
              required={true}
              value={values.title}
              name="title"
              onChange={change.bind(null, 'title')}
              errors={errors?.title}
              touched={touched?.title}
              setFieldTouched={setFieldTouched}
            />
          </Grid>
          <Grid item xs={12}>
            <KenEditor
              label={<span className={classes.labelText}>Message</span>}
              value={values.message}
              // required={true}
              errors={errors?.message}
              touched={touched?.message}
              content={values.message}
              setFieldTouched={setFieldTouched}
              handleChange={e => {
                setFieldValue('message', e);
                setFieldTouched('message', true);
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <KenSelect
              options={classOp}
              label="Select Class"
              required={true}
              value={values.selectclass}
              name="selectclass"
              onChange={event => {
                handleClassChange(event.target.value);
              }}
              setFieldTouched={setFieldTouched}
              errors={errors?.selectclass}
              touched={touched?.selectclass}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <KenSelect
              options={sectionOp}
              label="Select Section"
              required={true}
              value={values.selectsection}
              name="selectsection"
              //   onChange={change.bind(null, 'selectsection')}
              onChange={event => {
                handleSectionChange(event.target.value);
                change.bind(selectedClsName, 'classOption');
              }}
              setFieldTouched={setFieldTouched}
              errors={errors?.selectsection}
              touched={touched?.selectsection}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <KenSelect
              options={subjectOp}
              label="Select Subject"
              required={true}
              value={values.selectsubject}
              name="selectsubject"
              onChange={event => {
                handleSubjectChange(event.target.value);
                change.bind(selectedClsName, 'classOption');
              }}
              setFieldTouched={setFieldTouched}
              errors={errors?.selectsubject}
              touched={touched?.selectsubject}
            />
          </Grid> */}
          {/* <Box m={2} className={classes.innerContainer}>
            <Box p={2} style={{ padding: '10px 10px' }}>
              {fileSubmitted ? (
                <React.Fragment>
                  <Typography
                    style={{
                      fontSize: '12px',
                      textAlign: 'left',
                      marginTop: 16,
                    }}
                  >
                    Selected Files
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
                      <CloseIcon
                        style={{ width: 14, height: 14, color: '#505F79' }}
                      />
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
                    Attach Files
                  </Typography>
                  <div className={classes.dragDrop}>
                    <Dropzone
                      //onDrop={onDrop}
                      accept={''}
                      maxFiles={1}
                      onDrop={acceptedFiles => handleDrop(acceptedFiles)}
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
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </Grid>
              )}
            </Box>
          </Box> */}

          {/* <Grid item xs={12}>
            <KenInputField
              name="tagInput"
              label={<span className={classes.labelText}>Add tags </span>}
              placeholder="Enter a value and press enter"
              onKeyPress={ev => {
                if (ev.key === 'Enter' && ev.target.value?.length > 0) {
                  keyPress(ev.target.value);
                  setFieldValue('tagInput', '');
                  ev.preventDefault();
                }
              }}
              value={values.tagInput}
              onChange={change.bind(null, 'tagInput')}
            />
          </Grid> */}
          <Box>
            {values?.tags?.map((tag, index) => {
              return (
                <Box component="span">
                  <PurpleKenChip
                    label={tag.text}
                    onDelete={() => deleteTag(index)}
                  />
                </Box>
              );
            })}
          </Box>
          <Grid item xs={12} container spacing={2} justifyContent="flex-end">
            <Box item style={{ margin: '8px' }}>
              <KenButton
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                cancel
              </KenButton>
            </Box>
            <Box item style={{ margin: '8px' }}>
              <KenButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save and Finish
              </KenButton>
            </Box>
          </Grid>
        </Grid>
      </KenDialog>
    </div>
  );
};

const MyFormFormikHoc = props => {
  /* props from parent component */
  const {
    data,
    forumID,
    handleClose,
    actionCall,
    setActionCall,
    handleSnackbarOpen,
    setLoading,
  } = props;
  const { t } = useTranslation();
  const [itemId, setItemId] = useState();
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      title: '',
      selectsubject: '',
      message: '',
      selectsection: '',
      selectclass: '',
      tags: [],
      tagInput: '',
      itemId: itemId,
      setItemId: setItemId,
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is Required'),
      // selectclass: Yup.string().required('Field is required'),
      // selectsubject: Yup.string().required('Field is required'),
      // selectsection: Yup.string().required('Field is required'),
      message: Yup.string().required('Message is Required'),
    }),

    handleSubmit: values => {
      setLoading(true);
      const payload = {
        contactid: contactId,
        forumid: forumID,
        subject: values.title,
        message: values.message,
        /* options: [
          {
            name: 'attachmentsid',
            value: itemId,
          },
          {
            name: 'inlineattachmentsid',
            value: itemId,
          },
        ], */
      };
      handleClose();
      addForumDiscussion(payload)
        .then(res => {
          setLoading(false);
          console.log('add Forum Discussion', res);
          handleSnackbarOpen('success', t('translations:addedForumDiscussion'));
          setActionCall(true);
        })
        .catch(err => {
          setLoading(false);
          handleSnackbarOpen('error', t('translations:Something_Wrong'));
          console.log('add Forum Discussion Error', err);
        });
    },
  })(MyCreateDiscussionForm);

  return <FormikForm {...props} />;
};
