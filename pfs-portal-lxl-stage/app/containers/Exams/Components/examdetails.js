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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenHeader from '../../../global_components/KenHeader/index';
import KenButton from '../../../global_components/KenButton/index';
import KenSnackBar from '../../../components/KenSnackbar';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import KenGridEditable from '../../../global_components/kenGridEditable/kenGridEditable';
import KenLoader from '../../../components/KenLoader';
import GradebookData from './data.json';
 import './styles.scss';
 import VisibilityIcon from '@material-ui/icons/Visibility';

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
    position:"relative"
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
  selectTableCell:{
      textAlign: 'right !important'
  },
  boxTable:{
    width:'100%',
    padding:20,
    border:'0.6px solid #D7DEE9'
  },
  textContentSpan:{
    // color: '#0077FF',
    fontSize: '12px',
  },
  textContent:{
    color:'#092682',
    fontSize: '12px',
  }
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
    console.log('new-->', e, row, value, name, id);
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };
  React.useEffect(() => {
    console.log('*** Props', props);
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
  <Grid xs={6}
  alignItems="center"
  justifyContent="center" style={{borderRight:'1px solid #D7DEE9'}}>
 <Typography className={classes.textContent}> Reason for Ineligibility&nbsp; &nbsp; &nbsp;<span className={classes.textContentSpan}>Non-Payment of Fees</span></Typography>
 <Typography className={classes.textContent}> Link&nbsp; &nbsp; &nbsp;<span style={{color:'#0052FF'}}>meet.google.com/cht-ycnx-dmv</span></Typography>
 </Grid>
 <Grid xs={6}
  alignItems="center"
  justifyContent="center" style={{paddingLeft:40}}>
 <Typography className={classes.textContent}> Result&nbsp; &nbsp; &nbsp;<span>TBD</span></Typography>
 <Typography> <span></span></Typography>
 </Grid>
</Box>
      {/* <Table className={classes.table} aria-label="caption table">
        <TableBody>
          {rows?.map(row => {
            return (
              <TableRow key={row.id}>
                <KenGridEditable
                  {...{
                    row,
                    onChange,
                    columns: [
                      {
                        column_name: 'label',
                        is_inline_edit: false,
                        label: 'Label',
                      },
                      {
                        column_name: 'marks',
                        is_inline_edit: false,
                        inline_edit_type: '',
                        label: 'Marks',
                      },
                      {
                        column_name: 'percentage',
                        is_inline_edit: true,
                        inline_edit_type: 'kenInput',
                        label: 'Percentage',
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
      </Table> */}
    </Grid>
  );
};
export default function GradeBook(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(
    'Financial Accounting'
  );

  const columns = [
    {
      Header: 'EXAM',
      accessor: 'exam',
      disableGlobalFilter: true,
    },
    {
      Header: 'DATE',
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: 'TIME(IST)',
      accessor: 'time',
      disableGlobalFilter: true,
    },
    {
      Header: 'SEATING PLAN',
      accessor: 'seatingPlan',
      Cell: ({ value, row }) => {
        return (
          <Typography className={classes.studentAttendance}>
            {/* {value} / {row?.original?.FacultyAttendance} */}<VisibilityIcon color='primary'/>
          </Typography>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'ELIGIBILITY',
      accessor: 'eligiblity',
      Cell: ({ value, row }) => {
        return (<>
         
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '15px',borderRadius:25, background:`${value === 'Not eligible'? '#FC2C32': '#52C15A' }`,fontSize:12 ,width:120}}
            className={classes.addButton}
            onClick={() => onToggleEditMode(row.id)}
          >
            {value}
          </Button>
        </>);
      },
      disableGlobalFilter: true,
    },
   
  ];

  React.useEffect(() => {
    const data = [];
    const data2 = [];
    const data3 = [];
    GradebookData['Grading Components'].map(item => {
      data.push({
        // GradeComponent: item.label,
        // Percentage: item.percentage,
        // item: item.data,
        exam:item.exam,
        date:item.date,
        time:item.time,
        eligiblity:item.eligiblity,
        seatingPlan:item.seatingPlan,
        item: item.data,
      });
    });
    setData(data);
    GradebookData['Grade Points'].map(item => {
      data2.push({
        'Grade Name': item['Grade Name'],
        Range: item['Range'],
        'Grade Point': item['Grade Point'],
      });
    });
    setData2(data2);
    GradebookData['Subjects'].map(item => {
      data3.push({
        label: item.label,
        SubjectCode: item.SubjectCode,
        Credits: item.Credits,
      });
    });
    setData3(data3);
  }, []);
  const handleSelectedCard = (e, item) => {
    setSelectedCard(item.label);
  };
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <Grid container xs={12} style={{ padding: '5px' }}>
        <Grid className={classes.RightBox}>
          <KenCard paperStyles={{ padding: 0 }}>
            <KenGrid
              columns={columns}
              data={data}
              pagination={{ disabled: true }}
              toolbarDisabled={true}
              isCollasable={true}
              component={CollapseData}
              gridProps={{
                getRowProps: row => ({
                  isCollasable: true,
                }),
                getHeaderProps: cell => ({
                  style: {
                    textAlign:
                      cell.id === 'exam' ? 'left' : 'column',
                      paddingLeft:cell.id === 'exam' ? '100px' : '0px',
                  },
              }),
                getCellProps: cell => ({
                  style: {
                    textAlign:
                      cell.column.id === 'exam' ? 'left' : 'column',
                  },
                }),
              }}
            />
          </KenCard>
          <div >
                            {/* <KenButton
                                className={classes.btnLabels} onClick={onSubmit}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Next')}
                            </KenButton> */}
                            <KenButton
                                className={classes.btnLabels} onClick={''}
                                variant="primary" style={{ height: 36, marginRight: "10px",float:'right',marginTop:10,width:120 }}>
                                {'View Result'}
                            </KenButton>
                            {/* <KenButton
                                className={classes.btnLabels} onClick={onSubmit}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Edit')}
                            </KenButton> */}
                        </div>
         
        </Grid>
      </Grid>
    </Grid>
  );
}
