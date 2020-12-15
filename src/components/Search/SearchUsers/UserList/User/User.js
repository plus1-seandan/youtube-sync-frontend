import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import { addFriend } from "../../../../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
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

const User = (props) => {
  const classes = useStyles();
  const currUser = useSelector((state) => state.currUserInfo);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    const currUserId = currUser.id;
    const userId = props.user.id;
    axios
      .post("http://localhost:5001/accounts/add-friend", { currUserId, userId })
      .then(function (response) {
        if (response.data === "Success") {
          // alert(user.email + " has been added as a friend");
          // user.isFriend = true;
          dispatch(addFriend(props.user));
          setClicked(true);
          // setSearchedUsers({ ...searchedUsers, [user.id]: user });
          // setSearchedUsers({ ...searchedUsers, [user.id]: userId });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <ListItem className={classes.item} button key={props.user.id}>
        <Avatar className={classes.purple}>
          {props.user.firstName.charAt(0)}
          {props.user.lastName.charAt(0)}
        </Avatar>
        <ListItemText
          id={props.user.id}
          primary={<Typography>{props.user.email}</Typography>}
        />
        {clicked || props.user["Friends.RequesteeId"] != null ? (
          <IconButton>
            <CheckIcon />
          </IconButton>
        ) : (
          [
            props.user.id === currUser.id ? null : (
              <ListItemSecondaryAction>
                <IconButton aria-label="addFriend" onClick={handleClick}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            ),
          ]
        )}
      </ListItem>
    </div>
  );
};

export default User;
