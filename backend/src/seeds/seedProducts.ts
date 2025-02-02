import express from "express";
const router = express.Router();
import { seedDB } from "../controllers/seedDbController";

export default(router : express.Router)=>{
    router.get("/api/seed" ,seedDB);
}