import React from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography, Grid, TextField } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import KenTextLabel from '../KenTextLabel/index';

import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';
import KenSelect from '../KenSelect';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: '#FAFBFC',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color']),
    '&:focus': {
      borderColor: '#00218D',
    },
    '&:visited': {
      borderColor: '#57D9A3',
    },
    '&:invalid': {
      // textOverflow: 'ellipsis !important',
      color: theme.palette.KenColors.neutral60,
    },
    '&::-webkit-calendar-picker-indicator': {
      filter: 'invert(0.5)',
    },
  },
}))(InputBase);

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
  inputBoxIcon: {
    cursor: 'pointer',
    color: theme.palette.KenColors.primary
  },
}));

export default function KenInputField(props) {
  const {
    id,
    title,
    placeholder,
    disabled,
    label,
    value,
    required,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    readonly,
    icon,
    name,
    errors,
    touched,
    type,
    optionalLabel = true,
    startAdornment,
    subScript,
    inputProps,
    endAdornment,
    iconClickEvent,
    ...otherInputProps
  } = props;
  const classes = useStyles();
  var pattern = RegExp('[A-Za-z]{3}'); //required , pattern ,
  let status;
  let helpText;

  // if (status === "warning") {
  //     helpText = <span style={{ color: '#FF991F' }}><img src={StatusWarningIcon}></img> Field cannot be empty.</span>
  // } else if (status === "success") {
  //     helpText = <span style={{ color: '#006644' }}><img src={StatusSuccessIcon}></img> Success.</span>
  // } else if (status === "error") {
  //     helpText = <span style={{ color: '#B92500' }}><img src={StatusSuccessIcon}></img> An error occured.</span>
  // }

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
    // <form className={classes.root} noValidate>

    <FormControl
      disabled={disabled || readonly}
      className={classes.formControl}
    >
      <KenTextLabel
        label={label}
        required={required}
        subScript={subScript}
        optionalLabel={optionalLabel}
      />
      <InputBase
        className={classes[getErrorStatus('status') || 'inputBorder']}
        pattern="[A-Za-z]{3}"
        endAdornment={
          endAdornment && (
            <InputAdornment position="start" className={classes.inputBoxIcon} onClick={iconClickEvent}>
              {endAdornment}
            </InputAdornment>
          )
        }
        id={id}
        placeholder={placeholder}
        title={title}
        disabled={disabled || readonly}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autofocus}
        required={required}
        name={name}
        type={type}
        startAdornment={
          startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        }
        inputProps
        {...otherInputProps}
      />

      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </FormControl>

    // </form >
  );
}
