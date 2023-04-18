import { Avatar, Box, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../global_components/KenCard';
import KenGrid from '../../../global_components/KenGrid';
import ContactCell from '../../../global_components/KenGrid/components/ContactCell';
import { KEY_ATTENDANCE_PROGRESS_VALUES } from '../../../utils/constants';
import Routes from '../../../utils/routes.json';
import { Link } from 'react-router-dom';
import KenLoader from '../../../components/KenLoader';

export default function StudentTableGrid({ data = [],noData, title, loading }) {

  const AttendanceCell = ({ value }) => {
    return (
      <div > 
        <Typography style={{fontSize:12}} >
          {value != undefined ? `${Math.round(value)}%` : ''}
        </Typography>
      </div>
    );
  };
  const { t } = useTranslation();
  const columns = [
    {
      Header: t('headings:Name'),
      accessor: 'contactName',
      Cell: ({ value, row }) => {
        return (
          <Link
            to={`/${Routes.studentDetails}/${row.original.contactId}`}
            style={{ textDecoration: 'none' ,}}
          >
            <ContactCell value={value} />
          </Link>
        );
      },
    },
    {
      Header: 'Registration ID',
      accessor: 'registrationNumber',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'Work Experience',
    //   accessor: 'workExperiance',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'Email ID',
      accessor: 'contactEmail',
      disableGlobalFilter: true,
    },
    
    // {
    //   Header: t('Classes_Attended'),
    //   accessor: 'No_Of_Classes_Attended__c',
    //   disableGlobalFilter: true,
    // },
    //  {
    //   Header: t('headings:Attendance'),
    //   accessor: 'percentage',
    //   Cell: AttendanceCell,
    //   disableGlobalFilter: true,
    // }, 
    // {
    //   Header: t('headings:Reports'),
    //   accessor: 'ContactId',
    //   Cell: ({ row, value }) => {
    //     return (
    //       <Link
    //         to={`/${Routes.reports}?ContactId=${value}&ProgramId=${
    //           row.original.ProgramId
    //         }&CourseOfferingID=${row.original.CourseOfferingID}`}
    //         style={{ textDecoration: 'none' }}
    //       >
    //         <Box>
    //           <img
    //             alt="report-icon"
    //             src={AssessmentIcon}
    //             // className={classes.reportActionIcon}
    //             style={{ height: 30 }}
    //           />
    //         </Box>
    //       </Link>
    //     );
    //   },
    //   disableGlobalFilter: true,
    // },
  ];

  return (
    <KenCard paperStyles={{ padding: 16 }}>
      {loading && <KenLoader />}
      <div className="mystudent-table">
      <KenGrid columns={columns} data={data} pagination={{ disabled: false }} noDataText={noData}/>
      </div>
    </KenCard>
  );
}
