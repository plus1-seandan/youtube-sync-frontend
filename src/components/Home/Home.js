import React, { useState, useEffect } from "react";
import CreateRoom from "./CreateRoom/CreateRoom";
import MyRooms from "./MyRooms/MyRooms";
import MyFriends from "./MyFriends/MyFriends";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SearchUsers from "../Search/SearchUsers/SearchUsers";

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

const Home = () => {
  const currUser = useSelector((state) => state.currUserInfo);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Header />
        </Grid>
        <Grid container space={3} direction="column" xs={3}>
          <Grid item xs={9}>
            <MyRooms />
          </Grid>
          <Grid item xs={6}>
            <MyFriends />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CreateRoom />
        </Grid>
        <Grid item xs={3}>
          <SearchUsers />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
