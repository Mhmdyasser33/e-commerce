import express from "express"
import orders from "./orders"
const router = express.Router()

export default() : express.Router=>{
  orders(router);
  return router
}