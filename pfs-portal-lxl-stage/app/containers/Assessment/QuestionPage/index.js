import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Chip,
  Typography,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import KenAppBar from '../../../global_components/KenHeader';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import KenButton from '../../../global_components/KenButton';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes.json';
import KenDialogBox from '../../../components/KenDialogBox/index';
import KenAutoComplete from '../../../components/KenAutoComplete';
import KenInputField from '../../../global_components/KenInputField/index';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import KenSelect from '../../../components/KenSelect/index';
import Hidden from '@material-ui/core/Hidden';
import QuestionContent from './Components/QuestionContent/index';
import AssessmentGlobalActions from './Components/AssessmentGlobalActions';
import {
  addQuestionsToQuiz,
  getQuizQuestions,
  publishUnpublishLMSModule,
} from '../../../utils/ApiService';
import { uniqueArrayObjects } from './Components/QuestionTypes/Utils';
import RecentCollaborations from './Components/RecentCollaborations/index';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// import AvatarGroup from '../../../global_components/AvatarGrop/index';
import SaveAssessmentSvg from '../../../assets/Images/SaveAssessment.svg';
import AssessmentSavedSuccess from '../../../assets/Images/AssessmentSavedSuccess.svg';
import KenLinearProgress from '../../../global_components/KenLinearProgress';

const useStyles = makeStyles(theme => ({
  headWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  assessmentTitle: {
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
    fontSize: 18,
  },
  titleIcon: {
    color: theme.palette.KenColors.primary,
    marginLeft: 10,
    cursor: 'pointer',
  },
  headerIcons: {
    color: theme.palette.KenColors.primary,
    background: theme.palette.KenColors.neutral11,
    padding: 4,
    borderRadius: '50%',
    marginLeft: 10,
    cursor: 'pointer',
  },
  btnWrap: {
    marginRight: 16,
    textTransform: 'capitalize',
  },
  discardBtnWrap: {
    marginRight: 24,
  },
  upArrow: {
    border: `2px solid ${theme.palette.KenColors.kenWhite}`,
    borderRadius: '50%',
    height: 20,
    marginRight: 6,
    width: 20,
    color: theme.palette.KenColors.kenWhite,
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upArrowIcon: {
    fontSize: 16,
  },
  saveButton: {
    color: theme.palette.KenColors.kenWhite,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  discardLabel: {
    color: theme.palette.KenColors.tertiaryRed502,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  popupTitle: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
  },
  titleHead: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral900,
    paddingBottom: 0,
  },
  chipWrap: {
    border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
    padding: 8,
    marginTop: 24,
  },
  chipRoot: {
    borderRadius: 3,
    margin: 4,
    border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
    background: theme.palette.KenColors.kenWhite,
  },
  dialogPaper: {
    height: 'auto',
    position: 'absolute',
    top: 45,
    width: '475px',
  },
  grey: {
    backgroundColor: theme.palette.KenColors.neutral100,
    left: 0,
    paddingLeft: 1,
    paddingBottom: 1,
  },
  greyGroup: {
    backgroundColor: theme.palette.KenColors.neutral100,
    left: 10,
    paddingLeft: 1,
    paddingBottom: 1,
  },
  collaborationWrapper: {
    marginTop: 24,
  },
  extraAvatar: {
    color: theme.palette.KenColors.neutral900,
    background: theme.palette.KenColors.kenWhite,
    border: '0.5px solid #bdbdbd',
    fontSize: 12,
  },
  remainAvatars: {
    listStyleType: 'none',
    background: theme.palette.KenColors.kenWhite,
    paddingLeft: 10,
    left: 10,
    top: 12,
    width: '180px',
    position: 'absolute',
    zIndex: 1,
    fontSize: 12,
    boxShadow: '0px 1px 18px rgb(16 30 115 / 6%)',
    borderRadius: 3,
  },
  listItem: {
    padding: '0px 0px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  avatarlabel: {
    fontSize: 12,
    marginLeft: 10,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: '8px',
    marginBottom: '8px',
  },

  imgCenter: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: '90px',
    marginBottom: '12px',
  },
  messageText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#EF4060',
    marginTop: '12px',
    marginBottom: '8px',
  },
  infoText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#505F79',
    marginTop: '8px',
    marginBottom: '8px',
  },
  loaderAlign: {
    marginTop: '24px',
    marginBottom: '32px',
    marginLeft: '32px',
    marginRight: '32px',
  },
  actionArea: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    marginTop: '8px',
    marginBottom: '32px',
  },
  successText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#1BBE75',
  },
}));

