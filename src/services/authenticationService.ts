import jwt from "jsonwebtoken";
import {userService} from "./usersService";
import bcrypt from "bcrypt";

const username_acc = 'jules';
const pwd_acc = 'jules';
const secret = 'secret'
const tokenExpiration = "1h";
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

const generateToken = (username: string): string => {
    const payload = {username: username, role: 'TODO'}
    return jwt.sign(payload, secret, {expiresIn: tokenExpiration})
}

const verifyToken = (token: string): void => {
    jwt.verify(token, secret, {maxAge: tokenExpiration});
}

export const authenticationService = {
    verifyCredentials,
    generateToken,
    verifyToken
};

