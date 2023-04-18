import React, { useEffect, useState } from 'react';
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
import {
  getChapterGrades,
  getUserCourses,
  getCourseContent,
} from '../../utils/ApiService.js';
import { CiEdit } from 'react-icons/ci';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { id } from 'date-fns/locale';
import { Routes } from '../../utils/routes.json';
import KenInputField from '../../components/KenInput/textField';


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
  iconedit: {
    height: '10px',
    width: '10 px',
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
  createData('Student 1', 40, 50, 60, 70),
  createData('Student 2', 40, 50, 60, 70),
  createData('Student 3', 40, 50, 60, 70),
  createData('Student 4', 40, 50, 60, 70),
  createData('Student 5', 40, 50, 60, 70),
  createData('Student 6 ', 40, 50, 60, 70),
  createData('Student 7 ', 40, 50, 60, 70),
];
const Gradingnext = props => {
  const classes = useStyles();
  const history = useHistory();

  const [chapterId, setChapterId] = useState(props?.location?.state?.chapterId);
  const [chapterName, setChapterName] = useState(
    props?.location?.state?.chapterName
  );
  const [data, setData] = useState([]);
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const userDetails = getUserDetails();
  const [fundata, setFundata] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const payload = {
      contactid: userDetails?.ContactId,
      method: 'post',
    };
    getUserCourses(payload)
      .then(res => {
        let id = res.courses[0]?.courseoffering;
        // console.log(res, id, "check");
        setCourseOfferingId(id);
      })
      .catch(err => {
        console.log('error occured', err);
        setCourseOfferingId('');
      });
  }, []);

  useEffect(() => {
    if (courseOfferingId) {
      getCourseContent(courseOfferingId, userDetails?.ContactId).then(res => {
        console.log(res, 'res');
        let filteredCourse = res?.filter(
          item => item.sectiontype === 'sub' && item.section_role == 'student'
        );

        // console.log('filtereddata', filteredCourse);
        let fundata = [];

        filteredCourse.map(item => {
          let Fundata = item.modules.find(
            item2 =>
              item2?.metadatainfo[0]['data'] == 'Fun activity' &&
              item2?.modname == 'quiz'
          );

          let Actiondata = item.modules.find(
            item2 =>
              item2?.metadatainfo[0]['data'] == 'Action Time' &&
              item2?.modname == 'quiz'
          );

          fundata.push({
            quizId: Fundata?.id,
            chaptername: item.name,
            actionid:Actiondata?.id
          });
          setFundata(fundata);
          // console.log(fundata, 'fundatafundata');
        });


      });
    }
  }, [courseOfferingId]);
  useEffect(() => {
    if (chapterId) {
      const payloads = {
        method: 'post',
        chapterid: chapterId,
      };
      getChapterGrades(payloads)
        .then(res => {
          const chapterData = [];
          let funActivity;
          let actionTime;
          let film;
          res?.map(item => {
            item?.activities?.map(s => {
              let modName = s?.modname?.split('-');
              if (modName[1]?.trim() == 'Fun Questions') {
                funActivity = s.grade;
              }
              if (modName[1]?.trim() == 'Action Time') {
                actionTime = s.grade;
              }
              if (modName[1]?.trim() == 'Film Link') {
                film = s.grade;
              }
            });
            chapterData.push({
              studentName: item.username,
              funActivity: funActivity,
              actionTime: actionTime,
              film: film,
              overallScore: `${(funActivity == undefined
                ? 0
                : Number(funActivity)) +
                (actionTime == undefined ? 0 : Number(actionTime)) +
                (film == undefined ? 0 : Number(film))}`,
            });
          });
          setData(chapterData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  console.log(chapterName, fundata, 'testfun');

  const handleInputChange=(e,row)=>{
    let editData=data?.map((item)=>{
      if(item.studentName===row.studentName){
       if(e.target.name==='funActivity'){
          return {...item,funActivity:e.target.value,overallScore: `${(e.target.value == undefined
            ? 0
            : Number(e.target.value)) +
            (item.actionTime == undefined ? 0 : Number(item.actionTime)) +
            (item.film == undefined ? 0 : Number(item.film))}`}
       }
       if(e.target.name==='actionTime'){
        return {...item,actionTime:e.target.value,overallScore:`${(e.target.value == undefined
          ? 0
          : Number(e.target.value)) +
          (item.funActivity == undefined ? 0 : Number(item.funActivity)) +
          (item.film == undefined ? 0 : Number(item.film))}`}
       }
       if(e.target.name==='film'){
        return {...item,film:e.target.value,overallScore:`${(e.target.value == undefined
          ? 0
          : Number(e.target.value)) +
          (item.funActivity == undefined ? 0 : Number(item.funActivity)) +
          (item.actionTime == undefined ? 0 : Number(item.actionTime))}`}
      }
      }
      else{
       return item
      } 
    })
    setData(editData)
  }

  const MovereviewQuiz = () => {
    let quizId;
    fundata.map(x => {
      if (x.chaptername === chapterName) {
        quizId = x.quizId;
      }

      if (quizId != '') {
        history.push({
          // pathname:Routes.reviewQuiz,
          pathname: `/reviewQuiz`,

          
          state: { quizId: quizId },
        });
      } else {
        return alert('quizId id is missing ');
      }
    });

 
  };

  const Moveaction = () => {
    let actionid;
    fundata.map(x => {
      if (x.chaptername === chapterName) {
        actionid = x.actionid;
      }

      if (actionid != '') {
        history.push({
          // pathname:Routes.reviewQuiz,
          pathname: `/reviewQuiz`,

          
          state: { quizId: actionid },
        });
      } else {
        return alert('actionid id is missing ');
      }
    });

 
  };

  return (
    <>
      <div>
        {/* <h2>Grading</h2> */}

        <div>
          <KenCard>
            <div>
              <Grid container md={12}>
                <Grid item md={8} />
                <Grid item md={2}>
                  <KenButton variant="primary" onClick={()=>setEdit(!edit)} style={{ float: 'right' }}>
                   {edit?'Save':'Edit'} 
                  </KenButton>
                </Grid>
                <Grid item md={2}>
                  <KenButton
                    variant="primary"
                    style={{
                      background: '#ffffff',
                      color: '#193389',
                      margin: '0px 0px 0px 10px',
                    }}
                    onClick={() => history.goBack()}
                  >
                    {'Back'}
                  </KenButton>
                </Grid>
              </Grid>
            </div>
            <h3>
              {' '}
              <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                Name of the Chapter:
              </span>
              &nbsp;&nbsp;
              <span style={{ color: '#505F79' }}>{chapterName}</span>
            </h3>
            <br />
            <h3>
              <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Grade:</span>
              &nbsp;&nbsp;
              <span style={{ color: '#505F79' }}>6th</span>
            </h3>
            <br />
            <h3>
              <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                Academic Year:
              </span>
              &nbsp;&nbsp;
              <span style={{ color: '#505F79' }}>2023-2024</span>
            </h3>
          </KenCard>
        </div>

        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Film</TableCell>
                  <TableCell align="center">
                    Fun Activity
                    {/* <CiEdit style={{cursor:"pointer"}} onClick={MovereviewQuiz} /> */}
                  </TableCell>
                  <TableCell align="center">
                    Action Time
                     {/* <CiEdit style={{cursor:"pointer"}} onClick={Moveaction} /> */}
                  </TableCell>
                  <TableCell align="center">Overall score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(row => (
                  <TableRow key={row?.studentName}>
                    <TableCell component="th" scope="row">
                       {row?.studentName}
                    </TableCell>
                    <TableCell align="center">
                      {edit?
                      <>
                      <KenInputField
                      onChange={(e)=>handleInputChange(e,row)}
                      optionalLabel={false}
                      name='film'
                      value={row?.film}
                      />
                      {row?.film>'35'?<span style={{color:'red',fontSize:'10px'}}>Must be smaller than 35</span>
                      :row?.film<'0'?<span style={{color:'red',fontSize:'10px'}}>Field is required</span>
                      :null}
                      </>
                      : row?.film}
                       </TableCell>
                    <TableCell align="center">
                      {edit?
                      <> 
                      <KenInputField
                      onChange={(e)=>handleInputChange(e,row)}
                      optionalLabel={false}
                      value={row?.funActivity}
                      name='funActivity'
                      />
                      {row?.funActivity>'30'?<span style={{color:'red',fontSize:'10px'}}>Must be smaller than 30</span>
                      :row?.funActivity<'0'?<span style={{color:'red',fontSize:'10px'}}>Field is required</span>:null}
                      </>
                      :row?.funActivity}</TableCell>
                    <TableCell align="center">
                      {
                      edit?
                      <>
                      <KenInputField
                      onChange={(e)=>handleInputChange(e,row)}
                      optionalLabel={false}
                      value={row?.actionTime}
                      name='actionTime'
                      />
                      {row?.actionTime>'35'?<span style={{color:'red',fontSize:'10px'}}>Must be smaller than 35</span>
                      :row?.actionTime<'0'?<span style={{color:'red',fontSize:'10px'}}>Field is required</span>:null}
                      </>
                      :
                      row?.actionTime == undefined ? '-' : row?.actionTime}
                    </TableCell>
                    <TableCell align="center">{row?.overallScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default Gradingnext;