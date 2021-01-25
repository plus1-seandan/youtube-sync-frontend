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
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={1}
        colEnd={2}
        bg="tomato"
      ></GridItem>
      <GridItem rowStart={2} rowEnd={12} colStart={2} colEnd={12} bg="#FEFCBF">
        <SearchAccountBody />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={12}
        colEnd={13}
        bg="tomato"
      ></GridItem>
      <GridItem rowStart={12} rowEnd={13} colStart={1} colEnd={13} bg="#C6F6D5">
        Footer
      </GridItem>
    </Grid>
  );
};
export default SearchUsers;
