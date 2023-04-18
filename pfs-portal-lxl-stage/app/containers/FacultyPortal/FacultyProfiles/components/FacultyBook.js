import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { saveResearchSuperVision,deleteAdditionalInfoData } from '../../../../utils/ApiService';
import AdditionalInfo from './AdditionalInfo';
import { addRowData, deleteRowHandleData, handleChangeRelationData } from './utility/utility';
import KenLoader from '../../../../components/KenLoader';

const FacultyBook = ({additionalData,setAdditionalData,bookData,setBookData}) => {
  const [facultyBookPage, setFacultyBookPage] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(setFacultyBookPage, facultyBookPage, evt, i);
  };
  const handleSave = () => {
    setLoading(true);
    saveResearchSuperVision(facultyBookPage).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };

  const addRow = () => {
    addRowData(setFacultyBookPage, 'BOOK');
  };

  const deleteRowHandle = (infoId) => {
    
    deleteRowHandleData(setFacultyBookPage, infoId);
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

  useEffect(()=>{
    setFacultyBookPage([...additionalData])
  },[additionalData])
 console.log("facultyBookPage",facultyBookPage);

 const onCancelHandle = () => {
  setBookData(false);
};
  return (
    <div>
      {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyBookPage}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          additionalInfoDetails={bookData}
          handleCancel={onCancelHandle}
        />
      </Box>
    </div>
  );
};

export default FacultyBook;
