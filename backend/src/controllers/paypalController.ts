import { Request , Response } from "express"

export const handlePaypalPayment = (req : Request , res : Response)=>{
    try{
        res.send({clientId : process.env.PAYPAL_CLIENT_ID || 'fakeTestPayment__$@$#'})
        return;

    }catch(error){
         res.status(500).json({message : `Error in payment with paypal ${error}`} )
         return;
    }

}