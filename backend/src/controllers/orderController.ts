import orders from "routes/orders";
import { OrderModel } from "../models/order";
import { Product } from "../models/products";
import { Request, Response } from "express";
export const createNewCustomerOrder = async (req: Request, res: Response) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
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
        user: (req as any).user._id,
      });
      res.status(201).json({ order: createdOrder });
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create order ${error.message}` });
    return;
  }
};

export const getProductDetailsById = async(req : Request , res : Response)=>{
  try{

    const {id} = req.params ; 
    const order = await OrderModel.findById(id) ; 
    if(order){
      res.status(200).json(order);
    }else{
      res.status(404).json({message : "Order Not Found"}) ; 
    }

  }catch(error){
    res.status(500).json({message : "Internal server error" + error}) ; 
  }
}

export const updateOrderDetailsAfterPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.paymentId,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res
        .status(200)
        .json({ message: "order payed successfully", order: updatedOrder });
      return;
    } else {
      res.status(404).json({ message: "Order Not Found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error.message}` });
    return;
  }
};

export const userHistoryHandler = async(req : Request , res : Response)=>{
  try{
    const userOrders = await OrderModel.find({user : (req as any).user._id}) 
    if(!userOrders || userOrders.length === 0){
      res.status(200).json({ message: "No orders found for this user.",orders : [] });
      return 
    }
    res.status(200).json(userOrders);
    return ;
  }catch(err){
     res.status(500).json({message : "Error in getting user history"}) ; 
     return;
  }
}

