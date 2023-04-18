/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Box } from '@material-ui/core';
// import StudentTable from './components/StudentTable';
import StudentTable from './components/CT/MyStudentsTable';

export default function StudentsPage(props) {
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
