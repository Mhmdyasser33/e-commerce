"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOrder = void 0;
const order_1 = require("../models/order");
const handleOrder = async (req, res) => {
    try {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
        }
        else {
            const createdOrder = await order_1.OrderModel.create({
                orderItems: req.body.orderItems.map((productInfo) => ({
                    ...productInfo,
                    product: productInfo._id
                })),
                shippingAddress: req.body.shippingAddress,
                shippingPrice: req.body.shippingPrice,
                itemsPrice: req.body.itemsPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                paymentMethod: req.body.paymentMethod
            });
            res.status(201).json({ message: "Order created", order: createdOrder });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.handleOrder = handleOrder;
//# sourceMappingURL=orderController.js.map