import express from "express";
import seedProducts from "./seedProducts";
const router = express.Router();


export default () : express.Router=>{
    seedProducts(router);
    return router ;
}