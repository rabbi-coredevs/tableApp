import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall } from "../../utils/apiCaller";
import axios from "axios";

export const fetchAdmins = createAsyncThunk('admins/fetchAdmins', async ()=>{
    const response = await getApiCall('/user',{role: 'admin'});
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // console.log(response.data);
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
        builder.addCase(fetchAdmins.pending, (state,action)=>{
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchAdmins.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.admins = action.payload;
        })
        builder.addCase(fetchAdmins.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.admins = ['hi'];
        })
        
    }

})

export default adminsSlice.reducer;
