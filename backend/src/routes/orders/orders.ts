import express from "express";
import {createNewCustomerOrder, getOrderDetailsById} from "../../controllers/orderController"
import { isUserAuthenticated } from "../../utility/helper";
export default(router : express.Router)=>{
    router.post("/api/orders" , isUserAuthenticated , createNewCustomerOrder);
    router.get("/api/orders/:id" , isUserAuthenticated,getOrderDetailsById)
}
