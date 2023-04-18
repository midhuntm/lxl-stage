import {
  Grid,
  Hidden,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getQuestionBankFilters,
  getQuestionBankQuestions,
  getQuestionDetail,
} from '../../../../../utils/ApiService';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
import QuestionBankQuestionDetail from '../QuestionBankQuestionDetail';
import QuestionBankContentMobile from '../QuestionBankContentMobile';
import QuestionBankFilters from '../QuestionBankFilters';
import QuestionBankQuestions from '../QuestionBankQuestions';
import KenLoader from '../../../../../components/KenLoader';
import KenButton from '../../../../../global_components/KenButton';
import { useAppContext } from '../../../../../utils/contextProvider/AppContext';

const useStyles = makeStyles(theme => ({
  panel: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
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
  leftPanel: {
    paddingRight: '8px',
  },
  rightpanelHeader: {
    height: '36px',
  },
  panelHeaderTypography: {
    fontWeight: 600,
    fontSize: '14px',
  },
  rightPanel: {
    paddingLeft: '16px',
    borderLeft: `1px solid ${theme.palette.KenColors.neutral102}`,
  },
  errorDiv: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const QuestionBankContent = props => {
  const {
    handleQuestionBankClose,
    handleAddQuestions,
    selectedQuestions,
  } = props;
  const { state } = useAppContext();
  const userDetails = state.userDetails;
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filterRes, setFilterRes] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [detailedViewQuestion, setDetailedViewQuestion] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    perPageCount: 5,
    totalCount: 0,
  });
  const [paginationResetFlag, setPaginationResetFlag] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handlePreviewClick = async (qId, qNum) => {
    setLoading(true);
    let qData = await getQuestionDetail(qId);
    setDetailedViewQuestion({ ...qData, number: qNum });
    setLoading(false);
  };

  const getFilterItem = filterId => {
    return filterData.find(f => f.id === filterId);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let contactId;
      if (userDetails?.ContactId) {
        contactId = userDetails.ContactId;
      } else {
        setIsError(true);
        return;
      }

      const data = await getQuestionBankFilters(contactId);
      if (data && data.filter && data.filter.length) {
        // Todo: To remove this filter code later
        // let questionFilter = data['questiontypes'].filter(item => {
        //   return item.qvalue !== "shortanswer" && item.qvalue !== "essay"
        // })
        // let updatedRes = { ...data, questiontypes: questionFilter }
        // setFilterRes(updatedRes);
        setFilterRes(data);
      } else {
        setIsError(true);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (filterRes) {
      modifyFilterData();
    }
  }, [filterRes]);

  useEffect(() => {
    setPagination(data => ({
      ...data,
      page: paginationResetFlag ? 0 : data.page,
      totalCount: questions.length,
    }));
    if (paginationResetFlag) {
      setPaginationResetFlag(false);
    }
  }, [questions, paginationResetFlag]);

  useEffect(() => {
    getQuestions();
  }, [getFilterItem('subject')?.value, getFilterItem('questionType')?.value]);

  useEffect(() => {
    let classFilterValue = getFilterItem('class')?.value;
    if (classFilterValue) {
      modifyFilterData(classFilterValue);
    }
  }, [getFilterItem('class')?.value]);

  const handleApplyFilterMobile = data => {
    setFilterData(data);
  };

  const getQuestions = async () => {
    setLoading(true);
    let subjectFilterValue = getFilterItem('subject')?.value;
    let questionTypes = getFilterItem('questionType')?.value;
    if (questionTypes && questionTypes.length) {
      questionTypes = questionTypes.join();
    } else {
      questionTypes = 'all';
    }
    if (subjectFilterValue) {
      const data = await getQuestionBankQuestions(
        subjectFilterValue,
        questionTypes
      );
      if (data && data.questions) {
        setQuestions(
          data.questions.filter(item => item.questiontype === "multichoice" ||
            item.questiontype === "essay" ||
            item.questiontype === "truefalse" ||
            item.questiontype === "shortanswer")
            .map(q => {
              return {
                ...q,
                id: q.questionid,
                text: q.questiontext,
                marks: String(parseInt(q.mark)),
                selected: false,
              };
            })
        );
      } else {
        setIsError(true);
      }
      setPaginationResetFlag(true);
    }
    setLoading(false);
  };

  const modifyFilterData = classId => {
    let classOptions = [];
    let subjectOptions = [];
    filterRes.filter.forEach(f => {
      classOptions.push({ label: f.class.name, value: String(f.class.id) });
    });
    if (classId) {
      subjectOptions = filterRes.filter
        .find(f => String(f.class.id) === classId)
        .subjects.map(subject => ({
          label: subject.name,
          value: String(subject.id),
        }));
    } else {
      subjectOptions = filterRes.filter[0].subjects.map(subject => ({
        label: subject.name,
        value: String(subject.id),
      }));
      subjectOptions;
    }
    let filterArray = [];
    if (classId) {
      filterArray = filterData.map(f => {
        if (f.id === 'class') {
          return { ...f, value: classId };
        } else if (f.id === 'subject') {
          return {
            ...f,
            value: subjectOptions[0].value,
            options: subjectOptions,
          };
        } else {
          return f;
        }
      });
    } else {
      filterArray = [
        {
          id: 'class',
          label: 'Class',
          type: 'radio',
          open: true,
          value: classId ? classId : classOptions[0].value,
          options: classOptions,
        },
        {
          id: 'subject',
          label: 'Subject',
          type: 'radio',
          open: false,
          value: subjectOptions[0].value,
          options: subjectOptions,
        },
        {
          id: 'questionType',
          label: 'Question Type',
          type: 'checkbox',
          open: false,
          value: '',
          options: filterRes.questiontypes.map(qt => ({
            label: qt.label,
            value: qt.qvalue,
          })),
        },
      ];
    }

    setFilterData(filterArray);
  };

  const handleChange = filterId => newVal => {
    setFilterData(data =>
      data.map(item => {
        if (item.id === filterId) {
          return { ...item, value: newVal };
        } else {
          return item;
        }
      })
    );
  };

  const handleExpand = filterId => {
    setFilterData(data =>
      data.map(item => {
        if (item.id === filterId) {
          return { ...item, open: true };
        } else {
          return { ...item, open: false };
        }
      })
    );
  };

  const handleClearFilter = () => {
    setFilterData(
      filterData.map(item => {
        if (item.id === 'questionType') {
          return { ...item, value: [] };
        } else {
          return item;
        }
      })
    );
  };

  const handleQuestionCheck = id => {
    setQuestions(
      questions.map(q => {
        if (q.id === id) {
          return { ...q, selected: !q.selected };
        } else {
          return q;
        }
      })
    );
  };

  const handleRemoveAllSelections = () => {
    setQuestions(questions => questions.map(q => ({ ...q, selected: false })));
  };

  const handleSelectAll = () => {
    setQuestions(questions => questions.map(q => ({ ...q, selected: true })));
  };

  const getSelectedFiltersCount = item => {
    if (item.type === 'radio') {
      if (item.value.length) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return item.value.length;
    }
  };

  return (
    <>
      {loading && <KenLoader />}
      <div data-testid="questionbank-content" style={{ height: '100%' }}>
        {isError ? (
          <div className={classes.errorDiv}>
            <p>Unable to load question bank</p>
            <KenButton variant="primary" onClick={handleQuestionBankClose}>
              Close
            </KenButton>
          </div>
        ) : (
          <>
            <Hidden xsDown>
              {!detailedViewQuestion ? (
                <Grid
                  container
                  alignItems="flex-start"
                  style={{ height: '100%' }}
                >
                  <Grid
                    item
                    xs={3}
                    className={`${classes.leftPanel} ${classes.panel}`}
                  >
                    <QuestionBankFilters
                      filterData={filterData}
                      handleChange={handleChange}
                      handleExpand={handleExpand}
                      handleClearFilter={handleClearFilter}
                      getSelectedFiltersCount={getSelectedFiltersCount}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={9}
                    className={`${classes.rightPanel} ${classes.panel}`}
                  >
                    <QuestionBankQuestions
                      questions={questions}
                      handlePreviewClick={handlePreviewClick}
                      setQuestions={setQuestions}
                      handleQuestionCheck={handleQuestionCheck}
                      handleRemoveAllSelections={handleRemoveAllSelections}
                      handleSelectAll={handleSelectAll}
                      handleQuestionBankClose={handleQuestionBankClose}
                      pagination={pagination}
                      setPagination={setPagination}
                      handleAddQuestions={handleAddQuestions}
                      selectedQuestions={selectedQuestions}
                    />
                  </Grid>
                </Grid>
              ) : (
                <QuestionBankQuestionDetail
                  question={detailedViewQuestion}
                  setDetailedViewQuestion={setDetailedViewQuestion}
                />
              )}
            </Hidden>
            <Hidden smUp>
              <QuestionBankContentMobile
                filterData={filterData}
                filterRes={filterRes}
                questions={questions}
                handlePreviewClick={handlePreviewClick}
                setQuestions={setQuestions}
                handleExpand={handleExpand}
                handleQuestionCheck={handleQuestionCheck}
                handleRemoveAllSelections={handleRemoveAllSelections}
                handleSelectAll={handleSelectAll}
                getSelectedFiltersCount={getSelectedFiltersCount}
                handleQuestionBankClose={handleQuestionBankClose}
                pagination={pagination}
                setPagination={setPagination}
                detailedViewQuestion={detailedViewQuestion}
                setDetailedViewQuestion={setDetailedViewQuestion}
                handleApplyFilterMobile={handleApplyFilterMobile}
              />
            </Hidden>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionBankContent;
