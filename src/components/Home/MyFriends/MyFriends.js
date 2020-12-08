import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";

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

const MyFriends = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const [myFriends, setMyFriends] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-myFriends", {
        params: {
          userId: user.id,
        },
      })
      .then(function (response) {
        setMyFriends(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [user]);

  return (
    <div>
      <h1>My Friends</h1>
      <div>
        {myFriends && !!myFriends.length > 0 && (
          <div>
            <List>
              {myFriends.map((friend) => (
                <ListItem className={classes.item} button key={friend}>
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
