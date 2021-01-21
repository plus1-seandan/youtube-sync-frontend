import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
  Textarea,
  Select,
  Spacer,
  FormControl,
  FormLabel,
  FormHelperText,
  StatHelpText,
  Text,
  Switch,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initState = {
  name: "",
  private: false,
};
function NewRoomModal({ isOpen, handleClose }) {
  const history = useHistory();
  const [newRoom, setNewRoom] = useState(initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: room } = await axios({
      method: "post",
      url: `http://localhost:5001/rooms`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: newRoom,
    });
    history.push(`/room/${room.id}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Box
                d="flex"
                alignItems="baseline"
                flexDirection="column"
                m="20px"
              >
                <Box mb="20px">
                  <FormControl id="roomName">
                    <FormLabel>Room Name</FormLabel>
                    <Input
                      placeholder="Room Name..."
                      w="400px"
                      onChange={(e) => {
                        setNewRoom({ ...newRoom, name: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" pt="20px">
                    <FormLabel htmlFor="private" mb="0">
                      Private?
                    </FormLabel>
                    <Switch
                      id="private"
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          private: e.currentTarget.checked,
                        })
                      }
                    />
                  </FormControl>
                </Box>
                <Box d="flex" mt="30px" flexDirection="column">
                  <Button onClick={handleSubmit}>Create Room</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NewRoomModal;
