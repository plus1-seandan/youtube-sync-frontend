import React, { Component, useState, useEffect } from "react";
import Messages from "./Messages.js";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ReactDOM from "react-dom";
// import "./index.css";
// import ChatEngineCore from "chat-engine";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import opengraph from "chat-engine-open-graph";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch, connect } from "react-redux";
import { Input, Box, Spacer } from "@chakra-ui/react";

// import { Socket } from "socket.io-client";
// import io from "socket.io-client";
import { addMessage, startMessage } from "../actions";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { getMe } from "../util/account.js";

const Chat = () => {
  const [input, setInput] = useState([]);
  // const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(startMessage(id));
      const { data } = await getMe();
      socket.emit("join-room", {
        roomId: id,
        acctId: data.id,
      });
      socket.on("user-joined", (data) => {
        const { roomId, sender, message } = data;
        dispatch(addMessage(roomId, sender, message));
      });
      socket.on("receive-message", (data) => {
        dispatch(addMessage(id, data.sender, data.message));
      });
    };
    asyncFunc();

    return () => {
      // socket.emit("user-disconnect", {
      //   roomId: props.thisRoom.room.id,
      //   sender: { id: "ADMIN", name: "ADMIN" },
      //   leaver: currUser,
      // });
      // socket.off();
    };
  }, []);

  const setChatInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = async (e) => {
    const { data } = await getMe();
    if (e.key === "Enter") {
      // setMessages([...messages, _data]);
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
      <Box>
        <Messages roomId={id} />
      </Box>
      <Spacer />
      <Box>
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
