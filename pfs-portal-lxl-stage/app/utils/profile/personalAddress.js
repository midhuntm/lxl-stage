import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { Typography, Grid, Button } from '@material-ui/core';
import KenButton from '../../global_components/KenButton';
import KenInputField from '../../components/KenInputField';
import KenSelect from '../../global_components/KenSelect';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import { isNull } from 'lodash';
const PersAddress = (state, setState, personalDetails, setpersonalDetails) => {
  const [data, setData] = useState(state);
  const [activitiesData, setActivitiesData] = useState([]);
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    if (Object.values(state?.state).length > 0) {
      console.log('state', state?.state);
      let addressData = state?.state?.addressDetail;
      const addressMain = {
        ...addressData,
        ['Address']: `${addressData.HOUSE}, ${addressData.MailingStreet}`,
      };
      setData(addressMain);
      let activities = state?.state?.Activities.split(';');
      setActivitiesData(activities);
      setProfileData(state?.state)
    }
  }, [state]);
  let profile = getUserDetails();
  console.log(profile.Type);
  return (
    <>
      <br /> <br />
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Typography><b className="text-size">Address</b></Typography>
          <Typography>{data?.Address ? data?.Address : 'N/A'}</Typography>
          <br />
          <Typography style={{paddingTop:"16px"}}><b className="text-size">Bio</b></Typography>
          <Typography>{profileData?.Bio ? profileData?.Bio : 'N/A'}</Typography>
        </Grid>
        <Grid item md={6}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <b className="text-size">City</b>
              <Typography>
                {/* Coimbatore */}
                {data?.MailingCity ? data?.MailingCity : 'N/A'}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <b className="text-size">State</b>
              <Typography>
                {/* Tamil Nadu */}
                {data?.MailingState ? data?.MailingState : 'N/A'}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <b className="text-size">Country</b>
              <Typography>
                {/* India */}
                {data?.MailingCountry ? data?.MailingCountry : 'N/A'}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <b className="text-size">Postal Code</b>
              <Typography>
                {/* 641006 */}
                {data?.MailingPostalCode ? data?.MailingPostalCode : 'N/A'}
              </Typography>
            </Grid>
            <br />
            <Grid item md={12} style={{paddingTop:"30px"}}>
              <b className="text-size">Activities</b>
              <br />
              <br />
              <Typography>
                {activitiesData.length > 0 ? activitiesData.map(item => {
                return <span className='ActivitiesStyles' style={{ height: '20px' }}>
                  {item}
                </span>  
                }) : null}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default PersAddress;
