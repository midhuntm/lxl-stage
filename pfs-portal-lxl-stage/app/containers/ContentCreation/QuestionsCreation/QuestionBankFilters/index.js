import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenAccordion from '../../../../components/KenAccordion';
import SearchableCheckList from '../../../../global_components/SearchableCheckList';
import FilterAccordionLabel from '../../../../components/UI/FilterAccordionLabel';
import KenButton from '../../../../global_components/KenButton';

const useStyles = makeStyles(theme => ({
  panelHeader: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    color: '#061938',
  },
  clearAllButton: {
    color: theme.palette.KenColors.orange10,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '150%',
    textAlign: 'center',
    // color: "#FF9D54"
  },
  checklistSectionStyle: {
    fontFamily: "Open Sans", 
  fontStyle: "normal", 
  fontWeight: "normal", 
  fontSize: "12px", 
  lineHeight: "150%", 
  color: "#505F79",
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
    fontFamily: "Open Sans", 
  fontStyle: "normal", 
  fontWeight: "600", 
  fontSize: "14px", 
  lineHeight: "150%", 
  // color: "#061938"
    color: theme.palette.KenColors.neutral900,
  },
}));

const QuestionBankFilters = props => {
  const {
    filterData,
    handleChange,
    handleExpand,
    handleClearFilter,
    getSelectedFiltersCount,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    
    <Box style={{padding: "16px", 
    backgroundColor: "white"}} component={Paper}> 
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
    </Box>
  );
};

export default QuestionBankFilters;
