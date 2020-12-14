import React from "react";
import ReactPlayer from "react-player/youtube";
import io from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Video from "./Video/Video";
import { useSelector, useDispatch, connect } from "react-redux";

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

const VideoDetail = (props) => {
  // const videoId = video ? video.id.videoId : "";
  const classes = useStyles();
  console.log(props);
  // if (videoId) {
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Video roomId={props.roomId} />
      </Grid>
    </div>
  );
  // }
  // return (
  //   <div>
  //     {/* <h1>Search videos...</h1> */}
  //     <br></br>
  //   </div>
  // );
};

export default VideoDetail;
