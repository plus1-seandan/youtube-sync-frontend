const server = process.env.REACT_APP_API_SERVER || "http://localhost:5001";

export const login = (email, password) => {
  return fetch(`${server}/login`, {
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
