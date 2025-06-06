"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.Order = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const products_1 = require("./products");
const users_1 = require("./users");
class ShippingAddress {
    fullName;
    address;
    country;
    postalCode;
    city;
    lat;
    lng;
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "fullName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "postalCode", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "lat", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "lng", void 0);
class Item {
    name;
    quantity;
    price;
    image;
    product;
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: products_1.Product }),
    __metadata("design:type", Object)
], Item.prototype, "product", void 0);
class PaymentResult {
    paymentId;
    status;
    updatedTime;
    emailAddress;
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "paymentId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "updatedTime", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "emailAddress", void 0);
let Order = class Order {
    _id;
    orderItems;
    shippingAddress;
    user;
    paymentMethod;
    paymentResult;
    itemsPrice;
    shippingPrice;
    taxPrice;
    totalPrice;
    isPaid;
    paidAt;
    isDelivered;
    deliveredAt;
};
exports.Order = Order;
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", ShippingAddress)
], Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: users_1.User }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", PaymentResult)
], Order.prototype, "paymentResult", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "itemsPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "shippingPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "taxPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isPaid", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "paidAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isDelivered", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "deliveredAt", void 0);
exports.Order = Order = __decorate([
    (0, typegoose_1.ModelOptions)({ schemaOptions: { timestamps: true } })
], Order);
exports.OrderModel = (0, typegoose_1.getModelForClass)(Order);
//# sourceMappingURL=order.js.map