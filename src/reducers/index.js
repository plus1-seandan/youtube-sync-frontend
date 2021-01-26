//import all reducers here

import { combineReducers } from "redux";
import myRoomsReducer from "./myRooms";
import myFriendsReducer from "./myFriends";
import roomMemberReducer from "./roomMembers";
import messagesReducer from "./messages";

const allReducers = combineReducers({
  myRooms: myRoomsReducer,
  myFriends: myFriendsReducer,
  roomMembers: roomMemberReducer,
  messages: messagesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
