import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import KenAvatar from '../../../components/KenAvatar';
import { Box, makeStyles } from '@material-ui/core';

const useContactStyles = makeStyles(theme => ({
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  name: {
    color: theme.palette.KenColors.tertiaryBlue502,
    marginLeft: theme.spacing(1),
    fontSize: '0.875rem',
  },
}));

const ContactCell = ({ value }) => {
  const classes = useContactStyles();
  return (
    <Box display="flex" alignItems="center">
      <KenAvatar
        alt="user"
        style={{marginRight: '25px'}}
        value={value?.charAt(0)}
        className={classes.avatar}
      />
      <Typography className={classes.name}>{value}</Typography>
    </Box>
  );
};
ContactCell.propTypes = {
  value: PropTypes.string.required,
};
export default ContactCell;
