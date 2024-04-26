import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall } from "../../utils/apiCaller";

export const fetchAdmins = createAsyncThunk('admins/fetchAdmins', async ()=>{
    const response = await getApiCall('/user',{role: 'admin'});
    return response.data;
})


const adminsSlice = createSlice({
    name: "admins",
    initialState: {
        isLoading: false,
        error: null,
        admins: [],
    },
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchAdmins.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAdmins.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.admins = action.payload;
        })
        .addCase(fetchAdmins.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.admins = [];
        })   
    }
})

export default adminsSlice.reducer;
