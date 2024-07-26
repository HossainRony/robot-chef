import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User registration
export const register = async (userData) => {
  const response = await api.post('/user/register', userData);
  return response.data;
};

// User login
export const login = async (userData) => {
  const response = await api.post('/user/login', userData);
  if (response.data.token) {
    localStorage.setItem('jwt_token', response.data.token);
    localStorage.setItem('username', response.data.user.username);
  }
  return response.data;
};

// User logout
export const logout = async () => {
  const response = await api.post('/user/logout', {});
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('username');
  return response.data;
};

// Setup 2FA
export const setup2FA = async (email) => {
  const response = await api.post('/user/setup-2fa', { email });
  return response.data;
};

// Verify 2FA setup
export const verify2FASetup = async (email, token) => {
  const response = await api.post('/user/verify-2fa-setup', { email, token });
  return response.data;
};

// Get all recipes
export const getAllRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data;
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  const response = await api.post('/recipes/add', recipeData);
  return response.data;
};

// Update a recipe
export const updateRecipe = async (id, recipeData) => {
  const response = await api.put(`/recipes/${id}`, recipeData);
  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};
