import axios from "axios";

export const getMe = async () => {
  return await axios.get(`http://localhost:5001/accounts`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
