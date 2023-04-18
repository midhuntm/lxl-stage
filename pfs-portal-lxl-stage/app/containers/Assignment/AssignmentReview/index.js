import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenCard from '../../../global_components/KenCard';
import { makeStyles } from '@material-ui/core/styles';
import StudentList from '../AssignmentReview/components/StudentList/index';
import { getSubmission } from '../../../utils/ApiService';
import moment from 'moment';
import { logDOM } from '@testing-library/react';
import KenLoader from '../../../components/KenLoader';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.KenColors.primary,
  },
  typoPlagiarism: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.KenColors.neutral400,
  },
  noRecord: {
    fontSize: 16,
    fontWeight: 600,
    margin: '30px 0px',
  },
}));

export default function AssignmentReview(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);
  const [cmid, setCmid] = useState(
    props?.history?.location?.state?.quizId || ''
  );
  const [submissionHeading, setSubmissionHeading] = useState(
    props?.history?.location?.state?.submissionHeading || ''
  );
  const [submittedUsers, setSubmittedUsers] = useState([]);
  const [gradingsummary, setGradingsummary] = useState(null);
  const [assignPercentage, setAssignPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lockAction, setLockAction] = useState(false);

  useEffect(() => {
    setLoading(true);
    const payload = {
      cmid: cmid,
      status: '',
      since: 0,
      before: 0,
    };
    getSubmission(payload)
      .then(res => {
        setLoading(false);
        if (res.assignments.length !== 0) {
          setSubmissionHeading(res.assignments[0].assignmentname);
          setGradingsummary(res?.gradingsummary || {});
          let modifiedRes = res.assignments[0]?.submissions.map((item, i) => {
            let feebackData = item.plugins.filter(
              fItem => fItem.type == 'comments'
            );
            let gradingstatus =
              item.gradingstatus == 'graded'
                ? 'Graded'
                : item.gradingstatus == 'notgraded'
                ? 'Not Graded'
                : item.gradingstatus;
            return {
              ...item,
              gradingstatus: gradingstatus,
              filesubmission: item.plugins.filter(
                subItem => subItem.type == 'file'
              ),
              feedback: feebackData[0].name,
              timecreated: `${
                item?.timecreated !== null
                  ? moment.unix(item?.timecreated).format('LLLL')
                  : 'NA'
              }`,
              timemodified: `${
                item?.timemodified !== null
                  ? moment.unix(item.timemodified).format('LLLL')
                  : 'NA'
              }`,
              actions: true,
              contactId: item.userid,
              userId: item.userid
            };
          });
          console.log('modifiedRes', modifiedRes);
          let users = modifiedRes.filter(item => item.status == 'submitted');
          setSubmittedUsers(users);
          setData(modifiedRes);
          setLockAction(false)
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('error in Assignment Instructions', err);
      });
  }, [lockAction]);

  useEffect(() => {
    if (gradingsummary !== null) {
      setAssignPercentage(
        (
          (gradingsummary?.submissionssubmittedcount /
            gradingsummary?.participantcount) *
          100
        ).toFixed(2)
      );
    }
  }, [gradingsummary]);

  useEffect(() => {
    setCards([
      {
        title: 'Assignment Submission Percentage',
        value: `${
          assignPercentage && assignPercentage !== null
            ? assignPercentage
            : 'NA'
        }%`,
        typoTitle: {
          color: '#35714D',
          fontSize: 12,
        },
        typoValue: {
          color: '#35714D',
          fontSize: 24,
          fontWeight: 'bold',
        },
        container: {
          background: '#C8ECE3',
          borderRadius: 3,
          padding: 16,
          minWidth: 200,
        },
      },
      /* {
        title: 'Class Average Score',
        value: '3.6/5',
        typoTitle: {
          color: '#B49353',
          fontSize: 12,
        },
        typoValue: {
          color: '#B49353',
          fontSize: 24,
          fontWeight: 'bold',
        },
        container: {
          background: '#FDEECF',
          borderRadius: 3,
          padding: 16,
          minWidth: 200,
        },
      }, */
      // {
      //   title: 'Plagiarism Report',
      //   value: '13%',
      //   typoTitle: {
      //     color: '#EF4060',
      //     fontSize: 12,
      //   },
      //   typoValue: {
      //     color: '#EF4060',
      //     fontSize: 24,
      //     fontWeight: 'bold',
      //   },
      //   container: {
      //     background: '#FFE9E7',
      //     borderRadius: 3,
      //     padding: 16,
      //     minWidth: 200,
      //   },
      // },
    ]);
  }, [assignPercentage]);

  return (
    <div>
      {loading && <KenLoader />}
      <KenCard>
        <Box m={1}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.heading}>
                {submissionHeading}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography className={classes.typoPlagiarism}>
                Check plagiarism activated{' '}
              </Typography>
            </Grid> */}
          </Grid>
        </Box>
      </KenCard>
      <Box mt={2}>
        <KenCard>
          <Box m={2}>
            <Grid container spacing={1} direction="row">
              {cards.map(el => {
                return (
                  <Grid item style={{ marginRight: 16 }}>
                    <>
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        style={el.container}
                      >
                        <Grid item>
                          <Typography style={el.typoTitle}>
                            {el.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography style={el.typoValue}>
                            {el.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  </Grid>
                );
              })}
            </Grid>

            {data.length ? (
              <StudentList
                data={data}
                cmid={cmid}
                submittedUsers={submittedUsers}
                submissionHeading={submissionHeading}
                setLockAction={setLockAction}
              />
            ) : (
              <p className={classes.noRecord}>No records found</p>
            )}
          </Box>
        </KenCard>
      </Box>
    </div>
  );
}
