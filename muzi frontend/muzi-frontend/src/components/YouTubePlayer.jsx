import React from "react";

const YouTubePlayer = ({ url }) => {
  if (!url) return <p>No song to play</p>;

  return (
    <div className="youtube-player">
      <iframe
        width="560"
        height="315"
        src={url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
