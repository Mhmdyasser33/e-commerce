import { productModel } from "../models/products";
import express from "express" ; 

export const getAllProducts = async(req : express.Request , res : express.Response)=>{
  try{
  const products = await productModel.find({}) ;
   res.json(products) ; 
  }catch(error){
   res.status(500).json(error) ;
  }
}
export const getProductBySlug =async(req : express.Request , res : express.Response)=>{
   try{
    const product = await productModel.findOne({slug : req.params.slug});
    if(!product){
        res.status(400).json({message : "Product Not Found"})
    }else{
        res.json(product);
    }
   }catch(error){
     res.status(500).json(error) ;
   }
}