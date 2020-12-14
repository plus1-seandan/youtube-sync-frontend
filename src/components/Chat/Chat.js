import React, { Component, useState, useEffect } from "react";
import "./Chat.css";
import Messages from "./Messages/Messages.js";
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
import Input from "@material-ui/core/Input";
import { useSelector, useDispatch, connect } from "react-redux";
// import { Socket } from "socket.io-client";
// import io from "socket.io-client";
import { addMessage } from "../../actions";
import socket from "../../socket";

// let socket;
// const ENDPOINT = "localhost:5000";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "0 auto",
    float: "none",
    marginbottom: "10px",
  },
  openCard: {
    maxWidth: 200,
  },
  openMedia: {
    height: 80,
  },
  media: {
    objectFit: "cover",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const roomMessage = state["messages"][ownProps.roomId];
  console.log(roomMessage);
  return {
    messages: roomMessage,
  };
};

const Chat = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState([]);
  const currUser = useSelector((state) => state.currUserInfo);
  const dispatch = useDispatch();

  // const sendChat = () => {
  //   console.log("Sending Chat");
  //   socket.emit("send-message", {
  //     roomId: props.thisRoom.room.id,
  //     sender: currUser,
  //     message: input,
  //   });
  // };

  const setChatInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setInput("");
      dispatch(addMessage(props.roomId, currUser, `${input}`));
      socket.emit("send-message", {
        roomId: props.roomId,
        sender: currUser,
        message: input,
      });
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      dispatch(addMessage(props.roomId, data.sender, `${data.message}`));
    });
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2"></Typography>
        <div className={classes.root}>
          <List component="nav">
            <ListItem>
              <Typography component="div">
                <Messages messages={props.messages} />
              </Typography>
            </ListItem>
          </List>
        </div>
      </CardContent>
      <CardActions>
        <Input
          placeholder="Enter a message"
          value={input}
          className={classes.input}
          onKeyDown={handleKeyPress}
          onChange={setChatInput}
          inputProps="aria-label"
        />
      </CardActions>
    </Card>
  );
};

export default connect(mapStateToProps)(Chat);
