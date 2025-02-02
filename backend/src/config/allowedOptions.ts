import { corsCallback } from "types/corsCallbackType";
import {allowedOrigin} from "../config/allowedOrigin";



export const corsOptions = {
    origin : (origin : string, cb : corsCallback) =>{
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            cb(null , true) ; 
        }else{
            cb(new Error("Not allowed by Cors")) ; 
        }
    },
    credentials : true,
    optionsSuccessStatus : 200
}
