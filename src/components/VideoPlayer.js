import React, { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import socket from "../apis/socket";

import ReactPlayer from "react-player";
import { connect, useDispatch } from "react-redux";
// import { setPlayed, togglePlay } from "../actions";

const VideoPlayer = ({
  id,
  video,
  playing,
  played,
  togglePlay,
  handleSeek,
}) => {
  const dispatch = useDispatch();

  const refPlayer = useRef();

  useEffect(() => {
    socket.on("video-play", (payload) => {
      togglePlay(true);
    });
    socket.on("video-pause", (payload) => {
      togglePlay(false);
    });
    socket.on("seek-video", (payload) => {
      handleSeek(payload);
      // dispatch(setPlayed(id, payload));
      refPlayer.current.player.seekTo(parseFloat(payload));
    });
  }, [id]);

  const handlePlay = () => {
    socket.emit("video-play", {
      roomId: id,
    });
    togglePlay(true);
  };
  const handlePause = () => {
    socket.emit("video-pause", {
      roomId: id,
    });
    togglePlay(false);
  };

  const handleSeekChange = (e) => {
    handleSeek(e.target.value);
  };

  const handleSeekMouseUp = (e) => {
    refPlayer.current.player.seekTo(parseFloat(e.target.value));
    socket.emit("seek-video", {
      roomId: id,
      seek: e.target.value,
    });
  };

  return (
    <Box h="100%" p="30px">
      {video ? (
        <Box h="100%">
          <Box h="90%">
            <ReactPlayer
              ref={refPlayer}
              played={played}
              className="react-player"
              width="100%"
              height="100%"
              url={`https://www.youtube.com/embed/${video.id.videoId}}`}
              playing={playing}
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
                      value={played}
                      // onMouseDown={handleSeekMouseDown}
                      onChange={handleSeekChange}
                      onMouseUp={handleSeekMouseUp}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Played</th>
                  <td>
                    <progress max={1} value={played} />
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

export default VideoPlayer;
