import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Grid, useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral100,
  },
  transparentBg: {
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "transparent"
    }
  },
  formLableText: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 12
  }
}));

const StyledCheckBox = withStyles(theme => ({
  root: {
    color: theme.palette.KenColors.neutral60,
    '&$checked': {
      color: theme.palette.KenColors.primary,
    },
  },
  checked: {},
}))(props => <Checkbox color="default" {...props} />);

export default function KenCheckbox(props) {
  const { disabled, name, label, value, onChange, onClick, labelProps, disableRipple = false, customHTMLlabel = false } = props;
  const theme = useTheme();
  const classes = useStyles()
  return (
    <FormGroup>
      <Grid container alignItems="center" style={{ flexWrap: "nowrap" }}>
        <FormControlLabel
          control={
            <StyledCheckBox
              disabled={disabled}
              disableRipple={disableRipple}
              checked={value}
              onChange={onChange}
              onClick={onClick}
              name={name}
              className={disableRipple ? classes.transparentBg : null}
              Component-root={{
                style: { color: theme.palette.KenColors.secondaryPeach2 },
              }}
              style={
                disabled ? { color: theme.palette.KenColors.neutral40, marginRight: '-20px' }
                  : { color: '', marginRight: '-20px' }
              }
            />
          }
          label=
          {!customHTMLlabel ?
            <Typography
              style={{ fontSize: 12, paddingLeft: 15, color: theme.palette.KenColors.neutral100, display: 'flex' }}{...labelProps}>
              {' '}
              {label}</Typography>
            : customHTMLlabel
          }

        />
        {/* <Typography
            style={{
              fontSize: 12,
              color: theme.palette.KenColors.neutral100,
            }}
            {...labelProps}
          >
            {' '}
            {label}{' '}
          </Typography> */}

      </Grid>
    </FormGroup>
  );
}
