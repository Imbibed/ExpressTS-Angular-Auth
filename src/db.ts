import {Db, MongoClient} from "mongodb";

const db_url = process.env.DB_URL || "mongodb://root:example@localhost:27017";
const db_name = process.env.DB_NAME || "template-db";

let db: Db;

export const connectDB = async () => {
    if (db) return db;
    try {
        const client: MongoClient = await MongoClient.connect(db_url);
        db = client.db(db_name);
        return db;
    } catch (err) {
        console.error('Impossible de se connecter à la base de données', err);
        throw err;
    }
}

export const createUsersIndexes = async () => {
    try{
        const mydb: Db = await connectDB();
        const users_collection = mydb.collection('users');

        await users_collection.createIndex({username: 1}, {unique: true});
        await users_collection.createIndex({email: 1}, {unique: true});
        console.log('Indexes created on users collection');
    } catch(err) {
        console.error(err);
    }
}