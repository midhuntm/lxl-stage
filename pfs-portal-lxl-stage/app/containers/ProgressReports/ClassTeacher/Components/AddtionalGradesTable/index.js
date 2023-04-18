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
import { KEY_USER_TYPE } from '../../../../../utils/constants';
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

export default function AdditionalGradesTable(props) {
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
  const notAvailable = '--';
  const [openDrawerSubBreakdown, setOpenDrawerSubBreakdown] = useState(false);
  const [tIndex, setTIndex] = useState();

  React.useEffect(() => {
    console.log('Grades Data change: ', gradeData);
    getValidations(inputError);
    // getGradeData(gradeData);
  }, [gradeData]);

  React.useEffect(() => {
    setGradeData(data);
    setTIndex(tabIndex);
  }, [data, tabIndex]);

  React.useEffect(() => {
    const arr = scholastic.map((el, index) => {
      if (index === tIndex) {
        el.additionalGrades = gradeData;
      }
      return el;
    });
    getGradeData(arr);
  }, [data]);

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
        <CommentsCell
          replyEnabled={userDetails?.Type !== KEY_USER_TYPE.student}
          comments={comments[(row?.original?.courseconnectionId)] || []}
          onSubmit={onReply}
        >
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
        </CommentsCell>
      </>
    );
  };

  const GradeCell = row => {
    return (
      <>
        <Box className={classes.gradeCell}>
          <GradeIcon
            {...getGradeColor(row.value)}
            grade={row.value?.toUpperCase()}
          />
        </Box>
      </>
    );
  };

  //View table columns
  const columns = [
    {
      Header: 'SUBJECT',
      Footer: '',
      accessor: 'subjectName',
    },
    {
      Header: 'TOTAL MARKS(100M)',
      Footer: '',
      accessor: 'subjectMark',
    },
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
          <GradeIcon {...getGradeColor(value)} grade={value?.toUpperCase()} />
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
        case 'subjectMark':
          if (typeof val === undefined || val?.trim() === '') {
            let allErrors = [...errors];
            let rowErrors = { error: true, errorMessage: 'Required' };
            allErrors[index] = rowErrors;
            setErrors(allErrors);
          } else if (+val > 100) {
            let allErrors = [...errors];
            let rowErrors = {
              error: true,
              errorMessage: 'Max value should be less than 100',
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

  //Edit table columns
  const editableColumns = [
    {
      Header: 'SUBJECT',
      Footer: '',
      accessor: 'subjectName',
      Cell: EditableCommonCell,
    },
    {
      Header: 'TOTAL MARKS(100M)',
      Footer: '',
      accessor: 'subjectMark',
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
            // footerRows: [1],
            updateMyData: updateMyData,
            defaultColumn: defaultColumn,
            // headerVisible: false,
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
          // gridProps={{ headerVisible: false }}
        />
      )}
    </KenCard>
  );
}
