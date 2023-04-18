import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const YoutubeEmbed = (props) => {
  let { embedId, callback } = props
  console.log("embedurl", embedId);
  const handleParentCallback = (e) => {
    console.log("events", e);
    callback(true);
  }

  return (
    <React.Fragment >
      <ReactPlayer
        onEnded={() => handleParentCallback()}
        controls={true}
        url={embedId}
        config={{
          file: { attributes: { controlsList: 'nodownload' } },
        }}
        className="react-player"
        style={{
          width: '90%',
          height: "auto",
          margin: '0 auto',
          paddingTop: "3em"
        }}
      />
    </React.Fragment>
  );
};
YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
export default YoutubeEmbed;
