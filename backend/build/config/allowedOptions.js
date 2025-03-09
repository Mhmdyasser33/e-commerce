"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigin_1 = require("../config/allowedOrigin");
exports.corsOptions = {
    origin: (origin, cb) => {
        if (allowedOrigin_1.allowedOrigin.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        }
        else {
            cb(new Error("Not allowed by Cors"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
//# sourceMappingURL=allowedOptions.js.map