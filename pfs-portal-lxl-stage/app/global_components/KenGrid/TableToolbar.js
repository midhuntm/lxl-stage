import React from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import GlobalFilter from './GlobalFilter';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    fontSize: '1.125rem',
  },
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const { title, preGlobalFilteredRows, setGlobalFilter, globalFilter, customPlaceHolder } = props;
  return (
    <Toolbar className={classes.root}>
      <div className={classes.title} id="tableTitle">
        {title}
      </div>
      <GlobalFilter
        customPlaceHolder={customPlaceHolder}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

Toolbar.prototype = {
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  customPlaceHolder:PropTypes.string.isRequired
};

export default TableToolbar;
