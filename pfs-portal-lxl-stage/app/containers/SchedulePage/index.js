/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid, Typography } from '@material-ui/core';


const courses = [
  {
    "hed__Program_Enrollment__c": null,
    "ID": "a032w000003hmb3AAA",
    "CourseOfferingID": "a042w00000SpddiAAB",
    "name": "EE-Course 1 - Term 1 - Section A",
    "hed__Course__cId": "a052w000005i7gnAAA",
    "hed__Course__cName": "EE - Course 1",
    "hed__Start_Date__c": "2020-07-01",
    "hed__End_Date__c": "2020-12-31",
    "hed__Term__c": "a0C2w000001XLgnEAG",
    "attendance__c": null,
    "Schedule": [
      {
        "hed__Saturday__c": "false",
        "hed__Monday__c": "true",
        "hed__Sunday__c": "false",
        "hed__Tuesday__c": "true",
        "hed__Course_Offering__c": "a042w00000SpddiAAB",
        "type": "hed__Course_Offering_Schedule__c",
        "hed__End_Time__c": "13:45:00.000Z",
        "hed__Thursday__c": "true",
        "hed__Wednesday__c": "true",
        "Name": "CSH-000009",
        "hed__Friday__c": "true",
        "Id": "a0J2w000000VbmOEAS",
        "hed__Start_Time__c": "13:00:00.000Z"
      },
      {
        "hed__Saturday__c": "false",
        "hed__Monday__c": "true",
        "hed__Sunday__c": "false",
        "hed__Tuesday__c": "true",
        "hed__Course_Offering__c": "a042w00000SpddiAAB",
        "type": "hed__Course_Offering_Schedule__c",
        "hed__End_Time__c": "08:45:00.000Z",
        "hed__Thursday__c": "true",
        "hed__Wednesday__c": "true",
        "Name": "CSH-000001",
        "hed__Friday__c": "true",
        "Id": "a0J2w000000Vbm8EAC",
        "hed__Start_Time__c": "08:00:00.000Z"
      }
    ]
  }
]

const ScheduleCard = (schedule) => {
  rerurn(
    <Grid item>
      <Typography>
        {schedule.Name}

      </Typography>
    </Grid>)
}


export default function HomePage() {
  return (
    <div style={{ minHeight: '78vh' }}>
      <Container>
        {courses.map(course => <Grid container>
          <Typography >
            {course.name}
          </Typography>
          {course.Schedule && course.Schedule.map(schedule => <ScheduleCard schedule={schedule} />)}
        </Grid>)}
      </Container>
    </div>
  );
}
