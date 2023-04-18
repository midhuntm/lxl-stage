import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    background: theme.palette.KenColors.neutral100,
    fontSize: 14,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    background: theme.palette.KenColors.neutral100,
  },
  extraLarge: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    background: theme.palette.KenColors.sideNavItemHoverColor,
    fontSize: '50px',
  },
}));

export default function KenAvatar(props) {
  const classes = useStyles();
  const { value, url, size, className = '' } = props;

  const getClassName = () => {
    switch (size) {
      case 'ExtraLarge':
        return classes.extraLarge;

      case 'large':
        return classes.large;
      default:
        return classes.small;
    }
  };

  return (
    <div>
      {value ? (
        <Avatar
          alt="avatar"
          className={clsx([getClassName(), className])}
          {...props}
        >
          {value}
        </Avatar>
      ) : (
        <Avatar alt="avatar" src={url} {...props} />
      )}
    </div>
  );
}
