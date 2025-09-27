export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== "undefined") {
    const state = store.getState();

    try {
      if (state.cart) {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      if (state.bookMarks) {
        localStorage.setItem("bookMarks", JSON.stringify(state.bookMarks));
      }
      if (state.favorites) {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }

  return result;
};

// Function to load cart state from localStorage
// Function to load cart state from localStorage
export const loadCartState = () => {
  if (typeof window === "undefined") {
    return undefined; // SSR guard
  }

  try {
    const serializedState = localStorage.getItem("cart");
    const serializedBookMark = localStorage.getItem("bookMarks");
    const serializedFavorites = localStorage.getItem("favorites");

    const cart =
      serializedState && serializedState !== "undefined"
        ? JSON.parse(serializedState)
        : undefined;
    
    const bookMarks =
      serializedBookMark && serializedBookMark !== "undefined"
        ? JSON.parse(serializedBookMark)
        : undefined;

    const favorites =
      serializedFavorites && serializedFavorites !== "undefined"
        ? JSON.parse(serializedFavorites)
        : undefined;

    return { cart, favorites,bookMarks };
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return undefined;
  }
};
