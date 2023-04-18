import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Breadcrumbs, Grid, Paper, Radio } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import KenGrid from '../../global_components/KenGrid';
import TableData from './data.json';
import TableData1 from './data.json';
import KenButton from '../../global_components/KenButton';

import Button from '@material-ui/core/Button';
// import history from '../../utils/history';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import RatingTable from '../../components/RatingTable';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { AiOutlineDownload } from 'react-icons/ai';
import KenHeader from '../../global_components/KenHeader';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.white,
    width: '100%',
  },
  base: {
    backgroundColor: 'white',
    display: 'flex',
  },
  breadCrumbWrapper: {
    margin: '15px 0',
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#505F79',
    opacity: '0.6',
  },
  amtTable: {
    width: '100%',
    height: 10,
  },
  cartBody: {
    padding: '20px',
    position: 'relative',
    backgroundColor: '#edeff1',
  },
  amtTable: {
    width: '100%',
    height: 10,
  },
  tableData1: {
    width: '80%',
    textAlign: 'left',
  },
  studentInfo: {
    // color: "#00218D",
    fontSize: '14px',
    width: '25%',
    textAlign: 'left',
  },
  tableData: {
    width: '20%',
    textAlign: 'left',
  },
}));

const ActionCell = row => {
  const { id } = row.row.values;
  return (
    <Box>
      <Button
        size="small"
        variant="contained"
        color="primary"
        style={{ borderRadius: 15 }}
      >
        Submitted
      </Button>
    </Box>
  );
};

export default function studentFeedback() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [data, setdata] = React.useState(TableData1);
  const [breadValue, setBreadValue] = useState('EXAM SCHEDULE');
  const history = useHistory();
  const [radioVal, setRadioVal] = useState([
    { id: 1, value: false },
    { id: 2, value: false },
    { id: 3, value: false },
    { id: 4, value: false },
    { id: 5, value: false },
    { id: 6, value: false },
    { id: 7, value: false },
    { id: 8, value: false },
    { id: 9, value: false },
    { id: 10, value: false },
  ]);
  const columns = [
    {
      Header: 'Resources',
      accessor: 'Resources',
      disableGlobalFilter: true,
    },

    // {
    //   Header: 'Subject',
    //   accessor: 'Subject',
    //   disableGlobalFilter: true,
    // },
    // {
    //   Header: 'Subject Code',
    //   accessor: 'SubjectCode',
    //   disableGlobalFilter: true,
    // },

    {
      Header: 'Action',
      accessor: 'Feedback',
      //   Cell:ActionCell,
      Cell: ({ row }) => {
        return (
          <div>
            
            <Grid container xs={12}>
              
              <Grid item xs={3} />
              <Grid item xs={3} >
                <KenButton style={{color:"white", background:"#f05c80"}}>
                  <AiOutlineFilePdf style={{fontSize:"20px"}}/>
                </KenButton>
              </Grid>
              <Grid item xs={3} >
                <KenButton style={{color:"white", background:"#f05c80"}}>
                  <AiOutlineDownload style={{fontSize:"20px"}}/>
                </KenButton>
              </Grid>
              <Grid item xs={3} />
            </Grid>
            {/* <KenButton
              // className={classes.btnLabels}
              onClick={() => {
                handleForm(row?.values?.Feedback);
              }}
              //   value={cell?.accessor}
              variant="primary"
              style={{
                height: '25px',
                marginRight: '10px',
                borderRadius: '25px',
                fontSize: '12px',
                width: '120px',
                background: `${
                  row?.values?.Feedback !== 'Pending' ? '#27AE60' : '#F2994A'
                }`,
              }}
              label={row?.values?.Feedback}
            /> */}
          </div>
        );
      },
      disableGlobalFilter: true,
    },
  ];
  const arrayBreadCrumb = [
    {
      head: 'My Feedback',
    },
  ];

  const handleForm = params => {
    if (params === 'Pending') {
      history.push({
        pathname: `/facultFeedBackForm`,
        state: {},
      });
    } else {
      return null;
    }
  };

  const radioChange = (e, i, item) => {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <>
    <div>
    <Grid item xs={12} sm={12} md={12}>
          <KenHeader title="GlobalResources">
            <KenButton
              variant="primary"
              label="Back"
              onClick={() => history.goBack()}
            />
          </KenHeader>
        </Grid>
    </div><br/>
      <Grid container spacing={2} className={classes.base}>
        <div className={classes.root}>
          <Paper elevation={3}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="KenDiv">
                  <KenGrid
                    columns={columns}
                    data={data['TableData1']}
                    pagination={{ disabled: true }}
                    tableTotal={{ disabled: true, checkbox: true }}
                    getRowProps={{ selected: true }}
                    toolbarDisabled={true}
                  />
                </div>
              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                <RatingTable
                  parameters={[
                    'Course Structure',
                    'Planning + Coordination',
                    'Student Behavior',
                    'Resources + Support',
                    'Tech Infrastructure',
                  ]}
                />
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </div>
      </Grid>
    </>
  );
}
