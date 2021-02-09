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

//   video: {
//     kind: 'youtube#searchResult',
//     etag: '94Zjq6uFsUWeM-iFWg8Je5voNaw',
//     id: { kind: 'youtube#video', videoId: '4F7VFc_5cu4' },
//     snippet: {
//       publishedAt: '2020-12-03T04:44:25Z',
//       channelId: 'UC8-Th83bH_thdKZDJCrn88g',
//       title: 'Trump Giving Out Pardons for Christmas | The Tonight Show',
//       description: 'Jimmy addresses the UK approving a coronavirus vaccine and Trump considering pardons for his family members. The Tonight Show Starring Jimmy Fallon.',
//       thumbnails: [Object],
//       channelTitle: 'The Tonight Show Starring Jimmy Fallon',
//       liveBroadcastContent: 'none',
//       publishTime: '2020-12-03T04:44:25Z'
//     }
// }
