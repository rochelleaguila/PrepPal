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
          const store = getStore();
          const actions = getActions();

          // Function to attempt fetching user menus with a given token
          const attemptFetch = async (accessToken) => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/menus`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
              },
            });
            return response;
          };

          // First attempt with the current access token
          let response = await attemptFetch(store.access_token);

          // If the first attempt fails due to unauthorized access, try refreshing the token
          if (response.status === 401) {
            // Attempt to refresh the access token
            const refreshedToken = await actions.refreshAccessToken();
            if (refreshedToken) {
              // If the token was successfully refreshed, retry the fetch with the new token
              response = await attemptFetch(refreshedToken);
            }
          }

          // After retrying, handle the response
          if (response.ok) {
            const menus = await response.json();
            setStore({ userMenus: menus });
            return menus; // Returning menus to update state in component
          } else {
            // Handle failure to fetch menus after retrying
            throw new Error('Failed to fetch user menus after attempting token refresh.');
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
                menuName,
                menuDescription,
                recipes: recipes.map(recipe => recipe.id)
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

        addRecipeToMenu: async (menu_id, recipe_id) => {
          const store = getStore();
          try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/menus/${menu_id}/add_recipe`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.access_token}`, // Assuming access_token is stored in your global state
              },
              body: JSON.stringify({
                recipe_id: recipe_id,
              }),
            });

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.msg || 'Failed to add recipe to menu');
            }

            // Assuming you might want to update some state or perform some action upon successful addition
            console.log("Recipe added to menu successfully");
            // Optionally, refresh menus or perform any other update necessary

          } catch (error) {
            console.error("Error adding recipe to menu:", error);
          }
        },

        //actions related to recipes
        saveRecipe: async (recipe) => {
          const store = getStore();
          const actions = getActions();

          // Attempt saving the recipe with the current access token
          let response = await fetch(`${process.env.BACKEND_URL}/api/recipes/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${store.access_token}`,
            },
            body: JSON.stringify(recipe),
          });

          // Handle token refresh if necessary
          if (response.status === 401) {
            const refreshedToken = await actions.refreshAccessToken();
            if (refreshedToken) {
              response = await fetch(`${process.env.BACKEND_URL}/api/recipes/save`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${refreshedToken}`,
                },
                body: JSON.stringify(recipe),
              });
            }
          }

          if (response.ok) {
            const savedRecipe = await response.json();
            console.log("Full response from save:", savedRecipe); // Debug: Log the full response
            if (!savedRecipe.recipe_id) {
              console.error("No recipe_id found in response:", savedRecipe);
              throw new Error("No recipe_id returned from backend");
            }
            return savedRecipe.recipe_id;
          }
        },


        fetchUserRecipes: async () => {
          const store = getStore();
          const actions = getActions();

          if (!store.access_token) return;
          const attemptFetch = async (accessToken) => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/recipes`, {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            });
            return response;
          };

          let response = await attemptFetch(store.access_token);

          if (response.status === 401) {
            const refreshed = await actions.refreshAccessToken();
            if (refreshed) {
              const newAccessToken = getStore().access_token;
              response = await attemptFetch(newAccessToken);
            }
          }

          if (response.ok) {
            const recipes = await response.json();
            console.log("Fetched user recipes:", recipes);
            setStore({
              ...store,
              userRecipes: recipes,
            });
          } else {
            throw new Error('Failed to fetch user recipes');
          }
        },

        fetchRecipeById: async (recipeId) => {
          const store = getStore();
          try {
            const url = `${process.env.BACKEND_URL}/api/recipes/${recipeId}`;
            console.log("Fetching recipe from URL:", url); // Log for debugging
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${store.access_token}`,
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch recipe');
            }

            const recipe = await response.json();
            console.log("Fetched recipe:", recipe);
            return recipe;
          } catch (error) {
            console.error("Error fetching recipe by ID:", error);
            throw error; // It's important to throw the error to handle it in the component
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

        //actions related to preference
        savePreferences: async (preferences) => {
          const store = getStore();
          const actions = getActions();

          // Function to attempt saving preferences with a given token
          const attemptSave = async (accessToken) => {
            const response = await fetch(`${process.env.BACKEND_URL}/user/preferences`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`, // Use the current access token
              },
              body: JSON.stringify(preferences),
            });
            return response;
          };

          // First attempt with the current access token
          let response = await attemptSave(store.access_token);

          // If the first attempt fails due to unauthorized access, try refreshing the token
          if (response.status === 401) {
            // Attempt to refresh the access token
            const refreshedToken = await actions.auth.refreshAccessToken();
            if (refreshedToken) {
              // If the token was successfully refreshed, retry saving preferences with the new token
              response = await attemptSave(refreshedToken);
            }
          }

          if (response.ok) {
            console.log("Preferences saved successfully");
          } else {
            console.error("Failed to save preferences after attempting token refresh.");
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
