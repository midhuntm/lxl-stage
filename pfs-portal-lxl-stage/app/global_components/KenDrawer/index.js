import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Drawer, IconButton, makeStyles } from '@material-ui/core';

import KenTitle from '../KenTitle';

const useDrawerStyles = makeStyles(theme => ({
  titleWrap: {
    padding: 16,
  },
  close: {
    color: theme.palette.KenColors.neutral700,
  },
  drawerPaper: {
    width: '50%',
  },
}));

// Defaults : anchor ="right"
function KenDrawer(props) {
  const defaultToggle = () => {
    console.log('Toggle Drawer');
  };
  const {
    drawerWidth,
    anchor = 'right',
    children,
    open = 'false',
    onClose = defaultToggle,
    title,
    closeButtonEnabled = true,
    titleProps,
    closeIconStyles,
    ...otherProps
  } = props;

  const classes = useDrawerStyles();
  return (
    <div>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        PaperProps={{
          className: classes.drawerPaper,
          style: { width: drawerWidth },
        }}
        {...otherProps}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.titleWrap}
        >
          {title && <KenTitle title={title} {...titleProps} />}
          {closeButtonEnabled ? (
            <IconButton
              onClick={onClose}
              aria-label="close"
              className={closeIconStyles}
            >
              <CloseIcon className={classes.close} />
            </IconButton>
          ) : null}
        </Box>
        {children}
      </Drawer>
    </div>
  );
}

KenDrawer.propTypes = {};

export default KenDrawer;
