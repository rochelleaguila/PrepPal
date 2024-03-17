const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      access_token: null,
    },
    actions: {
      auth: {
        signup: async (username, password) => {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          if (resp.ok) {
            const data = await resp.json();
            console.log(data);
          }
        },

        login: async (username, password) => {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          if (resp.ok) {
            const data = await resp.json();
            setStore({
              access_token: data.access_token,
            });
          }
        },
      },
    },
  };
};

export default getState;
