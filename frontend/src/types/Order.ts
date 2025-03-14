import { cartItem, shippingAddress } from "./Cart"
import { User } from "./User"

export type Order = {
    _id : string , 
    orderItems : cartItem[],
    shippingAddress : shippingAddress,
    paymentMethod : string,
    itemPrice : number,
    shippingPrice : number,
    taxPrice : number,
    totalPrice : number
    user : User
    createdAt : string ,
    isPaid : boolean,
    paidAt : string ,
    isDelivered : boolean,
    deliveredAt : string,
}