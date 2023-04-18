import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  fade,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MUIDataTable from 'mui-datatables';
import Box from '@material-ui/core/Box';
// import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgressWithLabel from '../ChartWidgets/CircularProgressWithLabel';
// import MailIcon from '../../assets/icons/Mail.svg';
import GlobalStyle from '../../global-styles';
import { CircularProgress, useTheme } from '@material-ui/core';
import Routes from '../../utils/routes.json';
import { KEY_ATTENDANCE_PROGRESS_VALUES } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  // student name links
  studentNameFonts: {
    textDecoration: 'none',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    color: theme.palette.KenColors.primary,
    '&:hover': {
      pointer: 'cursor',
    },
  },
  // more icon
  more: {
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      left: '120px',
    },
    [theme.breakpoints.only('sm')]: {
      position: 'relative',
      left: '190px',
    },
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
    border: `1px solid ${theme.palette.KenColors.neutral100}`,
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
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  grey: {
    backgroundColor: theme.palette.KenColors.neutral100,
  },
  reportActionIcon: {
    height: '30px',
    cursor: 'pointer',
  },
}));

const StudentDataTable = props => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const { t } = useTranslation();

  const { loading } = props;

  useEffect(() => {
    setTableData(props.data);
    setInitialTableData(props.data);
  }, [props]);

  const kenTheme = useTheme();
  const tableTheme = createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        sortAction: {
          alignItems: 'center',
        },
        sortActive: {
          color: '#505F79',
          fontSize: '12px',
        },
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '14px',
          color: '#505F79',
        },
      },
      MUIDataTable: {
        responsiveBase: {
          overflow: 'inherite',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontSize: '12px',
        },
        stackedCommon: {
          '@media (max-width: 959.95px)': {
            fontFamily: `'Open Sans', sans-serif`,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '12px',
            lineHeight: '16px',
          },
        },
      },
      MuiTableCell: {
        root: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '16px',
          color: ' #505F79',
        },
        head: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '14px',
          color: '#505F79',
        },
      },
      MuiTypography: {
        root: {
          fontFamily: `'Open Sans', sans-serif`,
        },
        body1: {
          fontFamily: `'Open Sans', sans-serif`,
        },
        h6: {
          fontFamily: `'Open Sans', sans-serif`,
        },
      },
    },
  });

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiInputBase: {
        // Name of the rule
        root: {
          // Some CSS
          display: 'block',
          paddingLeft: '5px',
          fontFamily: `'Open Sans', sans-serif`,
        },
      },
    },
  });

  const progressBarTheme = createMuiTheme({
    palette: {
      // Style sheet name ⚛️
      primary: {
        // Name of the rule
        main: '#008000',
      },
      secondary: {
        main: '#FFFF00',
      },
      inherite: {
        main: '#483D8B',
      },
    },
  });

  const getCircleColor = value => {
    if (!Number(value)) return kenTheme.palette.KenColors.kenBlack;
    if (
      value >= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MIN &&
      value <= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MAX
    ) {
      return kenTheme.palette.KenColors.orange;
    } else if (value <= KEY_ATTENDANCE_PROGRESS_VALUES.RANGE_MIN) {
      return kenTheme.palette.KenColors.red;
    } else {
      return kenTheme.palette.KenColors.green;
    }
  };
  const columns = [
    {
      name: 'ContactId',
      label: 'Contact Id',
      options: {
        display: false,
      },
    },
    {
      name: 'ContactName',
      label: t('headings:Name'),

      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const studentID = tableMeta.rowData[0];
          return (
            <>
              <Link
                to={`/${Routes.studentDetails}/${studentID}`}
                style={{ textDecoration: 'none' }}
              >
                <GlobalStyle />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt="user" className={classes.grey}>
                    {value.charAt(0)}
                  </Avatar>
                  <Typography
                    style={{ marginLeft: 10 }}
                    className={classes.studentNameFonts}
                  >
                    {value}
                  </Typography>
                </div>
              </Link>
              <div />
            </>
          );
        },
      },
    },
    {
      name: 'ProgramName',
      label: t('Program_Name'),
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Name',
      label: t('headings:Courses'),
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'No_Of_Classes_Attended__c',
      label: t('Classes_Attended'),
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Percentage_of_classes_attended__c',
      label: t('headings:Attendance'),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <GlobalStyle />
            <div className="customRender">
              <MuiThemeProvider theme={progressBarTheme}>
                <CircularProgressWithLabel
                  value={
                    value > +KEY_ATTENDANCE_PROGRESS_VALUES.MAX
                      ? +KEY_ATTENDANCE_PROGRESS_VALUES.MAX
                      : +value
                  }
                  size={20}
                  thickness={6}
                  circleColor={getCircleColor(+value)}
                />
              </MuiThemeProvider>
            </div>
          </>
        ),
      },
    },
    {
      name: 'reports',
      label: t('headings:Report_Action'),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const studentID = tableMeta.rowData[0];
          const data = tableMeta.rowData[1];
          console.log(data);
          return (
            <Link
              to={{
                pathname: `/${Routes.reports}/${studentID}`,
                state: tableMeta,
              }}
              style={{ textDecoration: 'none' }}
            >
              <Box>
                <img
                  alt="report-icon"
                  src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/Assesments.svg`}
                  className={classes.reportActionIcon}
                />
              </Box>
            </Link>
          );
        },
      },
    },
    // {
    //     name: "",
    //     label: "",
    //     options: {
    //         filter: false,
    //         sort: false,
    //         customBodyRender: (value, tableMeta, updateValue) => (
    //             <PopupState variant="popover" popupId="demo-popup-popover" className={classes.moreColumn}>
    //                 {(popupState) => (
    //                     <div>
    //                         <MoreVertIcon {...bindTrigger(popupState)} className={classes.moreColumn} style={{ fontSize: 'medium', cursor: 'pointer' }} />
    //                         <Popover
    //                             {...bindPopover(popupState)}
    //                             anchorOrigin={{
    //                                 vertical: 'bottom',
    //                                 horizontal: 'center',
    //                             }}
    //                             transformOrigin={{
    //                                 vertical: 'top',
    //                                 horizontal: 'center',
    //                             }}
    //                         >
    //                             <Box p={2}>
    //                                 <div style={{ display: 'flex' }}>
    //                                     <img src={MailIcon} alt="Message" />
    //                                     <Typography style={{ paddingLeft: '3px' }}>{t("Message")}</Typography>
    //                                 </div>
    //                             </Box>
    //                         </Popover>
    //                     </div>
    //                 )}
    //             </PopupState>
    //         )
    //     }
    // },
  ];

  const SearchBox = () => (
    <div className={classes.searchBox}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <MuiThemeProvider theme={theme}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={event => searchTableHandler(event)}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );

  const searchTableHandler = event => {
    const searchString = event.target.value;

    const data = [...initialTableData];
    const searchResult = data.filter(column => {
      return (
        column.ContactName.toLowerCase().includes(searchString.toLowerCase()) ||
        column.ProgramName.toLowerCase().includes(searchString.toLowerCase()) ||
        column.Name.toLowerCase().includes(searchString.toLowerCase())
      );
    });

    setTableData(searchResult);
  };

  const muiDatatableOptions = {
    selectableRows: 'none',
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    expandableRowsHeader: true,
    rowsPerPageOptions: [10, 30, 50],
    customToolbar: SearchBox,
    textLabels: {
      body: {
        noMatch: 'Data not found',
        toolTip: 'Sort',
      },
    },
    sortOrder: {
      name: 'ContactName',
      direction: 'asc',
    },
  };

  return (
    <div style={{ position: 'relative', marginTop: 20 }}>
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
export default StudentDataTable;
