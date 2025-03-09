"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnect = () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-commerce-db";
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default.connect(MONGO_URI).then(() => {
            console.log('database connected successfully');
        }).catch((error) => {
            console.log(`Error in connecting db ${error}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.dbConnect = dbConnect;
//# sourceMappingURL=dbConnect.js.map