export const setAccountInfo = (account) => {
  return {
    type: "SIGN_IN",
    payload: account,
  };
};

export const getMyRooms = (rooms) => {
  // console.log(rooms);
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

export const setSearchedUsers = (account) => {
  return {
    type: "SEARCHED_USERS",
    payload: account,
  };
};

export const updateSearchedUsers = (account) => {
  return {
    type: "UPATE_SEARCHEDUSERS",
    payload: account,
  };
};

export const clearState = () => {
  return {
    type: "RESET_APP",
  };
};

export const getRoomMembers = (roomId, roomMembers) => {
  return {
    type: "GET_ROOM_MEMBERS",
    payload: { roomId, roomMembers },
  };
};

export const addRoomMember = (roomId, roomMember) => {
  return {
    type: "ADD_ROOM_MEMBERS",
    payload: { roomId, roomMember },
  };
};
