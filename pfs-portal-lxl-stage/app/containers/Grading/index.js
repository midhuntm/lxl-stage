import React,{useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import KenCard from '../../global_components/KenCard';
import Button from '@material-ui/core';
import KenButton from '../../global_components/KenButton';
import { useHistory } from 'react-router-dom';
import KenHeader from '../../global_components/KenHeader';
import { FacultyResult,getUserCourses } from '../../utils/ApiService.js';
import { getUserDetails } from '../../utils/helpers/storageHelper';

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
  root1: {
    '& > *': {
      margin: theme.spacing(1),
    },
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

const rows = [
  createData('Chapter 1 - Ghungroo', <button style={{ background: "#D0EED2", border: "none", padding: "5px" }}>Completed</button>),
  createData('Chapter 2 - Dump It Not', <button style={{ background: "#D0EED2", border: "none", padding: "5px" }}>Completed</button>),
  createData('Chapter 3 - Duel Of Angels', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),
  createData('Chapter 4 - Lets Talk Puberty', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),
  createData('Chapter 5 - The Gift', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),
  createData('Chapter 6 - The Poem Thief  ', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),
  createData('Chapter 7 - The Santoor  ', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),
  createData('Chapter 8 - Wake Up, Dev    ', <button style={{ background: "#FFDEC5", border: "none", padding: "5px" }}>In Progress</button>),



];
const Grading = () => {

  const classes = useStyles();
  const history = useHistory();

  
  const userDetails = getUserDetails();
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const [data,setData] =useState([]);


  const Gradingnext = (id,chapterName) => {
   if(id&&chapterName){
     history.push({
      pathname: `/Grid`,
      state:{
        chapterId:id,
        chapterName:chapterName
      }
    });}

  }
  useEffect(() => {
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    getUserCourses(payload)
      .then(res => {
        let id = res.courses[0]?.courseoffering;
        setCourseOfferingId(id);
      })
      .catch(err => {
        console.log('error occured', err);
        setCourseOfferingId('');
      });
  }, []);

  useEffect(() => {

  if(courseOfferingId){
  
    const payloads = {
      method: 'post',
      courseoffering:courseOfferingId,
      useridnumber: userDetails?.ContactId,
    };
    FacultyResult(payloads).then(res => {
      console.log(res,"FacultyResult");
      setData(res)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
     


  }, [courseOfferingId])
  
  return (
    <>
      <div>
        {/* <h2>Grading</h2> */}

        <Grid item xs={12} sm={12} md={12}>
          <KenHeader title="Grading">
            <KenButton
              variant="primary"
              label="Back"
              onClick={() => history.goBack()}
            />
          </KenHeader>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell>Chapter Name</TableCell>
                  <TableCell align="center">Status</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(row => (
                  <>
                  {row.section_role=="student"?
                 ( <TableRow key={row.id}>
                    <TableCell component="th" scope="row" onClick={()=>Gradingnext(row.id,row.name)}>
                      {row.name}
                    </TableCell>
                    <TableCell align="center" onClick={()=>Gradingnext(row.id)}>{row.complitionstatus==1?
                    (<button style={{ background: "#D0EED2", border: "none", padding: "5px",cursor:"pointer" }}>Completed</button>):
                    (<button style={{ background: "#FFDEC5", border: "none", padding: "5px",cursor:"pointer" }}>In Progress</button>)
                  }</TableCell>

                  </TableRow>):null}
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default Grading;