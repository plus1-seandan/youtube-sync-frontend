import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";

import { setMyFriends } from "../actions";

const MyFriends = () => {
  const myFriends = useSelector((state) => state.myFriends);
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

  return (
    <Box
      overflowY="scroll"
      h="100%"
      d="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Button>Search Friends</Button>
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
