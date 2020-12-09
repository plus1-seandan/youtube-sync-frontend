const myRoomsReducer = (state = [], action) => {
  switch (action.type) {
    case "MY_ROOMS":
      //   const myRooms = action.payload;
      return action.payload;
    case "ADD_MY_ROOM":
      state.push(action.payload);
      return state;
    default:
      // need this for default case
      return state;
  }
};

export default myRoomsReducer;
