import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { setPlayed } from "../../../../actions";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import { getMyRooms, removeRoom } from "../../../../actions";

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

const MyRoom = (props) => {
  const classes = useStyles();
  const currUser = useSelector((state) => state.currUserInfo);
  const [pwdInputs, setPwdInputs] = useState();
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const myRooms = useSelector((state) => state.myRooms);

  const handleOnChange = (e) => {
    console.log(e);
    setPwdInputs(e.target.value);
  };

  const handleClick = (room) => {
    function inner(e) {
      console.log(room);
      if (room.isPrivate) {
        if (pwdInputs !== room.password) {
          setError("Incorrect Password");
          return;
        }
      }
      history.push({
        pathname: `/room`,
        state: {
          roomId: room.id,
        },
      });
    }
    return inner;
  };
  const handleRemoveRoom = (room) => {
    console.log(room);
    axios
      .delete(`http://localhost:5001/rooms/delete-room/`, {
        params: {
          roomId: room.id,
          userId: currUser.id,
        },
      })
      .then((res) => {
        console.log("dispatch delete room");
        dispatch(removeRoom(room));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ListItem className={classes.item} button>
        <ListItemText
          id={props.room.id}
          name="room"
          primary={
            <p>
              {props.room.name} {props.room.private ? "Private" : "Public"}
            </p>
          }
        />
        {props.room.private ? (
          <TextField
            id="standard-basic"
            label="Password"
            name="password"
            roomId={props.room.id}
            onChange={handleOnChange}
          />
        ) : null}
        <ListItemSecondaryAction>
          <IconButton aria-label="myRoom" onClick={handleClick(props.room)}>
            <ArrowForwardIcon />
          </IconButton>
          <IconButton
            aria-label="removeFriend"
            onClick={() => {
              handleRemoveRoom(props.room);
            }}
          >
            <CancelIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {error ? <Alert severity="error">{error}</Alert> : null}
    </div>
  );
};

export default MyRoom;
