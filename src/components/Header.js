import React, { useSelector } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { clearState } from "../actions";
import { useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import { GridItem, Grid, Box, Heading, Spacer, Button } from "@chakra-ui/react";
import YouTubeIcon from "@material-ui/icons/YouTube";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

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
