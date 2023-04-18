import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import { makeStyles } from '@material-ui/styles';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiChat } from 'react-icons/bi';
// import ChatSection from '../../AdminPortal/Exam/QuestionPaper/ChatSection';
import PreviousQuestionPaper from './PreviousQuestionPaper';
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import ChatSection from './chatSection';

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
    whiteSpace: 'nowrap',
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
const venueCells = row => {
  return (
    <Box>
      <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15 }}
        // component={Link}
        // to={`${routes.currentProgrammes}/${id}/details`}
      >
        View
      </Button>
    </Box>
  );
};
const venueCell = row => {
  if (row == 'btn') {
    return (
      <Box>
        <Button
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
        </Button>
      </Box>
    );
  } else {
    return <Link to="#">meet.google.com/krn-hack-dxh</Link>;
  }
};

const ActionCells = row => {
  if (row === 'Not Eligible') {
    return (
      <Box>
        <BsFillEnvelopeFill size={20} />
      </Box>
    );
  }
};
const Status = row => {
  if (row === 'Eligible') {
    return <p style={{ color: '#219653' }}>{row}</p>;
  } else {
    return <p style={{ color: '#D61E04' }}>{row}</p>;
  }
};

const Reason = row => {
  if (row === 'Eligible') {
    return <p>Elligible for Exam</p>;
  } else {
    return <p>At risk due to low attendance</p>;
  }
};

const QuestionPaperComponent = () => {
  const [accordienCheck, setAccordienCheck] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
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
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = useStyles();
  const [value, setValue] = useState(1);
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
              {bodyAccordien.map((ele, i) => {
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
  const ActionCell = row => {
    switch (row) {
      case 'InProgress':
        return (
          <Typography
            style={{
              color: '#fff',
              background: '#FC2C32',
              borderRadius: '25px',
              fontSize: '15px',
              margin: '12px  12px',
              width: '38%',
              // width: '101px',
              height: '24px',
              // height: '100%',
              // color: '#c12002',
            }}
          >
            {row}
          </Typography>
        );
      case 'Submitted for approval':
        return (
          <div>
          <Typography
            style={{
              color: '#fff',
              background: '#52C15A',
              borderRadius: '25px',
              fontSize: '15px',
              margin: '12px  12px',
              width: '38%',
              // width: '200px',
              height: '24px',
              // height: '100%',
            }}
          >
            {row}
          </Typography>
          </div>
        );
      default:
        return (
          <Typography
            style={{
              color: '#fff',
              background: 'rgba(242, 153, 74, 1)',
              borderRadius: '25px',
              fontSize: '15px',
              margin: '12px  12px',
              // width: '180px',
              width: '38%',
              height: '24px',
              // height: '100%',
            }}
          >
            {row}
          </Typography>
        );
    }
  };
  const columns = [
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
          Subject
        </Typography>
      ),
      accessor: 'course',
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
          Term
        </Typography>
      ),
      accessor: 'term',
      disableGlobalFilter: true,
    },
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Status
        </Typography>
      ),
      accessor: 'action',
    },
  ];

  const data = [
    {
      id: 1,
      course: 'Artifical Intelligence',
      program: 'GMBA',
      term: 'Term 1',
      action: ActionCell('InProgress'),
    },
    {
      id: 2,
      course: 'Python',
      program: 'EMBA',
      term: 'Term 2',
      action: ActionCell('Submitted for approval'),
    },
    {
      id: 3,
      course: 'Graphic Design',
      program: 'BBA',
      term: 'Term 3',
      action: ActionCell('Revision Request'),
    },
    {
      id: 4,
      course: 'UX/UI Design',
      program: 'MGB',
      term: 'Term 4',
      action: ActionCell('Revision Request'),
    },
  ];

  return (
    <>
      {value === 1 && (
        <Box className="cardlsitbox">
          <KenCard elevation={0}>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" className={classes.title}>
                Question Paper
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ borderRadius: 5, marginLeft: '500px' }}
                onClick={() => setValue(2)}
                // component={Link}
                // to={`${routes.currentProgrammes}/${id}/details`}
              >
                Submit a Qestion Paper for Approval
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ borderRadius: 5, marginLeft: '10px' }}
                onClick={() => setValue(3)}
                // component={Link}
                // to={`${routes.currentProgrammes}/${id}/details`}
              >
                Access to Previous Question Paper
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ borderRadius: 5, marginLeft: '10px' }}
                // component={Link}
                // to={`${routes.currentProgrammes}/${id}/details`}
              >
                 Create Question Paper
              </Button>
            </div>
          </KenCard>

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
      )}
      {value == 2 && <ChatSection />}
      {value == 3 && <PreviousQuestionPaper />}
    </>
  );
};

export default QuestionPaperComponent;
