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
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms/members?id=${id}`,
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
  const addRoomMember = async (memberId) => {
    try {
      const { data } = await axios.post(
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms/members?memberId=${memberId}&roomId=${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const formatData = {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
      };
      if (data) {
        setRoomMembers(roomMembers.concat(formatData));
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
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
        addRoomMember={addRoomMember}
      />
      <Box h="20%">
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          h="100%"
        >
          Add Friends to Room
        </Button>
      </Box>
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
  console.log({ member });
  return (
    <Box p={2} w="200px" shadow="md" borderWidth="1px" borderRadius="md">
      <Text>
        {member.first_name} {member.last_name} {member.email}
      </Text>
    </Box>
  );
}

export default RoomMembers;
