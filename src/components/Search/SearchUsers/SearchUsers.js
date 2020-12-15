import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import UserList from "./UserList/UserList";
import {
  setSearchedUsers,
  updateSearchedUsers,
  clearSearch,
  addFriend,
} from "../../../actions";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

const SearchUsers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  // const [searchedUsers, setSearchedUsers] = useState([]);
  const currUser = useSelector((state) => state.currUserInfo);
  const searchedUsers = useSelector((state) => state.searchedUsers);

  useEffect(() => {
    console.log("cleared");
    dispatch(clearSearch());
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (user) => {
    const currUserId = currUser.id;
    const userId = user.id;
    axios
      .post("http://localhost:5001/accounts/add-friend", { currUserId, userId })
      .then(function (response) {
        if (response.data === "Success") {
          // alert(user.email + " has been added as a friend");
          // user.isFriend = true;
          console.log(user);
          dispatch(addFriend(user));
          dispatch(updateSearchedUsers(user));
          // setSearchedUsers({ ...searchedUsers, [user.id]: user });
          // setSearchedUsers({ ...searchedUsers, [user.id]: userId });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5001/accounts/search-users", {
        params: {
          query: query,
          acctId: currUser.id,
        },
      })
      .then(function (response) {
        const userList = response.data;
        // setSearchedUsers(userList);
        dispatch(setSearchedUsers(userList));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Typography>Search Users</Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="filled-basic"
          label="... search"
          variant="filled"
          onChange={handleChange}
        />
      </form>
      {searchedUsers && !!searchedUsers.length > 0 && (
        <UserList users={searchedUsers} handler={handleClick} />
      )}
    </div>
  );
};

export default SearchUsers;
