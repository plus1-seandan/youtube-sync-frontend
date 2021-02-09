import dotenv from "dotenv";

const server = process.env.REACT_APP_SERVER_URL;
export const login = (email, password) => {
  return fetch(`http://${server}:5001/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        return data.token;
      });
    } else {
      const error = new Error(res.error);
      throw error;
    }
  });
};
