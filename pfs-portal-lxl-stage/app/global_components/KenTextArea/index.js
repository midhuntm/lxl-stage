import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Box, Typography, makeStyles } from '@material-ui/core';
import KenTextLabel from '../../components/KenTextLabel';

import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';
const useStyles = makeStyles(theme => ({
  areaWrap: {
    width: '100%',
    outline: 'none',
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    minHeight: 50,
    padding: 8,
    fontSize: 14,
    color: theme.palette.KenColors.neutral900,
    backgroundColor: `${theme.palette.KenColors.neutral10} !important`,
    '&::-webkit-input-placeholder': {
      fontSize: '14px',
      lineHeight: '16px',
    },
  },
  label: {
    fontSize: '12px',
    color: theme.palette.KenColors.neutral400,
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
    },
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
  inputContainer: {
    display: 'flex',
  },
  input: {
    minWidth: '64px',
  },
  inputBox: {
    padding: '10px',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '100%',
    textAlign: 'center',
    color: '#04051A',
    '&:focus-visible': {
      outlineColor: '#002E9E',
      outlineStyle: 'auto',
      outlineWidth: '0.6px',
    },
    '&:focus': {
      outlineColor: '#002E9E',
      outlineStyle: 'auto',
      outlineWidth: '0.6px',
    },
  },
}));

export default function Textarea(props) {
  const {
    minRows,
    maxRows,
    placeholder,
    label,
    defaultValue,
    required,
    optionalLabel,
    value,
    onChange,
    errors,
    touched,
    centerAligned = false,
  } = props;
  const classes = useStyles();

  const getErrorStatus = type => {
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

    // if (touched && !errors) {
    //     status = 'success';
    //     helpText = <span style={{ color: '#006644' }}><img src={StatusSuccessIcon} alt='success'></img> Success.</span>
    // }

    if (type === 'error') {
      return helpText;
    }
    if (type === 'status') {
      switch (status) {
        case 'warning':
          return 'inputBorderWarning';
        // case 'success':
        //     return 'inputBorderSuccess';

        case 'error':
          return 'inputBorderError';

        default:
          return 'inputBorder';
      }
    }
  };

  return (
    <Box className={classes.wrapper}>
      {/* <Typography className={classes.label}>{label}</Typography> */}
      <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <Box
        className={classes.inputContainer}
        style={
          centerAligned === true
            ? { display: 'flex', justifyContent: 'center' }
            : { display: 'flex' }
        }
        // style={
        //   centerAligned ? { display: 'flex', justifyContent: 'center' } : {}
        // }
      >
        <TextareaAutosize
          className={classes.areaWrap}
          minRows={minRows}
          maxRows={maxRows}
          aria-label="maximum height"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
        <Typography className={classes.typoSupporting} align="left">
          {getErrorStatus('error')}
        </Typography>
      </Box>
    </Box>
  );
}
