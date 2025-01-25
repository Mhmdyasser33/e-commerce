import dotenv from "dotenv";
dotenv.config();
import express from "express" ;
import { sampleProducts } from "./data";
import cors from "cors" ; 
const port = process.env.PORT || 4000
const app = express() ; 


app.use(cors({
    credentials : true,
    origin : ["http://localhost:5173"]
}))
app.get("/api/products" , (req : express.Request , res : express.Response)=>{
    res.json(sampleProducts);
})

app.listen(port , ()=>{
    console.log(`server start at http://localhost:${port}`) ; 
})