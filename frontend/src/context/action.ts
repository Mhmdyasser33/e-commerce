import { cartItem } from "../types/Cart";
import { UserInfo } from "../types/UserInfo";


export type ACTION = 
| {type : "SWITCH_MODE"}
| {type : "ADD_CART_ITEM" , payload : cartItem}
| {type : "REMOVE_CART_ITEM" , payload : cartItem}
| {type : "USER_SIGNIN" , payload : UserInfo}
| {type : "USER_LOGOUT"}
