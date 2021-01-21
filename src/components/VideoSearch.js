import React, { useState } from "react";
import { Box, Button, VStack, Heading, Text, Input } from "@chakra-ui/react";

const VideoSearch = ({ searchVideos }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box>
      <Box>
        <Text mb="8px">Search for videos here</Text>
      </Box>
      <Box d="flex">
        <Input
          value={query}
          onChange={handleChange}
          placeholder="Funny Cat Videos"
          size="m"
        />
        <Button onClick={() => searchVideos(query)}>Search</Button>
      </Box>
    </Box>
  );
};

export default VideoSearch;
