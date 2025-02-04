export type cartItem = {
    _id : string
    name : string , 
    slug : string ,
    image : string | undefined,
    quantity : number,
    price : number , 
    countInStock : number,
}

export type shippingAddress = {
    fullName : string , 
    address : string , 
    city : string,
    country : string ,
    postalCode : string
}

export type cart = {
    cartItems : cartItem[],
    shippingAddress : shippingAddress,
    paymentMethod  : string , 
    itemPrice : number,
    taxPrice : number, 
    shippingPrice : number,
    totalPrice : number
}