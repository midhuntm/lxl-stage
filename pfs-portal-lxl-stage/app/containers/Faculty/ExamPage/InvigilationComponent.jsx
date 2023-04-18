import { Box, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiChat } from 'react-icons/bi';
import ChatSection from './chatSection';
// import ChatSection from '../../../../AdminPortal/Exam/QuestionPaper/ChatSection';

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
const venueCells = (row) => {
  return (
    <Box>
      <Typography>Room {row}</Typography>
    </Box>
  );
};
const venueCell = (row) => {
  if (row == 'btn') {
    return (
      <Box>
        <Typography>Room 1</Typography>
        {/* <Button
          size="small"
          variant="contained"
          color="primary"
          style={{ borderRadius: 15 }}
          // component={Link}
          // to={`${routes.currentProgrammes}/${id}/details`}
        >
          View
        </Button>
        <Button
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
  } else {
    return <Link to="#">meet.google.com/krn-hack-dxh</Link>;
  }
};


const ActionCells = (row) => {
  if (row === 'Not Eligible') {
    return (
      <Box>
        <BsFillEnvelopeFill size={20} />
      </Box>
    );
  }
};
const Status = (row) => {
  if (row === 'Eligible') {
    return <p style={{ color: '#219653' }}>{row}</p>;
  } else {
    return <p style={{ color: '#D61E04' }}>{row}</p>;
  }
};

const Reason = (row) => {
  if (row === 'Eligible') {
    return <p>Elligible for Exam</p>;
  } else {
    return <p>At risk due to low attendance</p>;
  }
};
const InvigilationComponent = () => {
  const classes = useStyles();
  const [togglePage, setTogglePage] = useState(true);

  const ActionCell = (row) => {
    return <BiChat size={20} onClick={() => setTogglePage(false)} />;
  };
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
          Subject
        </Typography>
      ),
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Duration
        </Typography>
      ),
      accessor: 'duration',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Date & Time
        </Typography>
      ),
      accessor: 'date_time',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Venue
        </Typography>
      ),
      accessor: 'venue',
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
      term: 'Term 1',
      subject: 'Artifical Intelligence',
      duration: ' 1 hour',
      date_time: '22 jan 2021 11:00 AM',
      venue: venueCell('link'),
      action: ActionCell('1'),
    },
    {
      id: 2,
      term: 'Term 2',
      subject: 'Python',
      duration: '4 hour',
      date_time: '22 jan 2021 11:00 AM',
      venue: venueCell('btn'),
      action: ActionCell('1'),
    },
  ];

  const columnsSecond = [
    // {
    //   Header: (
    //     <Typography variant="h6" className={classes.headTitle}>
    //       #
    //     </Typography>
    //   ),
    //   accessor: 'id',
    //   disableGlobalFilter: true,
    // },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Term
        </Typography>
      ),
      accessor: 'term1',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Subject
        </Typography>
      ),
      accessor: 'subject1',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Duration
        </Typography>
      ),
      accessor: 'duration',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Date & Time
        </Typography>
      ),
      accessor: 'date_time1',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Venue
        </Typography>
      ),
      accessor: 'venue1',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Chat History
        </Typography>
      ),
      accessor: 'action1',
      Cell: ActionCell,
    },
  ];

  const dataSecond = [
    {
      id: 1,
      term1: 'Term 1',
      subject1: 'Graphic Design',
      duration: '2 hour',
      date_time1: '22 jan 2021 11:00 AM',
      venue1: venueCells(1),
      action1: '14th Jan 2022',
    },
    {
      id: 2,
      term1: 'Term 2',
      subject1: 'UX/UI Design',
      duration: '2 hour',
      date_time1: '22 jan 2021 11:00 AM',
      venue1: venueCells(2),
      action1: '14th Jan 2022',
    },
  ];
  return (
    <>
      {togglePage ? <Box className="cardlsitbox">
        <Typography variant="h6" className={classes.title}>
        Invigilation
        </Typography>
        <KenCard elevation={0}>
          <KenGrid
            columns={columns}
            data={data}
            pagination={{ disabled: true }}
            toolbarDisabled={true}
            initialState={{
              hiddenColumns: ['id'],
            }}
          />
        </KenCard>

        <Typography variant="h6" style={{ marginTop: '15px'}} className={classes.title}>
        Invigilation & Proctoring History
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
        </KenCard>
      </Box> :<ChatSection />}
    </>
  );
};

export default InvigilationComponent;
