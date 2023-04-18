import React, { useEffect } from 'react';
import { Grid, Box, Typography, Modal, Button } from '@material-ui/core';
import YoutubeEmbed from './youtubeEmbeded';
import { useLocation } from 'react-router-dom';
import KenButton from '../../../global_components/KenButton';
import KenHeader from '../../../global_components/KenHeader';
import history from '../../../utils/history';
import { urlCompletionSet,GetUserAttempts,StartAttempt,QuizInstruction } from '../../../utils/ApiService';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import Notseen from '../../../assets/rafiki.png';
import Achieved from '../../../assets/Frame1.svg';
import { useHistory } from 'react-router-dom';
import KenLoader from '../../../components/KenLoader';

// import axios from "axios";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  padding: '20px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};
const Film = () => {
  const location = useLocation();
  const userDetails = getUserDetails();
  const { fileState, urlid, description,quizData,actionTime} = location.state;
  const history = useHistory();
  const [videoEnded, setVideoEnded] = React.useState(true);
  // const [funActivity, setFunActivity] = React.useState(true)
  // const handleCallBack = videoEnddata => {
  //   setVideoEnded(videoEnddata);
  // };

  // modal
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    img: '',
    description: '',
  });
  // const [currentUrlIndex, setCurrentUrlIndex] = React.useState(0);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [attemptId, setAttemptId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [instructionsData, setInstructionsData] = React.useState({});


  console.log(showNextButton,"showNextButton");
  const handleClose = () => setOpen(false);

const checkVideoStatus = () => {
    if (showNextButton===true) {
      setOpen(true)

      setData({
        img:Achieved,
        description:"Awesome! you have completed the video successfully"
      })
  // alert("Awesome! you have completed the video successfully")
  let payload = {
    method: "post",
    urlid: urlid,
    contactid: userDetails.ContactId
  }
  urlCompletionSet(payload)
    .then((res) => {
      console.log(res,"resdata");
      // setFunActivity(false)
      alert("Awesome! you have completed the video successfully")
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
  // alert("Oops!! finish the video first");
      setOpen(true)
      setData({
        img:Notseen,
        description:" Oops.. The video is not completed. Get completed with this video to move to you next great learning path"
      })
    }
  }

  useEffect(() => {

    if(quizData?.id){
      let quizId=quizData?.id
      setLoading(true);
      GetUserAttempts(userDetails?.ContactId,quizId)
        .then(res => {
          if (res?.attempts?.length > 0) {
            // find the Gretest Attempt ID with "state": "inprogress",
            const obj = res.attempts.find(item => item.state === 'inprogress');
            if (obj) {
              setAttemptId(obj.id);
              // setStartTime(obj.timestart);
              setLoading(false);

              return obj.id;
            }
            else {
              StartAttempt(userDetails?.ContactId,quizId)
                .then(res => {
                  // setStartTime(obj.timestart)
                  setAttemptId(res?.attempt?.id);
                  setLoading(false);
                })
                .catch(err => {
                  console.log('error in Start Attempt', err);
                  setLoading(false);
                });
            }
          }
        })
        .catch(err => {
          console.log('error in User Attempts', err);
          setLoading(false);
        });


      setLoading(true);
      QuizInstruction(quizId)
        .then(res => {
          setInstructionsData(res);
          setLoading(false);
        })
        .catch(err => {
          console.log('error in Assignment Instructions', err);
          setLoading(false);
        });

  }
}, [quizData])

 

  const checkVideoStatus2=()=>{
    // setOpen(true);

    // history.push('/feedback')
    // window.open(
    //   `/instructions?id=${quizData?.id}&name=${quizData?.name}`,
    //   'mywindow',
    //   'fullscreen=yes,status=1,toolbar=0'
    // );
    // window.open(
    //   `studentAssessment?id=${quizData?.id}&contactId=${userDetails?.ContactId}&name=${quizData?.name}&attemptId=${attemptId}&totalMarks=${instructionsData?.totalmarks
    //   }`,
    //   'mywindow',
    //   'fullscreen=yes,status=1,toolbar=0'
    // );
    window.open(
      `studentAssessment?id=${quizData?.id}&actionTimeId=${actionTime?.id}&contactId=${userDetails?.ContactId}&name=${quizData?.name}
      &actionTimeName=${actionTime?.name}&attemptId=${attemptId}&actionAttemptId=${actionTime?.attemptId}&totalMarks=${instructionsData?.totalmarks}
      &actionTotalMarks=${actionTime?.totalMarks}&chapterId=${actionTime?.chapterId}`,
      'mywindow',
      'fullscreen=yes,status=1,toolbar=0'
    );
  }
  const videodata = 'https://youtu.be/7xmhj4A1-dY';
  return (
    <>
     { loading&&<KenLoader />}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ textAlign: 'center' }}
        >
          <img src={data.img} style={{ width: '65%' }} alt="warning" />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data.description}
        </Typography>
      </Box>
    </Modal>
    <Box minHeight="100%">
      <Grid container spacing={2}>
        <KenHeader title={'Film'}>
          <KenButton
            variant="primary"
            label="Back"
            onClick={() => history.goBack()}
          />
        </KenHeader>

        <Grid item xs={12}
        //  style={{ height: '200vh',
        //  background: 'white' }}
         style={{background: 'white' }}
         >
          <div style={{ textAlign: 'center' }}>
            <YoutubeEmbed
              embedId={fileState}
              videoEnddata={() => setShowNextButton(true)}
            />
            {/* <YoutubeEmbed
              embedId={videodata}
              videoEnddata={() => setShowNextButton(true)}
              // callback={handleCallBack}
            /> */}
          </div>
          <Grid item xs={12} container justify="center" alignItems="center">
            <Grid item xs={12} style={{ padding: '5px 40px' }}>
              <Box>
                <Grid container>
                  <Grid item md={12} style={{ paddingTop: '2em' }}>
                    <Typography>
                      <b>WATCH THE FILM BANNER</b>
                      {/* <p>{parse(description)}</p> */}
                    </Typography>
                  </Grid>
                  <Grid container md={12} style={{ padding: '1em 6em' }}>
                    <Grid item md={6}>
                      {/* {completionStatus ? ( */}
                        {/* <KenButton
                          style={{
                            border: '1px solid #00FF00',
                            color: 'green',
                          }}
                        >
                          Completed
                        </KenButton> */}
                      {/* ) : ( */}
                        <KenButton
                          style={{ border: '1px solid #00218D' }}
                          onClick={() => {
                            checkVideoStatus();
                          }}
                        >
                          <span style={{ fontSize: '14px' }}>
                            Completed Successfully
                          </span>
                        </KenButton>
                      {/* )} */}
                    </Grid>
                    <Grid item md={6}>
                      {/* {showNextButton || completionStatus ? ( */}
                        <KenButton
                          style={{
                            border: '1px solid #00218D',
                            float: 'right',
                          }}
                          // disabled={funActivity}
                          onClick={() => {
                            checkVideoStatus2();
                          }}
                        >
                          <span style={{ fontSize: '14px' }}>
                            Move to fun activities
                          </span>
                        </KenButton>
                      {/* ) : ( */}
                        {/* <KenButton
                          style={{
                            border: '1px solid #00218D',
                            float: 'right',
                          }}
                          // disabled={funActivity}
                          onClick={() => {
                            checkVideoStatus();
                          }}
                        >
                          <span style={{ fontSize: '14px' }}>
                            Move to fun activities
                          </span>
                        </KenButton> */}
                      {/* )} */}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </>
  );
};

export default Film;
