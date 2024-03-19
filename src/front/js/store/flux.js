const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      access_token: null,
      user: null,
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
              user: { username },
            });
          }
        },

        logout: () => {
          setStore({
            access_token: null,
            user: null,
          });
        },

        fetchUserMenus: async () => {
          const store = getStore();
          const response = await fetch(`${process.env.BACKEND_URL}/api/user/menus?user_id=${store.user_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const menus = await response.json();
            setStore({ menus });
          }
        }
      },

      // Example action to use the access token for an authenticated request
      getProtectedData: async () => {
        const store = getStore();
        const resp = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
          headers: {
            "Authorization": `Bearer ${store.access_token}`,
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          console.log(data);
          // Handle protected data
        }
      },
    },
  };
};

export default getState;
