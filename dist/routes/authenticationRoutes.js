"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationService_1 = require("../services/authenticationService");
const authRouter = express_1.default.Router();
authRouter.post('/', function (req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    if ((0, authenticationService_1.verifyCredentials)(username, password)) {
        const token = (0, authenticationService_1.generateToken)(username);
        res.status(200).send({ token: token });
    }
    else {
        res.status(401).send();
    }
});
exports.default = authRouter;
//# sourceMappingURL=authenticationRoutes.js.map