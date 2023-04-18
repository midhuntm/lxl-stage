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
import {
  getParentDetails,
  getUserDetails,
} from '../../../../../utils/helpers/storageHelper';
import CommentsCell from '../../../../../global_components/KenGrid/components/CommentsCell';
import {
  KEY_USER_TYPE,
  KEY_EMPTY_VALUES_PLACEHOLDERS,
} from '../../../../../utils/constants';
import SubBreakdown from '../EditBreakdownTable/components/subBreakdown';
import { postComments } from '../../../../../utils/ApiService';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
  subjectRow: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
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
  gradeCell: {
    minWidth: 35,
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

export default function GradesTable(props) {
  const {
    data = [],
    breakdownData,
    // title,
    getReportDetails,
    gradesColumnsHeaderData,
    getGradeData,
    getValidations,
    gradeColorPalette = [],
    comments,
    setComments,
    edit = false,
    standard,
    setScholasticDirty = () => {},
    setScholastic,
    scholastic,
    tabIndex,
  } = props;
  const classes = useStyles();
  const [gradeData, setGradeData] = useState(data);
  const [openDrawerBreakdown, setOpenDrawerBreakdown] = React.useState(false);
  const [gridErrors, setGridErrors] = useState([]);
  const [inputError, setInputError] = useState({
    error: false,
    errorMessage: '',
  });
  const { t } = useTranslation();
  const userDetails = getUserDetails();
  const parentDetails = getParentDetails();
  const notAvailable = KEY_EMPTY_VALUES_PLACEHOLDERS.DOUBLE_DASH;
  const [openDrawerSubBreakdown, setOpenDrawerSubBreakdown] = useState(false);
  const [tIndex, setTIndex] = useState();

  React.useEffect(() => {
    getValidations(inputError);
    // getGradeData();
  }, [gradeData]);

  React.useEffect(() => {
    setGradeData(data);
    setTIndex(tabIndex);
  }, [data, tabIndex]);

  React.useEffect(() => {
    const arr = scholastic.map((el, index) => {
      if (index === tIndex) {
        el.grades = gradeData;
      }
      return el;
    });
    getGradeData(arr);
  }, [gradeData]);

  const onReply = (reply, curComments) => {
    console.log('send comment: ', reply, curComments);
    const contactId =
      userDetails.Type === KEY_USER_TYPE.parent
        ? parentDetails.ContactId
        : userDetails.ContactId;
    const parentId = curComments[0].ParentId;

    postComments(contactId, reply, parentId)
      .then(res => {
        setComments(prevComments => ({
          ...prevComments,
          [parentId]: [
            ...curComments,
            {
              Comment: reply,
              ParentId: parentId,
              UpdatedOn: dayjs().format(),
            },
          ],
        }));
      })
      .catch(err => {
        console.log('Error post comment: ', err);
      });
  };

  //View table cells
  const SubjectsCell = ({ row, value }) => {
    return (
      <>
        {/* <CommentsCell
          replyEnabled={userDetails?.Type !== KEY_USER_TYPE.student}
          comments={comments[(row?.original?.courseconnectionId)] || []}
          onSubmit={onReply}
        > */}
          <Box className={classes.subjectRow}>
            <StatusIcon status={row?.values?.status} />
            <Typography
              className={classes.subjectTitle}
              onClick={() => {
                console.log(row);
              }}
            >
              {value}
            </Typography>
          </Box>
        {/* </CommentsCell> */}
      </>
    );
  };

  const GradeCell = row => {
    return (
      <>
        <Box className={classes.gradeCell}>
          <GradeIcon
            {...getGradeColor(row?.value)}
            grade={row?.value?.toUpperCase() || notAvailable}
          />
        </Box>
      </>
    );
  };

  //View table columns
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
    // {
    //   Header: 'PERIODIC ASSESSMENT',
    //   Footer: '',
    //   filterable: false,
    //   columns: [
    //     {
    //       Header: `P&P (${gradesColumnsHeaderData?.pp})`,
    //       accessor: 'pp',
    //       Footer: '',
    //       disableSortBy: true,
    //     },
    //     {
    //       Header: `MA (${gradesColumnsHeaderData?.ma})`,
    //       accessor: 'ma',
    //       Footer: '',
    //       disableSortBy: true,
    //     },
    //   ],
    // },
    {
      Header: `Internal Assessment 1`,
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
      Header: `Internal Assessment 2`,
      Footer: '',
      columns: [
        {
          accessor: 'subEn',
          disableSortBy: true,
          Footer: '',
        },
      ],
    },
    {
      Header: `Internal Assessment 3 `,
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          Footer: '',
          accessor: 'exam',
        },
      ],
    },
    {
      Header: 'FINAL EXAM',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'average',
          Footer: info => {
            // Only calculate average if rows change
            const total = React.useMemo(
              () =>
                info?.rows.reduce(
                  (sum, row) => +row?.values?.average + sum,
                  0
                ) / info?.rows?.length,
              [info.rows]
            );

            return (
              <Typography className={classes.footer}>{total || ''}</Typography>
            );
          },
        },
      ],
    },
    {
      Header: 'TOTAL',
      Footer: '',
      columns: [
        {
          accessor: 'totalMarks',
          disableSortBy: true,
          Footer: info => {
            // Only calculate marks visits if rows change
            const total = React.useMemo(
              () =>
                info?.rows?.reduce(
                  (sum, row) => +row?.values?.totalMarks + sum,
                  0
                ),
              [info.rows]
            );

            return (
              <Typography className={classes.footer}>{total || ''}</Typography>
            );
          },
        },
      ],
    },
    // {
    //   Header: 'GRADE',
    //   Footer: '',
    //   columns: [
    //     {
    //       accessor: 'grade',
    //       Cell: GradeCell,
    //       Footer: '',
    //       disableSortBy: true,
    //     },
    //   ],
    // },
  ];

  //Grade Color
  const getGradeColor = grade => {
    return gradeColorPalette?.find(
      palette =>
        palette?.grade?.trim()?.toUpperCase() === grade?.trim()?.toUpperCase()
    );
  };

  // Edit table cells
  const EditableSubjectsCell = row => {
    return (
      <>
        <Box className={classes.subjectRow}>
          <StatusIcon status={row?.row?.values?.Status} />
          <Typography className={classes.subjectTitle}>{row.value}</Typography>
        </Box>
      </>
    );
  };

  const EditableGradeCell = ({ value }) => {
    return (
      <>
        <Box className={classes.textAlignCenter}>
          <GradeIcon
            {...getGradeColor(value)}
            grade={value?.toUpperCase() || notAvailable}
          />
        </Box>
      </>
    );
  };

  const EditableBreakdownCell = row => {
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

  const EditableCommonCell = row => {
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
          break;

        case 'exam':
          if (typeof val === undefined || val?.trim() === '') {
            let allErrors = [...errors];
            let rowErrors = { error: true, errorMessage: 'Required' };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          } else if (+val > data[0]?.examMax) {
            let allErrors = [...errors];
            let rowErrors = {
              error: true,
              errorMessage: `Max value should be less than ${data[0]?.examMax}`,
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
          break;

        default:
          break;
      }
    };

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

  const handleSubEdit = () => {
    setOpenDrawerSubBreakdown(true);
  };

  //Edit table columns
  const editableColumns = [
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
          Cell: EditableSubjectsCell,
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
          Header: () => {
            return (
              <Typography
                className={classes.header}
                onClick={() => {
                  handleEdit();
                }}
              >
                {`P&P (${gradesColumnsHeaderData?.pp})`}
                <img src={AddIcon} />
              </Typography>
            );
          },
          accessor: 'pp',
          Footer: '',
          Cell: EditableBreakdownCell,
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
          Cell: EditableBreakdownCell,
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
                  handleSubEdit();
                }}
              />
            );
          },
          disableSortBy: true,
          accessor: 'subEn',
          Footer: '',
          Cell: EditableCommonCell,
        },
      ],
    },
    {
      Header: `${gradesColumnsHeaderData?.exam} (${data[0]?.examMax || ''}M)`,
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          Footer: '',
          accessor: 'exam',
        },
      ],
    },
    {
      Header: 'TOTAL MARKS (100M)',
      Footer: '',
      columns: [
        {
          disableSortBy: true,
          accessor: 'totalMarks',
          Cell: EditableCommonCell,
          Footer: info => {
            // Only calculate marks visits if rows change
            const total = React.useMemo(
              () =>
                info?.rows?.reduce(
                  (sum, row) => +row?.values?.totalMarks + sum,
                  0
                ),
              [info?.rows]
            );

            return (
              <Typography className={classes.footer}>{total || ''}</Typography>
            );
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
          Cell: EditableCommonCell,
          Footer: info => {
            // Only calculate average if rows change
            const total = React.useMemo(
              () =>
                info?.rows?.reduce(
                  (sum, row) => +row?.values?.average + sum,
                  0
                ) / info?.rows?.length,
              [info?.rows]
            );

            return (
              <Typography className={classes.footer}>{total || ''}</Typography>
            );
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
          Cell: EditableGradeCell,
          Footer: '',
        },
      ],
    },
  ];

  //Update table data
  const updateMyData = (rowIndex, columnId, value, errors) => {
    let allErrors = [...gridErrors];
    let rowErrors = errors[rowIndex];
    allErrors[rowIndex] = rowErrors;
    setScholasticDirty(true);
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
      {edit === true ? (
        <KenGrid
          toolbarDisabled={true}
          columns={editableColumns}
          data={gradeData}
          // pagination={{ disabled: false }}
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
      ) : (
        <KenGrid
          toolbarDisabled={true}
          columns={columns}
          data={data}
          // pagination={{ disabled: false }}
          initialState={{ hiddenColumns: ['status'] }}
          gridProps={{ footerRows: [1] }}
        />
      )}
      {openDrawerBreakdown && (
        <EditBreakdownTable
          data={breakdownData}
          setOpenDrawerBreakdown={setOpenDrawerBreakdown}
          getReportDetails={getReportDetails}
          standard={standard}
        />
      )}

      {openDrawerSubBreakdown && (
        <SubBreakdown
          data={breakdownData}
          setOpenDrawerBreakdown={setOpenDrawerSubBreakdown}
          getReportDetails={getReportDetails}
        />
      )}
    </KenCard>
  );
}
