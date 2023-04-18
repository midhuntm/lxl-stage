import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import KenAccordion from '../../../components/KenAccordion';
import SearchableCheckList from '../../../global_components/SearchableCheckList';
import FilterAccordionLabel from '../../../components/UI/FilterAccordionLabel';
import KenButton from '../../../global_components/KenButton';
import {
  getQuestionBankFilters,
  getQuestionBankQuestions,
  getQuestionDetail,
} from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { useAppContext } from '../../../utils/contextProvider/AppContext';

const useStyles = makeStyles(theme => ({
  panelHeader: {
    fontWeight: 600,
    fontSize: '14px',
  },
  clearAllButton: {
    color: theme.palette.KenColors.orange10,
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'capitalize',
  },
  checklistSectionStyle: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  accordionSummaryRoot: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    padding: '0px',
  },
  accordionDetailsRoot: {
    padding: '0px',
  },
  filterItemLabelText: {
    fontSize: '14px',
    fontWeight: '600',
    color: theme.palette.KenColors.neutral900,
  },
}));

export default function Filters() {
  const classes = useStyles();
  const { t } = useTranslation();
  //   to find contact Id
  const { state } = useAppContext();
  const userDetails = state.userDetails;

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
          data.questions.map(q => {
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

  console.log("filter Data", questions);
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

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        data-testid="questionbank-filters"
        style={{ height: '40px' }}
      >
        <Grid item>
          <Typography className={classes.panelHeader}>
            {t('labels:Filters')}
          </Typography>
        </Grid>
        <Grid item>
          <KenButton onClick={handleClearFilter}>
            <Typography
              className={classes.clearAllButton}
              data-testid="clearall-button"
            >
              {t('labels:Clear_all')}
            </Typography>
          </KenButton>
        </Grid>
      </Grid>
      {filterData.map(item => (
        <KenAccordion
          key={item.id}
          label={
            <FilterAccordionLabel
              label={item.label}
              extraInfoText={getSelectedFiltersCount(item)}
              classOverrides={
                item.open ? { labelText: classes.filterItemLabelText } : {}
              }
            />
          }
          panelId={item.id}
          expanded={item.open}
          onExpand={handleExpand}
          classOverrides={{
            summaryRoot: classes.accordionSummaryRoot,
            detailsRoot: classes.accordionDetailsRoot,
          }}
        >
          {item.type === 'checkbox' && (
            <SearchableCheckList
              isSearchEnabled={true}
              type={item.type}
              value={item.value}
              options={item.options}
              handleChange={handleChange(item.id)}
              checkSectionStyleClass={classes.checklistSectionStyle}
            />
          )}
          {item.type === 'radio' && (
            <SearchableCheckList
              isSearchEnabled={true}
              type={item.type}
              value={item.value}
              name={item.id}
              options={item.options}
              handleChange={handleChange(item.id)}
              checkSectionStyleClass={classes.checklistSectionStyle}
            />
          )}
        </KenAccordion>
      ))}
      {questions.map((q,index)=>{
          return(
              <>
                <Typography>{index}.{q.questiontext}</Typography>
              </>
          )
      })}
    </>
  );
}
