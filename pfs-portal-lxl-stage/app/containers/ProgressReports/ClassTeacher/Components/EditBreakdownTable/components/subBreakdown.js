import React from 'react';
import KenTabs from '../../../../../../components/KenTabs/index.js';
import KenDrawer from '../../../../../../global_components/KenDrawer/index.js';
import SubEnBreakdown from './subEnBreakdown.js';

export default function SubBreakdown(props) {
  const { data, setOpenDrawerBreakdown, getReportDetails } = props;
  const [breakdownData, setBreakdownData] = React.useState();

  React.useEffect(() => {
    setBreakdownData([
      {
        title: 'SUB EN (5M)',
        content: (
          <SubEnBreakdown
            data={data}
            setOpenDrawerBreakdown={setOpenDrawerBreakdown}
            getReportDetails={getReportDetails}
          />
        ),
      },
    ]);
  }, []);

  return (
    <KenDrawer
      title="Subject Enrichment"
      onClose={() => {
        setOpenDrawerBreakdown(false);
      }}
    >
      <KenTabs data={breakdownData} />
    </KenDrawer>
  );
}
