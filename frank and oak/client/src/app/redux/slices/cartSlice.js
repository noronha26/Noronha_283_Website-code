import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart=createAsyncThunk(
    'cart/fetchCart',
    async(user,thunkApi)=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_URL}/cart/read-cart/${user}`);
            console.log("Fetched cart data:", response.data); // Debugging
      return response.data;

    
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
export const clearCart=createAsyncThunk(
    'cart/clearCart',
    async(user,thunkApi)=>{
        try{
            const response=await axios.put(`${process.env.NEXT_PUBLIC_URL}/cart/clear-cart`,{ userId: user });
      return response.data;

    
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState={
    value:{data:[]},
    loading:false,
    error:null
};
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
    //     updateCart: (state, action) => {
    //         state.value.data = action.payload; // Update the cart data in Redux store
    // console.log('update===>')
    //     },
},
    extraReducers:(builder)=>{
builder
.addCase(fetchCart.fulfilled,(state,action)=>{
    console.log('cart=>',action.payload);
    state.value=action.payload;

})
.addCase(fetchCart.rejected,(state,action)=>{
    state.error=action.payload;

})
    }
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer