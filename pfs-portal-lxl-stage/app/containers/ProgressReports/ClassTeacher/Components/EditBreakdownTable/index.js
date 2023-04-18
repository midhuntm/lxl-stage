import React, { useState } from 'react';
import KenDrawer from '../../../../../global_components/KenDrawer/index';
import KenTabs from '../../../../../components/KenTabs';
import MaBreakdown from './components/maBreakdown';
import PpBreakdown from './components/PpBreakdown';

export default function EditBreakdownTable(props) {
  const { data, setOpenDrawerBreakdown, getReportDetails, standard } = props;
  console.log(standard, data);
  const [breakdownData, setBreakdownData] = React.useState();
  const [breakdata, setBreakdata] = useState(data);

  React.useEffect(() => {
    let arrOne = [
      {
        title: 'P&P (5M)',
        content: (
          <PpBreakdown
            data={breakdata}
            setOpenDrawerBreakdown={setOpenDrawerBreakdown}
            getReportDetails={getReportDetails}
            type="two"
            setData={setBreakdata}
          />
        ),
      },
      {
        title: 'MA (5M)',
        content: (
          <MaBreakdown
            data={breakdata}
            setOpenDrawerBreakdown={setOpenDrawerBreakdown}
            getReportDetails={getReportDetails}
            type="two"
            setData={setBreakdata}
          />
        ),
      },
    ];

    let arrTwo = [
      {
        title: 'P&P (5M)',
        content: (
          <PpBreakdown
            data={breakdata}
            setOpenDrawerBreakdown={setOpenDrawerBreakdown}
            getReportDetails={getReportDetails}
            type="three"
            setData={setBreakdata}
          />
        ),
      },
      {
        title: 'MA (5M)',
        content: (
          <MaBreakdown
            data={breakdata}
            setOpenDrawerBreakdown={setOpenDrawerBreakdown}
            getReportDetails={getReportDetails}
            type="three"
            setData={setBreakdata}
          />
        ),
      },
    ];

    if (
      data[0].term === 'Annual' &&
      standard.Batch_1_controller__c === false &&
      standard.Batch_2_controller__c === true
    ) {
      setBreakdownData([
        {
          title: 'PERODIC ASSESMENT-2',
          content: <KenTabs data={arrOne} />,
        },
        {
          title: 'PERODIC ASSESMENT-3',
          content: <KenTabs data={arrTwo} />,
        },
      ]);
    } else {
      setBreakdownData([
        {
          title: 'P&P (5M)',
          content: (
            <PpBreakdown
              data={breakdata}
              setOpenDrawerBreakdown={setOpenDrawerBreakdown}
              getReportDetails={getReportDetails}
              type="one"
              setData={setBreakdata}
            />
          ),
        },
        {
          title: 'MA (5M)',
          content: (
            <MaBreakdown
              data={breakdata}
              setOpenDrawerBreakdown={setOpenDrawerBreakdown}
              getReportDetails={getReportDetails}
              type="one"
              setData={setBreakdata}
            />
          ),
        },
      ]);
    }
  }, [breakdata]);
  return (
    <KenDrawer
      title="Periodic Assesment"
      onClose={() => {
        setOpenDrawerBreakdown(false);
      }}
    >
      <KenTabs data={breakdownData} />
    </KenDrawer>
  );
}
