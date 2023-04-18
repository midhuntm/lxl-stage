import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import './Faculty.css';
import { Typography, Grid, Button } from '@material-ui/core';
import KenInputField from '../../components/KenInputField';
import KenSelect from '../../global_components/KenSelect';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { isNull } from 'lodash';

const Editpersoaladdress = ({
  state,
  setState,
  personalDetails,
  setpersonalDetails,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState(state);
  const gender = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Decline to state',
      value: 'Decline to state',
    },
  ];
  const Class = [
    {
      label: 1,
      value: 1,
    },
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
    {
      label: 5,
      value: 5,
    },
    {
      label: 6,
      value: 6,
    },
    {
      label: 7,
      value: 7,
    },
    {
      label: 8,
      value: 8,
    },
    {
      label: 9,
      value: 9,
    },
    {
      label: 10,
      value: 10,
    },
  ];
  const handleSubmit = () => {
    onSubmit();
  };

  useEffect(() => {
    setData(state);
  }, [state]);

  const onCancelHandle = () => {
    onCancel();
  };
  const handleChangeInput = evt => {
    onChange(evt);
  };
  let profile = getUserDetails();
  console.log(profile.Type);
  // Student

  const [hidedata, sethidedata] = useState(false);
  const Clickhide = e => {
    sethidedata(!hidedata);
    // console.log(e)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2}>
        {/* <KenInputField
        label="Gender"
        name="Gender"
        value={data.Gender}
        dropdownColor="#FFFFFF"
        onChange={e => {
          handleChangeInput(e);
        }}
      /> */}
        <KenSelect
          label="Gender"
          name="Gender"
          options={gender}
          value={data.Gender}
          optionalLabel={false}
          onChange={e => {
            handleChangeInput(e);
          }}
          // required={true}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <KenInputField
          label="DOB"
          name="BirthDate"
          value={data.BirthDate}
          dropdownColor="#FFFFFF"
          type="date"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
      <Grid container  spacing={2} >
      <Grid item xs={12} sm={6}>
        <KenInputField
          label="Nationality"
          name="CountryOfResidence"
          value={data.CountryOfResidence}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>

   

      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Nationality"
          name="CountryOfResidence"
          value={data.CountryOfResidence}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <KenInputField
          label="State/Province"
          name="bio"
          value={data.Bio}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Country"
          name="bio"
          value={data.Bio}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Postal Code"
          name="bio"
          value={data.Bio}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
      </Grid>
 
 
      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Email ID"
          name="EmailID"
          value={data.Email}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
          disabled={profile.Type === 'Student' ? true : false}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Mobile Number"
          name="Phone"
          value={data.Phone}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid>
  
      <Grid item xs={12} sm={3}>
        <KenInputField
          label="Websites"
          name="Websites"
          value={data.Website}
          dropdownColor="#FFFFFF"
          placeholder="ken42.com"
          onChange={e => {
            handleChangeInput(e);
          }}
          disabled={profile.Type === 'Faculty' ? false : true}
        />
      </Grid>
      {/* <Grid item xs={12} sm={3}>
        <KenInputField
          label="Activites"
          name="Activites"
          value={data.Activities}
          dropdownColor="#FFFFFF"
          onChange={e => {
            handleChangeInput(e);
          }}
        />
      </Grid> */}
      {/* <Grid
         container
          xs={12}
          spacing={2}
          style={{ justifyContent: 'right', marginTop: 20 }}
           >
          <Grid item>
          <Button
            variant="contained"
            color="primary"
            className="btnMargin" */}
            {/* // style={{ minWidth: '100%' }}
            onClick={() => handleSubmit()} */}
          {/* >
            Save
          </Button>
          </Grid>
         <Grid item>
          <Button
            variant="contained"
            className="cancel-btn"
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={() => onCancelHandle()}
          >
            Cancel
          </Button>{' '}
        </Grid> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default Editpersoaladdress;
