import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { deleteAdditionalInfoData, saveResearchSuperVision } from '../../../../utils/ApiService';
import AdditionalInfo from './AdditionalInfo';
import { addRowData, deleteRowHandleData, handleChangeRelationData } from './utility/utility';
import KenLoader from '../../../../components/KenLoader';

const FacultyResearchSupervision = ({additionalData,setAdditionalData,researchData,setResearchData}) => {
  const [
    facultyResearchSupervisionDetails,
    setFacultyResearchPublicationsDetails,
  ] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(
      setFacultyResearchPublicationsDetails,
      facultyResearchSupervisionDetails,
      evt,
      i
    );
  };
  const addRow = () => {
    addRowData(setFacultyResearchPublicationsDetails, 'RESEARCH SUPERVISION');
  };

  const deleteRowHandle = (infoId) => { 
    deleteRowHandleData(setFacultyResearchPublicationsDetails, infoId);
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
    saveResearchSuperVision(facultyResearchSupervisionDetails).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };
  useEffect(()=>{
    setFacultyResearchPublicationsDetails([...additionalData])
  },[additionalData])

  const onCancelHandle = () => {
    setResearchData(false);
  };

  return (
    <div>
      {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyResearchSupervisionDetails}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          handleCancel={onCancelHandle}
          additionalInfoDetails={researchData}
        />
      </Box>
    </div>
  );
};

export default FacultyResearchSupervision;
