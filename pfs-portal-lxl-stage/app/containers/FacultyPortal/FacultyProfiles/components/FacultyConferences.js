import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { deleteAdditionalInfoData, saveResearchSuperVision } from '../../../../utils/ApiService';
import AdditionalInfo from './AdditionalInfo';
import {
  addRowData,
  deleteRowHandleData,
  handleChangeRelationData,
} from './utility/utility';
import KenLoader from '../../../../components/KenLoader';

const FacultyConferences = ({additionalData,setAdditionalData,conferenceData,setConferenceData}) => {
  const [facultyConferencesPage, setFacultyConferencesPage] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(
      setFacultyConferencesPage,
      facultyConferencesPage,
      evt,
      i
    );
  };

  const addRow = () => {
    addRowData(setFacultyConferencesPage, 'CONFERENCES');
  };


  const deleteRowHandle = (infoId) => { 
    deleteRowHandleData(setFacultyConferencesPage, infoId);
    // let infoId = facultyBookPage.filter((event,ind) => { return event.informationId === id})
    setLoading(true);
    let data =[
        {
        "informationId": infoId
        }]
    deleteAdditionalInfoData(data).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };

  const handleSave = () => {
    setLoading(true);
    saveResearchSuperVision(facultyConferencesPage).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };

  useEffect(()=>{
    setFacultyConferencesPage([...additionalData])
  },[additionalData])

  const onCancelHandle = () => {
    setConferenceData(false);
  };
  
  return (
    <div>
       {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyConferencesPage}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          handleCancel={onCancelHandle}
          additionalInfoDetails={conferenceData}
        />
      </Box>
    </div>
  );
};

export default FacultyConferences;
