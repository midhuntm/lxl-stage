import {
  Box,
  Input,
  Link,
  Paper,
  Table,
  TableCell,
  TableContainer,
} from '@material-ui/core';
import React from 'react';
import KenDateTimePicker from '../../global_components/KenDateTimePicker';
import KenSelect from '../../global_components/KenSelect';
import moment from 'moment';
import KenCheckbox from '../KenCheckbox';

const kenGridEditable = ({
  row,
  name,
  onChange,
  type,
  columns,
  rowName,
  dropdown,
}) => {
  const { isEditMode } = row;
  console.log('shhhhhhhhhhhhhhhhhhhhhhhhhhh', row);
  return columns.map(ele => {
    if (ele.inline_edit_type == 'kenDatePicker') {
      return (
        <TableCell align="left">
          {isEditMode
            ? (console.log('row[ele.column_name]', ele),
              (
                <KenDateTimePicker
                  name={ele.column_name}
                  label={ele.label}
                  // placeholder="Start Date"
                  value={row[ele.column_name]}
                  type="datetime-local"
                  required={true}
                  onChange={e => onChange(e, row)}
                />
              ))
            : row[ele.column_name]}
        </TableCell>
      );
    } else if (ele.inline_edit_type === 'kenTime') {
      if (isEditMode) {
        if (ele.column_name === 'start_time') {
          const start_time = moment(row[ele.column_name], ['h:mm A']).format(
            'HH:mm'
          );

          row[ele.column_name] = start_time;
        }
        if (ele.column_name === 'end_time') {
          const end_time = moment(row[ele.column_name], ['h:mm A']).format(
            'HH:mm'
          );
          row[ele.column_name] = end_time;
        }
      }
      return (
        <TableCell align="left">
          {isEditMode ? (
            <>
              <KenDateTimePicker
                name={ele.column_name}
                label={ele.label}
                placeholder={ele.label}
                value={row[ele.column_name]}
                type="time"
                required={true}
                onChange={e => onChange(e, row)}
              />
            </>
          ) : (
            row[ele.column_name]
          )}
        </TableCell>
      );
    } else if (ele.inline_edit_type == 'kenSelect') {
      return (
        <TableCell align="left">
          {isEditMode ? (
            <Box>
              <KenSelect
                name={ele.column_name}
                options={ele.dropdown}
                value={row[ele.column_name]}
                dropdownColor="#ffffff"
                onChange={e => onChange(e, row)}
                required={true}
                label={ele.label}
              />
            </Box>
          ) : (
            row[ele.column_name]
          )}
        </TableCell>
      );
    } else if (ele.inline_edit_type == 'kenInput') {
      return (
        <TableCell align="left">
          {isEditMode ? (
            <Input
              value={row[ele.column_name]}
              name={ele.column_name}
              onChange={e => onChange(e, row)}
            />
          ) : (
            row[ele.column_name]
          )}
        </TableCell>
      );
    } else if (ele.inline_edit_type === 'kenCheckbox') {
      return <TableCell align="left" style={{width: '30px'}}>
        <KenCheckbox
          name={ele.column_name}
          value={row.checked}
          onChange={(e) => onChange(e, row)}
          color="primary"
          disabled={ele.disabled}
        />
      </TableCell>
    }
    else {
      return <TableCell>{row[ele.column_name]}</TableCell>;
    }
  });
};

export default kenGridEditable;
