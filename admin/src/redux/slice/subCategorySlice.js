import { createSlice } from "@reduxjs/toolkit";
import { subCategoryData } from "../../data/subCategory";

const subCategorySlice = createSlice({
    name:'subCategory',
    initialState:{
        subCategoryData: subCategoryData,

    },
    reducers:{}
})


export const selectAllSubCategory  = (state) => state.subCategory.subCategoryData;
export default  subCategorySlice.reducer;