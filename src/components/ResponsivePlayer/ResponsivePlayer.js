import React, { useState } from "react";
import ReactPlayer from "react-player";
import io from "socket.io-client";
//import ReactPlayer from 'react-player/youtube';
import "./ResponsivePlayer.css";

const ENDPOINT = "localhost:5000";
const socket = io(ENDPOINT);

const ResponsivePlayer = ({ url, room, videoPlaying }) => {
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoStart, setVideoStart] = useState(0);

  const handlePause = () => {
    //this.setState({ playing: false });
    socket.emit("pause", room);
  };
  const handlePlay = () => {
    //this.setState({ playing: false });
    socket.emit("play", room);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    console.log(played);
    setVideoStart(100);
  };

  const handleDuration = (duration1) => {
    console.log(duration1);
    setDuration(duration1);
    console.log(duration);
  };

  return (
    <div>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          playing={videoPlaying}
          onPause={handlePause.bind(this)}
          onPlay={handlePlay.bind(this)}
          controls={true}
          onDuration={handleDuration}
        />
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          //value={played}
          //onMouseDown={this.handleSeekMouseDown}
          onChange={handleSeekChange}
          //onMouseUp={this.handleSeekMouseUp}
        />
      </div>
    </div>
  );
};
export default ResponsivePlayer;

// class ResponsivePlayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playing: false,
//       room: props.room,
//     };
//     //const url = props.url;
//     // socket.on("pauseVideo", (data) => {
//     //   console.log("recieved broacast to pause video");
//     //   this.setState({ playing: false });
//     // });
//     // socket.on("playVideo", (data) => {
//     //   console.log("recieved broacast to play video");
//     //   this.setState({ playing: true });
//     // });
//   }

//   handlePause() {
//     this.setState({ playing: false });
//     socket.emit("pause", this.state.room);
//   }

//   handlePlay() {
//     this.setState({ playing: true });
//     console.log("video play");
//     socket.emit("play", this.state.room);
//   }
//   render() {
//     return (
//       <div className="player-wrapper">
//         <ReactPlayer
//           className="react-player"
//           url={this.props.url}
//           width="100%"
//           height="100%"
//           playing={this.state.playing}
//           onPause={this.handlePause.bind(this)}
//           onPlay={this.handlePlay.bind(this)}
//         />
//       </div>
//     );
//   }
// }

// export default ResponsivePlayer;
