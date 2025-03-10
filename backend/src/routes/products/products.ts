import express from "express" ; 
import { getAllProducts, getProductBySlug } from "../../controllers/productController";



export default(router : express.Router)=>{
    router.get("/api/products" , getAllProducts) ; 
    router.get("/api/products/slug/:slug" , getProductBySlug)
}

