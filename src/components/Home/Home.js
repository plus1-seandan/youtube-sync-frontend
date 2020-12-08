import React, { useState } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import CreateRoom from "./CreateRoom/CreateRoom";
import Join from "../Join/Join";
import MyRooms from "./MyRooms/MyRooms";
import MyFriends from "./MyFriends/MyFriends";

const Home = (props) => {
  return (
    <div>
      <div>Hi {props.location.state.email}</div>
      <SearchUsers user={props.location.state} />
      <MyRooms user={props.location.state} />
      <MyFriends user={props.location.state} />
      <CreateRoom user={props.location.state} />
      <Join user={props.location.state} />
    </div>
  );
};
export default Home;
