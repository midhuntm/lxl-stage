import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box } from '@material-ui/core';

export default function SectionsAccordions(props) {
  const {
    panel,
    expanded,
    handleChange,
    accordionSummary,
    accordionDetails,
    accordionBackgroundColor,
  } = props;

  return (
    <Box pb={1}>
      <Accordion
        onChange={handleChange(panel)}
        style={{ backgroundColor: accordionBackgroundColor }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {accordionSummary}
        </AccordionSummary>
        <AccordionDetails>{accordionDetails}</AccordionDetails>
      </Accordion>
    </Box>
  );
}
