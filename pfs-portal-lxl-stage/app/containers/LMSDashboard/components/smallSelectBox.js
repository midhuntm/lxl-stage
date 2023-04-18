import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  select: {
    // width: '100px',
    background: '#FFFFFF',
    border: '0.6px solid #D7DEE9',
    borderRadius: '3px',
    textAlign: 'left',
    paddingLeft: '8px',
    minWidth: '100px'
  },
}));

export default function SmallSelectBox(props) {
  const { options, onChange, value, label } = props;
  const classes = useStyles();
  console.log(value,'value');
  return (
    <TextField
      size="small"
      label={label}
      select
      value={value}
      onChange={onChange}
      className={classes.select}
    >
      {options.map(item => (
        <MenuItem key={item.label} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
