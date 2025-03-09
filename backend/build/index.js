"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const seeds_1 = __importDefault(require("./seeds"));
const dbConnect_1 = require("./config/dbConnect");
const cors_1 = __importDefault(require("cors"));
const allowedOptions_1 = require("./config/allowedOptions");
const index_1 = __importDefault(require("./routes/users/index"));
const index_2 = __importDefault(require("./routes/orders/index"));
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(allowedOptions_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // parse data that will took from form
(0, dbConnect_1.dbConnect)();
app.use("/", (0, products_1.default)());
app.use("/", (0, seeds_1.default)());
app.use("/", (0, index_1.default)());
app.use("/", (0, index_2.default)());
app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map