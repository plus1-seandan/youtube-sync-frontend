import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";

import { setMyRooms } from "../actions";
import NewRoomModal from "./NewRoomModal";

const MyRooms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const myRooms = useSelector((state) => state.myRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(setMyRooms(response.data));
    };
    asyncFunc();

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <Box
      overflowY="scroll"
      h="100%"
      w="100%"
      d="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Heading>My Rooms</Heading>
      <Box>
        <Button onClick={openModal}>Create Room</Button>
      </Box>
      <VStack spacing={4}>
        {myRooms.length > 0 && myRooms.map((room) => <Room room={room} />)}
      </VStack>
      <NewRoomModal isOpen={modalOpen} handleClose={handleClose} />
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
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      d="flex"
      w="100%"
      justifyContent="flex-start"
    >
      <VStack>
        <Heading fontSize="xl">{room.name}</Heading>
        <Button onClick={goToRoom} alignSelf="flex-start">
          Go!
        </Button>
      </VStack>
    </Box>
  );
}

export default MyRooms;
