import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            }); 
          }
          return cartItem;
        });
        return newState;
      } else {
        return [...state, { ...action.payload }];
      }


    case actionTypes.REMOVE_FROM_CART:
      const itemToRemove = state.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );

      if (itemToRemove.quantity > 1) {
        const updatedItem = {
          ...itemToRemove,
          quantity: itemToRemove.quantity - 1,
        };

        const updatedState = state.map((cartItem) =>
          cartItem.product.id === action.payload.id ? updatedItem : cartItem
        );

        return updatedState;
      } else {
        const newState2 = state.filter(
          (cartItem) => cartItem.product.id !== action.payload.id
        );
        return newState2;
      }
      case actionTypes.CLEAR_CART:
        return[];

    default:
      return state;
  }
}
