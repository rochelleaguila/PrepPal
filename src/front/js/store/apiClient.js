import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
apiClient.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      // Implement refresh token logic here
      // This should include making a request to your refresh token endpoint
      // and updating localStorage with the new token
      const response = await refreshToken(); // Implement this function based on your backend
      localStorage.setItem('access_token', response.data.access_token);

      // Update the header and retry the original request
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Handle error, e.g., logout user, redirect to login, show message
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});

// Example refreshToken function (implement according to your backend)
async function refreshToken() {
  // Make a request to your refresh token endpoint
  // Return the response containing the new access token
}

export default apiClient;

