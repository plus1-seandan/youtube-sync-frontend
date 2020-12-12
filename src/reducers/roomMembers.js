import { produce } from "immer";

const roomMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ROOM_MEMBERS":
      return produce(state, (draftState) => {
        draftState[action.payload.roomId] = action.payload.roomMembers;
      });
    case "ADD_ROOM_MEMBERS":
      console.log(action.payload);
      return produce(state, (draftState) => {
        draftState[action.payload.roomId].push(action.payload.roomMember);
      });
    default:
      // need this for default case
      return state;
  }
};

export default roomMemberReducer;
