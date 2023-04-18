import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CircularProgress, Button, Typography, Box } from '@material-ui/core';
import configContext from '../../../../utils/helpers/configHelper';
import { payNow } from '../../../../utils/ApiService';
import {
  getUserDetails,
  getParentDetails,
} from '../../../../utils/helpers/storageHelper';
import Routes from '../../../../utils/routes.json';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paynowButton: {
    // border: `1px solid ${theme.palette.KenColors.neutral60}`,
    margin: 8,
    backgroundColor: theme.palette.KenColors.primary,
    color: theme.palette.KenColors.kenWhite,
  },
}));

const TutionFeesDataTable = props => {
  const { config } = React.useContext(configContext);
  const { resp, data = [] } = props;
  const [tableData, setTableData] = useState([]);
  const { t } = useTranslation();
  const classes = useStyles();
  const [total, setTotal] = React.useState();
  const [breakFee, setBreakFee] = React.useState();
  const theme = useTheme();
  const { loading } = props;
  const [button, setButton] = React.useState(true);

  useEffect(() => {
    // sorting data based on due date in ascending order
    setTableData(
      data.sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate))
    );
    // setTableData(
    //   data.map(el => {
    //     el.paid1 = el.pending;
    //     return el;
    //   })
    // );

    // const tempTotal = data
    //   .map(el => el.paid1)
    //   .reduce((prev, cur) => prev + cur, 0);
    // setTotal(tempTotal);
  }, [props]);

  const tableTheme = createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          width: '100%',
          maxWidth: '100%',
        },
      },
      MuiTableRow: {
        root: {
          '&$selected': {
            backgroundColor: theme.palette.KenColors.primary,
          },
          '&:hover': {
            backgroundColor: `${theme.palette.KenColors.neutral20} !important`,
          },
        },
      },
      MUIDataTableSelectCell: {
        checked: { color: `${theme.palette.KenColors.primary} !important` },
      },
      MUIDataTableHeadCell: {
        sortAction: {
          alignItems: 'center',
          height: -1,
        },
        sortActive: {
          color: theme.palette.KenColors.neutral400,
        },
        root: {
          // fontFamily: `'Open Sans', sans-serif`,
          // fontStyle: "normal",
          // fontWeight: "400px",
          // fontSize: "10px",
          // lineHeight: "14px",
          // color: theme.palette.KenColors.neutral400,
        },
        data: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: '400px',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400,
        },
      },
      MuiTableCell: {
        head: {
          fontFamily: `'Open Sans', sans-serif`,
          fontStyle: 'normal',
          fontWeight: '400px',
          fontSize: '10px',
          lineHeight: '14px',
          color: theme.palette.KenColors.neutral400,
        },
      },
    },
  });

  const columns = [
    {
      name: 'title',
      label: 'FEE DETAILS',

      options: {
        filter: true,
        sort: true,
        // customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
    {
      name: 'installment',
      label: 'INSTALLMENT',
      options: {
        filter: true,
        sort: true,
        // customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
    {
      name: 'dueDate1',
      label: 'DUE DATE',
      options: {
        filter: true,
        sort: true,
        //customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
    {
      name: 'pending',
      label: 'AMOUNT DUE (₹)',
      options: {
        filter: true,
        sort: true,
        //customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
    {
      name: 'paid',
      label: 'PAID AMOUNT (₹)',
      options: {
        filter: true,
        sort: true,
        // customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
      },
    },
  ];

  const pay = async () => {
    
    const API_URL =
      process.env.NODE_ENV === 'local'
        ? 'http://localhost:3000'
        : config.redirectUri;
    const child = getUserDetails();
    const parent = getParentDetails();
    const Payload = {
      accept_partial: false,
      amount: `${total}`,
      studentId: child.ContactId, //pass the contactId of child
      callBackUrl: `${API_URL}/${Routes.paymentSucces}`,
      currencyCode: resp.data.currencyCode,
      email: config.controller && config.controller.studentFee ? child.mail : parent.mail,
      mobile: config.controller && config.controller.studentFee ? child.Phone : parent.Phone,
      name: config.controller && config.controller.studentFee ? child.Name : parent.Name,
      paisa: resp.data.paisa.toString(),
      feesBreakUp: breakFee.map(item => {
        item.paid = item.pending;
        delete item.dueDate1;
        delete item.check;
        return item;
      }),
      orgId: config.orgID,
    };
    try {
      const res = await payNow(Payload);
      //console.log("res",res);
      if (res.data) {
        window.open(res.data.short_url, '_blank');
      }
    } catch (err) {
      console.log('Error in Payments', err);
    }
  };

  const PayNow = () => {
    return (
      <>
        {total ? (
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {total && (
              <Typography>{`${t('Total_Amount')} : ${total}`}</Typography>
            )}
            {button ? (
              <Button className={classes.paynowButton} onClick={pay}>
                {t('labels:Pay_Now')}
              </Button>
            ) : (
              <Button disabled={true}>{t('labels:Pay_Now')}</Button>
            )}
          </Box>
        ) : null}
      </>
    );
  };

  const selectRows = (curr, all, rowsSelected) => {
    rowsSelected.sort();
    tableData.forEach(item => {
      item.check = false;
    });
    let newArr = [];
    all.forEach(element => {
      tableData[element.dataIndex].check = true;
      newArr.push(tableData[element.dataIndex]);
    });
    const totalAmount = newArr
      .map(item => item.pending)
      .reduce((prev, cur) => prev + cur, 0);
    setBreakFee(newArr);
    if (all.length !== 0) {
      setTotal(totalAmount);
    } else {
      setTotal(undefined);
    }

    if (rowsSelected.length === 1 && tableData[0].check) {
      setButton(true);
    } else if (
      tableData.length > 1 &&
      !tableData[0].check &&
      tableData[1].check
    ) {
      setButton(false);
    } else {
      for (let i = 0; i < rowsSelected.length - 1; i++) {
        if (rowsSelected[i + 1] - rowsSelected[i] > 1) {
          console.log(rowsSelected[i + 1] - rowsSelected[i]);
          setButton(false);
          break;
        } else {
          setButton(true);
        }
      }
    }
  };

  const disableCheckBox = (dataIndex, selectedRows) => {
    if (dataIndex === 0) {
      return true;
    } else if (dataIndex > 0 && tableData[dataIndex].check) {
      return true;
    } else if (dataIndex > 0 && tableData[dataIndex - 1].check) {
      return true;
    }
    return false;
  };

  const muiDatatableOptions = {
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    expandableRowsHeader: true,
    pagination: true,
    rowsPerPageOptions: [10, 30, 50],
    customToolbar: PayNow,
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    textLabels: {
      body: {
        noMatch: loading ? 'Loading data...' : 'No pending overdues.',
        toolTip: 'Sort',
      },
    },
    sortOrder: {
      name: 'amount',
      direction: 'asc',
    },
    selectableRows: true,
    onRowSelectionChange: selectRows,
    isRowSelectable: disableCheckBox,
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* {loading && (
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
      )} */}
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

export default TutionFeesDataTable;
