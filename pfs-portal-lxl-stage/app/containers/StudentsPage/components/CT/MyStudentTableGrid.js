import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../../global_components/KenCard';
import KenGrid from '../../../../global_components/KenGrid';
import ContactCell from '../../../../global_components/KenGrid/components/ContactCell';
import KenAvatar from '../../../../components/KenAvatar';
import CircularProgressWithLabel from '../../../../components/ChartWidgets/CircularProgressWithLabel';
import { KEY_ATTENDANCE_PROGRESS_VALUES } from '../../../../utils/constants';

import Routes from '../../../../utils/routes.json';
import { Link } from 'react-router-dom';
import KenLoader from '../../../../components/KenLoader';

const useStyles = makeStyles(theme => ({
  name: {
    textAlign: 'left',
    marginLeft: 38,
    color: theme.palette.KenColors.neutral400,
    fontSize: 10,
  },
  studentAttendance: {
    fontSize: 12,
  },
}));

export default function StudentTableGrid({
  data = [],
  title,
  loading,
  programPlanId,
}) {
  const classes = useStyles();
  const getAttendanceStatusColor = value => {
    const kenTheme = useTheme();
    if (!Number(value)) return kenTheme.palette.KenColors.kenBlack;
    if (value <= 60) {
      return kenTheme.palette.KenColors.red;
    } else if (value >= 60 && value <= 75) {
      return kenTheme.palette.KenColors.yellow;
    } else {
      return kenTheme.palette.KenColors.green;
    }
  };

  const AttendanceCell = ({ value }) => {
    return (
      <div>
        <CircularProgressWithLabel
          value={value}
          size={30}
          thickness={6}
          circleColor={getAttendanceStatusColor(value)}
          label={Math.floor(value)}
        />
      </div>
    );
  };
  const { t } = useTranslation();
  const columns = [
    {
      Header: (
        <Typography className={classes.name}>{t('headings:Name')}</Typography>
      ),
      accessor: 'ContactName',
      Cell: ({ value, row }) => {
        return (
          <Link
            to={`/${Routes.studentDetails}/${row.original.ContactId}`}
            style={{ textDecoration: 'none' }}
          >
            <ContactCell value={value} />
          </Link>
        );
      },
    },
    {
      Header: 'Attendance / Total Classes',
      accessor: 'StudentAttendance',
      Cell: ({ value, row }) => {
        return (
          <Typography className={classes.studentAttendance}>
            {value} / {row?.original?.FacultyAttendance}
          </Typography>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Total Attendance',
      accessor: 'TotalAttendance',
      Cell: AttendanceCell,
      disableGlobalFilter: true,
    },
    {
      Header: t('headings:Reports'),
      accessor: 'ContactId',
      Cell: ({ row, value }) => {
        return (
          <Link
            to={`/${Routes.reports}?ContactId=${value}&ProgramId=${
              row?.original?.ProgramId
            }&Section=${row?.original?.Section}`}
            style={{ textDecoration: 'none' }}
          >
            <Box>
              <img
                alt="report-icon"
                src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/Assesments.svg'}
                // className={classes.reportActionIcon}
                style={{ height: 30 }}
              />
            </Box>
          </Link>
        );
      },
      disableGlobalFilter: true,
    },
  ];

  return (
    <KenCard paperStyles={{ padding: 16 }}>
      {loading && <KenLoader />}
      <KenGrid columns={columns} data={data} pagination={{ disabled: false }} />
    </KenCard>
  );
}
