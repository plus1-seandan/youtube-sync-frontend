import React, { useState, useEffect } from "react";
import Messages from "./Messages.js";
import { useDispatch } from "react-redux";
import { Input, Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { addMessage } from "../actions";
import socket from "../apis/socket";
import { getMe } from "../util/account.js";

const Chat = () => {
  const [input, setInput] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await getMe();
      socket.emit("join-room", {
        roomId: id,
        acctId: data.id,
      });
      socket.on("user-joined", (data) => {
        dispatch(addMessage(id, data.sender, data.message));
      });
      socket.on("receive-message", (data) => {
        dispatch(addMessage(id, data.sender, data.message));
      });
      socket.on("user-left", (data) => {
        dispatch(addMessage(id, data.sender, data.message));
      });
    };
    asyncFunc();

    return async () => {
      const { data } = await getMe();
      socket.emit("user-disconnect", {
        roomId: id,
        sender: { id: "ADMIN", name: "ADMIN" },
        leaver: data,
      });
      socket.off();
    };
  }, []);

  const setChatInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = async (e) => {
    const { data } = await getMe();
    if (e.key === "Enter") {
      dispatch(addMessage(id, data, input));
      socket.emit("send-message", {
        roomId: id,
        sender: data,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <Box d="flex" h="100%" flexDirection="column">
      <Text>Chat</Text>
      <Box h="90%">
        <Messages roomId={id} />
      </Box>
      <Box h="10%">
        <Input
          placeholder="Enter a message"
          value={input}
          onKeyDown={handleKeyPress}
          onChange={setChatInput}
        />
      </Box>
    </Box>
  );
};

export default Chat;
