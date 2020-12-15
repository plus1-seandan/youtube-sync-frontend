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
import { clearSearch } from "../../../../actions";
import User from "./User/User";

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

const UserList = ({ users, handler }) => {
  const classes = useStyles();
  const currUser = useSelector((state) => state.currUserInfo);

  return (
    <div>
      <List>
        {users.map((user) => (
          <User user={user} />
        ))}
      </List>
    </div>
  );
};

export default UserList;
