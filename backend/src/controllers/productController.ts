import { Request, Response } from "express";
import { productModel } from "../models/products";

export const getAllProducts = async(req : Request , res : Response)=>{
   try{
   const products = await productModel.find({});
   res.status(200).json(products);
   return;
   }catch(error){
   res.status(500).json({ message: "Error retrieving products" });
   return;
   }
  }
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json({ message: `Product with slug '${req.params.slug}' not found`
      });
      return;
    } else {
      res.status(200).json(product);
      return;
    }
  } catch (error) {
    res.status(500).json({  message: "Error retrieving product"});
    return;
  }
}