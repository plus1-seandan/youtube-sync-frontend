import React, { useSelector } from "react";
import { GridItem, Grid, Box, Heading, Spacer, Button } from "@chakra-ui/react";
import YouTubeIcon from "@material-ui/icons/YouTube";

export default function Header() {
  return (
    <Box d="flex" alignItems="center">
      <YouTubeIcon style={{ fontSize: 100, color: "#FF0000" }} />
      <Heading>Youtube Sync</Heading>
      <Spacer />
      <Button>Log Out</Button>
      <Button>My Profile</Button>
    </Box>
  );
}
