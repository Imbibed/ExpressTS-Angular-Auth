import express, {Request, Response, NextFunction, Router} from "express";
import {generateToken, verifyCredentials} from "../services/authenticationService";
const authRouter: Router = express.Router();

authRouter.post('/', function(req: Request, res: Response, next: NextFunction): void {
    const username: string = req.body["username"] as string;
    const password: string = req.body["password"] as string;
    console.log(req.body);
    if(verifyCredentials(username, password)){
        const token: string = generateToken(username);
        res.status(200).send({token: token});
    }else{
        res.status(401).send();
    }
});

export default authRouter;
