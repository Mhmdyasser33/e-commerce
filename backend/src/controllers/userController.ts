import express from "express"; 
import { UserModel } from "../models/users"; 
import bcrypt from "bcrypt"; 
import { generateToken } from "../utility/helper"; 

export const authenticateUser = async (req: express.Request, res: express.Response) => { 
  try { 
    const { email, password } = req.body;  

    if (!email || !password) { 
       res.status(400).json({ message: "Email and password are required" }); 
    } 

    const user = await UserModel.findOne({ email });  

    if (!user) { 
      res.status(404).json({ message: "User not found" }); 
    } 

    if (!bcrypt.compareSync(password, user.password)) { 
       res.status(401).json({ message: "Password not correct" }); 
    } 

    res.status(200).json({  
      id: user._id, 
      name: user.name, 
      email: user.email,  
      isAdmin: user.isAdmin, 
      token: generateToken(user) 
    });

  } catch (error) { 
    console.error(`Error in authenticateUser: ${error}`); 
    res.status(500).json({ message: "Internal Server Error" });
  } 
};
