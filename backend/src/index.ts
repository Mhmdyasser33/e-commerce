import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import router from "./routes/products";
import seeds from "./seeds";
import { dbConnect } from "./config/dbConnect";
import cors from "cors";
import { corsOptions } from "./config/allowedOptions";
import users from "./routes/users/index";
import orders from "./routes/orders/index";

const port = process.env.PORT || 4000;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse data that will took from form
dbConnect();
app.use("/", router());
app.use("/", seeds());
app.use("/", users());
app.use("/", orders());
app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
