import { Request , Response } from "express";
import { UserModel } from "../models/users"; 
import bcrypt from "bcrypt"; 
import { generateToken } from "../utility/helper"; 
export const loginUser = async (req: Request, res: Response) => { 
  try { 
    const { email, password } = req.body;  
    const trimmedEmail = email?.trim() ; 
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedPassword) { 
       res.status(400).json({ message: "All fields are required" }); 
       return ;
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(trimmedEmail)){
      res.status(400).json({message : "Invalid email format"});
      return ;
    }
    const user = await UserModel.findOne({ email : trimmedEmail });  
    if (!user) { 
      res.status(404).json({ message: "User not found" }); 
      return;
    } 

    if (!bcrypt.compareSync(password, user.password)) { 
       res.status(401).json({ message: "Password not correct" }); 
       return;
    } 

    res.status(200).json({  
      id: user._id, 
      name: user.name, 
      email: user.email,  
      isAdmin: user.isAdmin, 
      token: generateToken(user) 
    });
    return;

  } catch (error) { 
    res.status(500).json({ message: `Internal Server Error ${error.message}`});
    return;
   
  } 
};

export const signupUser = async(req : Request , res : Response)=>{
  try{
    const {name,email,password} = req.body;
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim().toLowerCase(); 
    const trimmedPassword = password?.trim() ; 
    
    if(!trimmedName || !trimmedEmail || !trimmedPassword){
      res.status(400).json({message : "All fields are required"})
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(trimmedEmail)){
      res.status(400).json({message : "Invalid email format"})
      return;
    }
    const existingUser = await UserModel.findOne({email : trimmedEmail});
    if(existingUser){
      res.status(400).json({message : "User already exist"})
      return;
    }
    if(trimmedPassword.length < 6 ){
      res.status(400).json({message : "Password should be at least 6 characters long"});
      return;
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
    return;
  }catch(error){
    res.status(500).json({message : `Internal Server Error ${error.message}}`})
    return;

  }

}
