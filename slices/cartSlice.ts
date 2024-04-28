
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: {}, 
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { restaurantId, item } = action.payload;
      if (!state.carts[restaurantId]) {
        state.carts[restaurantId] = [];
      }
      state.carts[restaurantId] = [...state.carts[restaurantId], item];
    },
    removeFromCart: (state, action) => {
      const { restaurantId, itemId } = action.payload;
      const cart = state.carts[restaurantId];
      const itemIndex = cart.findIndex(item => item._id === itemId);
      if (itemIndex !== -1) {
          const item = cart[itemIndex];
          if (item.quantity > 1) {
              cart[itemIndex] = { ...item, quantity: item.quantity - 1 };
          } else {
              cart.splice(itemIndex, 1);
          }
      }
  },

    emptyCart: (state, action) => {
      const { restaurantId } = action.payload;
      state.carts[restaurantId] = [];
    },
    deleteCart: (state, action) => {
      const { restaurantId } = action.payload;
      delete state.carts[restaurantId];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, deleteCart } = cartSlice.actions;

export const selectCartItemsByRestaurantId = (state, restaurantId) => state.cart.carts[restaurantId] || [];
// export const selectCartTotalByRestaurantId = (state, restaurantId) => {
//   const items = state.cart.carts[restaurantId] || [];
//   return items.reduce((total, item) => total + item.price, 0);
// };
export const selectCartTotalByRestaurantId = (state, restaurantId) => {
  const items = state.cart.carts[restaurantId] || [];
  return items.reduce((total, item) => {

    const main = total + item.price;
    let totalPrice = 0; // Declare totalPrice here

    if (Array.isArray(item.extras) && item.extras.length > 0) {
      totalPrice += item.extras.reduce((extraTotal, extra) => {
        const extraPrice = Number(extra.price) || 0;
        return extraTotal + extraPrice;
      }, 0);
    }

    const carttotal = main + totalPrice;
    console.log(carttotal);
    
    return carttotal; 
  }, 0);
};






export default cartSlice.reducer;
