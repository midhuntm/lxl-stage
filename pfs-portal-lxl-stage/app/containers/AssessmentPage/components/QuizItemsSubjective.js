import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import UploadFileIcon from '../../../assets/Images/uploadFile.svg';
import Dropzone from 'react-dropzone';
import {
  postCoreFileUpload,
  postDeleteUploadedFile,
} from '../../../utils/ApiService';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import context from '../../../utils/helpers/context';

const useStyles = makeStyles(theme => ({
  question: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 14,
    fontWeight: 600,
  },
  questionTag: {
    marginRight: 16,
  },
  queMarks: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
  },
  queMarksText: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    fontSize: 12,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  queMarksIcon: {
    color: theme.palette.KenColors.flagIconColor,
    border: `1px solid ${theme.palette.KenColors.flagIconBorderColor}`,
    borderRadius: 3,
    marginLeft: 8,
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
}));

export default function Subjective(props) {
  const {
    name,
    value,
    onChange,
    setItemId,
    id,
    handleAnswerChange,
    itemId,
    hideFileDrop = true, //give false to enable file upload ui
    onBlur,
    uploading = true,
    setUploading,
  } = props;
  const classes = useStyles();
  //   const [uploading, setUploading] = useState(true);
  const { handleSnackbarOpen } = useContext(context);

  const handleDrop = async file => {
    if (file) {
      const fileData = file[0];

      let base64 = await toBase64(fileData)

      var base64result = String(base64).split(';base64,')[1];
      // const fileURL = URL.createObjectURL(fileData);
      let data = {
        contextid: '0',
        component: 'user',
        filearea: 'draft',
        itemid: '0',
        filepath: '/',
        filename: fileData?.name,
        filecontent: base64result,
        contextlevel: 'user',
        instanceid: '2',
      };

      postCoreFileUpload(data).then(res => {
        setUploading(false);
        if (res?.itemid) {
          setItemId(res?.itemid);
          handleAnswerChange('fileUpload', id, res?.itemid);
        }
      });
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleDelete = () => {
    console.log('handleDelete clicked');
    if (itemId) {
      let data = { method: 'post', itemid: itemId };
      postDeleteUploadedFile(data).then(res => {
        console.log(res);
        if (res?.success === true) {
          setUploading(true);
          handleSnackbarOpen('Success', 'Your File has been deleted');
        }
      });
    }
  };

  return (
    <>
      <Box m={2}>
        <TextField
          name={name}
          multiline
          rows={6}
          maxRows={Infinity}
          variant="outlined"
          fullWidth={true}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
        />
      </Box>
      {!hideFileDrop && (
        <Box m={2}>
          <Typography className={classes.typoUpload}>Upload File</Typography>
          {uploading ? (
            <Dropzone
              onDrop={acceptedFiles => handleDrop(acceptedFiles)}
              className={classes.dropzone}
              style={{ height: '100%', width: '80%' }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      // accept="image/jpeg, image/png, image/svg,.pdf,.doc,.docx"
                      accept=".pdf"
                    />
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      className={classes.uploadContainer}
                    >
                      <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <img src={UploadFileIcon} />
                        </Grid>
                        <Grid item>
                          <Typography className={classes.typoDrag}>
                            Drag & Drop file to upload or
                          </Typography>
                        </Grid>
                        <Grid item className={classes.containerBrowse}>
                          <Typography className={classes.typoBrowse}>
                            Browse file
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.typoImgDes}>
                          Supported Format JPEG, PNG, PDF and DOCX (upto 20 MB)
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </section>
              )}
            </Dropzone>
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              className={classes.uploadContainer}
            >
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <img src={UploadFileIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.typoDrag}>
                    Your File has been successfully Uploaded
                  </Typography>
                </Grid>
                <Grid item onClick={handleDelete}>
                  <DeleteOutlineRoundedIcon className={classes.deleteIcon} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
