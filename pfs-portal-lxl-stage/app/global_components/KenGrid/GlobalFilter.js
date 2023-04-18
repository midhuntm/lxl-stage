import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    fill: `${theme.palette.KenColors.neutral100} !important`,
  },
}));

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  customPlaceHolder
}) => {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <div className={classes.search} style={{ width: `${customPlaceHolder ? '300px' : 'unset'}` }}>
      <InputBase
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        // placeholder={`${count} records...`}
        placeholder={customPlaceHolder ? customPlaceHolder : `${count} records...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon classes={{ root: classes.searchIcon }} />
          </InputAdornment>
        }
      />
    </div>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  customPlaceHolder: PropTypes.string.isRequired,
};

export default GlobalFilter;
