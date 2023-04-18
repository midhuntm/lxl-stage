import React, { useState } from 'react';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenTabs from '../../../../components/KenTabs/index.js';
import KenLoader from '../../../../components/KenLoader';
import KenButton from '../../../../global_components/KenButton';
import CaseDetails from './CaseDetails';
import CaseHistory from './CaseHistory';
import { GrClose } from 'react-icons/gr';
const useStyles = makeStyles(theme => ({
  heading: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '120%',
    color: '#00218d',
    marginRight: 20,
    lineHeight: '30px',
  },
  closeBtn: {
    minHeight: 30,
    minWidth: 30,
  },
}));
export default function PreviewPage(props) {
  const { data, closePreview, setDataUpdated, dataUpdated } = props;
  const [breakdownData, setBreakdownData] = useState();
  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  const [updateServiceData, setUpdateServiceData] = useState(false);

  useEffect(() => {
    setCaseNumber(data?.['Case_No']);
    setBreakdownData([
      {
        title: 'Case Details',
        content: (
          <CaseDetails
            data={data}
            {...props}
            updateServiceData={updateServiceData}
            setUpdateServiceData={setUpdateServiceData}
          />
        ),
      },
      {
        title: 'Case History',
        content: <CaseHistory data={data} />,
      },
    ]);
  }, []);
  const closeItem = data => {
    closePreview(data);
    if (updateServiceData === true) {
      setDataUpdated(!dataUpdated);
    }
  };
  return (
    <>
      {loading && <KenLoader />}
      <div className="caseTabs-main">
        <div
          className="caseTabs-subhead"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '5px 10px',
          }}
        >
          <Typography className={classes.heading}>
            {t(`headings:Case Number ${caseNumber}`)}
          </Typography>
          <div className="caseTabs-closeBtn">
            <KenButton variant="secondary" onClick={() => closeItem(false)}>
              <GrClose />
            </KenButton>
          </div>
        </div>
        <KenTabs data={breakdownData} />
      </div>
    </>
  );
}