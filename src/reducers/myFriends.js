const myFriendsReducer = (state = [], action) => {
  switch (action.type) {
    case "MY_FRIENDS":
      return action.payload;
    default:
      // need this for default case
      return state;
  }
};

export default myFriendsReducer;
