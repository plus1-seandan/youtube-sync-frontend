import React from "react";
import ReactPlayer from "react-player/youtube";
import io from "socket.io-client";
import ResponsivePlayer from "../ResponsivePlayer/ResponsivePlayer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TestPlayer from "../TestPlayer/TestPlayer";

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

const VideoDetail = ({ video, room, videoPlaying, seek }) => {
  const videoId = video ? video.id.videoId : "";
  console.log(videoPlaying);
  const classes = useStyles();

  if (videoId) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <TestPlayer
            url={`https://www.youtube.com/embed/${videoId}`}
            videoPlaying={videoPlaying}
            room={room}
            seek={seek}
          />
          {/* <Grid item xs={12}>
            <ResponsivePlayer
              url={`https://www.youtube.com/embed/${videoId}`}
              room={room}
              videoPlaying={videoPlaying}
            /> */}
        </Grid>
      </div>
      // <div>
      //   <div className="ui embed">
      //     <ResponsivePlayer
      //       url={`https://www.youtube.com/embed/${videoId}`}
      //       room={room}
      //       videoPlaying={videoPlaying}
      //     />
      //   </div>
      //   <div className="ui segment"></div>
      // </div>
    );
  }
  return (
    <div>
      <h1>Enter search keyword to load...</h1>
      <br></br>
      <p style={{ fontSize: "25px" }}>
        Use the API to search for videos matching specific search terms, topics,
        locations, publication dates, and much more. The APIs search.list method
        also supports searches for playlists and channels. With the YouTube Data
        API, you can add a variety of YouTube features to your application. Use
        the API to upload videos, manage playlists and subscriptions, update
        channel settings, and more.
      </p>
    </div>
  );
};
export default VideoDetail;

// class VideoDetail extends React.Component {
//   render() {
//     const videoId = this.props.video ? this.props.video.id.videoId : "";
//     if (videoId) {
//       //console.log(videoId)
//       return (
//         <div>
//           <div className="ui embed">
//             <ResponsivePlayer
//               url={`https://www.youtube.com/embed/${videoId}`}
//             />
//           </div>
//           <div className="ui segment"></div>
//         </div>
//       );
//     }
//     return (
//       <div>
//         <h1>Enter search keyword to load...</h1>
//         <br></br>
//         <p style={{ fontSize: "25px" }}>
//           Use the API to search for videos matching specific search terms,
//           topics, locations, publication dates, and much more. The APIs
//           search.list method also supports searches for playlists and channels.
//           With the YouTube Data API, you can add a variety of YouTube features
//           to your application. Use the API to upload videos, manage playlists
//           and subscriptions, update channel settings, and more.
//         </p>
//       </div>
//     );
//   }
//   /*
// const VideoDetail = ({ video }) => {
//   if (!video) {
//     return <div>
//        <h1>Enter search keyword to load...</h1>
//        <br></br>
//        <p style={{fontSize:'25px'}}>
//        Use the API to search for videos matching specific search terms, topics, locations, publication dates, and much more. The APIs search.list method also supports searches for playlists and channels.

//        With the YouTube Data API, you can add a variety of YouTube features to your application. Use the API to upload videos, manage playlists and subscriptions, update channel settings, and more.

//        </p>
//     </div>;
//   }

//   const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
//   console.log(typeof video);
//   return (
//     <div>
//       <div className="ui embed">
//         <iframe src={videoSrc} allowFullScreen title="Video player" />
//       </div>
//       <div className="ui segment">
//         <h4 className="ui header">{video.snippet.title}</h4>
//         <p>{video.snippet.description}</p>
//       </div>
//     </div>
//   );
//   */
// }
