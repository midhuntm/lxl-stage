import React, { useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import KenTextLabel from '../../components/KenTextLabel';
import { Box, Typography } from '@material-ui/core';

import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';
import configContext from '../../utils/helpers/configHelper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
  },
  labelWrap: {
    marginBottom: 2,
  },
  typoLabel: {},
  typoOption: {
    color: theme.palette.KenColors.neutral100,
  },
  typoSupporting: {
    fontSize: '12px',
    // lineHeight: '16px',
    color: 'theme.palette.KenColors.neutral100',
    marginTop: 4,
  },
  inputBorderWarning: {
    border: `1px solid ${theme.palette.KenColors.tertiaryYellow300}`,
    borderRadius: 3,
  },
  inputBorderError: {
    border: `1px solid ${theme.palette.KenColors.tertiaryRed400}`,
    borderRadius: 3,
  },
  inputBorderSuccess: {
    border: `1px solid ${theme.palette.KenColors.tertiaryGreen300}`,
    borderRadius: 3,
  },
  inputBorder: {
    border: '1px solid #DFE1E6',
    borderRadius: 3,
  },
}));

function KenEditor(props) {
  const {
    content,
    handleChange,
    disabled,
    readonly,
    label,
    required,
    optionalLabel,
    errors,
    touched,
    type,
    editorHeight = 160,
  } = props;
  const classes = useStyles();
  const { config } = useContext(configContext);

  const getErrorStatus = errorType => {
    let status, helpText;
    if (!touched) return;
    if (errors === 'Required') {
      status = 'warning';
      helpText = (
        <span style={{ color: '#FF991F' }}>
          <img src={StatusWarningIcon} alt="warning" /> Field cannot be empty.
        </span>
      );
    } else if (errors) {
      status = 'error';
      helpText = (
        <span style={{ color: '#B92500' }}>
          <img src={StatusErrorIcon} alt="error" /> {errors}
        </span>
      );
    }

    if (touched && !errors) {
      status = 'success';
      helpText = (
        <span style={{ color: '#006644' }}>
          <img src={StatusSuccessIcon} alt="success" /> Valid
        </span>
      );
    }

    if (errorType === 'error') {
      return helpText;
    }
    if (errorType === 'status') {
      switch (status) {
        case 'warning':
          return 'inputBorderWarning';
        case 'success':
          return 'inputBorderSuccess';

        case 'error':
          return 'inputBorderError';

        default:
          return 'inputBorder';
      }
    }
  };
  return (
    <FormControl
      disabled={disabled || readonly}
      className={classes.formControl}
    >
      {label && (
        <KenTextLabel
          label={label}
          required={required}
          optionalLabel={optionalLabel}
        />
      )}
      <Box
        className={classes[getErrorStatus('status') || 'inputBorder']}
        id="local-upload"
      >
        <Editor
          apiKey={config?.lmsAPIKeys?.tinymceAPIKey}
          value={content}
          disabled={disabled}
          init={{
            // required: required,
            // selector: 'textarea#default',
            selector: 'textarea#local-upload',
            statusbar: false,
            height: editorHeight,
            powerpaste_allow_local_images: true,
            plugins:
              'image code autoresize print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            // menubar: 'edit view insert format tools table help',
            // toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            menubar: false,
            toolbar: 'wordcount bold italic underline | charmap emoticons | insertfile image link | bullist numlist | alignleft aligncenter alignright alignjustify | outdent indent | preview print paste',
            toolbar_sticky: true,
            anchor_bottom: true,
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/

            // automatic_uploads: true,
            placeholder: 'Enter text...',
            // images_upload_url: 'postAcceptor.php'
            file_picker_types: 'image', //removed media
            // file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function(callback, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              // input.setAttribute('accept', 'image/*');
              if (meta.filetype == 'image') {
                input.setAttribute('accept', 'image/*');
              }
              if (meta.filetype == 'media') {
                input.setAttribute('accept', 'video/*');
              }
              input.onchange = function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                  callback(e.target.result, {
                    title: file.name,
                  });
                };
                reader.readAsDataURL(file);
                // --------------------------KEEP BELOW CODE FOR REFERENCE
                // var file = this.files[0];
                // var reader = new FileReader();
                // reader.onload = function () {
                //   var id = 'blobid' + (new Date()).getTime();
                //   var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                //   var base64 = reader.result.split(',')[1];
                //   var blobInfo = blobCache.create(id, file, base64);
                //   blobCache.add(blobInfo);
                //   /* call the callback and populate the Title field with the file name */
                //   cb(blobInfo.blobUri(), { title: file.name });
                // };
                // reader.readAsDataURL(file);
              };

              input.click();
            },
          }}
          // onInit={handleInit}
          onEditorChange={handleChange}
        />
      </Box>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </FormControl>
  );
}

export default KenEditor;
