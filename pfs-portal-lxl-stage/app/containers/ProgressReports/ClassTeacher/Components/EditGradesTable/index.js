import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../../../global_components/KenCard';
import KenGrid from '../../../../../global_components/KenGrid';
import StatusIcon from '../../../ReportsPage/Components/StatusIcon';
import GradeIcon from '../../../ReportsPage/Components/GradeIcon';
import KenTableInputField from '../../../../../global_components/KenTableInputField';
import AddIcon from '../../../../../assets/icons/addPlus.svg';
import EditBreakdownTable from '../EditBreakdownTable';

const useStyles = makeStyles(theme => ({
  subjectRow: {
    display: 'flex',
    alignItems: 'center',
  },
  subjectTitle: {
    fontSize: '13px',
    fontWeight: 'normal',
    margin: '0px 8px',
    lineHeight: '100%',
    color: theme.palette.KenColors.neutral900,
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  footer: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.KenColors.neutral900,
  },
  inputContainer: {
    width: '64px',
    background: theme.palette.KenColors.neutral10,
    boxSizing: 'border-box',
    borderRadius: '3px',
  },
  input: {
    padding: '5px',
    '&:focus-visible': {
      outlineColor: theme.palette.KenColors.tertiaryBlue505,
      outlineStyle: 'auto',
      outlineWidth: '0.6px',
    },
  },
  disabled: {
    background: theme.palette.KenColors.neutral9,
  },
  icon: {
    textAlign: 'center',
  },
  header: {
    fontSize: 10,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  EditIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function EditGradesTable(props) {
  const {
    data = [],
    breakdownData,
    title,
    gradeColorPalette,
    getReportDetails,
    gradesColumnsHeaderData,
    getGradeData,
    getValidations,
  } = props;
  const classes = useStyles();
  const [gradeData, setGradeData] = useState(data);
  const [openDrawerBreakdown, setOpenDrawerBreakdown] = React.useState(false);
  const [gridErrors, setGridErrors] = useState([]);

  const notAvailable = '--';

  const [inputError, setInputError] = useState({
    error: false,
    errorMessage: '',
  });

  React.useEffect(() => {
    getValidations(inputError);
    getGradeData(gradeData);
  }, [gradeData]);

  const getGradeColor = grade => {
    return gradeColorPalette?.find(
      palette =>
        palette?.grade?.trim()?.toUpperCase() === grade?.trim()?.toUpperCase()
    );
  };

  const SubjectsCell = row => {
    return (
      <>
        <Box className={classes.subjectRow}>
          <StatusIcon status={row?.row?.values?.Status} />
          <Typography className={classes.subjectTitle}>{row.value}</Typography>
        </Box>
      </>
    );
  };

  const GradeCell = ({ value }) => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <GradeIcon {...getGradeColor(value)} grade={value?.toUpperCase()} />
        </Box>
      </>
    );
  };

  const SubEn = row => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };

  const PPCell = row => {
    return (
      <>
        <Box className={[classes.textAlignCenter, classes.disabled].join(' ')}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };

  const MACell = row => {
    return (
      <>
        <Box className={[classes.textAlignCenter, classes.disabled].join(' ')}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };

  const TotalMarksCell = row => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };
  const AverageCell = row => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };

  const ExamCell = row => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <Typography className={classes.subjectTitle}>
            {row.value || notAvailable}
          </Typography>
        </Box>
      </>
    );
  };

  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [errors, setErrors] = useState([]);
    const [value, setValue] = React.useState(initialValue);

    const onChange = e => {
      e.preventDefault();
      validateFields(e.target.value);
      setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value, errors);
    };

    const numRegex = /^\d+(\.\d{1,2})?$/;

    // const validateFields = val => {
    //   if (
    //     id === 'portfolio' &&
    //     (+val > 5 || val === undefined || !new RegExp(numRegex).test(val))
    //   ) {
    //     setErrors({ error: true, errorMessage: 'max' });
    //   } else {
    //     setErrors({ error: false, errorMessage: '' });
    //   }
    // };

    const validateFields = val => {
      switch (id) {
        case 'portfolio':
          if (typeof val === undefined || val?.trim() === '') {
            let allErrors = [...errors];
            let rowErrors = { error: true, errorMessage: 'Required' };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          } else if (+val > 5) {
            let allErrors = [...errors];
            let rowErrors = {
              error: true,
              errorMessage: 'Max value should be less than 5',
            };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          } else if (!new RegExp(numRegex).test(val)) {
            let allErrors = [...errors];
            let rowErrors = {
              error: true,
              errorMessage: 'Value should be a number',
            };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          } else {
            let allErrors = [...errors];
            let rowErrors = { error: false, errorMessage: '' };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          }
          break;

        default:
          break;
      }
    };

    // If the initialValue is changed external, sync it up with our state
    // React.useEffect(() => {
    //   setValue(initialValue);
    // }, [initialValue]);

    // If the initialValue is changed , validate it
    React.useEffect(() => {
      validateFields(initialValue);
    }, [initialValue]);

    return (
      <Box className={classes.inputContainer}>
        <KenTableInputField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={classes.input}
          //errors={errors?.error}
          errors={errors[index]?.error}
          touched={true}
          name={index}
        />
      </Box>
    );
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  const handleEdit = () => {
    console.log('handle edit called');
    setOpenDrawerBreakdown(true);
  };

  const { t } = useTranslation();
  const columns = [
    {
      Header: 'STATUS',
      Footer: '',
      accessor: 'status',
      columns: [
        {
          disableSortBy: true,
          Header: 'Status',
          accessor: 'status',
          Footer: '',
        },
      ],
    },
    {
      Header: 'SUBJECT',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'subject',
          Cell: SubjectsCell,
          Footer: <Typography className={classes.footer}>Total</Typography>,
        },
      ],
    },
    {
      Header: 'PERIODIC ASSESSMENT',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          Header: `P & P (${gradesColumnsHeaderData?.pp})`,
          accessor: 'pp',
          Footer: '',
          Cell: PPCell,
          className: classes.disabled,
        },
        {
          disableSortBy: true,
          Header: () => {
            return (
              <Typography
                className={classes.header}
                onClick={() => {
                  handleEdit();
                }}
              >
                {`MA (${gradesColumnsHeaderData?.ma})`}
                <img src={AddIcon} />
              </Typography>
            );
          },
          accessor: 'ma',
          Footer: '',
          Cell: MACell,
          className: classes.disabled,
        },
      ],
    },
    {
      Header: `PORTFOLIO (${gradesColumnsHeaderData?.portfolio})`,
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'portfolio',
          Footer: '',
        },
      ],
    },
    {
      Header: `SUB EN (${gradesColumnsHeaderData?.subEn})`,
      Footer: '',
      columns: [
        {
          Header: () => {
            return (
              <img
                src={AddIcon}
                className={classes.EditIcon}
                onClick={() => {
                  handleEdit();
                }}
              />
            );
          },
          disableSortBy: true,
          accessor: 'subEn',
          Footer: '',
          Cell: SubEn,
        },
      ],
    },
    {
      Header: `${gradesColumnsHeaderData?.exam}`,
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          Footer: '',
          accessor: 'exam',
          Cell: ExamCell,
        },
      ],
    },
    {
      Header: 'TOTAL MARKS',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'totalMarks',
          Cell: TotalMarksCell,
          Footer: info => {
            // Only calculate marks visits if rows change
            const total = React.useMemo(
              () =>
                info.rows.reduce((sum, row) => +row.values.totalMarks + sum, 0),
              [info.rows]
            );

            return <Typography className={classes.footer}>{total}</Typography>;
          },
        },
      ],
    },
    {
      Header: 'CLASS AVERAGE',
      Footer: '',
      columns: [
        {
          accessor: 'average',
          disableSortBy: true,
          Cell: AverageCell,
          Footer: info => {
            // Only calculate average if rows change
            const total = React.useMemo(
              () =>
                info.rows.reduce((sum, row) => +row.values.average + sum, 0) /
                info.rows.length,
              [info.rows]
            );

            return <Typography className={classes.footer}>{total}</Typography>;
          },
        },
      ],
    },
    {
      Header: 'GRADE',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'grade',
          Cell: GradeCell,
          Footer: '',
        },
      ],
    },
  ];

  const updateMyData = (rowIndex, columnId, value, errors) => {
    let allErrors = [...gridErrors];
    let rowErrors = errors[rowIndex];
    allErrors[rowIndex] = rowErrors;
    setGridErrors(allErrors);

    // We also turn on the flag to not reset the page
    const errorsArr = allErrors.filter(error => error?.error === true);

    setInputError({
      error: errorsArr.length > 0 ? true : false,
      errorMessage: errorsArr.length > 0 ? 'Invalid grades found.' : '',
    });

    setGradeData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <KenCard paperStyles={{ padding: 0, boxShadow: 'none' }}>
      <KenGrid
        toolbarDisabled={true}
        columns={columns}
        data={gradeData}
        pagination={{ disabled: false }}
        initialState={{ hiddenColumns: ['status'] }}
        gridProps={{
          footerRows: [1],
          updateMyData: updateMyData,
          defaultColumn: defaultColumn,
        }}
        getColumnProps={column => ({
          onClick: () => alert('Column!'),
        })}
      />
      {openDrawerBreakdown && (
        <EditBreakdownTable
          data={breakdownData}
          setOpenDrawerBreakdown={setOpenDrawerBreakdown}
          getReportDetails={getReportDetails}
        />
      )}
    </KenCard>
  );
}
