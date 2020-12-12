const searchedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_USERS":
      const searchedUsers = action.payload;
      return searchedUsers;
    case "UPATE_SEARCHEDUSERS":
      return state.map((item) => {
        if (item.id !== action.id) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.item,
        };
      });
    default:
      // need this for default case
      return state;
  }
};
export default searchedUsersReducer;
