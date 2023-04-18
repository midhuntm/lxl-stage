import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import KenChip from '../../../../../global_components/KenChip';

const useStyles = makeStyles(theme => ({
  greenChip: {
    backgroundColor: '#D0EED2',
    color: '#000000',
    borderRadius: '4px',
  },
  orangeChip: {
    backgroundColor: '#FFDEC5',
    color: '#000000',
    borderRadius: '4px',
  },
  text: {
    fontSize: '12px',
    fontWeight: 500,
  },
}));

function StatusCard({ status, label }) {
  const classes = useStyles();

  const getStatus = (status, label) => {
    switch (status) {
      case 'Completed':
        return (
          <KenChip
            className={classes?.greenChip}
            label={<Typography className={classes.text}>{label}</Typography>}
          />
        );

      case 'In Progress':
      default:
        return (
          <KenChip
            className={classes?.orangeChip}
            label={<Typography className={classes.text}>{label}</Typography>}
          />
        );
    }
  };

  return <div>{getStatus(status, label)}</div>;
}

export default StatusCard;
