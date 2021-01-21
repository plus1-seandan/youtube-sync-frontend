import React from "react";

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
      border="solid"
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
