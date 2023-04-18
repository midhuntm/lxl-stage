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

const FacultyResearchPublications = ({additionalData,setAdditionalData,publicationsData,setPublicationsData}) => {
  const [
    facultyResearchPublicationsPage,
    setFacultyResearchPublicationsPage,
  ] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(
      setFacultyResearchPublicationsPage,
      facultyResearchPublicationsPage,
      evt,
      i
    );
  };

  const addRow = () => {
    addRowData(setFacultyResearchPublicationsPage, 'RESEARCH & PUBLICATIONS');
  };


  const deleteRowHandle = (infoId) => { 
    deleteRowHandleData(setFacultyResearchPublicationsPage, infoId);
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
    saveResearchSuperVision(facultyResearchPublicationsPage).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };

  useEffect(()=>{
    setFacultyResearchPublicationsPage([...additionalData])
  },[additionalData])

  const onCancelHandle = () => {
    setPublicationsData(false);
  };
  return (
    <div>
      {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyResearchPublicationsPage}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          handleCancel={onCancelHandle}
          additionalInfoDetails={publicationsData}
        />
      </Box>
    </div>
  );
};

export default FacultyResearchPublications;
