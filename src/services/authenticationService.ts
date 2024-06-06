import jwt from "jsonwebtoken";

const username_acc = 'jules';
const pwd_acc = 'jules';
const secret = 'secret'
const tokenExpiration = "1h";
const verifyCredentials = (username: string, pwd: string): boolean => username === username_acc && pwd === pwd_acc

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