export default function QuestionBank(props) {
  const classes = useStyles();

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);
  const [originalQuestionSet, setOriginalQuestionSet] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState();
  const [selectedQuestionId, setSelectedQuestionId] = React.useState([]);
  const [inputBoxShow, setInputBoxShow] = React.useState(false);
  const [quizUpdated, setQuizUpdated] = useState(false);
  const [transaction, setTransaction] = useState();
  const [quizId, setQuizId] = useState(props?.history?.location?.state?.quizId);
  const [quizName, setQuizName] = useState(
    props?.history?.location?.state?.quizName
  );
  const [origin, setOrigin] = useState(
    props?.history?.location?.state?.origin || 'Dashboard'
  );
  const [publishStatus, setPublishStatus] = useState(
    props?.history?.location?.state?.status || 'unpublished'
  );
  const history = useHistory();

  const [disabledSend, setDisabledSend] = React.useState(true);

  const [inputValue, setInputValue] = React.useState('Periodic assessment');
  const [inviteText, setInviteText] = React.useState('Send Invite');
  const [invite, setInvite] = React.useState([]);
  const [remainLength, setRemainLength] = React.useState(0);
  const [remainAvatars, setRemainAvatars] = React.useState([]);
  const [showAvatarDropdown, setShowAvatarDropdown] = React.useState(false);
  const [arr, setArr] = React.useState([]);

  const [confirmation, setConfirmation] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleDialogOpen = () => {
    setConfirmation(true);
  };

  const handleDialogClose = () => {
    setConfirmation(false);
    setOpenSuccess(false);
  };
  /* action button */
  const handleGoHome = () => {
    if (origin === 'Activities') {
      history.push(`/${Routes.acadamicContent}`);
    } else {
      history.push(`/${Routes.home}`);
    }
  };
  const handleGoAssessment = () => {
    history.push(`/assessment`);
  };
  const handleGoPreview = () => {
    history.push({
      pathname: `/assessmentPreview`,
      state: {
        data: {
          cmid: quizId,
          status: publishStatus,
          date: '02-04-2021,10:30 AM',
          origin: 'question-page',
        },
      },
    });
  };
  const handleSaveProceed = async () => {
    setConfirmation(false);
    setProcessing(true);
    handlePublish();
  };

  const handleClickOpen = () => {
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Add All the questions from question bank to quiz
  const addAllQuestion2Quiz = async () => {
    let allQuestions = uniqueArrayObjects(selectedQuestions, 'questionid');
    allQuestions = allQuestions?.map(item => {
      return { questionid: item?.questionid };
    });

    const payload = { questions: allQuestions, quizId: quizId };

    return addQuestionsToQuiz(payload)
      .then(res => {
        console.log('questions added to quiz successfully');
        return !res.hasOwnProperty('errorcode');
      })
      .catch(error => {
        console.log('error questions to quiz', error);
        return false;
      });
  };
  const handleSubmit = async () => {
    addAllQuestion2Quiz();
  };

  useEffect(() => {
    console.log('quiz updated, calling get questions APIS');
    getQuizQuestions(quizId).then(res => {
      setOriginalQuestionSet(res?.questions);
      if (!res.hasOwnProperty('errorcode')) {
        const selected =
          res?.questions?.map(item => {
            console.log('item', item);
            return {
              ...item,
              id: item.id,
              mark: item.mark,
              sectionId: item.sectionid,
              sectionName: item.section,
              page: item.page || 1,
              questionid: item.id,
              questionname: item.name,
              questiontype: item.qtype,
              selected: true,
              text: item.questiontext,
            };
          }) || [];
        console.log('selected:::', selected);

        const unique = uniqueArrayObjects(
          [...selectedQuestions, ...selected],
          'questionid'
        );
        console.log('unique que list', unique);

        setSelectedQuestions(unique);
        setTransaction(); //clear the middle panel
      } else {
        console.log('something went wrong');
      }
    });
  }, [quizUpdated]);

  const getSelectedQuestions = questions => {
    const questionsList = [...selectedQuestions, ...questions];
    const flags = [];
    const output = [];
    const len = questionsList.length;
    let i;
    for (i = 0; i < len; i++) {
      if (flags[questionsList[i].questionid]) continue;
      flags[questionsList[i].questionid] = true;
      output.push(questionsList[i]);
    }
    // //On clicking 'add selected' Calling add questions to quiz api
    // addAllQuestion2Quiz()
    setSelectedQuestions(output);
  };

  const getSelectedQuestionsId = id => {
    setSelectedQuestionId(id);
  };

  const getSelectedQuestion = question => {
    setSelectedQuestion(question);
  };
  const posts = [
    { id: '1', label: 'Haylie Lipshutz' },
    { id: '2', label: 'Sheema' },
    { id: '3', label: 'Jaylon Calzoni' },
    { id: '4', label: 'Paityn Gouse' },
    { id: '5', label: 'Joe Root' },
    { id: '6', label: 'Sara Cruz' },
    { id: '7', label: 'Curtiswea' },
    { id: '8', label: 'Mark' },
  ];

  const handleSelection = val => {
    let selected = arr.find((item, i) => item.id == val.id);
    if (!selected) {
      return setArr([...arr, val]);
    } else {
      return setArr([...arr]);
    }
  };

  useEffect(() => {
    if (arr.length > 0) {
      setInviteText(`Invite ${arr.length} Teacher${arr.length < 2 ? '' : 's'}`);
      setDisabledSend(false);
    } else {
      setInviteText('Send Invite');
      setDisabledSend(true);
    }
  }, [arr]);

  const handleDelete = chipToDelete => () => {
    setArr(chips => chips.filter(chip => chip !== chipToDelete));
  };

  const showInput = () => {
    setInputBoxShow(true);
  };

  const onBlur = () => {
    setInputBoxShow(false);
  };

  const updateInput = e => {
    setInputValue(e.target.value);
  };

  const eventHandler = () => {
    setInputBoxShow(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSendInvite = () => {
    setOpen(false);
    let initLength = arr.slice(0, 5).length; //min 5
    let remainLength = Math.abs(arr.length - initLength);
    let remainItems = arr.slice(initLength);
    setRemainLength(remainLength);
    setRemainAvatars(remainItems);
    console.log(remainLength, remainItems);
    setInvite(arr);
  };
  const handlePublish = () => {
    const payload = {
      method: 'post',
      quizid: quizId,
      publish: 1,
    };

    publishUnpublishLMSModule(payload)
      .then(res => {
        console.log('res', res);
        if (res && res[0]['status'] === true) {
          setProcessing(false);
          setOpenSuccess(true);
          setPublishStatus('published');
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  //   //   UseEffect to add question to quiz as soon as it is added to a list
  //   useEffect(() => {
  //     if (selectedQuestions?.length > 0) {
  //       addAllQuestion2Quiz()
  //         .then(res => {
  //           console.log('res of add que', res);
  //         })
  //         .catch(err => {
  //           console.log('err', err);
  //         });
  //     }
  //     // setQuizUpdated(!quizUpdated);
  //   }, [selectedQuestions]);

  return (
    <Box mt={2} data-testid="question-bank">
      <KenAppBar
        menuIcon={
          <></>
          //   <Typography className={classes.titleIcon}>
          //     <ArrowBackOutlinedIcon />
          //   </Typography>
        }
        title={
          <Box className={classes.headWrap}>
            {inputBoxShow === true ? (
              <Grid md={3}>
                <KenInputField
                  required
                  onBlur={onBlur}
                  value={quizName}
                  //   endAdornment={
                  //     <Box>
                  //       {/* <HighlightOffOutlinedIcon onClick={eventHandler} /> */}
                  //       <DoneIcon />
                  //     </Box>
                  //   }
                  onChange={updateInput}
                  iconClickEvent={eventHandler}
                />
              </Grid>
            ) : (
              <Typography className={classes.assessmentTitle}>
                {quizName}
              </Typography>
            )}

            {/* <Typography className={classes.titleIcon} onClick={showInput}>
              <CreateOutlinedIcon />
            </Typography> */}
            {/* <Link to={`/${Routes.assessment}`}> */}
            <Typography
              className={classes.headerIcons}
              onClick={() => {
                props.history.push({
                  // pathname: `/assessment`,
                  pathname: `/assessment/${quizId}`,
                  state: {
                    quizId: quizId,
                    operation: 'update',
                  },
                });
              }}
            >
              <SettingsOutlinedIcon />
            </Typography>
            {/* </Link> */}
            {/* <Typography
              className={classes.headerIcons}
              onClick={handleClickOpen}
            >
              <PersonAddOutlinedIcon />
            </Typography> */}
            {invite.length > 0 && (
              <Box style={{ display: 'flex', marginLeft: 10 }}>
                {
                  <React.Fragment>
                    {arr.slice(0, 5).map((item, i) => {
                      return (
                        <Avatar alt={item.label} className={classes.greyGroup}>
                          {item?.label.charAt(0)}
                        </Avatar>
                      );
                    })}
                    {remainLength > 0 && (
                      <React.Fragment>
                        <div
                          style={{ position: 'relative' }}
                          onMouseOver={() => setShowAvatarDropdown(true)}
                          onMouseLeave={() => setShowAvatarDropdown(false)}
                        >
                          <Avatar
                            className={classes.extraAvatar}
                          >{`+${remainLength}`}</Avatar>
                          {showAvatarDropdown && remainLength > 0 && (
                            <ul className={classes.remainAvatars}>
                              {remainAvatars.map((item, i) => {
                                return (
                                  <li className={classes.listItem} key={i}>
                                    <Avatar
                                      alt={item.label}
                                      className={classes.greyGroup}
                                      style={{ float: 'left', left: 0 }}
                                    >
                                      {item?.label.charAt(0)}
                                    </Avatar>
                                    <p className={classes.avatarlabel}>
                                      {item.label}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                }
              </Box>
            )}
          </Box>
        }
      >
        <AssessmentGlobalActions
          handleSubmit={() => handleSubmit()}
          disablePublishAction={selectedQuestions.length === 0}
          disablePreviewAction={selectedQuestions.length === 0}
          handlePublish={() => handleDialogOpen()}
          publishStatus={publishStatus}
          origin={origin}
          handleGoAssessment={handleGoAssessment}
          handleGoHome={handleGoHome}
          handleGoPreview={handleGoPreview}
        />
      </KenAppBar>
      <Box mt={2}>
        <QuestionContent
          getSelectedQuestions={getSelectedQuestions}
          selectedQuestions={selectedQuestions}
          selectedQuestionId={selectedQuestionId}
          getSelectedQuestionsId={getSelectedQuestionsId}
          getSelectedQuestion={getSelectedQuestion}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          setQuizUpdated={setQuizUpdated}
          quizUpdated={quizUpdated}
          transaction={transaction}
          setTransaction={setTransaction}
          quizId={quizId}
          originalQuestionSet={originalQuestionSet}
        />
      </Box>
      <KenDialogBox
        open={open}
        // handleClose={handleClose}
        handleCancel={handleCancel}
        handleSendInvite={handleSendInvite}
        // handleClickOpen={handleClickOpen}
        disabledSend={disabledSend}
        styleOverrides={{ dialogPaper: classes.dialogPaper }}
        title="INVITE TEACHERS"
        titleStyle={classes.titleHead}
        customButtonText={inviteText}
      >
        <Box>
          <Typography className={classes.popupTitle}>
            {t(
              'messages:select_upto_teachers_to_invite_and_collaborate_with_this_assessment'
            )}
          </Typography>
          {arr?.length > 0 && (
            <Box className={classes.chipWrap}>
              {arr.map(el => (
                <Chip
                  classes={{
                    root: classes.chipRoot,
                    deleteIcon: classes.deleteChipIcon,
                  }}
                  avatar={
                    <Grid>
                      <Avatar alt="user" className={classes.grey}>
                        {el?.label.charAt(0)}
                      </Avatar>
                    </Grid>
                  }
                  label={el?.label}
                  onDelete={handleDelete(el)}
                  className={classes.chip}
                />
              ))}
            </Box>
          )}
          <Box pt={3}>
            <KenAutoComplete
              options={posts}
              placeholder="Search..."
              setData={handleSelection}
            />
          </Box>
          <Grid className={classes.collaborationWrapper}>
            <RecentCollaborations
              posts={posts}
              onhandleAddItem={handleSelection}
            />
          </Grid>
        </Box>
      </KenDialogBox>

      {/* Publish assessment modals */}
      <Dialog
        open={confirmation || processing || openSuccess}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        {confirmation && confirmation ? (
          <>
            <DialogTitle className={classes.title}>
              {t('labels:Publish_Assessment')}
            </DialogTitle>
            <DialogContent>
              <img src={SaveAssessmentSvg} className={classes.imgCenter} />

              <DialogContentText className={classes.messageText}>
                Are you sure to publish this assessment?
              </DialogContentText>
              <DialogActions className={classes.actionArea}>
                <KenButton
                  onClick={handleDialogClose}
                  variant="outlined"
                  color="primary"
                >
                  Cancel
                </KenButton>
                <KenButton
                  onClick={handleSaveProceed}
                  color="primary"
                  autoFocus
                  variant="contained"
                >
                  Publish
                </KenButton>
              </DialogActions>
            </DialogContent>
          </>
        ) : processing && processing === true ? (
          <>
            <DialogTitle className={classes.title}>
              {t('labels:Publish_Assessment')}
            </DialogTitle>
            <DialogContent>
              <img src={SaveAssessmentSvg} className={classes.imgCenter} />
              <DialogContentText className={classes.infoText}>
                Assessment is being published...
              </DialogContentText>
              <Box className={classes.loaderAlign}>
                <KenLinearProgress delay={400} />
              </Box>
            </DialogContent>
            {/* {handleAck()} */}
          </>
        ) : openSuccess && openSuccess === true ? (
          <>
            <DialogTitle className={classes.title}>
              Assessment Published
            </DialogTitle>
            <DialogContent>
              <img src={AssessmentSavedSuccess} className={classes.imgCenter} />
              <DialogContentText className={classes.successText}>
                Congratulations, you have successfully published assessment.
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actionArea}>
              <KenButton
                onClick={handleGoAssessment}
                variant="outlined"
                color="primary"
              >
                Create another assessment
              </KenButton>
              <KenButton
                onClick={handleGoHome}
                color="primary"
                autoFocus
                variant="contained"
              >
                Go {` to ${origin}`}
              </KenButton>
              <KenButton
                onClick={handleDialogClose}
                color="primary"
                autoFocus
                variant="contained"
              >
                Stay here
              </KenButton>
            </DialogActions>
          </>
        ) : (
          ''
        )}
      </Dialog>
    </Box>
  );
}
