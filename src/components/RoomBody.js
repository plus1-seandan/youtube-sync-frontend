import axios from "axios";
import { GridItem, Grid, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";
import VideoSearch from "./VideoSearch";
import VideoPlayer from "./VideoPlayer";
import socket from "../socket";
import RoomMembers from "./RoomMembers";
import { getMe } from "../util/account";
import Chat from "./Chat";

function RoomBody({ roomId }) {
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState();

  useEffect(() => {
    // const asyncFunc = async () => {
    //   const { data } = await getMe();
    //   socket.emit("join-room", {
    //     roomId: roomId,
    //     acctId: data.id,
    //   });
    // };
    // asyncFunc();
    // socket.on("user-joined", (data) => {
    //   // dispatch(
    //   //   addMessage(
    //   //     props.thisRoom.room.id,
    //   //     { id: "ADMIN", name: "ADMIN" },
    //   //     `${data.firstName} joined the chat`
    //   //   )
    //   // );
    // });

    // socket.on("user-left", (data) => {
    //   dispatch(addMessage(props.thisRoom.room.id, data.sender, data.message));
    // });

    // socket.on("change-video", (payload) => {
    //   dispatch(setVideo(payload.roomId, payload.video));
    // });

    return () => {
      // socket.emit("user-disconnect", {
      //   roomId: props.thisRoom.room.id,
      //   sender: { id: "ADMIN", name: "ADMIN" },
      //   leaver: currUser,
      // });
      // socket.off();
    };
  }, []);

  const selectVideo = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const searchVideos = async (query) => {
    console.log({ query });
    const response = await axios.get(
      `http://localhost:5001/youtube?query=${query}`
    );
    console.log({ data: response.data });
    setSearchedVideos(response.data);
    console.log(searchedVideos);
  };

  return (
    <Grid
      h="100%"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      border="solid"
    >
      <GridItem rowStart={1} rowEnd={12} colStart={1} colEnd={3}>
        <VideoSearch searchVideos={searchVideos} />
        <VideoList videos={searchedVideos} selectVideo={selectVideo} />
      </GridItem>
      <GridItem
        rowStart={1}
        rowEnd={13}
        colStart={3}
        colEnd={11}
        border="solid"
      >
        <VideoPlayer videoId={selectedVideoId} />
      </GridItem>
      <GridItem
        rowStart={1}
        rowEnd={8}
        colStart={11}
        colEnd={13}
        border="solid"
      >
        <Chat />
      </GridItem>
      <GridItem
        rowStart={8}
        rowEnd={13}
        colStart={11}
        colEnd={13}
        border="solid"
      >
        <RoomMembers />
      </GridItem>
    </Grid>
  );
}

export default RoomBody;
