import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMegaMenu=createAsyncThunk(
    'megaMenu/fetchMegamenu',
    async(_,thunkApi)=>{
        try{
const response=await axios.get(`${process.env.NEXT_PUBLIC_URL}/mega-menu/activeMegaMenu`);

return response.data;

        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);

        }
    }
)
const initialState={
    value:{},
    loading:false,
  error:null
};

export const megaMeenuSlice=createSlice({
    name:'megaMenu',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMegaMenu.fulfilled,(state,action)=>{
            console.log('megaMenus=>',action.payload);
            state.value=action.payload;
        })
        .addCase(fetchMegaMenu.rejected,(state,action)=>{
            console.log('megaMenus error=>',action.payload);
            state.error=action.payload;
        })
    }
});
export default megaMeenuSlice.reducer;
