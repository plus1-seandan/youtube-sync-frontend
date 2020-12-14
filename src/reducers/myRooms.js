import { produce } from "immer";

const myRoomsReducer = (state = {}, action) => {
  switch (action.type) {
    case "MY_ROOMS":
      const myRooms = action.payload;
      myRooms.forEach((room) => {
        state[room.id] = { room };
      });
      return state;

    case "ADD_MY_ROOM":
      const room = action.payload;
      state[room.id] = { room };
      return state;

    case "REMOVE_ROOM":
      return produce(state, (draftState) => {
        delete draftState[action.payload.id];
      });

    default:
      // need this for default case
      return state;
  }
};

export default myRoomsReducer;
