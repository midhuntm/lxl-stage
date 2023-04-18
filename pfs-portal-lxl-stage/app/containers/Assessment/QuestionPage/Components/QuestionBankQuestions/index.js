import {
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  Box,
  TablePagination,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Pagination from '@material-ui/lab/Pagination';
import KenCheckbox from '../../../../../global_components/KenCheckbox';
import KenButton from '../../../../../global_components/KenButton';
import AddIcon from '@material-ui/icons/Add';
import parse from 'html-react-parser';
import { fade } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import FuzzySearch from 'fuzzy-search';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  questionBankHeader: {
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.KenColors.neutral900,
    marginBottom: '20px',
  },
  questionBankSubTitle: {
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.KenColors.neutral102,
  },
  controlAndStats: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.KenColors.neutral102,
  },
  statNumber: {
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.KenColors.neutral900,
  },
  marksDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qMarks: {
    fontSize: '12px',
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
  },
  addToList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: theme.palette.KenColors.neutral400,
    fontWeight: 600,
  },
  questionsList: {
    height: 'calc(100% - 186px)',
    marginBottom: '16px',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: `${theme.palette.KenColors.neutral103}`,
    },
  },
  questionRow: {
    padding: '8px 0px',
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    '&:hover': {
      backgroundColor: theme.palette.KenColors.neutral7,
    },
    '&:hover > div[data-selector*="preview"]': {
      display: 'flex',
    },
  },
  previewIconContainer: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewIcon: {
    cursor: 'pointer',
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
  },
  footerDiv: {
    width: '100%',
    height: '60px',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginRight: '8px',
  },
  customHTMLlabel: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: '15px',
    fontSize: 13,
    marginTop: -15,
    color: theme.palette.KenColors.neutral100
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
  questionTypoText: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
  
}));

