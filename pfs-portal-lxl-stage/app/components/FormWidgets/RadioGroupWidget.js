import React, { useState, useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import TextAreaWidget from './TextAreaWidget';
import LabelWidget from './LabelWidget';

export default function RadioGroupWidget(props) {
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
      <RadioGroup
        aria-label={title}
        name={title}
        value={value}
        onChange={handleChange}
      >
        {options &&
          options.map(option => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
      </RadioGroup>
      {isExtraText && <TextAreaWidget {...extraTextConfig} />}
    </div>
  );
}
