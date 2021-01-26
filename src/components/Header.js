import React from "react";
import { Box, Heading, Spacer, Button } from "@chakra-ui/react";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { IconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    history.push("/login");
  };

  const goToHome = () => {
    history.push("/home");
  };

  return (
    <Box d="flex" alignItems="center">
      <IconButton className={classes.root} onClick={goToHome}>
        <YouTubeIcon style={{ fontSize: 100, color: "#FF0000" }} />
      </IconButton>
      <Heading>Youtube Sync</Heading>
      <Spacer />
      <Button onClick={handleLogout} mr="20px">
        Log Out
      </Button>
    </Box>
  );
}
