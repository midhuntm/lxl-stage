import React from 'react';
import { makeStyles, Box,Grid ,Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import classBackground from '../../assets/icons/classBackground.svg';

const useStyles = makeStyles(theme => ({
  noClassWrap: {
    backgroundImage: `url(${classBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '80vh',
  },
  noClassContain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noclassMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  contentWrap: {
    width: 'calc(100% - 45%)',
  },
  noClassLabel: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginTop: '30%',
    marginBottom: '20%',
    [theme.breakpoints.only('sm')]: {
      fontSize: '25px',
      marginTop: '25%',
      marginBottom: '15%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
      marginTop: '25%',
      marginBottom: '15%',
    },
  },
  viewLabel: {
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
}));

export default function ComingSoonPage(props) {
  const { t } = useTranslation();
	const classes = useStyles();
  return (
    <Grid className={classes.noclassMain}>
      <div className={classes.noClassWrap}>
        <Grid className={classes.noClassContain}>
          <Grid className={classes.contentWrap}>
            <Typography variant="h1" className={classes.noClassLabel}>
              {t('Coming_soon')}
            </Typography>
            {/* <Typography variant="h6" className={classes.viewLabel}>
              {t(
                'messages:Market_Place_Message'
              )}
            </Typography> */}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
