// this is the main store, ismai diff diff compo ke slices honge

import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from './Slices/cartSlice';

const appStore = configureStore({
    // idr alg alg component ki slices hongi
    reducer : {
        // yaha diff diff slices add honge
        cart : cartSlice,
    }
});

export default appStore;

