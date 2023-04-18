import React, { useState, useEffect } from 'react';
import { TextareaAutosize, Typography, TextField } from '@material-ui/core';
import LabelWidget from './LabelWidget';

export default function InputLabelWidget(props) {
  const { schema, onChange } = props;
  const intProps = {
    maxLength: 30,
    ...schema,
  };

  const { defaultValue, maxLength } = intProps;

  const [value, setValue] = useState(props.value || defaultValue);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value) {
      onChange(value);
      setCount(value.length);
    }
  }, []);

  const handleChange = e => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
      return;
    }
    setCount(e.target.value.length);
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <LabelWidget title={intProps.title} />
      <TextField
        value={value}
        style={{ width: '100%' }}
        onChange={handleChange}
        {...intProps}
      />
      {intProps.counterEnabled && (
        <Typography style={{ fontSize: 12, float: 'right' }}>{`${count}/${
          intProps.maxLength
        }`}</Typography>
      )}
    </div>
  );
}
