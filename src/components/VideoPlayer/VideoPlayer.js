import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import SearchBar from "../Searchbar/Searchbar";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList/VideoList";
import VideoDetail from "../VideoDetail/VideoDetail";
import queryString from "query-string";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const ENDPOINT = "localhost:5000";
const socket = io(ENDPOINT);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const VideoPlayer = ({
  name,
  room,
  roomId,
  videos,
  selectedVideo,
  handleVideoSelect,
  videoPlaying,
  seek,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <VideoDetail
            video={selectedVideo}
            videoPlaying={videoPlaying}
            room={room}
            roomId={roomId}
            seek={seek}
          />
        </Grid>
        <Grid item xs={6}>
          <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
        </Grid>
      </Grid>
    </div>
    // <div className="ui container" style={{ marginTop: "1em" }}>
    //   {/* <SearchBar handleFormSubmit={handleSubmit}/> */}
    //   <div className="ui grid">
    //     <div className="ui row">
    //       <div className="eleven wide column">
    //         <VideoDetail
    //           video={selectedVideo}
    //           videoPlaying={videoPlaying}
    //           room={room}
    //         />
    //       </div>
    //       <div className="five wide column">
    //         <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default VideoPlayer;
