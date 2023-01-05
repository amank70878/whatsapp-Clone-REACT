import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  menuToggleState: false,
};

export const customReducer = createReducer(initialState, {
  menuToggleType: (state, action) => {
    state.menuToggleState = action.payload;
  },
  decrement: (state, action) => {
    state.amountState -= action.payload;
  },
});
