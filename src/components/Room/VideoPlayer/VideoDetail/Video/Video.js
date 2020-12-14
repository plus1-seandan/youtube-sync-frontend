import React, {
  Component,
  useEffect,
  useState,
  useRef,
  createRef,
} from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import socket from "../../../../../socket";
import { useSelector, useDispatch, connect } from "react-redux";
import "./reset.css";
import "./defaults.css";
import "./range.css";
import "./App.css";
import { togglePlay, setPlayed } from "../../../../../actions";

import ReactPlayer from "react-player";
import Duration from "./Duration";

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const video = state["videos"][ownProps.roomId];
  console.log(video);
  return {
    video: video,
  };
};

const Video = (props) => {
  var pip = false;
  var light = false;
  var volume = 0.8;
  var muted = false;
  // var played = 0;
  var loaded = 0;
  var duration = 0;
  var playbackRate = 1.0;
  var loop = false;
  var seek = 0;

  // const [seeking, setSeeking] = useState(false);
  // const [played, setPlayed] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  const refPlayer = useRef();
  const dispatch = useDispatch();

  console.log(props);

  const handlePlay = () => {
    // setIsPlaying(true);
    socket.emit("video-play", {
      roomId: props.roomId,
    });
  };
  const handlePause = () => {
    // setIsPlaying(false);
    socket.emit("video-pause", {
      roomId: props.roomId,
    });
  };

  useEffect(() => {
    socket.on("video-play", (payload) => {
      dispatch(togglePlay(props.roomId, true));
    });
    socket.on("video-pause", (payload) => {
      dispatch(togglePlay(props.roomId, false));
    });
    socket.on("seek-video", (payload) => {
      console.log(payload);
      dispatch(setPlayed(props.roomId, payload));
      // setPlayed(parseFloat(payload));
      refPlayer.current.player.seekTo(parseFloat(payload));
    });
  }, [props.video]);

  const handleSeekMouseDown = (e) => {
    console.log("handleSeekMouseDown");
    // setSeeking(true);
  };

  const handleSeekChange = (e) => {
    console.log("handleSeekChange");
    dispatch(setPlayed(props.roomId, e.target.value));
    // setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    console.log("handleSeekMouseUp");

    // setSeeking(false);
    refPlayer.current.player.seekTo(parseFloat(e.target.value));
    socket.emit("seek-video", {
      roomId: props.roomId,
      seek: e.target.value,
    });
  };

  if (props.video.hasOwnProperty("videoInfo")) {
    return (
      <div className="app">
        <section className="section">
          <div className="player-wrapper">
            <ReactPlayer
              ref={refPlayer}
              className="react-player"
              width="100%"
              height="100%"
              url={`https://www.youtube.com/embed/${props.video.videoInfo.id.videoId}}`}
              // pip={pip}
              playing={props.video.isPlaying}
              controls={false}
              // light={light}
              // loop={loop}
              // playbackRate={playbackRate}
              // volume={volume}
              // muted={muted}
              // onReady={() => console.log("onReady")}
              // onStart={() => console.log("onStart")}
              onPlay={handlePlay}
              // onEnablePIP={this.handleEnablePIP}
              // onDisablePIP={this.handleDisablePIP}
              onPause={handlePause}
              // onBuffer={() => console.log("onBuffer")}
              // onSeek={(e) => console.log("onSeek", e)}
              // onEnded={this.handleEnded}
              // onError={(e) => console.log("onError", e)}
              // onProgress={this.handleProgress}
              // onDuration={this.handleDuration}
            />
          </div>

          <table>
            <tbody>
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={props.video.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td>
                  <progress max={1} value={props.video.played} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Search videos...</h1>
        <br></br>
      </div>
    );
  }
};

export default connect(mapStateToProps)(hot(module)(Video));

// class Video extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       url: props.video.videoInfo.id.videoId,
//       pip: false,
//       playing: props.videoPlaying,
//       controls: true,
//       light: false,
//       volume: 0.8,
//       muted: false,
//       played: 0,
//       loaded: 0,
//       duration: 0,
//       playbackRate: 1.0,
//       loop: false,
//       seek: props.seek,
//     };
//     console.log(this.state);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.url !== this.props.url) {
//       this.setState({
//         url: this.props.url,
//       });
//     }
//     if (prevProps.seek !== this.props.seek) {
//       this.player.seekTo(parseFloat(this.props.seek));
//     }
//     if (prevProps.videoPlaying !== this.props.videoPlaying) {
//       this.setState({
//         playing: this.props.videoPlaying,
//       });
//     }
//   }

//   load = (url) => {
//     this.setState({
//       url,
//       played: 0,
//       loaded: 0,
//       pip: false,
//     });
//   };

//   handlePlayPause = () => {
//     this.setState({ playing: !this.state.playing });
//   };

//   handleToggleLoop = () => {
//     this.setState({ loop: !this.state.loop });
//   };

//   handleVolumeChange = (e) => {
//     this.setState({ volume: parseFloat(e.target.value) });
//   };

//   handleTogglePIP = () => {
//     this.setState({ pip: !this.state.pip });
//   };

//   handlePlay = () => {
//     console.log("onPlay");
//     this.setState({ playing: true });
//     socket.emit("play", this.state.roomId);
//   };

//   handleEnablePIP = () => {
//     console.log("onEnablePIP");
//     this.setState({ pip: true });
//   };

//   handleDisablePIP = () => {
//     console.log("onDisablePIP");
//     this.setState({ pip: false });
//   };

//   handlePause = () => {
//     console.log("onPause");
//     this.setState({ playing: false });
//     socket.emit("pause", this.state.roomId);
//   };

//   handleSeekMouseDown = (e) => {
//     console.log("handleSeekMouseDown");
//     this.setState({ seeking: true });
//   };

//   handleSeekChange = (e) => {
//     console.log("handleSeekChange");

//     this.setState({ played: parseFloat(e.target.value) });
//   };

//   handleSeekMouseUp = (e) => {
//     console.log("handleSeekMouseUp");

//     this.setState({ seeking: false });
//     this.player.seekTo(parseFloat(e.target.value));
//     socket.emit("seek", {
//       roomId: this.state.roomId,
//       seek: e.target.value,
//     });
//   };

//   handleProgress = (state) => {
//     //console.log("onProgress", state);
//     // We only want to update time slider if we are not currently seeking
//     if (!this.state.seeking) {
//       this.setState(state);
//     }
//   };

//   handleEnded = () => {
//     console.log("onEnded");
//     this.setState({ playing: this.state.loop });
//   };

//   handleDuration = (duration) => {
//     console.log("onDuration", duration);
//     this.setState({ duration });
//   };

//   // handleClickFullscreen = () => {
//   //   screenfull.request(findDOMNode(this.player));
//   // };

//   renderLoadButton = (url, label) => {
//     return <button onClick={() => this.load(url)}>{label}</button>;
//   };

//   ref = (player) => {
//     this.player = player;
//   };

//   render() {
//     const {
//       url,
//       playing,
//       controls,
//       light,
//       volume,
//       muted,
//       loop,
//       played,
//       loaded,
//       duration,
//       playbackRate,
//       pip,
//     } = this.state;
//     const SEPARATOR = " · ";

//     return (
//       <div className="app">
//         <section className="section">
//           <h1>ReactPlayer Demo</h1>
//           <div className="player-wrapper">
//             <ReactPlayer
//               ref={this.ref}
//               className="react-player"
//               width="100%"
//               height="100%"
//               url={this.state.url}
//               pip={pip}
//               playing={playing}
//               controls={false}
//               light={light}
//               loop={loop}
//               playbackRate={playbackRate}
//               volume={volume}
//               muted={muted}
//               onReady={() => console.log("onReady")}
//               onStart={() => console.log("onStart")}
//               onPlay={this.handlePlay}
//               onEnablePIP={this.handleEnablePIP}
//               onDisablePIP={this.handleDisablePIP}
//               onPause={this.handlePause}
//               onBuffer={() => console.log("onBuffer")}
//               onSeek={(e) => console.log("onSeek", e)}
//               onEnded={this.handleEnded}
//               onError={(e) => console.log("onError", e)}
//               onProgress={this.handleProgress}
//               onDuration={this.handleDuration}
//             />
//           </div>

//           <table>
//             <tbody>
//               <tr>
//                 <th>Controls</th>
//                 <td>
//                   <button onClick={this.handlePlayPause}>
//                     {playing ? "Pause" : "Play"}
//                   </button>
//                   <button onClick={this.handleClickFullscreen}>
//                     Fullscreen
//                   </button>
//                   {light && (
//                     <button onClick={() => this.player.showPreview()}>
//                       Show preview
//                     </button>
//                   )}
//                   {ReactPlayer.canEnablePIP(url) && (
//                     <button onClick={this.handleTogglePIP}>
//                       {pip ? "Disable PiP" : "Enable PiP"}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//               <tr>
//                 <th>Seek</th>
//                 <td>
//                   <input
//                     type="range"
//                     min={0}
//                     max={0.999999}
//                     step="any"
//                     value={played}
//                     onMouseDown={this.handleSeekMouseDown}
//                     onChange={this.handleSeekChange}
//                     onMouseUp={this.handleSeekMouseUp}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th>Volume</th>
//                 <td>
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step="any"
//                     value={volume}
//                     onChange={this.handleVolumeChange}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th>Played</th>
//                 <td>
//                   <progress max={1} value={played} />
//                 </td>
//               </tr>
//               <tr>
//                 <th>Loaded</th>
//                 <td>
//                   <progress max={1} value={loaded} />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//         <section className="section">
//           <h2>State</h2>
//           <table>
//             <tbody>
//               <tr>
//                 <th>url</th>
//                 <td className={!url ? "faded" : ""}>
//                   {(url instanceof Array ? "Multiple" : url) || "null"}
//                 </td>
//               </tr>
//               <tr>
//                 <th>playing</th>
//                 <td>{playing ? "true" : "false"}</td>
//               </tr>
//               <tr>
//                 <th>volume</th>
//                 <td>{volume.toFixed(3)}</td>
//               </tr>
//               <tr>
//                 <th>played</th>
//                 <td>{played.toFixed(3)}</td>
//               </tr>
//               <tr>
//                 <th>loaded</th>
//                 <td>{loaded.toFixed(3)}</td>
//               </tr>
//               <tr>
//                 <th>duration</th>
//                 <td>
//                   <Duration seconds={duration} />
//                 </td>
//               </tr>
//               <tr>
//                 <th>elapsed</th>
//                 <td>
//                   <Duration seconds={duration * played} />
//                 </td>
//               </tr>
//               <tr>
//                 <th>remaining</th>
//                 <td>
//                   <Duration seconds={duration * (1 - played)} />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(hot(module)(Video));