const QuestionBankQuestions = props => {
  const {
    questions,
    setQuestions,
    handlePreviewClick,
    handleQuestionBankClose,
    pagination,
    setPagination,
    handleQuestionCheck,
    handleRemoveAllSelections,
    handleSelectAll,
    handleAddQuestions,
    selectedQuestions,
  } = props;

  const [totalMarks, setTotalMarks] = useState(0);
  const [totalSelected, setTotalSelected] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [unSelectAll, setUnSelectAll] = useState(false);
  const [questionsInView, setQuestionsInView] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { t } = useTranslation();
  const classes = useStyles();
  const [questionsList, setQuestionsList] = React.useState([]);
  const [availableMarks, setAvailableMarks] = React.useState(0);
  const [availableQuestion, setAvailableQuestion] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchItem, setSearchItem] = React.useState('');

  const searcher = new FuzzySearch(questions, ['questiontext'], {
    caseSensitive: false,
  });

  useEffect(() => {
    let selectedCount = 0;
    let marks = 0;
    let selectFlag = true;
    let unSelectFlag = false;
    questions.forEach(q => {
      if (q.selected) {
        selectedCount++;
        marks += parseInt(q.marks);
        if (!unSelectFlag) {
          unSelectFlag = true;
        }
      } else {
        if (selectFlag) {
          selectFlag = false;
        }
      }
    });
    setTotalSelected(selectedCount);
    setTotalMarks(marks);
    setSelectAll(selectFlag);
    setUnSelectAll(unSelectFlag);
  }, [questions]);

  // useEffect(() => {
  //   let { page, perPageCount } = pagination;
  //   if (questions.length) {
  //     if (isMobile) {
  //       setQuestionsInView(questions);
  //     } else {
  //       let temp = questions.slice(page * perPageCount, page * perPageCount + perPageCount);
  //       setQuestionsInView(temp);
  //     }
  //   } else {
  //     setQuestionsInView([]);
  //   }
  // }, [questions, pagination, isMobile]);

  // const handlePageChange = (e, val) => {
  //   setPagination(data => ({ ...data, page: val - 1 }));
  // };
  // -------------
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
  const filterQuestions = () => {
    const qList = [];
    questions.map(q => {
      if (q.selected === true) {
        qList.push(q);
      }
    });
    setQuestionsList(qList);
    return qList;
  };

  /* adding queations to the List */
  const addToList = question => {
    const qList = [...questionsList];
    question.selected = true;
    const found = qList.find(
      element => element.questionid === question.questionid
    );
    if (found) {
      setQuestionsList(qList);
    } else {
      qList.push(question);
      setQuestionsList(qList);
    }
    return qList;
  };
  if (selectedQuestions?.length > 0) {
    console.log('questionbankquestion Page selectedQuestions', selectedQuestions);
  }
  const onSearchQuestion = event => {
    const result = searcher.search(event.target.value);
    setSearchItem(event.target.value);
    setQuestionsInView(result);
  };
  useEffect(() => {
    setQuestionsInView(questions);
  }, [questions]);

  //TODO : sync checkboxes with selected questions
  const isAlreadySelected = question => {
    const found = selectedQuestions?.find(
      element => element.questionid === question.questionid
    );
    return found;
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

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{ height: '110px' }}>
        <Grid container>
          <Grid item md={7} xs={12}>
            <Typography className={classes.questionBankHeader}>{t('labels:Question_bank')}</Typography>
            <p className={classes.questionBankSubTitle}>{t('labels:Question_bank_desc')}</p>
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

        <div className={classes.controlAndStats}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <span style={{ marginRight: '10px' }}> */}
            <KenCheckbox
              disableRipple={true}
              name={'selectall'}
              value={selectAll}
              label={'Select All'}
              onChange={handleSelectAll}
              labelProps={{
                style: {
                  fontSize: 12,
                  color: theme.palette.KenColors.neutral102,
                  paddingLeft: 15
                },
              }}
            />
            {/* </span> */}

            <KenCheckbox
              disableRipple={true}
              name={'unselectall'}
              value={unSelectAll}
              label={'Unselect All'}
              onChange={handleRemoveAllSelections}
              labelProps={{
                style: {
                  fontSize: 12,
                  color: theme.palette.KenColors.neutral102,
                  paddingLeft: 15
                },
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={classes.statText} style={{ marginRight: '10px' }}>
              {t('labels:Questions')}: <span className={classes.statNumber}>{totalSelected}</span>
            </div>
            <div className={classes.statText}>
              {t('labels:Marks')}:
              <span className={classes.statNumber}> {totalMarks}</span>
            </div>
          </div>
        </div>
      </div >
      {questionsInView.length ? (
        <div className={classes.questionsList}>
          {questionsInView.slice(
            pagination.page * rowsPerPage,
            pagination.page * rowsPerPage + rowsPerPage
          ).map((q, index) => (
            <div key={q.id} onClick={isMobile ? () => handlePreviewClick(q.id, pagination.perPageCount * pagination.page + index + 1) : null}
            >
              <Grid container spacing={1} className={classes.questionRow}>
                <Grid item xs={12} md={7}>
                  <Grid xs={12} md={12}>
                    <KenCheckbox
                      disableRipple={true}
                      name={q.id}
                      value={q.selected}
                      // label={`${pagination.perPageCount * pagination.page + index + 1}. ${q.text}`}
                      // label={`${pagination.perPageCount * pagination.page + index + 1}. ${q.questiontext}`}
                      customHTMLlabel={
                        <div className={classes.customHTMLlabel}>
                          {/* <p style={{ minWidth: 'max-content', paddingRight: 5 }}> */}
                            {/* {pagination.perPageCount * pagination.page + index + 1 + '. '}</p> */}
                            {/* {rowsPerPage * pagination.page + index + 1}.</p> */}
                          <div style={{ paddingTop: 16 }}>{parse(q.questiontext)}
                          </div>
                        </div>
                      }
                      onChange={e => handleQuestionCheck(q.id)}
                      onClick={e => e.stopPropagation()}
                      labelProps={{
                        style: {
                          fontSize: 14,
                          paddingLeft: 15,
                          color: theme.palette.KenColors.neutral400,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} md={2} sm={4}>
                    <Chip label={handleType(q.questiontype)} className={classes.questionType} />
                  </Grid>
                </Grid>

                <Grid item xs={2} md={2} className={classes.marksDiv}>
                  <span className={classes.qMarks}>{q.marks} marks</span>
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={1} md={1}
                    className={classes.previewIconContainer}
                    data-selector="preview"
                  >
                    <Tooltip title="Preview">
                      <IconButton
                        aria-label="view-question"
                        className={classes.viewIcon}
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          handlePreviewClick(
                            q.id,
                            pagination.perPageCount * pagination.page +
                            index +
                            1
                          );
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    md={2}
                    className={classes.previewIconContainer}
                    data-selector="preview"
                  >
                    <Tooltip title="Add to list">
                      <Typography
                        className={classes.viewIcon}
                        onClick={e => {
                          handleQuestionCheck(q.id);
                          handleAddQuestions(addToList(q), false);
                          e.stopPropagation();
                        }}
                      >
                        <AddIcon fontSize="small" />
                        &nbsp;Add to list
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Hidden>
              </Grid>
            </div>
          ))}
        </div>
      ) : (
        <div>{t('labels:No_questions_found')}</div>
      )
      }

      <Hidden xsDown >
        <div className={classes.footerDiv}>
          <div>
            {/* <Pagination
              variant="outlined"
              shape="rounded"
              page={pagination.page + 1}
              count={Math.ceil(questions.length / pagination.perPageCount)}
              onChange={handlePageChange}
            /> */}
            <TablePagination
              component="div"
              count={questionsInView.length}
              page={pagination.page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: questionsInView.length }]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <div>
            <KenButton
              variant="secondary"
              label="Cancel"
              buttonClass={classes.cancelButton}
              onClick={handleQuestionBankClose}
            />
            <KenButton
              variant={'primary'}
              label={'Add Selected'}
              onClick={() => {
                handleAddQuestions(filterQuestions(), true);
                // filterQuestions(questions);
                console.log('handelAddQuestions', questionsList);
              }}
            />
          </div>
        </div>
      </Hidden>
    </div>
  );
};

export default QuestionBankQuestions;
