import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  newProfile: {
    width: '30px',
  },
}));

export default function SimpleTooltips(props) {
  const classes = useStyles();
  const { icon, text } = props;
  return (
    <div>
      <Tooltip title={text}>
        <IconButton aria-label="delete">
          <img alt="user" src={icon} className={classes.newProfile} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
