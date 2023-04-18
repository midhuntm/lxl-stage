import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import KenCard from '../../../global_components/KenCard';
import { makeStyles } from '@material-ui/styles';
import KenGridEditable from '../../../global_components/kenGridEditable/kenGridEditable';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import EditIcon from '@material-ui/icons/EditOutlined';
import KenSelectWrap from '../../../global_components/KenSelect';
import KenInputField from '../../../global_components/KenInputField';
import KenDateTimePicker from '../../../global_components/KenDateTimePicker';
import KenGrid from '../../../global_components/KenGrid';

const useStyles = makeStyles((theme) => ({
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  holidayButton: {
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: '5px',
  },
  fitlerButton: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
  sortingSection: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
  mainActions: {
    textAlign: 'right',
  },
  popOverHeading: {
    width: '100%',
    fontSize: '14px',
    fontWeight: '400',
    color: '#02195E',
  },
  tableBodyStyle: {
    fontSize: '12px',
    color: '#7A869A',
  },
  tableBodyStyleIgnoreHoliday: {
    fontSize: '12px',
    color: '#7A869A',
    padding: '0px',
  },
  textInputFieldDropDown: {
    background: 'transparent',
    borderRadius: '4px',
    color: '#000',
  },
  textInputField: {
    background: 'transparent',
    borderRadius: '4px',
    color: '#000',
  },
  kenDateTimePickerColor: {
    backgroundColor: '#fff',
  },
  noDataFound: {
    fontWeight: '600',
    fontSize: '14px',
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  filterButton: {
    marginRight: '10px',
  },
}));
const ActionCells = (row, popOverOpen) => {
  return (
    <p
      onMouseOver={(e) => popOverOpen(e)}
      // onMouseOut={(e) => popOverClose(e)}
    >
      {row}
    </p>
  );
};
const createData = (
  id,
  student,
  rollno,
  subject,
  internal,
  external,
  marks,
  saved
) => ({
  id,
  student,
  rollno,
  subject,
  internal,
  external,
  marks,
  saved,
});

const GradesComponent = () => {
  const [previous, setPrevious] = useState({});
  const [dataStream, setDataStream] = useState({});

  const [anchorEls, setAnchorEls] = useState(null);
  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    console.log('new-->', e, row, value, name, id);
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleSubject = (check, id) => {
    console.log('save', check, id);
    if (check == 'save') {
      const newRows = rows.map((row) => {
        if (row.id === id.id) {
          return {
            ...row,
            id: row.id,
            student: row.student,
            rollno: row.rollno,
            subject: row.student,
            internal: dataStream.internal,
            external: dataStream.external,
            marks: dataStream.marks,
            saved: false,
          };
        }
        return row;
      });
      setRows(newRows);
      setDataStream({});
    } else {
      setRows([
        ...rows,
        createData(
          `rows${rows.length}`,
          <KenSelectWrap
            label="Activity"
            options={[]}
            value={dataStream.activity}
            dropdownColor="#FFFFFF"
            // onChange={handleSelectChangeSubject}
            required
          />,
          <KenInputField
            label="Duration in weeks"
            value={dataStream.Durationinweeks}
            dropdownColor="#FFFFFF"
            // onChange={handleChangedCredit}
            required
          />,
          <KenDateTimePicker
            name={'startDate'}
            label="Start Date"
            value={dataStream.start_time}
            type="date"
            required={true}
            // defaultValue={startData}
            // onChange={(e) => handleChangedDate(e)}
          />,
          <KenDateTimePicker
            name={'endDate'}
            label="End Date"
            value={dataStream.end_time}
            type="date"
            required={true}
            // defaultValue={startData}
            // onChange={(e) => handleChangedEndDate(e)}
          />,

          <KenInputField
            label="Holiday List"
            value={dataStream.holiday_list}
            dropdownColor="#FFFFFF"
            // onChange={handleChangeHolidaylist}
            required
          />,

          true
        ),
      ]);
    }
  };
  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const handleChangedExternal = (event) => {
    console.log('event', event.target.value);
    dataStream.external = event.target.value;
  };
  const handleChangedMarks = (event) => {
    console.log('event', event.target.value);
    dataStream.marks = event.target.value;
  };

  const handleChangedInternal = (event) => {
    dataStream.internal = event.target.value;
  };
  const handlePopoverOpen = (event) => {
    setAnchorEls(event.currentTarget);
  };
  const [rows, setRows] = useState([
    createData(
      134,
      'Nandhini Clament',
      30094300,
      'Computer Science',
      60,
      60,
      60,
      false
    ),
    createData(
      135,
      'Nandhini Clament',
      30094300,
      'Computer Science',
      60,
      60,
      60,
      false
    ),
    createData(
      136,
      'Nandhini Clament',
      30094300,
      'Computer Science',
      <KenInputField
        label="Internal Assignment"
        value={dataStream.internal}
        dropdownColor="#FFFFFF"
        onChange={handleChangedInternal}
        required
      />,
      <KenInputField
        label="External Assignment"
        value={dataStream.external}
        dropdownColor="#FFFFFF"
        onChange={handleChangedExternal}
        required
      />,
      <KenInputField
        label="Marks"
        value={dataStream.marks}
        dropdownColor="#FFFFFF"
        onChange={handleChangedMarks}
        required
      />,
      true
    ),
  ]);
  const classes = useStyles();
  const columns = [
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          #
        </Typography>
      ),
      accessor: 'id',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          STUDENT NAME
        </Typography>
      ),
      accessor: 'student',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          ROLE NO
        </Typography>
      ),
      accessor: 'rollno',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          SUBJECT
        </Typography>
      ),
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          INTERNAL ASSESSMENT
        </Typography>
      ),
      accessor: 'internal',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          EXTERNAL ASSESSMENT
        </Typography>
      ),
      accessor: 'external',
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          MARKS
        </Typography>
      ),
      accessor: 'marks',
    },
  ];

  const data = [
    {
      id: 1,
      student: 'Nandhini Clament',
      rollno: '30094300',
      subject: 'Computer Science',
      internal: 60,
      external: 60,
      marks: 60,
    },
    {
      id: 2,
      student: 'Nyneeshiya Yancy',
      rollno: '33908979',
      subject: 'Mathamatics',
      internal: 60,
      external: 60,
      marks: 60,
    },
    {
      id: 3,
      student: 'Clament david',
      rollno: '40908080',
      subject: 'Business Maths',
      internal: 60,
      external: 60,
      marks: 60,
    },
  ];
  const columnData = [
    'STUDENT NAME',
    'ROLL NO',
    'SUBJECT',
    'INTERNAL ASSESSMENT',
    'EXTERNAL ASSESSMENT',
    'MARKS',
    'ACTIONS',
  ];
  return (
    // <div>GradesComponent</div>
    <>
      <Typography variant="h6" className={classes.title}>
        Scores
      </Typography>
      <KenCard elevation={0}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              {columnData.map((ele) => {
                return (
                  <TableCell align="left" className={classes.headTitle}>
                    {ele}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <KenGridEditable
                    {...{
                      row,
                      onChange,
                      columns: [
                        {
                          column_name: 'student',
                          is_inline_edit: false,
                          // inline_edit_type: 'kenSelect',
                          // dropdown: selectOptionsSubject,
                          label: 'Student',
                        },
                        {
                          column_name: 'rollno',
                          is_inline_edit: false,
                          inline_edit_type: '',
                          label: 'Roll No',
                        },
                        {
                          column_name: 'subject',
                          is_inline_edit: false,
                          inline_edit_type: '',
                          label: 'Subject',
                        },
                        {
                          column_name: 'internal',
                          is_inline_edit: true,
                          inline_edit_type: 'kenInput',
                          label: 'Internal Assignment',
                        },
                        {
                          column_name: 'external',
                          is_inline_edit: true,
                          inline_edit_type: 'kenInput',
                          label: 'External Assignment',
                        },
                        {
                          column_name: 'marks',
                          is_inline_edit: true,
                          inline_edit_type: 'kenInput',
                          label: 'Marks',
                        },
                      ],
                    }}
                  />
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: '15px' }}
                          className={classes.addButton}
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          Add
                        </Button>
                        {/* <IconButton
                          aria-label="done"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <DoneIcon />
                        </IconButton> */}
                      </>
                    ) : (
                      <>
                        {!row.saved && (
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: '15px' }}
                            className={classes.addButton}
                            onClick={() => onToggleEditMode(row.id)}
                          >
                            Edit
                          </Button>
                          // <IconButton
                          //   aria-label="delete"
                          //   onClick={() => onToggleEditMode(row.id)}
                          // >
                          //   <EditIcon />
                          // </IconButton>
                        )}
                        {row.saved && (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginRight: '15px' }}
                              className={classes.addButton}
                              onClick={() => handleSubject('save', row)}
                            >
                              Add
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </KenCard>
      
      <KenCard elevation={0}>
        <KenGrid
          columns={columns}
          data={data}
          pagination={{ disabled: true }}
          toolbarDisabled={true}
          initialState={{
            hiddenColumns: ['id'],
          }}
        />
      </KenCard>
    </>
  );
};

export default GradesComponent;
