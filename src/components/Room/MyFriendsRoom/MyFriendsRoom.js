import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { getMyFriends, addRoomMember } from "../../../actions";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Alert from "@material-ui/lab/Alert";

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

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    roomMembers: state["roomMembers"][ownProps.roomId],
  };
};

const MyFriendsRoom = (prop) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUserInfo);
  const myFriends = useSelector((state) => state.myFriends);
  const [error, setError] = useState("");

  useEffect(() => {
    // axios
    //   .get("http://localhost:5001/search-myFriends", {
    //     params: {
    //       userId: currUser.id,
    //     },
    //   })
    //   .then(function (response) {
    //     dispatch(getMyFriends(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  //   const handleClick = (friend) => {
  //     // const userId = friend.id;
  //     // const roomId = state.roomId;
  //     // axios
  //     //   .post("http://localhost:5001/add-member", {
  //     //     userId,
  //     //     roomId,
  //     //   })
  //     //   .then(function (response) {
  //     //       console.log(response.data);
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.log(error);
  //     //   });
  //   };

  const addMember = (friend) => {
    const userId = friend.id;
    const roomId = prop.roomId;

    //check if already a member.
    console.log(prop.roomMembers);
    const searchExistingMember = prop.roomMembers.find(
      (member) => member.id === userId
    );
    if (searchExistingMember !== undefined) {
      console.log("friend already added to room");
      setError("friend already added to room");
      return;
    } else {
      setError("");
    }
    axios
      .post("http://localhost:5001/rooms/add-member", {
        userId,
        roomId,
      })
      .then(function (response) {
        dispatch(addRoomMember(prop.roomId, friend));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add My Friends</h1>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <div>
        {myFriends && !!myFriends.length > 0 && (
          <div>
            <List>
              {myFriends.map((friend) => (
                <ListItem className={classes.item} button key={friend.id}>
                  <ListItemText
                    id={friend.id}
                    primary={
                      <p>
                        First: {friend.firstName} Last: {friend.lastName} User:{" "}
                        {friend.email}
                      </p>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="addFriend"
                      onClick={() => {
                        addMember(friend);
                      }}
                    >
                      <AddIcon />
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

export default connect(mapStateToProps)(MyFriendsRoom);
