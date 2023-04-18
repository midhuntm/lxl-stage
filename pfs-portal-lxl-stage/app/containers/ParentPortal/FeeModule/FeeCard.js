import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    minWidth: '230px',
    height: '100%',
    backgroundColor: 'white',
    //   borderWidth: 'medium',
    //   borderColor: '#092682',
    //   display: 'block',
    borderRadius: 13,
    border: '3px solid rgb(9, 38, 130)',
    padding: '5px 10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: '30px',
    textAlign: 'initial',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: '#092682',
  },
}));

export default function FeeCard(props) {
  const { primaryText, subText } = props;
  const classes = useStyles();
  return (
    <Box className={classes.cardContainer}>
      <div>
        <Typography className={classes.cardText}>{primaryText}</Typography>
      </div>
      <div>
        <Typography
          style={{
            fontSize: '15px',
            fontFamily: 'sans-serif',
            textAlign: 'initial',
            color: 'grey',
            textTransform: 'none',
          }}
        >
          {subText}
        </Typography>
      </div>
    </Box>
  );
}
