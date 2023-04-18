import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import ContactCell from '../../../global_components/KenGrid/components/ContactCell';
import { useHistory } from 'react-router-dom';

import Routes from '../../../utils/routes.json';
import { Link } from 'react-router-dom';
import KenLoader from '../../../components/KenLoader';

export default function QuizReportGrid({
  data = [],
  noData,
  title,
  loading,
  quizId,
  quizInfo
}) {
  const history = useHistory();

  const moveToAttemptReview = data => {
    if (data?.totalattempts > 0) {
      history.push({
        pathname: Routes.studentPerformance,
        state: {
          // attemptId: data.attemptId,
          contactId: data.contactid,
          studentName: data.contactName,
          quizId: quizId,
          quizInfo: quizInfo
        },
      });
    }
  };

  const { t } = useTranslation();

  const ActionCell = row => {
    console.log('ActionCell row', row);
    return (
      <Box>
        <Button
          size="small"
          variant="contained"
          color="primary"
          style={{ borderRadius: 15 }}
          disabled={row.row.original.totalattempts < 1}
          onClick={() => moveToAttemptReview(row.row.original)}
        >
          Result
        </Button>
      </Box>
    );
  };

  const columns = [
    {
      Header: 'S.No',
      accessor: 'index',
      disableGlobalFilter: true,
    },
    {
      Header: t('headings:Name'),
      accessor: 'contactName',
      Cell: ({ value, row }) => {
        return (
          // <Link
          //     to={`/${Routes.studentDetails}/${row.original.contactid}`}
          //     style={{ textDecoration: 'none', }}
          // >(
          <Grid>
            <ContactCell value={value} />
          </Grid>
          // </Link>
        );
      },
    },
    {
      Header: 'Email ID',
      accessor: 'email',
      disableGlobalFilter: true,
    },
    {
      Header: 'Grade',
      accessor: 'grade',
      Cell: ({ value, row }) => {
        return (
          <Grid>{value.length > 0 ? value : '-'}</Grid>
          // </Link>
        );
      },
      disableGlobalFilter: true,
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Total Attempts',
      accessor: 'totalattempts',
      disableGlobalFilter: true,
    },
    {
      Header: '',
      accessor: 'action',
      disableGlobalFilter: true,
      Cell: ActionCell,
    },
  ];

  return (
    <KenCard paperStyles={{ padding: 16 }}>
      {loading && <KenLoader />}
      <div className="mystudent-table">
        <KenGrid
          columns={columns}
          data={data}
          pagination={{ disabled: false }}
          noDataText={noData}
          customPlaceHolder={'Search by Name & Status'}
        />
      </div>
    </KenCard>
  );
}
