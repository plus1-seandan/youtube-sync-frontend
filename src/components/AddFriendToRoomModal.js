import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Account from "./Account";

function Friend({ friend, roomId, addRoomMember }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <Box p={5} w="100%" shadow="md" borderWidth="1px" borderRadius="md">
      <Heading fontSize="m">{friend.email}</Heading>
      <Text>
        {friend.firstName} {friend.lastName}
      </Text>
      <Button
        isLoading={loading}
        onClick={() => {
          addRoomMember(friend.id);
        }}
      >
        Add to Room
      </Button>
    </Box>
  );
}

function AddFriendToRoomModal({ isOpen, onClose, roomId, addRoomMember }) {
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
                    <Friend
                      friend={acct}
                      roomId={roomId}
                      addRoomMember={addRoomMember}
                    />
                  ))}
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter pt="50px">
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddFriendToRoomModal;
