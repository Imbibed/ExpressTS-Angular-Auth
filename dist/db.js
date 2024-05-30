"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersIndexes = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const db_url = 'mongodb://localhost:27017';
const db_name = 'template-db';
let db;
const connectDB = async () => {
    if (db)
        return db;
    try {
        const client = await mongodb_1.MongoClient.connect(db_url);
        db = client.db(db_name);
        return db;
    }
    catch (err) {
        console.error('Impossible de se connecter à la base de données', err);
        throw err;
    }
};
exports.connectDB = connectDB;
const createUsersIndexes = async () => {
    try {
        const mydb = await (0, exports.connectDB)();
        const users_collection = mydb.collection('users');
        await users_collection.createIndex({ username: 1 }, { unique: true });
        await users_collection.createIndex({ email: 1 }, { unique: true });
        console.log('Indexes created on users collection');
    }
    catch (err) {
        console.error(err);
    }
};
exports.createUsersIndexes = createUsersIndexes;
//# sourceMappingURL=db.js.map