import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, handleVideoSelect }) => {
  console.log(videos);
  if (videos) {
    const renderedVideos = videos.map((video) => {
      return (
        <VideoItem
          key={video.id.videoId}
          video={video}
          handleVideoSelect={handleVideoSelect}
        />
      );
    });
    return <div className="ui relaxed divided list">{renderedVideos}</div>;
  }
  return <p>search videos</p>;
};
export default VideoList;
