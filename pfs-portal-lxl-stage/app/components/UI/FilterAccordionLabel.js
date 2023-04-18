import React, { useEffect, useState } from 'react';
import { Chip, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  labelText: {
    fontSize: '14px',
    fontWeight: '600',
  },
  chip: {
    height: '15px',
    backgroundColor: theme.palette.KenColors.orange11,
    marginLeft: '10px',
  },
  chipLabel: {
    fontSize: '10px',
    fontWeight: '600',
    paddingLeft: '5px',
    paddingRight: '5px',
    color: theme.palette.KenColors.orange10,
  },
}));

const FilterAccordionLabel = ({
  label,
  extraInfoText,
  showExtInfoIfFalsy = false,
  classOverrides,
}) => {
  const [showExtInfo, setShowExtInfo] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (showExtInfoIfFalsy) {
      setShowExtInfo(true);
    } else {
      if (extraInfoText) {
        setShowExtInfo(true);
      } else {
        setShowExtInfo(false);
      }
    }
  }, [extraInfoText, showExtInfoIfFalsy]);

  return (
    <>
      <Typography
        className={
          classOverrides?.labelText
            ? classOverrides?.labelText
            : classes.labelText
        }
      >
        {label}
      </Typography>

      {showExtInfo ? (
        <Chip
          data-testid="selectedfilter-count"
          size="small"
          label={extraInfoText}
          classes={{ sizeSmall: classes.chip, label: classes.chipLabel }}
        />
      ) : null}
    </>
  );
};

export default FilterAccordionLabel;
