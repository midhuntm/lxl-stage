import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    // '& > *': {
    //   margin: theme.spacing(0.5),
    // },
    margin: '3px',
  },
}));

export default function Chips(props) {
  const classes = useStyles();
  const { variant, onDelete, label, color, size } = props;

  return (
    // <div className={classes.root}>
    <Chip
      className={classes.root}
      label={label}
      onDelete={onDelete}
      variant={variant}
      color={color}
      size={size}
      {...props}
    />
    // </div>
  );
}
