import express from "express";
import {handleOrder} from "../../controllers/orderController"
import { isUserAuthenticated } from "../../utility/helper";
const router = express.Router()
export default(router : express.Router)=>{
    router.post("/api/orders" , isUserAuthenticated , handleOrder)
}