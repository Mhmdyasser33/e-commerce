
  import { OrderModel } from "../models/order";
  import { Product } from "../models/products";
  import { Request, Response } from "express";
  export const createNewCustomerOrder = async (req: Request, res: Response) => {
    try {
      if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: "Cart is empty" });
        return ;
      } else {
        const createdOrder = await OrderModel.create({
          orderItems: req.body.orderItems.map((productInfo: Product) => ({
            ...productInfo,
            product: productInfo._id,
          })),
          shippingAddress: req.body.shippingAddress,
          shippingPrice: req.body.shippingPrice,
          itemPrice: req.body.itemPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          paymentMethod: req.body.paymentMethod,
          user :(req as any).user._id
        });
        res.status(201).json({order: createdOrder });
        return;
      }
    } catch (error) {
      res.status(500).json({message : `Failed to create order ${error.message}`});
      return ;
    
    }
  };
 

export const getOrderDetailsById = async(req : Request , res : Response)=>{
  try{
      const {id : orderId} = req.params;
      const order = await OrderModel.findById(orderId) ; 
      if(order){
        res.status(200).json(order) ;
      }else{
        res.status(404).json({message : "Order  Not Found"})
      }
    }catch(error){
      res.status(500).json({message : "Internal Server Error" + error})
  }

}