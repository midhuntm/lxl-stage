import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../../../../global_components/KenCard';
import KenGrid from '../../../../../../global_components/KenGrid';
import StatusIcon from '../../../../ReportsPage/Components/StatusIcon';
import KenTableInputField from '../../../../../../global_components/KenTableInputField';
import { Grid } from '@material-ui/core';
import KenButton from '../../../../../../global_components/KenButton';
import { postBreakdownMarks } from '../../../../../../utils/ApiService';
import KenSnackBar from '../../../../../../components/KenSnackbar';
import { KEY_STATUS } from '../../../../../../utils/constants';

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
    color: '#061938',
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
}));

export default function MaBreakdown(props) {
  const {
    data = [],
    title,
    gradesColumnsHeaderData,
    setOpenDrawerBreakdown,
    getReportDetails,
    type,
    setData,
  } = props;
  const classes = useStyles();
  // const [gradeData, setGradeData] = useState(data);
  const notAvailable = '--';

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(KEY_STATUS.success);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [gridErrors, setGridErrors] = useState([]);
  const [inputError, setInputError] = useState({
    error: false,
    errorMessage: '',
  });
  const [columns, setColumns] = useState();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
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
  const MACell = row => {
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
      console.log(e.target.value);
      e.preventDefault();
      validateFields(e.target.value);
      setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value, errors);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      validateFields(initialValue);
      setValue(initialValue);
    }, [initialValue]);

    // If the initialValue is changed , validate it

    const numRegex = /^\d+(\.\d{1,2})?$/;
    const validationChecks = (val, max) => {
      if (typeof val === undefined || val?.trim() === '') {
        let allErrors = [...errors];
        let rowErrors = { error: true, errorMessage: 'Required' };
        allErrors[index] = rowErrors;
        setErrors(allErrors);
      } else if (+val > max) {
        let allErrors = [...errors];
        let rowErrors = {
          error: true,
          errorMessage: 'Max value should be less than 5',
        };
        allErrors[index] = rowErrors;
        setErrors(allErrors);
      } else if (+val < 0) {
        let allErrors = [...errors];
        let rowErrors = {
          error: true,
          errorMessage: 'Negative Marks are not allowed',
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
    };
    const validateFields = val => {
      switch (id) {
        case 'ma1':
          validationChecks(val, data[0]?.maBreakdownMax);
          break;
        case 'ma2':
          validationChecks(val, data[0]?.maBreakdownMax);
          break;
        case 'ma3':
          validationChecks(val, data[0]?.maBreakdownMax);
          break;
        case 'ma4':
          validationChecks(val, data[0]?.maBreakdownMax);
          break;
        default:
          break;
      }
    };

    return (
      <Box className={classes.inputContainer}>
        <KenTableInputField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={classes.input}
          errors={errors[index]?.error}
          touched={true}
          name={index}
        />
      </Box>
    );
  };

  const handleSubmit = () => {
    let body = [];

    data?.map(el => {
      if (type === 'one') {
        body.push(
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'P&P',
            numerical_grade: el.pp1,
            maxmarks: el.ppBreakdownMax,
            Sequence: '1',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma1,
            maxmarks: el.maBreakdownMax,
            Sequence: '1',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma2,
            maxmarks: el.maBreakdownMax,
            Sequence: '2',
          }
        );
      } else if (type === 'two' || type === 'three') {
        body.push(
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'P&P',
            numerical_grade: el.pp1,
            maxmarks: el.ppBreakdownMax,
            Sequence: '1',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'P&P',
            numerical_grade: el.pp2,
            maxmarks: el.ppBreakdownMax,
            Sequence: '2',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma1,
            maxmarks: el.maBreakdownMax,
            Sequence: '1',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma2,
            maxmarks: el.maBreakdownMax,
            Sequence: '2',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma3,
            maxmarks: el.maBreakdownMax,
            Sequence: '3',
          },
          {
            Course_Connection: el.courseConnectionId,
            term_grade_type: el.term,
            assessment_type: 'ma',
            numerical_grade: el.ma4,
            maxmarks: el.maBreakdownMax,
            Sequence: '4',
          }
        );
      }
    });

    if (inputError.error === true) {
      handleSnackbarOpen('error', 'Cannot submit grades with Error');
    } else {
      const payload = body.filter(el => el?.numerical_grade !== undefined);
      if (!payload.length) {
        return;
      }
      postBreakdownMarks({ Grade: [...payload] })
        .then(res => {
          console.log(res);
          handleSnackbarOpen('success', 'Marks has been updated');
          setOpenDrawerBreakdown(false);
          getReportDetails();
        })
        .catch(err => {
          console.log(err);
          handleSnackbarOpen('warning', 'Error occured while updating');
        });
    }
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  React.useEffect(() => {
    let arr = [
      {
        Header: 'SUBJECT',
        Footer: '',
        columns: [
          {
            accessor: 'subject',

            Cell: SubjectsCell,
            //   Footer: <Typography className={classes.footer}>Total</Typography>,
          },
        ],
      },

      {
        Header: 'MA1-MA',
        columns: [
          {
            accessor: 'ma1',
            Header: `(${Math.round(data[0]?.maBreakdownMax)} M)`,
          },
        ],
      },
      {
        Header: 'MA2-MA',
        Footer: '',
        columns: [
          {
            accessor: 'ma2',
            Header: `(${Math.round(data[0]?.maBreakdownMax)} M)`,
          },
        ],
      },
    ];
    if (type == 'one') {
      setColumns(arr);
    } else if (type === 'two') {
      setColumns(arr);
    } else if (type === 'three') {
      setColumns([
        {
          Header: 'SUBJECT',
          Footer: '',
          columns: [
            {
              accessor: 'subject',

              Cell: SubjectsCell,
              //   Footer: <Typography className={classes.footer}>Total</Typography>,
            },
          ],
        },

        {
          Header: 'MA1-MA',
          columns: [
            {
              accessor: 'ma3',
              Header: `(${Math.round(data[0]?.maBreakdownMax)} M)`,
            },
          ],
        },
        {
          Header: 'MA2-MA',
          Footer: '',
          columns: [
            {
              accessor: 'ma4',
              Header: `(${Math.round(data[0]?.maBreakdownMax)} M)`,
            },
          ],
        },
      ]);
    }
  }, [type]);

  const { t } = useTranslation();
  const updateMyData = (rowIndex, columnId, value, errors) => {
    // We also turn on the flag to not reset the page

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

    setData(old =>
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
    <div>
      <KenCard paperStyles={{ padding: 0, boxShadow: 'none' }}>
        <Grid container justify="space-between" direction="column">
          <Grid item>
            <KenGrid
              toolbarDisabled={true}
              columns={columns}
              data={data}
              pagination={{ disabled: true }}
              initialState={{ hiddenColumns: ['status'] }}
              gridProps={{
                //   footerRows: [1],
                updateMyData: updateMyData,
                defaultColumn: defaultColumn,
              }}
              getColumnProps={column => ({
                onClick: () => alert('Column!'),
              })}
            />
          </Grid>

          <Grid item style={{ textAlign: 'right', marginTop: 24 }}>
            <Box>
              <Grid container spacing={1} justify="flex-end">
                <Grid item>
                  <KenButton
                    variant="secondary"
                    onClick={() => {
                      setOpenDrawerBreakdown(false);
                    }}
                  >
                    Cancel
                  </KenButton>
                </Grid>
                <Grid item>
                  <KenButton
                    variant="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </KenButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </KenCard>
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={2000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
    </div>
  );
}
