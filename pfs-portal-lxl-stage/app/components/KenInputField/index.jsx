import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import KenTextLabel from '../KenTextLabel/index';
import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
    padding: 0,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.KenColors.neutral10,
    fontSize: 16,
    width: '100%',
    padding: '10px 12px !important',
    transition: theme.transitions.create(['border-color']),
    '&:focus': {
      borderColor: '#0c4ea2',
    },
    '&:visited': {
      borderColor: theme.palette.KenColors.tertiaryGreen200,
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
  typoSupporting: {
    fontSize: '12px',
    // lineHeight: '16px',
    color: theme.palette.KenColors.neutral100,
    marginTop: 4,
  },
  textArea: {
    padding: 0,
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
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    borderRadius: 3,
  },
}));

export default function KenInputField(props) {
  const {
    id,
    title,
    defaultValue,
    placeholder,
    disabled,
    label,
    value,
    required,
    onChange,
    onBlur,
    multiline,
    rows,
    onFocus,
    autofocus,
    readonly,
    onKeyPress,
    name,
    inputBaseRootClass,
    inputBaseClass,
    errors,
    touched,
    optionalLabel = true,
    startAdornment,
    endAdornment,
    type,
  } = props;
  const classes = useStyles();
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
      <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <BootstrapInput
        className={classes[getErrorStatus('status') || 'inputBorder']}
        id={id}
        placeholder={placeholder}
        title={title}
        disabled={disabled || readonly}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        defaultValue={defaultValue}
        onBlur={onBlur}
        multiline={multiline}
        // style={{height: '42px'}}
        rows={rows}
        onFocus={onFocus}
        autoFocus={autofocus}
        required={required}
        name={name}
        type={type}
        classes={{ root: inputBaseRootClass, input: inputBaseClass }}
        startAdornment={
          startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        }
        endAdornment={
          endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          )
        }
        {...props}
      />

      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </FormControl>
  );
}
