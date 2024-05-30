import {
    getUserByUsername as repoGetUserByUsername,
    createUser as repoCreateUser
} from "../repositories/usersRepository";
import {User} from "../Model/User";
import {ObjectId} from "mongodb";

export const getUserByUsername = (username: string): Promise<User | null> => {
    return repoGetUserByUsername(username);
}

export const createUser = (username: string, password: string, email: string): Promise<ObjectId | null> => {
    return repoCreateUser(username, password, email);
}