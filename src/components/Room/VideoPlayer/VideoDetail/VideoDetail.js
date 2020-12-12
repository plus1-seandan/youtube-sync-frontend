import React from "react";
import ReactPlayer from "react-player/youtube";
import io from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TestPlayer from "./TestPlayer/TestPlayer";

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

const VideoDetail = ({ video, room, roomId, videoPlaying, seek }) => {
  const videoId = video ? video.id.videoId : "";
  const classes = useStyles();

  if (videoId) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <TestPlayer
            url={`https://www.youtube.com/embed/${videoId}`}
            videoPlaying={videoPlaying}
            room={room}
            roomId={roomId}
            seek={seek}
          />
        </Grid>
      </div>
    );
  }
  return (
    <div>
      {/* <h1>Search videos...</h1> */}
      <br></br>
    </div>
  );
};
export default VideoDetail;
