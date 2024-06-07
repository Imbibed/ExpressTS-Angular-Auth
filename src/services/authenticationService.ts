import {userService} from "./usersService";
import bcrypt from "bcrypt";


const verifyCredentials = async (username: string, pwd: string): Promise<boolean> => {
    try {
        const user = await userService.getUserByUsername(username);
        if (user) {
            return bcrypt.compare(pwd, user.password);
        }
        return new Promise(() => false);
    } catch(err) {
        console.error(err);
        throw err;
    }
}

export const authenticationService = {
    verifyCredentials
};

