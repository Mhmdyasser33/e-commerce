"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBySlug = exports.getAllProducts = void 0;
const products_1 = require("../models/products");
const getAllProducts = async (req, res) => {
    try {
        const products = await products_1.productModel.find({});
        res.json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllProducts = getAllProducts;
const getProductBySlug = async (req, res) => {
    try {
        const product = await products_1.productModel.findOne({ slug: req.params.slug });
        if (!product) {
            res.status(400).json({ message: "Product Not Found" });
        }
        else {
            res.json(product);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getProductBySlug = getProductBySlug;
//# sourceMappingURL=productController.js.map