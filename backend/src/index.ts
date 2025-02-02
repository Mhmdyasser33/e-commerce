import dotenv from "dotenv";
dotenv.config();
import express from "express" ;
import router from "./routes";
import seeds from "./seeds";
import {dbConnect} from "./config/dbConnect" ;
import cors from "cors" ; 
import { corsOptions } from "./config/allowedOptions";

const port = process.env.PORT || 4000
const app = express() ; 
app.use(cors(corsOptions)) ; 
dbConnect();
app.use("/" , router())
app.use("/" , seeds());
app.listen(port , ()=>{
    console.log(`server start at http://localhost:${port}`) ; 
})