import React from 'react';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import EventRow from './EventRow';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Open Sans'
  },
  container: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#787878`,
      opacity: '0.1',
      outline: `1px solid #787878`,
    },
  },
  semiTitle: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 12,
    marginLeft: 12,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dataBlock: {
    maxHeight: '45vh',
    minHeight: '35vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  }
}));

const UpcomingEventsView = props => {
  const { events, handleSelected } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles.container} data-testid={'upcoming-events'} style={{ padding: '10px' }}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography className={styles.title}>
            {t('headings:Events & Updates')}
          </Typography>
        </Grid>

        {/* <Grid item>
          <Grid container direction="row">
            <Typography
              data-testid="filter-all"
              className={styles.semiTitle}
              onClick={e => {
                handleSelected(e, 'all');
              }}
            >
              {t('labels:All')}
            </Typography>
            <Typography
              data-testid="filter-registered"
              className={styles.semiTitle}
              onClick={e => {
                handleSelected(e, 'registered');
              }}
            >
              {t('labels:Registered')}
            </Typography>
            <Typography
              data-testid="filter-unregistered"
              className={styles.semiTitle}
              onClick={e => {
                handleSelected(e, 'unregistered');
              }}
            >
              {t('labels:UnRegistered')}
            </Typography>
          </Grid>
        </Grid> */}
      </Grid>
      {events && (
        <Box className={styles.dataBlock} my={1} data-testid="events-container">
          {events?.map(event => (
            <EventRow event={event} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default UpcomingEventsView;
