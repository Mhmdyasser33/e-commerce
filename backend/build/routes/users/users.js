"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../../controllers/userController");
exports.default = (router) => {
    router.post("/api/users/signin", userController_1.loginUser);
    router.post("/api/users/signup", userController_1.signupUser);
};
//# sourceMappingURL=users.js.map