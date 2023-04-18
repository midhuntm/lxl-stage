import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

const PaymentHistoryDataTable = props => {
  const [tableData, setTableData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const { t } = useTranslation();

  const { loading } = props;

  useEffect(() => {
    setTableData(props.data);
    setInitialTableData(props.data);
  }, [props]);

  const tableTheme = createMuiTheme(theme => ({
    overrides: {
      MUIDataTable: {
        paper: {
          width: '100%',
          maxWidth: '100%',
          minHeight: '550px',
        },
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
      },
    },
  }));

  const columns = [
    {
      name: 'title',
      label: 'DETAILS',

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name:"installment",
      label:"Installment",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paymentDate',
      label: t('Payment_Date'),
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "pending",
    //   label: "PENDING AMOUNT (₹)",
    //   options: {
    //     display: true,
    //   },
    // },
    {
      name: 'paid',
      label: 'PAID AMOUNT (₹)',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'actions',
      label: 'ACTIONS',
      options: {
        filter: true,
        sort: true,
        // customHeadRender: ({ index, ...column }) => setCustomColumnHeader(index, column),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <GetAppRoundedIcon
                onClick={() => {
                  console.log(value, tableMeta);
                  window.open(value.receiptUrl);
                }}
              />
            </>
          );
        },
      },
    },
  ];

  const muiDatatableOptions = {
    selectableRows: 'none',
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    expandableRowsHeader: true,
    pagination: true,
    rowsPerPageOptions: [10, 30, 50],
    textLabels: {
      body: {
        noMatch: loading ? 'Loading data...' : 'No Data found',
        toolTip: 'Sort',
      },
    },
    sortOrder: {
      name: 'amount',
      direction: 'asc',
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

export default PaymentHistoryDataTable;
