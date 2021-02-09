import axios from "axios";
import { GridItem, Grid, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";
import VideoSearch from "./VideoSearch";
import VideoPlayer from "./VideoPlayer";
import socket from "../apis/socket";
import RoomMembers from "./RoomMembers";
import Chat from "./Chat";
import { setVideo } from "../actions";
import { useDispatch } from "react-redux";

function RoomBody({ roomId }) {
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [video, setVideo] = useState();
  const [playing, setPlaying] = useState();
  const [played, setPlayed] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms/id?id=${roomId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log({ data });
      setVideo(data.video);
      setPlaying(data.playing);
      setPlayed(data.played);
    };
    asyncFunc();

    socket.on("change-video", (payload) => {
      setVideo(payload.video);
    });
    return () => {};
  }, []);

  const selectVideo = (roomId, video) => {
    console.log({ video });
    setVideo(video);
    // dispatch(setVideo(roomId, video));
    socket.emit("load-video", {
      roomId: roomId,
      video: video,
    });
  };
  const togglePlay = (bool) => {
    setPlaying(bool);
  };
  const searchVideos = async (query) => {
    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}:5001/youtube?query=${query}`
    );
    setSearchedVideos(response.data);
  };
  const handleSeek = (time) => {
    setPlayed(time);
  };
  return (
    <Grid
      h="100%"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={12} colStart={1} colEnd={3}>
        <VideoSearch searchVideos={searchVideos} />
        <VideoList videos={searchedVideos} selectVideo={selectVideo} />
      </GridItem>
      <GridItem rowStart={1} rowEnd={13} colStart={3} colEnd={11}>
        <VideoPlayer
          id={roomId}
          video={video}
          playing={playing}
          played={played}
          togglePlay={togglePlay}
          handleSeek={handleSeek}
        />
      </GridItem>
      <GridItem rowStart={1} rowEnd={8} colStart={11} colEnd={13}>
        <Chat />
      </GridItem>
      <GridItem rowStart={8} rowEnd={13} colStart={11} colEnd={13} pt="20px">
        <RoomMembers />
      </GridItem>
    </Grid>
  );
}

export default RoomBody;
