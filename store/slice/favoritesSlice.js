import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingIndex = state.favorites.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex >= 0) {
        // اگر وجود داشت، حذفش کن
        state.favorites.splice(existingIndex, 1);
      } else {
        // اگر نبود، اضافه کن
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
