import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '23vw',
    flexWrap: 'wrap',
    // borderLeft: `3px solid ${theme.palette.KenColors.primary}`,
    backgroundColor: theme.palette.KenColors.tertiaryBlue40,
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    margin: 8,
    [theme.breakpoints.only('xs')]: {
      flexWrap: 'none',
      maxWidth: 'none',
      margin: '0px 0px 8px 0px',
      padding: 0,
    },
  },
  title: {
    color: theme.palette.KenColors.primary,
    fontSize: '14px',
    lineHeight: '22px',
    textTransform: 'capitalize',
  },
  date: {
    color: theme.palette.KenColors.neutral900,
    fontSize: '10px',
    lineHeight: '14px',
    marginTop: 16,
  },
  facultyTasks: {
    width: '100%',
    // minWidth: '350px',
  },
}));

export default function LessonsCrad(props) {
  const { name, dueDate, startDate, url } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const goToContent = url => {
    window.open(url, '_blank');
  };

  //   const getTitle = title => {
  //     if (typeof title !== 'string') return null;

  //     if (title.length <= 30) {
  //       return title;
  //     } else {
  //       return title.substring(0, 28).trim() + '...';
  //     }
  //   };

  return (
    <Card
      elevation={0}
      className={classes.root}
      onClick={() => goToContent(url)}
    >
      <CardActionArea>
        <Grid container direction="column">
          <Box p={2} className={classes.facultyTasks}>
            <Grid item>
              <Typography
                className={classes.title}
                component="span"
                data-testid="lesson-title"
              >
                {/* {getTitle(data?.name)} */}
                {name}
              </Typography>
            </Grid>
            <Grid container item alignItems="center" spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  className={classes.date}
                  data-testid="lesson-start-date"
                >
                  <span>{t('Starts_On')}:</span> {startDate}{' '}
                </Typography>
              </Grid>
              <Grid item item xs={12} sm={12} md={6}>
                <Typography
                  className={classes.date}
                  data-testid="lesson-due-date"
                >
                  <span>{t('Deadline')}:</span> {dueDate}{' '}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
