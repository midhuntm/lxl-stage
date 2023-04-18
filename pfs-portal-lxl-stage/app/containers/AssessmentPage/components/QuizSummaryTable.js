import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import KenGrid from '../../../global_components/KenGrid';
import SuccessImage from '../../../assets/icons/success.png';

const useStyles = makeStyles(theme => ({
  warning: {
    color: theme.palette.KenColors.red,
    marginTop: theme.spacing(3),
    fontSize: '14px',
  },
}));

const BOX_STATUS = {
  answered: 'Answered',
  flagged: 'Flagged',
  skipped: 'Skipped',
  notVisited: 'Not Visited',
  ansAndFlagged: 'Answered & Flagged',
};

export default function QuizSummaryTable(props) {
  const classes = useStyles();
  const { statusCount, totalQuestions } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const flagged =
      statusCount.find(s => s.status === BOX_STATUS.flagged)?.count || 0;

    const notVisited =
      statusCount?.find(s => s.status === BOX_STATUS.notVisited)?.count || 0;

    const answered =
      statusCount?.find(s => s.status === BOX_STATUS.answered)?.count || 0;

    const ansAndFlagged =
      statusCount.find(s => s.status === BOX_STATUS.ansAndFlagged)?.count || 0;

    const dataCopy = [
      {
        sr: 1,
        attempted: answered + ansAndFlagged + flagged,
        answered: answered,
        flagged: flagged,
        notVisited: notVisited,
        ansAndFlagged: ansAndFlagged,
        totalQuestions: totalQuestions,
      },
    ];
    setData(dataCopy);
  }, [statusCount]);

  const columns = [
    {
      Header: 'S. NO.',
      accessor: 'sr',
    },
    {
      Header: 'No.of Questions',
      accessor: 'totalQuestions',
    },
    {
      Header: 'Attempted',
      accessor: 'attempted',
    },
    {
      Header: 'Answered',
      accessor: 'answered',
    },
    {
      Header: 'Answer & Flagged',
      accessor: 'ansAndFlagged',
    },
    {
      Header: 'Flagged',
      accessor: 'flagged',
    },
    {
      Header: 'Not Answered',
      accessor: 'notVisited',
    },
  ];
  return (
    <>
      <KenGrid
        toolbarDisabled={true}
        columns={columns}
        data={data}
        //   pagination={{ disabled: false }}
        initialState={{ hiddenColumns: ['status'] }}
        //   gridProps={{ headerVisible: false }}
        gridProps={{
          getHeaderProps: row => ({
            style: {
              backgroundColor: '#DFE8FF',
            },
          }),
        }}
      />
      <Typography className={classes.warning}>
        Are you sure you want to submit for final Marking? No changes will be
        allowed after submission.
      </Typography>
    </>
  );
}
