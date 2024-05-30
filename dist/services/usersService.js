"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByUsername = void 0;
const usersRepository_1 = require("../repositories/usersRepository");
const getUserByUsername = (username) => {
    return (0, usersRepository_1.getUserByUsername)(username);
};
exports.getUserByUsername = getUserByUsername;
const createUser = (user) => {
};
exports.createUser = createUser;
//# sourceMappingURL=usersService.js.map