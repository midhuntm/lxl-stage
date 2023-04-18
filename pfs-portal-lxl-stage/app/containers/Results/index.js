import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import KenCard from '../../global_components/KenCard';

const TableCell = withStyles({
  root: {
    // borderBottom: "none",
    fontWeight: 'bold',
  },
})(MuiTableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
  },
  TableHead: {
    background: '#F1F5FA',
  },
}));
function createData(
  student,
  mark1,
  mark2,
  mark3,
  mark4,
  mark5,
  mark6,
  mark7,
  mark8,
  mark9,
  mark10
) {
  return {
    student,
    mark1,
    mark2,
    mark3,
    mark4,
    mark5,
    mark6,
    mark7,
    mark8,
    mark9,
    mark10,
  };
}
function createData2(Grade, Percentage) {
  return {
    Grade,
    Percentage,
  };
}

const rows = [
  createData('Chapter 1 - All is Well', 35, 30, 35, 100),
  createData('Chapter 2 - Apples and Oranges', 35, 30, "-", 65),
  createData('Chapter 3 - Wake Up Dev',"-","-","-","-"),
  
];

const rows2 = [
  createData2('A+', ' 90-100%'),
  createData2('A', '75-89%'),
  createData2('B+', '56-74%'),
  createData2('B', '35-55%'),
  createData2('C', 'Below 35'),
];

const Results = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        {/* <h2>Result</h2> */}
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell>Chapter Name</TableCell>
                  <TableCell align="center">Film</TableCell>
                  <TableCell align="center"> Activity</TableCell>
                  <TableCell align="center">Action Time</TableCell>
                  <TableCell align="center">Overall score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.student}>
                    <TableCell component="th" scope="row">
                      {row.student}
                    </TableCell>
                    <TableCell align="center">{row.mark1}</TableCell>
                    <TableCell align="center">{row.mark2}</TableCell>
                    <TableCell align="center">{row.mark3}</TableCell>
                    <TableCell align="center">{row.mark4}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                // height: 36,
                // marginRight: '10px',
                // float: 'right',
                marginLeft: '69%',
                marginTop: 10,
                // width: "100%",
              }}
            >
              <Grid container>
                <Grid style={{ fontWeight: 'bold', color: '#092682' }}>
                  <h3>Total Score</h3>
                  <h3>Grade</h3>
                </Grid>
                <Grid
                  style={{
                    paddingLeft: '12em',
                    color: '#092682',
                    fontWeight: 'bold',
                  }}
                >
                  <h3>165</h3>
                  <h3>A</h3>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </div>
      <div>
        <Grid container md={12} style={{marginTop:"3em"}}>
          <Grid item md={3}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell align="center">Grade</TableCell>
                  <TableCell align="center"> Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{background:"#ffffff"}}> 
                {rows2.map(row => (
                  <TableRow key={row.Grade}>
                    <TableCell style={{ borderBottom: 'none' }} align="center">
                      {row.Grade}
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }} align="center">
                      {row.Percentage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid md={9} />
        </Grid>
      </div>
    </>
  );
};

export default Results;
