import { createSlice } from "@reduxjs/toolkit";

type ProductState = {
  products: any;
  cart: any;
};

const initialState: ProductState = {
  products: [],
  cart: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    addQuantity: (state, action) => {
      const itemId = action.payload;
      const updatedCart = state.cart.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      state.cart = updatedCart;
    },
    reduceQuantity: (state, action) => {
      const itemId = action.payload;
      const updatedCart = state.cart.map((item: any) => {
        if (item.id === itemId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      state.cart = updatedCart;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },
  },
});

export const {
  loadProducts,
  addToCart,
  addQuantity,
  reduceQuantity,
  removeFromCart,
} = productSlice.actions;

export default productSlice.reducer;
