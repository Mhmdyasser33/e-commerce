import { ApiError } from "../types/ApiError";
import { cartItem } from "../types/Cart";
import { Product } from "../types/Product";


export const getError = (error : ApiError) =>{
    return error.response && error.response.data.message ? error.response.data.message : error.message
}

export const convertProductToCartItem = (product : Product) : cartItem=>{
    const cartItem : cartItem = {
        _id : product._id,
        name : product.name,
        image : product.image,
        slug : product.slug,
        countInStock : product.countInStock,
        price : product.price,
        quantity : 1,
    }
    return cartItem;
}

