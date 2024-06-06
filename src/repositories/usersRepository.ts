import {connectDB} from "../db";
import {Collection, Db, ObjectId, WithId} from "mongodb";
import {User} from "../Model/User";
import {CannotCreateUser, CannotFoundUserError} from "../Error/UserError";
import bcrypt from "bcrypt";

const db_collection_name = 'users';
const saltRounds = 10;

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const db: Db = await connectDB();
        const collection: Collection<User> = db.collection(db_collection_name);

        const user: WithId<User> | null = await collection.findOne({username: username});
        
        if(user){
            const { _id, username, password, email } = user;
            return new User(_id, username, password, email);
        }  else {
            throw new CannotFoundUserError(username);
        }
    } catch (err) {
        console.error(`Une erreur s'est produite lors de la récupération de user: ${username}`);
        throw err;
    }
};

const createUser = async (username: string, plainPassword: string, email: string): Promise<ObjectId | null> => {
    try {
        const db: Db = await connectDB();
        const collection: Collection<User> = db.collection(db_collection_name);

        const hashedPassword: string = await bcrypt.hash(plainPassword, saltRounds);
        const user: User = new User(new ObjectId(), username, hashedPassword, email);

        const result = await collection.insertOne(user);
        if(result.insertedId) {
            return result.insertedId;
        }else{
            throw new CannotCreateUser(user.username);
        }
    } catch (err) {
        console.error(`Une erreur s'est prduite lors de la création du user: ${username}`);
        throw err;
    }
};
export const userRepository = {
    getUserByUsername,
    createUser
};
