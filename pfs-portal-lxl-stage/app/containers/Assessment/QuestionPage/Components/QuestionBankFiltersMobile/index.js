import {
  Divider,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterAccordionLabel from '../../../../../components/UI/FilterAccordionLabel';
import KenFooterSplitButtons from '../../../../../global_components/KenFooterSplitButtons';
import SearchableCheckList from '../../../../../global_components/SearchableCheckList';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  filtersLabel: {
    fontSize: '14px',
    fontWeight: '600',
    padding: '0px 0px 20px 16px',
    color: theme.palette.KenColors.neutral900,
  },
  filterItemLabelText: {
    fontSize: '14px',
    fontWeight: '600',
    color: theme.palette.KenColors.neutral900,
  },
  clearAllContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 16px 20px 0px',
  },
  clearAllButton: {
    color: theme.palette.KenColors.orange10,
    fontWeight: 600,
    fontSize: '12px',
  },
}));

const QuestionBankFiltersMobile = props => {
  const {
    handleCloseFilter,
    filterData,
    filterRes,
    getSelectedFiltersCount,
    handleApplyFilterMobile,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [filters, setFilters] = useState([]);
  const [selectedFilterItem, setSelectedFilterItem] = useState(null);

  useEffect(() => {
    setFilters(filterData);
  }, [filterData]);

  useEffect(() => {
    setSelectedFilterItem(filters.find(item => item.open));
  }, [filters]);

  useEffect(() => {
    let classId = filters.find(f => f.id === 'class')?.value;
    if (classId) {
      modifyFilterData(classId);
    }
  }, [filters.find(f => f.id === 'class')?.value]);

  const modifyFilterData = classId => {
    let subjectOptions = [];
    if (classId) {
      subjectOptions = filterRes.filter
        .find(f => String(f.class.id) === classId)
        .subjects.map(subject => ({
          label: subject.name,
          value: String(subject.id),
        }));
    }
    let filterArray = filters.map(f => {
      if (f.id === 'class') {
        return { ...f, value: classId };
      } else if (f.id === 'subject') {
        return {
          ...f,
          value: subjectOptions.filter(op => op.value === f.value).length
            ? f.value
            : subjectOptions[0].value,
          options: subjectOptions,
        };
      } else {
        return f;
      }
    });
    setFilters(filterArray);
  };

  const handleExpandMobile = filterId => {
    setFilters(data =>
      data.map(item => {
        if (item.id === filterId) {
          return { ...item, open: true };
        } else {
          return { ...item, open: false };
        }
      })
    );
  };

  const handleChangeMobile = filterId => newVal => {
    setFilters(data =>
      data.map(item => {
        if (item.id === filterId) {
          return { ...item, value: newVal };
        } else {
          return item;
        }
      })
    );
  };

  const handleClearFilterMobile = () => {
    setFilters(
      filters.map(item => {
        if (item.id === 'questionType') {
          return { ...item, value: [] };
        } else {
          return item;
        }
      })
    );
  };

  const handleApply = () => {
    handleApplyFilterMobile(filters);
    handleCloseFilter();
  };

  return (
    <div
      className={classes.container}
      data-testid="questionbank-filters-mobile"
    >
      <Grid
        container
        style={{ height: 'calc(100% - 52px)', padding: '16px 0px 0px 0px' }}
      >
        <Grid
          item
          xs={4}
          style={{
            boxShadow: '0px 0px 18px #101E730F',
            clipPath: 'inset(0px -15px 0px 0px)',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Typography className={classes.filtersLabel}>
            {t('labels:Filters')}
          </Typography>
          {filters.map(item => (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  backgroundColor: item.open
                    ? theme.palette.KenColors.neutral20
                    : 'initial',
                }}
                onClick={() => handleExpandMobile(item.id)}
                key={item.id}
              >
                <FilterAccordionLabel
                  label={item.label}
                  extraInfoText={getSelectedFiltersCount(item)}
                  classOverrides={
                    selectedFilterItem?.id === item.id
                      ? { labelText: classes.filterItemLabelText }
                      : {}
                  }
                />
              </div>
              <Divider
                style={{
                  color: theme.palette.KenColors.assessmentBorder,
                  margin: '0px 16px',
                }}
              />
            </>
          ))}
        </Grid>

        <Grid
          item
          xs={8}
          style={{
            height: '100%',
            overflowY: 'auto',
            padding: '0px 16px 0px 8px',
          }}
        >
          <div className={classes.clearAllContainer}>
            <Typography
              className={classes.clearAllButton}
              onClick={handleClearFilterMobile}
            >
              {t('labels:Clear_all')}
            </Typography>
          </div>

          {selectedFilterItem && selectedFilterItem.type === 'checkbox' && (
            <SearchableCheckList
              isSearchEnabled={true}
              type={selectedFilterItem.type}
              value={selectedFilterItem.value}
              options={selectedFilterItem.options}
              handleChange={handleChangeMobile(selectedFilterItem.id)}
            />
          )}
          {selectedFilterItem && selectedFilterItem.type === 'radio' && (
            <SearchableCheckList
              isSearchEnabled={true}
              type={selectedFilterItem.type}
              value={selectedFilterItem.value}
              name={selectedFilterItem.id}
              options={selectedFilterItem.options}
              handleChange={handleChangeMobile(selectedFilterItem.id)}
            />
          )}
        </Grid>
      </Grid>
      <KenFooterSplitButtons
        primaryButtonName={'Apply'}
        secondaryButtonName={'Cancel'}
        secondaryAction={handleCloseFilter}
        primaryAction={handleApply}
      />
    </div>
  );
};

export default QuestionBankFiltersMobile;
