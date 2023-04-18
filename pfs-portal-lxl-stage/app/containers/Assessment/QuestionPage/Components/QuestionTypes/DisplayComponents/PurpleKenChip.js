import { makeStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import KenChip from '../../../../../../global_components/KenChip';

const useStyles = makeStyles(theme => ({
  chip: {
    backgroundColor: theme.palette.KenColors.neutral41,
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    margin: '2px 5px',
  },
  icon: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
  },
}));

export default function PurpleKenChip(props) {
  const classes = useStyles();
  return (
    <KenChip
      className={classes.chip}
      deleteIcon={<CloseIcon className={classes.icon} fontSize="small" />}
      {...props}
    />
  );
}
