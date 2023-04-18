import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box, makeStyles } from '@material-ui/core';
import KenTextLabel from '../KenTextLabel';
import StatusErrorIcon from '../../assets/StatusErrorIcon.svg';
import StatusSuccessIcon from '../../assets/StatusSuccessIcon.svg';
import StatusWarningIcon from '../../assets/StatusWarningIcon.svg';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // width: 220,
  },
  //Keneditor css
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  labelWrap: {
    marginBottom: 2
  },
  typoLabel: {

  },
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
    width: 'fit-content'
  },
  inputBorderError: {
    border: `1px solid ${theme.palette.KenColors.tertiaryRed400}`,
    borderRadius: 3,
    width: 'fit-content'
  },
  inputBorderSuccess: {
    border: `1px solid ${theme.palette.KenColors.tertiaryGreen300}`,
    borderRadius: 3,
    width: 'fit-content'
  },
  inputBorder: {
    border: '1px solid #DFE1E6',
    width: 'fit-content',
    borderRadius: 3
  }
}));

export default function KenDatePicker(props) {
  const {
    ampm,
    label,
    id,
    value,
    variant,
    required,
    optionalLabel,
    defaultValue,
    inputBaseRootClass,
    onChange,
    errors,
    touched,
    readonly,
    minDate,
    maxDate,
    placeholder,
    format,
    
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
  <Box>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <Box>
        <KeyboardDatePicker
          // label={label}
          id={id}
          value={value}
          defaultValue={defaultValue}
          required={required}
          minDate={minDate}
          maxDate={maxDate}
          classes={{ root: inputBaseRootClass }}
          onChange={onChange}
          inputVariant="outlined"
          variant={variant}
          format={'dd/MM/yyyy'}
          placeholder="MM/DD/YYYY"
          margin="dense"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          
        />
      </Box>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </MuiPickersUtilsProvider>
    </Box>
  );
}
