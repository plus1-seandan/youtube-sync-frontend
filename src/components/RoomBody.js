import axios from "axios";
import { GridItem, Grid, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import VideoList from "./VideoList";
import VideoSearch from "./VideoSearch";

function RoomBody({ roomId }) {
  const [searchedVideos, setSearchedVideos] = useState([]);
  const selectVideo = (videoId) => {
    console.log({ videoId });
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
      <GridItem rowStart={1} rowEnd={12} colStart={1} colEnd={4} bg="tomato">
        <VideoSearch searchVideos={searchVideos} />
        <VideoList videos={searchedVideos} selectVideo={selectVideo} />
      </GridItem>
      <GridItem
        rowStart={1}
        rowEnd={9}
        colStart={4}
        colEnd={13}
        bg="#9DECF9"
      ></GridItem>
    </Grid>
    // <div>
    //   Video Player {roomId}
    //   <VideoSearch searchVideos={searchVideos} />
    //   <VideoList videos={searchedVideos} selectVideo={selectVideo} />
    // </div>
  );
}

export default RoomBody;
