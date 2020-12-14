import { produce } from "immer";

const searchedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_USERS":
      // const nextState = produce(state, (draft) => {
      //   draft = action.payload;
      //   return draft;
      // });
      // console.log(state, nextState);
      // return nextState;
      return produce(state, (draft) => {
        draft = action.payload;
        return draft;
      });

    case "UPATE_SEARCHEDUSERS":
      console.log(action);
      return produce(state, (draft) => {
        for (var i = 0; i < draft.length; i += 1) {
          if (draft[i].id === action.payload.id) {
            draft[i].isFriend = true;
          }
        }
      });

    case "CLEAR_SEARCH":
      return [];
    default:
      // need this for default case
      return state;
  }
};
export default searchedUsersReducer;

// const nextState = produce(state, (draft) => {
//   draft[action.id] = action.payload;
//   return draft;
// });
// console.log(state, nextState);
// return nextState;
// return state;
// return state.map((item) => {
//   console.log(action.payload);
//   const nextState = produce(state, (draft) => {
//     draft = action.payload;
//     return draft;
//   });
//   console.log(state, nextState);
//   return nextState;
// if (item.id !== action.id) {
//   // This isn't the item we care about - keep it as-is
//   return item;
// }

// // Otherwise, this is the one we want - return an updated value
// return {
//   ...item,
//   ...action.item,
// };
