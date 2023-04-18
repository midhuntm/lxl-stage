import { Box, Link, Typography } from '@material-ui/core'
import React from 'react'
import KenCard from '../../../global_components/KenCard'
import KenGrid from '../../../global_components/KenGrid'
import { MdEventSeat } from 'react-icons/md';
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
    marginLeft: '4px'
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px'
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

const ExamSchedule = () => {
  const classes = useStyles();
  const columns = [
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      #
    </Typography>,
      accessor: 'id',
      disableGlobalFilter: true,
    },
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      Subject
    </Typography>,
      accessor: 'subject',
      disableGlobalFilter: true,
    },
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      Date
    </Typography>,
      accessor: 'date',
      disableGlobalFilter: true,
    },
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      Time
    </Typography>,
      accessor: 'time',
      disableGlobalFilter: true,
    },
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      Seating Plan
    </Typography>,
      accessor: 'seating_plan',
      disableGlobalFilter: true,
    },
    {
      Header: <Typography variant="h6" className={classes.headTitle}>
      Link
    </Typography>,
      accessor: 'link',
      disableGlobalFilter: true,
    },
  ];
  
  const data = [
    {
      id: 1,
      subject: 'Tamil',
      date: '14th Jan 2022',
      time: '10:00 AM to 1:00 PM',
      seating_plan: <MdEventSeat size={20} />,
      link: <Link to='#'>meet.google.com/krn-hack-dxh</Link>,
    },
    {
      id: 2,
      subject: 'English',
      date: '17th Jan 2022',
      time: '10:00 AM to 1:00 PM',
      seating_plan: <MdEventSeat size={20} />,
      link: <Link to='#'>meet.google.com/krn-hack-dxh</Link>,
    },
    {
      id: 3,
      subject: 'Hindi',
      date: '18th Jan 2022',
      time: '10:00 AM to 1:00 PM',
      seating_plan: <MdEventSeat size={20} />,
      link: <Link to='#'>meet.google.com/krn-hack-dxh</Link>,
    },
    {
      id: 4,
      subject: 'Social Science',
      date: '19th Jan 2022',
      time: '10:00 AM to 1:00 PM',
      seating_plan: <MdEventSeat size={20} />,
      link: <Link to='#'>meet.google.com/krn-hack-dxh</Link>
    },
  ];

  return (
    <Box className="cardlsitbox">
       <Typography variant="h6" className={classes.title}>
            Exam Schedule
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
  )
}

export default ExamSchedule