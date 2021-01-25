import React from "react";
import { GridItem, Grid } from "@chakra-ui/react";
import Header from "../components/Header";
import MyRooms from "../components/MyRooms";
import MyFriends from "../components/MyFriends";
import SearchAccountBody from "../components/SearchAccountBody";

const SearchUsers = () => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={13}>
        <Header />
      </GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={1} colEnd={2}></GridItem>
      <GridItem rowStart={2} rowEnd={13} colStart={2} colEnd={12}>
        <SearchAccountBody />
      </GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={12} colEnd={13}></GridItem>
    </Grid>
  );
};
export default SearchUsers;
