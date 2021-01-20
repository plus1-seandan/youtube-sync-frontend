import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getMyRooms } from "../../../actions";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
// import MyRoom from "./MyRoom/MyRoom";
import { Box, Button, VStack, Heading, Text } from "@chakra-ui/react";

import { setMyFriends } from "../actions";

const MyFriends = () => {
  const history = useHistory();
  const myFriends = useSelector((state) => state.myFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await axios.get(`http://localhost:5001/friends`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log({ data });
      dispatch(setMyFriends(data));
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
      <VStack spacing={4}>
        {myFriends.length > 0 &&
          myFriends.map((friend) => <Friend friend={friend} />)}
      </VStack>
    </Box>
  );
};

function Friend({ friend }) {
  return (
    <Box p={5} w="200px" shadow="md" borderWidth="1px" borderRadius="md">
      <Heading fontSize="xl">
        {friend.firstName} {friend.lastName}
      </Heading>
    </Box>
  );
}

export default MyFriends;
