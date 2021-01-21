import { produce } from "immer";

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case "START_MESSAGE":
      return produce(state, (draftState) => {
        draftState[action.payload.roomId] = [
          {
            sender: { id: "ADMIN", name: "ADMIN" },
            message: "Welcome to the chat",
          },
        ];
      });
    case "ADD_MESSAGE":
      const sender = action.payload.sender;
      const message = action.payload.message;
      return produce(state, (draftState) => {
        if (!draftState[action.payload.roomId]) {
          draftState[action.payload.roomId] = [];
        } else {
          draftState[action.payload.roomId].push({
            sender: { id: sender.id, name: sender.firstName },
            message: message,
          });
        }
      });
    default:
      // need this for default case
      return state;
  }
};

export default messagesReducer;
