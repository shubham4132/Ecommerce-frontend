import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductsSlice from "./admin/products-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
