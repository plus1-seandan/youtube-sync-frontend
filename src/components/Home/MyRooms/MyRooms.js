import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRooms } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const MyRooms = () => {
  const classes = useStyles();
  const history = useHistory();
  const currUser = useSelector((state) => state.currUserInfo);
  const myRooms = useSelector((state) => state.myRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-myRooms", {
        params: {
          userId: currUser.id,
        },
      })
      .then(function (response) {
        dispatch(getMyRooms(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  });

  const handleClick = (room) => {
    function inner(e) {
      // const { name } = room;
      console.log(currUser.email, room.name);
      history.push({
        pathname: `/room`,
        state: {
          email: currUser.email,
          room: room.name,
          roomId: room.id,
        },
      });
    }
    return inner;
  };

  return (
    <div>
      <h1>My Rooms</h1>
      <div>
        {myRooms && !!myRooms.length > 0 && (
          <div>
            <List>
              {myRooms.map((room) => (
                <ListItem
                  className={classes.item}
                  button
                  key={room.id}
                  value="testRoomId"
                  onClick={handleClick(room)}
                >
                  {room.name}
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;
