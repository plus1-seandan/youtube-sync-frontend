import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";

import { setMyFriends } from "../actions";
import { useHistory } from "react-router-dom";

const MyFriends = () => {
  const myFriends = useSelector((state) => state.myFriends);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await axios.get(`http://localhost:5001/friends`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(setMyFriends(data));
    };
    asyncFunc();

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);
  const handleSearchUsers = () => {
    history.push("/search");
  };
  return (
    <Box
      overflowY="scroll"
      h="100%"
      d="flex"
      w="100%"
      flexDirection="column"
      alignItems="flex-start"
      mt="50px"
    >
      <Heading>My Friends</Heading>
      <Button onClick={handleSearchUsers}>Search Users</Button>
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
