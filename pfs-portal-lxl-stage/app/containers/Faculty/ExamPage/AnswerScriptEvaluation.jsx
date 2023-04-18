import { Box, Button, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

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
  progressBarBox: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: '#E5E5E5',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#27AE60',
    },
  },
}));

const answerCell = row => {
  if (row === 'paid') {
    return (
      <Link to="#">
        https://www.ken42.com/product-faculty#Student-Performance-Management
      </Link>
    );
  }
};
const AnswerScriptEvaluation = () => {
  const classes = useStyles();
  const payment = (row, num) => {
    const progressStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      color: num > 0 ? '#27AE60' : '#EF4060',
    };

    return (
      <Box style={progressStyle}>
        <Typography variant="span" style={{ alignItems: 'start' }}>
          {row}
        </Typography>
        <Box className={classes.progressBarBox}>
          <LinearProgress
            variant="determinate"
            value={row}
            style={{ margin: 0 }}
          />
        </Box>
        <Typography variant="span" style={{ alignItems: 'start' }}>
          {num}%
        </Typography>
      </Box>
    );
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
          Program
        </Typography>
      ),
      accessor: 'program',
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
          Term
        </Typography>
      ),
      accessor: 'term',
      disableGlobalFilter: true,
    },

    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          {/* Answer script */}
          Number of Answer Script
        </Typography>
      ),
      accessor: 'answer',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          status
        </Typography>
      ),
      accessor: 'status',
      disableGlobalFilter: true,
    },
  ];

  const data = [
    {
      id: 1,
      program: 'GMBA',
      subject: 'Artifical Intelligence',
      term: 'Term 1',
      subject: <Link to={`/faculty-subject`}>Artifical Intelligence</Link>,
      // subject: payment('paid'),
      answer: 20,
      status: payment('Completed', 100),
    },
    {
      id: 2,
      program: 'EMBA',
      subject: 'Python',
      term: 'Term 2',
      subject: <Link to={`/faculty-subject`}>Maths</Link>,
      // subject: payment('paid'),
      answer: 40,
      // answer: answerCell('paid'),
      status: payment('Inprogress', 60),
    },
  ];
  return (
    <Box className="cardlsitbox">
      <Typography variant="h6" className={classes.title}>
        LIST OF EXAMS
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
    </Box>
  );
};

export default AnswerScriptEvaluation;
