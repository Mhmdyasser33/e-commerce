import { sampleProducts } from "../data";
import express from "express" ;
import { productModel } from "../models/products";

export const seedDB = async (req : express.Request , res : express.Response)=>{
    try{
    await productModel.deleteMany({}) ; // remove all data in db 
    const createdProducts = await productModel.insertMany(sampleProducts);
    res.json({createdProducts});
    }catch(error){
        console.log(`Error in seeding db`) ;
        res.sendStatus(500); 
    }
}