import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import KenTextLabel from '../KenTextLabel/index';
import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';
import { Typography, useTheme } from '@material-ui/core';
import GLOBAL_VALIDATION from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
  },
  labelContent: {
    marginBottom: 12,
  },
  selected: {
    color: theme.palette.KenColors.primary,
    backgroundColor: theme.palette.KenColors.neutral41,
    border: 'none',
  },
  toggleButton: {
    marginTop: '0 !important',
    '&$selected': {
      // color: theme.palette.KenColors.primary,
      backgroundColor: theme.palette.KenColors.neutral41,
      border: 'none !important',
      marginLeft: '8px !important',
    },
    '&hover': {
      backgroundColor: 'transparent',
    },
  },
  typoSupporting: {
    fontSize: '12px',
    color: `${theme.palette.KenColors.neutral100}`,
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
  chipOutline: {
    // background: theme.palette.KenColors.neutral10,
    color: theme.palette.KenColors.neutral100,
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
  },
  chipRoot: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
  },
}));

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    borderRadius: 32,
    textAlign: 'center',
    display: 'inline-block',
    padding: '0',
    margin: '0px 8px',
    fontSize: 12,
    textTransform: 'capitalize',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    color: theme.palette.KenColors.neutral100,
    '&:not(:first-child)': {
      borderRadius: 32,
      border: 'none',
      margin: '0px 8px',
      [theme.breakpoints.down('sm')]: {
        margin: 4,
      },
    },
    '&:first-child': {
      borderRadius: 32,
      border: 'none',
      marginLeft: 8,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 4,
    },
  },
}))(ToggleButtonGroup);

export default function KenToggleButton(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    value,
    onChange,
    options = [],
    onDelete,
    variant,
    color,
    chipSize,
    required,
    optionalLabel,
    exclusive, // if it true we can select only one option
    label,
    size = 'small',
    onBlur,
    onFocus,
    autofocus,
    errors,
    touched,
    type,
    setFieldTouched,
    name,
  } = props;

  const classes = useStyles();
  const getErrorStatus = type => {
    let status, helpText;
    if (!touched) return;
    if (errors === 'Required') {
      status = 'warning';
      helpText = (
        <span style={{ color: theme.palette.KenColors.tertiaryYellow400 }}>
          <img src={StatusWarningIcon} alt="warning" />{' '}
          {t('Validations:standard_required')}
        </span>
      );
    } else if (errors) {
      status = 'error';
      helpText = (
        <span style={{ color: theme.palette.KenColors.tertiaryRed400 }}>
          <img src={StatusErrorIcon} alt="error" /> {errors}
        </span>
      );
    }

    if (touched && !errors) {
      status = 'success';
      helpText = (
        <span style={{ color: theme.palette.KenColors.tertiaryGreen500 }}>
          <img src={StatusSuccessIcon} alt="success" />{' '}
          {t('Validations:standard_success')}
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
    <div>
      <div className={classes.labelContent}>
        <KenTextLabel
          label={label}
          optionalLabel={optionalLabel}
          required={required}
        />
      </div>
      <StyledToggleButtonGroup
        size={size}
        value={value}
        exclusive={exclusive}
        onChange={(e, newVal) => {
          onChange(newVal);
          setFieldTouched(name, true, false);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autofocus}
        type={type}
        style={{ display: 'flex', marginTop: 0, flexWrap: 'wrap' }}
        aria-label="text alignment"
      >
        {options.map(el => {
          return (
            <ToggleButton
              {...props}
              classes={{ selected: classes.selected }}
              className={classes.toggleButton}
              value={el.value || el}
              aria-label={el.value || value}
            >
              <Chip
                classes={{
                  outlined: classes.chipOutline,
                  root: classes.chipRoot,
                }}
                label={el.label || el}
                onDelete={onDelete}
                variant={variant}
                color={color}
                clickable={true}
                size={chipSize}
              />
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </div>
  );
}
