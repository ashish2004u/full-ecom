import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;
      const existing = state.find(item => item.id === id && item.size === size);

      if (existing) {
        existing.qty += action.payload.qty;
      } else {
        state.unshift(action.payload);
      }

      saveToLocalStorage(state);
    },

    incrementQty: (state, action) => {
      const { id, size } = action.payload;
      const item = state.find(item => item.id === id && item.size === size);
      if (item) item.qty += 1;

      saveToLocalStorage(state);
    },

    decrementQty: (state, action) => {
      const { id, size } = action.payload;
      const item = state.find(item => item.id === id && item.size === size);
      if (item && item.qty > 1) item.qty -= 1;

      saveToLocalStorage(state);
    },

    // 👇 NEW reducer: remove 1 quantity or full item if qty === 1
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      const item = state.find(i => i.id === id && i.size === size);

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          const newState = state.filter(i => !(i.id === id && i.size === size));
          saveToLocalStorage(newState);
          return newState;
        }
      }

      saveToLocalStorage(state);
      return state;
    },

    // // 🗑️ Completely remove the item
    // removeFromCart: (state, action) => {
    //   const { id, size } = action.payload;
    //   const newState = state.filter(item => !(item.id === id && item.size === size));
    //   saveToLocalStorage(newState);
    //   return newState;
    // },
  },
});

// 🔁 Selector & Actions Export
export const selectCartItems = (state) => state.cart;
export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  removeOneQty, // export it!
} = cartSlice.actions;
export default cartSlice.reducer;
