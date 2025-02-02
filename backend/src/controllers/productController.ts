import { sampleProducts } from "../data";
import express from "express" ; 

export const getAllProducts = async(req : express.Request , res : express.Response)=>{
  try{
  res.json(sampleProducts) ; 
  }catch(error){
   res.status(500).json(error) ;
  }
}
export const getProductBySlug =async(req : express.Request , res : express.Response)=>{
   try{
     res.json(sampleProducts.find((product)=> product.slug === req.params.slug)) ; 
   }catch(error){
     res.status(500).json(error) ;
   }
}