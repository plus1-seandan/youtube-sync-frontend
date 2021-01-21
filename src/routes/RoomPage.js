import React from "react";
import { useParams } from "react-router-dom";
import { GridItem, Grid, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import RoomBody from "../components/RoomBody";

function RoomPage({ match }) {
  const roomId = match.params.id;
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={13}>
        <Header />
      </GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={1} colEnd={13}>
        <RoomBody roomId={roomId} />
      </GridItem>
      <GridItem rowStart={12} rowEnd={13} colStart={1} colEnd={13} />
    </Grid>
  );
}

export default RoomPage;
