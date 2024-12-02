
import { configureStore } from "@reduxjs/toolkit";
import  userSlice from "./slices/userSlice";
import  parentCategorySlice  from "./slices/parentCategoryslices";
import productCategorySlice  from "./slices/productCategorySlices";
import productSlice  from "./slices/productSlice";

export const store =configureStore({
    reducer:{
        user:userSlice,
        parentCategory:parentCategorySlice,
        productCategory:productCategorySlice,
        products:productSlice


    }
});