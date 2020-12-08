import React, { useState, useEffect, useImperativeHandle } from "react";
// import queryString from "query-string";
import io from "socket.io-client";
import VideoPlayer from "../VideoPlayer/VideoPlayer.js";
import Chat from "../Chat/Chat.js";
import SearchBar from "../Searchbar/Searchbar";
import youtube from "../../apis/youtube";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RoomMembers from "./RoomMembers/RoomMembers";

let socket;
const ENDPOINT = "localhost:5000";

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

const Room = (props) => {
  const [name, setName] = useState(props.location.state.email);
  const [room, setRoom] = useState(props.location.state.room);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [seek, setSeek] = useState(0);

  useEffect(() => {
    // console.log(queryString.parse(location.search));
    // const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(props.location.state.email);
    setRoom(props.location.state.room);
    console.log(name, room);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnnect");
      socket.off();
      console.log("user has left");
    };
  }, [name, room]);

  useEffect(() => {
    console.log("message recieved to change video");
    socket.on("changeVideo", (video) => {
      setSelectedVideo(video);
    });

    //const url = props.url;
    socket.on("pauseVideo", (data) => {
      console.log("recieved broacast to pause video");
      setVideoPlaying(false);
    });
    socket.on("playVideo", (data) => {
      console.log("recieved broacast to play video");
      setVideoPlaying(true);
    });
    socket.on("seekVideo", (data) => {
      console.log("recieved broacast to seek video");
      setSeek(data);
    });
  }, [selectedVideo]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("welcomeMessage", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("joinMessage", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault(); //prevent whole page refresh on change

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const handleSubmit = async (termFromSearchBar) => {
    console.log(termFromSearchBar);
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });
    setVideos(response.data.items);
    console.log(videos);
  };

  const handleVideoSelect = (video) => {
    console.log("triggered video select");
    console.log(video);
    setSelectedVideo(video);
    socket.emit("change", { video: video, room: room });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RoomMembers roomId={props.location.state.roomId} />
        </Grid>
        <Grid item xs={12}>
          <SearchBar handleFormSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={6}>
          <VideoPlayer
            name={name}
            room={room}
            selectedVideo={selectedVideo}
            videos={videos}
            videoPlaying={videoPlaying}
            seek={seek}
            handleVideoSelect={handleVideoSelect}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={6}>
          <Chat
            name={name}
            room={room}
            messages={messages}
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
            setMessages={setMessages}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
