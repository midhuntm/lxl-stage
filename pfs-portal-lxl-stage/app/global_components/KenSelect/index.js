import React from 'react';
import {
  Select,
  MenuItem,
  Typography,
  TextField,
  InputBase,
  withStyles,
  FormControl,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import KenTextLabel from '../KenTextLabel/index';
import StatusErrorIcon from '../../assets/StatusErrorIcon.svg';
import StatusSuccessIcon from '../../assets/StatusSuccessIcon.svg';
import StatusWarningIcon from '../../assets/StatusWarningIcon.svg';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#FAFBFC',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    textAlign: 'left',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  // input: {
  //   position: 'relative',
  //   textAlign: 'left',
  //   backgroundColor: theme.palette.KenColors.neutral10,
  //   fontSize: 16,
  //   borderRadius: 4,
  //   width: '100%',
  //   padding: '10px 26px 10px 12px',
  //   transition: theme.transitions.create(['border-color', 'box-shadow']),
  //   '&:focus': {
  //     borderColor: '#0c4ea2',
  //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  //     borderRadius: 4,
  //   },
  //   '&:visited': {
  //     borderColor: theme.palette.KenColors.tertiaryGreen200,
  //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  //     borderRadius: 4,
  //   },
  //   '&:invalid': {
  //     // textOverflow: 'ellipsis !important',
  //     color: theme.palette.KenColors.neutral60,
  //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  //     borderRadius: 4,
  //   },
  //   '&::-webkit-calendar-picker-indicator': {
  //     filter: 'invert(0.5)',
  //   },
  // },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: 2,
  },
  typoSupporting: {
    fontSize: '12px',
    // lineHeight: '16px',
    color: theme.palette.KenColors.neutral100,
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
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    borderRadius: 3,
  },
}));

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const KenSelect = function(props) {
  const classes = useStyles();
  const {
    id,
    options = [],
    value,
    onChange,
    label,
    name,
    placeholder,
    disabled,
    readonly,
    required,
    multiple,
    defaultValue,
    optionalLabel = true,
    errors,
    touched,
  } = props;
  const theme = useTheme();
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
      fullWidth
      disabled={disabled || readonly}
      className={classes.formControl}
    >
      <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <Select
        className={classes[getErrorStatus('status') || 'inputBorder']}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled || readonly}
        fullWidth
        placeholder={placeholder}
        input={<BootstrapInput value={value} />}
        required={required}
        multiple={multiple}
        defaultValue={defaultValue}
      >
        {options.map(el => (
          <MenuItem
            value={el.value || el}
            style={multiple ? getStyles(name, value, theme) : {}}
          >
            {el.label || el}
            {el?.time && <div>&nbsp; {el.time}</div>}
          </MenuItem>
        ))}
      </Select>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </FormControl>
  );
};

export default KenSelect;