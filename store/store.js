// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import favoritesReducer from "./slice/favoritesSlice";
import bookMarksReducer from "./slice/bookMarkSlice";
import {
  localStorageMiddleware,
  loadCartState,
} from "./localStorageMiddleware";

// Load persisted state (cart + favorites separately)
const persistedState = loadCartState();

const preloadedState = {
  cart: persistedState?.cart || { items: [] },
  bookMarks: persistedState?.bookMarks || { items: [] },
  favorites: persistedState?.favorites || { favorites: [] }, 
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    bookMarks: bookMarksReducer,
    favorites: favoritesReducer, // ✅ plural to match persisted key
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
