import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listItemText: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '150%',
  },
  container: {
    cursor: 'pointer',
  },
}));

export default function SectionsListItem(props) {
  const {
    sectionBackgroundColor,
    sectionColor,
    section,
    onSectionClick,
  } = props;
  const classes = useStyles();

  return (
    <>
      <Box
        style={{ backgroundColor: sectionBackgroundColor }}
        p={2}
        mb={2}
        onClick={() => onSectionClick(section)}
        className={classes.container}
      >
        <Typography
          style={{ color: sectionColor }}
          className={classes.listItemText}
        >
          {section?.name}
        </Typography>
      </Box>
    </>
  );
}
