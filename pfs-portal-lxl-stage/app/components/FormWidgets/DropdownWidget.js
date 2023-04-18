import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import TextAreaWidget from './TextAreaWidget';
import LabelWidget from './LabelWidget';

export default function DropDownWidget(props) {
  const { schema, onChange } = props;
  const { title, defaultValue, options, extraTextOn, extraTextConfig } = schema;
  const [value, setValue] = useState(props.value || defaultValue);
  const [isExtraText, setIsExtraText] = useState(false);

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
    setIsExtraText(extraTextOn && e.target.value === extraTextOn);
  };
  return (
    <div>
      <LabelWidget title={title} />
      <Select
        id={title}
        value={value}
        onChange={handleChange}
        style={{ marginBottom: 5 }}
      >
        {options &&
          options.map(option => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
      </Select>
      {isExtraText && <TextAreaWidget {...extraTextConfig} />}
    </div>
  );
}
