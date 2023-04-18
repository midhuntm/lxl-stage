import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import './Faculty.css';
import { Typography, Grid, Button, makeStyles, } from '@material-ui/core';
import KenInputField from '../../components/KenInputField';
import KenSelect from '../../global_components/KenSelect';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { isNull } from 'lodash';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  inputFieldprof: {
    borderRadius: "8px !important"
  }
}))
const PersonalDetails = ({
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
  const classes = useStyles();

  return (
    <>
      {personalDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <KenInputField
              label="First Name"
              name="firstName"
              value={data.firstName}
              classname={classes.inputFieldprof + "hirother"}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChangeInput(e);
              }}
            // disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KenInputField
              label="Middle Name"
              name="middleName"
              value={data.middleName}
              optionalLabel={true}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChangeInput(e);
              }}
            // disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KenInputField
              label="Family/Last Name"
              name="lastName"
              value={data.lastName}
              dropdownColor="#FFFFFF"
              onChange={e => {
                handleChangeInput(e);
              }}
            // disabled={true}
            />
          </Grid>

        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3} ms={12} md={2}>
            <b className="text-size">Gender</b>
            <Typography md={12}>{data.Gender ? data.Gender : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} ms={12} md={2}>
            <b className="text-size">DOB</b>
            <Typography md={12}>
              {data.BirthDate ? data.BirthDate : 'N/A'}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={3} ms={12} md={2}>
            <b className="text-size">Middle Name</b>
            <Typography md={12}>{data.Gender ? data.Gender : 'N/A'}</Typography>
          </Grid> */}
          <Grid item xs={12} sm={3} ms={12} md={3}>
            <b className="text-size">Phone Number</b>
            <Typography md={12}>{data.Phone ? data.Phone : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} ms={12} md={3}>
            <b className="text-size">Email</b>
            <Typography md={12}>{data.Email ? data.Email : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} ms={12} md={2}>
            <b className="text-size">Website</b>
            <Typography md={12}>
              {data.Website ? data.Website : 'N/A'}
            </Typography>
          </Grid>

          {/* <Grid container md={2}>
            <Grid item xs={12} sm={3} ms={12}>
              <b className="text-size">Name:</b>
            </Grid>
            <Grid item xs={12} sm={8} md={12}>
              <Typography className="userName">
                {data.firstName} {data.lastName}{' '}
                {!data.firstName && !data.lastName && 'N/A'}
             
              </Typography>{' '}
            </Grid>
          </Grid>
          <Grid container md={2}>
            <Grid item xs={12} sm={3} md={12}>
              <b className="text-size">Middle Name:</b>
            </Grid>

            <Grid item xs={12} sm={5} md={12}>
              <Typography>{hidedata ? null : 'Agarawal'}</Typography>
            </Grid>
          </Grid>
          <Grid container md={3}>
            <Grid item xs={12} sm={4} md={12}>
              <Typography>
                {profile.Type === 'Faculty' ? (
                  <button
                    style={{
                      background: '#193389',
                      color: '#FFFFFF',
                      borderRadius: '20px',
                      border: 'none',
                      padding: '5px 11px',
                    }}
                    defaultValue={hidedata}
                    onClick={Clickhide}
                  >
                    Hide/Show
                  </button>
                ) : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container md={2}>
            <Grid item xs={12} sm={3} md={12}>
              <b className="text-size">Bio:</b>
            </Grid>
            <Grid item xs={12} sm={8} md={12}>
              <Typography>N/A</Typography>
            </Grid>
          </Grid>
          <Grid container md={2}>
            <Grid item xs={12} sm={3} md={12}>
              <b className="text-size">Websites:</b>
            </Grid>
            <Grid item xs={12} sm={8} md={12}>
              <Typography>N/A</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Activites:</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>N/A</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Gender:</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{data.Gender ? data.Gender : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Birthday :</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{data.BirthDate ? data.BirthDate : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Phone :</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{data.Phone ? data.Phone : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Class :</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{data.Class__c ? data.Class__c : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Email :</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{data.Email ? data.Email : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <b className="text-size">Country of Residence :</b>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>
              {data.CountryOfResidence ? data.CountryOfResidence : 'N/A'}
            </Typography>
          </Grid> */}
        </Grid>
      )}
    </>
  );
};

export default PersonalDetails;
