import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import KenHeader from '../../../../global_components/KenHeader';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  subHeaderTitle: {
    width: '100%',
  },
  addButton: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      borderBottom: '1px solid white',
    },
  },
  mainActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0 1rem',
  },
  error: {
    color: '#FFFFFF',
    background: '#EB5757',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  normal: {
    color: '#FFFFFF',
    background: '#27AE60',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  publishGenerate: {
    color: '#FFFFFF',
    background: '#979797',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  publishView: {
    color: '#FFFFFF',
    background: '#F2994A',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  Blue: {
    color: '#FFFF',
    background: '#03248F',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  Green: {
    color: '#FFFF',
    background: '#27AE60',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  medium: {
    color: '#FFFFFF',
    background: '#F2994A',
    width: '102px',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
  },
  errorText: {
    color: '#F14B2D',
  },
  greenText: {
    color: '#27AE60',
  },
  gridKenClass: {
    '&  table tbody tr td ': {
      padding: '5px',
    },
    '&  table thead tr th ': {
      fontWeight: 'bold',
      color: '#061938',
    },
  },
  headBox: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    borderRadius: '5px',
    boxShadow:'0px 0px 9px #d6e0ff'
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
}));
const HallTicket = () => {
  const classes = useStyles();

  const columns = [
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Case Number
        </Typography>
      ),
      accessor: 'caseNo',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Service Type
        </Typography>
      ),
      accessor: 'serviceType',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          DATE
        </Typography>
      ),
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          STATUS
        </Typography>
      ),
      accessor: 'status',
    },
  ];

  const data = [
    {
      caseNo: 1234,
      serviceType: 'Sub-Type 1',
      date: '29/12/2021',
      status: 'Active',
    },
    {
      caseNo: 1234,
      serviceType: 'Sub-Type 2',
      date: '29/12/2021',
      status: 'Inactive',
    },
    {
      caseNo: 1234,
      serviceType: 'Sub-Type 1',
      date: '29/12/2021',
      status: 'Active',
    },
    {
      caseNo: 1234,
      serviceType: 'Sub-Type 2',
      date: '29/12/2021',
      status: 'Inactive',
    },
  ];

  return (
    <Box className="cardlsitbox">
      <Grid item md={12}>
                <Box mt={2}  className={classes.headBox} autoPageSize>
                  <Box >
                    <KenHeader
                      title={
                        <Typography className={classes.heading}>
                          {'CASES'}
                        </Typography>
                      }
                      >
                    </KenHeader>
                  </Box>
                </Box>
         </Grid>  
      <KenCard elevation={0}
      paperStyles={{marginTop:0}}>
        <KenGrid
          columns={columns}
          data={data}
          pagination={{ disabled: true }}
          toolbarDisabled={true}
        />
      </KenCard>
    </Box>
  );
};

export default HallTicket;
