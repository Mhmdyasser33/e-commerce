"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = exports.loginUser = void 0;
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helper_1 = require("../utility/helper");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmedEmail = email?.trim();
        const trimmedPassword = password?.trim();
        if (!trimmedEmail || !trimmedPassword) {
            res.status(400).json({ message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            res.status(400).json({ message: "Invalid email format" });
        }
        const user = await users_1.UserModel.findOne({ email: trimmedEmail });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            res.status(401).json({ message: "Password not correct" });
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, helper_1.generateToken)(user)
        });
    }
    catch (error) {
        console.error(`Error in authenticateUser: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.loginUser = loginUser;
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const trimmedName = name?.trim();
        const trimmedEmail = email?.trim().toLowerCase();
        const trimmedPassword = password?.trim();
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            res.status(400).json({ message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await users_1.UserModel.findOne({ email: trimmedEmail });
        if (existingUser) {
            res.status(400).json({ message: "User already exist" });
        }
        if (trimmedPassword.length < 6) {
            res.status(400).json({ message: "Password should be at least 6 characters long" });
        }
        const user = await users_1.UserModel.create({
            name: trimmedName,
            email: trimmedEmail,
            password: bcrypt_1.default.hashSync(trimmedPassword, 10)
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, helper_1.generateToken)(user)
        });
    }
    catch (error) {
        console.log(`Error in signup user${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signupUser = signupUser;
//# sourceMappingURL=userController.js.map