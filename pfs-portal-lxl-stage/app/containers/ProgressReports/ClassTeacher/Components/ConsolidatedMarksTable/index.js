import { Typography, makeStyles, Avatar, useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../../../global_components/KenCard';
import KenGrid from '../../../../../global_components/KenGrid';
import { KEY_EMPTY_VALUES_PLACEHOLDERS } from '../../../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    height: '32px',
    width: '32px',
    fontSize: '16px',
    background: theme.palette.KenColors.neutral100,
  },
  profile: { display: 'flex', alignItems: 'center' },
  name: {
    marginLeft: 10,
    textAlign: 'left',
    fontSize: '13px',
    color: theme.palette.KenColors.tertiaryBlue502,
  },
  disabled: {
    background: theme.palette.KenColors.neutral13,
  },
  header: {
    textAlign: 'left',
  },
  total: {
    fontWeight: 600,
    fontSize: '12px',
  },
  customHeading: {
    fontSize: '10px',
    lineHeight: '150%',
    textTransform: 'uppercase',
    color: theme.palette.KenColors.neutral400,
  },
}));

export default function ConsolidatedMarksTable(props) {
  const { data = [], subjects = [] } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  const subjectColumns = () => {
    return subjects.map(sub => {
      return {
        Header: sub.subject,
        accessor: sub.subject,
      };
    });
  };

  const StudentCell = row => {
    return (
      <div className={classes.profile}>
        <Avatar alt="user" classes={{ root: classes.root }}>
          {row.value.charAt(0)}
        </Avatar>
        <Typography className={classes.name}>{row.value}</Typography>
      </div>
    );
  };

  const TotalCell = row => {
    return (
      <Typography className={classes.total}>
        {row.value === 'null'
          ? KEY_EMPTY_VALUES_PLACEHOLDERS.DOUBLE_DASH
          : row.value}
      </Typography>
    );
  };

  const columns = [
    {
      Header: (
        <Typography className={classes.customHeading}>Student Name</Typography>
      ),
      accessor: 'Student Name',
      Cell: StudentCell,
      className: classes.header,
    },
    ...subjectColumns(),
    {
      Header: <Typography className={classes.customHeading}>Total</Typography>,
      accessor: 'Total Marks',
      Cell: TotalCell,
      className: classes.disabled,
    },
  ];

  return (
    <KenCard paperStyles={{ padding: 0, boxShadow: 'none' }}>
      <KenGrid
        toolbarDisabled={true}
        columns={columns}
        data={data}
        pagination={{ disabled: false }}
      />
    </KenCard>
  );
}
