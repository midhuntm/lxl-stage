import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  useTheme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenHeader from '../../../global_components/KenHeader/index';
import KenButton from '../../../global_components/KenButton/index';
import KenSnackBar from '../../../components/KenSnackbar';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import KenDialogBox from '../../../components/KenDialogBox/index';
import KenGridEditable from '../../../global_components/kenGridEditable/kenGridEditable';
import KenLoader from '../../../components/KenLoader';
import GradebookData from './data.json';
import './styles.scss';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KenInputField from '../../../global_components/KenInputField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getRetestReval, postRetestReval } from '../../../utils/ApiService';
import KenDialog from '../../../global_components/KenDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  header: {
    background: 'transparent',
    color: theme.palette.KenColors.primary,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'end',
  },
  headerBtn: {
    margin: '0 5px',
  },
  leftBox: {
    width: '100%',
    background: '#fff !important',
    padding: '10px',
    overflowY: 'auto',
  },
  RightBox: {
    background: '#fff',
    width: '100%',
    background: '#fff !important',
    padding: '10px',
    position: 'relative',
  },
  sideCardTitle: {
    marginTop: '0px',
    color: '#0077FF',
    fontSize: '14px',
    fontWeight: 600,
  },
  sideCardVal: {
    margin: '0px',
  },
  selectTableCell: {
    textAlign: 'right !important',
  },
  boxTable: {
    width: '100%',
    padding: 20,
    border: '0.6px solid #D7DEE9',
  },
  textContentSpan: {
    // color: '#0077FF',
    fontSize: '12px',
  },
  textContent: {
    color: '#092682',
    fontSize: '12px',
  },
}));
const CollapseData = props => {
  const [rows, setRows] = React.useState([]);
  const classes = useStyles();
  const createData = (id, label, marks, percentage, saved) => ({
    id,
    label,
    marks,
    percentage,
    saved,
  });
  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };
  React.useEffect(() => {
    const collapsedArray = [];
    props?.original?.item.map(item => {
      collapsedArray.push({
        label: item.label,
        marks: item.marks,
        percentage: item.percentage,
      });
    });
    setRows(collapsedArray);
  }, [props]);
  const columnData = ['LABEL', 'MARKS', 'PERCENTAGE', 'ACTIONS'];
  return (
    <Grid container xs={12}>
      <Box
        role="alert"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="row"
        className={classes.boxTable}
      >
        <Grid
          xs={6}
          alignItems="center"
          justifyContent="center"
          style={{ borderRight: '1px solid #D7DEE9' }}
        >
          <Typography className={classes.textContent}>
            {' '}
            Reason for Ineligibility&nbsp; &nbsp; &nbsp;
            <span className={classes.textContentSpan}>Non-Payment of Fees</span>
          </Typography>
          <Typography className={classes.textContent}>
            {' '}
            Link&nbsp; &nbsp; &nbsp;
            <span style={{ color: '#0052FF' }}>
              meet.google.com/cht-ycnx-dmv
            </span>
          </Typography>
        </Grid>
        <Grid
          xs={6}
          alignItems="center"
          justifyContent="center"
          style={{ paddingLeft: 40 }}
        >
          <Typography className={classes.textContent}>
            {' '}
            Result&nbsp; &nbsp; &nbsp;<span>TBD</span>
          </Typography>
          <Typography>
            {' '}
            <span />
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
};
export default function RequestQuestionPaper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([
    {
      id: 1,
      course: 'Test',
      marksObtained: 60,
      answerSheetType: 'Hard Copy',
      reason: 'Wants to apply for revalutions',
      feesApplicable: '300',
      ModeOfExam: 'Offline',
      isRequested: false,
    },
    {
      id: 2,
      course: 'Test1',
      marksObtained: 90,
      answerSheetType: 'Hard Copy',
      reason: 'Wants to apply for revalutions',
      feesApplicable: '250',
      ModeOfExam: 'Offline',
      isRequested: true,
    },
    {
      id: 3,
      course: 'Test3',
      marksObtained: 55,
      answerSheetType: 'Hard Copy',
      reason: 'Wants to apply for revalutions',
      feesApplicable: '600',
      ModeOfExam: 'Offline',
      isRequested: false,
    },
  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  var userDetails = localStorage.getItem('userDetails');
  var object = JSON.parse(userDetails);
  console.log('userDetailsuserDetailsuserDetails', object.ContactId);

  const handleClose = () => {
    setOpen(false);
    // const payload =[{

    // }]
  };
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(
    'Financial Accounting'
  );

  const [selectedObj, setSelectedObj] = React.useState({});
  const [selectedFocus, setSelectedFocus] = React.useState(null);

  const columns = [
    {
      Header: 'Course',
      accessor: 'course',
      disableGlobalFilter: true,
    },
    {
      Header: `Mark's obtained`,
      accessor: `marksObtained`,
      disableGlobalFilter: true,
    },
    {
      Header: 'Answer Sheet Type',
      accessor: 'answerSheetType',
      disableGlobalFilter: true,
    },

    {
      Header: 'Reason',
      accessor: 'reason',
      Cell: ({ value, row }) => {
        return (
          <KenInputField
            id={'input_' + row.id}
            value={data[row.id].reason}
            optionalLabel={false}
            onChange={e => {
              data[row.id].reason = e.target.value;
              setData([...data]);
              setSelectedFocus('input_' + row.id);
              setTimeout(() => {
                document.getElementById('input_' + row.id).focus();
              }, 1);
            }}
            style={{ width: '120px', marginLeft: '95px' }}
          />
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Fees Applicable',
      accessor: 'feesApplicable',
      disableGlobalFilter: true,
    },
    {
      Header: 'Mode Of Exam',
      accessor: 'ModeOfExam',
      disableGlobalFilter: true,
    },

    {
      Header: `Action`,
      accessor: 'action',
      Cell: ({ value, row }) => {
        return (
          <>
            {data[row.id].isRequested === false ? (
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight: '15px',
                  borderRadius: 25,
                  background: '#FC2C32',
                  fontSize: 12,
                  width: 140,
                }}
                className={classes.addButton}
                onClick={() => {
                  setSelectedObj(data[row.id]);
                  handleClickOpen(row);
                }}
              >
                {'Not Requested'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight: '15px',
                  borderRadius: 25,
                  background: `#52C15A`,
                  fontSize: 12,
                  width: 140,
                }}
                className={classes.addButton}
                onClick={() => {
                  toast.info('Already Requested', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                  });
                }}
              >
                {'Requested'}
              </Button>
            )}

            {console.log(
              'selectedObjselectedObjselectedObjselectedObj',
              selectedObj
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-descriptions"
              // sx={{ mt: 2, minWidth: 120 }}
              // style={{ minWidth: '550px' }}
            >
              <DialogTitle
                style={{ backgroundColor: '#0f0c6b', color: '#fff' }}
                className="pop-model-main-title-text"
              >
                Verify the all details before request for question paper{' '}
              </DialogTitle>

              <DialogContent className="pop-up-model-width">
                <DialogContentText
                  style={{ fontWeight: 'bold' }}
                  id="alert-dialog-description"
                  // className="zzzzzzzzzzzzzzzz"
                >
                  {/* <Grid></Grid> */}
                  {/* <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography> Programs:</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography> {selectedObj?.programs}</Typography>
                      </Grid>
                    </Grid> */}
                  {/* <ListItem className="list-item">
                    <span className="pop-up-model-title-text">Programs:</span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.programs}
                    </span>
                  </ListItem> */}
                  {/* <Divider /> */}
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">Course:</span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.course}
                    </span>
                  </ListItem>
                  <Divider />
                  {/* <ListItem className="list-item">
                    <span className="pop-up-model-title-text">Term:</span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.term}
                    </span>
                  </ListItem> */}
                  {/* <Divider /> */}
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">Reason:</span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.reason}
                    </span>
                  </ListItem>
                  <Divider />
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">Marks:</span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.marksObtained}
                    </span>
                  </ListItem>
                  <Divider />{' '}
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">
                      Answer Sheet Type:
                    </span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.answerSheetType}
                    </span>
                  </ListItem>
                  <Divider />{' '}
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">
                      Fees Applicable
                    </span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.feesApplicable}
                    </span>
                  </ListItem>
                  <Divider />{' '}
                  <ListItem className="list-item">
                    <span className="pop-up-model-title-text">
                      Mode Of Exam:
                    </span>{' '}
                    <span className="pop-up-model-main-text ">
                      {' '}
                      &nbsp;&nbsp;&nbsp;{selectedObj?.ModeOfExam}
                    </span>
                  </ListItem>
                  <Divider />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  // onClick={() => onSaveData(selectedObj.courseId)}
                  color="primary"
                >
                  Pay Now &#x20b9; {selectedObj.feesApplicable}
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
      disableGlobalFilter: true,
    },
  ];

  const getReEvalData = () => {
    setLoading(true);
    getRetestReval(object.ContactId)
      .then(res => {
        console.log('resresresresresresres', res);
        const reEvalinfo =
          res[0]?.reEvaluationList === null
            ? []
            : res[0]?.reEvaluationList?.map(item => {
                return {
                  programs: item.programName,
                  course: item.courseName,
                  term: item.termName,
                  reason: item.reason,
                  marksObtained: item.marksObtained,
                  courseId: item.courseId,
                  isTaken: item.isTaken,
                  examRecordId: item.examRecordId,
                  termId: item.termId,
                  examName: item.examName,
                };
              });
        setLoading(false);
        // setData(reEvalinfo);
      })
      .catch(err => {
        setLoading(false);
        console.log({ err });
      });
  };

  const onSaveData = id => {
    console.log('onSaveDataonSaveDataonSaveDataonSaveData', id);

    data.forEach(item => {
      console.log('itemitemitemitemitemitem', item);
      if (item.courseId === id) {
        const payload = {
          retestRevalData: [
            {
              CourseId: id,
              StudentId: object.ContactId,
              TermId: item.termId,
              PreviousMarks: item.marksObtained,
              RetestTermId: null,
              Reason: item.reason,
              TypeOfRecord: 'Revaluation',
            },
          ],
        };

        postRetestReval(payload)
          .then(res => {
            setOpen(false);

            getReEvalData();
            console.log('payloadpayloadpayloadpayload', res);
          })
          .catch(err => {
            console.log('payloadpayloadpayloadpayload', err);
          });
      }
    });
  };

  React.useEffect(() => {
    getReEvalData();
  }, []);

  const handleSelectedCard = (e, item) => {
    setSelectedCard(item.label);
  };
  return (
    <Grid container xs={12}>
      <Grid container xs={12} style={{ padding: '5px' }}>
        <Grid className={classes.RightBox}>
          <KenCard paperStyles={{ padding: 0 }}>
            {loading && <KenLoader />}

            <KenGrid
              columns={columns}
              data={data}
              pagination={{ disabled: true }}
              toolbarDisabled={true}
              isCollasable={false}
            />
          </KenCard>
          <div />
        </Grid>
      </Grid>
    </Grid>
  );
}
