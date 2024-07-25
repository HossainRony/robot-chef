import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import recipeReducer from './recipeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
  },
});

export default store;
