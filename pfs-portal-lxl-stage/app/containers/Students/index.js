/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Box } from '@material-ui/core';
import StudentTable from '../StudentsPage/components/StudentTable';

export default function Students(props) {
  const { drawerChanges } = props;

  React.useEffect(() => {
    drawerChanges('show');
  }, []);
  return (
    <Box>
      <Box mt={2}>
        <StudentTable />
      </Box>
    </Box>
  );
}
