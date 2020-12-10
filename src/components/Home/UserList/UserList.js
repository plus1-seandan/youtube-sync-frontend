import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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

const UserList = ({ users }) => {
  const classes = useStyles();
  const currUser = useSelector((state) => state.currUserInfo);

  const handleClick = (user) => {
    const currUserId = currUser.id;
    const userId = user.id;
    axios
      .post("http://localhost:5001/add-friend", { currUserId, userId })
      .then(function (response) {
        if (response.data === "success") {
          alert(user.email + " has been added as a friend");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <List>
        {users.map((user) => (
          <ListItem className={classes.item} button key={user.id}>
            <ListItemText id={user.id} primary={user.email} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="addFriend"
                onClick={() => {
                  handleClick(user);
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
