import { produce } from "immer";

const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case "INITIALIZE_VIDEO":
      return produce(state, (draftState) => {
        draftState[action.payload.roomId] = {};
      });
    case "SET_VIDEO":
      const roomId = action.payload.roomId;
      const video = action.payload.video;
      return produce(state, (draftState) => {
        if (!draftState[roomId]) {
          draftState[roomId] = {};
        }
        draftState[roomId].videoInfo = video;
        draftState[roomId].isPlaying = false;
        draftState[roomId].played = 0;
        draftState[roomId].isPlaying = false;
      });
    case "SEEK_VIDEO":
      return produce(state, (draftState) => {
        draftState[action.payload.roomId].played = action.payload.played;
      });

    case "TOGGLE_PLAY":
      if (state[action.payload.roomId].hasOwnProperty("isPlaying")) {
        return produce(state, (draftState) => {
          draftState[action.payload.roomId].isPlaying =
            action.payload.isPlaying;
        });
      }
      return produce(state, (draftState) => {
        draftState[action.payload.roomId].isPlaying = action.payload.isPlaying;
      });
    default:
      // need this for default case
      return state;
  }
};

export default videoReducer;
