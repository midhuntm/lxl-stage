import { useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenCheckbox from '../KenCheckbox';

const KenCheckboxGroup = props => {
  const theme = useTheme();
  const { value, options = [], onChange } = props;

  const [checkedArray, setCheckedArray] = useState([]);

  useEffect(() => {
    if (!Array.isArray(value)) {
      setCheckedArray([]);
    } else {
      setCheckedArray(value);
    }
  }, [value]);

  const handleOnChange = e => {
    if (checkedArray.includes(e.target.name)) {
      onChange(checkedArray.filter(d => d !== e.target.name));
    } else {
      onChange([...checkedArray, e.target.name]);
    }
  };

  return (
    <div data-testid="checkbox-group">
      {options.length
        ? options.map(option => {
            return (
              <KenCheckbox
                key={option.value}
                disableRipple={true}
                name={option.value}
                value={checkedArray.includes(option.value)}
                label={option.label}
                onChange={handleOnChange}
                labelProps={{
                  style: {
                    fontSize: 12,
                    paddingLeft:15,
                    color: theme.palette.KenColors.neutral400,
                  },
                }}
              />
            );
          })
        : null}
    </div>
  );
};

export default KenCheckboxGroup;
