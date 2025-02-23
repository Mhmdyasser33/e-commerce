import express from "express"; 
import { UserModel } from "../models/users"; 
import bcrypt from "bcrypt"; 
import { generateToken } from "../utility/helper"; 
export const loginUser = async (req: express.Request, res: express.Response) => { 
  try { 
    const { email, password } = req.body;  
    const trimmedEmail = email?.trim() ; 
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedPassword) { 
       res.status(400).json({ message: "All fields are required" }); 
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(trimmedEmail)){
      res.status(400).json({message : "Invalid email format"});
    }
    const user = await UserModel.findOne({ email : trimmedEmail });  
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

export const signupUser = async(req : express.Request , res : express.Response)=>{
  try{
    const {name,email,password} = req.body;
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim().toLowerCase(); 
    const trimmedPassword = password?.trim() ; 
    
    if(!trimmedName || !trimmedEmail || !trimmedPassword){
      res.status(400).json({message : "All fields are required"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(trimmedEmail)){
      res.status(400).json({message : "Invalid email format"})
    }
    const existingUser = await UserModel.findOne({email : trimmedEmail});
    if(existingUser){
      res.status(400).json({message : "User already exist"})
    }
    if(trimmedPassword.length < 6 ){
      res.status(400).json({message : "Password should be at least 6 characters long"});
    }
    const user = await UserModel.create({
      name : trimmedName , 
      email : trimmedEmail,
      password : bcrypt.hashSync(trimmedPassword,10)
    })
   
    res.status(201).json({
      _id : user._id,
      name : user.name,
      email : user.email,
      isAdmin : user.isAdmin,
      token : generateToken(user)
    })
  }catch(error){
     console.log(`Error in signup user${error}`)
     res.status(500).json({message : "Internal Server Error"})
  }

}
