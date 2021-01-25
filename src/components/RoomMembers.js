import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, VStack, Text, Heading, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AddFriendToRoomModal from "./AddFriendToRoomModal";

function RoomMembers() {
  const { id } = useParams();
  const [roomMembers, setRoomMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const asyncFunc = async () => {
      const roomMembers = await axios.get(
        `http://localhost:5001/rooms/members?id=${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setRoomMembers(roomMembers.data);
    };
    asyncFunc();
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Box
      overflowY="scroll"
      h="100%"
      d="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <AddFriendToRoomModal
        isOpen={openModal}
        onClose={handleClose}
        roomId={id}
      />
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add Friends to Room
      </Button>
      <Text>Room Members</Text>
      <VStack spacing={4}>
        {roomMembers.length > 0 &&
          roomMembers.map((member) => (
            <Member member={member} key={member.id} />
          ))}
      </VStack>
    </Box>
  );
}

function Member({ member }) {
  return (
    <Box p={2} w="200px" shadow="md" borderWidth="1px" borderRadius="md">
      <Text>
        {member.first_name} {member.last_name} {member.email}
      </Text>
    </Box>
  );
}

export default RoomMembers;
