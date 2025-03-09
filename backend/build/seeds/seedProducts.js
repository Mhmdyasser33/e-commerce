"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const seedDbController_1 = require("../controllers/seedDbController");
exports.default = (router) => {
    router.get("/api/seed", seedDbController_1.seedDB);
};
//# sourceMappingURL=seedProducts.js.map