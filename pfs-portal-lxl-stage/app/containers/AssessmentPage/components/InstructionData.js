import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { QuizInstruction } from '../../../utils/ApiService';
import { KEY_STATUS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '150%',
    textTransform: 'uppercase',
    marginTop: '20px',
    // marginLeft:'16px',
    marginBottom: '4px',
  },
  typoDetails: {
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
    lineHeight: '23px',
    marginTop: '4px',
    // marginLeft:'16px',
    marginBottom: '4px',
  },
  tableHeading: {
    fontSize: 14,
    color: theme.palette.KenColors.kenBlack,
    fontWeight: 600,
  },
  bullet: {
    listStyle: 'none',
  },
}));

export default function InstructionData(props) {
  const { quizid, setTotalQuizTime,instructionsData, setInstructionsData } = props;
  const [flag, setFlag] = React.useState(true);
  const { t } = useTranslation();

  const styles = useStyles();
  React.useEffect(() => {
    QuizInstruction(quizid)
      .then(res => {
        if (res.status === KEY_STATUS.failed) {
          setInstructionsData();
        } else {
          setInstructionsData(res);
          setTotalQuizTime(res?.timelimit);
        }
        setFlag(false);
      })
      .catch(err => {
        console.log('error in Assignment Instructions', err);
        setFlag(false);
      });
  }, []);
  const {
    quizname,
    sections,
    totalmarks,
    description,
    timelimit,
    subject,
  } = instructionsData;

  const aboutSectionsMarks = [
    /* '• Each question has seperate marks',
    '• You are not allowed to switch between the section before complete the current section.',
    '• Each section has a timer and once the time completes automatically changes to the next section.',
    '• You can flag the question which can be answered later. But don’t forget to answer flagged questions before submitting an assessment',
    '• You don’t have to complete the questions in order. You can skip around.', */
  ];

  const beforeStartingExam = [
    /*     "• Please verify that the student's last name appears correctly within the User ID box.", */
  ];

  const duringExam = [
    // '• The student may not use his or her textbook, course notes, or receive help from a proctor or any other outside source.',
    // '• Students must complete the 50-question multiple-choice exam within the 75-minute time frame allotted for the exam.',
    // '• Students must not stop the session and then return to it. This is especially important in the online environment where the system will "time-out" and not allow the student or you to reenter the exam site.',
  ];

  const interruptedExam = [
    // '• If your online exam is interrupted, click the “Back” button on your web browser to see if you can return to the exam. If not, follow the instructions below to resume taking the exam. Note: Answers are saved by the system in 10-minute intervals. If you have to log back in to complete your exam, your prior answers will be remain from the last system-save.',
    // '• Reconnect to the Internet and log back into Brightspace.',
    // '• Follow your original instructions to access the exam login page.',
    // '• Ask your proctor to re-enter the Username and Password, then select the checkbox "Show list of unfinished exams, only select to re-enter an exam already in progress." This will enable you to resume taking the exam, close to the point before the interruption occurred.',
    // '• Have your Proctor enter the Username and Password provided in the email from The College and click enter.',
  ];

  return (
    <Grid container>
      <Grid item xs={12} p={2}>
        <Typography className={styles.title}>
          {t('instructions:Sections_And_Marking_Scheme').toUpperCase()}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#DFE8FF' }}>
                <TableCell>
                  <Typography className={styles.tableHeading}>
                    {t('instructions:S_No')}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* {t('instructions:Section_Name')} */}
                  <Typography className={styles.tableHeading}>
                    Subject Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={styles.tableHeading}>
                    {t('instructions:No_Of_Questions')}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* {t('instructions:Section_Time')} */}{' '}
                  <Typography className={styles.tableHeading}>
                    {' '}
                    Assessment Duration{' '}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={styles.tableHeading}>
                    {t('labels:Marks')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {1}
                </TableCell>
                <TableCell>{subject}</TableCell>
                <TableCell>
                  {sections &&
                    sections.map(item => {
                      return item.totalquestion;
                    })}
                </TableCell>
                <TableCell>{timelimit / 60} Minutes </TableCell>
                <TableCell>{totalmarks}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} p={2}>
        <Typography className={styles.title}>
          {' '}
          {t('instructions:Description').toUpperCase()}
        </Typography>
        <Typography className={styles.typoDetails}>
          {/* description */}
          {/*  <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          /> */}
          {parse(`${description}`)}
        </Typography>
      </Grid>

      {/* <Grid item xs={12} p={2}>
        <Typography className={styles.title}>
          {t('instructions:About_Sections_Marks').toUpperCase()}
        </Typography>
        <ul>
          {aboutSectionsMarks
            ? aboutSectionsMarks.map(item => {
                return (
                  <li className={styles.bullet}>
                    <Typography className={styles.typoDetails}>
                      {item}
                    </Typography>
                  </li>
                );
              })
            : ''}{' '}
        </ul>
      </Grid>

      <Grid item xs={12} p={2}>
        <Typography className={styles.title}>
          {t('instructions:Before_Starting_The_Exam').toUpperCase()}
        </Typography>
        <ul>
          {beforeStartingExam
            ? beforeStartingExam.map(item => {
                return (
                  <li className={styles.bullet}>
                    <Typography className={styles.typoDetails}>
                      {item}
                    </Typography>
                  </li>
                );
              })
            : ''}{' '}
        </ul>
      </Grid> */}
      {duringExam && duringExam.length > 0 ? (
        <Grid item xs={12} p={2}>
          <Typography className={styles.title}>
            {' '}
            {t('instructions:During_The_Exam').toUpperCase()}
          </Typography>
          <ul>
            {duringExam
              ? duringExam.map(item => {
                  return (
                    <li className={styles.bullet}>
                      <Typography className={styles.typoDetails}>
                        {item}
                      </Typography>
                    </li>
                  );
                })
              : ''}{' '}
          </ul>
        </Grid>
      ) : (
        ''
      )}
      {interruptedExam && interruptedExam.length > 0 ? (
        <Grid item xs={12} p={2}>
          <Typography className={styles.title}>
            {t(
              'instructions:What_To_Do_If_Your_Online_Exam_Is_Interrupted'
            ).toUpperCase()}
          </Typography>

          <ul>
            {interruptedExam
              ? interruptedExam.map(item => {
                  return (
                    <li className={styles.bullet}>
                      <Typography className={styles.typoDetails}>
                        {item}
                      </Typography>
                    </li>
                  );
                })
              : ''}
          </ul>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
}
