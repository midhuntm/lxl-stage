import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormGroup, useTheme, Typography } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import KenTextLabel from '../../components/KenTextLabel';
import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  labelItem: {
    fontSize: 12,
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#00218D',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#00218D',
    },
  },
  formGroup: {
    flexDirection: 'row',
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
    borderRadius: 3,
  },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

// TODO: Make it to align with global component styles
export default function KenRadioGroup(props) {
  const classes = useStyles();

  const {
    name,
    label,
    defaultValue,
    value,
    options = [],
    onChange,
    required,
    optionalLabel,
    row = true,
    classOverrides = {},
    errors,
    touched,
  } = props;

  const theme = useTheme();

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

    if (touched && !errors) {
      status = 'success';
      helpText = (
        <span style={{ color: '#006644' }}>
          <img src={StatusSuccessIcon} alt="success" /> Valid
        </span>
      );
    }

    if (type === 'error') {
      return helpText;
    }
    if (type === 'status') {
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
    <FormGroup
      classes={{ root: classes.formGroup }}
      className={classes.formGroup}
    >
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">{label}</FormLabel> */}
        {label && (
          <KenTextLabel
            label={label}
            required={required}
            optionalLabel={optionalLabel}
          />
        )}

        <RadioGroup
          defaultValue={defaultValue}
          name={name}
          row={row}
          onChange={(e, newVal) => {
            console.log(newVal, 'new form');
            onChange(newVal, e);
          }}
          value={value}
          aria-label={label}
        >
          {options.map((option, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  value={option.value || option}
                  control={<StyledRadio />}
                  label={option.label || option}
                  disabled={option.disabled}
                  key={index}
                  classes={{
                    label: classes.labelItem,
                    root: classOverrides?.formControlLabelRoot
                      ? classOverrides.formControlLabelRoot
                      : '',
                  }}
                />
              </div>
            );
          })}
        </RadioGroup>
        <Typography className={classes.typoSupporting} align="left">
          {getErrorStatus('error')}
        </Typography>
      </FormControl>
    </FormGroup>
  );
}
