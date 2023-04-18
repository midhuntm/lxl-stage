import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  paperStats: {
    padding: '8px 12px',
    borderRadius: 3,
    boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
    background: theme.palette.KenColors.kpiBackground,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: 8,
      minHeight: 80,
    },
  },
  statsTextItem: {
    flexGrow: 1,
  },
  statsText: {
    fontSize: 24,
    fontWeight: 700,
    // color: theme.palette.KenColors.kenWhite,
    color: '#3F4A59',
    [theme.breakpoints.only('xs')]: {
      fontSize: '24px',
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '36px',
    },
  },
  statsSubText: {
    fontSize: '12px',
    // color: theme.palette.KenColors.sideNavItemActiveColor,
    color: '#3F4A59',
  },
  // statsImage: {
  //   height: 52,
  //   width: 52,
  //   [theme.breakpoints.down('sm')]: {
  //     height: 42,
  //     width: 42,
  //   },
  //   [theme.breakpoints.down('xs')]: {
  //     height: 32,
  //     width: 32,
  //   },
  // },
  statsHeaderBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsImageBox: {
    height: '45px',
    width: '45px',
    background: '#F5F6FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
  },

  statsImage: {
    height: 20,
    width: 20,
    [theme.breakpoints.down('sm')]: {
      height: 20,
      width: 20,
    },
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    },
  },

  link: {
    textDecoration: 'none',
  },
  contentDisbled: {
    textDecoration: 'none',
    pointerEvents: 'none',
  },

  breakdownTitle: { fontWeight: 'bold' },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function SessionCards(props) {
  const { session, absentSession, totalAttendance } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [stats, setStats] = React.useState();

  useEffect(() => {
    const studentStats = [
      {
        text: `${session}`,
        subLine: 'Session',
        backImage: `https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/kpiBgimg.png`,
      },
      {
        text: `${absentSession === undefined ? '--' : absentSession}`,
        subLine: 'Absent Session',
        backImage: `https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/kpiBgimg.png`,
      },
      {
        text: `${totalAttendance === undefined ? '--' : totalAttendance + '%'}`,
        subLine: 'Total Attendance',
        backImage: `https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/kpiBgimg.png`,
      },
    ];
    setStats(studentStats);
  }, [session, absentSession, totalAttendance]);
  return (
    <>
      {stats &&
        stats.map(el => (
          <Grid item xs={12} sm={4} md={4}>
            <div
              className={clsx({
                [classes.hover]: el?.data?.length > 0,
              })}
            >
              <Paper
                className={classes.paperStats}
                // style={{ backgroundImage: `url(${el.backImage})` }}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              >
                <Grid container spacing={1} style={{ textAlign: 'center' }}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Grid>
                      <Typography
                        className={classes.statsSubText}
                        color="textSecondary"
                      >
                        {el.subLine}
                      </Typography>
                    </Grid>
                    <Grid className={classes.statsTextItem}>
                      <Typography
                        className={clsx(
                          classes.statsText,
                          classes[el.className]
                        )}
                      >
                        {el.text}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Grid>
        ))}
    </>
  );
}
