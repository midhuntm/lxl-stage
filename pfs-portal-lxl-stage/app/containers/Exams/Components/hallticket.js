import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';

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
const ActionCell = (row) => {
  const { id } = row.row.values;
  return (
    <Box>
      {/* <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15 }}
        // component={Link}
        // to={`${routes.currentProgrammes}/${id}/details`}
      >
        View
      </Button> */}
<VisibilityIcon   color="primary"/>
<GetAppIcon   color="primary"/>
      {/* <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15, marginLeft: '10px' }}
        // component={Link}
        // to={`${routes.currentProgrammes}/${id}/details`}
      >
        Download
      </Button> */}
    </Box>
  );
};


const ActionCells = (row) => {
  if(row === 'Not Eligible') {
    return (
      <Box>
        <BsFillEnvelopeFill size={20} />
      </Box>
    );
  }
 
};
const Status = (row) => {
  if(row === 'Eligible') {
    return <p style={{color: '#219653'}}>{row}</p>
  } else {
    return <p style={{color: '#D61E04'}}>{row}</p>
  }
}

const Reason = (row) => {
  if(row === 'Eligible') {
    return <p>Elligible for Exam</p>
  } else {
    return <p>At risk due to low attendance</p>
  }
}
const HallTicket = () => {
  const classes = useStyles();

  const columns = [
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          SL NO
        </Typography>
      ),
      accessor: 'id',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          EXAM TYPE
        </Typography>
      ),
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
        Header: (
          <Typography variant="h6" className={classes.headTitle}>
           TERM
          </Typography>
        ),
        accessor: 'term',
        disableGlobalFilter: true,
      },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Action
        </Typography>
      ),
      accessor: 'action',
      Cell: ActionCell,
    },
  ];

  const data = [
    {
      id: 1,
      subject: 'MID TERM',
      term : 'III',
      action: '14th Jan 2022',
    },
    {
        id: 2,
        subject: 'FINAL',
        term : 'IV',
        action: '14th Jan 2022',
    },
    {
      id: 2,
      subject: 'MID TERM',
      term : 'III',
      action: '17th Jan 2022',
    },
  ];

  const columnsSecond = [
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
          Subject
        </Typography>
      ),
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Status
        </Typography>
      ),
      accessor: 'status',
      disableGlobalFilter: true,
    },  
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Reason
        </Typography>
      ),
      accessor: 'reason',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Action
        </Typography>
      ),
      accessor: 'action',
    },
  ];

  const dataSecond = [
    {
      id: 1,
      subject: 'Tamil',
      action: '14th Jan 2022',
      status: Status('Eligible'),
      reason: Reason('Eligible'),
      action: ActionCells('Eligible')
    },
    {
      id: 2,
      subject: 'English',
      action: '17th Jan 2022',
      status: Status('Not Eligible'),
      reason: Reason('Not Eligible'),
      action: ActionCells('Not Eligible')
    },
  ];
  return (
    <Box className="cardlsitbox">
      {/* <Typography  ography variant="h6" className={classes.title}>
        Hall Tickets
      </Typography> */}
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

      {/* <Typography  ography variant="h6" className={classes.title}>
      Eligibility Status
      </Typography>
      <KenCard elevation={0}>
        <KenGrid
          columns={columnsSecond}
          data={dataSecond}
          pagination={{ disabled: true }}
          toolbarDisabled={true}
          // initialState={{
          //   hiddenColumns: ['id'],
          // }}
        />
      </KenCard> */}
    </Box>
  );
};

export default HallTicket;
