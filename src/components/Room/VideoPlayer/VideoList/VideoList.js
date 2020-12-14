import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1500,
    height: 1000,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const VideoList = ({ videos, handleVideoSelect }) => {
  const classes = useStyles();

  if (videos) {
    return (
      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        {videos.map((video) => (
          <GridListTile
            key={video.id.videoId}
            cols={video.cols || 1}
            onClick={() => handleVideoSelect(video)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.description}
            />
            <GridListTileBar
              title={video.snippet.title}
              subtitle={<span>{video.snippet.description}</span>}
              // actionIcon={
              //   <IconButton
              //     aria-label={`info about ${tile.title}`}
              //     className={classes.icon}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              //}
            />
          </GridListTile>
        ))}
      </GridList>
    );
    //const renderedVideos = videos.map((video) => {
    //   return (
    //     <VideoItem
    //       key={video.id.videoId}
    //       video={video}
    //       handleVideoSelect={handleVideoSelect}
    //     />
    //   );
    // });
    // return <div className="ui relaxed divided list">{renderedVideos}</div>;
  }
  return <p>search videos</p>;
};
export default VideoList;
