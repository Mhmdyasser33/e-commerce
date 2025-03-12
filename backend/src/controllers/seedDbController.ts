import { Request , Response } from "express";
import { sampleProducts, sampleUsers } from "../data";
import { productModel } from "../models/products";
import { UserModel } from "../models/users";

export const seedDB = async (req : Request , res : Response)=>{
    try{
    await productModel.deleteMany({}) ; // remove all data in db 
    const createdProducts = await productModel.insertMany(sampleProducts);

    await UserModel.deleteMany({}) ;
    const createdUsers = await UserModel.insertMany(sampleUsers) ;
    res.json({createdProducts , createdUsers});
    return;
    }catch(error){
        res.status(500).json({message : `Error in seeding db ${error.message}`});
        return ;
        }
}