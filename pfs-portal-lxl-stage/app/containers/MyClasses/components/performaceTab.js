import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import QuizAnalysisImg from '../../../assets/Images/quizAnalysis.svg';
import ScoreAnalysisImg from '../../../assets/Images/scoreAnalysis.svg';
import KenAvatar from '../../../components/KenAvatar/index';
import FirstRankIcon from '../../../assets/Images/FirstRank.svg';
import SecondRankIcon from '../../../assets/Images/SecondRank.svg';
import ThirdRankIcon from '../../../assets/Images/ThirdRank.svg';

const useStyles = makeStyles(theme => ({
  typoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
    marginBottom: 16,
  },
  leaderBoardContainer: {
    padding: 8,
    border: '1px solid #F4F5F7',
  },
}));

const studentList = [
  {
    Name: 'Karan',
    Icon: FirstRankIcon,
  },
  {
    Name: 'Naman',
    Icon: SecondRankIcon,
  },
  {
    Name: 'Devesh',
    Icon: ThirdRankIcon,
  },
  {
    Name: 'Kareem',
  },
];

export default function PerformanceTab() {
  const classes = useStyles();
  return (
    <Box p={1}>
      <Grid container>
        <Grid item md={4}>
          <Typography className={classes.typoTitle}>Quiz Analysis</Typography>
          <img src={QuizAnalysisImg} style={{ width: '100%' }} />
        </Grid>
        <Grid item md={8}>
          <Typography className={classes.typoTitle}>Score Analysis</Typography>
          <img src={ScoreAnalysisImg} style={{ width: '100%' }} />
        </Grid>
      </Grid>
      <Typography className={classes.typoTitle}>Leader Board</Typography>
      <Grid container>
        {studentList.map((el, index) => {
          return (
            <Grid item className={classes.leaderBoardContainer} md={12}>
              <>
                <Grid container>
                  <Grid item container spacing={2} alignItems="center">
                    <Grid item>
                      {el.Icon ? (
                        <img src={el.Icon} />
                      ) : (
                        <Typography style={{ marginLeft: 8, marginRight: 8 }}>
                          {index + 1}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      <KenAvatar value={el.Name[0]} />
                    </Grid>
                    <Grid item>
                      <Typography>{el.Name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
