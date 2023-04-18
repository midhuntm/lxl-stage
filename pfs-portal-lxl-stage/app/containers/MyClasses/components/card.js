import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgressBar from './linearProgress';
import { Box, Grid } from '@material-ui/core';
import history from '../../../utils/history';
import { Link } from 'react-router-dom';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    maxHeight: 210,
    minHeight: 210,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral100}`,
    },
  },
  media: {
    height: 100,
  },
  courseImage: {
    height: 48,
    width: 48,
    borderRadius: 6,
  },
  typoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.kenBlack,
  },
  personIcon: {
    color: theme.palette.KenColors.neutral400,
  },
  personTypo: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 13,
  },
  typoCalendar: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 13,
    background: '#EAEAED',
    padding: 4,
    borderRadius: 3,
  },
  calendarIcon: {
    height: 15,
    marginRight: -4,
  },
  progressTypo: {
    fontSize: 12,
    color: theme.palette.KenColors.kenBlack,
    marginBottom: 6,
  },
}));

export default function SubjectCard(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Link
      to={data.title === 'DBMS' ? `/class` : '/myClasses'}
      style={{ textDecoration: 'none' }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <Box m={2}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <img src={data.image} className={classes.courseImage} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.typoCalendar}>
                        {
                          <CalendarTodayOutlinedIcon
                            className={classes.calendarIcon}
                          />
                        }{' '}
                        {data.time}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.typoTitle}>
                  {data.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <PersonOutlineSharpIcon className={classes.personIcon} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.personTypo}>
                        {data.faculty}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              </Grid>
              <Grid item xs={12}>
                <>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <HourglassEmptyOutlinedIcon
                        className={classes.personIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.personTypo}>
                        In Progress: {data?.progress || 0} &nbsp; Completed:{' '}
                        {data?.completed || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.progressTypo}>
                  Progress
                </Typography>
                <LinearProgressBar value={data.progressValue} />
              </Grid>
            </Grid>
          </Box>
          {/* <CardMedia className={classes.media} image={data.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Box mb={2}>
              <LinearProgressBar value={data.progressValue} />
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent> */}
        </CardActionArea>
      </Card>
    </Link>
  );
}
