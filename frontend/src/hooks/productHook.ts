import { useQuery } from "@tanstack/react-query"
import apiClient from "../react-query/apiConfig"
import { Product } from "../types/Product"

export const useGetProductQuery = ()=> useQuery({
    queryKey : ['products'],
    queryFn : async () => (await apiClient.get<Product[]>('api/products')).data, 
})

export const useGetProductDetailsBySlugQuery = (slug : string)=> useQuery({
    queryKey : ['products' , slug] , 
    queryFn : async ()=> (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
})