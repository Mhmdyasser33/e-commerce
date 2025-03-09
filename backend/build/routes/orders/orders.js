"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../../controllers/orderController");
const helper_1 = require("../../utility/helper");
const router = express_1.default.Router();
exports.default = (router) => {
    router.post("/api/orders", helper_1.isUserAuthenticated, orderController_1.handleOrder);
};
//# sourceMappingURL=orders.js.map