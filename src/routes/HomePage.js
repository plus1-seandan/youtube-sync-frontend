import React from "react";
import { GridItem, Grid, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import MyRooms from "../components/MyRooms";
import MyFriends from "../components/MyFriends";

const HomePage = () => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={13} bg="tomato">
        <Header />
      </GridItem>
      <GridItem rowStart={2} rowEnd={7} colStart={1} colEnd={4} bg="#F6AD55">
        <MyRooms />
      </GridItem>
      <GridItem rowStart={7} rowEnd={13} colStart={1} colEnd={4} bg="tomato">
        <MyFriends />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={4}
        colEnd={13}
        bg="#9AE6B4"
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
};
export default HomePage;
