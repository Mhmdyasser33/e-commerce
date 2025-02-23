import {loginUser, signupUser} from "../../controllers/userController"
import express from "express"

export default(router : express.Router)=>{
   router.post("/api/users/signin" ,loginUser)
   router.post("/api/users/signup" ,signupUser)
}