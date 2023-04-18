import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import KenSelectWrap from '../../../global_components/KenSelect';

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
      <LinearProgress variant="determinate" value={row} style={{ margin: 0 }} />
      <Typography variant="span" style={{ alignItems: 'start' }}>
        {num}%
      </Typography>
    </Box>
  );
};

const answerCell = (row) => {
  if (row === 'paid') {
    return (
      <Link to="#">
        https://www.ken42.com/product-faculty#Student-Performance-Management
      </Link>
    );
  }
};
const selectOptionsExam = [
  {
    label: 'Artificial Intelligence',
    value: 'Artificial Intelligence',
  },
  {
    label: 'Phython',
    value: 'phython',
  },
  {
    label: 'Graphic Design',
    value: 'Graphic Design',
  },
];
const selectOptionsTerm = [
  {
    label: 'Term |',
    value: 'Term |',
  },
  {
    label: 'Term ||',
    value: 'Term ||',
  },
  {
    label: 'Term |||',
    value: 'Term |||',
  },
];
const selectOptionsYear = [
  {
    label: '1996',
    value: '1996',
  },
  {
    label: '1997',
    value: '1997',
  },
  {
    label: '2000',
    value: '2000',
  },
];

const PreviousQuestionPaper = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [accordienCheck, setAccordienCheck] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const bodyAccordien = [
    {
      id: 1,
      accordienId: 1,
      title: 'question paper 1',
    },
    {
      id: 2,
      accordienId: 1,
      title: 'question paper 2',
    },
    {
      id: 3,
      accordienId: 1,
      title: 'question paper 3',
    },
    {
      id: 4,
      accordienId: 2,
      title: 'question paper 1',
    },
    {
      id: 5,
      accordienId: 2,
      title: 'question paper 2',
    },
    {
      id: 6,
      accordienId: 2,
      title: 'question paper 3',
    },
  ];
  const [dataAccordien, setAccordienData] = useState(bodyAccordien);
  
  useEffect(() => {
    setDataList(data)
  }, [accordienCheck])
  const accordienCell = (course, id) => {
    return (
      <Accordion
        expanded={expanded === course}
        onChange={handleChange(course)}
        style={expanded === course ? { backgroundColor: '#D7DEE9' } : {}}
      >
        <AccordionSummary
          expandIcon={accordienCheck}
          onClick={() => setAccordienCheck(!accordienCheck)}
        >
          {accordienCheck ? (
            <AiOutlineMinusSquare size={20} />
          ) : (
            <AiOutlinePlusSquare size={20} />
          )}{' '}
          &nbsp;{' '}
          <span style={{ color: '#092682', font: 'Open Sans' }}>{course}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12}>
            <List style={{ backgroundColor: '#fff' }}>
              {dataAccordien.map((ele, i) => {
                if (ele.accordienId == id) {
                  return (
                    <>
                      <ListItem
                        style={{
                          borderBottom: '1px solid grey',
                        }}
                      >
                        <ListItemText
                          // onClick={() => setDesc(e)}
                          primary={ele.title}
                          // secondary={secondary ? 'Secondary text' : null}
                        />
                        <Button
                          size="small"
                          variant="contained"
                          color="dark"
                          style={{ color: '#fff', backgroundColor: 'black' }}
                          // onClick={() => setValue(2)}
                          // component={Link}
                          // to={`${routes.currentProgrammes}/${id}/details`}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          style={{ color: '#fff', backgroundColor: 'black' }}
                          variant="contained"
                          color="dark"
                          // style={{ borderRadius: 5 }}
                          // onClick={() => setValue(2)}
                          // component={Link}
                          // to={`${routes.currentProgrammes}/${id}/details`}
                        >
                          Download
                        </Button>
                      </ListItem>
                    </>
                  );
                }
              })}
            </List>
          </Grid>
        </AccordionDetails>{' '}
      </Accordion>
    );
  };
  const data = [
    {
      id: 1,
      course: accordienCell('Artifical Intelligence', 1),
      term: 'Term ||',
      year: '2000',
    },
    {
      id: 2,
      course: accordienCell('Python', 2),
      term: 'Term ||',
      year: '2000',
    },
    {
      id: 3,
      course: accordienCell('Graphic Design', 3),
      term: 'Term ||',
      year: '2019',
    },
  ];
  const [dataList, setDataList] = useState(data);

  const [selectValueExam, setSelectValueExam] = useState(
    selectOptionsExam[0].value
  );
  const [selectValueTerm, setSelectValueTerm] = useState(
    selectOptionsTerm[0].value
  );
  const [selectValueYear, setSelectValueYear] = useState(
    selectOptionsYear[0].value
  );
  
  
  console.log('state', selectValueYear, selectValueExam, selectValueTerm);
  const handleSelectChangeExam = (e) => {
    setSelectValueExam(e.target.value);
  };
  const handleSelectChangeTerm = (e) => {
    setSelectValueTerm(e.target.value);
  };
  const handleSelectChangeYear = (e) => {
    setSelectValueYear(e.target.value);
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
          Course
        </Typography>
      ),
      accessor: 'course',
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
          Year
        </Typography>
      ),
      accessor: 'year',
      disableGlobalFilter: true,
    },
  ];

  const handleExam = () => {
    let obj ={
      id: 4,
      course: accordienCell(selectValueExam, 4),
      term: selectValueTerm,
      year: selectValueYear,
    }
    setDataList((pre) => [...pre, obj])
  }
 

  return (
    <Box className="cardlsitbox">
      <Typography variant="h6" className={classes.title}>
        Exam Fees
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            label="Select Type of Exam"
            options={selectOptionsExam}
            value={selectValueExam}
            dropdownColor="#FFFFFF"
            onChange={handleSelectChangeExam}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            label="Select Term"
            options={selectOptionsTerm}
            value={selectValueTerm}
            dropdownColor="#FFFFFF"
            onChange={handleSelectChangeTerm}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            label="Select Year"
            options={selectOptionsYear}
            value={selectValueYear}
            dropdownColor="#FFFFFF"
            onChange={handleSelectChangeYear}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="primary" onClick={() => handleExam()}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <KenCard elevation={0}>
        <KenGrid
          columns={columns}
          data={dataList}
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

export default PreviousQuestionPaper;
