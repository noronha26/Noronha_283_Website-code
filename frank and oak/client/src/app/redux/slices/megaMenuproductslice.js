import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchMegaProducts=createAsyncThunk(
    'parentCategory/fetchMegaProducts',
    async(category,thunkApi)=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_URL}/megaProducts/megaActive-products/${category}`);
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
export const megaMenuproductSlice=createSlice({
    name:'megaProduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
builder
.addCase(fetchMegaProducts.fulfilled,(state,action)=>{
    console.log('megaProducts=>',action.payload);
    state.value=action.payload;

})
.addCase(fetchMegaProducts.rejected,(state,action)=>{
    console.log('megaProducts error=>',action.payload);
    state.error=action.payload;

})
    }
});
export default megaMenuproductSlice.reducer

// export const productSlice=createSlice({
//     name:'products',
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
// builder

// .addCase(fetchProducts.fulfilled,(state,action)=>{
//     // console.log('products =>',action.payload);
//     console.log('products=>',action.payload);
//     state.value=action.payload;

// })
// .addCase(fetchProducts.rejected,(state,action)=>{
//     state.error=action.payload;

// })
//     }
// });
// export default productSlice.reducer;