import React, { useState, useEffect } from "react";
import CreateRoom from "./CreateRoom/CreateRoom";
import MyRooms from "./MyRooms/MyRooms";
import MyFriends from "./MyFriends/MyFriends";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
const Home = () => {
  const currUser = useSelector((state) => state.currUserInfo);

  return (
    <div>
      <Header />
      <div>Hi {currUser.firstName}</div>
      <MyRooms />
      <MyFriends />
      <CreateRoom />
      {/* <Join user={props.location.state} />  */}
    </div>
  );
};
export default Home;
