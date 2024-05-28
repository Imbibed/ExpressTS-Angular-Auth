import {Db, MongoClient} from "mongodb";

const db_url = 'mongodb://localhost:27017';
const db_name = 'template-db';

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