import {createSlice} from '@reduxjs/toolkit';
import Products from '../../data/productData';

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:Products ,// yahan ek jagah import ho gaya
    },
    reducers:{

    }
})

export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;