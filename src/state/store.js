import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducer";

const store = configureStore({
      reducer: {
            amountRedur: customReducer,
      }
})

export default store;