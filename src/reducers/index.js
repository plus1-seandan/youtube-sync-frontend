//import all reducers here

import { combineReducers } from "redux";
import myRoomsReducer from "./myRooms";
import myFriendsReducer from "./myFriends";
import currUserReducer from "./currUser";
import searchedUsersReducer from "./searchedUsers";
import roomMemberReducer from "./roomMembers";

const allReducers = combineReducers({
  currUserInfo: currUserReducer,
  myRooms: myRoomsReducer,
  myFriends: myFriendsReducer,
  searchedUsers: searchedUsersReducer,
  roomMembers: roomMemberReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }

  return allReducers(state, action);
};
export default rootReducer;
