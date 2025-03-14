import { useMutation } from "@tanstack/react-query";
import { cartItem, shippingAddress } from "../types/Cart";
import apiClient from "../react-query/apiConfig";
import { Order } from "../types/Order";

export const useCreateOrderMutations = ()=> useMutation({
    mutationFn : async(order : {
        orderItems : cartItem[],
        shippingAddress : shippingAddress,
        paymentMethod : string,
        itemPrice : number,
        shippingPrice : number ,
        taxPrice : number ,
        totalPrice : number 
    }) =>{
      const { data } = await apiClient.post<{order : Order}>('api/orders' , order);
      return data;
    } 
})