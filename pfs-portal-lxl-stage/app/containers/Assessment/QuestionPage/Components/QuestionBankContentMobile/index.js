import { makeStyles, Fab } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterIcon from '../../../../../assets/icons/Filter.svg';
import KenFooterSplitButtons from '../../../../../global_components/KenFooterSplitButtons';
import QuestionBankFiltersMobile from '../QuestionBankFiltersMobile';
import QuestionBankQuestions from '../QuestionBankQuestions';
import QuestionBankQuestionDetail from '../QuestionBankQuestionDetail';
const useStyles = makeStyles(theme => ({
  questionbankTypography: {
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
  },
  filterButton: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(8),
  },
}));

const QuestionBankContentMobile = props => {
  const {
    filterData,
    filterRes,
    questions,
    handleExpand,
    handlePreviewClick,
    handleQuestionCheck,
    handleRemoveAllSelections,
    handleSelectAll,
    getSelectedFiltersCount,
    handleQuestionBankClose,
    pagination,
    setPagination,
    detailedViewQuestion,
    setDetailedViewQuestion,
    handleApplyFilterMobile,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenFilter = () => {
    setShowFilters(true);
  };
  const handleCloseFilter = () => {
    setShowFilters(false);
  };
  return (
    <div data-testid="questionbank-content-mobile" style={{ height: '100%' }}>
      {!detailedViewQuestion ? (
        <>
          {showFilters ? (
            <QuestionBankFiltersMobile
              filterData={filterData}
              filterRes={filterRes}
              handleCloseFilter={handleCloseFilter}
              handleExpand={handleExpand}
              getSelectedFiltersCount={getSelectedFiltersCount}
              handleApplyFilterMobile={handleApplyFilterMobile}
            />
          ) : (
            <>
              <QuestionBankQuestions
                questions={questions}
                handlePreviewClick={handlePreviewClick}
                pagination={pagination}
                setPagination={setPagination}
                handleQuestionCheck={handleQuestionCheck}
                handleRemoveAllSelections={handleRemoveAllSelections}
                handleSelectAll={handleSelectAll}
              />
              <Fab
                color="primary"
                aria-label="filter"
                className={classes.filterButton}
                onClick={handleOpenFilter}
                data-testid="open-filters-button"
              >
                <img src={FilterIcon} />
              </Fab>
              <KenFooterSplitButtons
                primaryButtonName={'Add Selected'}
                secondaryButtonName={'Cancel'}
                secondaryAction={handleQuestionBankClose}
              />
            </>
          )}
        </>
      ) : (
        <QuestionBankQuestionDetail
          question={detailedViewQuestion}
          setDetailedViewQuestion={setDetailedViewQuestion}
        />
      )}
    </div>
  );
};

export default QuestionBankContentMobile;
