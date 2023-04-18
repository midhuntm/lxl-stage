import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ProgressBar from '../../progressBar';
import StatusCard from './StatusCard';

const useStyles = makeStyles(theme => ({
  listItemText: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '150%',
  },
  container: {
    cursor: 'pointer',
    border: '1px solid #CCCCCC',
    borderRadius: ' 4px',
  },
  greenChip: {
    backgroundColor: '#D0EED2',
    color: '#000000',
    margin: '2px 5px',
  },
  orangeChip: {
    backgroundColor: '#FFDEC5',
    color: '#000000',
    margin: '2px 5px',
  },
  subTitle: {
    fontWeight: 500,
    fontSize: '14px',
  },
  title: {
    fontWeight: 600,
    fontSize: '14px',
  },
}));

function ContentCard(props) {
  const {
    statusLabel,
    status,
    subTitle,
    onCardClick,
    title,
    chapter,
    progress = '70',
  } = props;
  const classes = useStyles();

  const getTopColor = progress => {
    if (progress === 100) {
      return '#D0EED2';
    } else if (progress > 75) {
      return 'rgb(255,165,0,0.6)';
    } else if (progress > 25 && progress < 76) {
      return 'rgb(238 238 138 / 93%)';
    } else if (progress < 26) {
      return 'rgba(255, 0, 0, 0.6)';
    } else {
      return '#da1e28';
    }
  };

  const getBottomColor = progress => {
    if (progress === 100) {
      return '#D0EED2';
    } else if (progress > 75) {
      return 'rgb(255,165,0,0.2)';
    } else if (progress > 25 && progress < 76) {
      return 'rgba(255,255,0,0.2)';
    } else if (progress < 26) {
      return 'rgba(255, 0, 0, 0.2)';
    } else {
      return 'rgba(255, 122, 23, 0.25)';
    }
  };

  return (
    <Box
      p={2}
      mb={2}
      onClick={() => onCardClick(chapter)}
      className={classes.container}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid container spacing={1} item md={10}>
          <Grid item xs={12}>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle}>{subTitle}</Typography>
          </Grid>
          <Grid item xs={12}>
            <StatusCard status={status} label={statusLabel} />
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Box>
            {/* <ProgressBar
              bottomColor={getBottomColor(progress)}
              topColor={getTopColor(progress)}
              size={60}
              thickness={4}
              value={progress}
              topVariant={}
              bottomVariant={}
            /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContentCard;
