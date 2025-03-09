import { User } from "../models/users";
import jwt from "jsonwebtoken"
import express from "express"
import "../types/Request"
export const generateToken = (user : User) =>{
   return jwt.sign(
        {
            _id : user._id ,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        },
        process.env.MY_SECRET_KEY || "fake_#@#(*(!aq__$#$%F",
        {
            expiresIn : "35d"
        }
    )
}
/* create isAuth MiddleWare */
export const isUserAuthenticated = (req : express.Request , res : express.Response , next : express.NextFunction)=>{
    const {authorization} = req.headers ; 
    if(!authorization){
        res.status(401).json({message : "No token provided"});
    }else{
         const jwtToken =authorization.slice(7 , authorization.length); // remove Bearer prefix and space after Bearer to get only the token ...
         console.log(jwtToken);
         try{
            const decoded = jwt.verify(
                jwtToken,
                process.env.MY_SECRET_KEY || "fake_#@#(*(!aq__$#$%F"
            );
            next();
         }catch(error){
            res.status(401).json({message : "Invalid token"}) ; 
         }
    }

}
