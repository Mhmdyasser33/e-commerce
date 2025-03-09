"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = void 0;
const data_1 = require("../data");
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const seedDB = async (req, res) => {
    try {
        await products_1.productModel.deleteMany({}); // remove all data in db 
        const createdProducts = await products_1.productModel.insertMany(data_1.sampleProducts);
        await users_1.UserModel.deleteMany({});
        const createdUsers = await users_1.UserModel.insertMany(data_1.sampleUsers);
        res.json({ createdProducts, createdUsers });
    }
    catch (error) {
        console.log(`Error in seeding db`);
        res.sendStatus(500);
    }
};
exports.seedDB = seedDB;
//# sourceMappingURL=seedDbController.js.map