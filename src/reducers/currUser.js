const currUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(typeof state);
      const userInfo = action.payload;
      return userInfo;
    default:
      // need this for default case
      return state;
  }
};
export default currUserReducer;
