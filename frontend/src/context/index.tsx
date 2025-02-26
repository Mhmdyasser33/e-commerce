import React from "react";
import { AppState } from "./types";
import { ACTION } from "./action";
import { initialState } from "./dispatcher";
import {Store} from "./store" 
import { cartItem } from "../types/Cart";
const reducer = (state : AppState , action : ACTION) =>{
    switch(action.type){
        case "SWITCH_MODE":
            return {...state,mode : state.mode === 'dark' ? 'light' : 'dark'}
            // when include declare variable with const we should put this code inside {}
        case "ADD_CART_ITEM":{
            const newItem =  action.payload;
            const existItem = state.cart.cartItems.find((item : cartItem) => item._id === newItem._id) ;
            // here to check if item exist not add it again but increase quantity of it ...
            const cartItems = existItem ? state.cart.cartItems.map((item : cartItem) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems , newItem];
            localStorage.setItem('cartItems' , JSON.stringify(cartItems));
            return {...state , cart : {...state.cart , cartItems}} ;
        }
        case "REMOVE_CART_ITEM":{
            const newCartItems = state.cart.cartItems.filter((item : cartItem)=> item._id !== action.payload._id) ; 
            localStorage.setItem("cartItems" , JSON.stringify(newCartItems));
            return {...state , cart : {...state.cart ,cartItems : newCartItems}}
        }
        case "USER_SIGNIN" : 
        return {...state , userInfo : action.payload} ;
        case "USER_LOGOUT":{
            return {
                 mode : localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia && window.matchMedia('(prefers-color-scheme : dark)').matches
    ? 'dark' 
    : 'light',
    cart : {
        cartItems : [],
        paymentMethod : "payPal",
         shippingAddress : {
             fullName : "",
             address : "",
             city : "",
             country : "",
             postalCode : ""
         },
        itemPrice : 0,
        taxPrice : 0, 
        shippingPrice : 0,
        totalPrice : 0
    }
            }
        }
    case "SAVE_SHIPPING_ADDRESS":
        return{...state , cart : {...state.cart , shippingAddress : action.payload}}
        default:
            return state;
    }
}

const StoreProvider = (props : React.PropsWithChildren)=>{
    const [state , dispatch] = React.useReducer<React.Reducer<AppState , ACTION>>(
     reducer , 
     initialState
      
    )
    return <Store.Provider  value={{state , dispatch}} {...props}/>
}

export { Store, StoreProvider}
