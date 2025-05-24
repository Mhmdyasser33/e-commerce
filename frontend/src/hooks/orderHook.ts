import { useMutation, useQuery } from "@tanstack/react-query";
import { cartItem, shippingAddress } from "../types/Cart";
import apiClient from "../react-query/apiConfig";
import { Order } from "../types/Order";



export const useGetOrderDetailsQuery = (id : string)=> useQuery({
  queryKey : ['orders' , id],
  queryFn : async()=>{
    const { data } = await apiClient.get<Order>(`api/orders/${id}`) ;
    return data; 
  }
})
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
      const { data } = await apiClient.post<{order : Order}>('api/orders/' , order);
      return data;
    } 
})

export const useGetPayPalClientIdQuery = ()=> useQuery({
  queryKey : ['paypal-clientId'],
  queryFn : async()=>{
   const { data } = await apiClient.get<{clientId : string}>("/api/keys/paypal"); 
   return data;
  }
})
export const usePayOrderMutation = ()=>  useMutation({
  mutationFn : async (details : {orderId : string })=>{
    const { data } = await apiClient.put<{message : string , order : Order}>(`/api/order/${details.orderId}/pay`,details);
    return data ; 
  }
})
export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        orders: Order[];
        message?: string;
      }>("/api/orders/history");
      return data;
    },
  });
