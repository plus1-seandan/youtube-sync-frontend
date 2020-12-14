import React, { useState, useEffect } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../../actions";

const Search = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Header />
        </Grid>
        <Grid xs={3}>
          <SearchUsers />
        </Grid>
      </Grid>
    </div>
  );
};
export default Search;
