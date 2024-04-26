import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApiCall } from "../../utils/apiCaller";



export const userLogin = createAsyncThunk('userInfo/userLogin', async (userCred)=>{
    const response = await postApiCall('/user/login',userCred);
    console.log(response.data);
    return response.data;
})


const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        isLoading: false,
        error:null,
        data:null,
    },
    reducers: {
        setUser: (state,{payload})=>{
            state.user=payload;
        },
        removeUser: (state)=>{
            state.user=null;

        }
    },
    extraReducers:(builder) =>{
        builder.addCase(userLogin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(userLogin.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(userLogin.rejected, (state,action)=>{
            state.isLoading = false;
            state.error= action.error.message;
            state.data=null;
        })   
    }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer;
