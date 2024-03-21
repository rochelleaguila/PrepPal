const getState = ({ getStore, getActions, setStore }) => {
  const refreshAccessToken = async () => {
    // Logic to refresh access token
    // This could involve calling a refresh token endpoint and updating the store
    const newTokenResponse = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      // Include refresh token if needed
    });
    const newTokenData = await newTokenResponse.json();
    localStorage.setItem('token', newTokenData.access_token);
    setStore({
      ...getStore(),
      access_token: newTokenData.access_token,
    });
    return newTokenData.access_token;
  };

  return {
    store: {
      access_token: null,
      user: null,
      userMenus: [],
    },
    actions: {
      auth: {
        //actions below are signup, login, etc
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
          console.log("Attempting login with:", username, password);
          const resp = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
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
            localStorage.setItem('token', data.access_token);
            setStore({
              //...state.store,
              access_token: data.access_token,
              user: { username },
            });
          }
          console.log("Token set in store:", getStore().access_token);
        },

        logout: () => {
          localStorage.removeItem("token")
          setStore({
            access_token: null,
            user: null,
          });
        },

        //actions below are related to menus
        fetchUserMenus: async () => {
          //const store = getStore();
          try {
            const resp = await fetch(`${process.env.BACKEND_URL}/api/user/menus`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getStore().access_token}`,
              },
            });
            if (!resp.ok) throw new Error("Failed to fetch user menus.");
            const menus = await resp.json();
            setStore({ userMenus: menus });
            return menus; // Returning menus to update state in component
          } catch (error) {
            console.error("Error fetching user menus:", error);
          }
        },

        createNewMenu: async (recipe) => {
          // Assuming you might want to create a menu with this recipe in it
          try {
            const resp = await fetch(`${process.env.BACKEND_URL}/api/menus/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getStore().access_token}`,
              },
              body: JSON.stringify({
                menuName: "New Menu", // Example static name, consider allowing user input
                recipes: [recipe.id] // Assuming the recipe has an ID
              }),
            });
            if (!resp.ok) throw new Error("Failed to create new menu.");
            const newMenu = await resp.json();
            console.log("New menu created successfully:", newMenu);
            // Update userMenus in the store
            const updatedMenus = [...getStore().userMenus, newMenu];
            setStore({ userMenus: updatedMenus });
          } catch (error) {
            console.error("Error creating new menu:", error);
          }
        },

        //actions related to recipes
        saveRecipe: async (recipe) => {
          try {
            const resp = await fetch(`${process.env.BACKEND_URL}/api/recipes/save`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getStore().access_token}`,
              },
              body: JSON.stringify(recipe),
            });
            if (!resp.ok) throw new Error("Failed to save recipe.");
            console.log("Recipe saved successfully");
            // Optionally, update some store state here
          } catch (error) {
            console.error("Error saving recipe:", error);
          }
        },

        //actions related to user
        fetchUsername: () => {
          const store = getStore();
          if (!store.access_token) return;

          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${store.access_token}`,
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("Fetched user data:", data);
            // Assuming you want to update the username in your store
            setStore({
              ...store,
              user: {
                ...store.user,
                username: data.username,
              },
            });
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
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
    },
  };
};

export default getState;
