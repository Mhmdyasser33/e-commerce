import { sampleProducts, sampleUsers } from "../data";
import express from "express" ;
import { productModel } from "../models/products";
import { UserModel } from "../models/users";

export const seedDB = async (req : express.Request , res : express.Response)=>{
    try{
    await productModel.deleteMany({}) ; // remove all data in db 
    const createdProducts = await productModel.insertMany(sampleProducts);

    await UserModel.deleteMany({}) ;
    const createdUsers = await UserModel.insertMany(sampleUsers) ;
    res.json({createdProducts , createdUsers});
    }catch(error){
        console.log(`Error in seeding db`) ;
        res.sendStatus(500); 
    }
}