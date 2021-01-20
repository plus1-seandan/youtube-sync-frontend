import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getMyRooms } from "../../../actions";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
// import MyRoom from "./MyRoom/MyRoom";
import { Box, Button, VStack, Heading, Text } from "@chakra-ui/react";

import { setMyRooms } from "../actions";

const MyRooms = () => {
  const history = useHistory();
  const myRooms = useSelector((state) => state.myRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await axios.get(`http://localhost:5001/rooms`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(setMyRooms(response.data));
      console.log({ myRooms });
    };
    asyncFunc();

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  return (
    <Box
      overflowY="scroll"
      h="100%"
      d="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Button>Create Room</Button>
      <VStack spacing={4}>
        {myRooms.length > 0 && myRooms.map((room) => <Room room={room} />)}
      </VStack>
    </Box>
  );
};

function Room({ room }) {
  const history = useHistory();

  const goToRoom = () => {
    history.push(`/room/${room.id}`);
  };
  return (
    <Box
      p={5}
      w="300px"
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      d="flex"
      justifyContent="space-between"
    >
      <Heading fontSize="xl">{room.name}</Heading>
      <Button onClick={goToRoom}>Go!</Button>
    </Box>
  );
}

export default MyRooms;
