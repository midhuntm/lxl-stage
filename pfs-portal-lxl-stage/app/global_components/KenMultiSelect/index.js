import React, { createRef, useEffect } from 'react';
import {
  Select,
  MenuItem,
  Typography,
  InputBase,
  withStyles,
  FormControl,
  makeStyles,
  useTheme,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@material-ui/core';
import KenTextLabel from '../../components/KenTextLabel';
import StatusErrorIcon from './assets/StatusErrorIcon.svg';
import StatusSuccessIcon from './assets/StatusSuccessIcon.svg';
import StatusWarningIcon from './assets/StatusWarningIcon.svg';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: `${theme.palette.KenColors.neutral10} !important`,
    border: `1px solid ${theme.palette.KenColors.neutral40} !important`,
    fontSize: 16,
    padding: '10px 26px 10px 12px !important',
    textAlign: 'left',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.KenColors.tertiaryBlue75,
      boxShadow: `0 0 0 0.2rem ${theme.palette.KenColors.shadowColor}`,
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: 2,
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
    borderRadius: 3,
  },
  menuItem: {
    padding: 0,
  }
}));

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const KenSelect = function (props) {
  const classes = useStyles();
  const {
    id,
    options = [],
    value,
    onChange, // this is having two parameters event and selectedItems.
    label,
    name,
    placeholder,
    disabled,
    readonly,
    required,
    optionalLabel = true,
    errors,
    touched,
    onBlur,
    onFocus,
    autofocus,
    defaultValue,
    onOpen,
    menuItemRootClass,
    menuItemSelectedClass,
    inputBaseRootClass,
    // disabledMenuItem,
    selectAll,
    handleSelectAll,
    checkMarks = false,
    menuProps,
  } = props;
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState(value);
  const [selectAllFlag, setSelectAllFlag] = React.useState(true);

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
    variant: 'menu',
    getContentAnchorEl: null,
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedItems(selected);
    if (onChange) {
      onChange(event, selected);
    }
  };

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

  useEffect(() => {
    if (selectAllFlag) {
      setSelectedItems([...options]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAllFlag, options]);

  const onSelectAll = () => {
    setSelectAllFlag(!selectAllFlag);
  };

  return (
    // <Tooltip title= {name=='domicile'?"The place or country of residence, which is legally or officially recognized":''}>
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
        input={<BootstrapInput value={selectedItems} />}
        labelId="multiple-checkbox-label"
        multiple={true}
        value={selectedItems}
        onChange={handleChange}
        renderValue={selected => selected.join(', ')}
        menuProps={menuProps}
        className={classes[getErrorStatus('status') || 'inputBorder']}
        id={id}
        name={name}
        label={label}
        disabled={disabled || readonly}
        fullWidth
        placeholder={placeholder}
        required={required}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autofocus}
        defaultValue={defaultValue}
        onOpen={onOpen}
        classes={{ root: inputBaseRootClass }}
        MenuProps={{ ...MenuProps, ...menuProps }}
      >
        {selectAll && checkMarks && (
          <MenuItem key={'selectAll'} value={'selectAll'} className={classes.menuItem} onClick={onSelectAll}>
            <Checkbox checked={selectAllFlag} />
            <ListItemText primary={'Select All'} style={{ fontSize: 12 }} />
          </MenuItem>
        )}
        {options.map((el, index) => (
          <MenuItem key={el} value={el} className={classes.menuItem}>
            {checkMarks && (
              <Checkbox checked={selectedItems.indexOf(el) > -1} />
            )}
            <ListItemText primary={el} style={{ fontSize: 12 }} />
          </MenuItem>
        ))}
      </Select>
      <Typography className={classes.typoSupporting} align="left">
        {getErrorStatus('error')}
      </Typography>
    </FormControl>
    // </Tooltip>
  );
};

export default KenSelect;
