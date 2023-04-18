import React, { useEffect, useState } from 'react';
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  ButtonBase,
  Button,
  Container,
  // Divider
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { Country, State, City } from 'country-state-city';
import './Faculty.css';

import KenInputField from '../../../../components/KenInputField';

import KenSelect from '../../../../components/KenSelect';
import DependentDropdownAddress from './DependentDropdownAddress';
import { deleteStudentAddressInfo } from '../../../../utils/ApiService';
import KenLoader from '../../../../components/KenLoader';

const FacAddress = (props) => {
  const { formValues, index, element, setFormValues } = props;
  console.log('props',props);

  const deleteDetails = i => {
    setAcademicDetailsPage(prev => {
      return prev.filter(ab => {
        return ab.res.Id !== i;
      });
    });

    // ab.splice(i, 1);
    // setDeleteRow(true);
    // setDeleteRow(false);
  };
  const [countryDropdownOptions, setcountryDropdownOptions] = useState(
    Country.getAllCountries().map((countries, index) => {
      return {
        label: countries.name,
        value: countries.isoCode,

      };
    })
  );
  const [loading, setLoading] = useState(false);
  let removeFormFields =(ind, id) => {
    let newFormValues = [...formValues];
    // newFormValues.splice(i, 1);
    // setFormValues(newFormValues);
    setLoading(true);
    deleteStudentAddressInfo(id).then(res=>{
     console.log("response delete",res);
     setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
  };
  const [cityDropDownOptions, setCityDropDownOptions] = React.useState([]);
  const [countryCode, setCountryCode] = React.useState();
  const [stateCode, setStateCode] = React.useState();
  const [deleteButton, setDeleteButton] = React.useState(true);

  const [stateDropDownOptions, setStateDropDownOptions] = useState([]);
  const { t } = useTranslation();
  const useStyles = makeStyles(theme => ({
    box1: {
      position: 'relative',
    },
    healthGrid: {
      marginTop: theme.spacing(2),
    },
    grid: {
      minWidth: '13.8vw',
    },
    detailTitle1: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.palette.KenColors.neutral100,
      textTransform: 'uppercase',
    },
    back: {
      fontSize: '12px',
      '&:hover': {
        cursor: 'pointer',
      },
      marginLeft: '-8px',
    },
    iconBack: {
      height: 12,
    },
    loader: {
      minHeight: '100vh',
      minWidth: '100vh',
    },
    breadCrumbWrapper: {
      margin: '15px 0',
    },
    header: {
      background: '#ffffff',
      color: theme.palette.KenColors.primary,
    },
    boxContainer: {
      background: '#ffffff',
      color: theme.palette.KenColors.primary,
      marginTop: '26px',
      paddingTop: '62px',
      paddingBottom: '30px',
    },
    boxContainer1: {
      background: '#ffffff',
      color: theme.palette.KenColors.primary,
      marginTop: '26px',
    },
    imageSection: {
      background: '#ffffff',
      color: theme.palette.KenColors.primary,
      marginTop: '26px',
    },
    innerTitle: {
      fontSize: 16,
      marginTop: '30px',
    },
    subHeaderTitle: {
      width: '100%',
    },
  }));
  const classes = useStyles();

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    console.log('newFormValues', newFormValues);
    if (e.target.name === 'Country') {
      setCountryCode(e.target.value);
      setStateDropDownOptions(
        State.getStatesOfCountry(e.target.value).map(stateoption => {
          return {
            label: stateoption.name,
            value: stateoption.isoCode,
          };
        })
      );
    } else if (e.target.name === 'state') {
      setStateCode(e.target.value)
      setCityDropDownOptions(
        City.getCitiesOfState(countryCode, e.target.value).map(cityoption => {
          return {
            label: cityoption.name,
            value: cityoption.name,
          };
        })
      );
    }

    newFormValues[i][e.target.name] = e.target.value;

    setFormValues(newFormValues);
  };
  const addressOption = [
    {
      label: 'Temporary',
      value: 'Temporary',
    },
    {
      label: 'Home',
      value: 'Home',
    },
    {
      label: 'Business',
      value: 'Business',
    },
  ];

  useEffect(() => {
    State.getStatesOfCountry(countryCode).map(stateoption => {
      return {
        label: stateoption.name,
        value: stateoption.isoCode,
      };
    })
  }, [countryCode]);

  useEffect(() => {
    setCityDropDownOptions(
      City.getCitiesOfState(countryCode, stateCode).map(cityoption => {
        return {
          label: cityoption.name,
          value: cityoption.name,
        };
      })
    );
  }, [countryCode,stateCode]);

  return (
    <>
    {loading && <KenLoader />}
      <Grid item xs={12} sm={12} className="faculty-add-row" key={index}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <KenSelect
              name="Addresstype"
              label={
                <span className={classes.inputBaseClass}>{t('Type')}</span>
              }
              options={addressOption}
              value={element.Addresstype || ''}
              onChange={e => {
                handleChange(index, e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <KenInputField
              label="Address"
              name="address"
              value={element.address || ''}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChange(index, e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <KenInputField
              label="Pincode"
              name="pincode"
              value={element.pincode || ''}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChange(index, e);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <DependentDropdownAddress
        handleChange={handleChange}
        removeFormFields={removeFormFields}
        countryDropdownOptions={countryDropdownOptions}
        stateDropDownOptions={stateDropDownOptions}
        cityDropDownOptions={cityDropDownOptions}
        index={index}
        deleteButton={deleteButton}
        element={element}
      />
    </>
  );
};

export default FacAddress;
