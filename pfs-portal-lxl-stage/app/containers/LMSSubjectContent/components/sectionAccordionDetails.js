import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listItemText: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '150%',
  },
}));

export default function SectionsAccordionDetails(props) {
  const { subSectionList } = props;
  const classes = useStyles();

  return (
    <>
      <List component="nav" aria-label="secondary mailbox folders">
        {subSectionList?.map((item, index) => {
          return (
            <ListItem button>
              <ListItemText
                primary={item?.name}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
