const getState = ({ getStore, getActions, setStore }) => {
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.error("No refresh token available.");
      // Consider redirecting to login
      return null;
    }
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`, // Use refreshToken here
        },
      });
      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      setStore((prevStore) => ({
        ...prevStore,
        access_token: data.access_token,
      }));
      return data.access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Handle error, potentially redirecting to login
    }
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
            localStorage.setItem('refresh_token', data.refresh_token)
            setStore({
              //...state.store,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              user: { username },
            });
          }
          console.log("Token set in store:", getStore().access_token);
        },

        logout: () => {
          localStorage.removeItem("token")
          localStorage.removeItem("refresh_token")
          setStore({
            access_token: null,
            refresh_token: null,
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

        createNewMenu: async ({ menuName, menuDescription, recipes }) => {
          // Assuming you might want to create a menu with this recipe in it
          try {
            const resp = await fetch(`${process.env.BACKEND_URL}/api/menus/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getStore().access_token}`,
              },
              body: JSON.stringify({
                menuName, // Example static name, consider allowing user input
                menuDescription,
                recipes: recipes.map(recipe => recipe.id) // Assuming the recipe has an ID
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

        fetchUserRecipes: async () => {
          const store = getStore();
          if (!store.access_token) return;

          try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/recipes`, {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${store.access_token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user recipes');
            }
            const recipes = await response.json();
            console.log("Fetched user recipes:", recipes);

            // Update the store with the fetched recipes
            setStore({
              ...store,
              userRecipes: recipes,
            });
          } catch (error) {
            console.error("Error fetching user recipes:", error);
          }
        },

        //actions related to user
        fetchUsername: async () => {
          const store = getStore();
          if (!store.access_token) return;

          const attemptFetch = async (token) => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            return response;
          };

          let response = await attemptFetch(store.access_token);
          if (response.status === 401) {
            // Token might be expired, attempt to refresh
            const newToken = await actions.auth.refreshAccessToken(); // Ensure you have such a function
            if (newToken) {
              response = await attemptFetch(newToken); // Retry with the new token
            }
          }

          if (!response.ok) {
            throw new Error('Failed to fetch user data after attempting token refresh.');
          }

          const data = await response.json();
          console.log("Fetched user data:", data);
          setStore({
            ...store,
            user: {
              ...store.user,
              username: data.username,
            },
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
