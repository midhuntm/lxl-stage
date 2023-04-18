import { Button } from "@material-ui/core";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const TestPage = () => {
    const [toggleLink, setToggleLink] = useState(false)
    const [link, setLink] = useState("https://player.vimeo.com/video/762130314?h=4d7e2ce93a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479")
    const [link2, setLink2] = useState('https://player.vimeo.com/video/762130369?h=52d66159ac&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479')

    const toggleLinkBtn = () => {
        setToggleLink(!toggleLink)
    }

    return (<React.Fragment>
        {/* <div style="padding:56.25% 0 0 0;position:relative;"> */}
        <Button onClick={toggleLinkBtn} style={{
            fontWeight: 'bold',
            padding: '10px',
            border: '1px solid',
            background: '#fff3e0',
            color: '#000'
        }}>Toggle another Video</Button>
        <ReactPlayer
            controls={true}
            config={{
                file: { attributes: { controlsList: 'nodownload' } },
            }}
            className="react-player"
            url={!toggleLink ? link : link2}
            // url={"https://www.youtube.com/watch?v=l-omDRV21GU"}
            style={{
                width: '70%',
                height: 400,
                margin: '0 auto'
                //  width: '100%', height: '100vh' 
            }}
        />
        
        {/* </div> */}
    </React.Fragment>
    )
}

export default TestPage