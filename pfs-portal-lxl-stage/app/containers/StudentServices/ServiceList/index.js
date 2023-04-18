import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import KenGrid from '../../../global_components/KenGrid';
import KenLoader from '../../../components/KenLoader';
import KenCard from '../../../global_components/KenCard';
import KenHeader from '../../../global_components/KenHeader/index';
import KenSelect from '../../../components/KenSelect';
import { useTranslation } from 'react-i18next';
import configContext from '../../../utils/helpers/configHelper';
import PreviewPage from './Components/index';
import '../styles.scss';

const useStyles = makeStyles(theme => ({
  headBox: {
    backgroundColor: theme.palette.KenColors.kenWhite,
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
  subHead: {
    fontSize: 12,
    paddingRight: 15,
    color: theme.palette.KenColors.neutral900,
  },
  actionBtn: {
    borderRadius: '50%',
  },
}));
export default function ServiceList(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { homePage, setReloadTable } = props;
  const [showFilter, setShowFilter] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // change to false
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [selectOptions] = useState(['All']);
  const columns = [
    {
      Header: 'Case Number',
      accessor: 'Case_No',
      disableGlobalFilter: true,
    },
    // {
    //   Header: 'Service Type',
    //   accessor: 'Service_Type',
    //   disableGlobalFilter: true,
    // },
    {
      Header: 'Subject',
      accessor: 'Subject',
      disableGlobalFilter: true,
    },
    {
      Header: 'Description',
      accessor: 'Description',
      disableGlobalFilter: true,
    },
    {
      Header: 'Date',
      accessor: 'Date',
      disableGlobalFilter: true,
    },
    {
      Header: 'Status',
      accessor: 'Status',
      disableGlobalFilter: true,
    }
  ];
  useEffect(() => {
    if (homePage != undefined) {
          setShowFilter(true);
        } else {
          setShowFilter(false);
        }
    setTableData(props.tableData)
  },[props.tableData])
  
  const onPreview = props => {
    console.log('service list', props);
    setPreviewData(props);
    setShowPreview(true);
  };
  const closePreview = props => {
    setShowPreview(props);
    setReloadTable(!reloadTable)
  };
  return (
    <>
      <Box>
        {loading && <KenLoader />}
        {!showPreview ? (
          <>
            {!showFilter ? (
              <Grid item md={12}>
                <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                  <Box mb={1}>
                    <KenHeader
                      title={
                        <Typography className={classes.heading}>
                          {t('headings:SERVICE LIST')}
                        </Typography>
                      }
                    >
                      <Typography className={classes.subHead}>
                        {t('headings: Service Sub-Type')}
                      </Typography>
                      <div className="input-field-item">
                        <KenSelect
                          placeholder="Select"
                          inputBaseRootClass={classes.inputBaseClass}
                          className={classes.selectDrawer}
                          options={selectOptions}
                          name="serviceSubType"
                          value="All"
                          variant="outline"
                        />
                      </div>
                    </KenHeader>
                  </Box>
                </Box>
              </Grid>
            ) : null}
            {tableData?.length > 0 ? (
              <Grid item md={12}>
                <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                  <Box pt={2} pb={2} pl={2} pr={2}>
                    <KenCard paperStyles={{ padding: 16 }}>
                      <div className="case-details-table">
                        <KenGrid
                          columns={columns}
                          data={tableData}
                          pagination={{ disabled: true }}
                          tableTotal={{ disabled: true, checkbox: true }}
                          gridProps={{
                            getRowProps: row => ({
                              onClick: () => onPreview(row.original),
                            }),
                          }}
                          toolbarDisabled={true}
                        />
                      </div>
                    </KenCard>
                  </Box>
                </Box>
              </Grid>
            ) : <Grid item md={12}>
            <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
              <Box pt={2} pb={2} pl={2} pr={2}>
                <KenCard paperStyles={{ padding: 16 }}>
                  <div className="case-details-table">
                    <KenGrid
                      columns={columns}
                      data={[]}
                      pagination={{ disabled: true }}
                      tableTotal={{ disabled: true, checkbox: true }}
                      gridProps={{
                        getRowProps: row => ({
                          onClick: () => onPreview(row.original),
                        }),
                      }}
                      toolbarDisabled={true}
                    />
                  </div>
                </KenCard>
              </Box>
            </Box>
          </Grid>}
          </>
        ) : (
          <>
            <Grid item md={12}>
              <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                <Box mb={1}>
                  <PreviewPage
                    data={previewData}
                    dataUpdated={dataUpdated}
                    setDataUpdated={setDataUpdated}
                    closePreview={closePreview}
                  />
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
