import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Center,
  Input,
  VStack,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

const Account = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}:5001/friends?friendId=${data.id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
  };
  return (
    <Box p={5} shadow="md" borderWidth="1px" w="500px">
      <Box d="flex" alignItems="flex-start" flexDirection="column">
        <HStack>
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png"
          />
          <Heading fontSize="xl">{data.email}</Heading>
        </HStack>
        <Box d="flex" w="100%">
          <Text>
            {data.firstName} {data.lastName}
          </Text>
          <Spacer />
          <Button
            onClick={handleClick}
            isLoading={loading}
            disabled={data.friend}
          >
            Add as Friend
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
