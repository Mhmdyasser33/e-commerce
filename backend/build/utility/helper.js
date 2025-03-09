"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthenticated = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../types/Request");
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.MY_SECRET_KEY || "fake_#@#(*(!aq__$#$%F", {
        expiresIn: "35d"
    });
};
exports.generateToken = generateToken;
/* create isAuth MiddleWare */
const isUserAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: "No token provided" });
    }
    else {
        const jwtToken = authorization.slice(7, authorization.length); // remove Bearer prefix and space after Bearer to get only the token ...
        console.log(jwtToken);
        try {
            const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.MY_SECRET_KEY || "fake_#@#(*(!aq__$#$%F");
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    }
};
exports.isUserAuthenticated = isUserAuthenticated;
//# sourceMappingURL=helper.js.map