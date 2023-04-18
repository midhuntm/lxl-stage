import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import KenSelect from '../../../../components/KenSelect';
import KenButton from '../../../../global_components/KenButton';
import Cart from '../../../../assets/icons/cart.svg';
import Calendar from '../../../../assets/icons/calendar-dropdown.svg';
import PaperMoney from '../../../../assets/icons/paper-money.svg';
import Ledger from '../../../../assets/icons/ledger.svg';
import { useHistory } from 'react-router-dom';
import Routes from '../../../../utils/routes.json';

const useStyle = makeStyles(theme => ({
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  infoContainer: {
    background: '#FFFFFF',
    'box-shadow': '0px 0px 9px #D6E0FF',
    'border-radius': '3px',
    padding: 8,
    minWidth: 344,
  },
  parent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'space-between',
    background: '#F6F7FA',
    'border-radius': '2px',
    padding: '14px 12px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '10px',
    'line-height': '100%',
    'text-align': 'center',
    color: '#505F79',
    marginBottom: '8px',
  },

  value: {
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '600',
    'font-size': '14px',
    'line-height': '100%',
    'text-align': 'center',
    color: '#7A869A',
  },
  actionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    'box-shadow': '0px 0px 9px #D6E0FF',
    'border-radius': '3px',
    marginTop: 8,
    padding: 8,
    minWidth: 344,
  },
  actions: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
  },
  select: {
    '& .MuiInput-root': {
      width: '100%',
    },

    '& .MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input': {
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'flex',

      '& img': {
        marginRight: '8px',
      },
    },
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    'font-family': 'Open Sans',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '14px',
    'line-height': '280%',
    color: '#465881',

    '& img': {
      marginRight: '8px',
    },
  },
  children: {
    background: '#FFFFFF',
    'box-shadow': '0px 0px 9px #D6E0FF',
    'border-radius': '3px',
    marginTop: 8,
    padding: 8,
  },
}));

export function Header({
  activePath = Routes.myCart,
  onSave,
  onEdit,
  children,
  info,
  showEdit = false,
  showSave = false,
}) {
  const classes = useStyle();
  const history = useHistory();
  const [selectedView, setSelectedView] = useState(activePath);
  const dropdown = [
    {
      img: Cart,
      label: 'My Cart',
      path: Routes.myCart,
    },
    {
      img: Calendar,
      label: 'Fee Schedule',
      path: Routes.feeSchedule,
    },
    {
      img: Ledger,
      label: 'Fee Payment',
      path: Routes.feesPayment,
    },
    {
      img: PaperMoney,
      label: 'My Transaction',
      path: Routes.myTransactions,
    },
  ];

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.infoContainer}>
        <Box className={classes.parent}>
          <Box className={classes.row}>
            <Box>
              <Box className={classes.label}>Student Reg Id</Box>
              <Box className={classes.value}>{info.regID}</Box>
            </Box>

            <Box>
              <Box className={classes.label}>Student Class</Box>
              <Box className={classes.value}>{info.studentClass}</Box>
            </Box>

            <Box>
              <Box className={classes.label}>Student Name</Box>
              <Box className={classes.value}>{info.studentName}</Box>
            </Box>

           {/*  <Box>
              <Box className={classes.label}>Student Class</Box>
              <Box className={classes.value}>{info.studentClass}</Box>
            </Box> */}
          </Box>
          <Box mt="24px" className={classes.row}>
          {/* <Box>
              <Box className={classes.label}>Student Class</Box>
              <Box className={classes.value}>{info.studentClass}</Box>
            </Box> */}
             {/* <Box>
              <Box className={classes.label}>Year of Admission</Box>
              <Box className={classes.value}>{info.admissionYear}</Box>
            </Box> */}

           {/*  <Box>
              <Box className={classes.label}>Paid Fee</Box>
              <Box className={classes.value}>{info.paidFee}</Box>
            </Box>  */}
          </Box>
        </Box>
      </Box>

      <Box className={classes.actionHeader}>
        <Box width={'50%'} className={classes.select}>
          <Select
            width="100%"
            value={selectedView}
            onChange={e => {
              e.preventDefault();
              history.push(`/${e.target.value}`);
            }}
          >
            {dropdown.map(item => (
              <MenuItem value={item.path} className={classes.menuItem}>
                <img src={item.img} height="14px" width="14px" />
                <Box component="span">{item.label}</Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box className={classes.actions}>
          {showEdit && (
            <KenButton
              variant="primary"
              onClick={e => {
                typeof onEdit === 'function' && onEdit(e);
              }}
            >
              Edit
            </KenButton>
          )}
          {showSave && (
            <KenButton
              variant="primary"
              onClick={e => {
                typeof onSave === 'function' && onSave(e);
              }}
            >
              Save
            </KenButton>
          )}
        </Box>
      </Box>

      <Box className={classes.children}>{children}</Box>
    </Box>
  );
}
