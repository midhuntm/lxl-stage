import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popper,
  Typography,
  Card,
} from '@material-ui/core';
// import AddedQuestion from '../../../../../assets/Images/Added-question.svg';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../../components/KenInputField/index';
import {
  // deleteQuestionFromQuiz,
  createSectionInQuiz,
} from '../../../../../utils/ApiService';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import KenButton from '../../../../../global_components/KenButton';
// import KenCheckbox from '../../../../../global_components/KenCheckbox';
import KenDialogBox from '../../../../../components/KenDialogBox';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    padding: 16,
  },
  subHeader: {
    padding: '4px 16px',
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
  },
  questionContents: {
    // textAlign: 'center',
    background: theme.palette.KenColors.neutral11,
    height: 400,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '93px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  label: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    width: '70%',
    margin: '28px auto',
  },
  sectionDialog: {
    height: 'auto',
  },
  deleteDialog: {
    height: 'auto',
  },
  deleteDialogContent: {
    padding: 0,
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  sectionBtn: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
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
  inputClass: {
    background: theme.palette.KenColors.secondaryBlue,
    border: `0.6px dashed ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: 3,
    fontSize: 12,
    height: 16,
    padding: 12,
    fontWeight: 400,
    color: theme.palette.KenColors.neutral900,
  },
  newSectionText: {
    background: theme.palette.KenColors.secondaryBlue,
    border: `0.6px dashed ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.KenColors.sectionBlue,
    padding: 12,
    height: 40,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionContents: {
    background: theme.palette.KenColors.kenWhite,
    height: 400,

    '&::-webkit-scrollbar': {
      width: '5px',
      height: '93px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  sectionIcons: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    background: theme.palette.KenColors.kenWhite,
    padding: 4,
    marginRight: 5,
    cursor: 'pointer',
  },
  deleteContainer: {
    width: 390,
    height: 'auto',
    // position: 'absolute',
    // boxShadow: ' 0px 1px 18px rgb(16 30 115 / 6%)',
    // borderRadius: 3,
    background: theme.palette.KenColors.kenWhite,
    padding: 10,
    // left: '85%'
  },
  deleteText: {
    fontSize: 12,
    color: '#061938',
    marginBottom: 15,
    fontWeight: 600,
  },
  deleteCard: {
    background: theme.palette.KenColors.kenWhite,
    border: ' 1px solid #E3E3E3',
    borderRadius: 3,
    padding: 10,
    marginBottom: 15,
    paddingTop: 0,
    paddingBottom: 0,
    cursor: 'pointer',
  },
  deleteHeadText: {
    '& span': {
      fontSize: 12,
      color: '#505F79',
    },
  },
  deleteContenttext: {
    fontSize: 12,
    color: '#505F79',
    paddingLeft: 30,
    marginTop: 0,
    width: '95%',
  },
  activeDelCard: {
    background: '#F4F6FF',
    opacity: 0.5,
    border: '0.5px solid #092682',
    borderRadius: 3,
  },
  deleteButton: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  cancelButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  questionBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& label': {
      marginRight: 0,
    },
  },
  checkBox: {
    width: '17%',
  },
  controlAndStats: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rootSummary: {
    padding: '0px',
    '&$expanded': {
      height: 30,
      padding: '10px 0px 0px 20px',
    },
  },
  summary: {
    '&$expanded': {
      margin: 0,
      height: 30,
    },
  },
  controlSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '10%',
    marginRight: 30,

    '& label': {
      margin: 0,
    },
  },
  qListTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  uploadText: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '20px',
    textTransform: 'uppercase',
    color: '#061938',
    textAlign: 'center',
    marginBottom: 30,
  },
}));

