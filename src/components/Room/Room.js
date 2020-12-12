import React, { useState, useEffect } from "react";
// import queryString from "query-string";
import io from "socket.io-client";
import VideoPlayer from "./VideoPlayer/VideoPlayer.js";
import Chat from "../Chat/Chat.js";
import SearchBar from "../Searchbar/Searchbar";
import youtube from "../../apis/youtube";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RoomMembers from "./RoomMembers/RoomMembers";
import MyFriendsRoom from "./MyFriendsRoom/MyFriendsRoom";
import axios from "axios";
import Header from "../Header/Header";
import { useSelector, useDispatch, connect } from "react-redux";
import { getRoomMembers } from "../../actions";

// let socket;
// const ENDPOINT = "localhost:5000";

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
  console.log(ownProps);
  return {
    thisRoom: state["myRooms"][ownProps.location.state.roomId],
  };
};

const Room = (props) => {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  // const [roomMembers, setRoomMembers] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-roomMembers", {
        params: {
          roomId: props.thisRoom.room.id,
        },
      })
      .then(function (response) {
        const roomId = props.thisRoom.room.id;
        const roomMembersArr = response.data;
        console.log(roomMembersArr);
        dispatch(getRoomMembers(roomId, roomMembersArr));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // socket = io(ENDPOINT);
    // //i join the room
    // socket.emit("join-room");
    // socket.on("all users", (users) => {
    //   console.log(users);
    //   //get back all the users in the room already besides yourself.
    //   //right now you don't have any peers. so lets set it up
    //   // const peers = [];
    //   users.forEach((userId) => {
    //     const peer = createPeer(userId, socket.id, "hello"); //sends other user id, my own user id, and some data
    //     peersRef.current.push({
    //       peerId: userId, //not ours
    //       peer,
    //     });
    //   });
    // });
    // socket.on("user joined", (payload) => {
    //   console.log(payload.message);
    //   const peer = addPeer(
    //     payload.signal,
    //     payload.callerId,
    //     "thanks for welcoming me"
    //   );
    //   peersRef.current.push({
    //     peerId: payload.callerId, //not ours
    //     peer,
    //   });
    // });
  }, []);

  // useEffect(() => {
  //   console.log("message recieved to change video");
  //   socket.on("changeVideo", (video) => {
  //     setSelectedVideo(video);
  //   });

  //   socket.on("pauseVideo", (data) => {
  //     console.log("recieved broacast to pause video");
  //     setVideoPlaying(false);
  //   });
  //   socket.on("playVideo", (data) => {
  //     console.log("recieved broacast to play video");
  //     setVideoPlaying(true);
  //   });
  //   socket.on("seekVideo", (data) => {
  //     console.log("recieved broacast to seek video");
  //     setSeek(data);
  //   });
  // }, [selectedVideo]);

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });

  //   socket.on("welcomeMessage", (message) => {
  //     setMessages([...messages, message]);
  //   });

  //   socket.on("joinMessage", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // const sendMessage = (event) => {
  //   event.preventDefault(); //prevent whole page refresh on change

  //   if (message) {
  //     socket.emit("sendMessage", message, () => setMessage(""));
  //   }
  // };

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });
    setVideos(response.data.items);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    // socket.emit("change", { video: video, roomId: roomId });
  };

  // const handleCallback = async (friend) => {
  //   const userId = friend.id;
  //   const roomId = props.thisRoom.room.id;
  //   const response = await axios.post("http://localhost:5001/add-member", {
  //     userId,
  //     roomId,
  //   });
  //   // const newArr = roomMembers.slice();
  //   // newArr.push(friend);
  //   // setRoomMembers(newArr);
  // };

  const classes = useStyles();

  if (isLoading) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Header />
      <h1>Welcome to room {props.thisRoom.room.name}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RoomMembers roomId={props.thisRoom.room.id} />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={6}>
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
