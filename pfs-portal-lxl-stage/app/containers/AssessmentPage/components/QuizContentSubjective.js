import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Box,
  makeStyles,
  Divider,
  Typography,
  Popover,
  Tabs,
  Tab,
} from '@material-ui/core';
import QuizItemsSubjective from './QuizItemsSubjective';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 16,
    maxHeight: '90vh',
    overflow: 'auto',
  },
  questionContainer: {
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    borderRadius: 3,
  },
  divider: {
    margin: 16,
  },
  questionType: {
    width: '100%',
    '& > p': {
      fontWeight: 600,
      fontSize: 14,
      padding: 16,
      color: theme.palette.KenColors.neutral900,
    },
  },
  questionText: {
    padding: 16,
  },
  sectionLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.KenColors.neutral900,
  },
  sectionTabs: {
    width: 'inherit',
    marginBottom: 10,
    marginTop: 10,
    '& .MuiTabs-scroller': {
      height: 37,
    },
    '& .MuiTab-textColorInherit': {
      opacity: 1,
    },
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
    },
  },
  sectionBtn: {
    minWidth: 34,
    minHeight: 37,
    background: theme.palette.KenColors.gradeSectionSubjectBg,
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    border: `1px solid ${theme.palette.KenColors.sideNavColor}`,
    fontWeight: 600,
    fontSize: 14,
    '&.Mui-disabled': {
      color: theme.palette.KenColors.tertiaryGray50,
      pointerEvents: 'auto',
    },
  },
  warningPopover: {
    pointerEvents: 'none',
    '& .MuiPopover-paper': {
      border: `0.6px solid ${theme.palette.KenColors.flagIconBorderColor}`,
      borderRadius: 3,
    },
  },
  popoverText: {
    fontSize: 12,
    color: theme.palette.KenColors.gradeTermLabel,
    padding: '12px 12px',
  },
}));

const SECTION_DATA = {
  id: '',
  name: '',
};
export default function QuizContentSubjective({ quizData }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [selectedSection, setSelectedSection] = useState(SECTION_DATA);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const key = Object.keys(quizData)[0];
    const data = {
      id: 0,
      name: quizData[key].name,
    };
    setSelectedSection(data);
  }, []);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const changeSection = (sectionIndex, section) => {
    const data = {
      id: sectionIndex,
      name: section.name,
    };
    setSelectedSection(data);
  };
  const getSectionNumber = index => {
    if (index === selectedSection.id) {
      return selectedSection.name;
    } else {
      return String.fromCharCode(index + 65);
    }
  };

  const renderQuestions = quizData?.Physics?.quizItem?.map(
    (question, index) => (
      <Box key={index} className={classes.questionText}>
        <QuizItemsSubjective quizItem={question} />
        {index < quizData?.Physics?.quizItem?.length - 1 && (
          <Divider variant="middle" className={classes.divider} />
        )}
      </Box>
    )
  );

  const renderSectionBtn = Object.keys(quizData).map((section, index) => (
    <Tab
      key={index}
      value={index}
      label={getSectionNumber(index)}
      className={classes.sectionBtn}
      onClick={() => changeSection(index, quizData[section])}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    />
  ));

  const question = {
    ques: {
      question: 'A leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can aA leguminous plant can A leguminous plant can aA leguminous plant can a',
    },
  };

  return (
    <Paper square elevation={0} className={classes.root}>
      <Grid container direction="column">
        <Typography className={classes.sectionLabel}>
          {t('labels:Sections')}
        </Typography>
        <Box className={classes.sectionTabs}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
            scrollButtons="off"
          >
            {renderSectionBtn}
          </Tabs>
        </Box>
      </Grid>
      <Box className={classes.questionContainer}>
        <Box className={classes.questionType}>
          <Typography>Subjective</Typography>
          <Divider />
        </Box>
        {/* <Box>{renderQuestions}</Box> */}
        <Box className={classes.questionText}>
          <QuizItemsSubjective quizItem={question.ques} />
          {/* {index < quizData?.Physics?.quizItem?.length - 1 && (
            <Divider variant="middle" className={classes.divider} />
          )} */}
        </Box>
      </Box>
      <Popover
        id={open ? 'simple-popover' : undefined}
        elevation={0}
        className={classes.warningPopover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
      >
        <Typography className={classes.popoverText}>
          Warning Message Warning Message.
        </Typography>
      </Popover>
    </Paper>
  );
}
