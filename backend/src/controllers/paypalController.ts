import { Request , Response } from "express"

export const handlePaypalPayment = (req : Request , res : Response)=>{
    try{
        res.send({clientId :'fakeTestPayment__$@$#'})
        return;

    }catch(error){
         res.status(500).json({message : `Error in payment with paypal ${error}`} )
         return;
    }

}