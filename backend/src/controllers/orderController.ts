
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
          itemsPrice: req.body.itemsPrice,
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

  export const getOrderById = async(req : Request , res : Response)=>{
    const { id } = req.params;
    console.log(id)
    try{
      const order = await OrderModel.findById(id) ;
      console.log(order);
      if(order){
        res.status(200).json(order);
        return;
      }else{
        res.status(404).json({message : "Order Not Found"}) ; 
        return ;
      }
    }catch(error){
      res.status(500).json({message : `Internal Server Error ${error.message}` });
      return ;
    }
  }
