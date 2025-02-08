import { cartItem } from "../types/Cart";


export type ACTION = 
| {type : "SWITCH_MODE"}
| {type : "ADD_CART_ITEM" , payload : cartItem}
| {type : "REMOVE_CART_ITEM" , payload : cartItem}
