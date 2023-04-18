import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  useTheme,
  Box,
  CircularProgress,
} from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
//Global Components
import KenHeader from '../../../../global_components/KenHeader/index';
import KenButton from '../../../../global_components/KenButton/index';
import KenSnackBar from '../../../../components/KenSnackbar';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import KenGridEditable from '../../../../global_components/kenGridEditable/kenGridEditable';
import KenLoader from '../../../../components/KenLoader';
import CurrentData from './data.json';
//  import '../style.css';
import KenSelect from '../../../../global_components/KenSelect';

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
  sessionBoxes__wrap: {},
  sessionBoxes: {
    width: '150px',
    height: 69,
    border: '1px solid #092682',
    marginRight: 20,
    textAlign: 'center',
  },
  session__subtext: {
    margin: 0,
  },
}));
export default function GradeBook(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [currentMonth, setCurrentMonth] = React.useState('Select');

 

  const columns = [
  
    {
      Header: 'DATE',
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: 'REASON',
      accessor: 'reason',
      disableGlobalFilter: true,
    },
  ];

  React.useEffect(() => {
    const data = [];
    CurrentData['Current Components'].map(item => {
      data.push({
        subjectName: item.subjectName,
        date: item.date,
        reason: item.reason,
      });
    });
    setData(data);
  }, []);
  const months = [
    { label: 'Select', value: 'Select' },
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];
  const changeLang = e => {
    setCurrentMonth(e.target.value);
  };
  return (
    <Grid container xs={12}>
      {loading && <KenLoader />}
      <Grid
        container
        xs={12}
        className={classes.wrapper_content}
        style={{
        //   padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Grid style={{ width: '40%',paddingLeft:16,display:'flex' }}>
        <Grid style={{marginRight:10,width:"25%"}}>
          <KenSelect
            value={currentMonth || []}
            onChange={changeLang}
            options={months}
            placeholder={'Select'}
            required={true}
            label="Select Month"
            
          />
          </Grid>
          <Grid style={{marginRight:10,width:"25%"}}>
          <KenSelect
            value={currentMonth || []}
            onChange={changeLang}
            options={months}
            placeholder={'Select'}
            required={true}
            label="Select Month"
          />
          </Grid>
          <Grid style={{marginRight:10,width:"25%"}}>
          <KenSelect
            value={currentMonth || []}
            onChange={changeLang}
            options={months}
            placeholder={'Select'}
            required={true}
            label="Select Subject"
          />
          </Grid>
        </Grid>
        <Grid style={{ display: 'flex' }}>
          <div className={classes.sessionBoxes}>
            <Typography>Sessions</Typography>
            <h2 className={classes.session__subtext}>200</h2>
          </div>
          <div className={classes.sessionBoxes}>
            <Typography>Absent Sessions</Typography>
            <h2 className={classes.session__subtext}>200</h2>
          </div>
          <div className={classes.sessionBoxes}>
            <Typography>Total Attendance</Typography>
            <h2 className={classes.session__subtext}>90%</h2>
          </div>
        </Grid>
      </Grid>

      <Grid container xs={12} >
        <Grid className={classes.RightBox}>
          <KenCard paperStyles={{ padding: 0 }}>
            <KenGrid
              columns={columns}
              data={data}
              pagination={{ disabled: true }}
              toolbarDisabled={true}
              isCollasable={false}
            />
          </KenCard>
        </Grid>
      </Grid>
    </Grid>
  );
}
