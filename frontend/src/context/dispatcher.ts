import { ACTION } from "./action";
import { AppState } from "./types";


export const initialState : AppState = {
    userInfo : localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")!) 
    : null,
    mode : localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia && window.matchMedia('(prefers-color-scheme : dark)').matches
    ? 'dark' 
    : 'light',
    cart : {
        cartItems : localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems")!)
          : [],
        shippingAddress : localStorage.getItem("shippingAddress") ? 
        JSON.parse(localStorage.getItem("shippingAddress")!) : {},
        paymentMethod  : localStorage.getItem("paymentMethod") ?
        localStorage.getItem("paymentMethod")! : 'payPal' , 
        itemPrice : 0,
        taxPrice : 0, 
        shippingPrice : 0,
        totalPrice : 0
    }
}

export const defaultDispatch : React.Dispatch<ACTION> = ()=> initialState;