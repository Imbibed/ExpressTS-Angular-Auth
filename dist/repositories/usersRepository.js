"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = void 0;
const db_1 = require("../db");
const User_1 = require("../Model/User");
const UserError_1 = require("../Error/UserError");
const db_collection_name = 'users';
const getUserByUsername = async (username) => {
    try {
        const db = await (0, db_1.connectDB)();
        const collection = db.collection(db_collection_name);
        const user = await collection.findOne({ username: username });
        if (user) {
            const { _id, username, password, email } = user;
            return new User_1.User(_id, username, password, email);
        }
        else {
            throw new UserError_1.CannotFoundUserError(username);
        }
    }
    catch (err) {
        console.error(`Une erreur s'est produite lors de la récupération de user: ${username}`);
        throw err;
    }
};
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=usersRepository.js.map