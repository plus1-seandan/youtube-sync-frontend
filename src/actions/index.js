export const setAccountInfo = (account) => {
  return {
    type: "SIGN_IN",
    payload: account,
  };
};

export const getMyRooms = (rooms) => {
  return {
    type: "MY_ROOMS",
    payload: rooms,
  };
};

export const addMyRoom = (room) => {
  return {
    type: "ADD_MY_ROOM",
    payload: room,
  };
};

export const getMyFriends = (friends) => {
  return {
    type: "MY_FRIENDS",
    payload: friends,
  };
};
