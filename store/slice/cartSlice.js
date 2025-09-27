import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity = 1, title } = action.payload; // assuming you have `title`
      const existingItem = state.items.find((item) => item._id === _id);

      // common toast style
      const toastOptions = {
        icon: <BiCheck className='text-ketab-green' />,
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#5e942b",
        },
      };

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(
          `تعداد ${quantity} از "${title}" به سبد خرید افزوده شد`,
          toastOptions
        );
      } else {
        state.items.push({ ...action.payload });
        toast.success(`"${title}" به سبد خرید اضافه شد`, toastOptions);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
