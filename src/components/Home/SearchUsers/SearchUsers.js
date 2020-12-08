import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import UserList from "../UserList/UserList";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SearchUsers = ({ user }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5001/search-users", {
        params: {
          query: query,
        },
      })
      .then(function (response) {
        const userList = response.data;
        setSearchedUsers(userList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={handleChange}
        />
      </form>
      {searchedUsers && !!searchedUsers.length > 0 && (
        <UserList currUser={user} users={searchedUsers} />
      )}
    </div>
  );
};

export default SearchUsers;
