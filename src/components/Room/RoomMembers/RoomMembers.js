import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector, useDispatch, connect } from "react-redux";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";

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

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    roomMembers: state["roomMembers"][ownProps.roomId],
  };
};

const RoomMembers = (prop) => {
  const classes = useStyles();
  // const roomMembers = prop.roomMembers;

  return (
    <div>
      <List>
        <div>Room Members</div>
        {prop.roomMembers.map((member) => (
          <ListItem className={classes.item} button key={member.id}>
            <ListItemText
              id={member.id}
              primary={
                <p>
                  {member.firstName} {member.lastName} User: {member.email}
                </p>
              }
            />
            <ListItemSecondaryAction>
              {/* <IconButton aria-label="myRoom">
                <ArrowForwardIcon />
              </IconButton> */}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default connect(mapStateToProps)(RoomMembers);
