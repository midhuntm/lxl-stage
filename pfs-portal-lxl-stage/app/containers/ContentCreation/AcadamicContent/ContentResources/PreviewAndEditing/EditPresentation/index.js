import React, { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

import KenButton from '../../../../../../global_components/KenButton';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import presentationPngIcon from '../../../../../../assets/icons/presentationPngLogo.png';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KenSelect from '../../../../../../components/KenSelect';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup';
import { useTranslation } from 'react-i18next';
import AssignstudentDetails from '../../../../../Assessment/Components/Assessment/Components/AssignStudents/AssignstudentDetails';
import AssignStudent from '../../../../../Assessment/Components/Assessment/Components/AssignStudents';
import Layout from '../../../../../Assessment/Components/Assessment/Components/Tags';
import PurpleKenChip from '../../../../../Assessment/QuestionPage/Components/QuestionTypes/DisplayComponents/PurpleKenChip';
import KenInputField from '../../../../../../components/KenInputField';
import KenEditor from '../../../../../../global_components/KenEditor';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import { FiArrowUp, FiArrowDown, FiUpload, FiCheck } from 'react-icons/fi';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TagsInput from '../PreviewTags';
import DragDropFile from '../../../../../Assessment/QuestionPage/Components/UploadQuestions/DragDropFile/DragDropFileUpload';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardDesign: {
    background: '#FAFBFC',
    border: '1px  #DFE1E6',
    borderRadius: '3px',
    padding: '20px',
    marginTop: '8px',
  },
  Heading: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    color: '#00218D',
  },
  discardButton: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#F2564A',
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
  Title: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '100%',
    color: '#061938',
  },
  AssignStudentFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '120%',
    color: '#061938',
  },
  asigndetails: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '100%',
    color: '#505F79',
  },
  radioContain: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '150%',
    color: '#061938',
  },
  addRestictionBtn: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '200%',
    color: '#092682',
  },
  dragDrop: {
    borderRadius: 3,
    marginBottom: 15,
    textAlign: 'center',
  },
  dragField: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { background: '#F1F5FF !important' },
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
  uploadIcon: {
    fontSize: 12,
    lineHeight: 1,
    color: '#997AFF',
    fontWeight: 600,
    marginRight: '10px',
  },
  title2: {
    fontWeight: 600,
    fontSize: 14,
    color: '#061938',
    width: '100%',
    marginLeft: '16px',
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
  supportText: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'center',
    color: '#505F79',
    width: '100%',
  },
}));

