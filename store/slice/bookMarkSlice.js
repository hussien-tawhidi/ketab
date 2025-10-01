const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
};

const bookMarkItems = createSlice({
  name: "bookMarks",
  initialState,
  reducers: {
    addToBookMark: (state, action) => {
      const existing = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existing >= 0) {
        state.items.splice(existing, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBookMarks: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
    clearBookMarks: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToBookMark, clearBookMarks, removeFromBookMarks } =
  bookMarkItems.actions;

export default bookMarkItems.reducer;
