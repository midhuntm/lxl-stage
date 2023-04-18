import React, { useState } from 'react';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddQuestionOptionCard from '../QuestionOptionCard/index';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import KenIcon from '../../../../../global_components/KenIcon';
import { FaFileAlt, FaLaptop } from 'react-icons/fa'; // file,question bank
import { BiArrowToRight } from 'react-icons/bi';
import QuestionBankModal from '../QuestionBankModal';
import UploadQuestionsModal from '../UploadQuestions';

const useStyles = makeStyles(theme => ({
  questionBankBtn: {
    background: theme.palette.KenColors.kenWhite,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
  },
  btnName: {
    marginLeft: 8,
  },
  accordionRoot: {
    boxShadow: 'none',
    '&:before': {
      background: 'none',
    },
    expandContent: {
      margin: 0,
    },
  },
  summary: {
    alignItems: 'center',
  },
  summaryRoot: {
    padding: '4px 16px',
  },
  heading: {
    marginLeft: 8,
    color: theme.palette.KenColors.neutral900,
    fontWeight: 600,
    fontSize: 14,
  },
  detailBox: {
    background: theme.palette.KenColors.kenWhite,
    margin: '8px 16px',
    borderRadius: 3,
  },
  detailsRoot: {
    alignItems: 'center',
    padding: 16,
  },

  infoIcon: {
    textAlign: 'end',
    color: theme.palette.KenColors.neutral61,
    height: 20,
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  sectionBtn: {
    display: 'flex',
  },
  addedQuestionLabels: {
    padding: '8px 16px',
  },
  sectionLabel: {
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 6,
  },
  outlineIcon: {
    width: 18,
  },
  addIcon: {
    border: `1px solid ${theme.palette.KenColors.primary}`,
    borderRadius: '50%',
    color: theme.palette.KenColors.primary,
    fontSize: 14,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showLabel: {
    color: theme.palette.KenColors.primary,
    fontSize: 12,
    marginTop: 10,
  },
  questionWrap: {
    maxHeight: 470,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral700}`,
    },
  },
}));

export default function AddQuestions(props) {
  const classes = useStyles();

  const { t } = useTranslation();

  const {
    array = [],
    handleTypeClicked,
    getSelectedQuestions,
    selectedQuestions,
  } = props;

  const theme = useTheme();

  const [questionBankModalOpen, setQuestionBankModalOpen] = useState(false);
  const [uploadQuestionModelOpen, setUploadQuestionModelOpen] = useState(false);

  const accordionTheme = createMuiTheme({
    overrides: {
      MuiCollapse: {
        wrapper: {
          background: theme.palette.KenColors.neutral7,
        },
      },
    },
  });

  const handleQuestionBankModalOpen = () => {
    setQuestionBankModalOpen(true);
  };

  const handleQuestionBankModalClose = () => {
    setQuestionBankModalOpen(false);
  };
  const handleUploadQuestionModalClose = () => {
    setUploadQuestionModelOpen(false);
  };
  const handleUploadQuestionModalOpen = () => {
    setUploadQuestionModelOpen(true);
  };

  return (
    <Box>
      <Grid data-testid="add-questions">
        <Hidden xsDown>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.addedQuestionLabels}
          >
            <Typography item>{t('labels:Add_question')}</Typography>
            <Typography item>
              <KenIcon
                icon={BiArrowToRight}
                styles={{
                  color: theme.palette.KenColors.gradeSectionHeaderLabel,
                }}
              />
            </Typography>
          </Grid>
        </Hidden>
        <Box className={classes.questionWrap} pb={2}>
          <Box p={2} mt={2} className={classes.questionBankBtn}>
            <AddQuestionOptionCard
              handleOnClick={handleQuestionBankModalOpen}
              icon={FaLaptop}
              label="From question bank"
              iconColor={theme.palette.KenColors.orange10}
              bgColor={theme.palette.KenColors.orange11}
            />
          </Box>

          <Box mt={2}>
            <>
              {array?.map((menuItem, index) => (
                <MuiThemeProvider theme={accordionTheme}>
                  <Accordion
                    classes={{
                      root: classes.accordionRoot,
                      expanded: classes.expandContent,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.summary,
                        root: classes.summaryRoot,
                      }}
                    >
                      <Typography>
                        {' '}
                        <KenIcon
                          iconType="img"
                          variant="medium"
                          icon={menuItem?.accordionIcon}
                        />
                      </Typography>
                      <Typography className={classes.heading}>
                        {menuItem?.accordionHeader}
                      </Typography>
                    </AccordionSummary>
                    {menuItem?.subArray?.map((subItem, index) => (
                      <Box
                        className={classes.detailBox}
                        onClick={() => handleTypeClicked(subItem)}
                      >
                        <AccordionDetails
                          key={index}
                          classes={{ root: classes.detailsRoot }}
                        >
                          <Grid xs={2} md={2} sm={2}>
                            {' '}
                            {subItem.label == 'Numericals' ? (
                              <img
                                src={subItem?.icon}
                                style={{ width: 30, marginLeft: -5 }}
                              />
                            ) : (
                              <>
                                {typeof subItem?.icon === 'string' ? (
                                  <KenIcon
                                    iconType="img"
                                    variant="extraSmall"
                                    icon={subItem?.icon}
                                  />
                                ) : (
                                  <> {subItem?.icon}</>
                                )}
                              </>
                            )}
                          </Grid>
                          <Grid xs={8} md={8} sm={8}>
                            {' '}
                            <Typography className={classes.subItemLabel}>
                              {subItem?.label}
                            </Typography>{' '}
                          </Grid>
                          <Grid xs={2} md={2} sm={2}>
                            {' '}
                            <Typography className={classes.infoIcon}>
                              {subItem?.infoIcon}{' '}
                            </Typography>
                          </Grid>
                        </AccordionDetails>
                      </Box>
                    ))}
                  </Accordion>
                </MuiThemeProvider>
              ))}
            </>
          </Box>
          {/* <Box p={2} mt={2} className={classes.questionBankBtn}>
            <AddQuestionOptionCard
              icon={FaFileAlt}
              handleOnClick={handleUploadQuestionModalOpen}
              label=" Upload questions"
              iconColor={theme.palette.KenColors.tertiaryPurple201}
              bgColor={theme.palette.KenColors.tertiaryPurple51}
            />
          </Box> */}
        </Box>
      </Grid>
      <QuestionBankModal
        handleAddQuestions={(questions, closeModal) => {
          getSelectedQuestions(questions);
          closeModal && handleQuestionBankModalClose();
          console.log('selected questions QuestionAddButton Page', questions);
        }}
        selectedQuestions={selectedQuestions}
        open={questionBankModalOpen}
        onClose={handleQuestionBankModalClose}
      />
      <UploadQuestionsModal
        open={uploadQuestionModelOpen}
        onClose={handleUploadQuestionModalClose}
      />
    </Box>
  );
}
