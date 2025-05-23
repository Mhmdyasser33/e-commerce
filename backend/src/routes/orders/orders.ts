import express from "express";
import {createNewCustomerOrder, getProductDetailsById, updateOrderDetailsAfterPayment, userHistoryHandler} from "../../controllers/orderController"
import { isUserAuthenticated } from "../../utility/helper";
export default(router : express.Router)=>{
    router.get("/api/orders/history" , isUserAuthenticated , userHistoryHandler);
    router.post("/api/orders" , isUserAuthenticated , createNewCustomerOrder);
    router.get("/api/orders/:id" , isUserAuthenticated , getProductDetailsById);
    router.put("/api/order/:id/pay",isUserAuthenticated,updateOrderDetailsAfterPayment);
}