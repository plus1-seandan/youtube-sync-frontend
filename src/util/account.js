import axios from "axios";

export const getMe = async () => {
  return await axios.get(
    `http://${process.env.REACT_APP_SERVER_URL}:5001/accounts`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
