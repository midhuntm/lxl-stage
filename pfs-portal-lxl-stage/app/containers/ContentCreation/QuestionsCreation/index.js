import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import NoQuestionDetail from './noContent';
import {
  getQuestionBankFilters,
  getQuestionBankQuestions,
  getQuestionDetail,
} from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { useAppContext } from '../../../utils/contextProvider/AppContext';
import QuestionBankFilters from './QuestionBankFilters/index';
import QuestionsView from './QuestionsView';
import QuestionPreview from './QuestionPreview';
import { useHistory } from 'react-router-dom';
import AddQuestionManually from './AddQuestionManually';
import { QUESTION_TYPES, TRANSACTIONS } from '../../../utils/constants';
import {
  QuestionTypes,
  getQuestionType,
} from '../../Assessment/QuestionPage/Components/QuestionTypes/Utils';
import CreateUpdateQuestion from '../../Assessment/QuestionPage/Components/QuestionDetail/components/createUpdateContent';
export default function QuestionsCreation(props) {
  //   to find contact Id
  const { state } = useAppContext();
  const userDetails = state.userDetails;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filterRes, setFilterRes] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [detailedViewQuestion, setDetailedViewQuestion] = useState(null);
  const [addQuestionView, setAddQuestionView] = useState(false);

  // quetions preview & Add Questions Manually/update question
  const [selectedType, setSelectedType] = useState();
  const [transaction, setTransaction] = useState();
  const [enableQuestionEdit, setEnableQuestionEdit] = useState(null);
  const [questionData, setQuestionData] = useState();
  const [courseId, setCourseId] = useState();
  const [chapterId, setChapterId] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [showAddManuallyBtn, setShowAddManuallyBtn] = useState(true)
  useEffect(() => {
    let data;
    if (transaction === TRANSACTIONS.CREATE) {
      if (selectedType?.type) {
        data = getQuestionType(selectedType.type);
      }
    } else {
      if (selectedQuestion?.questiontype) {
        data = getQuestionType(selectedQuestion.questiontype);
      }
    }

    setQuestionData(data);
  }, [transaction, selectedType, selectedQuestion]);

  /* Header Buttons Click */

  // Add Questions Manually
  const handleAddQuestionManually = () => {
    setAddQuestionView(true);
    setShowAddManuallyBtn(false)
  };
  const handleQuestionEdit = async question => {
    setShowAddManuallyBtn(false)
    setAddQuestionView(true);
    setEnableQuestionEdit(question);
    setCourseId(question.courseid)
    setChapterId(question.chapterid)
    setTransaction(TRANSACTIONS.EDIT);
  };

  const handleQuestionUpdate = question => {
  };

  const handleQuestionPreview = (question) => {
    setShowAddManuallyBtn(false)
    setAddQuestionView(true);
    setEnableQuestionEdit(question);
    setCourseId(question.courseid)
    setChapterId(question.chapterid)
    setTransaction(TRANSACTIONS.UPDATE);
  };

  // Next for Add Questions Manually
  const handelNext = values => {
    setEnableQuestionEdit(values);
    setTransaction(TRANSACTIONS.CREATE);
    setSelectedType({ type: values.questionType });
    setCourseId(values.subjectSelected);
    values.chapter > 0 ? setChapterId(values.chapter) : setChapterId(0);
  };
  // cancel  for Add Questions Manually
  const handelCancel = () => {
    history.push(`/questionsCreation`);
    setDetailedViewQuestion(null);
    handleClearFilter();
    setAddQuestionView(false);
  };
  //Back to Question bank
  const handleQuestionsBankBack = () => {
    history.push(`/questionsCreation`);
    setDetailedViewQuestion(null);
    handleClearFilter();
    setAddQuestionView(false);
    setShowAddManuallyBtn(true)
    setEnableQuestionEdit(null);
  };
  // pagination
  const [pagination, setPagination] = useState({
    page: 0,
    perPageCount: 10,
    totalCount: 0,
  });
  const [paginationResetFlag, setPaginationResetFlag] = useState(true);

  /* Question Bank Filters data  */
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

  // Filter data for questions Bank
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
  console.log('Applied Filters', filterData);
  const getFilterItem = filterId => {
    return filterData.find(f => f.id === filterId);
  };
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

  //   geting questions
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
          // data.questions.filter(item => item.questiontype !== "essay" && item.questiontype !== "shortanswer" && item.questiontype !== "random").map(q => {
          // data.questions.filter(item => item.questiontype !== "random" && item.questiontype !== "match").map(q => {
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

  //   preview of question
  const handlePreviewClick = async (qId, qNum) => {
    setLoading(true);
    let qData = await getQuestionDetail(qId);
    handleClearFilter();
    setAddQuestionView(false);
    setEnableQuestionEdit(null);

    setDetailedViewQuestion({ ...qData, number: qNum });
    setLoading(false);
  };
  const handleCancelEdit = () => {
    setDetailedViewQuestion(null);
    handleClearFilter();
    setAddQuestionView(false);
    setShowAddManuallyBtn(true)
    setEnableQuestionEdit(null);
  }
  return (
    <Box>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12}>
          <Header
            handleQuestionsBankBack={handleQuestionsBankBack}
            handleAddQuestionManually={handleAddQuestionManually}
            showAddManuallyBtn={showAddManuallyBtn}
            setShowAddManuallyBtn={setShowAddManuallyBtn}
          />
        </Grid>
        {addQuestionView && addQuestionView === true ? (
          <Grid item xs={12}>
            {enableQuestionEdit ? (
              <CreateUpdateQuestion
                {...props}
                {...selectedType}
                {...questionData}
                courseId={courseId}
                chapterId={chapterId}
                fromQuestionBank={true}
                transaction={transaction}
                setTransaction={setTransaction}
                handleCancelEdit={handleCancelEdit}
                handlePreviewClick={handlePreviewClick}
                selectedQuestion={selectedQuestion}
              />
            ) : (
              <AddQuestionManually
                optionsData={filterRes}
                handelNext={handelNext}
                handelCancel={handelCancel}
              />
            )}
          </Grid>
        ) : (
          <>
            <Grid item md={3} xs={12}>
              <QuestionBankFilters
                filterData={filterData}
                handleChange={handleChange}
                handleExpand={handleExpand}
                handleClearFilter={handleClearFilter}
                getSelectedFiltersCount={getSelectedFiltersCount}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              {!detailedViewQuestion ? (
                <QuestionsView //all questions lists 
                  questions={questions}
                  handlePreviewClick={handlePreviewClick}
                  pagination={pagination}
                  setPagination={setPagination}
                  setSelectedQuestion={setSelectedQuestion}
                  handleQuestionUpdate={handleQuestionUpdate}
                  handleQuestionEdit={handleQuestionEdit}
                  handleQuestionPreview={handleQuestionPreview}
                />
              ) : (
                <QuestionPreview //small question preveiw
                  question={detailedViewQuestion}
                  setDetailedViewQuestion={setDetailedViewQuestion}
                  setShowAddManuallyBtn={setShowAddManuallyBtn}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
