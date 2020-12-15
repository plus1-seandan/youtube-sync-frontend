import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyFriends, removeFriend } from "../../../actions";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import CancelIcon from "@material-ui/icons/Cancel";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

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
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const MyFriends = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUserInfo);

  // const [myFriends, setMyFriends] = useState([]);
  const myFriends = useSelector((state) => state.myFriends);

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-myFriends", {
        params: {
          userId: currUser.id,
        },
      })
      .then(function (response) {
        dispatch(getMyFriends(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const handleClick = (friend) => {
    // , { data: { friend: friend, user: currUser } }
    axios
      .delete(`http://localhost:5001/accounts/delete-friend/`, {
        params: {
          friendId: friend.id,
          userId: currUser.id,
        },
      })
      .then((res) => {
        dispatch(removeFriend(friend));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>My Friends</h1>
      <div>
        {myFriends && !!myFriends.length > 0 && (
          <div>
            <List>
              {myFriends.map((friend) => (
                <ListItem className={classes.item} button key={friend.id}>
                  <Avatar className={classes.purple}>
                    {friend.firstName.charAt(0)}
                    {friend.lastName.charAt(0)}
                  </Avatar>
                  <Typography>{friend.email}</Typography>
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="removeFriend"
                      onClick={() => {
                        handleClick(friend);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
