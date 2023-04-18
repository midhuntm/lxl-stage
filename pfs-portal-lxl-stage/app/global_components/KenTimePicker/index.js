import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import KenTextLabel from '../../components/KenTextLabel';
import InputBase from '@material-ui/core/InputBase';
import { Typography } from '@material-ui/core';
import { TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker, Clock } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import StatusErrorIcon from '../../assets/StatusErrorIcon.svg';
import StatusSuccessIcon from '../../assets/StatusSuccessIcon.svg';
import StatusWarningIcon from '../../assets/StatusWarningIcon.svg';
import { HiOutlineClock } from 'react-icons/hi';

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
    width: 200,
  },
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
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    borderRadius: 3,
    width: 'fit-content'
  },
}));

export default function TimePickers(props) {
  const { label, id, value, ampm, required, errors, touched, optionalLabel, defaultValue, inputBaseRootClass, onChange, name, timerType } = props;

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
    // <FormControl
    // disabled={disabled || readonly}
    // className={classes.formControl}>
    <React.Fragment>
      {timerType && timerType == "material" ?
        <Box>
          <div style={{ marginBottom: 4 }}>
            <KenTextLabel
              label={label}
              required={required}
              optionalLabel={optionalLabel}
            />
          </div>
          <Box className={classes[getErrorStatus('status')]} >
            <FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  ampm={ampm}
                  openTo="hours"
                  views={["hours", "minutes"]}
                  format="HH:mm"
                  placeholder='--:--'

                  allowKeyboardControl={false}
                  // label={label}
                  keyboardIcon={<HiOutlineClock style={{ fontSize: 16, marginTop: -4 }} />}
                  hiddenLabel={true}
                  value={value}
                  defaultValue="00:00"
                  onChange={onChange}
                  classes={{ root: inputBaseRootClass }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Box>
          <Typography className={classes.typoSupporting} align="left">{getErrorStatus('error')}</Typography>
        </Box>
        :
        <Box>
          <KenTextLabel
            label={label}
            required={required}
            optionalLabel={optionalLabel}
          />
          <Box className={classes[getErrorStatus('status')]} >
            <form className={classes.container}>
              <BootstrapInput
                id={id}
                type="time"
                defaultValue={defaultValue}
                className={classes.textField}
                required={required}
                InputLabelProps={{ shrink: true, }}
                inputProps={{ step: 300 }}
                name={name}
                onChange={onChange}
                value={value}
                classes={{ root: inputBaseRootClass }}
              // {...props}
              />
            </form>
          </Box>
          <Typography className={classes.typoSupporting} align="left">{getErrorStatus('error')}</Typography>
          {/* </FormControl> */}
        </Box>
      }
    </React.Fragment>
  );
}
