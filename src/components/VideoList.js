import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {
  GridItem,
  Grid,
  Box,
  Wrap,
  WrapItem,
  Text,
  Image,
  Badge,
  Spacer,
  Button,
  VStack,
} from "@chakra-ui/react";

const Video = ({ video, selectVideo }) => {
  return (
    <Box
      d="flex"
      flexDirection="column"
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Image
        objectFit="cover"
        src={video.snippet.thumbnails.medium.url}
        alt="Could not load image"
      />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {video.snippet.title}
      </Box>
      <Box justifyContent="flex-end" pt="20px">
        <Button
          onClick={() => {
            selectVideo(video.id.videoId);
          }}
        >
          Watch
        </Button>
      </Box>
    </Box>
  );
};

const VideoList = ({ videos, selectVideo }) => {
  console.log({ videos });
  return (
    <Box
      overflowY="scroll"
      h="100%"
      d="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <VStack spacing={4}>
        {videos.map((video) => (
          <Video
            video={video}
            selectVideo={selectVideo}
            key={video.id.videoId}
          />
        ))}
      </VStack>
    </Box>
  );
};
export default VideoList;
