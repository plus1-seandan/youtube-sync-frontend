import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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

const RoomMembers = (prop) => {
  const classes = useStyles();
  const roomMembers = prop.roomMembers;

  return (
    <div>
      <List>
        {roomMembers.map((member) => (
          <ListItem className={classes.item} button key={member.id}>
            {member.email}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoomMembers;
