import React, { useEffect } from "react";
import { Button, Center, Heading } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Text,
  Stack,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { setMyFriends } from "../actions";
import { useSelector } from "react-redux";
import Account from "./Account";

function Friend({ friend, roomId }) {
  const addToRoom = async () => {
    await axios.post(
      `http://localhost:5001/rooms/member?memberId=${friend.id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };
  return (
    <Box p={5} w="100%" shadow="md" borderWidth="1px" borderRadius="md">
      <Heading fontSize="m">{friend.email}</Heading>
      <Text>
        {friend.firstName} {friend.lastName}
      </Text>
      <Button onClick={addToRoom}>Add to Room</Button>
    </Box>
  );
}

function AddFriendToRoomModal({ isOpen, onClose, roomId }) {
  const myFriends = useSelector((state) => state.myFriends);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box h="70%" overflowY="scroll" w="50%">
              <Stack spacing={8}>
                {myFriends &&
                  myFriends.map((acct) => (
                    <Friend friend={acct} roomId={roomId} />
                  ))}
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter pt="50px">
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
            <Button colorScheme="blue" mr={3} ml="20px">
              New Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddFriendToRoomModal;
