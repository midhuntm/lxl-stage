import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import KenCard from '../../../global_components/KenCard';
import { getStudentInfo } from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { useHistory } from "react-router-dom";

export default function ProfileCard() {
  const [profileDetails, setProfileDetails] = useState({});
  // const [activities, setActivities] = useState([]);
  const userDetails = getUserDetails();
  const history = useHistory()

  useEffect(() => {
    getStudentInfo(userDetails.ContactId)
      .then(res => {
        let profileInfo = res;
        // let data = profileInfo.Activities
        // let splitArray = data.split(";");
        // activities.push(splitArray);
        setProfileDetails(profileInfo)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  // console.log("data", activities);
  return (
    <KenCard>
      <div>
        <Grid container>
          <Grid item md={4}>
            <h2>{profileDetails.firstName} {profileDetails.lastName}</h2>
          </Grid>
          <Grid item md={8}>
            <h3 style={{ color: "#193389", float: "right" }} onClick={() => history.push(`/facultyProfile/${userDetails.ContactId}`)}>View full profile ››</h3>
          </Grid>
        </Grid>
      </div>
      <Grid style={{ display: 'flex' }}>
        {/* <Grid xs={2}>
          <img
            src={profileImg}
            alt=""
            style={{
              width: '80px',
              borderRadius: '12px 12px 0px 0px',
              height: '85px',
            }}
          />
        </Grid> */}
        <Grid xs={2}>
          <div>
            <Typography style={{ fontSize: '10px' }}>
              <b>SCHOOL</b>
            </Typography>
            <Typography style={{ marginTop: '5px' }}>PFS School</Typography>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography style={{ fontSize: '10px' }}>
              <b>GRADE</b>
            </Typography>
            <Typography style={{ marginTop: '5px' }}>GRADE 6</Typography>
          </div>
        </Grid>
        <Grid xs={5}>
          <div>
            <Typography style={{ fontSize: '10px' }}>
              <b>ACTIVITIES</b>
            </Typography>
            <div style={{ display: 'flex', marginTop: '5px' }}>
              <Typography
                style={{
                  fontSize: '12px',
                  margin: '1px',
                  height: '20px',
                }}
              >
                {profileDetails.Activities}
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography style={{ fontSize: '10px' }}>
              <b>FACULTY/COORDINATOR</b>
            </Typography>
            <Typography style={{ marginTop: '5px' }}>Co-ordinator</Typography>
          </div>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontSize: '10px' }}>
            <b>BIO</b>
          </Typography>
          <Typography style={{ fontSize: '12px', marginTop: '5px' }}>
            {profileDetails.Bio}
          </Typography>
        </Grid>
      </Grid>
    </KenCard>
  );
}
