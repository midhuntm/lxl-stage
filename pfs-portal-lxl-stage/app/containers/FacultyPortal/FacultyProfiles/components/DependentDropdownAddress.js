import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import KenSelectWrap from '../../../../components/KenSelect';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({}));
const DependentDropdownAddress = ({
  handleChange,
  countryDropdownOptions,
  stateDropDownOptions,
  cityDropDownOptions,
  index,
  element,
  removeFormFields,
  deleteButton,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid item xs={12} sm={12} className="faculty-add-row">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            name="Country"
            label={
              <span className={classes.inputBaseClass}>{t('Country')}</span>
            }
            options={countryDropdownOptions}
            value={element.Country || ''}
            onChange={e => {
              handleChange(index, e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            name="state"
            label={<span className={classes.inputBaseClass}>{t('State')}</span>}
            options={stateDropDownOptions}
            value={element.state || ''}
            onChange={e => {
              handleChange(index, e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <KenSelectWrap
            name="distract"
            label={
              <span className={classes.inputBaseClass}>{t('District')}</span>
            }
            options={cityDropDownOptions}
            value={element.distract || ''}
            onChange={e => {
              handleChange(index, e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} className="custom-delete-btn">
          {deleteButton && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => removeFormFields(index,element.id)}
            >
              {console.log('index1231', index)}
              Delete
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DependentDropdownAddress;
