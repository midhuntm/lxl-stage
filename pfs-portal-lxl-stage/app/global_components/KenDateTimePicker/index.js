import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import KenTextLabel from '../../components/KenTextLabel';
import InputBase from '@material-ui/core/InputBase';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Box, Typography } from '@material-ui/core';
import StatusErrorIcon from '../../assets/StatusErrorIcon.svg';
import StatusSuccessIcon from '../../assets/StatusSuccessIcon.svg';
import StatusWarningIcon from '../../assets/StatusWarningIcon.svg';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    fontSize: 14,
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    width: '100%',
    padding: '10px 5px',
    cursor: 'pointer',
    color: theme.palette.KenColors.neutral60,
  },
}))(InputBase);

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
export default function DateAndTimePickers(props) {
  const { ampm, label, id, value, required, optionalLabel, defaultValue, inputBaseRootClass, onChange, errors, touched, readonly } = props;
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
      <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <Box className={classes[getErrorStatus('status') || 'inputBorder']}>

        <form className={classes.container} noValidate>
          <BootstrapInput
            id={id}
            type="datetime-local"
            onChange={onChange}
            defaultValue={defaultValue}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={value}
            classes={{ root: inputBaseRootClass }}
          />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              autoOk={false}
              id={id}
              variant="inline"
              ampm={ampm}
              classes={{ root: inputBaseRootClass }}
              color={"primary"}
              hiddenLabel={true}
              allowKeyboardControl={false}
              value={value}
              onChange={onChange}
              disablePast
              format="dd-MM-yyyy hh:mm a"
            />
          </MuiPickersUtilsProvider> */}
        </form>
      </Box>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </Box>
  );
}

DateAndTimePickers.defaultProps = {
  type: 'datetime-local',
};
