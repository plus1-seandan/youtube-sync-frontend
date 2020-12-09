import React, { useState } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import CreateRoom from "./CreateRoom/CreateRoom";
import Join from "../Join/Join";
import MyRooms from "./MyRooms/MyRooms";
import MyFriends from "./MyFriends/MyFriends";
import { useSelector } from "react-redux";

const Home = () => {
  const currUser = useSelector((state) => state.currUserInfo);
  // console.log(currUser);
  return (
    <div>
      <div>Hi {currUser.firstName}</div>
      <SearchUsers />
      <MyRooms />
      <MyFriends />
      <CreateRoom />
      {/* <Join user={props.location.state} />  */}
    </div>
  );
};
export default Home;
