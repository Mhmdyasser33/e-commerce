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
     const fullOrder = (await OrderModel.findById(createdOrder._id)).toObject();
      console.log(JSON.stringify(fullOrder, null, 2))
      res.status(201).json({ order: fullOrder });
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

  export const getOrderHistory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = (req as any).user?._id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: User not found in request" });
        return;
      }

      const userOrders = await OrderModel.find({ user: userId });

      if (!userOrders || userOrders.length === 0) {
        res.status(200).json({
          orders: [],
          message: "You haven't placed any orders yet.",
        });
        return;
      }

      res.status(200).json({
        orders: userOrders,
        message: "Order history retrieved successfully.",
      });
    } catch (err) {
      console.error("Error fetching order history:", err);
      res.status(500).json({ message: "Failed to retrieve order history" });
    }
  };


