import React, { useState } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import KenGrid from '../../../../../global_components/KenGrid';
import KenLoader from '../../../../../components/KenLoader';
import { useTranslation } from 'react-i18next';
import { getCaseHistory } from '../../../../../utils/ApiService';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  actionBtn: {
    borderRadius: '50%',
  },
  subHead: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: '#505F79',
    textTransform: 'capitalize',
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
  },
}));
export default function CaseHistory(props) {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const [tableLoop, setTableLoop] = useState([]);
  const columns = [
    {
      Header: 'Time',
      accessor: 'Time',
      disableGlobalFilter: true,
      disableSortBy: true,
    },
    {
      Header: 'Updated Parameter',
      accessor: 'Actions',
      disableGlobalFilter: true,
      disableSortBy: true,
    },
    {
      Header: 'Previous Value',
      accessor: 'Old',
      disableGlobalFilter: true,
      disableSortBy: true,
    },
    {
      Header: 'Current Value',
      accessor: 'New',
      disableGlobalFilter: true,
      disableSortBy: true,
    }
    // {
    //   Header: '',
    //   accessor: 'Feature',
    //   disableGlobalFilter: true,
    //   Cell: ({ value, row }) => {
    //     return (
    //       <div className="action-btn-item">
    //         <KenButton
    //           className={classes.actionBtn}
    //           style={{ borderRadius: '50%' }}
    //           variant="Secondary"
    //           onClick={() => {}}
    //         >
    //           <BsThreeDots />
    //         </KenButton>
    //       </div>
    //     );
    //   },
    // },
  ];
  useEffect(() => {
      getCaseHistory(data?.Case_ID).then(res => {
      let data = [];
      setLoading(false);
      res?.map(item => {
        data.push({
          [moment(item.CreatedDate).format("dddd, MMMM DD YYYY")]: [
            {
              Time: moment(item.CreatedDate).format('hh:mm A'),
              Actions: item.Field,
              Old: item.OldValue ? item.OldValue : '-',
              New: item.NewValue ? item.NewValue : '-'
            },
          ],
        });
      });
      setTableLoop(data);
    }).catch(err=>{
      setTableLoop([]);
      setLoading(false);
    });
  },[]);
  return (
    <Box>
      {loading && <KenLoader />}
      <Grid item md={12}>
        {tableLoop.map((item, key) => {
          return (
            <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
              <div className="caseHistory-table">
                <Typography className={classes.subHead}>
                  {t(`headings: ${Object.keys(item)}`)}
                </Typography>
                <KenGrid
                  columns={columns}
                  data={item[Object.keys(item)[0]]}
                  pagination={{ disabled: true }}
                  tableTotal={{ disabled: true, checkbox: true }}
                  toolbarDisabled={true}
                />
              </div>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
