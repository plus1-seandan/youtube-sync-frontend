import { produce } from "immer";

const myFriendsReducer = (state = [], action) => {
  switch (action.type) {
    case "MY_FRIENDS":
      console.log(action.payload);
      return action.payload;

    case "REMOVE_FRIEND":
      console.log(action.payload);
      const index = state.findIndex((x) => x.id === action.payload.id);

      return produce(state, (draftState) => {
        draftState = draftState.splice(index, 1);
      });
    case "ADD_FRIEND":
      console.log("triggered add friend");
      return produce(state, (draftState) => {
        draftState.push(action.payload);
      });

    default:
      // need this for default case
      return state;
  }
};

export default myFriendsReducer;
