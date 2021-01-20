import React from "react";
import { useParams } from "react-router-dom";
import { GridItem, Grid, Box } from "@chakra-ui/react";
import Header from "../components/Header/Header";
import RoomBody from "../components/RoomBody";

function RoomPage({ match }) {
  //   const { id } = useParams();
  const roomId = match.params.id;
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={13} bg="tomato">
        <Header />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={1}
        colEnd={3}
        bg="#F6AD55"
      ></GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={3} colEnd={12} bg="#9AE6B4">
        <RoomBody roomId={roomId} />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={12}
        colEnd={13}
        bg="tomato"
      ></GridItem>
      <GridItem
        rowStart={12}
        rowEnd={13}
        colStart={1}
        colEnd={13}
        bg="#F6E05E"
      />
    </Grid>
  );
}

export default RoomPage;
