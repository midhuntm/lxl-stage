import React from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import { withStyles, makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral400,
    display: 'flex',
    alignItems: 'center',
  },
  summaryRoot: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  summaryContent: {
    alignItems: 'center',
    color: theme.palette.KenColors.neutral400,
    '&$expanded': {
      margin: '12px 0',
      color: theme.palette.KenColors.neutral900,
    },
  },
}));

const Accordion = withStyles({
  root: {
    border: 0,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: '0.5px solid #E3E3E3',
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const KenAccordion = props => {
  const {
    label,
    panelId,
    expanded,
    onExpand,
    elevation,
    icon = <ExpandMoreIcon />,
    titleProps = {},
    contentProps = {},
    classOverrides = {},
    children,
  } = props;

  const classes = useStyles();

  return (
    <Accordion
      elevation={elevation}
      square
      expanded={expanded}
      onChange={() => onExpand(panelId)}
    >
      <AccordionSummary
        expandIcon={icon}
        {...titleProps}
        classes={{
          root: classOverrides.summaryRoot
            ? classOverrides.summaryRoot
            : classes.summaryRoot,
          content: classOverrides.summaryContent
            ? classOverrides.summaryContent
            : classes.summaryContent,
        }}
      >
        <Typography className={classes.heading}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails
        classes={
          classOverrides.detailsRoot
            ? { root: classOverrides.detailsRoot }
            : null
        }
        {...contentProps}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default KenAccordion;
