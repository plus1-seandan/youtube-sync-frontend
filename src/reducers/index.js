//import all reducers here

import { combineReducers } from "redux";
import myRoomsReducer from "./myRooms";
import myFriendsReducer from "./myFriends";
import searchedUsersReducer from "./searchedUsers";
import roomMemberReducer from "./roomMembers";
import messagesReducer from "./messages";
import videoReducer from "./videos";

const allReducers = combineReducers({
  myRooms: myRoomsReducer,
  myFriends: myFriendsReducer,
  searchedUsers: searchedUsersReducer,
  roomMembers: roomMemberReducer,
  messages: messagesReducer,
  videos: videoReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
