import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Popover from '@material-ui/core/Popover';
import TableCell from '@material-ui/core/TableCell';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Tooltip, CircularProgress, useTheme, Typography } from "@material-ui/core";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KenCheckbox from '../KenCheckbox'
import SearchBox from "../SearchBox";
import FilterIcon from "../../assets/icons/Filter.svg";
// import { overridings as lightTheme } from '../../themes/light-theme';

const useStyles = makeStyles((theme) => ({
  //Filter Icon
  filterIcon: {
    height: '12px',
    width: '12px',
    margin: '3px 0px -3px 5px'
  },
  //Filter Dropdown
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },

  // Search
  SearchBoxContainer: {
    display: 'flex',
    float: 'right',
    position: 'absolute',
    top: '13px',
    right: '14px',
    // width: '136px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },

  // Table
  tableCaptionDefault: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.white,
    fontFamily: `'Open Sans', sans-serif`,
    fontStyle: 'normal'
  },
  tableCaptionPrimary: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.white,
    fontFamily: `'Open Sans', sans-serif`,
    fontStyle: 'normal'
  },
  tableCaptionSecondary: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
    textAlign: 'start',
    fontFamily: `'Open Sans', sans-serif`,
    fontStyle: 'normal'
  },
  columnlabel: {
    fontSize: "14px",
    color: theme.palette.KenColors.neutral100,
    paddingBottom: "15px"
  },
  formContent: {
    fontSize: "14px !important",
    color: theme.palette.KenColors.neutral400
  },

  tableCheckBox: {
    borderRadius: "10px"
  }


}));


