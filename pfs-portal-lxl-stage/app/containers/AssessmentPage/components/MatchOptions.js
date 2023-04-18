import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenSelect from '../../../components/KenSelect';

export default function MatchOptions(props) {
  const {
    options,
    handleAnswerChange,
    id,
    value,
    setValue,
    multianswer,
    setMultianswer,
  } = props;

  console.log('props options ', options);
  const matchOpAns = options?.map((item, index) => {
    return { label: item?.value?.toString(), value: item?.value?.toString(), valueIndex:index+1};
  });
  const matchOpText = options.map((item, index) => {
    return item;
  });
  console.log('value value', value);
  const [data, setData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  let tempArr = [];
  const openEditBox = (event, data, srNo) => {
    console.log('event', event);   
    setSelectedAnswer(event);
  };
  useEffect(() => {
    if (selectedAnswer) {
      tempArr = [...data];
      tempArr.push(selectedAnswer);
      setData(tempArr);
    }
  }, [selectedAnswer]);

  console.log('data', data);
  return (
    <Paper style={{margin:12,padding:12}}>
      {matchOpAns &&
        matchOpText &&
        matchOpAns.map((el, index) => {
          return (
            <Grid container spacing={2}>
              <Grid item sm={6} md={6}>
                <Typography>{matchOpText[index]?.label}</Typography>
              </Grid>
              <Grid item sm={6} md={6}>
                <KenSelect
                  options={matchOpAns}
                  name={`matchOpText[${index}]['value']`}
                  onChange={openEditBox.bind(this, el, index)}
                  value={selectedAnswer}

                  // name={`options[${index}]['value']`}
                  // value={values.options[index]['value']}
                />
              </Grid>
            </Grid>
          );
        })}
    </Paper>
  );
}
