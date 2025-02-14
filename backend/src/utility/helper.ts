import { User } from "../models/users";
import jwt from "jsonwebtoken"
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