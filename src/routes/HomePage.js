import React from "react";
import { GridItem, Grid } from "@chakra-ui/react";
import Header from "../components/Header";
import MyRooms from "../components/MyRooms";
import MyFriends from "../components/MyFriends";
import PublicRooms from "../components/PublicRooms";

const HomePage = () => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={13}>
        <Header />
      </GridItem>
      <GridItem rowStart={2} rowEnd={7} colStart={1} colEnd={4}>
        <MyRooms />
      </GridItem>
      <GridItem rowStart={7} rowEnd={13} colStart={1} colEnd={4}>
        <MyFriends />
      </GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={4} colEnd={13}>
        <PublicRooms />
      </GridItem>
      <GridItem rowStart={12} rowEnd={13} colStart={1} colEnd={13} />
    </Grid>
  );
};
export default HomePage;
