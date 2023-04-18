import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { StepConnector } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';
import KenHeader from '../../global_components/KenHeader/index';
import KenButton from '../../global_components/KenButton/index';
import KenIcon from '../../global_components/KenIcon/index';
import { useTranslation } from 'react-i18next';
import { NavHashLink } from 'react-router-hash-link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, withRouter } from 'react-router-dom';
import Routes from '../../utils/routes.json';
import { HashLink } from 'react-router-hash-link';
import KenCollapse from '../KenCollapse/index';
import KenDialog from '../../components/KenDialogBox/index';
import history from '../../utils/history';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { BiInfoCircle } from 'react-icons/bi';
import KenLoader from '../../components/KenLoader';
import { styled } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#ffffff',
    // backgroundColor: useTheme().palette.KenColors.kenWhite,
    maxWidth: 360,
    boxShadow: '0px 8px 5px rgba(23, 43, 77, 0.04), 0px 15px 12px rgba(23, 43, 77, 0.08)',
    borderRadius: '3px'
  },
}))(Tooltip);

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  actionsContainer: {
    // marginBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      display: 'none',
      background: theme.palette.KenColors.KenWhite,
    },
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  labelContent: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.only('xs')]: {
      display: 'block',
      fontSize: 11,
    },
  },
  activeLabel: {
    fontSize: 14,
    color: `${theme.palette.KenColors.gradeSectionHeaderLabel} !important`,
    fontWeight: '600 !important',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
      fontSize: 11,
    },
  },
  completedLabel: {
    color: `${theme.palette.KenColors.tertiaryGreen504} !important`,
    fontWeight: '600 !important',
  },
  completedLine: {
    color: `${theme.palette.KenColors.tertiaryGreen504} !important`,
    border: 'none',
  },
  stepContent: {
    overflow: 'auto',
    width: '100%',
    padding: 16,
    borderLeft: `0.5px solid ${theme.palette.KenColors.assessmentBorder}`,
    height: 530,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral700}`,
    },
    [theme.breakpoints.only('xs')]: {
      height: 320,
      border: 'none',
    },
  },
  stepperRoot: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 0px',
    },
    "& .MuiStepIcon-completed": {
      color: theme.palette.KenColors.tertiaryGreen47,
      backgroundColor: theme.palette.KenColors.tertiaryGreen51,
    },
  },
  rootContent: {
    marginTop: 0,
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  header: {
    marginBottom: 16,
  },
  connectorRoot: {
    padding: 0,
  },
  iconRoot: {
    minWidth: 0,
  },
  primaryText: {
    fontSize: 12,
    marginLeft: 12,
    color: theme.palette.KenColors.neutral400,
  },
  completedLine: {
    borderColor: theme.palette.KenColors.tertiaryGreen504,
  },
  stepIcon: {
    color: theme.palette.KenColors.kenWhite,
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: '50%',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },
  stepIconText: {
    fill: theme.palette.KenColors.neutral100,
  },
  active: {
    '& $primaryText': {
      color: theme.palette.KenColors.neutral900,
      fontWeight: 600,
    },
  },
  activeStepIcon: {
    color: `${theme.palette.KenColors.neutral41} !important`,
    border: 'none',
  },
  rootListItem: {
    marginBottom: 0,
  },
  stepWrap: {
    display: 'flex',
    background: theme.palette.KenColors.kenWhite,
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },
  contentWrap: {
    // [theme.breakpoints.only('xs')]: {
    //   display: 'none',
    // },
  },
  link: {
    textDecoration: 'none',
  },
  linkItem: {
    display: 'flex',
    textDecoration: 'none',
  },
  stepContainer: {
    position: 'relative',
    '& .active-assessment-tab': {
      '& span': {
        color: theme.palette.KenColors.neutral900,
        fontWeight: 600,
      },
    },
  },
  footerBtn: {
    position: 'fixed',
    bottom: 0,
    background: theme.palette.KenColors.kenWhite,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  dialogPaper: {
    height: 'none',
  },
  offsetTop: {
    marginTop: 16,
  },
  hideSettingsClass: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 12,
    marginRight: 12
  },
  listItem: {
    marginBottom: 0,
    "&:hover ~ $listItemSecondaryAction": {
      visibility: "inherit"
    }
  },
  listItemSecondaryAction: {
    visibility: "hidden",
    position: 'absolute',
    right: '50%',
    "&:hover": {
      visibility: "inherit"
    }
  },
  tooltip: {
    display: 'block'
  },
  tooltipHeader: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
  },
  tooltipSubHeader: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 12,
    margin: 0,
    fontWeight: 600,
  },
  helpText: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    fontSize: 12
  },
  HelpItemBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10
  }
}));

function VerticalStepper(props) {
  const { values, steps, headerTitle, operation, getStepContent, orientation, handleSubmit, handleNext, handleBack, handleCancel, activeStep, setFieldValue, setActiveStep } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateQuizId, setUpdateQuizId] = React.useState(null)
  const handleTooltipClose = () => { setOpen(false); };

  const handleTooltipOpen = (e) => {
    // e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => { scrolltoTop() }, [])

  const scrolltoTop = () => {
    let wrapScroll = document.getElementById('scroll-tab-content');
    wrapScroll.scrollTop = 10
  }

  const commonMethod = op => {
    setFieldValue('operation', op);
    setFieldValue('payloadData', values)
    // setFieldValue('loading', true)
    handleSubmit();
  };

  const onLayoutScroll = e => {
    let ignoreScroll = document.getElementById('menu-timeLimitMinutes');
    let ignoreScroll1 = document.getElementById('menu-delay1Minutes');
    let ignoreScroll2 = document.getElementById('menu-delay2Minutes');

    if (!ignoreScroll && !ignoreScroll1 && !ignoreScroll2) {
      let takeAssessmentCard = document.getElementsByClassName('card-layout-wrap');
      let wrapScroll = document.getElementById('scroll-tab-content');
      let wrapScrollTop = e.target.scrollTop
      let scrollCheck = '';
      for (let i = 0; i < takeAssessmentCard.length; i++) {
        let card = takeAssessmentCard[i];
        let cardScrollTop = card.offsetTop - (takeAssessmentCard.length == i + 1 ? 375 : 100);
        if (wrapScrollTop > cardScrollTop) {
          scrollCheck = card.id;
        }
        card.className = card.className.replace('active', '');
      }
      let currentActiveCard = document.getElementById(scrollCheck.length > 0 ? scrollCheck : 'time');
      currentActiveCard.className = `${currentActiveCard.className} active`;
      let linkLists = document.getElementsByTagName('a');
      for (let i = 0; i < linkLists.length; i++) {
        let link = linkLists[i];
        link.className = link.className.replace('active-assessment-tab', '');
        if (link.href.includes(scrollCheck) && scrollCheck.length) {
          link.className = `${link?.className} active-assessment-tab`;
        } else if (link.href.includes("time") && !scrollCheck.length) {
          link.className = `${link?.className} active-assessment-tab`;
        }
      }
    }
  };

  useEffect(() => {
    if (!isNaN(values.urlQuizId)) {
      setUpdateQuizId(values.urlQuizId)
    }
  }, [])

  console.log(activeStep);
  return (
    <Box>
      {values.loading && <KenLoader />}
      <Grid className={classes.stepContainer}>
        <Grid xs={12} sm={12}>
          <Box className={classes.header}>
            <KenHeader title={`${operation + ' ' + headerTitle}`} subjectName={values.operation == "Edit" ? '' : (
              values.operation == "Create" && values.activeStep !== 0 ? values.subjectName : '')}>
              <div className={classes.actionsContainer}>
                <div>
                  <KenButton
                    variant="secondary"
                    onClick={() => { setOpenDialogCancel(true); }}
                    buttonClass={classes.button}>
                    {t('labels:Cancel')}
                  </KenButton>
                  {activeStep === 1 ? (
                    <KenButton
                      variant="secondary"
                      onClick={() => { setActiveStep(activeStep - 1); }}
                      buttonClass={classes.button}>
                      {t('labels:Back')}
                    </KenButton>
                  ) : (
                    ''
                  )}
                  {activeStep === 1 ? (
                    //   <Link to={`/${Routes.questionBank}`} className={classes.link}>
                    <KenButton
                      variant="primary"
                      color="primary"
                      onClick={() => commonMethod('submit')}
                      buttonClass={classes.button}
                    >
                      {t('labels:Save_and_Proceed')}
                      {/* {t('labels:Save_and_Proceed_to_Proctoring_Settings')} */}
                    </KenButton>
                  )
                    : activeStep === 2 ? ( //For protoring settings active
                      //   <Link to={`/${Routes.questionBank}`} className={classes.link}>
                      <KenButton
                        variant="primary"
                        color="primary"
                        onClick={() => commonMethod('submit')}
                        buttonClass={classes.button}
                      >
                        {t('labels:Save_and_Proceed')}
                      </KenButton>
                    ) : (
                      //   </Link>
                      <KenButton
                        variant="primary"
                        color="primary"
                        onClick={() => commonMethod('next')}
                        buttonClass={classes.button}
                      >
                        {t(`labels:Save and Proceed to ${headerTitle} Settings`)}
                      </KenButton>
                    )}
                </div>
              </div>
            </KenHeader>
          </Box>
          <Box className={classes.stepWrap}>
            <Grid className="scrollbar-cus" style={{ height: "auto", overflow: "hidden" }} sm={4} md={3}>
              <Stepper classes={{ root: classes.stepperRoot }}
                connector={<StepConnector classes={{ vertical: classes.connectorRoot, completed: classes.completedLine, }} />}
                activeStep={activeStep}
                orientation={orientation}
              >
                {steps?.map((step, index) => (
                  <Step>
                    <StepLabel
                      // key={index}
                      StepIconProps={{
                        classes: {
                          root: classes.stepIcon,
                          active: classes.activeStepIcon,
                          text: classes.stepIconText,
                          completed: classes.completedLine,
                        },
                      }}
                      classes={{
                        label: classes.labelContent,
                        active: classes.activeLabel,
                        completed: classes.completedLabel,
                      }}
                    >
                      {step.label}
                    </StepLabel>
                    {/* <Box className={classes.contentWrap}> */}
                    <StepContent classes={{ root: classes.rootContent, }} >
                      {step?.content?.map((item, contIndex) => (
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          // className={classes.root}
                          disablePadding
                        >
                          <NavHashLink
                            smooth
                            to={`/${item.link}`}
                            className={classes.linkItem}
                            activeClassName={classes.active}
                          >
                            <ListItem button key={contIndex} classes={{ selected: classes.active, container: classes.listItem }}>
                              <ListItemIcon classes={{ root: classes.iconRoot }}>
                                {/* <Typography>{item.img}</Typography> */}
                                <Typography>
                                  <KenIcon
                                    icon={item.img}
                                    styles={{
                                      color: theme.palette.KenColors.neutral400,
                                    }}
                                  />
                                </Typography>
                              </ListItemIcon>
                              {item.label == "Time" ?
                                <><ListItemText
                                  primary={item.label}
                                  classes={{ primary: classes.primaryText, root: classes.listItem, }}
                                >
                                </ListItemText>
                                  <ListItemSecondaryAction className={classes.listItemSecondaryAction} >
                                    <HtmlTooltip
                                      open={open}
                                      //disableFocusListener
                                      disableHoverListener
                                      disableTouchListener
                                      title={
                                        <Grid >
                                          <Typography className={classes.tooltipHeader}>{t('timeLabels:Time_settings')}</Typography>
                                          <Typography className={classes.tooltipSubHeader}>{t('timeLabels:Start_Quiz')}</Typography>
                                          <p style={{ color: theme.palette.KenColors.neutral100 }}>{t('timeInfo:Start_Quiz')}</p>
                                          <Typography className={classes.tooltipSubHeader}>{t('timeLabels:Time_Limit')}</Typography>
                                          <p style={{ color: theme.palette.KenColors.neutral100 }}>{t('timeInfo:Time_Limit')}</p>
                                          <Typography className={classes.tooltipSubHeader}>{t('timeLabels:When_Time_Expires')}</Typography>
                                          <p style={{ color: theme.palette.KenColors.neutral100 }}>{t('timeInfo:When_Time_Expires')}</p>
                                          <Typography className={classes.tooltipSubHeader}>{t('timeLabels:Submission_Grace_Period')}</Typography>
                                          <p style={{ color: theme.palette.KenColors.neutral100, marginBottom: 16 }}>{t('timeInfo:Submission_Grace_Period')}</p>
                                          <Grid className={classes.HelpItemBox}>
                                            <KenIcon
                                              icon={BiInfoCircle}
                                              styles={{
                                                color: theme.palette.KenColors.gradeSectionHeaderLabel,
                                                transform: 'rotate(180deg)',
                                                fontSize: 16,
                                                marginRight: 5
                                              }} />
                                            <Typography className={classes.helpText}>More help</Typography>
                                          </Grid>
                                        </Grid>

                                      }
                                    >
                                      <div className={classes.tooltip} onMouseOver={handleTooltipOpen} onMouseLeave={handleTooltipClose}>
                                        <KenIcon
                                          icon={BiInfoCircle}
                                          styles={{
                                            color: theme.palette.KenColors.neutral400,
                                            transform: 'rotate(180deg)',
                                            fontSize: 16
                                          }} />
                                      </div>
                                    </HtmlTooltip>
                                  </ListItemSecondaryAction>
                                </>
                                :
                                <ListItemText
                                  primary={item.label}
                                  classes={{ primary: classes.primaryText, root: classes.rootListItem, }} >
                                </ListItemText>
                              }
                            </ListItem>
                          </NavHashLink>
                        </List>
                      ))}
                      {step?.collapseItem?.length > 0 ? (
                        <>
                          <KenCollapse collapsedSize={200} label={t('headings:Show_Advanced_Settings')}>
                            <List component="div" disablePadding>
                              {step?.collapseItem?.map((subItem, subindex) => (
                                <HashLink smooth
                                  to={`/${subItem.link}`}
                                  className={classes.linkItem}>
                                  <ListItem button key={subindex}>
                                    <ListItemIcon classes={{ root: classes.iconRoot }}  >
                                      <Typography>
                                        <KenIcon icon={subItem.img} styles={{ color: theme.palette.KenColors.neutral400, }} />
                                      </Typography>
                                    </ListItemIcon>
                                    <ListItemText primary={subItem.label} classes={{ primary: classes.primaryText }} />
                                  </ListItem>
                                </HashLink>
                              ))}
                            </List>
                          </KenCollapse>
                        </>
                      ) : ('')}
                    </StepContent>
                    {/* </Box> */}
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {/* //put xs 12 */}
            <Grid sm={7} md={9} className={classes.stepContent} onScroll={onLayoutScroll} id={'scroll-tab-content'} >
              <div>{getStepContent(activeStep)}</div>
            </Grid>
          </Box>
        </Grid>
        <Box className={classes.footerBtn}>
          <div className={classes.actions}>
            <div>
              <KenButton
                variant="secondary"
                disabled={activeStep === 0}
                onClick={handleCancel}
                buttonClass={classes.button}
              >
                {t('labels:Cancel')}
              </KenButton>
              {activeStep === 1 ? (
                <KenButton
                  variant="secondary"
                  onClick={handleBack}
                  buttonClass={classes.button}
                >
                  {t('labels:Previous')}
                </KenButton>
              ) : (
                ''
              )}
              {activeStep === 1 ? (
                <Link to={`/${Routes.questionBank}`} className={classes.link}>
                  <KenButton
                    variant="primary"
                    color="primary"
                    onClick={handleSubmit}
                    buttonClass={classes.button}
                  >
                    {t('labels:Save_and_Proceed_to_Settings')}
                  </KenButton>
                </Link>
              ) :
                (
                  <KenButton
                    variant="primary"
                    color="primary"
                    onClick={handleNext}
                    buttonClass={classes.button}
                  >
                    {t('labels:Save_and_Proceed_to_Assessment_Settings')}
                  </KenButton>
                )}
            </div>
          </div>
        </Box>
        <KenDialog
          open={openDialogCancel}
          onClose={() => { setOpenDialogCancel(false); }}
          onhandleNoClick={() => { setOpenDialogCancel(false); }}
          onhandleYesClick={() => { props.history.push(`/${Routes.acadamicContent}`) }}
          // disabledOk={checkedValue === true ? false : true}
          // handleClickOpen={handleClickOpen}
          dialogActionFlag={false}
          yesNoActionFlag={true}
          maxWidth="xs"
          // titleStyle={classes.titleHead}
          styleOverrides={{ dialogPaper: classes.dialogPaper }}
        >
          <Grid container>
            <Grid item container direction="row" alignItems="center">
              <Grid item>
                <Typography className={classes.dialogAgree}>
                  Are you sure you want to Cancel ?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </KenDialog>
      </Grid>
    </Box>
  );
}

export default withRouter(VerticalStepper);
