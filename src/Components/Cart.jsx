import { clearCart } from "../utils/ReduxStore/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AccordionInfo from "./AccordionInfo";
const Cart = ()=>{
    // this is bad approch, here returrning full store, we need on only change of item, store changes not, in any changes in the store
    // const cartData = useSelector((store)=> store);

    // hence we return only (return store.cart.items)
    // here we are selecting specific portion of our store
    
    const cartData = useSelector((store)=>{
        return store.cart.items;
    });

    const dispatch = useDispatch();
    const handelClearCart = ()=>{
        dispatch(clearCart());
    }
    return(
        <>
        <button onClick={handelClearCart}>Clear Cart</button>
        {
           cartData.length > 0 ?  <AccordionInfo  data={cartData}/> : <h1>Cart is empty</h1>
        }
        </>
    )
};

export default Cart;