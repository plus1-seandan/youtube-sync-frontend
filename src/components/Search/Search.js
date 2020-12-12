import React, { useState, useEffect } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import Header from "../Header/Header";

const Search = () => {
  return (
    <div>
      <Header />
      <div>Search Users</div>
      <SearchUsers />
    </div>
  );
};
export default Search;
