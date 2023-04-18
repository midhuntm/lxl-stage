import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useTitleStyles = makeStyles(theme => ({
  cardTitle: {
    fontSize: '0.875rem',
    color: theme.palette.KenColors.neutral100,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  pageTitle: {
    fontSize: '1.175rem',
    color: theme.palette.KenColors.neutral900,
    fontWeight: 600,
  },
  defaultTitle: {
    fontSize: '1rem',
    color: theme.palette.KenColors.neutral900,
    fontWeight: 600,
    width: '100%',
  },
}));

// props : type - valid values : classes defined in the above styles
function KenTitle(props) {
  const { type = 'defaultTitle', title } = props;
  const classes = useTitleStyles();

  const getClassName = () => {
    return classes[type] ? classes[type] : classes['defaultTitle'];
  };

  return (
    <Typography className={getClassName()} {...props}>
      {title}
    </Typography>
  );
}

KenTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default KenTitle;