const KenTable = (props) => {

  const classes = useStyles();
  const { loading, data, columnConfig, tableConfig, tableTitle, variant } = props;


  const [tableData, setTableData] = useState(data);
  const [initialTableData, setInitialTableData] = useState(data);
  const [filterValue, setFilterValue] = useState('');
  const [filterState, setFilterState] = useState({});

  const theme = useTheme();

  const tableThemePrimary = createMuiTheme({
   ...theme,
    overrides: {
      MUIDataTableHeadCell: {
        sortAction: {
          alignItems: 'center',
        },
        sortActive: {
          color: theme.palette.KenColors.neutral400
        },
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400
        },
        fixedHeader: {
          backgroundColor: theme.palette.KenColors.white,
          paddingTop: '24px',
          paddingBottom: '5px',
        }
      },
      MuiTableSortLabel: {
        icon: {
          fontSize: "12px"
        }
      },
      MuiToolbar: {
        root: {
          textAlign: 'left',
          backgroundColor: theme.palette.KenColors.white,
          display: 'none',
        },
      },
      MuiTablePagination: {
        toolbar: {
          backgroundColor: theme.palette.KenColors.white
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: 12
        }
      },
      MuiTableRow: {
        root: {
          backgroundColor: theme.palette.KenColors.white,
          '&$selected': {
            backgroundColor: `${theme.palette.KenColors.neutral20} !important`,
          },
         ' &$selected:hover' : {
          backgroundColor: `${theme.palette.KenColors.neutral40} !important`,
         }
        },
        // hover: {
        //   backgroundColor: `${theme.palette.KenColors.white} !important `
        // },
        footer: {
          backgroundColor: theme.palette.KenColors.white
        }
      },
      MuiPaper: {
        elevation4: {
          boxShadow: `0 0 9px 0 ${theme.palette.KenColors.shadowColor}`,
        },
        rounded: {
          backgroundColor: theme.palette.KenColors.white,
        }
      },
      MuiTableCell: {
        root: {
          padding: '8px 21px',
          borderBottom: `1px solid ${theme.palette.KenColors.neutral20}`,
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400
        },
        head: {
          paddingTop: '24px',
          paddingBottom: '5px',
          fontSize: "10px",
          color: theme.palette.KenColors.neutral400
        },
        body: {
          color: theme.palette.KenColors.neutral400
        }
      },
      MuiCheckbox: {
        root: {
          color: theme.palette.KenColors.neutral60
        }
      }

    }
  });

  const tableThemeSecondary = createMuiTheme({
    ...theme,
    overrides: {
      MUIDataTableHeadCell: {
        sortAction: {
          alignItems: 'center',
        },
        sortActive: {
          color: theme.palette.KenColors.neutral400
        },
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400
        },
        fixedHeader: {
          backgroundColor: theme.palette.KenColors.white,
          padding: '12px 21px'
        }
      },
      MuiToolbar: {
        root: {
          textAlign: 'left',
          backgroundColor: theme.palette.KenColors.white,
          // display: 'none',
        },
      },
      MuiTablePagination: {
        toolbar: {
          backgroundColor: theme.palette.KenColors.white
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: 12
        }
      },
      MuiTableRow: {
        root: {
          backgroundColor: theme.palette.KenColors.white,
          '&$selected': {
            backgroundColor: `${theme.palette.KenColors.neutral20} !important`,
          },
         ' &$selected:hover' : {
          backgroundColor: `${theme.palette.KenColors.neutral40} !important`,
         }
        },
        // hover: {
        //   backgroundColor: `${theme.palette.KenColors.white} !important`
        // },
        footer: {
          backgroundColor: theme.palette.KenColors.white
        }
      },
      MuiPaper: {
        elevation4: {
          boxShadow: `0 0 9px 0 ${theme.palette.KenColors.shadowColor}`,
        },
        rounded: {
          backgroundColor: theme.palette.KenColors.white,

        }
      },
      MuiTableCell: {
        root: {
          padding: '8px 21px',
          borderBottom: `1px solid ${theme.palette.KenColors.neutral20}`,
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400
        },
        head: {
          padding: '10px 21px',
          fontSize: "10px",
          color: theme.palette.KenColors.neutral400
        },
        body: {
          color: theme.palette.KenColors.neutral400
        }
      }
    }
  });

  // set table title

  const title = <Typography className={variant === "primary" ? classes.tableCaptionPrimary : variant === "secondary" ? classes.tableCaptionSecondary : classes.tableCaptionDefault}> {tableTitle}</Typography >


  // set table configuration
  const muiDatatableOptions = {
    ...tableConfig,
    selectableRows: tableConfig.showCheckboxes || 'none',
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    rowsPerPage: tableConfig.rowsPerPage || 10,
    search: false,
    expandableRowsHeader: true,
    rowsPerPageOptions: tableConfig.rowsPerPageOptions || [10, 20, 30],
    customToolbar: () => {
      return (<div className={classes.SearchBoxContainer}>
        {tableConfig.customToolbar && tableConfig.customToolbar()}
        {tableConfig.showSearchBox && <div >
          <SearchBox searchHandler={searchTableHandler} />
        </div>}
      </div>
      )
    },
    textLabels: {
      body: {
        noMatch: loading ? 'Fetching Data...' : "No Matching Data",
        toolTip: "Sort",
      },
    },
    sortOrder: {
      name: tableConfig.defaultSortColumn,
      direction: 'asc'
    },
    // onRowClick: (rowData, rowMeta) => { tableConfig.onRowClick(rowData, rowMeta) }
  };


  // set column configurations
  let tableColumns = [], column;
  columnConfig.forEach(config => {
    column = {
      name: config.name,
      label: config.label,
      options: {
        ...config,
        display: config.showColumn,
        filter: config.applyFilter,
        sort: config.applySort,
      }
    };

    if (config.applyFilter)
      column.options.customHeadRender = ({ index, ...column }) => setCustomColumnHeader(index, column);

    if (config.cellComponent && config.cellComponent !== null)
      column.options.customBodyRender = (value, tableMeta, updateValue) => config.cellComponent(value, tableMeta, updateValue);

    tableColumns.push(column);
  });
  // console.log('tableColumns', tableColumns);


  // function for search
  const searchTableHandler = (event) => {
    let searchString = event.target.value.toLowerCase();
    let rows = [...initialTableData];

    let searchResult = rows.filter(row =>
      Object.values(row).reduce((accum, current) => { return accum + current }, '').toLowerCase().includes(searchString)
    );

    setTableData(searchResult);
  }


  // function for filter
  const setCustomColumnHeader = (index, column) => {
    //console.log(column)
    const columnFilterData = getColumnFilterData(column.name);
    return (
      <>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <>
              <TableCell
                key={index}
                {...bindTrigger(popupState)}
                style={{ minWidth: '160px' }}
              >
                <Tooltip title='Filter' style={{ cursor: 'pointer' }}>
                  <span>{column.label}<img className={classes.filterIcon} src={FilterIcon} /></span>
                </Tooltip>

              </TableCell>

              <Popover
                elevation={4}
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >

                <div className={classes.root}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.columnlabel}>{column.label}</FormLabel>
                    <FormGroup>
                      {
                        columnFilterData.map((option, index) => {
                          //console.log('option: ', option);
                          //console.log('filterState: ', filterState);

                          return <FormControlLabel
                            className={classes.formContent}
                            key={index}
                            control={
                              <KenCheckbox
                                name={option.value}
                                // label={option.value}
                                value={(filterState[column.name] || {})[option.value] || false}
                                onChange={(event) => columnFilterHandler(event, column.name)}
                                color='primary'
                              />
                            }
                            // label={option.label}
                            label={<Typography className={classes.formContent}>{option.label}</Typography>}

                          />
                        })
                      }
                    </FormGroup>
                  </FormControl>
                </div>
              </Popover>
            </>
          )}
        </PopupState>
      </>
    )
  }


  // get the column filter options
  const getColumnFilterData = (columnName) => {
    const columnFilterOptions = [];
    const uniqueOptions = new Map();

    initialTableData.map(data => {
      if (!uniqueOptions.has(data[columnName])) {
        uniqueOptions.set(data[columnName], true);
        columnFilterOptions.push({
          label: data[columnName] || "",
          value: data[columnName] || ""
        });
      }
    });
    //console.log('columnFilterOptions: ', columnFilterOptions);
    return columnFilterOptions;
  }


  // filter function for columns
  const columnFilterHandler = (event, columnName) => {
    const filterString = event.target.name;
    setFilterValue(filterString);
    //console.log('filter string: ', filterString);
    //console.log('columnName: ', columnName);

    // set filter state
    let columnState = { ...filterState[columnName] };
    columnState = { ...columnState, [event.target.name]: event.target.checked };
    setFilterState({ ...filterState, [columnName]: columnState });
    //console.log('columnState: ', columnState);

    const searchStrings = Object.keys(columnState).filter(k => columnState[k] === true);
    //console.log('searchStrings: ', searchStrings);

    if (searchStrings.length > 0) {
      const filterResult = initialTableData.filter((data) => {
        //console.log('data[columnName]): ', data[columnName]);
        return searchStrings.indexOf(data[columnName] || "") !== -1;
      });

      // set table data
      setTableData(filterResult);
    }
    else {
      // set table data
      setTableData(initialTableData);
    }
  }


  return (
    <div style={{ position: "relative", marginTop: 20 }}>
      {loading && <div style={{ position: 'absolute', zIndex: 110, top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.8)' }}>
        <CircularProgress size={24} />
      </div>
      }
      <MuiThemeProvider theme={variant === "primary" ? tableThemePrimary : tableThemeSecondary}>
        <MUIDataTable
          title={title}
          data={tableData}
          columns={tableColumns}
          options={muiDatatableOptions}
        />
      </MuiThemeProvider>
    </div>
  )
}


export default KenTable;