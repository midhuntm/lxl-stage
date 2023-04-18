import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '@material-ui/core';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 44,
    height: 22,
    padding: 0,
    margin: theme.spacing(1),
    margin: 0,
  },
  switchBase: {
    padding: 1,
    left: 2,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.KenColors.KenWhite,
      backgroundColor: theme.palette.KenColors.switchActiveBackground,
      left: 7,
      '& + $track': {
        backgroundColor: theme.palette.KenColors.gradeSectionHeaderLabel,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.KenColors.gradeSectionHeaderLabel,
      border: `6px solid ${theme.palette.KenColors.KenWhite}`,
    },
  },
  thumb: {
    width: 18,
    height: 18,
    marginTop: 1,
    background: theme.palette.KenColors.kenWhite,
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.KenColors.gradeSectionBorder,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function KenSwitch(props) {
  const { switchLabel, onChangeSwitch } = props;
  const theme = useTheme();

  const [state, setState] = React.useState({
    checked: true,
  });

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.checkedB}
            onChange={e => {
              onChangeSwitch(e);
            }}
            name="checked"
          />
        }
        label={switchLabel}
      />
    </FormGroup>
  );
}