export default function EditPresentation(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [mcqTags, setMcqTags] = useState([]);
  const [clickCheck, setClickCheck] = useState(null);

  const [selectRadioBtn, setSelectRadioBtn] = React.useState('');
  const handleChangeRadio = event => {
    setSelectRadioBtn(event.target.value);
  };

  function handleSelecetedTags(items) {
    console.log(items);
  }

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
  const onDrop = acceptedFiles => {
    console.log(acceptedFiles);
    setUploadStarted(true);
    setFileName(acceptedFiles[0].name);
    setFileSize(getFileSize(acceptedFiles[0].size));
    let extension = getExtenstion(acceptedFiles[0].name);
    setFileExtenstion(extension);
    setFileSelected(acceptedFiles);
    setTimeout(() => {
      setProgress(100);
      setStatusTxt('Uploaded');
    }, 2000);
    setTimeout(() => {
      setRemoveProgress(true);
    }, 3000);
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

  const [state, setState] = React.useState({
    discription: true,
  });

  const handleChangeCheck = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { discription } = state;

  const Class = [
    {
      label: 'class II',
      value: '0',
    },
    {
      label: 'class III',
      value: '1',
    },
  ];
  const Section = [
    {
      label: 'A',
      value: '0',
    },
    {
      label: 'B',
      value: '1',
    },
  ];
  const Topic = [
    {
      label: 'Chemical Reactions and Equations.',
      value: '0',
    },
    {
      label: 'Chemical Reactions and Equations.',
      value: '1',
    },
  ];
  const Availability = [
    {
      label: 'Always Available',
      value: '0',
    },
    {
      label: 'Hide From Student',
      value: '1',
    },
  ];
  const Ristrictions = [
    {
      label: 'No Select Ristrictions',
      value: '0',
    },
    {
      label: 'Restricted',
      value: '1',
    },
  ];

  const keyPress = val => {
    const tags = [...values.tags];
    tags.push({ text: val });
    // setFieldValue('tags', tags);
    setMcqTags(tags);
  };
  const deleteTag = index => {
    let tags = [...values.tags];
    tags.splice(index, 1);
    // setFieldValue('tags', tags);
    setMcqTags(tags);
  };

  const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({ name: '' }),

    // Custom sync validation
    validate: values => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Required';
      }

      return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },

    displayName: 'BasicForm',
  })(EditPresentation);

  return (
    <>
      <Paper elevation={0} style={{ padding: '16px' }}>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          container
          spacing={2}
          alignItems="center"
        >
          <Grid item md={7} sm={4} xs={12}>
            <Typography className={classes.Heading}>
              {<KeyboardBackspaceOutlinedIcon />}&nbsp;Presentation(s) Preview
            </Typography>
          </Grid>
          <Grid item md={1} sm={5} xs={12}>
            <Button className={classes.discardButton}>Discard</Button>
          </Grid>
          <Grid item md={2} sm={5} xs={12}>
            <KenButton variant="outlined" color="primary">
              Save Resource(s)
            </KenButton>
          </Grid>
          <Grid item md={2} sm={3} xs={12}>
            <KenButton
              variant="contained"
              color="primary"
              startIcon={<PublishRoundedIcon />}
            >
              Save and Publish
            </KenButton>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} style={{ padding: '16px', marginTop: '16px' }}>
        <Grid
          className={classes.root}
          item
          md={12}
          sm={12}
          xs={12}
          // style={{ padding: '16px', marginTop: '16px' }}
          container
          spacing={2}
        >
          <Grid item md={5} sm={6} xs={12}>
            <Grid md={12} sm={12} xs={12} style={{ marginBottom: '16px' }}>
              <Typography className={classes.listPresentation}>
                List Of Presentations
              </Typography>
            </Grid>{' '}
            <Divider />
            <Grid md={12} sm={12} xs={12} style={{ marginTop: '16px' }}>
              <Typography>
                {' '}
                <span>
                  <img src={presentationPngIcon} alt="" />
                  &nbsp;&nbsp; chap../lesson/ma..file name.ppt&nbsp;
                </span>
              </Typography>
              <Typography
                style={{ marginLeft: '45px', marginBottom: '8px' }}
                variant="subtitle2"
              >
                {' '}
                &nbsp;&nbsp;1.1 mb
              </Typography>
            </Grid>{' '}
            <Divider />
          </Grid>

          <Grid item md={7} sm={12} xs={12}>
            <Grid style={{ marginBottom: '16px' }}>
              <Typography className={classes.Details}>
                Presentations Details
              </Typography>
            </Grid>{' '}
            <Divider />
            {/* <Typography style={{ marginTop: '16px' }} variant="subtitle2">
              Upload File
            </Typography> */}
            <Card className={classes.cardDesign}>
              <Grid
                items
                md={12}
                sm={12}
                xs={12}
                style={{ marginBottom: '16px' }}
                container
                spacing={1}
              >
                <Grid items md={11} style={{ marginTop: '16px' }}>
                  <Typography>
                    {' '}
                    <span>
                      <img src={presentationPngIcon} alt="" />
                      &nbsp;&nbsp; chap../lesson/ma..file name.ppt&nbsp;
                    </span>
                  </Typography>
                  <Typography
                    style={{ marginLeft: '50px' }}
                    variant="subtitle2"
                  >
                    1.2 mb
                  </Typography>
                </Grid>
                <Grid style={{ marginTop: '8px' }} items md={1}>
                  <CloseIcon />
                </Grid>
              </Grid>{' '}
              <Paper elevation={0}>
                <Card>
                  <CardContent>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        style={{ width: '100%' }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </form>
                  </CardContent>
                </Card>
              </Paper>
              {/* <FormGroup className={classes.Check}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={discription}
                      onChange={handleChangeCheck}
                      name="discription"
                    />
                  }
                  label="Display description on course page"
                />
              </FormGroup> */}
              <Card style={{ background: '#FFFFFF', padding: '12px' }}>
                <Grid style={{ marginTop: '16px' }} items md={12}>
                  <Dropzone
                    onDrop={onDrop}
                    accept=".doc,.xml,.docx"
                    maxFiles={1}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Grid
                        style={{ padding: '16px' }}
                        item
                        md={12}
                        container
                        {...getRootProps({ style })}
                        className={classes.dragField}
                      >
                        <input {...getInputProps()} />
                        <Grid item md={9}>
                          <div
                            className={classes.uploadWrapper}
                            title={'Upload File'}
                          >
                            {/* <Typography>
                              <span className={classes.uploadIcon}>
                                <FiUpload
                                  style={{ strokeWidth: '2px', fontSize: 18 }}
                                />
                              </span>
                            </Typography> */}
                            <ListItem className={classes.uploadIcon}>
                              <ListItemIcon>
                                <FiUpload
                                  style={{ strokeWidth: '2px', fontSize: 20 }}
                                />
                                <span className={classes.title2}>
                                  Drag & Drop file to upload or
                                </span>
                              </ListItemIcon>
                            </ListItem>
                          </div>
                        </Grid>
                        <Grid item md={3}>
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
                        </Grid>

                        {/* <p className={classes.supportText}>
                          Supported Format .doc, .docx and .xml (upto 20 MB)
                        </p> */}
                      </Grid>
                    )}
                  </Dropzone>
                </Grid>
              </Card>
            </Card>
            <Grid
              style={{ marginTop: '24px' }}
              item
              md={12}
              container
              spacing={1}
            >
              <Grid md={6} className={classes.Title}>
                <KenSelect options={Class} label={'Class'} />
              </Grid>
              <Grid md={6} className={classes.Title}>
                <KenSelect options={Section} label={'Section'} />
              </Grid>
              <Grid md={6} className={classes.Title}>
                <KenSelect options={Topic} label={'Topic'} />
              </Grid>
            </Grid>
            <Grid>
              <Typography
                className={classes.Title}
                style={{ marginTop: '16px' }}
                variant="subtitle2"
              >
                Share with
              </Typography>
              <Card className={classes.cardDesign}>
                <Typography className={classes.AssignStudentFont}>
                  Assign students
                </Typography>
                <p className={classes.asigndetails}>
                  Select the students to allow them to see the assessment and
                  its contents.
                </p>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectRadioBtn}
                    onChange={handleChangeRadio}
                  >
                    <Grid item md={12} container spacing={1}>
                      <Grid md={6}>
                        <FormControlLabel
                          className={classes.radioContain}
                          value="Allocate to all students of the class"
                          control={<Radio />}
                          label="Allocate to all students of the class"
                        />
                      </Grid>
                      <Grid md={6}>
                        <FormControlLabel
                          className={classes.radioContain}
                          value="Choose students to assign assessment"
                          control={<Radio />}
                          label="Choose students to assign assessment"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Card>
            </Grid>
            <Grid
              item
              md={12}
              container
              spacing={2}
              style={{ marginTop: '16px' }}
            >
              <Grid md={6} className={classes.Title}>
                <KenSelect options={Availability} label={'Availability'} />
              </Grid>
              <Grid md={6} className={classes.Title}>
                <KenSelect options={Ristrictions} label={'Add Ristrictions'} />
              </Grid>
            </Grid>
            <Button
              className={classes.addRestictionBtn}
              style={{ marginTop: '8px' }}
              alignContent="flex-end"
              startIcon={<AddCircleOutlineIcon />}
            >
              Add more Ristriction
            </Button>
            <Grid style={{ marginTop: '32px' }} container item md={12}>
              <Grid md={6}>
                <TagsInput
                  selectedTags={handleSelecetedTags}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="add Tags"
                  label="tags"
                />
              </Grid>
            </Grid>
            <Grid item md={12} container>
              <Grid md={9} />
              <Grid md={3} style={{ marginTop: '16px' }}>
                <Button variant="contained" color="primary">
                  Add to List
                </Button>
              </Grid>
              {/* <DragDropFile/> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
