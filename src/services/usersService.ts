import {getUserByUsername as repoGetUserByUsername} from "../repositories/usersRepository";
import {User} from "../Model/User";
export const getUserByUsername = (username: string): Promise<User | null> => {
    return repoGetUserByUsername(username);
}