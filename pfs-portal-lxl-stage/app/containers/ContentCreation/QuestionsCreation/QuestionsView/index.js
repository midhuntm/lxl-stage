import {
  Box,
  Chip,
  Tooltip,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  makeStyles,
  TablePagination,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
// icons
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Pagination from '@material-ui/lab/Pagination';
import NoQuestionDetail from '../noContent';
import FuzzySearch from 'fuzzy-search';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { fade } from '@material-ui/core/styles';
import ConfigureQuestion from '../../../../assets/Images/configureQuestion.svg';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    textTransform: 'uppercase',
    color: '#061938',
    marginTop: '8px',
    marginBottom: '12px',
    marginLeft: '7px',
  },
  questionGrid: {
    padding: '16px',
    borderBottom: '0.5px solid #E3E3E3',
  },
  questionText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '150%',
    color: '#505F79',
    // marginTop: 12,
    // marginBottom: 8,
    // marginLeft: 16,
  },
  questionMarks: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '150%',
    textAlign: 'right',
    // color: "#092682",
  },
  questionType: {
    // inner
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '100%',
    color: '#061938',
    flex: 'none',
    order: '0',
    flexGrow: '0',
    margin: '0px 6px',
    // outer
    background: '#F4F6FF',
    border: '0.6px solid #B9C3E4',
    boxSizing: 'border-box',
    borderRadius: '40px',
  },
  paginationBox: {
    marginTop: '32px',
    marginBottom: '36px',
    marginLeft: '9px',
  },
  IconButtonStyle: {
    background: '#FFFFFF',
    marginRight: '8px',
    marginLeft: '8px',
    height: '30px',
    width: '30px',
    padding: '6px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    fill: `${theme.palette.KenColors.neutral100} !important`,
  },
  content: {
    background: theme.palette.KenColors.kenWhite,
    // overflow: 'auto',
    // maxHeight: '470px',
    // '&::-webkit-scrollbar': {
    //   width: '4px',
    // },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral700}`,
    },
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  configureContents: {
    textAlign: 'center',
    background: theme.palette.KenColors.neutral11,
    margin: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 440,
    borderRadius: 3,
  },
  label: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    width: '70%',
    margin: '28px auto',
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  questionTypoText: {
    color: '#505F79',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '150%'
  },
  containerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // mediaFile: {
  //   width: '400px',
  //   margin: '0px 20px',
  //   cursor: 'pointer'
  // }
}));
export default function QuestionsView(props) {
  const {
    questions,
    pagination,
    setPagination,
    handlePreviewClick,
    setSelectedQuestion,
    handleQuestionUpdate,
    handleQuestionPreview,
    handleQuestionEdit,
  } = props;
  const [questionsInView, setQuestionsInView] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState([]);
  const [questionsClick, setQuestionsClick] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchItem, setSearchItem] = React.useState('');
  const { t } = useTranslation();

  const searcher = new FuzzySearch(questions, ['questiontext'], {
    caseSensitive: false,
  });

  // Pagination
  // useEffect(() => {
  //   let { page, perPageCount } = pagination;
  //   console.log(pagination)
  //   if (questions.length) {
  //     if (isMobile) {
  //       setQuestionsInView(questions);
  //     } else {
  //       let temp = questions.slice(
  //         page * perPageCount,
  //         page * perPageCount + perPageCount
  //       );
  //       setQuestionsInView(temp);
  //     }
  //   } else {
  //     setQuestionsInView([]);
  //   }
  // }, [questions, pagination, isMobile]);

  const handlePageChange = (e, newPage) => {
    setPagination(data => ({ ...data, page: newPage }));

    // setPagination(data => ({ ...data, page: val - 1 }));
  };

  const handleChangeRowsPerPage = event => {
    if (event.target.value === 'All') {
      setRowsPerPage(questions.length);
    } else {
      setRowsPerPage(event.target.value);
    }
    setPagination(data => ({ ...data, page: 0 }));

    // setPage(0);
  };
  /* select the question */
  const onQuestionsClick = (event, value) => {
    event.preventDefault();
    if (value.questionid) {
      setSelectedQuestionId(value.questionid);
    }
  };
  /* display the questions type */
  const handleType = type => {
    switch (type) {
      case 'truefalse':
        return 'True / False';
      case 'multichoice':
        return 'Multiple choice';
      case 'shortanswer':
        return 'Short Answer';
      case 'essay':
        return 'Essay';

      default:
      // return 'New';
    }
  };

  const onSearchQuestion = event => {
    const result = searcher.search(event.target.value);
    setSearchItem(event.target.value);
    setQuestionsInView(result);
  };
  useEffect(() => {
    setQuestionsInView(questions);
  }, [questions]);

  return (
    <Box
      style={{ padding: '15px', backgroundColor: 'white' }}
      component={Paper}
    >
      {questionsInView.length <= 0 ? (
        <React.Fragment>
          <Grid container>
            <Grid item md={7} xs={12}>
              <Typography className={classes.title}>Question Bank</Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <div className={classes.search} style={{ width: 'auto' }}>
                <InputBase
                  value={searchItem}
                  onChange={onSearchQuestion}
                  // setSearchItem(e.target.value || undefined);
                  placeholder={`${questionsInView.length} questions...`}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon classes={{ root: classes.searchIcon }} />
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          </Grid>
          <Box
            className={classes.configureContents}
            container
            alignItems="center"
            justify="center"
          >
            <Box>
              <img src={ConfigureQuestion} />
              <Typography className={classes.label}>
                {t(
                  'messages:Add_or_edit_all_the_required_informations_and_settings_to_create_a_question_in_this_area.'
                )}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ) : (
        <>
          <Grid container>
            <Grid item md={7} xs={12}>
              <Typography className={classes.title}>Question Bank</Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <div className={classes.search} style={{ width: 'auto' }}>
                <InputBase
                  value={searchItem}
                  onChange={onSearchQuestion}
                  // setSearchItem(e.target.value || undefined);
                  placeholder={`${questionsInView.length} questions...`}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon classes={{ root: classes.searchIcon }} />
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          </Grid>
          {questionsInView
            .slice(
              pagination.page * rowsPerPage,
              pagination.page * rowsPerPage + rowsPerPage
            )
            .map((q, index) => {
              return (
                <Grid
                  container
                  justifyContent="space-between"
                  spacing={1}
                  className={classes.questionGrid}
                  onClick={e => { onQuestionsClick(e, q); }}
                  style={{ backgroundColor: selectedQuestionId && selectedQuestionId === q.questionid ? '#F4F6FF' : '' }}
                >

                  {/* // Subjective question / short answer */}
                  <Grid item md={7} sm={12}>
                    {/* <Box className={classes.containerBox} m={1}> */}
                    <div className={classes.questionTypoText}>
                      <p className={classes.questionTypoText} style={{ float: 'left', margin: 0 }}>
                        {rowsPerPage * pagination.page + index + 1}.</p>
                      {parse(`${q?.questiontext}`)}
                    </div>
                    {/* {q?.mediaFile &&
                      <Box>
                        <img className={classes.mediaFile}
                          title="Click on the image to enlarge/view details" onClick={() => { window.open(q?.mediaFile) }}
                          src={q?.mediaFile} />
                      </Box>
                    } */}
                    {/* </Box> */}
                  </Grid>

                  <Grid item md={2} sm={4}>
                    <Chip label={handleType(q.questiontype)} className={classes.questionType} />
                  </Grid>
                  <Grid item md={2} sm={4}>
                    {selectedQuestionId &&
                      selectedQuestionId === q.questionid ? (
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginLeft: '16px',
                          marginRight: '16px',
                        }}
                      >
                        <Tooltip title="Preview">
                          <IconButton
                            aria-label="view-question"
                            className={classes.IconButtonStyle}
                            size="small"
                            /* old view */
                            /* onClick={e => {
                                e.stopPropagation();
                                handlePreviewClick(
                                  q.questionid,
                                  pagination.perPageCount * pagination.page +
                                    index +
                                    1
                                );
                              }} */
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedQuestion(q);
                              // handleQuestionUpdate(q);
                              handleQuestionPreview(q);
                            }}
                          >
                            <VisibilityOutlinedIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit-question"
                            size="small"
                            className={classes.IconButtonStyle}
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedQuestion(q);
                              // handleQuestionUpdate(q);
                              handleQuestionEdit(q);
                            }}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item md={1} sm={4}>
                    <Typography
                      className={classes.questionMarks}
                      color="primary"
                    >
                      {q.marks} Marks
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          <Box className={classes.paginationBox}>
            {/* <Pagination
              shape="rounded"
              page={pagination.page + 1}
              count={Math.ceil(questions.length / pagination.perPageCount)}
              onChange={handlePageChange}
            /> */}
            <TablePagination
              component="div"
              // count={Math.ceil(questions.length / pagination.perPageCount)}
              count={questionsInView.length}
              page={pagination.page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: questionsInView.length },
              ]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
