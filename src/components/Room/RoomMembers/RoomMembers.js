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
  console.log(prop.roomId);
  const classes = useStyles();
  const [roomMembers, setRoomMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-roomMembers", {
        params: {
          roomId: prop.roomId,
        },
      })
      .then(function (response) {
        console.log("response received");
        console.log(response.data);
        setRoomMembers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [prop.roomId]);
  return (
    <div>
      <List>
        {roomMembers.map((member) => (
          <ListItem className={classes.item} button key={member}>
            {member.email}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoomMembers;
