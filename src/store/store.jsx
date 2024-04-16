import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import modalReducer from "./modalSlice/modalSlice";
import articlesReducer from "./articlesSlice/articlesSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    articles: articlesReducer
  },
});

export default store;
