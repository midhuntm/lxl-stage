import React, { useState, useEffect } from 'react';
import { TextareaAutosize, Typography } from '@material-ui/core';
import LabelWidget from './LabelWidget';

// Configs properties
//  counterEnabled: boolean (true)
export default function TextAreaWidget(props) {
  // TODO : Default value to be handled
  const { schema, onChange } = props;
  const intProps = {
    rowsMin: 3,
    rowsMax: 5,
    maxLength: 300,
    counterEnabled: true,
    ...schema,
  };

  const defaultValue = '';
  const { maxLength } = intProps;
  const [valueData, setValue] = useState(`${props.value} JJ`);

  console.log('===  ', props, valueData);

  useEffect(() => {
    console.log('=== Text effect: ', valueData, props.value, defaultValue);
    if (defaultValue) {
      onChange(valueData);
      setCount(valueData.length);
    }
    return () => {
      console.log('=== clear: ');

      setValue(null);
    };
  }, []);

  console.log(
    '=== textAreawidget props: ',
    props,
    intProps,
    valueData,
    defaultValue,
  );

  const [count, setCount] = useState(0);
  return (
    <div>
      <LabelWidget title={`${intProps.title} `} />
      <TextareaAutosize
        value={props.value || defaultValue}
        style={{ width: '100%' }}
        onChange={e => {
          // if (maxLength && e.target.value.length > maxLength) {
          //   e.target.value = e.target.value.slice(0, maxLength);
          //   return;
          // }
          setCount(e.target.value.length);
          setValue(`${e.target.value}`);
          onChange(e.target.value);
        }}
        {...intProps}
      />
      {intProps.counterEnabled && (
        <Typography
          style={{ fontSize: 12, float: 'right' }}
        >{`${count}/${maxLength}`}</Typography>
      )}
    </div>
  );
}
