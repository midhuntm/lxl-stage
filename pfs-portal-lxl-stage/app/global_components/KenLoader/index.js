import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useLoaderStyles = makeStyles(theme => ({
  loaderWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function KenLoader({ loading = false }) {
  const classes = useLoaderStyles();
  return (
    <>
      {loading ? (
        <div className={classes.loaderWrap}>
          <CircularProgress />
        </div>
      ) : null}
    </>
  );
}

KenLoader.propTypes = {};

export default KenLoader;
