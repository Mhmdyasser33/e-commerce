import mongoose from "mongoose" ; 
import dotenv from "dotenv";
dotenv.config();
export const dbConnect = ()=>{
    try{
        const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-commerce-db";
        mongoose.set('strictQuery' , true) ; 
        mongoose.connect(MONGO_URI).then(()=>{
            console.log('database connected successfully') ; 
        }).catch((error )=>{
            console.log(`Error in connecting db ${error}`) ;
        })
    }catch(error) {
        console.log(error) ; 
    }
    
}