import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        //  action can be add,delete,update
        //  it contains diff typr of reducers funciton which work specificlly  


        // here by other library (Immer) redux is using it to find diff btw orignal state and new state and passing the update to update the state, thats how mutation is working here, in vanilla redux older one you have to do it manually but new version do it by it self
        addItem : (state,action)=>{
            state.items.push(action.payload);      
        },
        removeItem : (state) => {
            state.items.pop();
        },
        clearCart : (state) =>{
             // you can either do this 
            state.items.length = 0;
            // or return empty list 
            // return {items : []}
         
        }   
    }
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
