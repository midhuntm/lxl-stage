import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import KenTextLabel from '../KenTextLabel';
import { Box } from '@material-ui/core';

const StyledSlider = withStyles(theme => {
  return {
    thumb: {
      height: '13.33px',
      width: '13.33px',
      backgroundColor: theme.palette.KenColors.kenWhite,
      border: `4px solid ${theme.palette.KenColors.primary}`,
    },
    valueLabel: {
      left: 'calc(-50% - 12px)',
    },
  };
})(Slider);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

export default function KenSlider(props) {
  const {
    valueText,
    marks,
    handleChange,
    value,
    label,
    required,
    optionalLabel,
    steps,
    track = false,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <KenTextLabel
        label={label}
        required={required}
        optionalLabel={optionalLabel}
      />
      <Box m={1}>
        <StyledSlider
          {...props}
          step={steps}
          valueLabelDisplay="auto"
          marks={marks}
          value={value}
          onChange={handleChange}
          aria-labelledby="range-slider"
          getAriaValueText={valueText}
          track={track}
        />
      </Box>
    </div>
  );
}
