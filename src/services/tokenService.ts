import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";

const secret = process.env.SECRET || 'secret';
const tokenExpiration = process.env.TOKEN_EXPIRATION || "1h";
const generateToken = (username: string): string => {
    const payload = {username: username, role: 'TODO'}
    return jwt.sign(payload, secret, {expiresIn: tokenExpiration})
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.header('authorization');
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token: string = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).send(`Invalid token: ${err}`);
    }
};

export const tokenService = {
    generateToken,
    verifyToken
};