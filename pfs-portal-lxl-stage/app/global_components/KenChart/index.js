import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
//       hoverBackgroundColor: [
//         '#501800',
//         '#4B5000',
//         '#175000',
//         '#003350',
//         '#35014F',
//       ],
//       data: [65, 59, 80, 81, 56],
//     },
//   ],
// };

export default function KenChart(props) {
  const {
    variant,
    data = {
      labels: [],
      datasets: [
        {
          label: 'label',
          backgroundColor: [],
          hoverBackgroundColor: [],
          data: [],
        },
      ],
    },
    legendDisplay = true,
    legendPosition = 'bottom',
    legendAlign = 'left',
    display = true,
    legendColorBoxWidth = 8,
    legendColorBoxHeight = 8,
    title,
    fontSize = 20,
  } = props;
  //   data = {labels:[],datasets:[{label:"label",backgroundColor:[],hoverBackgroundColor:[],data}]}
  //   refer above code sample
  // title={ display: true,text: title?.text,fontSize: 20}

  return (
    <div>
      {variant === 'pie' ? (
        <Pie
          data={data}
          options={{
            title: {
              display: display,
              text: title,
              fontSize: fontSize,
            },
            plugins: {
              legend: {
                display: legendDisplay,
                position: legendPosition,
              },
            },
          }}
        />
      ) : (
        <Doughnut
          data={data}
          options={{
            title: {
              display: display,
              text: title,
              fontSize: fontSize,
            },
            plugins: {
              legend: {
                display: legendDisplay,
                position: legendPosition,
                align: legendAlign,
                labels: {
                  boxWidth: legendColorBoxWidth,
                  boxHeight: legendColorBoxHeight,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
