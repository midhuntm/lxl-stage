import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
// import CardDetail from '../../../../components/CardWidgets/card';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  boxMargin: {
    marginLeft: 16,
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: 0,
    },
  },
  root: {
    // display: 'flex',
    minWidth: '34vw',
    height: 104,
    // padding: 16,
    margin: '16px 0px 0px 0',
    boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
    borderRadius: 3,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
    padding: 10,
    borderBottom: '1px solid #F4F5F7',
    color:'#03248F',
    textTransform:'uppercase'
  },
  details: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '48px',
    lineHeight: '48px',
  },
  percent: {
    fontSize: '40px',
    color:'#03248F'
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
 
}));
export default function GraphCard(props) {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = [
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          SUbject Type
        </Typography>
      ),
      accessor: 'subjectType',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Subject
        </Typography>
      ),
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
        Header: (
          <Typography variant="h6" className={classes.headTitle}>
          Credits
          </Typography>
        ),
        accessor: 'credits',
        disableGlobalFilter: true,
      },
  ];

  const tabData = [
    {
      subjectType: "Major",
      subject: 'Finanace',
      credits : '100/180'
    },
    {
        subjectType: "Minor",
        subject: 'Economics',
        credits : '50/90'
    },
  ];
  return (
    <Grid container spacing={3}  >
    <Grid item xs={12} sm={12} md={12}>
     <Paper elevation={0} className={classes.root}>
     <Grid item >
     <Typography className={classes.title}>{'Credits Completed'}</Typography>
     </Grid>
     <Grid item style={{textAlign:'center'}}>
        <Typography  className={classes.details}  color="primary" >
             <span className={classes.percent}>100/180</span>
          </Typography>
      </Grid>
    </Paper>
    </Grid>

    {/* <Grid item xs={12} sm={12} md={12}>
     <Paper elevation={0} className={classes.root}>
     <Grid item >
     <Typography className={classes.title}>{'Campus Pathway'}</Typography>
     </Grid>
     <Grid item>
    </Grid>
    </Paper>
    </Grid> */}

    <Grid item xs={12} sm={12} md={12}>
     <Paper elevation={0} className={classes.root}>
     <Grid item >
     <Typography className={classes.title}>{'Major/Minor'}</Typography>
     </Grid>
     <Grid item>
      <KenCard elevation={0}>
        <KenGrid
          columns={columns}
          data={tabData}
          pagination={{ disabled: true }}
          toolbarDisabled={true}
          // initialState={{
          //   hiddenColumns: ['id'],
          // }}
        />
      </KenCard>
    </Grid>
    </Paper>
    </Grid>
    </Grid>
  );
}
