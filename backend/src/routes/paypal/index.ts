import express from "express"
import paypal from "./paypal"
const router = express.Router()

export default function() : express.Router{
    paypal(router)
    return router
}