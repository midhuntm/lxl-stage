import React, { useEffect } from 'react';
import { Grid, Box, Typography, Modal, Button } from '@material-ui/core';

import YoutubeEmbed from './youtubeEmbeded';
import { useLocation } from 'react-router-dom';
import KenButton from '../../../../global_components/KenButton';
import KenHeader from '../../../../global_components/KenHeader';
import history from '../../../../utils/history';
import getUserDetails from "../../../../assets/rafiki.png"
import Notseen from "../../../../assets/Frame1.svg"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    padding: "20px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
};

const Filmnext = () => {
    const location = useLocation();
    // const userDetails = getUserDetails();
    const { film, urlid, description } = location.state;

    const [videoEnded, setVideoEnded] = React.useState(false)
    // const [funActivity, setFunActivity] = React.useState(true)

    const handleCallBack = (callBackData) => {
        setVideoEnded(callBackData)
    }

    // modal
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        img: "",
        description: ""
    });
    const handleClose = () => setOpen(false);

    const checkVideoStatus = () => {
        if (videoEnded) {
            setData({
                img: Achieved,
                description: "Awesome! you have completed the video successfully"
            })
            //alert("Awesome! you have completed the video successfully")
            // let payload = {
            //   method: "post",
            //   urlid: urlid,
            //   contactid: userDetails.ContactId
            // }
            // urlCompletionSet(payload)
            //   .then((res) => {
            //     console.log(res);
            //     // setFunActivity(false)
            //     alert("Awesome! you have completed the video successfully")
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   })
        } else {
            // alert("Oops!! finish the video first");
            setOpen(true)
            setData({
                img: Notseen,
                description: "Oops.. The video is not completed. Get completed with this video to move to you next great learning path"
            })
        }
    }

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
               >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                        <img src={data.img} alt="warning" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {data.description}
                    </Typography>
                </Box>
            </Modal>
            <Box minHeight="100%">
                <Grid container spacing={2}>
                    <KenHeader title={"Film"}>
                        <KenButton
                            variant="primary"
                            label="Back"
                            onClick={() => history.goBack()}
                        />
                    </KenHeader>

                    <Grid item xs={12} style={{  background: 'white' }}>
                        <div style={{ textAlign: 'center' }}>
                            <YoutubeEmbed embedId={film} callback={handleCallBack} />
                        </div>
                        <Grid item xs={12} container justify="center" alignItems="center">
                            <Grid item xs={12} style={{ padding: '5px 40px' }}>
                                <Box>
                                    <Grid container>
                                        <Grid item md={12} style={{ paddingTop: '2em' }}>
                                            <Typography
                                            >
                                                <b>WATCH THE FILM BANNER</b>
                                                <p>
                                                    {description}
                                                </p>
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Filmnext;