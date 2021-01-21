import React, {
  Component,
  useEffect,
  useState,
  useRef,
  createRef,
} from "react";
import { GridItem, Grid, Box, Text } from "@chakra-ui/react";

// import { hot } from "react-hot-loader";
import socket from "../socket";
// import { useSelector, useDispatch, connect } from "react-redux";

// import { togglePlay, setPlayed } from "../../../../../actions";

import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";

const VideoPlayer = ({ videoId }) => {
  // const [seeking, setSeeking] = useState(false);
  // const [played, setPlayed] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  const initState = {
    id: videoId,
    playing: false,
  };
  const refPlayer = useRef();
  const [video, setVideo] = useState(initState);
  const dispatch = useDispatch();

  const handlePlay = () => {
    // setIsPlaying(true);
    socket.emit("video-play", {
      // roomId: props.roomId,
    });
  };
  const handlePause = () => {
    // setIsPlaying(false);
    socket.emit("video-pause", {
      // roomId: props.roomId,
    });
  };

  useEffect(() => {
    socket.on("video-play", (payload) => {
      // dispatch(togglePlay(props.roomId, true));
    });
    socket.on("video-pause", (payload) => {
      // dispatch(togglePlay(props.roomId, false));
    });
    socket.on("seek-video", (payload) => {
      console.log(payload);
      // dispatch(setPlayed(props.roomId, payload));
      // setPlayed(parseFloat(payload));
      refPlayer.current.player.seekTo(parseFloat(payload));
    });
  }, [videoId]);

  const handleSeekMouseDown = (e) => {
    console.log("handleSeekMouseDown");
    // setSeeking(true);
  };

  const handleSeekChange = (e) => {
    console.log("handleSeekChange");
    // dispatch(setPlayed(props.roomId, e.target.value));
    // setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    console.log("handleSeekMouseUp");

    // setSeeking(false);
    refPlayer.current.player.seekTo(parseFloat(e.target.value));
    socket.emit("seek-video", {
      // roomId: props.roomId,
      seek: e.target.value,
    });
  };

  return (
    <Box h="100%">
      {videoId ? (
        <ReactPlayer
          ref={refPlayer}
          className="react-player"
          width="100%"
          height="100%"
          url={`https://www.youtube.com/embed/${videoId}}`}
          // pip={pip}
          playing={video.playing}
          controls={false}
          // light={light}
          // loop={loop}
          // playbackRate={playbackRate}
          // volume={volume}
          // muted={muted}
          // onReady={() => console.log("onReady")}
          // onStart={() => console.log("onStart")}
          onPlay={handlePlay}
          // onEnablePIP={this.handleEnablePIP}
          // onDisablePIP={this.handleDisablePIP}
          onPause={handlePause}
          // onBuffer={() => console.log("onBuffer")}
          // onSeek={(e) => console.log("onSeek", e)}
          // onEnded={this.handleEnded}
          // onError={(e) => console.log("onError", e)}
          // onProgress={this.handleProgress}
          // onDuration={this.handleDuration}
        />
      ) : (
        <Box d="flex" justifyContent="center" alignItems="center" h="100%">
          <Text>Select Video to play</Text>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;

{
  /* <table>
          <tbody>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={props.video.played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td>
                <progress max={1} value={props.video.played} />
              </td>
            </tr>
          </tbody>
        </table> */
}
