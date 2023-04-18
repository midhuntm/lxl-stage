import React from 'react';
import KenSlider from '../../../../../../components/KenSlider';
import KenTextArea from '../../../../../../global_components/KenTextArea';

export default function FeedBack() {
  const marks = [
    {
      value: 3,
      label: '3',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 0,
      label: '0',
    },
  ];

  function valueText(value) {
    return `${value}%`;
  }
  return (
    <>
      <KenSlider
        orientation="horizontal"
        // minHeight="400px"
        valueText={valueText}
        // value={f.range}
        // handleChange={(e, n) => handleRangeChange(e, n, index)}
        marks={marks}
        label={'Feedback'}
        track={true}
        // className={classes.slider}
        min={0}
        max={3}
      />
      <KenTextArea placeholder="Type your Feedbacks" minRows={3} />
    </>
  );
}
