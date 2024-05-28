import {connectDB} from "../db";
import {Collection, Db, WithId} from "mongodb";
import {User} from "../Model/User";
import {CannotFoundUserError} from "../Error/UserError";

const db_collection_name = 'users';

export const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const db: Db = await connectDB();
        const collection: Collection<User> = db.collection(db_collection_name);
        const user: WithId<User> | null = await collection.findOne({username: username});
        if(user){
            const { username, password } = user;
            return new User(username, password);
        }  else {
            throw new CannotFoundUserError(username);
        }
    } catch (err) {
        console.error(`Une erreur s'est produite lors de la récupération de user: ${username}`);
        throw err;
    }
}