const Accordion = withStyles({
  root: {
    padding: '0px',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      padding: '10px 0px 0px 20px',
      paddingLeft: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 20,
    '&$expanded': {
      margin: 0,
      minHeight: 30,
      // padding: '10px 0px 0px 20px'
    },
  },
  content: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    '&$expanded': {
      margin: 0,
      // height: 30,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const QuestionSectionList = props => {
  const [editableName, setEditableName] = React.useState('');
  const [deleteOption, setDeleteOption] = React.useState('0');
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [openEditSection, setOpenEditSection] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [editableId, setEditableId] = React.useState(null);

  // const [selectedQuestionId, setSelectedQuestionId] = React.useState([]);

  const {
    quizId,
    sectionRes,
    updateSectionData,
    onDropQuestions,
    onDragOver,
    handleClick,
    handleType,
    setQuizUpdated, //to rerender question list
    selectedQuestions,
    onCloseSectionPopup,
    handleDelete,
    handleDeleteIcon,
    selectedQuestionId,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const deleteSectionWithQuestion = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteOptionChange = e => {
    setDeleteOption(e.target.value);
  };

  const editSectionName = () => {
    if (editableName.length > 0) {
      // create_section_in_quiz
      let sectionCount = selectedSection.page;
      let payload = {
        method: 'post',
        page: sectionCount,
        quizid: quizId,
        section: editableName,
      };
      createSectionInQuiz(payload)
        .then(res => {
          if (!res.hasOwnProperty('errorcode')) {
            setOpenEditSection(false);
            setQuizUpdated(true);
            console.log('edited successfully');
          } else {
            console.log('Something went wrong..');
            setQuizUpdated(true);
            setOpenEditSection(false);
          }
        })
        .catch(err => {
          setQuizUpdated(true);
          setOpenEditSection(false);
          console.log(err);
        });
      console.log('Something went wrong..');
    }
  };

  //drag n drop
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '',
    padding: grid,
    width: 250,
  });

  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    console.log('sInd--:', sInd);
    console.log('dInd--:', dInd);
    console.log('source--:', source);
    console.log('destination--:', destination);
    if (sInd === dInd) {
      const items = reorder(
        sectionRes[sInd].questions,
        source.index,
        destination.index
      );
      console.log('items::-', items);
      const newState = [...sectionRes];
      newState[sInd] = { ...sectionRes[sInd], questions: items };
      //   setSectionRes(newState);
      console.log('newState::', newState);
      updateSectionData(newState);
      //   setState(newState);
    } else {
      const result = move(
        sectionRes[sInd].questions,
        sectionRes[dInd].questions,
        source,
        destination
      );
      const newState = [...sectionRes];
      newState[sInd] = { ...sectionRes[sInd], questions: result[sInd] };
      newState[dInd] = { ...sectionRes[dInd], questions: result[dInd] };
      console.log('newState::', newState);
      const updatedNewState = newState?.map(item => {
        const questionList = item?.questions.map(el => {
          return {
            ...el,
            sectionName: item.section,
            sectionId: item.sectionid,
          };
        });
        return {
          ...item,
          questions: questionList,
        };
      });
      //   console.log('newState::', newState.filter(group => group.length));
      updateSectionData(updatedNewState);

      //   setSectionRes(newState.filter(group => group.length));
      //   setState(newState.filter(group => group.length));
    }
  }

  return (
    <React.Fragment>
      <Box
        className={classes.questionContents}
        container
        alignItems="center"
        justify="center"
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {/* {sectionRes.map((item, index) => ( */}
          {sectionRes.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={false}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.qListTitle}>
                        {el?.section}
                      </Typography>
                      <Box className={classes.controlSection}>
                        <FormControlLabel
                          id={el.sectionid}
                          onClick={event => {
                            event.stopPropagation();
                            setOpenEditSection(true);
                            setEditableName(el?.section);
                            setEditableId(el?.sectionid);
                            setSelectedSection(el);
                          }}
                          onFocus={event => event.stopPropagation()}
                          control={
                            <FiEdit3
                              className={classes.sectionIcons}
                              style={{ color: '#7A869A' }}
                            />
                          }
                        />
                        <FormControlLabel
                          id={el.sectionid}
                          onClick={event => {
                            event.stopPropagation();
                            setOpenDeletePopup(true);
                            setSelectedSection(el);
                            setEditableName(el?.section);
                            setEditableId(el?.sectionid);
                          }}
                          onFocus={event => event.stopPropagation()}
                          control={
                            <RiDeleteBinLine
                              className={classes.sectionIcons}
                              style={{ color: '#EF4060' }}
                            />
                          }
                        />
                      </Box>
                    </AccordionSummary>
                    {el.questions?.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <AccordionDetails>
                              <Grid container>
                                <Grid
                                  xs={12}
                                  item
                                  // onDrop={event => { onDropQuestions(event, index, q) }}
                                  // onDragOver={event => { onDragOver(event) }}
                                  style={{ curson: 'pointer' }}
                                >
                                  {/* {item?.questions?.map((q, index) => { */}
                                  {/* return ( */}
                                  <>
                                    <Paper
                                      style={{
                                        padding: '10px',
                                        backgroundColor:
                                          selectedQuestionId &&
                                          selectedQuestionId ===
                                            item?.questionid
                                            ? '#F4F6FF'
                                            : '',
                                      }}
                                      onClick={e => {
                                        handleClick(e, item);
                                      }}
                                      justifyContent="space-between"
                                      variant="outlined"
                                      square
                                      draggable={true}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                      >
                                        <Typography
                                          style={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                          }}
                                        >
                                          {index + 1}.{item?.questiontext}
                                        </Typography>
                                        {/* {selectedQuestionId &&
                                                            selectedQuestionId === q.questionid ? (
                                                            <span style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                <RiDeleteBinLine className={classes.sectionIcons} onClick={handleDeleteIcon} style={{ color: '#EF4060', height: 26, background: 'transparent' }} />
                                                                <KenPopover
                                                                    id={id}
                                                                    open={open}
                                                                    anchorEl={anchorEl}
                                                                    handleClose={() => { setAnchorEl(null); }}
                                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                                                                    transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                                                    onclose={() => { setAnchorEl(null); }}>

                                                                    <Paper style={{ padding: 20 }} justifyContent="space-between" >
                                                                        <Typography style={{ marginBottom: 15, fontSize: 14 }}>
                                                                            Do you want to remove the question?
                                                                        </Typography>

                                                                        <Box style={{ width: '85%', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
                                                                            <Button onClick={() => { setAnchorEl(null); }} variant="outlined">Cancel</Button>
                                                                            <Button variant="contained" color="primary" onClick={e => { handleDelete(e, q); }}>Remove</Button>
                                                                        </Box>
                                                                    </Paper>
                                                                </KenPopover>
                                                            </span>
                                                        ) : ''
                                                        } */}
                                      </Box>
                                      <Box
                                        style={{
                                          marginRight: '4px',
                                          marginLeft: '16px',
                                          marginTop: '6px',
                                        }}
                                      >
                                        <Chip
                                          label={handleType(item?.questiontype)}
                                          style={{
                                            backgroundColor: '#F4F6FF',
                                            color: '#00218D',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '12px',
                                            padding: 3,
                                          }}
                                          variant="outlined"
                                        />
                                        <Typography
                                          color="primary"
                                          display="inline"
                                          style={{
                                            fontWeight: 600,
                                            fontSize: '12px',
                                            lineHeight: '18px',
                                            marginLeft: '4px',
                                          }}
                                        >
                                          &nbsp;&nbsp; {Number(item?.mark)}
                                          &nbsp;Marks{' '}
                                        </Typography>
                                      </Box>
                                    </Paper>
                                  </>
                                  {/* ); */}
                                  {/* })} */}
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Accordion>
                  {provided.placeholder}

                  {/* return ( */}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Box>
      <div data-testid="questionbank-modal">
        <KenDialogBox
          open={openEditSection}
          handleClose={onCloseSectionPopup}
          dialogActionFlag={false}
          maxWidth="xs"
          styleOverrides={{ dialogPaper: classes.sectionDialog }}
        >
          <React.Fragment>
            <p className={classes.uploadText}>Edit Section name</p>
            <Grid
              sm={12}
              md={12}
              style={{ padding: '0px 8px', marginBottom: 10 }}
            >
              <KenInputField
                placeholder="Type section name"
                inputBaseClass={classes.inputClass}
                value={editableName}
                name={`editableName`}
                autofocus={true}
                optionalLabel={false}
                onChange={newValue => {
                  setEditableName(newValue.target.value);
                }}
              />
            </Grid>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'end',
                margin: '20px 0px',
              }}
            >
              <KenButton
                variant="secondary"
                onClick={() => {
                  setOpenEditSection(false);
                }}
                buttonClass={classes.cancelButton}
              >
                {t('labels:Cancel')}
              </KenButton>
              <KenButton
                variant="primary"
                color="primary"
                onClick={editSectionName}
                buttonClass={classes.deleteButton}
              >
                Update
              </KenButton>
            </Grid>
          </React.Fragment>
        </KenDialogBox>
      </div>
      <div data-testid="questionbank-modal">
        <KenDialogBox
          open={openDeletePopup}
          handleClose={onCloseSectionPopup}
          dialogActionFlag={false}
          maxWidth="xs"
          styleOverrides={{ dialogPaper: classes.deleteDialog }}
        >
          <Grid className={classes.deleteContainer} id="deleteContainer">
            <Typography className={classes.deleteText}>
              Delete section
            </Typography>
            <form>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={deleteOption}
                  onChange={handleDeleteOptionChange}
                >
                  <Card
                    className={
                      classes.deleteCard +
                      `${deleteOption == '0' ? ' deleteCardActive' : ''}`
                    }
                    onClick={() => {
                      setDeleteOption('0');
                    }}
                  >
                    <FormControlLabel
                      className={classes.deleteHeadText}
                      value="0"
                      control={<Radio />}
                      label="Only delete section name"
                    />
                    <p className={classes.deleteContenttext}>
                      This will only delete the section name and the questions
                      will remain without any section name
                    </p>
                  </Card>
                  <Card
                    className={
                      classes.deleteCard +
                      `${deleteOption == '1' ? ' deleteCardActive' : ''}`
                    }
                    onClick={() => {
                      setDeleteOption('1');
                    }}
                  >
                    <FormControlLabel
                      className={classes.deleteHeadText}
                      value="1"
                      control={<Radio />}
                      label="Delete section and questions in it"
                    />
                    <p className={classes.deleteContenttext}>
                      This will delete both section and and the questions in
                      this section
                    </p>
                  </Card>
                </RadioGroup>

                <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                  <KenButton
                    variant="secondary"
                    onClick={deleteSectionWithQuestion}
                    buttonClass={classes.cancelButton}
                  >
                    {' '}
                    {t('labels:Cancel')}
                  </KenButton>
                  <KenButton
                    variant="primary"
                    color="primary"
                    onClick={deleteSectionWithQuestion}
                    buttonClass={classes.deleteButton}
                  >
                    Delete Section
                  </KenButton>
                </Grid>
              </FormControl>
            </form>
          </Grid>
        </KenDialogBox>
      </div>
    </React.Fragment>
  );
};
export default QuestionSectionList;
