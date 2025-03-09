"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUsers = exports.sampleProducts = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.sampleProducts = [
    {
        name: "Blue Running Shoes",
        slug: "blue-running-shoes",
        image: "../public/images/p1.jpg",
        category: "Footwear",
        price: 59.99,
        brand: "Nike",
        countInStock: 20,
        description: "Comfortable and stylish running shoes.",
        rating: 4.5,
        numReviews: 150
    },
    {
        name: "Red Sports T-Shirt",
        slug: "red-sports-tshirt",
        image: "../public/images/p1.jpg",
        category: "Apparel",
        price: 19.99,
        brand: "Adidas",
        countInStock: 0,
        description: "Breathable fabric for active wear.",
        rating: 4.2,
        numReviews: 80
    },
    {
        name: "Black Backpack",
        slug: "black-backpack",
        image: "../public/images/p3.jpg",
        category: "Accessories",
        price: 39.99,
        brand: "Puma",
        countInStock: 15,
        description: "Spacious and durable backpack for daily use.",
        rating: 4.8,
        numReviews: 200
    },
    {
        name: "Stylish Black Backpack",
        slug: "stylish-black-backpack",
        image: "../public/images/p4.jpg",
        category: "Accessories",
        price: 49.99,
        brand: "Urban Gear",
        countInStock: 25,
        description: "A stylish and versatile backpack perfect for everyday use.",
        rating: 4.5,
        numReviews: 150
    }
];
exports.sampleUsers = [
    {
        name: 'mohamed',
        email: "admin@example.com",
        password: bcrypt_1.default.hashSync('0100010', 10),
        isAdmin: true
    },
    {
        name: "ahmed",
        email: "user@example.com",
        password: bcrypt_1.default.hashSync('123456', 10),
        isAdmin: false
    }
];
//# sourceMappingURL=data.js.map