import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Video from "./Video/Video";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

// const Video = (props) => {
//   const ref = useRef();

//   useEffect(() => {
//     props.peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, []);

//   return <StyledVideo playsInline autoPlay ref={ref} />;
// };

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const ENDPOINT = "localhost:5000";

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  //   const peersRef = useRef([]);
  const roomID = props.roomId;

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peersList = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            // peersRef.current.push({
            //   peerID: userID,
            //   peer,
            // });
            peersList.push(peer);
          });
          setPeers(peers);
          console.log(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          //   peersRef.current.push({
          //     peerID: payload.callerID,
          //     peer,
          //   });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          //   const item = peersRef.current.find((p) => p.peerID === payload.id);
          const item = peers.find((p) => p.peerID === payload.id);

          item.peer.signal(payload.signal);
        });
      });

    socketRef.current.on("user left", (peerID) => {
      console.log("trigger to remove peer");
      console.log(peerID);
      //   console.log(peersRef.current);
      const newPeersList = peers.filter((peer) => peer.peerID !== peerID);
      setPeers(newPeersList);
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </Container>
  );
};

export default Room;
