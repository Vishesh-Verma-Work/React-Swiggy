import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : ['a','b']
    },
    reducers : {
        //  action can be add,delete,update
        //  it contains diff typr of reducers funciton which work specificlly  
        addItem : (state,action)=>{
            state.items.push(action.payload);
        },
        removeItem : (state) => {
            state.items.pop();
        },
        clearCart : (state) =>{
            state.items.length = 0;
        }   
    }
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
