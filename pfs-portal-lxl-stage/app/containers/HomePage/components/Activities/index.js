import React, { useEffect, useState } from 'react';
import { act } from 'react-test-renderer';
import ActivityCard from './components/ActivityCard';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Grid,
  TextField,
  FormControl,
} from '@material-ui/core';
import { FiFilter } from 'react-icons/fi';
import SmallSelectBox from '../../../LMSDashboard/components/smallSelectBox';

function Activities(props) {
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [filterOpt, setFilterOpt] = useState([]);
  let uniqueLabels =[];
  const { activities = [] } = props;
  useEffect(() => {
    let subject1 = activities;
    let arr = [{label:'All',value:'All'}];
    subject1.map(item => arr.push({label:item?.metadata[0]?.data,value:item?.metadata[0]?.data}));
    console.log(arr, 'arr1');
    const uniqueArr = Object.values(arr.reduce((acc, current) => {
      acc[current.label] = current;
      return acc;
    }, {}));
    console.log(uniqueArr,'unique');
    setFilterOpt(uniqueArr);
    console.log(filterOpt,'filterOpt');
  }, [activities]);

  const handleChange = e => {
    console.log(e.target,'e.target');
    setSubjectFilter(e.target.value);
  };
  const filter1 = activities.filter(item => {

      if (item?.metadata[0]?.data === subjectFilter) {
        return item;
      } 
      else if (subjectFilter === 'All') {
        return item;
      }
  });
  console.log(filter1,'filter1')
  console.log(subjectFilter,'subject')
  const history = useHistory();
  const movetonext = () => {
    history.push('/subjectContentStudent');
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={9} sm={9} sx={12} />
        <Grid item md={2} sm={2} sx={12} style={{ marginTop: '-85px' }}>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select value={subjectFilter} onChange={handleChange}>

          {state?.map((item,index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              pr={1}
              style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 'max-content',
              }}
            >
              <p>Activity :&nbsp;</p>
              <FiFilter style={{ fontSize: 'medium', cursor: 'initial' }} />
            </Box>
            <SmallSelectBox
              label=""
              options={filterOpt}
              value={subjectFilter}
              onChange={handleChange}
            />
          </Box>
        </Grid>

        <Grid item md={12} sm={12} sx={12}>
          <div
            style={{ height: '270px', overflowY: 'scroll', padding: '18px' }}
            onClick={movetonext}
          >
            {filter1?.map((activity, index) => {
              return (
                <ActivityCard
                  variant={activity?.type}
                  // title={activity?.metadata[0]?.data?activity?.metadata[0]?.data:activity?.title}
                  // title={activity?.type}
                  title={activity?.metadata[0]?.data}
                  subTitle={activity?.subject}
                  secondaryText={`Chapter: ${activity?.sectionName}`}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Activities;
