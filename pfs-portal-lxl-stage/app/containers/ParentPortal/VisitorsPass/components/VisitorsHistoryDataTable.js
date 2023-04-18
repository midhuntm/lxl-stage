import React, { useState, useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  // student name links
  studentNameFonts: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
  },
  [theme.breakpoints.only('sm')]: {
    position: 'relative',
    left: '190px',
  },
  moreColumn: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

  //Filter Dropdown
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },

  // Search
  searchBox: {
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    border: '1px solid grey',
    margin: '16px',
  },
  searchIcon: {
    padding: '3px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    border: `1px solid ${theme.palette.neutral400}`,
  },
}));

const VisitorsHistoryDataTable = props => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const { t } = useTranslation();
  const { loading } = props;

  useEffect(() => {
    //console.log('Data Table: ', props.data);
    setTableData(props.data);
    setInitialTableData(props.data);
  }, [props]);

  //console.log(tableData);

  const tableTheme = createMuiTheme(theme => ({
    overrides: {
      MUIDataTableHeadCell: {
        sortAction: {
          alignItems: 'center',
        },
        sortActive: {
          color: theme.palette.KenColors.neutral400,
        },
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400,
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow: 'none',
        },
      },
    },
  }));

  const columns = [
    {
      name: 'ContactId',
      label: t('Contact_Id'),
      options: {
        display: false,
      },
    },
    {
      name: 'visitorName',
      label: t('Visitor_Name'),

      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log('tableMeta.rowData: ', tableMeta.rowData[0]);
          const studentID = tableMeta.rowData[0];
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="user">{value.charAt(0)}</Avatar>
                <Typography
                  style={{ marginLeft: 10 }}
                  className={classes.studentNameFonts}
                >
                  {value}
                </Typography>
              </div>
            </>
          );
        },
      },
    },
    {
      name: 'purpose',
      label: t('Purpose'),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'visitDate',
      label: t('Visit_Date'),
      options: {
        filter: true,
        sort: true,
        //customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
    {
      name: '',
      label: '',
      options: {
        filter: true,
        sort: true,
        // customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
  ];

  const PayNow = () => (
    <Button className={classes.border}>{t('labels:Pay_Now')}</Button>
  );

  const muiDatatableOptions = {
    selectableRows: 'none',
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    expandableRowsHeader: true,
    rowsPerPageOptions: [10, 30, 50],
    // customToolbar: PayNow,
    selectToolbarPlacement: 'none',
    textLabels: {
      body: {
        noMatch: 'Data not found',
        toolTip: 'Sort',
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            zIndex: 110,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.8)',
          }}
        >
          <CircularProgress size={24} />
        </div>
      )}
      <MuiThemeProvider theme={tableTheme}>
        <MUIDataTable
          title={props.title}
          data={tableData}
          columns={columns}
          options={muiDatatableOptions}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default VisitorsHistoryDataTable;
