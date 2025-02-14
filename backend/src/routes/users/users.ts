import { authenticateUser} from "../../controllers/userController"
import express from "express"

export default(router : express.Router)=>{
   router.post("/api/users/signin" ,authenticateUser)
}