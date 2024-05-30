"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.verifyCredentials = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const username_acc = 'jules';
const pwd_acc = 'jules';
const secret = 'secret';
const tokenExpiration = "1h";
const verifyCredentials = (username, pwd) => username === username_acc && pwd === pwd_acc;
exports.verifyCredentials = verifyCredentials;
const generateToken = (username) => {
    const payload = { username: username, role: 'TODO' };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: tokenExpiration });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    jsonwebtoken_1.default.verify(token, secret, { maxAge: tokenExpiration });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authenticationService.js.map