import React, { useEffect, useRef } from "react";
import { GridItem, Grid, Box, Text } from "@chakra-ui/react";
import socket from "../apis/socket";

import ReactPlayer from "react-player";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPlayed, togglePlay } from "../actions";

const mapStateToProps = (state, ownProps) => {
  const video = state["videos"][ownProps.roomId];
  return {
    video: video,
  };
};

const VideoPlayer = (props) => {
  const dispatch = useDispatch();

  const refPlayer = useRef();
  const { id } = useParams();

  useEffect(() => {
    socket.on("video-play", (payload) => {
      dispatch(togglePlay(props.roomId, true));
    });
    socket.on("video-pause", (payload) => {
      dispatch(togglePlay(props.roomId, false));
    });
    socket.on("seek-video", (payload) => {
      dispatch(setPlayed(props.roomId, payload));
      refPlayer.current.player.seekTo(parseFloat(payload));
    });
  }, [props.video]);

  const handlePlay = () => {
    socket.emit("video-play", {
      roomId: props.roomId,
    });
    dispatch(togglePlay(props.roomId, true));
  };
  const handlePause = () => {
    socket.emit("video-pause", {
      roomId: props.roomId,
    });
    dispatch(togglePlay(props.roomId, false));
  };

  // const handleSeekMouseDown = (e) => {
  //   console.log("handleSeekMouseDown");
  //   // setSeeking(true);
  // };

  const handleSeekChange = (e) => {
    dispatch(setPlayed(props.roomId, e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    refPlayer.current.player.seekTo(parseFloat(e.target.value));
    socket.emit("seek-video", {
      roomId: props.roomId,
      seek: e.target.value,
    });
  };

  return (
    <Box h="100%">
      {props.video && props.video.videoInfo ? (
        <Box h="100%">
          <Box h="90%">
            <ReactPlayer
              ref={refPlayer}
              played={props.video.played}
              className="react-player"
              width="100%"
              height="100%"
              url={`https://www.youtube.com/embed/${props.video.videoInfo.id.videoId}}`}
              playing={props.video.isPlaying}
              controls={false}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </Box>
          <Box>
            <table>
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
                      // onMouseDown={handleSeekMouseDown}
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
            </table>
          </Box>
        </Box>
      ) : (
        <Box d="flex" justifyContent="center" alignItems="center" h="100%">
          <Text>Select Video to play</Text>
        </Box>
      )}
    </Box>
  );
};

export default connect(mapStateToProps)(VideoPlayer);
