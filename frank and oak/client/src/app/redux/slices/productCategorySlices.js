import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userSlice } from "./userSlice";

export const fetchProductCategory=createAsyncThunk(
    'parentCategory/fetchProductCategory',
    async(_,thunkApi)=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_URL}/product-category/active-categories`)
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

export const productCategorySlice=createSlice({
    name:'productCategory',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
builder
.addCase(fetchProductCategory.fulfilled,(state,action)=>{
    console.log('product-category=>',action.payload);
    state.value=action.payload;

})
.addCase(fetchProductCategory.rejected,(state,action)=>{
    state.error=action.payload;

})
    }
});
export default productCategorySlice.reducer