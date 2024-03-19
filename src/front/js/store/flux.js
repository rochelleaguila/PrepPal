const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      access_token: null,
      user: null,
      userMenus: [],
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
