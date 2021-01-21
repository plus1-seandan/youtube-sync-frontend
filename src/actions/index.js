export const setMyRooms = (rooms) => {
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

export const setMyFriends = (friends) => {
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

export const addMessage = (roomId, sender, message) => {
  return {
    type: "ADD_MESSAGE",
    payload: { roomId, sender, message },
  };
};

export const startMessage = (roomId) => {
  return {
    type: "START_MESSAGE",
    payload: { roomId },
  };
};

export const initializeVideo = (roomId) => {
  return {
    type: "INITIALIZE_VIDEO",
    payload: { roomId },
  };
};

export const setVideo = (roomId, video) => {
  return {
    type: "SET_VIDEO",
    payload: { roomId, video },
  };
};

export const togglePlay = (roomId, isPlaying) => {
  return {
    type: "TOGGLE_PLAY",
    payload: { roomId, isPlaying },
  };
};
export const setPlayed = (roomId, played) => {
  return {
    type: "SEEK_VIDEO",
    payload: { roomId, played },
  };
};

export const removeFriend = (friend) => {
  return {
    type: "REMOVE_FRIEND",
    payload: friend,
  };
};

export const clearSearch = () => {
  return {
    type: "CLEAR_SEARCH",
  };
};

export const removeRoom = (room) => {
  return {
    type: "REMOVE_ROOM",
    payload: room,
  };
};

export const addFriend = (friend, user) => {
  return {
    type: "ADD_FRIEND",
    payload: friend,
  };
};
