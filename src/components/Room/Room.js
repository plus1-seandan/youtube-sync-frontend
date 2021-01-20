import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer.js";
import Chat from "../Chat/Chat.js";
import SearchBar from "./Searchbar/Searchbar";
import youtube from "../../apis/youtube";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RoomMembers from "./RoomMembers/RoomMembers";
import MyFriendsRoom from "./MyFriendsRoom/MyFriendsRoom";
import axios from "axios";
import Header from "../Header/Header";
import { useSelector, useDispatch, connect } from "react-redux";
import { getRoomMembers, initializeVideo, setVideo } from "../../actions";
import { addMessage, startMessage } from "../../actions";
import socket from "../../socket";
import Video from "./VideoPlayer/VideoDetail/Video/Video.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const mapStateToProps = (state, ownProps) => {
  const roomId = ownProps.location.state.roomId;
  return {
    thisRoom: state["myRooms"][roomId],
  };
};

const Room = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUserInfo);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    axios
      .get("http://localhost:5001/rooms/search-room-members", {
        params: {
          roomId: props.thisRoom.room.id,
        },
      })
      .then(function (response) {
        console.log(response.data);
        const roomId = props.thisRoom.room.id;
        const roomMembersArr = response.data;
        console.log(roomMembersArr);
        dispatch(getRoomMembers(roomId, roomMembersArr));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    dispatch(startMessage(props.thisRoom.room.id));
    dispatch(initializeVideo(props.thisRoom.room.id));
  }, []);

  useEffect(() => {
    socket.emit("join-room", { roomId: props.thisRoom.room.id, currUser });

    socket.on("user-joined", (data) => {
      dispatch(
        addMessage(
          props.thisRoom.room.id,
          { id: "ADMIN", name: "ADMIN" },
          `${data.firstName} joined the chat`
        )
      );
    });

    socket.on("user-left", (data) => {
      dispatch(addMessage(props.thisRoom.room.id, data.sender, data.message));
    });

    socket.on("change-video", (payload) => {
      dispatch(setVideo(payload.roomId, payload.video));
    });

    return () => {
      socket.emit("user-disconnect", {
        roomId: props.thisRoom.room.id,
        sender: { id: "ADMIN", name: "ADMIN" },
        leaver: currUser,
      });
      socket.off();
      console.log("user has left");
    };
  }, []);

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });
    console.log(response);
    setVideos(response.data.items);
  };

  const handleVideoSelect = (video) => {
    const roomId = props.thisRoom.room.id;
    dispatch(setVideo(roomId, video));
    socket.emit("load-video", {
      roomId: roomId,
      video: video,
    });
  };

  if (isLoading) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Header />
      <h1>Welcome to room {props.thisRoom.room.name}</h1>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <RoomMembers roomId={props.thisRoom.room.id} />
        </Grid>
        <Grid item xs={6}>
          <SearchBar handleFormSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={6}>
          <VideoPlayer
            name={props.thisRoom.room.name}
            room={props.thisRoom.room}
            roomId={props.thisRoom.room.id}
            selectedVideo={selectedVideo}
            videos={videos}
            videoPlaying={videoPlaying}
            seek={seek}
            handleVideoSelect={handleVideoSelect}
            handleSubmit={handleSubmit}
          />
          {/* <Video roomId={props.thisRoom.room.id} /> */}
        </Grid>
        <Grid item sm={6}>
          <Chat roomId={props.thisRoom.room.id} />
        </Grid>
        <Grid item xs={3}>
          <MyFriendsRoom
            roomId={props.thisRoom.room.id}
            // parentCallback={handleCallback}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Chat
            name={name}
            room={room}
            messages={messages}
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
            setMessages={setMessages}
          />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps)(Room);
