import { configureStore } from "@reduxjs/toolkit";
import adminsReducer from "../features/admins/adminSlice.js";

const store = configureStore({
    reducer: {
        admins: adminsReducer
    }
})


export default store;