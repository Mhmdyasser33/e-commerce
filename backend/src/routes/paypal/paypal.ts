import { handlePaypalPayment } from "../../controllers/paypalController"
import express from "express"


export default function(router : express.Router){
  router.get("/api/keys/paypal" , handlePaypalPayment)
}