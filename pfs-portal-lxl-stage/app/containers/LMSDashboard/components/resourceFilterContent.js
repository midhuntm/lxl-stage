import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenButton from '../../../global_components/KenButton';
import KenAccordion from '../../../components/KenAccordion';
import FilterAccordionLabel from '../../../components/UI/FilterAccordionLabel';
import SearchableCheckList from '../../../global_components/SearchableCheckList';

const useStyles = makeStyles(theme => ({
  mobileDialog: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height: '100%',
      width: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      width: '987px',
    },
  },
}));

export default function ResourceFilterContent(props) {
  const { data, getFilteredData = () => {}, handleClearFilter } = props;

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    console.log('filteredData changed', filteredData);
    getFilteredData(filteredData);
  }, [filteredData]);

  const handleChange = filterId => newVal => {
    setFilteredData(data =>
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
    setFilteredData(fData => {
      console.log('fData', fData);
      return fData.map(item => {
        if (item.id === filterId) {
          return { ...item, open: true };
        } else {
          return { ...item, open: false };
        }
      });
    });
  };

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Box minWidth="500px">
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
        {filteredData.map(item => (
          <KenAccordion
            key={item.id}
            label={
              <FilterAccordionLabel
                label={item.label}
                extraInfoText={item?.value?.length}
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
            {(item.type === 'checkbox' || item.type === 'radio') && (
              <SearchableCheckList
                isSearchEnabled={item?.label === 'Program'}
                type={item.type}
                value={item.value}
                options={item.options}
                handleChange={handleChange(item.id)}
                checkSectionStyleClass={classes.checklistSectionStyle}
              />
            )}
          </KenAccordion>
        ))}
      </Box>
    </>
  );
}
