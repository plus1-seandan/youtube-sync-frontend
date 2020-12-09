//import all reducers here

import { combineReducers } from "redux";
import myRoomsReducer from "./myRooms";
import myFriendsReducer from "./myFriends";

import currUserReducer from "./currUser";
const allReducers = combineReducers({
  currUserInfo: currUserReducer,
  myRooms: myRoomsReducer,
  myFriends: myFriendsReducer,
});

export default allReducers;
