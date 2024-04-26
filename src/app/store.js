import { configureStore } from "@reduxjs/toolkit";
import adminsReducer from "../features/admins/adminSlice.js";
import userSlice from "../features/admins/userSlice.js";



const store = configureStore({
    reducer: {
        admins: adminsReducer,
        userInfo: userSlice,
      
    }
})


export default store;