import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from '../services/api';

const initialState = {
  recipes: [],
  currentRecipe: null,
  status: 'idle',
  error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async () => {
  const response = await getAllRecipes();
  return response;
});

export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id) => {
  const response = await getRecipeById(id);
  return response;
});

export const addRecipe = createAsyncThunk('recipes/add', async (recipeData) => {
  const response = await createRecipe(recipeData);
  return response;
});

export const modifyRecipe = createAsyncThunk('recipes/update', async ({ id, recipeData }) => {
  const response = await updateRecipe(id, recipeData);
  return response;
});

export const removeRecipe = createAsyncThunk('recipes/delete', async (id) => {
  await deleteRecipe(id);
  return id;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.currentRecipe = action.payload;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(modifyRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((recipe) => recipe._id === action.payload._id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((recipe) => recipe._id !== action.payload);
      });
  },
});

export default recipeSlice.reducer;
