import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
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
}));
const payment = (row) => {
  if (row === 'paid') {
    return 'Paid';
  } else {
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15, marginLeft: '10px' }}
        // component={Link}
        // to={`${routes.currentProgrammes}/${id}/details`}
      >
        Pay Now
      </Button>
    );
  }
};
const ExamFees = () => {
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
          Term
        </Typography>
      ),
      accessor: 'term',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Payment Status
        </Typography>
      ),
      accessor: 'payment_status',
      disableGlobalFilter: true,
    },
  ];

  const data = [
    {
      id: 1,
      term: 'Term ||',
      payment_status: payment('paid'),
    },
    {
      id: 2,
      term: 'Term |||',
      payment_status: payment('not paid'),
    },
  ];
  return (
    <Box className="cardlsitbox">
      <Typography variant="h6" className={classes.title}>
        Exam Fees
      </Typography>
      <KenCard elevation={0}>
        <KenGrid
          columns={columns}
          data={data}
          pagination={{ disabled: true }}
          toolbarDisabled={true}
          // initialState={{
          //   hiddenColumns: ['id'],
          // }}
        />
      </KenCard>
    </Box>
  );
};

export default ExamFees;
