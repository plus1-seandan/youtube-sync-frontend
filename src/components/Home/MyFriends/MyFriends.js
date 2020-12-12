import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyFriends } from "../../../actions";
import ListItem from "@material-ui/core/ListItem";

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
  });

  return (
    <div>
      <h1>My Friends</h1>
      <div>
        {myFriends && !!myFriends.length > 0 && (
          <div>
            <List>
              {myFriends.map((friend) => (
                <ListItem className={classes.item} button key={friend.id}>
                  {friend.email}
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
