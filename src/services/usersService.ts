import { userRepository } from "../repositories/usersRepository";
import {User} from "../Model/User";
import {ObjectId} from "mongodb";

const getUserByUsername = (username: string): Promise<User | null> => {
    return userRepository.getUserByUsername(username);
}

const createUser = (username: string, password: string, email: string): Promise<ObjectId | null> => {
    return userRepository.createUser(username, password, email);
}

export const userService = {
    getUserByUsername,
    createUser
}