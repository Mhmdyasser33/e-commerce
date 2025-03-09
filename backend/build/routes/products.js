"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
exports.default = (router) => {
    router.get("/api/products", productController_1.getAllProducts);
    router.get("/api/products/slug/:slug", productController_1.getProductBySlug);
};
//# sourceMappingURL=products.js.map